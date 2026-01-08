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
    "https://api.rss2json.com/v1/api.json?rss_url=https://whitmanic.substack.com/feed"
  );
  const data = await response.json();
  
  if (data.status !== "ok") {
    throw new Error("Failed to fetch RSS feed");
  }
  
  return data.items.slice(0, 5).map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: new Date(item.pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    description: item.description?.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
  }));
};

const Writing = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["substack-posts"],
    queryFn: fetchSubstackPosts,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Writing column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <PenLine className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Writing
              </h2>
            </div>
            
            <h3 className="font-display text-3xl text-foreground mb-6">
              Essays & Reflections
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
            
            {/* Substack posts */}
            <div className="mt-8 space-y-4">
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-body">Loading posts...</span>
                </div>
              )}
              
              {error && (
                <p className="text-sm text-muted-foreground font-body">
                  Unable to load posts. <a href="https://whitmanic.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit Substack directly →</a>
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
          
          {/* Media column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-5 h-5 text-primary" />
              <h2 className="text-sm tracking-[0.3em] uppercase text-primary font-body">
                Media
              </h2>
            </div>
            
            <h3 className="font-display text-3xl text-foreground mb-6">
              Appearances & Interviews
            </h3>
            
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Conversations on podcasts, panels, and publications exploring the frontiers of consciousness research and meaning.
            </p>
            
            {/* Placeholder for media appearances */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-body mb-1">
                        Podcast / Interview
                      </p>
                      <p className="font-display text-lg text-foreground">
                        Media appearance {i}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
