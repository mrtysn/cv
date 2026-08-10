#!/usr/bin/env python3
# DESC: Report how ATS-style text extractors read the generated CV PDF

"""Check the generated CV PDF against how applicant tracking systems read it.

An ATS never sees the rendered page. It runs the PDF through a text extractor
and parses fields out of the resulting string. Different extractors disagree
substantially on the same file, so this runs two with genuinely different
strategies and reports what each one recovers:

  pdfminer.six  layout-aware; reconstructs reading order from glyph positions
  pypdf         content-stream order; closer to what a naive parser sees

Expected values are read from src/data/*.json, so this stays correct as the CV
changes. Nothing about the candidate is hardcoded here.

Exit codes: 0 all checks passed (warnings allowed), 1 a check FAILed,
2 dependencies missing (caller may treat as skip).
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path

DEPS_HINT = "pip install pypdf pdfminer.six"


# --------------------------------------------------------------------------
# repo layout


def repo_root() -> Path:
    """Locate the repo from this script, not from the caller's cwd."""
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            cwd=Path(__file__).resolve().parent,
            capture_output=True,
            text=True,
            check=True,
        )
        return Path(out.stdout.strip())
    except (subprocess.CalledProcessError, FileNotFoundError):
        return Path(__file__).resolve().parent.parent


def load_expectations(root: Path) -> dict:
    """Pull the values the PDF must preserve out of the CV's own data files."""
    data_dir = root / "src" / "data"

    def read(name: str):
        path = data_dir / name
        return json.loads(path.read_text(encoding="utf-8")) if path.exists() else None

    header = read("header.json") or {}
    experience = read("experience.json") or []

    urls: set[str] = set()

    def harvest(node) -> None:
        if isinstance(node, dict):
            for key, value in node.items():
                if key == "url" and isinstance(value, str) and value.startswith("http"):
                    urls.add(value)
                else:
                    harvest(value)
        elif isinstance(node, list):
            for item in node:
                harvest(item)

    for name in ("header.json", "experience.json", "education.json",
                 "achievements.json", "skills.json"):
        harvest(read(name))

    companies = []
    for entry in experience:
        company = entry.get("company")
        if isinstance(company, dict):
            company = company.get("name")
        if company:
            companies.append(company)

    # Only MM/YYYY entries are expected to appear as parseable ranges. Coarser
    # precision is a deliberate choice for overlapping or part-time roles, so it
    # is not counted and not flagged.
    month_ranges = sum(
        bool(re.fullmatch(r"\d{2}/\d{4}", str(e.get("startDate") or "")))
        for e in experience
    )

    return {
        "name": header.get("name", ""),
        "companies": companies,
        "month_ranges": month_ranges,
        "urls": urls,
    }


# --------------------------------------------------------------------------
# extraction


def extract(pdf: Path) -> tuple[dict[str, str], list[str]]:
    """Return {extractor_name: text} plus every URI annotation in the file."""
    from pdfminer.high_level import extract_text
    from pypdf import PdfReader

    import logging
    logging.getLogger("pdfminer").setLevel(logging.ERROR)

    reader = PdfReader(str(pdf))
    texts = {
        "pdfminer.six": extract_text(str(pdf)),
        "pypdf": "\n".join(page.extract_text() or "" for page in reader.pages),
    }

    links = []
    for page in reader.pages:
        for annot in page.get("/Annots") or []:
            uri = (annot.get_object().get("/A") or {}).get("/URI")
            if uri:
                links.append(str(uri))
    return texts, links


# --------------------------------------------------------------------------
# checks

FAIL, WARN, PASS = "FAIL", "WARN", "PASS"


@dataclass
class Result:
    name: str
    status: str
    detail: str
    fix: str = ""


@dataclass
class Report:
    results: list[Result] = field(default_factory=list)

    def add(self, name: str, status: str, detail: str, fix: str = "") -> None:
        self.results.append(Result(name, status, detail, fix))

    @property
    def failed(self) -> bool:
        return any(r.status == FAIL for r in self.results)


# A run of single capitals separated by spaces. This is the signature of CSS
# letter-spacing surviving into the extracted text as real space characters.
LETTERSPACED = re.compile(r"^\s*(?:[A-Z]\s){3,}[A-Z]\s*$", re.M)
DATE_RANGE = re.compile(r"(\d{2}/\d{4})\s*[–—-]\s*(\d{2}/\d{4}|Present)")
LONE_BULLET = re.compile(r"^\s*[•●▪-]\s*$", re.M)


def split_diacritics(text: str) -> list[str]:
    """Find combining-mark characters stranded between spaces (' ş ')."""
    hits = []
    for match in re.finditer(r"\s(\S)\s", text):
        char = match.group(1)
        if unicodedata.category(char).startswith("L") and not char.isascii():
            hits.append(char)
    return hits


def run_checks(texts: dict[str, str], links: list[str], expected: dict) -> Report:
    report = Report()
    layout = texts["pdfminer.six"]
    naive = texts["pypdf"]

    # --- structural must-holds ------------------------------------------

    short = [name for name, text in texts.items() if len(text) < 500]
    report.add(
        "text is extractable",
        FAIL if short else PASS,
        f"no usable text from {', '.join(short)}" if short
        else " · ".join(f"{n}: {len(t):,} chars" for n, t in texts.items()),
        "the PDF is rendering text as images; check the Puppeteer print path",
    )

    name = expected["name"]
    if name:
        in_layout, in_naive = name in layout, name in naive
        report.add(
            "candidate name intact",
            PASS if in_layout and in_naive else FAIL if not in_layout else WARN,
            f"{name!r} " + ("found by both" if in_layout and in_naive
                            else "missing from pdfminer.six" if not in_layout
                            else "found by pdfminer.six, mangled by pypdf"),
            "non-ASCII letters are being emitted as separate text runs; the name "
            "field is the first thing an ATS parses",
        )

    missing = [c for c in expected["companies"]
               if not all(c in text for text in texts.values())]
    report.add(
        "every employer name present",
        FAIL if missing else PASS,
        f"missing: {', '.join(missing)}" if missing
        else f"all {len(expected['companies'])} found by both",
    )

    want = expected["month_ranges"]
    counts = {n: len(DATE_RANGE.findall(t)) for n, t in texts.items()}
    report.add(
        "date ranges parse",
        PASS if all(c >= want for c in counts.values()) else FAIL,
        " · ".join(f"{n}: {c}/{want}" for n, c in counts.items()),
        "employment dates drive the experience calculation on most ATS",
    )

    if expected["urls"]:
        annotated = set(links)
        lost = {u for u in expected["urls"] if u not in annotated}
        report.add(
            "hyperlinks survive as annotations",
            FAIL if lost else PASS,
            f"{len(annotated)} URI annotations, {len(lost)} data URLs unlinked"
            + (f" (e.g. {sorted(lost)[0]})" if lost else ""),
            "links painted as styled text but not annotated are lost on extraction",
        )

    spaced = {n: LETTERSPACED.findall(t) for n, t in texts.items()}
    offenders = {n: v for n, v in spaced.items() if v}
    report.add(
        "section headers are contiguous words",
        FAIL if offenders else PASS,
        "; ".join(f"{n} reads {v[0].strip()!r}" for n, v in offenders.items())
        if offenders else "no letter-spaced headings",
        "CSS letter-spacing becomes real spaces on extraction, so an ATS that "
        "cannot match the heading cannot scope the section under it. Source: "
        "src/App.css .fontSectionHeader",
    )

    # --- soft signals ----------------------------------------------------

    stranded = {n: split_diacritics(t) for n, t in texts.items()}
    hits = {n: v for n, v in stranded.items() if v}
    report.add(
        "diacritics stay inside their word",
        WARN if hits else PASS,
        "; ".join(f"{n}: {len(v)} stranded ({''.join(sorted(set(v)))})"
                  for n, v in hits.items()) if hits else "none stranded",
        "same root cause as the name check; affects place names and employers",
    )

    for label, text in texts.items():
        total = sum(text.count(g) for g in "•●▪")
        if not total:
            continue
        lone = len(LONE_BULLET.findall(text))
        if lone > total * 0.2:
            report.add(
                f"bullet glyphs attached ({label})",
                WARN,
                f"{lone} of {total} glyphs sit alone on a line",
                "list-item detection is unreliable; the text itself is intact",
            )

    # Reading order: are an employer's bullets anywhere near the employer?
    if expected["companies"]:
        first = expected["companies"][0]
        for label, text in texts.items():
            here = text.find(first)
            if here == -1:
                continue
            following = text[here:here + 4000]
            nxt = min((following.find(c) for c in expected["companies"][1:]
                       if following.find(c) > 0), default=len(following))
            if nxt < 200:
                report.add(
                    f"bullets follow their employer ({label})",
                    WARN,
                    f"next employer appears {nxt} chars after {first!r}, so "
                    "responsibilities are detached from the job header",
                    "reading order follows the content stream, not the visual "
                    "layout; an ATS may attach bullets to the wrong employer",
                )

    # Words fused across a line break show up in one extractor and not the other.
    # Collapse letter-spaced headings first, or every heading reads as fused.
    despaced = LETTERSPACED.sub(lambda m: m.group(0).replace(" ", ""), layout)
    layout_tokens = set(re.findall(r"[A-Za-z]{4,}", despaced.lower()))
    fused = sorted({t for t in re.findall(r"[a-z]{11,}", naive.lower())
                    if t not in layout_tokens})
    if fused:
        report.add(
            "words not fused across line breaks",
            WARN,
            f"{len(fused)} fused in pypdf: {', '.join(fused[:4])}"
            + (" …" if len(fused) > 4 else ""),
            "phrase and keyword matching misses the fused terms",
        )

    return report


# --------------------------------------------------------------------------
# output


def render(report: Report, pdf: Path, quiet: bool) -> None:
    width = max(len(r.name) for r in report.results)
    icon = {PASS: "✓", WARN: "!", FAIL: "✗"}

    print(f"\nATS parse check: {pdf.name}\n")
    for r in report.results:
        if quiet and r.status == PASS:
            continue
        print(f"  {icon[r.status]} {r.status:<4} {r.name:<{width}}  {r.detail}")
        if r.fix and r.status != PASS:
            print(f"{'':>{width + 13}}→ {r.fix}")

    tally = {s: sum(1 for r in report.results if r.status == s)
             for s in (PASS, WARN, FAIL)}
    print(f"\n  {tally[PASS]} passed, {tally[WARN]} warnings, {tally[FAIL]} failed\n")


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser(
        description=__doc__.split("\n\n")[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Reads expected values from src/data/*.json.",
    )
    parser.add_argument(
        "pdf", nargs="?", type=Path,
        help="PDF to check (default: the newest *_CV.pdf at the repo root)",
    )
    parser.add_argument("--json", action="store_true", help="emit JSON instead of a table")
    parser.add_argument("--quiet", action="store_true", help="show only warnings and failures")
    args = parser.parse_args()

    pdf = args.pdf
    if pdf is None:
        candidates = sorted(root.glob("*_CV.pdf"), key=lambda p: p.stat().st_mtime)
        if not candidates:
            print(f"no *_CV.pdf found at {root}; pass one explicitly", file=sys.stderr)
            return 2
        pdf = candidates[-1]
    if not pdf.exists():
        print(f"no such file: {pdf}", file=sys.stderr)
        return 2

    try:
        texts, links = extract(pdf)
    except ImportError as exc:
        print(f"missing dependency ({exc.name}); {DEPS_HINT}", file=sys.stderr)
        return 2

    report = run_checks(texts, links, load_expectations(root))

    if args.json:
        print(json.dumps(
            {"pdf": str(pdf),
             "results": [vars(r) for r in report.results],
             "failed": report.failed},
            indent=2, ensure_ascii=False,
        ))
    else:
        render(report, pdf, args.quiet)

    return 1 if report.failed else 0


if __name__ == "__main__":
    sys.exit(main())
