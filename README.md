# josh-lipson.com

Josh Lipson's personal site: Vite + React + Tailwind, deployed on Netlify from `main`.

- `npm run dev`: local development at http://localhost:8080
- `npm run build`: builds the site, then pre-renders every route to static HTML
  (`scripts/prerender.mjs`) and writes `404.html` and `sitemap.xml`
- `npm run preview`: serves the built `dist/`

Where things live:

- Page titles and descriptions: `src/seo.ts` (add a new route here and in `src/App.tsx`)
- Media appearances and speaking topics: `src/data/speaking.ts`
- Essays list: `src/pages/Essays.tsx`; poems: `src/pages/Poetry.tsx`
- Recent Substack posts on the homepage load live from `netlify/functions/substack-feed.js`
- Social preview image: `public/og.png`
