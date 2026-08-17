const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-body">
        <p>© {new Date().getFullYear()} Josh Lipson. All rights reserved.</p>
        <p className="italic font-display text-base">
          "Seeking thoughtful collaborations"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
