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
              Essays & Reflections
            </h3>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Explorations in meaning-making, consciousness, history, and the human condition. Subscribe to stay connected with new work.
            </p>
            
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
                  Unable to load posts. <a href="https://whitmanic.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit Substack directly →</a>
                </p>
