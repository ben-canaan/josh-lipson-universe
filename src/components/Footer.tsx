const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-body">
        <p>© {new Date().getFullYear()} Josh Lipson. All rights reserved.</p>
        <p className="font-display text-base">
          <span lang="ar" dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} className="text-sm">مفرد بصيغة الجمع</span>
          <span className="italic"> · singular, in the form of the plural</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
