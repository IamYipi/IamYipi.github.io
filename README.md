# IamYipi.github.io

Personal site of Javier Garcia ([@IamYipi](https://github.com/IamYipi)), styled as a 16-bit RPG:
player sheet, inventory (languages and stack), world map (R&D projects), open-source quest log
and save points. Live at <https://iamyipi.github.io>.

Static HTML/CSS/JS, no build step. Spanish and English, toggled from the HUD.

## Layout

| Path | What it holds |
|------|---------------|
| `index.html` | Page skeleton |
| `assets/style.css` | Design tokens and components (pixel windows, bars, pips, heatmap) |
| `assets/app.js` | Renders the data, language toggle, avatar mosaic |
| `data/content.js` | Hand-written copy (ES/EN), curated projects, stack, timeline |
| `data/github.js` | Generated GitHub numbers, do not edit |
| `scripts/build_data.py` | Regenerates `data/github.js` |

## Refresh the GitHub data

Needs the [GitHub CLI](https://cli.github.com/) logged in as the profile owner:

```bash
python scripts/build_data.py
```

Private repositories only feed aggregate numbers (language bytes, commit and PR counts per
curated project). Their names are never written to `data/github.js`.

## Preview locally

```bash
python -m http.server 8765
```

Then open <http://localhost:8765>.

Design base: the VoltAgent `DESIGN.md` from [getdesign.md](https://getdesign.md/voltagent/design-md),
reworked with Press Start 2P and VT323.
