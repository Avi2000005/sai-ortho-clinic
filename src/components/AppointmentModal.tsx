import React, { useState, useEffect } from "react";
import { X, Calendar, Phone, Mail, User, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { TREATMENTS } from "../data/treatments";
import { Appointment } from "../types";
import { safeStorage } from "../utils/safeStorage";
import { safeDispatchEvent } from "../utils/safeScroll";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: string;
}

export default function AppointmentModal({ isOpen, onClose, preselectedTreatment }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "07:00 PM",
    treatmentType: "",
    message: ""
  });

  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedTreatment) {
      setFormData((prev) => ({ ...prev, treatmentType: preselectedTreatment }));
    }
    setErrorMsg(null);
  }, [preselectedTreatment, isOpen]);

  if (!isOpen) return null;

  const getWhatsAppLink = (appt: Appointment) => {
    const text = `Hello Dr. Uday Phute Clinic,

I am requesting an appointment for a clinic consult. Here are my details:

• Patient Name: ${appt.patientName}
• Phone: ${appt.phone}
${appt.email ? `• Email: ${appt.email}\n` : ""}• Preferred Date: ${appt.date}
• Time Slot: ${appt.timeSlot}
• Condition/Treatment: ${appt.treatmentType}
${appt.message ? `• Symptoms Note: ${appt.message}\n` : ""}
Please let me know if this slot is confirmed. Thank you!`;
    return `https://wa.me/918149407269?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone || !formData.date) {
      setErrorMsg("Please fill in Name, Phone, and Appointment Date.");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const newAppointment: Appointment = {
        id: "APT" + Math.floor(Math.random() * 900000 + 100000),
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        treatmentType: formData.treatmentType || "General Consultation",
        message: formData.message,
        status: "Scheduled",
        createdAt: new Date().toISOString()
      };

      // Store in local storage
      let existing = null;
      try {
        existing = safeStorage.getItem("sai_appointments");
      } catch (e) {
        console.warn(e);
      }
      const appointments = existing ? JSON.parse(existing) : [];
      appointments.push(newAppointment);
      try {
        safeStorage.setItem("sai_appointments", JSON.stringify(appointments));
      } catch (e) {
        console.warn(e);
      }

      // Trigger standard schedule custom events to update state
      safeDispatchEvent("appointmentsChanged");

      setBookingSuccess(newAppointment);
      setLoading(false);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "07:00 PM",
      treatmentType: "",
      message: ""
    });
    setBookingSuccess(null);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" id="appointment-modal-overlay">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl transition-all duration-300 transform scale-100"
        id="appointment-modal-body"
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary" />

        <div className="p-6">
          <button 
            onClick={() => { resetForm(); onClose(); }}
            className="absolute p-2 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            id="close-modal-button"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {!bookingSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Book an Appointment</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Select a convenient slot for scheduling a consult with Dr. Uday Phute.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 text-xs font-semibold text-primary-deep bg-primary/10 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  Clinic Timings: Mon to Fri (7 PM - 9 PM)
                </div>

                {errorMsg && (
                  <div className="mt-3.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl font-medium animate-shake text-left">
                    ⚠️ {errorMsg}
                  </div>
                )}
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Patient Full Name*</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                  />
                </div>
              </div>

              {/* Grid Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Phone Number*</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Preferred Date*</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Session Slot Time</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors bg-white"
                  >
                    <option value="07:00 PM">07:00 PM (Start slot)</option>
                    <option value="07:30 PM">07:30 PM</option>
                    <option value="08:00 PM">08:00 PM (Peak slot)</option>
                    <option value="08:30 PM">08:30 PM (Closing slot)</option>
                  </select>
                </div>
              </div>

              {/* Treatment Type */}
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Symptom / Treatment Area</label>
                <select
                  value={formData.treatmentType}
                  onChange={(e) => setFormData({ ...formData, treatmentType: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors bg-white font-sans"
                >
                  <option value="">General Consultation / Check-up</option>
                  {TREATMENTS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5">Medical Symptoms / Note</label>
                <textarea
                  placeholder="Describe your back, joint, or spine symptoms or past diagnostics history (such as MRI, X-rays)..."
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 text-sm font-semibold text-white transition-all bg-gradient-to-r from-primary-dark to-secondary rounded-xl hover:shadow-lg disabled:opacity-50 hover:brightness-105 active:scale-[0.99]"
                id="submit-appointment-button"
              >
                {loading ? "Scheduling with Dr. Phute..." : "Confirm Schedule Request"}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-success animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
                  Request Confirmed
                </span>
                <h3 className="text-2xl font-semibold text-slate-900 mt-2">Appointment Scheduled Successfully</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                  Your appointment ID for Dr. Uday Phute is <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{bookingSuccess.id}</span>. We will follow up via phone/email shortly.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-medium text-slate-800">{bookingSuccess.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Treatment:</span>
                  <span className="font-medium text-slate-800">{bookingSuccess.treatmentType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="font-medium text-slate-800">{bookingSuccess.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Timings:</span>
                  <span className="font-medium text-slate-800">{bookingSuccess.timeSlot} @ Garkheda, Chh. Sambhajinagar</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={getWhatsAppLink(bookingSuccess)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl transition-all shadow-md shadow-emerald-100 font-sans"
                  id="whatsapp-confirm-button"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.375 3.47 2.234 2.237 3.463 5.214 3.46 8.381-.005 6.536-5.33 11.861-11.862 11.861-2.016-.002-3.993-.518-5.733-1.499L0 24zm6.758-15.016c-.199-.444-.41-.453-.601-.461-.155-.006-.333-.006-.511-.006-.178 0-.466.067-.71.333-.244.267-.932.911-.932 2.222 0 1.311.954 2.578 1.087 2.756.133.178 1.878 2.87 4.548 4.02 2.221.958 2.673.767 3.16.722.488-.045 1.576-.644 1.799-1.267.223-.622.223-1.156.156-1.267-.067-.111-.244-.178-.522-.311-.278-.134-1.644-.811-1.899-.9-.255-.09-.44-.134-.622.134-.182.267-.71.9-.87 1.078-.16.178-.321.2-.6.067-.278-.134-1.173-.433-2.234-1.38-.825-.736-1.382-1.644-1.544-1.922-.16-.278-.018-.43.12-.566.126-.12.278-.322.417-.489.138-.167.184-.278.278-.461.093-.183.047-.344-.023-.478-.069-.134-.601-1.448-.826-1.97-.219-.533-.46-.461-.601-.469z"/>
                  </svg>
                  <span>Send Request details to WhatsApp</span>
                </a>
                
                <div className="flex gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={() => { resetForm(); onClose(); }}
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-1 px-3 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
