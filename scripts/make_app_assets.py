"""Source images for the store apps' icons and splash screens, in the same style as the web icon
(make_icons_brutal.py): fork, plate and roulette wheel on highlighter yellow.

Usage: python make_app_assets.py assets_dir   (needs Pillow). Then `npm run assets` turns them into every size.
"""
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

YELLOW, BLACK, WHITE = (255, 230, 0, 255), (10, 10, 10, 255), (255, 255, 255, 255)
S = 2048


def art(background):
    """The icon drawn on a 2048 px canvas; `background` is the yellow or None for transparent."""
    img = Image.new('RGBA', (S, S), background or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    box = lambda x0, y0, x1, y1: [x0 * S, y0 * S, x1 * S, y1 * S]

    def circle(cx, cy, r, fill, outline=None, width=0):
        d.ellipse([(cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S], fill=fill, outline=outline, width=int(width * S))

    d.rounded_rectangle(box(0.115, 0.47, 0.155, 0.80), radius=0.02 * S, fill=BLACK)
    d.rounded_rectangle(box(0.085, 0.40, 0.185, 0.50), radius=0.035 * S, fill=BLACK)
    for x in (0.085, 0.120, 0.155):
        d.rounded_rectangle(box(x, 0.20, x + 0.03, 0.45), radius=0.015 * S, fill=BLACK)
    d.rounded_rectangle(box(0.845, 0.48, 0.885, 0.80), radius=0.02 * S, fill=BLACK)
    d.chord(box(0.845, 0.20, 0.945, 0.50), 90, 270, fill=BLACK)
    d.rectangle(box(0.845, 0.35, 0.895, 0.52), fill=BLACK)
    circle(0.525, 0.525, 0.30, BLACK)
    circle(0.5, 0.5, 0.30, WHITE, BLACK, 0.026)
    r = 0.19
    for i in range(16):
        d.pieslice(box(0.5 - r, 0.5 - r, 0.5 + r, 0.5 + r), i * 22.5 - 90, (i + 1) * 22.5 - 90, fill=BLACK if i % 2 == 0 else WHITE)
    circle(0.5, 0.5, r, None, BLACK, 0.02)
    circle(0.5, 0.5, 0.075, YELLOW, BLACK, 0.02)
    a = math.radians(-90 + 2 * 22.5 + 11.25)
    circle(0.5 + 0.145 * math.cos(a), 0.5 + 0.145 * math.sin(a), 0.026, WHITE, BLACK, 0.01)
    return img


def centered(img, canvas, scale, background):
    out = Image.new('RGBA', (canvas, canvas), background)
    size = int(canvas * scale)
    small = img.resize((size, size), Image.LANCZOS)
    out.alpha_composite(small, ((canvas - size) // 2, (canvas - size) // 2))
    return out


if __name__ == '__main__':
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    full = art(YELLOW)
    bare = art(None)
    # iPhone icon and the legacy Android icon: the full square design (the systems round the corners)
    full.resize((1024, 1024), Image.LANCZOS).convert('RGB').save(out / 'icon-only.png')
    # Android adaptive icon: the design inside the 66% safe zone, on a plain yellow layer
    centered(bare, 1024, 0.66, (0, 0, 0, 0)).save(out / 'icon-foreground.png')
    Image.new('RGB', (1024, 1024), YELLOW[:3]).save(out / 'icon-background.png')
    # Splash screens: the design small in the middle of yellow
    splash = centered(bare, 2732, 0.34, YELLOW).convert('RGB')
    splash.save(out / 'splash.png')
    splash.save(out / 'splash-dark.png')
    print('wrote', sorted(p.name for p in out.iterdir()))
