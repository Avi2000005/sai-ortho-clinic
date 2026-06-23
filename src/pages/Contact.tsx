import React, { useState } from "react";
import { Phone, MapPin, Mail, Clock, Send, MessageCircleCode, CheckCircle2, CalendarRange, Map, Info } from "lucide-react";
import { TREATMENTS } from "../data/treatments";
import { Appointment } from "../types";
import { safeStorage } from "../utils/safeStorage";
import { safeDispatchEvent } from "../utils/safeScroll";

interface ContactProps {
  onOpenAppointment: () => void;
}

export default function Contact({ onOpenAppointment }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "07:00 PM",
    treatment: "",
    notes: ""
  });

  const [isSuccess, setIsSuccess] = useState<Appointment | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      setErrorMsg("Please fill in Name, Phone Number, and Preferred Appointment Date.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    setTimeout(() => {
      const newBooking: Appointment = {
        id: "APT" + Math.floor(Math.random() * 900000 + 100000),
        patientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        treatmentType: formData.treatment || "General Consultation",
        message: formData.notes,
        status: "Scheduled",
        createdAt: new Date().toISOString()
      };

      // Extract and append
      let existing = null;
      try {
        existing = safeStorage.getItem("sai_appointments");
      } catch (e) {
        console.warn(e);
      }
      const list = existing ? JSON.parse(existing) : [];
      list.push(newBooking);
      try {
        safeStorage.setItem("sai_appointments", JSON.stringify(list));
      } catch (e) {
        console.warn(e);
      }

      // Trigger custom listener
      safeDispatchEvent("appointmentsChanged");

      setIsSuccess(newBooking);
      setSubmitting(false);
      setErrorMsg(null);
    }, 1200);
  };

  const currentDay = new Date().getDay(); // 0 is Sunday, 6 is Saturday

  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fade-in" id="contact-view-container">
      
      {/* Page Title Header */}
      <section className="bg-white border-b border-slate-205 py-16 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3">
            <span className="editorial-tag">
              Quick Patient Support
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Contact & Locate Us
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
              Require surgical scheduling, secondary clinical assessments, or direction inquiries? Check out our Garkheda contact coordinates below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form Left, Sidebar Info Right */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column Form Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 shadow-sm flex flex-col justify-center">
            
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Request a Consultation</h3>
                  <p className="text-xs text-slate-400 mt-1">Specify your desired schedules and Dr. Phute's team will verify slot availability.</p>

                  {errorMsg && (
                    <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl font-medium mt-3 animate-shake">
                      ⚠️ {errorMsg}
                    </div>
                  )}
                </div>

                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Full Patient Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full legal name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Phone Number*</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="address@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Dates & slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Appointment Date*</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors bg-white font-sans text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Preferred Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors bg-white"
                    >
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Select treatment category */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Symptom / Treatment Area</label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors bg-white font-sans text-slate-850"
                  >
                    <option value="">General Bone check-up / Check-up</option>
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Medical Symptoms / Note</label>
                  <textarea
                    placeholder="Briefly state symptoms (e.g. chronic sciatica pain, lumbar back spasms, hip click, past MRI reports...)"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors font-sans text-slate-800"
                  />
                </div>

                {/* Trigger button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-primary-dark via-primary to-secondary text-white font-bold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 hover:brightness-105 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{submitting ? "Booking..." : "Send Appointment Request"}</span>
                </button>
              </form>
            ) : (
              <div className="py-10 text-center space-y-5 animate-scale-up">
                <div className="inline-flex items-center justify-center h-14 w-14 bg-emerald-50 rounded-full text-success">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                    Schedules Received
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">Clinic Slot Requested</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-800">{isSuccess.patientName}</span>! Your slot details have been logged in our clinic desk dashboard safely with ID <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{isSuccess.id}</span>.
                  </p>
                </div>

                {/* Card summary ticket */}
                <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Scheduled:</span>
                    <span className="font-bold text-slate-800">{isSuccess.date} @ {isSuccess.timeSlot}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Support Area:</span>
                    <span className="font-bold text-slate-850">{isSuccess.treatmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone logged:</span>
                    <span className="font-bold text-slate-850">{isSuccess.phone}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        timeSlot: "07:00 PM",
                        treatment: "",
                        notes: ""
                      });
                      setIsSuccess(null);
                    }}
                    className="px-5 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-650 hover:bg-slate-50"
                  >
                    Request Another
                  </button>
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
                  >
                    View Status Map
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column Location & Quick contacts information card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick action Dialers card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest border-l-2 border-secondary pl-2.5">
                Rapid Clinical Desk
              </h3>
              
              <div className="grid grid-cols-1 gap-3 text-xs font-bold leading-normal">
                {/* Dial 1 */}
                <a
                  href="tel:+918149407269"
                  className="flex items-center justify-between p-4 border border-slate-200 hover:border-primary hover:bg-primary/5 rounded-xl transition-all group"
                  id="contact-call-now"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary-deep flex-shrink-0">
                      <Phone className="w-4 h-4 text-secondary-dark" />
                    </div>
                    <div className="text-left">
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider leading-none">Primary Mobile</p>
                      <p className="text-slate-800 text-xs sm:text-sm mt-1">+91 8149407269</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-primary-deep group-hover:underline">Dial</span>
                </a>

                {/* Dial 2 */}
                <a
                  href="tel:02402993122"
                  className="flex items-center justify-between p-4 border border-slate-200 hover:border-primary hover:bg-primary/5 rounded-xl transition-all group"
                  id="contact-landline-call"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary-deep flex-shrink-0">
                      <Phone className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider leading-none">Clinic Landline</p>
                      <p className="text-slate-800 text-xs sm:text-sm mt-1">0240 2993122</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-primary-deep group-hover:underline">Dial</span>
                </a>

                {/* WhatsApp Chat link */}
                <a
                  href="https://wa.me/918149407269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-xl transition-all group bg-emerald-50/10"
                  id="contact-whatsapp"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-15 p-2.5 rounded-lg text-emerald-600 flex-shrink-0">
                      <MessageCircleCode className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-emerald-600 text-[10px] uppercase font-bold tracking-wider leading-none">Instant WhatsApp</p>
                      <p className="text-slate-800 text-xs sm:text-sm mt-0.5">Chat Directly with staff</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 group-hover:underline">Chat</span>
                </a>
              </div>
            </div>

            {/* Hours and Address block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs text-left">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-2 border-secondary pl-2.5">
                Address & Timings
              </h4>
              
              <div className="space-y-4 pt-1.5 font-sans">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold text-slate-900 leading-tight">Sai Joint & Spine Clinic</h5>
                    <p className="text-slate-500 mt-1 leading-relaxed">
                      Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra 431009
                    </p>
                    <p className="text-primary-deep font-bold mt-1 inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded text-[10px]">
                      <Info className="w-3 h-3" />
                      Beside Sai Urology Hospital
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-100 pt-4">
                  <Clock className="w-4.5 h-4.5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold text-slate-900 leading-tight">Consultation Desk Hours</h5>
                    <p className="text-slate-500 mt-1">Monday To Friday: 7 PM – 9 PM</p>
                    <p className="text-slate-300 mt-0.5">Saturday & Sunday Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-100 pt-4">
                  <Mail className="w-4.5 h-4.5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-extrabold text-slate-900 leading-tight">Email Submissions</h5>
                    <a href="mailto:saiortho@gmail.com" className="text-secondary-dark font-semibold underline mt-1 block">
                      saiortho@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Maps layout block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Map className="w-4 h-4 text-slate-400" />
                  Skeletal Location Guide
                </span>
                <span className={`h-2 w-2 rounded-full ${currentDay === 0 || currentDay === 6 ? "bg-amber-400" : "bg-emerald-500"}`} />
              </div>

              {/* Graphic Mock map using Tailwind */}
              <div className="h-44 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-150 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                
                {/* Mimicking streets layout */}
                <div className="absolute w-full h-1.5 bg-slate-200/80 top-1/3 transform -rotate-2" />
                <div className="absolute w-1.5 h-full bg-slate-200/80 left-1/3 transform rotate-6" />
                <div className="absolute w-full h-2 bg-slate-250/80 bottom-1/4 transform -rotate-12" />
                
                {/* Sai Urology marker */}
                <div className="absolute left-1/4 top-1/4 bg-slate-900 text-[9px] text-white font-bold p-1 rounded-md shadow-sm border border-slate-800">
                  🏥 Sai Urology Hospital
                </div>

                {/* Mandir path label */}
                <div className="absolute left-[40%] bottom-[12%] text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono transform rotate-12">
                  Gajanan Maharaj Mandir Road
                </div>

                {/* Sai Joint Marker */}
                <div className="absolute left-[38%] top-[50%] bg-white border border-secondary text-slate-950 px-2 py-1.5 rounded-lg shadow-lg flex items-center gap-1 text-[10px] font-black animate-pulse z-10">
                  <span className="h-2 w-2 bg-primary rounded-full animate-ping" />
                  🎯 SAI JOINT & SPINE CLINIC
                </div>

                {/* Map quick guidance link */}
                <a
                  href="https://maps.google.com/?q=Sai+Joint+and+Spine+Clinic+Chh.+Sambhajinagar+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-slate-900/90 text-[9px] text-white font-bold px-2 py-1 rounded shadow-md border border-slate-850 flex items-center gap-1 hover:bg-slate-950 transition"
                >
                  Opens Google Maps ↗
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
