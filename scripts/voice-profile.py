#!/usr/bin/env python3
# DESC: Profile the writing habits of the CV bullets, and check new text against them

"""Measure how the CV's bullets are written, so new ones can be made to match.

Rewriting one section by hand, or with an assistant, tends to drift away from
the voice of the other nine. The drift is measurable: em dashes appear, bullets
start ending in periods, long sentences get split. This reads
src/data/experience.json, reports the habits, and can score candidate text
against them.

  voice-profile.py                     profile every entry
  voice-profile.py --against "Cypher Games"
                                       profile the rest, then flag that entry
  voice-profile.py --check draft.txt   score new bullets (one per line)
  voice-profile.py --check -           same, from stdin

Exit 0 always. This is a description, not a gate: a deviation may be a
deliberate choice.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

EM_DASH = "—"


def repo_root() -> Path:
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            cwd=Path(__file__).resolve().parent,
            capture_output=True, text=True, check=True,
        )
        return Path(out.stdout.strip())
    except (subprocess.CalledProcessError, FileNotFoundError):
        return Path(__file__).resolve().parent.parent


def company_of(entry: dict) -> str:
    company = entry.get("company")
    return company.get("name", "") if isinstance(company, dict) else str(company or "")


def bullets_of(entry: dict) -> list[str]:
    """Flatten an entry's responsibilities, including nested sub-items."""
    out: list[str] = []
    for item in entry.get("responsibilities", []):
        if isinstance(item, str):
            out.append(item)
        elif isinstance(item, dict):
            if item.get("content"):
                out.append(item["content"])
            out.extend(item.get("subItems", []))
    # Strip the markup and link tokens; measure prose, not syntax.
    return [re.sub(r"\{([^}]*)\}", r"\1", re.sub(r"<[^>]+>", "", b)).strip()
            for b in out if b]


def profile(bullets: list[str]) -> dict:
    if not bullets:
        return {}
    words = sorted(len(b.split()) for b in bullets)
    n = len(bullets)
    return {
        "bullets": n,
        "words_min": words[0],
        "words_median": words[n // 2],
        "words_max": words[-1],
        "sentences": Counter(len(re.findall(r"[.;] ", b)) + 1 for b in bullets),
        "em_dashes": sum(b.count(EM_DASH) for b in bullets),
        "semicolons": sum(b.count(";") for b in bullets),
        "trailing_period": sum(b.rstrip().endswith(".") for b in bullets),
        "paren_stacks": sum(len(re.findall(r"\([A-Z][^)]*,[^)]*\)", b)) for b in bullets),
        "ampersands": sum(b.count("&") for b in bullets),
        "using": sum(len(re.findall(r"\busing\b", b)) for b in bullets),
        "verb_first": sum(bool(re.match(r"[A-Z][a-z]+(ed|t|d)\b", b)) for b in bullets),
    }


def show(label: str, p: dict) -> None:
    if not p:
        print(f"\n{label}: no bullets")
        return
    n = p["bullets"]
    sentences = ", ".join(f"{k} sentence{'s' if k > 1 else ''}: {v}"
                          for k, v in sorted(p["sentences"].items()))
    print(f"\n{label}  ({n} bullets)")
    print(f"  words per bullet      min {p['words_min']}  median {p['words_median']}  max {p['words_max']}")
    print(f"  {sentences}")
    print(f"  em dashes             {p['em_dashes']}")
    print(f"  semicolons            {p['semicolons']}")
    print(f"  ending in a period    {p['trailing_period']}/{n}")
    print(f"  (Stack, List) parens  {p['paren_stacks']}")
    print(f"  ampersands            {p['ampersands']}")
    print(f"  'using'               {p['using']}")
    print(f"  starts with past verb {p['verb_first']}/{n}")


def compare(baseline: dict, candidate: dict, label: str) -> None:
    """Report only where the candidate departs from the baseline's habits."""
    n_base, n_cand = baseline["bullets"], candidate["bullets"]
    notes = []

    def rate(p, key):
        return p[key] / p["bullets"]

    if candidate["em_dashes"] and not baseline["em_dashes"]:
        notes.append(f"uses {candidate['em_dashes']} em dash(es); the baseline uses none")
    for key, name in (("trailing_period", "ending in a period"),
                      ("paren_stacks", "(Stack, List) parentheticals"),
                      ("using", "'using'")):
        b, c = rate(baseline, key), rate(candidate, key)
        if abs(b - c) > 0.3:
            notes.append(f"{name}: {c:.2f} per bullet vs {b:.2f} in the baseline")
    if candidate["words_max"] > baseline["words_max"]:
        notes.append(f"longest bullet is {candidate['words_max']} words; "
                     f"the baseline tops out at {baseline['words_max']}")
    if candidate["words_median"] < baseline["words_median"] * 0.6:
        notes.append(f"median {candidate['words_median']} words vs {baseline['words_median']}; "
                     "bullets are much shorter than usual")
    if rate(candidate, "verb_first") < rate(baseline, "verb_first") - 0.3:
        notes.append(f"only {candidate['verb_first']}/{n_cand} start with a past-tense verb, "
                     f"against {baseline['verb_first']}/{n_base} in the baseline")

    print(f"\n{label}")
    if notes:
        for note in notes:
            print(f"  ! {note}")
    else:
        print("  no notable deviation from the baseline")


def main() -> int:
    root = repo_root()
    parser = argparse.ArgumentParser(
        description=__doc__.split("\n\n")[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Reads src/data/experience.json.",
    )
    parser.add_argument("--against", metavar="COMPANY",
                        help="hold this entry out, profile the rest, then compare it")
    parser.add_argument("--check", metavar="FILE",
                        help="score candidate bullets (one per line); '-' for stdin")
    args = parser.parse_args()

    path = root / "src" / "data" / "experience.json"
    if not path.exists():
        print(f"no such file: {path}", file=sys.stderr)
        return 2
    entries = json.loads(path.read_text(encoding="utf-8"))

    if args.against:
        held = [e for e in entries if company_of(e) == args.against]
        if not held:
            names = ", ".join(sorted({company_of(e) for e in entries}))
            print(f"no entry named {args.against!r}. Known: {names}", file=sys.stderr)
            return 2
        rest = [b for e in entries if company_of(e) != args.against for b in bullets_of(e)]
        subject = [b for e in held for b in bullets_of(e)]
        base = profile(rest)
        show(f"Baseline, everything except {args.against}", base)
        show(args.against, profile(subject))
        compare(base, profile(subject), f"{args.against} against the baseline")
        return 0

    everything = [b for e in entries for b in bullets_of(e)]
    base = profile(everything)
    show("Every entry", base)

    if args.check:
        text = sys.stdin.read() if args.check == "-" else Path(args.check).read_text(encoding="utf-8")
        candidate = [line.strip(" \t-*•") for line in text.splitlines() if line.strip()]
        if not candidate:
            print("\nnothing to check", file=sys.stderr)
            return 0
        show(f"Candidate ({args.check})", profile(candidate))
        compare(base, profile(candidate), "Candidate against the baseline")

    return 0


if __name__ == "__main__":
    sys.exit(main())
