// Per-route titles and descriptions. Used for the browser tab on navigation
// and written into each pre-rendered page by scripts/prerender.mjs.
export const SITE_URL = "https://josh-lipson.com";

export type RouteMeta = { title: string; description: string };

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Josh Lipson | Psychologist • Historian • Poet",
    description:
      "Clinical psychologist, researcher, and writer exploring psychedelics, meaning-making, deep history, and consciousness.",
  },
  "/essays": {
    title: "Essays & Projects | Josh Lipson",
    description:
      "Essays from Whit·manic and elsewhere, academic work, and ongoing projects across psychology, psychedelics, history, language, and religion.",
  },
  "/poetry": {
    title: "Poetry | Josh Lipson",
    description:
      "Poems by Josh Lipson, with credits in Angel City Review, KGB Bar Lit Magazine, Obra/Artifact, Homonym Journal, and elsewhere.",
  },
  "/artwork": {
    title: "Artwork | Josh Lipson",
    description:
      "Paintings and ink work by Josh Lipson, with Hebrew and Arabic calligraphy.",
  },
  "/speaking": {
    title: "Speaking | Josh Lipson",
    description:
      "Lectures, scholar-in-residence weekends, podcasts, and panels on psychedelics and spirituality, Jewish genetics and deep history, and meaning under uncertainty.",
  },
  "/services": {
    title: "Work With Me | Josh Lipson",
    description:
      "Psychotherapy, speaking, media, advisory work, and teaching with Josh Lipson.",
  },
};

export const notFoundMeta: RouteMeta = {
  title: "Page not found | Josh Lipson",
  description: "This page doesn't exist.",
};
