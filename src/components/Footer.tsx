import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { safeScrollTo } from "../utils/safeScroll";

interface FooterProps {
  onPageChange: (pageId: string) => void;
  onOpenAppointment: () => void;
}

export default function Footer({ onPageChange, onOpenAppointment }: FooterProps) {
  
  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    safeScrollTo(0, "smooth");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t-2 border-primary" id="main-clinic-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10">
                <img 
                  src="/images/logo.jpg" 
                  alt="Sai Joint & Spine Clinic Logo" 
                  className="w-9 h-9 object-contain rounded-lg"
                />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1 select-none font-sans">
                  <span className="text-[#FF2222] text-base font-black tracking-tight uppercase leading-none">
                    Sai
                  </span>
                  <span className="text-[#00D5C9] text-sm font-black tracking-tight uppercase leading-none">
                    Joint & Spine
                  </span>
                  <span className="text-[#FF2222] text-sm font-black tracking-tight uppercase leading-none">
                    Clinic
                  </span>
                </div>
                <span className="block text-[8px] font-bold text-slate-400 tracking-widest mt-1 uppercase font-mono">
                  Precision With Compassion
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Leading clinic in the Marathwada region specializing in robotic-assisted joint replacements, microscopic spine operations, ligament repair, and complete bone trauma management.
            </p>
            <div className="flex items-center gap-2.5 pt-2 text-xs text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-slate-300">NABH Standards Clinic</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-secondary pl-2.5">
              Explore Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home Base", id: "home" },
                { label: "Doctor Profile", id: "about" },
                { label: "Clinical Treatments", id: "treatments" },
                { label: "Medical Blogs", id: "blogs" },
                { label: "Patient Reviews", id: "testimonials" },
                { label: "Contact Clinic", id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-primary" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinic Hours */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-secondary pl-2.5">
              Surgical Hours
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Monday to Friday</p>
                  <p className="text-xs text-slate-400 mt-0.5">07:00 PM – 09:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-500">Saturday & Sunday</p>
                  <p className="text-xs text-slate-600 mt-0.5">Closed (Emergency Only)</p>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenAppointment}
              className="w-full text-center py-2.5 border-2 border-dashed border-primary/40 hover:border-primary text-primary hover:text-white text-xs font-bold rounded-xl transition-all"
            >
              Request Private Slot
            </button>
          </div>

          {/* Column 4: Location Info */}
          <div className="space-y-5 font-sans">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-secondary pl-2.5">
              Contact Desk
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra 431009 <br />
                  <span className="text-primary font-medium">(Beside Sai Urology Hospital)</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="tel:+918149407269" className="hover:text-white text-xs">
                  +91 8149407269
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href="tel:02402993122" className="hover:text-white text-xs">
                  0240 2993122 (Landline)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a href="mailto:saiortho@gmail.com" className="hover:text-white text-xs text-secondary underline">
                  saiortho@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Association Footnotes */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} <a href="https://www.shivcoretech.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 hover:underline transition-all">Renvora Technologies Pvt. Ltd.</a>, Chh. Sambhajinagar. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-slate-600 justify-center">
            <span>ISO 9001:2015 Approved</span>
            <span>•</span>
            <span>Dr. Uday Phute, Consultant Surgeons</span>
            <span>•</span>
            <span>Chh. Sambhajinagar Orthopedic Alliance</span>
          </div>
          <p className="flex items-center gap-1 hover:text-white transition-colors">
            <span>Made with Care for Marathwada</span>
            <Heart className="w-3.5 h-3.5 text-accent animate-pulse" />
          </p>
        </div>

      </div>
    </footer>
  );
}
