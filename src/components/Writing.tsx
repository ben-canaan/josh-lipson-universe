import { ExternalLink, Mic, PenLine, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
  const response = await fetch(
    "https://api.allorigins.win/get?url=" + encodeURIComponent("https://whitmanic.substack.com/feed")
  );
  const data = await response.json();
  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");
  const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);

  return items.map((item) => ({
    title: item.querySelector("title")?.textContent || "",
    link: item.querySelector("link")?.textContent || "",
    pubDate: new Date(item.querySelector("pubDate")?.textContent || "").toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    }),
    description: (item.querySelector("description")?.textContent || "")
      .replace(/<[^>]*>/g, "").slice(0, 150) + "...",
  }));
};

const Writing = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["substack-posts"],
    queryFn: fetchSubstackPosts,
    staleTime: 1000 * 60 * 30,
  });

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
              Essays and Reflections
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
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-body">Loading posts...</span>
                </div>
              )}
              {error && (
                <p className="text-sm text-muted-foreground font-body">
                  Unable to load posts. Visit Substack directly.
                </p>
              )}
              {posts?.map((post, i) => (
                <a
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-secondary/50 rounded border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <p className="text-xs text-muted-foreground font-body mb-1">{post.pubDate}</p>
                  <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{post.title}</p>
                  <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">{post.description}</p>
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
                { id: "MHdrURDOM8k", title: "Jewish, Psychedelic Journeys" },
                { id: "nLUHDqRW3Ds", title: "Psychedelics Today with Joe Moore" },
                { id: "y7rfmPkzNfs", title: "The Jewish Genetic Discovery Foundation" },
                { id: "WHiKO0EbQ00", title: "Razib Khan's Unsupervised Learning, with friends" },
                { id: "fBpfT2LCmAw", title: "Razib Khan's Unsupervised Learning, alone" },
                { id: "hZdAek_A08E", title: "Walt Whitman and the psychedelic experience" },
              ].map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-24 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-body mb-1">YouTube</p>
                      <p className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                        {video.title}
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
