# Noah Oscars

## Check it Out!

[oscars-noah.vercel.app/](oscars-noah.vercel.app/)

## Overview

Noah Oscars is an interactive dashboard summarizing the films I've seen in 2023, 2024, and 2025. What I started as a google slideshow last year, I ramped up this year into a React project built with Next.js deployed on Vercel. The main emphasis of this project was to work with more dynamic components in React: a slideshow with transitions that toggle on/off, components that when clicked flip to a backside and turn back on a timer, a sortable table contained with a scroll, and dynamic sizing to give widescreen viewers a different layout that mobile users. The data comes from a json I manually put together based on reviews I wrote through throughout the year.

## Key Features:

- Slideshow with slides dynamically rendered from json input
- Review data of 45 films viewable in sorted table form or as grid of clickable posters
- Tailwind styling inside of react class-naming, meaning minimal css presence

### Technologies Used

#### Frontend:

- ReactJS
- Tailwind and CSS
- Deployed via Vercel

#### Backend:

- N/A

#### Database:

- Manually curated json file

## Architecture

The application consists of two main parts:

## Deployment

The frontend is deployed to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the natural extension from being a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Next Steps

- Add previous years data for my own dashboard
- Allow users to create their own dashboard
  - from their own selection of movies they've imported or selected on the site
  - auto-generate recommendations for award winners based on input
