import { useEffect, useState } from "react";
import { ExternalLink, Mic, PenLine } from "lucide-react";

const FALLBACK_POSTS = [
  {
    title: "The hard problem of AI therapy",
    subtitle: "Why even 'perfect' AI therapy may be structurally doomed.",
    pubDate: "February 26, 2026",
    link: "https://whitmanic.substack.com/p/the-hard-problem-of-ai-therapy",
  },
  {
    title: "The most important pop stars of the future will be religious",
    subtitle: "On LUX, Rosalía's metamodern Catholic masterpiece.",
    pubDate: "November 21, 2025",
    link: "https://whitmanic.substack.com/p/the-most-important-pop-stars-of-the",
  },
  {
    title: "Why the optimal amount of delulu is not zero",
    subtitle: "And the opposite of depression is not what you think.",
    pubDate: "November 28, 2025",
    link: "https://whitmanic.substack.com/p/the-optimal-amount-of-delulu-is-not",
  },
  {
    title: "Semitic triangles: the romance of the three-letter root",
    subtitle: "On the most obscure game in the world.",
    pubDate: "December 29, 2025",
    link: "https://whitmanic.substack.com/p/semitic-triangles-the-most-obscure",
  },
  {
    title: "Why psychedelics don't fit the drug paradigm",
    subtitle: "A case for thinking differently about psychedelic substances.",
    pubDate: "",
    link: "https://whitmanic.substack.com/p/why-psychedelics-dont-fit-the-drug",
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
            <a
              href="https://whitmanic.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-body group"
            >
              <span className="border-b border-foreground/20 group-hover:border-primary pb-1">
                Read on Substack
              </span>
              <ExternalLink className="w-4 h-4" />
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
              {[
                {
                  title: "Psychedelic Harms and the Post-Psychedelic Challenges Study",
                  source: "Psychedelics Today",
                  link: "https://psychedelicstoday.com/2026/08/12/psychedelic-harms-post-psychedelic-challenges/",
                  thumbnail: "https://eynv69fbkkd.exactdn.com/wp-content/uploads/2026/08/PT660-Lipson-Palitsky.jpg",
                },
                {
                  title: "The State of Psychedelic Research: A Mycelial Explosion",
                  source: "Mushroom Club of Georgia",
                  link: "https://www.youtube.com/watch?v=10TIZQzzVvU",
                  thumbnail: "https://img.youtube.com/vi/10TIZQzzVvU/mqdefault.jpg",
                },
                {
                  title: "Jewish, Psychedelic Journeys",
                  source: "Judaism Unbound",
                  link: "https://www.judaismunbound.com/podcast/episode-523-zac-kamenetz-josh-lipson",
                  thumbnail: null,
                },
                {
                  title: "Emory's Psychedelic Challenges Project: Speaking Nuance to Hype",
                  source: "Atlanta Mushroom Festival",
                  link: "https://www.youtube.com/watch?v=y0Tz2D77hfU",
                  thumbnail: "https://img.youtube.com/vi/y0Tz2D77hfU/mqdefault.jpg",
                },
                {
                  title: "The Jewish Genetic Discovery Foundation",
                  source: "Launch at Kehila Kedosha Janina",
                  link: "https://www.youtube.com/watch?v=y7rfmPkzNfs",
                  thumbnail: "https://img.youtube.com/vi/y7rfmPkzNfs/mqdefault.jpg",
                },
                {
                  title: "How Psychedelics Impact the Mind: Mysticism, Mental Health, and the Future of Psychedelic Research",
                  source: "Psychedelics Today",
                  link: "https://psychedelicstoday.com/2025/02/04/how-psychedelics-impact-the-mind-mysticism-mental-health-and-the-future-of-psychedelic-research/",
                  thumbnail: "https://eynv69fbkkd.exactdn.com/wp-content/uploads/2025/02/PT584-Josh-Lipson.jpg",
                },
                {
                  title: "The Medieval Origins of the Ashkenazim",
                  source: "Razib Khan's Unsupervised Learning",
                  link: "https://razib.substack.com/p/joshua-lipson-aric-lomes-and-leo",
                  thumbnail: null,
                },
                {
                  title: "On Jewish Genetic Genealogy",
                  source: "Razib Khan's Unsupervised Learning",
                  link: "https://www.razibkhan.com/p/joshua-lipson-on-jewish-genetic-genealogy",
                  thumbnail: null,
                },
              ].map((appearance) => (
                <a
                  key={appearance.link}
                  href={appearance.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {appearance.thumbnail ? (
                      <img
                        src={appearance.thumbnail}
                        alt={appearance.title}
                        className="w-24 h-14 object-cover rounded shrink-0"
                      />
                    ) : (
                      <div className="w-24 h-14 rounded bg-secondary flex items-center justify-center shrink-0">
                        <Mic className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-body mb-1">{appearance.source}</p>
                      <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                        {appearance.title}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
