import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, ChevronRight } from "lucide-react";
import { safeScrollTo } from "../utils/safeScroll";
import LanguageTranslator from "./LanguageTranslator";

interface PremiumNavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onOpenAppointment: () => void;
}

export default function PremiumNavbar({ currentPage, onPageChange, onOpenAppointment }: PremiumNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Treatments", id: "treatments" },
    { label: "Blogs", id: "blogs" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      try {
        setIsScrolled((window.scrollY || 0) > 10);
      } catch (e) {
        console.warn(e);
      }
    };
    try {
      window.addEventListener("scroll", handleScroll);
    } catch (e) {
      console.warn(e);
    }
    return () => {
      try {
        window.removeEventListener("scroll", handleScroll);
      } catch (e) {
        console.warn(e);
      }
    };
  }, []);

  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
    safeScrollTo(0, "smooth");
  };

  return (
    <nav 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-100/30" 
          : "bg-white border-b border-slate-100"
      }`}
      id="main-premium-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Clinic Name */}
          <div 
            onClick={() => handleLinkClick("home")} 
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-container"
          >
            {/* Elegant Healthcare Vector Logo Frame */}
            <div className="flex items-center justify-center w-11 h-11 group-hover:scale-105 transition-transform" id="navbar-brand-logo-frame">
              <img 
                src="/images/logo.jpg" 
                alt="Sai Joint & Spine Clinic Logo" 
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1 select-none font-sans text-left">
                <span className="text-[#FF2222] text-xl font-black tracking-tight uppercase leading-none">
                  Sai
                </span>
                <span className="text-[#00D5C9] text-base font-black tracking-tight uppercase leading-none sm:text-lg">
                  Joint & Spine
                </span>
                <span className="text-[#FF2222] text-base font-black tracking-tight uppercase leading-none sm:text-lg">
                  Clinic
                </span>
              </div>
              <span className="block text-[9px] font-bold text-slate-400 tracking-widest mt-1 uppercase select-none font-mono text-left">
                Precision with Compassion
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  currentPage === item.id 
                    ? "text-primary-deep" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
                id={`navbar-link-${item.id}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions (Call Now, Book Appt) */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3.5">
            <LanguageTranslator />
            <a
              href="tel:+918149407269"
              className="flex items-center gap-1.5 px-3 xl:px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              id="navbar-call-btn"
            >
              <Phone className="w-3.5 h-3.5 text-primary-dark" />
              <span>Call Now</span>
            </a>
            <button
              onClick={onOpenAppointment}
              className="flex items-center gap-1.5 px-3 xl:px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-primary-dark via-primary to-secondary rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all text-shadow-sm cursor-pointer"
              id="navbar-book-btn"
            >
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 border border-slate-100 hover:text-slate-900 focus:outline-none transition-colors"
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-slide-down" id="mobile-navigation-dropdown">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === item.id 
                    ? "bg-primary/10 text-primary-deep" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                id={`mobile-navbar-link-${item.id}`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            {/* Mobile Language Translator */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-4 mt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Language</span>
              <LanguageTranslator />
            </div>

            {/* Mobile Actions block */}
            <div className="pt-4 grid grid-cols-2 gap-3 border-t border-slate-100 mt-2">
              <a
                href="tel:+918149407269"
                className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <Phone className="w-4 h-4 text-primary-dark" />
                <span>Call Now</span>
              </a>
              <button
                onClick={() => { setIsOpen(false); onOpenAppointment(); }}
                className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-primary-dark to-secondary rounded-xl shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
