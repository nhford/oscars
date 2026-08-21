# Noah Oscars

**Live:** [oscars-noah.vercel.app](https://oscars-noah.vercel.app/)

Interactive dashboard of films I’ve watched, scored, and awarded — currently **2023, 2024, and 2025** (115 titles). Awards follow the year I *watched* a movie, not the theatrical release year. Five categories: Best Supporting Actor, Best Actor, Best Scene, Best Ending, and Best Movie.

What started as a Google slideshow is a Next.js app on Vercel. The point of the project was dynamic React: a slideshow with optional transitions, posters that flip to a grade then flip back, a sortable table inside a scroll pane, and a two-column layout that collapses on mobile.

## What it does

- **Year toggle** — 2023 / 2024 / 2025, plus All-Time for the gallery.
- **Gallery** — Poster grid (click to flip and see the grade) or a sortable table of title, rating, release year, and watched year.
- **Awards slideshow** — Nominees and winners for the five categories, with a checkbox to turn transitions off.
- **Data** — Hand-curated `src/app/assets/movies.json` (ids, ratings, grades, nominee/winner flags). `convert-sheet.ipynb` turns a spreadsheet / CSV into that JSON.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + MUI
- Deployed on Vercel
- No backend: the movie list is a committed JSON file

## Local development

```bash
npm install
npm run dev
```

To refresh `movies.json` from a sheet, run `convert-sheet.ipynb` (expects columns matching the JSON fields) and drop poster / nominee images under `public/`.

## Project layout

```
src/app/
  page.tsx              # year toggle, gallery, slideshow
  gallery.tsx           # poster grid + sortable table
  slideshow.tsx         # awards deck
  film.tsx / noms.tsx / winner.tsx / transition.tsx
  assets/movies.json    # source of truth for titles and awards
public/                 # posters and nominee stills
convert-sheet.ipynb     # CSV → movies.json
```

## Possible next work

- Add a 2026 season when the year wraps
- Let visitors build their own watch-year ballot from an imported list
