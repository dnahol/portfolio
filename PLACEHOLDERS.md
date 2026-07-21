# Placeholder inventory

Everything below is a stand-in so the site is fully functional and reviewable before real
content exists. Swap these out in `index.html` / `experience.html` directly — no build step.

## Text placeholders
- Name/brand: "Dalia Nahol" appears in both page `<header>`s and footers.
- Hero heading/intro copy on `index.html`.
- Every card's "PLACEHOLDER — replace with a real description..." paragraph inside its `<template>`.

## Images (`assets/images/`)
| File | Used for | Replace with |
|---|---|---|
| `work-outco.svg` | Outco card thumbnail + modal | Real screenshot/photo |
| `work-dolby.svg` | Dolby Atmos contract card | Real screenshot/photo |
| `work-freelance.svg` | Freelance consulting card | Real screenshot/photo |
| `work-flippable.svg` | Flippable.org card | Real screenshot/photo |
| `os-firefox.svg` | Mozilla Firefox card | Real screenshot of your contribution |
| `os-wikimedia.svg` | Wikimedia card | Real screenshot of your contribution |
| `os-freecodecamp.svg` | freeCodeCamp.org card | Real screenshot of your contribution |
| `fun-hackathon.svg` | Hackathon project card | Real screenshot/GIF still |
| `fun-personal.svg` | Personal project card | Real screenshot/GIF still |
| `logo-1.svg`, `logo-2.svg` | Graphic design gallery | Real logo files |
| `business-card.svg` | Graphic design gallery | Real business card design |
| `favicon.svg` | Browser tab icon, header brand mark | Your real mark, or keep as-is |

Keep replacement images roughly 4:3 for card thumbnails (`work-*`, `os-*`, `fun-*`), square for
the two logos, and ~1.75:1 for the business card, so the existing CSS aspect-ratio/grid rules
don't need changes. Always keep a descriptive, non-generic `alt` attribute.

## Links (all currently `href="#"`)
Every "Visit site" / "View contribution" button and every in-modal "View live site" /
"View pull request" link is a placeholder. Search for `href="#"` and `rel="noopener"` to find
every instance and fill in the real URL.

## Embeds
Each modal that says `<p class="modal-embed-note">GIF / video walkthrough placeholder</p>` is
where a real animated GIF `<img>` or a YouTube `<iframe>` embed should go once you have one.

## Dropped from the original brief (per your direction)
- No separate Volunteer Work subsection — Flippable.org lives under **Work**; Girl Develop It
  was dropped entirely.
- No separate Graphic Design page — folded into a small gallery at the end of the **Work**
  section on the homepage.
