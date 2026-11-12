// Build-time entry: renders one route to an HTML string for scripts/prerender.mjs.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { routeMeta, notFoundMeta, SITE_URL } from "./seo";

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
