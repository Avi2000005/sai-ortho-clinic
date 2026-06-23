import { GraduationCap, Award, Compass, HeartPulse, ShieldCheck, Heart, ArrowRight, Star, Trophy } from "lucide-react";

interface AboutProps {
  onOpenAppointment: () => void;
}

export default function About({ onOpenAppointment }: AboutProps) {
  
  const teachings = [
    "Assistant Lecturer at MGM Medical College Chh. Sambhajinagar",
    "Post Graduate Teacher for Fellowship of CPS Course",
    "Post Graduate Teacher for DNB Spinal Surgery Courses",
    "Certified National Training Instructor for Association of Trauma Life Support (ATLS) Course"
  ];

  const trainings = [
    { title: "National Institute of Neurosurgery, London (UK)", scope: "Fellowship specialized in advanced microsurgical spine decompression and canal stenosis decompression styles." },
    { title: "AO Spine Basic, Chennai", scope: "Intensive training on spinal fixation, trauma spine management, and fracture alignment." },
    { title: "AO Spine Advanced Clinic, Singapore", scope: "Advanced thoracic & lumbar stabilization techniques, corrective osteotomies, and keyhole spine access paths." },
    { title: "Specialist Surgical Training, Switzerland", scope: "Direct observation and laboratory training for robotic-assisted spinal alignment devices." }
  ];

  const leaderships = [
    "Secretary of Indian Medical Association (IMA) Chh. Sambhajinagar Chapter",
    "Vice President of Indian Medical Association (IMA) Board",
    "President of Indian Medical Association (IMA) Chh. Sambhajinagar Board",
    "President of Chh. Sambhajinagar Orthopedic Association (AOA)",
    "Joint Secretary of Indian Society of Reconstruction Microsurgery (ISRM)"
  ];

  const memberships = [
    { acronym: "MOA", name: "Maharashtra Orthopaedic Association" },
    { acronym: "IOA", name: "Indian Orthopaedic Association" },
    { acronym: "ASSI", name: "Association of Spine Surgeons of India" },
    { acronym: "NAILS", name: "National Association of Interlocking Suture & Nailing Teams" },
    { acronym: "IMA", name: "Indian Medical Association" },
    { acronym: "AO Spine", name: "Association for the Study of Osteosynthesis - Spinal Division" },
    { acronym: "NASS", name: "North American Spine Society" }
  ];

  const awards = [
    { title: "University First in D.Ortho Examination", body: "Awarded by medical board authorities for securing the top mathematical grade across all regional universities." },
    { title: "Best Case Presentation Award", body: "Honored at national level for innovative clinical solution and successful reconstruction of complex bone non-union deformity." },
    { title: "Paul Harris Fellow Award", body: "Presented by Rotary International in high recognition of lifelong medical social contributions and surgical relief." }
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fade-in" id="about-view-container">
      
      {/* Page Title Header */}
      <section className="bg-white border-b border-slate-200 py-16 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3">
            <span className="editorial-tag">
              Expertise & Credentials
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              About Dr. Uday Phute
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
              Dr. Uday Phute has served as a Consultant Orthopedic and Spine Surgeon in the Marathwada region since 1998, prioritizing anatomical preservation, modern surgical safety, and local charity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dr Biography Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Biography Left Block */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                <img
                  src="/doctor.jpg"
                  alt="Dr. Uday Phute"
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-5 space-y-1 text-center w-full border-t border-slate-200 pt-4">
                  <h3 className="text-lg font-bold text-slate-950">Dr. Uday Phute</h3>
                  <p className="text-xs text-primary-deep font-semibold">Consultant Orthopedic & Spine Specialist</p>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Sai Joint & Spine Clinic, Chh. Sambhajinagar</p>
                </div>
              </div>

              {/* Memberships box listing abbreviation labels */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-l-2 border-secondary pl-2.5">
                  Professional Memberships
                </h4>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                  {memberships.map((m, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1.5 bg-primary/10 text-primary-deep rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
                      title={m.name}
                    >
                      {m.acronym}
                    </span>
                  ))}
                </div>
                <ul className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                  {memberships.map((m, idx) => (
                    <li key={idx} className="flex justify-between items-start gap-3">
                      <span className="font-semibold text-slate-800 flex-shrink-0">{m.acronym}</span>
                      <span className="text-slate-500 text-right">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biography Right Block structured info */}
            <div className="lg:col-span-8 space-y-10 font-sans">
              
              {/* Profile Bio details */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Medical Integrity Built Over 25 Years
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Established in 1998, Dr. Uday Phute's practice is rooted in absolute patient transparency. His diagnostic protocol relies on evaluating pain channels comprehensively before ever presenting surgical alternatives. He has consistently pioneered advanced procedures in Chh. Sambhajinagar, offering safe robotic assistance vectors to help patient outcomes.
                </p>
                <blockquote className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-xl italic text-slate-700 text-sm leading-relaxed my-4">
                  "Surgical precision must go hand-in-hand with compassionate care. True spinal and bone treatment ensures that patients walk away with maximum structural stability and minimum clinical disruption." 
                  <span className="block font-sans font-bold text-slate-900 text-xs mt-2 not-italic">— Dr. Uday Phute</span>
                </blockquote>
              </div>

              {/* Teaching positions card */}
              <div className="space-y-4 border-t border-slate-200/80 pt-8">
                <div className="flex items-center gap-2 text-primary-deep font-bold text-base uppercase font-display">
                  <GraduationCap className="w-5 h-5 text-secondary-dark" />
                  <span>Academic & Teaching Responsibilities</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teachings.map((teach, i) => (
                    <div key={i} className="bg-slate-50 p-4 border border-slate-200/50 rounded-xl flex items-start gap-2.5">
                      <span className="h-4.5 w-4.5 rounded-full bg-primary/10 text-primary-deep font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-xs text-slate-700 font-semibold leading-relaxed">{teach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* International trainings timeline block */}
              <div className="space-y-4 border-t border-slate-200/80 pt-8 text-xs">
                <div className="flex items-center gap-2 text-primary-deep font-bold text-base uppercase font-display">
                  <Compass className="w-5 h-5 text-secondary-dark" />
                  <span>Advanced International Surgeon Training</span>
                </div>
                <div className="space-y-4">
                  {trainings.map((train, i) => (
                    <div key={i} className="flex gap-4 items-start relative group">
                      {i !== trainings.length - 1 && (
                        <div className="absolute top-8 bottom-0 left-3 w-0.5 bg-slate-200" />
                      )}
                      <div className="w-6.5 h-6.5 rounded-full bg-emerald-50 text-success font-bold flex items-center justify-center flex-shrink-0 border border-emerald-100 mt-1">
                        ✓
                      </div>
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl w-full">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary-deep transition-colors mb-1">{train.title}</h4>
                        <p className="text-slate-500 leading-normal text-xs">{train.scope}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Roles */}
              <div className="space-y-4 border-t border-slate-200/80 pt-8">
                <div className="flex items-center gap-2 text-primary-deep font-bold text-base uppercase font-display">
                  <ShieldCheck className="w-5 h-5 text-secondary-dark" />
                  <span>Organisational Leadership & Leadership Positions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                  {leaderships.map((l, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />
                      <span className="font-bold text-slate-800">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards Box */}
              <div className="space-y-4 border-t border-slate-200/80 pt-8 text-xs">
                <div className="flex items-center gap-2 text-primary-deep font-bold text-base uppercase font-display">
                  <Award className="w-5 h-5 text-secondary-dark" />
                  <span>Medal Awards & Honours</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {awards.map((award, i) => (
                    <div key={i} className="bg-amber-50/20 p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all text-left">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500/10 mb-3" />
                      <h4 className="font-black text-slate-900 leading-tight mb-2 text-xs uppercase tracking-wide">{award.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{award.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charitable Social Initiatives */}
              <div className="space-y-4 border-t border-slate-200/80 pt-8">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-base uppercase font-display">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Socio-Medical & Philanthropic Initiatives</span>
                </div>
                <div className="bg-rose-50/10 border border-rose-500/15 p-6 rounded-2xl space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Over his distinguished career, Dr. Uday Phute has committed heavily to social medical welfare, delivering care to marginalized populations throughout the rural Chh. Sambhajinagar districts.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                    <div className="p-4 bg-white rounded-xl border border-rose-500/10">
                      <h5 className="font-bold text-slate-900 text-sm">400+ Corrective Surgeries</h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">Performed complex alignment surgeries for polio foot deficits completely free of charges.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-rose-500/10">
                      <h5 className="font-bold text-slate-900 text-sm">Physically Handicapped Children</h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">Integrated rehabilitation clinics specifically structured for low-resource children.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-rose-500/10">
                      <h5 className="font-bold text-slate-900 text-sm">NGO Janarth Association</h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">Coordinating medical outreach camps inside tribal communities of Garkheda.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation trigger CTA */}
              <div className="bg-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-white font-sans mt-8">
                <div>
                  <h4 className="font-bold text-base">Require an Expert Second Opinion?</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Bring your MRIs/X-Rays for a strategic medical outline under Dr. Phute.</p>
                </div>
                <button
                  onClick={onOpenAppointment}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-slate-950 text-xs font-bold rounded-xl hover:brightness-150 transition-all font-sans"
                >
                  <span>Book Slot with Dr. Phute</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
