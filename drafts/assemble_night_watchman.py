#!/usr/bin/env python3
"""Assemble the-night-watchman.md from its five source files.

THE EDIT RULE: the assembled file is generated. Edit the sources, run this, never
hand-edit the output. Strip rules (what the shipped module must not carry):
  - each act file's duplicate "# The Night Watchman" title line
  - the "**Draft v0.1** ..." / "Setting: ..." review header lines
  - the "> **Draft notes for the red team.** ..." blockquotes
  - any "## Before you begin" section (standalone-review recap; the frontmatter
    primer already covers it -- keeping both was QC finding #5)
  - trailing per-act "## Appendix: ..." review sections (the real appendices live
    in night-watchman-appendices.md)
Run from the drafts/ directory:  python assemble_night_watchman.py
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
SOURCES = [
    "night-watchman-frontmatter.md",
    "night-watchman-first-watch.md",
    "night-watchman-middle-watch.md",
    "night-watchman-last-watch.md",
    "night-watchman-appendices.md",
]
OUT = HERE / "the-night-watchman.md"


def strip_act_file(text: str) -> str:
    lines = text.splitlines()
    out, skip_section, in_notes = [], False, False
    for i, line in enumerate(lines):
        if i == 0 and line.strip() == "# The Night Watchman":
            continue
        if line.startswith("**Draft v0.1**") or line.startswith("Setting: Brackenford"):
            continue
        if line.startswith("> **Draft notes for the red team.**"):
            in_notes = True
            continue
        if in_notes:
            if line.startswith(">") or not line.strip():
                continue
            in_notes = False
        if line.startswith("## "):
            title = line[3:].strip().lower()
            skip_section = title.startswith("appendix:") or title == "before you begin"
            if skip_section:
                continue
        if skip_section:
            # a section ends at the next ## heading (handled above) or EOF
            continue
        out.append(line)
    text = "\n".join(out)
    text = re.sub(r"\n{3,}", "\n\n", text)          # collapse blank runs
    text = re.sub(r"(\n---\n\n)(---\n\n)+", r"\1", text)  # collapse rule runs
    return text.strip()


def main() -> None:
    parts = []
    for i, name in enumerate(SOURCES):
        text = (HERE / name).read_text(encoding="utf-8")
        parts.append(text.strip() if i in (0, 4) else strip_act_file(text))
    OUT.write_text("\n\n---\n\n".join(parts) + "\n", encoding="utf-8")
    entries = re.findall(r"(?m)^### (\d{3})$", OUT.read_text(encoding="utf-8"))
    dupes = {e for e in entries if entries.count(e) > 1}
    print(f"assembled {OUT.name}: {len(entries)} entries" + (f", DUPES: {sorted(dupes)}" if dupes else ""))
    if dupes:
        sys.exit(1)


if __name__ == "__main__":
    main()
