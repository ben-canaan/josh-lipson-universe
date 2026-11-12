import { useState } from "react";
import { ExternalLink, Mic } from "lucide-react";
import type { Appearance } from "@/data/speaking";

const AppearanceCard = ({ appearance }: { appearance: Appearance }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = appearance.thumbnail && !imgFailed;

  return (
    <a
      href={appearance.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-card rounded-lg shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {showImage ? (
          <img
            src={appearance.thumbnail!}
            alt={appearance.title}
            className="w-24 h-14 object-cover rounded shrink-0"
            onError={() => setImgFailed(true)}
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
  );
};

export default AppearanceCard;
