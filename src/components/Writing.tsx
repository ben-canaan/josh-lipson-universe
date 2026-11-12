import { useEffect, useState } from "react";
import { ExternalLink, Mic, PenLine } from "lucide-react";
import AppearanceCard from "@/components/AppearanceCard";
import { appearances } from "@/data/speaking";

// Shown until the live feed loads (and in the pre-rendered HTML).
const FALLBACK_POSTS = [
  {
    title: "Out of the institution, into the (friendly) abyss",
    subtitle: "I'm leaving academia and going into practice",
    pubDate: "September 29, 2026",
    link: "https://whitmanic.substack.com/p/out-of-the-institution-into-the-friendly",
  },
  {
    title: "Rosh HaShana, Yom Kippur, and the Political Compass",
    subtitle: "Liturgical poetry across the four quadrants",
    pubDate: "September 11, 2026",
    link: "https://whitmanic.substack.com/p/rosh-hashana-yom-kippur-and-the-political",
  },
  {
    title: "The veil is thin with these people",
    subtitle: "From the Unit, #4",
    pubDate: "August 20, 2026",
    link: "https://whitmanic.substack.com/p/the-veil-is-thin-with-these-people",
  },
  {
    title: "The view from Fatma Hanım's house",
    subtitle: "September-October 2014",
    pubDate: "July 5, 2026",
    link: "https://whitmanic.substack.com/p/the-view-from-fatma-hanms-house",
  },
  {
    title: "Sorry to burst your bubble?",
    subtitle: "Metaphor, placebo, and the ethics of disenchantment",
    pubDate: "May 17, 2026",
    link: "https://whitmanic.substack.com/p/sorry-to-burst-your-bubble",
  },
];

const Writing = () => {
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/api/substack-feed")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setPosts(
            data.items.map((item: any) => ({
              title: item.title,
              subtitle: item.subtitle,
              pubDate: item.pubDate
                ? new Date(item.pubDate).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "",
              link: item.link,
            }))
          );
        }
      })
      .catch(() => {
        // silently keep fallback
      });
  }, []);

  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <PenLine className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Writing
              </h2>
            </div>
            <h3 className="font-display text-3xl text-foreground mb-6">
              Recent Writing
            </h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Explorations in meaning-making, consciousness, history, and the human condition. Subscribe to stay connected with new work.
            </p>
<iframe
              src="https://whitmanic.substack.com/embed"
              title="Subscribe to Whit·manic"
              loading="lazy"
              className="w-full h-[150px] rounded border border-border/50 bg-white"
            />
            <a
              href="https://whitmanic.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-foreground hover:text-primary transition-colors font-body group"
            >
              <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
                Read on Substack
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="mt-8 space-y-4">
              {posts.map((post, i) => (
                <a
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-secondary/50 rounded border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  {post.pubDate && (
                    <p className="text-xs text-muted-foreground font-body mb-1">{post.pubDate}</p>
                  )}
                  <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{post.title}</p>
                  {post.subtitle && (
                    <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">{post.subtitle}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Media
              </h2>
            </div>
            <h3 className="font-display text-3xl text-foreground mb-6">
              Appearances and Interviews
            </h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Conversations on podcasts, panels, and publications exploring the frontiers of consciousness research and meaning.
            </p>
            <div className="space-y-4">
              {appearances.map((appearance) => (
                <AppearanceCard key={appearance.link} appearance={appearance} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
