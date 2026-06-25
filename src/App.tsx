/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, CheckCircle2, Ticket } from "lucide-react";

// Components
import MedicalSEO from "./components/MedicalSEO";
import TopContactBar from "./components/TopContactBar";
import PremiumNavbar from "./components/PremiumNavbar";
import Footer from "./components/Footer";
import AppointmentModal from "./components/AppointmentModal";
import FloatingChatSupport from "./components/FloatingChatSupport";

// Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Treatments = lazy(() => import("./pages/Treatments"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));

import { Appointment } from "./types";
import { safeStorage } from "./utils/safeStorage";
import { safeScrollTo } from "./utils/safeScroll";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  
  // Specific item selections for deep page routing
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Appointment Modal state
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string>("");

  // Track if patient has registered custom bookings in this browser
  const [userBookings, setUserBookings] = useState<Appointment[]>([]);
  const [showStatusIndicator, setShowStatusIndicator] = useState(false);

  // Scroll to top of viewport on page or selection change
  useEffect(() => {
    safeScrollTo(0, "auto");
  }, [currentPage, selectedTreatmentId, selectedBlogId]);

  useEffect(() => {
    // Load local bookings
    const fetchBookings = () => {
      let existing = null;
      try {
        existing = safeStorage.getItem("sai_appointments");
      } catch (e) {
        console.warn("safeStorage fetch failure managed", e);
      }
      if (existing) {
        try {
          const list = JSON.parse(existing) as Appointment[];
          setUserBookings(list);
          if (list.length > 0) {
            setShowStatusIndicator(true);
          }
        } catch (e) {
          console.error("Failed to parse bookings", e);
        }
      }
    };

    fetchBookings();

    // Listen to changes securely
    try {
      if (typeof window !== "undefined") {
        window.addEventListener("appointmentsChanged", fetchBookings);
      }
    } catch (e) {
      console.warn(e);
    }
    return () => {
      try {
        if (typeof window !== "undefined") {
          window.removeEventListener("appointmentsChanged", fetchBookings);
        }
      } catch (e) {
        console.warn(e);
      }
    };
  }, []);

  // Open appointment with pre-set context
  const handleOpenAppointment = (treatmentName?: string) => {
    setPreselectedTreatment(treatmentName || "");
    setIsAppointmentOpen(true);
  };

  const handleSelectTreatmentFromHome = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setCurrentPage("treatments");
    safeScrollTo(0, "smooth");
  };

  const handleSelectBlogFromHome = (blogId: string) => {
    setSelectedBlogId(blogId);
    setCurrentPage("blogs");
    safeScrollTo(0, "smooth");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-primary/20 selection:text-primary-deep" id="applet-viewport">
      {/* Dynamic SEO Injector */}
      <MedicalSEO />

      {/* SECTION 1: Top Contact Bar */}
      <TopContactBar onOpenAppointment={() => handleOpenAppointment()} />

      {/* SECTION 2: Premium Sticky Navbar */}
      <PremiumNavbar 
        currentPage={currentPage}
        onPageChange={(pageId) => {
          setCurrentPage(pageId);
          setSelectedTreatmentId(null);
          setSelectedBlogId(null);
        }}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Main Content Area with AnimatePresence Page Transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full"
          >
            <Suspense fallback={
              <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="w-10 h-10 border-4 border-[#00D5C9] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">Loading Page...</p>
              </div>
            }>
              {currentPage === "home" && (
                <Home 
                  onPageChange={(p) => {
                    setCurrentPage(p);
                    setSelectedTreatmentId(null);
                    setSelectedBlogId(null);
                  }}
                  onOpenAppointment={() => handleOpenAppointment()}
                  onSelectTreatment={handleSelectTreatmentFromHome}
                  onSelectBlog={handleSelectBlogFromHome}
                />
              )}

              {currentPage === "about" && (
                <About onOpenAppointment={() => handleOpenAppointment()} />
              )}

              {currentPage === "treatments" && (
                <Treatments 
                  selectedTreatmentId={selectedTreatmentId}
                  onClearSelection={() => setSelectedTreatmentId(null)}
                  onOpenAppointment={(treatmentName) => handleOpenAppointment(treatmentName)}
                />
              )}

              {currentPage === "blogs" && (
                <Blogs 
                  selectedBlogId={selectedBlogId}
                  onClearSelection={() => setSelectedBlogId(null)}
                  onSelectBlog={setSelectedBlogId}
                  onOpenAppointment={() => handleOpenAppointment()}
                />
              )}

              {currentPage === "testimonials" && (
                <Testimonials onOpenAppointment={() => handleOpenAppointment()} />
              )}

              {currentPage === "contact" && (
                <Contact onOpenAppointment={() => handleOpenAppointment()} />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <Footer 
        onPageChange={(pageId) => {
          setCurrentPage(pageId);
          setSelectedTreatmentId(null);
          setSelectedBlogId(null);
        }}
        onOpenAppointment={() => handleOpenAppointment()}
      />

      {/* Floating Appointment Status Display (Only shown if user has booked slots in past) */}
      {showStatusIndicator && userBookings.length > 0 && (
        <div 
          className="fixed bottom-6 left-6 z-40 bg-white border border-slate-200/90 shadow-2xl p-4 rounded-2xl max-w-xs animate-slide-up text-left flex gap-3 items-start"
          id="appointment-floating-indicator"
        >
          <div className="bg-primary/15 p-2 rounded-xl text-primary-deep mt-0.5">
            <Ticket className="w-5 h-5 text-secondary-dark" />
          </div>
          <div className="space-y-1 font-sans">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active Slot
              </span>
              <button 
                onClick={() => setShowStatusIndicator(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-mono px-1"
                aria-label="Hide indicator"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">
              {userBookings[userBookings.length - 1].patientName}
            </p>
            <p className="text-[10px] text-slate-500">
              Dr. Phute Consult Plan is locked for <span className="font-semibold text-slate-700">{userBookings[userBookings.length - 1].date}</span>
            </p>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal popup */}
      <AppointmentModal 
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedTreatment={preselectedTreatment}
      />

      {/* Floating Action Buttons: WhatsApp & AI Chatbot */}
      <FloatingChatSupport />
    </div>
  );
}
