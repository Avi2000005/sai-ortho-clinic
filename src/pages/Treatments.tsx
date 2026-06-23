import { useState, useEffect } from "react";
import { ArrowLeft, Cpu, Activity, Flame, FlameKindling, Layers, ShieldAlert, Sparkles, ThermometerSun, HeartPulse, Grid, HelpCircle, ChevronDown, Check, CalendarDays, Phone } from "lucide-react";
import { TREATMENTS } from "../data/treatments";
import { Treatment } from "../types";
import { safeScrollTo } from "../utils/safeScroll";

interface TreatmentsProps {
  selectedTreatmentId: string | null;
  onClearSelection: () => void;
  onOpenAppointment: (treatmentName?: string) => void;
}

export default function Treatments({ selectedTreatmentId, onClearSelection, onOpenAppointment }: TreatmentsProps) {
  const [currentTreatment, setCurrentTreatment] = useState<Treatment | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "symptoms" | "causes" | "diagnosis" | "treatment" | "recovery" | "faq">("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedTreatmentId) {
      const found = TREATMENTS.find((t) => t.id === selectedTreatmentId);
      if (found) {
        setCurrentTreatment(found);
        setActiveTab("overview");
        setOpenFaqIndex(null);
      }
    } else {
      setCurrentTreatment(null);
    }
  }, [selectedTreatmentId]);

  // Map icon name string to Lucide React components safely
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-6 h-6 text-secondary-dark" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-secondary" />;
      case "FlameKindling":
        return <FlameKindling className="w-6 h-6 text-secondary-dark" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-secondary" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-secondary-dark" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-secondary" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-secondary-dark" />;
      case "ThermometerSun":
        return <ThermometerSun className="w-6 h-6 text-secondary" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-secondary-dark" />;
      case "Grid":
        return <Grid className="w-6 h-6 text-secondary" />;
      default:
        return <Activity className="w-6 h-6 text-secondary" />;
    }
  };

  const handleTreatmentClick = (t: Treatment) => {
    setCurrentTreatment(t);
    setActiveTab("overview");
    setOpenFaqIndex(null);
    safeScrollTo(0, "smooth");
  };

  const handleBackClick = () => {
    onClearSelection();
    setCurrentTreatment(null);
    safeScrollTo(0, "smooth");
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fade-in" id="treatments-view-container">
      
      {!currentTreatment ? (
        /* ================= ALL TREATMENTS LISTING MODE ================= */
        <div id="treatments-directory-view">
          {/* Header */}
          <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="space-y-3">
                <span className="editorial-tag">
                  Surgical & Non-Surgical Registry
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Our Clinical Specialties
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
                  Explore comprehensive diagnostic pathways and medical procedures for all ten orthopedic and spine disciplines offered at Sai Joint & Spine Clinic, Chh. Sambhajinagar.
                </p>
              </div>
            </div>
          </section>

          {/* List Section Grid */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TREATMENTS.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => handleTreatmentClick(t)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between text-left group"
                >
                  <div>
                    <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl text-primary-deep shadow-sm">
                        {renderIcon(t.iconName)}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary-deep transition-colors leading-snug">
                        {t.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {t.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary-deep group-hover:text-primary-dark transition-colors">
                      <span>View Medical Guideline</span>
                      <ChevronDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* ================= INDIVIDUAL DETAILED TREATMENT VIEW ================= */
        <div id="treatments-detail-view" className="bg-white">
          
          {/* Detailed Back trigger Navbar */}
          <div className="bg-slate-100/60 border-b border-slate-200/80 sticky top-[80px] z-20 py-3.5 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-250 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-all font-mono shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Specialties</span>
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Viewing Treatment:</span>
                <span className="text-xs font-extrabold text-slate-800 bg-white border border-slate-250 px-2.5 py-1 rounded-lg">
                  {currentTreatment.name}
                </span>
              </div>

              <button
                onClick={() => onOpenAppointment(currentTreatment.name)}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-dark to-secondary text-slate-950 text-xs font-extrabold rounded-xl hover:brightness-110 active:scale-95 shadow-md shadow-primary/10 transition-all"
              >
                Schedule Consult
              </button>
            </div>
          </div>

          {/* Dynamic Interactive Panel layout */}
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Tab Navigation Column */}
              <div className="lg:col-span-3 space-y-2">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1.5 sticky top-[150px]">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2.5 font-mono">
                    Treatment Sections
                  </p>
                  {[
                    { id: "overview", label: "Overview & Info" },
                    { id: "symptoms", label: "Typical Symptoms" },
                    { id: "causes", label: "Underlying Causes" },
                    { id: "diagnosis", label: "Advanced Diagnosis" },
                    { id: "treatment", label: "Treatment Pathways" },
                    { id: "recovery", label: "Recovery Timeline" },
                    { id: "faq", label: "Treatments FAQ" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setOpenFaqIndex(null);
                      }}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                        activeTab === tab.id 
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/25 text-primary-deep" 
                          : "bg-white border-transparent text-slate-600 hover:bg-white hover:border-slate-200 hover:text-slate-900"
                      }`}
                    >
                      <span>{tab.label}</span>
                      {activeTab === tab.id && <Check className="w-3.5 h-3.5 text-secondary-dark" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Contents Panel Display */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Visual Header card */}
                <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 bg-slate-200 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent z-10" />
                  <img
                    src={currentTreatment.image}
                    alt={currentTreatment.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-white space-y-2">
                    <div className="inline-flex items-center justify-center h-10 w-10 bg-white/90 rounded-xl text-primary-deep mb-2">
                      {renderIcon(currentTreatment.iconName)}
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {currentTreatment.name}
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl line-clamp-2">
                      {currentTreatment.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Sub-section display areas */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 shadow-sm" id="tab-content-area">
                  
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Medical Overview</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {currentTreatment.overview}
                      </p>
                      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-xs font-bold text-slate-800">Target Group</p>
                          <p className="text-xs text-slate-500 mt-1">Patients suffering from chronic localized spinal, knee, rotator structure wear or acute musculoskeletal collisions.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-xs font-bold text-slate-800">Surgical Philosophy</p>
                          <p className="text-xs text-slate-500 mt-1">Minimally invasive keyhole entry preserving maximum muscular integrity for rapid discharge and movement.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "symptoms" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Typical Symptoms & Signs</h3>
                      <p className="text-slate-500 text-xs">Patients diagnosed with this condition or showing these symptoms should consult medical guidance soon:</p>
                      <ul className="space-y-3 pt-2">
                        {currentTreatment.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed bg-rose-50/15 border border-rose-500/5 p-3 rounded-lg">
                            <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "causes" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Underlying Causes</h3>
                      <p className="text-slate-500 text-xs">How this disease or wear forms in anatomical systems:</p>
                      <ul className="space-y-3 pt-2">
                        {currentTreatment.causes.map((cause, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                            <span className="w-5 h-5 bg-primary/10 rounded-full text-primary-deep text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "diagnosis" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Advanced Diagnostic Protocols</h3>
                      <p className="text-slate-500 text-xs">Recommended imaging assays and diagnostic methodologies at Sai Joint & Spine Clinic:</p>
                      <ul className="space-y-3 pt-2">
                        {currentTreatment.diagnosis.map((diag, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                            <span className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-success text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                            <span>{diag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "treatment" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Clinical Solutions & Surgical Interventions</h3>
                      <p className="text-slate-500 text-xs">Possible medical directions depending on grade and diagnostics results:</p>
                      <ul className="space-y-3 pt-2">
                        {currentTreatment.treatment.map((treat, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-l-primary p-3 rounded-r-lg">
                            <span className="font-bold text-primary-deep flex-shrink-0 text-xs bg-white border border-primary/20 h-5 w-5 rounded-md flex items-center justify-center mt-0.5">{idx + 1}</span>
                            <span>{treat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "recovery" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Patient Recovery & Rehabilitation</h3>
                      <p className="text-slate-500 text-xs">Standard pathways to resume normal daily routines after treatment:</p>
                      <ul className="space-y-3 pt-2">
                        {currentTreatment.recovery.map((rec, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed bg-emerald-50/15 border border-emerald-500/5 p-3 rounded-lg">
                            <span className="w-5 h-5 bg-emerald-50 text-success text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "faq" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold text-slate-900">Treatment FAQs</h3>
                      <p className="text-slate-500 text-xs">Frequently asked surgical variables clarified directly by Dr. Phute:</p>
                      
                      <div className="space-y-3.5 pt-2">
                        {currentTreatment.faqs.map((faq, idx) => (
                          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <button
                              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                              className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100/50 transition-colors flex justify-between items-center gap-3"
                            >
                              <span className="text-xs sm:text-sm font-bold text-slate-800">{faq.q}</span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform ${openFaqIndex === idx ? "rotate-180" : ""}`} />
                            </button>
                            {openFaqIndex === idx && (
                              <div className="px-5 py-4 border-t border-slate-150 text-xs text-slate-600 leading-relaxed bg-white">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Localized detailed contact request card */}
                <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] font-extrabold text-secondary uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                        Direct Consult with Dr. Phute
                      </span>
                      <h4 className="text-lg font-bold">Personalized {currentTreatment.name} Advice</h4>
                      <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
                        Schedule a complete biomechanical check at our Chh. Sambhajinagar clinic. Please remember to bring your medical records for Dr. Phute.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => onOpenAppointment(currentTreatment.name)}
                        className="px-5 py-3 bg-gradient-to-r from-primary to-secondary text-slate-950 text-xs font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1"
                      >
                        <CalendarDays className="w-4 h-4" />
                        <span>Book Clinic Slot</span>
                      </button>
                      <a
                        href="tel:+918149407269"
                        className="px-5 py-3 border border-slate-700 hover:bg-slate-900 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        <span>Call: +91 8149407269</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        </div>
      )}

    </div>
  );
}
