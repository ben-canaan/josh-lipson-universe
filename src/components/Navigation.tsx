import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import bannerImage from "@/assets/banner.png";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Writing", href: "/#writing" },
  { label: "Poetry", href: "/poetry" },
  { label: "Artwork", href: "/artwork" },
  { label: "Contact", href: "/#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const element = document.querySelector(href.slice(1));
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderNavLink = (item: { label: string; href: string }) => {
    if (item.href.startsWith("/#")) {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={() => handleNavClick(item.href)}
          className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link
        key={item.label}
        to={item.href}
        className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
      >
        {item.label}
      </Link>
    );
  };

  const renderMobileNavLink = (item: { label: string; href: string }) => {
    if (item.href.startsWith("/#")) {
      return (
        <a
          key={item.label}
          href={item.href}
          className="block text-lg font-display text-foreground hover:text-primary transition-colors"
          onClick={() => handleNavClick(item.href)}
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link
        key={item.label}
        to={item.href}
        className="block text-lg font-display text-foreground hover:text-primary transition-colors"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Banner background */}
      <div 
        className="fixed top-0 left-0 right-0 h-20 z-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isScrolled ? 0.95 : 0.7,
          transition: "opacity 0.3s ease",
        }}
      />
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md shadow-soft py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg text-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            مفرد بصيغة الجمع
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(renderNavLink)}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-elevated">
            <div className="px-6 py-6 space-y-4">
              {navItems.map(renderMobileNavLink)}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
