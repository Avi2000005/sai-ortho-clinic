import React, { useState, useEffect } from "react";
import { Star, MessageSquareCode, Heart, CheckCircle2, ShieldAlert, Award, ArrowRight, X, User } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";
import { Testimonial } from "../types";
import { safeStorage } from "../utils/safeStorage";

interface TestimonialsProps {
  onOpenAppointment: () => void;
}

export default function Testimonials({ onOpenAppointment }: TestimonialsProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Google Review" | "Patient Story" | "Success Story">("All");

  // Load reviews from local state & localStorage
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    let local = null;
    try {
      local = safeStorage.getItem("sai_testimonials");
    } catch (e) {
      console.warn(e);
    }
    if (local) {
      try {
        setReviews(JSON.parse(local));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setReviews(TESTIMONIALS);
  }, []);

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    text: "",
    rating: 5,
    condition: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) {
      setErrorMsg("Please fill in your Name and Review comments.");
      return;
    }
    
    setErrorMsg(null);
    setLoading(true);
    setTimeout(() => {
      const freshReview: Testimonial = {
        id: "user-review-" + Date.now(),
        author: newReview.author,
        text: newReview.text,
        rating: newReview.rating,
        date: "Just now",
        type: "Google Review",
        condition: newReview.condition || "General Consultation",
      };

      const updated = [freshReview, ...reviews];
      setReviews(updated);
      try {
        safeStorage.setItem("sai_testimonials", JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }

      setSubmitSuccess(true);
      setLoading(false);
      setNewReview({ author: "", text: "", rating: 5, condition: "" });
      setErrorMsg(null);
    }, 1000);
  };

  const filteredReviews = reviews.filter((t) => {
    return activeFilter === "All" || t.type === activeFilter;
  });

  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fade-in" id="testimonials-view-container">
      
      {/* Page Title Header */}
      <section className="bg-white border-b border-slate-205 py-16 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3">
            <span className="editorial-tag">
              Patient Experiences
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Verified Patient Testimonials
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
              We stand tall on absolute clinical results. Explore verified Google page ratings, patient healing timelines, and long-term feedback from patients across Marathwada.
            </p>
          </div>
        </div>
      </section>

      {/* Main Reviews Container with Average Rating Block */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Rating Dashboard Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-905 uppercase tracking-wider border-l-2 border-secondary pl-2.5">
                Rating Overview
              </h3>
              
              <div className="text-center space-y-2 py-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-5xl font-black text-slate-900 leading-none">4.9</p>
                <div className="flex justify-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                  Based on 248+ Google Reviews
                </p>
              </div>

              {/* Verified progress lines */}
              <div className="space-y-3.5 text-xs">
                {[
                  { star: 5, pct: "94%" },
                  { star: 4, pct: "5%" },
                  { star: 3, pct: "1%" },
                  { star: 1, pct: "0%" }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3">
                    <span className="font-bold text-slate-600 font-mono w-2">{row.star}★</span>
                    <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: row.pct }} />
                    </div>
                    <span className="font-medium text-slate-400 font-mono w-8 text-right">{row.pct}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Verified Medical Registrations</span>
                </div>
                <p className="text-slate-400 pl-7 leading-relaxed">
                  All shared stories match authentic patient folders with physical diagnostic verification.
                </p>
              </div>
            </div>

            {/* Filter tags panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3.5">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-2 border-secondary pl-2.5">
                Experience Types
              </h4>
              <div className="space-y-1.5 text-xs font-sans">
                {[
                  { id: "All", label: "All Stories & Reviews" },
                  { id: "Google Review", label: "Google Verified Reviews" },
                  { id: "Patient Story", label: "Patient Recovery Journeys" },
                  { id: "Success Story", label: "Post-Surgical Successes" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFilter(item.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all border ${
                      activeFilter === item.id
                        ? "bg-primary/10 border-primary/25 text-primary-deep font-bold"
                        : "bg-white border-transparent text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Reviews Grid display */}
          <div className="lg:col-span-8 space-y-6 font-sans">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="testimonials-list-grid">
              {filteredReviews.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-205 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    
                    {/* Meta Star and tag row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(item.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 px-2.5 py-0.5 border border-slate-200 bg-slate-50 rounded-full">
                        {item.type}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Profile Section */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Name initials representation frame */}
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 border border-primary/10 text-primary-deep font-extrabold flex items-center justify-center text-xs">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 leading-none">{item.author}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.condition || "General Consultation"}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      {item.date}
                    </span>
                  </div>

                </div>
              ))}
            </div>

            {/* Custom CTA widget for Writing a Google Review */}
            <div className="bg-slate-900 p-6 rounded-3xl text-left border border-slate-855 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white leading-tight">Had a Great Experience with Dr. Phute?</h4>
                <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                  Share your recovery story to give confidence to others suffering from spine problems in Maharashtra.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setIsWriteModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary via-primary to-secondary text-slate-950 text-xs font-black rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md"
                id="write-google-review-btn"
              >
                <span>Write a Google Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Pop-up Interactive Google Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in font-sans" id="google-review-modal-overlay">
          <div className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl transition-all duration-305 transform scale-100" id="google-review-modal-body">
            
            {/* Header aesthetic ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />

            <div className="p-6 text-left relative">
              <button 
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute p-1.5 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close dialog"
                id="close-review-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitSuccess ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-1 pr-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      Write a Google Review
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your high rating and words let Dr. Uday Phute know your recovery timeline was outstanding.
                    </p>

                    {errorMsg && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl font-medium mt-2 animate-shake">
                        ⚠️ {errorMsg}
                      </div>
                    )}
                  </div>

                  {/* Rating selection row */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Rating Experience</label>
                    <div className="flex gap-1.5 items-center">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: starValue }))}
                          className="p-0.5 hover:scale-110 transition-transform"
                          id={`star-select-${starValue}`}
                        >
                          <Star 
                            className={`w-7 h-7 ${
                              starValue <= newReview.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-slate-200 fill-transparent"
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2 font-mono">
                        {newReview.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kulkarni"
                      value={newReview.author}
                      onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                      id="review-author-name"
                    />
                  </div>

                  {/* Treated area or symptom */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      Condition Treated
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lumbar Spondylosis, Knee Arthritis"
                      value={newReview.condition}
                      onChange={(e) => setNewReview(prev => ({ ...prev, condition: e.target.value }))}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                      id="review-condition-field"
                    />
                  </div>

                  {/* Review Text */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Your Experiential Review</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your recovery process, clinic hospitality, and experience with Dr. Phute..."
                      value={newReview.text}
                      onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 leading-relaxed resize-none"
                      id="review-text-field"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="flex-1 py-2.5 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-center"
                      id="review-cancel-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all text-center"
                      id="review-publish-btn"
                    >
                      {loading ? "Publishing..." : "Publish Google Review"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 font-sans animate-fade-in" id="review-success-panel">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-black text-slate-900">Google Review Published!</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                      Thank you for your valuable feedback! Your testimonial of joint and spinal improvement has been added to our verified medical registry of recovery success.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWriteModalOpen(false)}
                    className="w-full max-w-xs py-2.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition-all"
                    id="review-success-close-btn"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
