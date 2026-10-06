#!/usr/bin/env python3
# make-icons.py
"""
make-icons.py, draw the PNG app icons from the same geometry as
assets/img/balise-icon.svg.

Phones and some desktops want PNG icons to install a web app; the SVG is
the source of truth and this script redraws it with Pillow, so no SVG
rasteriser needs to be installed. Run it after changing the SVG, and keep
the shapes below in step with it.

Usage:
    python3 scripts/make-icons.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "assets" / "img"
RED, PAPER, AMBER = "#b3261e", "#fffdf7", "#f2a900"
SUPER = 4  # draw large, then shrink, for smooth edges


def draw(size: int) -> Image.Image:
    big = size * SUPER
    k = big / 64
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    def p(x, y):
        return (x * k, y * k)

    d.rounded_rectangle([p(0, 0), p(64, 64)], radius=14 * k, fill=RED)
    for (x1, y1, x2, y2) in [(14, 20, 21, 23), (50, 20, 43, 23), (12, 31, 20, 31), (52, 31, 44, 31), (32, 9, 32, 15)]:
        d.line([p(x1, y1), p(x2, y2)], fill=PAPER, width=round(3.5 * k))
        for (x, y) in [(x1, y1), (x2, y2)]:
            r = 1.75 * k
            d.ellipse([x * k - r, y * k - r, x * k + r, y * k + r], fill=PAPER)
    d.polygon([p(25, 52), p(28, 30), p(36, 30), p(39, 52)], fill=PAPER)
    d.rounded_rectangle([p(26, 22), p(38, 30)], radius=2 * k, fill=AMBER)
    d.polygon([p(24, 22), p(32, 17), p(40, 22)], fill=PAPER)
    d.rounded_rectangle([p(20, 52), p(44, 56)], radius=2 * k, fill=PAPER)
    d.rectangle([p(28, 38), p(36, 41)], fill=RED)
    return img.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    for size in (192, 512):
        target = OUT / f"balise-icon-{size}.png"
        draw(size).save(target, optimize=True)
        print(f"wrote {target.relative_to(OUT.parent.parent)}")
