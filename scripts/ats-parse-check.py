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

    # Contact details, as an ATS would look for them: the literal strings, not
    # the display text wrapped around them.
    contact_blob = json.dumps(header.get("contact", {}), ensure_ascii=False)
    emails = set(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", contact_blob))
    phones = {re.sub(r"[^\d+]", "", p) for p in re.findall(r"\+[\d ()/-]{7,}", contact_blob)}
    profiles = set(re.findall(r"https?://(?:www\.)?(?:linkedin\.com|github\.com)/[\w./-]+",
                              contact_blob))

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
        "emails": emails,
        "phones": phones,
        "profiles": profiles,
    }


# --------------------------------------------------------------------------
# extraction


def extract(pdf: Path) -> tuple[dict[str, str], list[str]]:
    """Return {extractor_name: text} plus every URI annotation in the file.

    Three engines with three different codebases, because real applicant
    tracking systems do not agree on one. pdfminer.six reconstructs reading
    order from glyph geometry. pypdf follows the content stream, which is the
    behaviour of the PDFBox and Tika family that sits under a lot of commercial
    parsers. PyMuPDF wraps MuPDF, a third implementation again. A document that
    reads correctly under all three is not guaranteed to read correctly
    everywhere, but a document that fails one of them has a real problem.
    """
    from pdfminer.high_level import extract_text
    from pypdf import PdfReader
    import pymupdf

    import logging
    logging.getLogger("pdfminer").setLevel(logging.ERROR)
    pymupdf.TOOLS.mupdf_display_errors(False)

    reader = PdfReader(str(pdf))
    with pymupdf.open(str(pdf)) as doc:
        mupdf_text = "\n".join(page.get_text() for page in doc)

    texts = {
        "pdfminer.six": extract_text(str(pdf)),
        "pypdf": "\n".join(page.extract_text() or "" for page in reader.pages),
        "pymupdf": mupdf_text,
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


# An all-caps line carrying spaces. Tracking wide enough to survive extraction
# breaks a heading either into single letters ("E X P E R I E N C E") or into
# ragged chunks ("EXTR ACURRICUL AR"), depending on where glyph positions round,
# so both shapes have to be caught.
CAPS_WITH_SPACES = re.compile(r"^\s*([A-Z]{1,}(?:\s+[A-Z]+)+)\s*$", re.M)
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

    # Contact fields, checked against the text layer specifically. A parser
    # that reads link annotations recovers a URL that is only a hyperlink, but
    # plenty do not, so anything an ATS puts in a contact field has to survive
    # as plain text too.
    if expected["emails"]:
        lost = [e for e in expected["emails"] if not all(e in t for t in texts.values())]
        report.add(
            "email address in the text layer",
            FAIL if lost else PASS,
            f"missing: {', '.join(lost)}" if lost
            else f"{', '.join(sorted(expected['emails']))} found by every extractor",
            "the email is the primary contact field on nearly every ATS",
        )

    if expected["phones"]:
        digits = {n: re.sub(r"[^\d+]", "", t) for n, t in texts.items()}
        lost = [p for p in expected["phones"] if not all(p in d for d in digits.values())]
        report.add(
            "phone number in the text layer",
            FAIL if lost else PASS,
            f"missing: {', '.join(lost)}" if lost
            else f"{len(expected['phones'])} found by every extractor",
            "compared digits-only, so spacing and punctuation do not matter",
        )

    if expected["profiles"]:
        annotated = set(links)
        text_only = []
        for url in expected["profiles"]:
            bare = re.sub(r"^https?://(www\.)?", "", url).rstrip("/")
            if not any(bare in t for t in texts.values()):
                text_only.append(bare)
        report.add(
            "profile URLs readable as text",
            WARN if text_only else PASS,
            f"{', '.join(sorted(text_only))} exist only as link annotations"
            if text_only else "all present in the text layer",
            "a parser that ignores annotations gets no profile link; rendering "
            "the display text as the bare domain path fixes it. Source: "
            "src/data/header.json"
            + ("" if not annotated else f" ({len(annotated)} annotations present)"),
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

    # A heading has split if some extractor reports an all-caps line with spaces
    # whose despaced form another extractor reports as one word.
    words = {w for t in texts.values() for w in re.findall(r"\b[A-Z]{4,}\b", t)}
    offenders = {}
    for label, text in texts.items():
        for line in CAPS_WITH_SPACES.findall(text):
            if line.replace(" ", "") in words:
                offenders.setdefault(label, line.strip())
    report.add(
        "section headers are contiguous words",
        FAIL if offenders else PASS,
        "; ".join(f"{n} reads {v!r}" for n, v in offenders.items())
        if offenders else "no split headings",
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
    despaced = CAPS_WITH_SPACES.sub(lambda m: m.group(0).replace(" ", ""), layout)
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
