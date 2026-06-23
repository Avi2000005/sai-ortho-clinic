import { Phone, Clock, CalendarDays, MapPin } from "lucide-react";

interface TopContactBarProps {
  onOpenAppointment: () => void;
}

export default function TopContactBar({ onOpenAppointment }: TopContactBarProps) {
  return (
    <div className="w-full bg-slate-900 text-slate-100 py-2.5 px-4 text-xs font-medium border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Contact Links & Locations */}
        <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-5 text-slate-300">
          <a 
            href="tel:+918149407269" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors py-0.5"
            id="top-phone-link"
          >
            <Phone className="w-3.5 h-3.5 text-secondary" />
            <span>+91 8149407269</span>
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="flex items-center gap-1.5 py-0.5">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>Mon - Fri (7 PM - 9 PM)</span>
          </div>
          <span className="hidden md:inline text-slate-700">|</span>
          <div className="hidden md:flex items-center gap-1.5 py-0.5">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            <span>Garkheda, Chh. Sambhajinagar</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAppointment}
            className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary text-slate-950 px-3.5 py-1 rounded-full font-semibold hover:shadow-md hover:shadow-primary/20 hover:brightness-105 active:scale-95 transition-all text-[11px]"
            id="top-appointment-btn"
          >
            <CalendarDays className="w-3 h-3 text-slate-950" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
