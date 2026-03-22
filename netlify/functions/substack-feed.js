export default async (req, context) => {
  try {
    const response = await fetch("https://whitmanic.substack.com/feed", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; josh-lipson-site/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch feed" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const xml = await response.text();

    // Parse items from RSS XML
    const items = [];
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

    for (const match of itemMatches) {
      const item = match[1];

      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        ?? item.match(/<title>(.*?)<\/title>/)?.[1]
        ?? "";

      const link = item.match(/<link>(.*?)<\/link>/)?.[1]
        ?? item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1]
        ?? "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

      const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
        ?? item.match(/<description>(.*?)<\/description>/)?.[1]
        ?? "";

      // Strip HTML tags from description for plain text subtitle
      const subtitle = description.replace(/<[^>]+>/g, "").slice(0, 120).trim();

      if (title && link) {
        items.push({ title, link, pubDate, subtitle });
      }

      if (items.length >= 5) break;
    }

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600", // cache for 1 hour
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/substack-feed",
};
