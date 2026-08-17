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
                  title: "Josh Lipson & Roman Palitsky: Psychedelic Harms and the Post-Psychedelic Challenges Study",
                  source: "Psychedelics Today",
                  link: "https://psychedelicstoday.com/2026/08/12/psychedelic-harms-post-psychedelic-challenges/",
                  thumbnail: "https://eynv69fbkkd.exactdn.com/wp-content/uploads/2026/08/PT660-Lipson-Palitsky.jpg",
                },
                {
                  title: "The State of Psychedelic Research: A Mycelial Explosion",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=10TIZQzzVvU",
                  thumbnail: "https://img.youtube.com/vi/10TIZQzzVvU/mqdefault.jpg",
                },
                {
                  title: "Jewish, Psychedelic Journeys",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=MHdrURDOM8k",
                  thumbnail: "https://img.youtube.com/vi/MHdrURDOM8k/mqdefault.jpg",
                },
                {
                  title: "Psychedelics Today with Joe Moore",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=nLUHDqRW3Ds",
                  thumbnail: "https://img.youtube.com/vi/nLUHDqRW3Ds/mqdefault.jpg",
                },
                {
                  title: "The Jewish Genetic Discovery Foundation",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=y7rfmPkzNfs",
                  thumbnail: "https://img.youtube.com/vi/y7rfmPkzNfs/mqdefault.jpg",
                },
                {
                  title: "Razib Khan's Unsupervised Learning, with friends",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=WHiKO0EbQ00",
                  thumbnail: "https://img.youtube.com/vi/WHiKO0EbQ00/mqdefault.jpg",
                },
                {
                  title: "Razib Khan's Unsupervised Learning, alone",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=fBpfT2LCmAw",
                  thumbnail: "https://img.youtube.com/vi/fBpfT2LCmAw/mqdefault.jpg",
                },
                {
                  title: "Walt Whitman and the psychedelic experience",
                  source: "YouTube",
                  link: "https://www.youtube.com/watch?v=hZdAek_A08E",
                  thumbnail: "https://img.youtube.com/vi/hZdAek_A08E/mqdefault.jpg",
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
                    <img
                      src={appearance.thumbnail}
                      alt={appearance.title}
                      className="w-24 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-body mb-1">{appearance.source}</p>
                      <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                        {appearance.title}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
