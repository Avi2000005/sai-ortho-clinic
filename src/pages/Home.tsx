import { ArrowRight, Star, GraduationCap, Trophy, Activity, ShieldCheck, HeartPulse, Sparkles, CalendarDays, Phone, Stethoscope } from "lucide-react";
import { BLOGS } from "../data/blogs";
import { TESTIMONIALS } from "../data/testimonials";

interface HomeProps {
  onPageChange: (pageId: string) => void;
  onOpenAppointment: () => void;
  onSelectTreatment: (treatmentId: string) => void;
  onSelectBlog: (blogId: string) => void;
}

export default function Home({ onPageChange, onOpenAppointment, onSelectTreatment, onSelectBlog }: HomeProps) {
  
  // Latest 3 blogs/stories
  const latestBlogs = BLOGS.slice(0, 3);

  return (
    <div className="bg-white font-sans text-slate-800 animate-fade-in" id="home-view-container">
      
      {/* SECTION 3: Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-slate-50 to-white pt-10 pb-20 lg:pt-16 lg:pb-28" id="hero-section">
        
        {/* Background circular ornaments */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 -ml-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Card */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#F0FDFA] text-[#00CFC8] border border-[#CCFBF1] px-4 py-1.5 rounded-full shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary" />
                <span className="text-[11px] font-bold text-primary-deep uppercase tracking-widest font-mono">
                  Dr. Uday Phute • 25+ Years Experience
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] font-serif">
                Advanced <span className="text-primary">Robotic Joint Replacement</span>, Spine<br className="hidden md:inline" />
                & Orthopedic Care in Chh. Sambhajinagar
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Expert orthopedic, spine, and revolutionary robotic joint replacement treatments delivered with precision, world-class experience, and deep-rooted compassion. Rediscover Your Motion & Embrace A Pain-Free Life.
              </p>

              {/* Patient CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-primary-dark to-secondary rounded-xl shadow-xl shadow-primary/20 hover:brightness-105 transition-all"
                  id="hero-book-appointment"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>
                <a
                  href="tel:+918149407269"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-705 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-mono"
                  id="hero-call-now"
                >
                  <Phone className="w-4 h-4 text-primary-dark" />
                  <span>Call: +91 8149407269</span>
                </a>
              </div>

              {/* Statistics Row Grid with Editorial trust-badge left borders */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-200/60 mt-10">
                <div className="trust-badge">
                  <p className="text-3xl font-black text-slate-900 font-serif">25+</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mt-1">Years Experience</p>
                </div>
                <div className="trust-badge">
                  <p className="text-3xl font-black text-slate-900 font-serif">10,000+</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mt-1">Patients Treated</p>
                </div>
                <div className="trust-badge">
                  <p className="text-3xl font-black text-slate-900 font-serif">1,000+</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mt-1">Successful Surgeries</p>
                </div>
                <div className="trust-badge">
                  <p className="text-3xl font-black text-slate-900 font-serif">100%</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mt-1">Safety Record</p>
                </div>
              </div>
            </div>

            {/* Right Visual Image Column */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center gap-4">
              <div className="relative w-full max-w-sm sm:max-w-md h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                {/* Fallback pattern overlaid on medical-themed image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10" />
                <img
                  src="/doctor.jpg"
                  alt="Dr. Uday Phute Orthotropic Consultations"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  id="doctor-hero-image"
                />
                
                {/* Absolute overlay badge banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg z-20 border border-slate-100 flex items-center gap-3">
                  <div className="bg-secondary/15 p-2 rounded-lg text-primary-deep flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-secondary-dark" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">Dr. Uday Phute</h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">Consultant Orthopedic & Robotic Spine Surgeon</p>
                  </div>
                </div>
              </div>

              {/* Only option: view full profile directly below the doctor photo */}
              <button
                onClick={() => onPageChange("about")}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 border border-slate-200 hover:border-slate-300 bg-white text-xs font-bold text-slate-705 rounded-xl hover:bg-slate-50 transition-all shadow-sm group"
                id="view-full-profile-hero"
              >
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>



      {/* SECTION 5: Why Choose Us */}
      <section className="py-20 bg-slate-50" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="editorial-tag">
              Clinical Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Standard of Excellence in Orthopedic Care
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              We focus on cutting-edge techniques, minimizing post-operative recovery periods and providing continuous post-care rehabilitation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Clinical Excellence", desc: "Expert assessment with precision diagnosis and highly coordinated treatment plans.", icon: "Trophy" },
              { title: "Robotic Replacements", desc: "Digital 3D anatomy planning and robotic alignment for 100% precise implant fit.", icon: "Activity" },
              { title: "Advanced Spine Surgery", desc: "Microscopic nerve decompression preserving healthy spinal tissue safely.", icon: "HeartPulse" },
              { title: "Personalized Care", desc: "Tailored medical programs matching your age, condition, and lifestyle goals.", icon: "Stethoscope" },
              { title: "International Training", desc: "Surgical knowledge cultivated in premium centers in London, Singapore, Switzerland.", icon: "GraduationCap" },
              { title: "Modern Diagnostics", desc: "Skeletal imaging tools ensuring precise identification of joint problems.", icon: "ShieldCheck" },
              { title: "Compassionate Care", desc: "Friendly, empathetic clinicians guiding you step-by-step to pain-free mobility.", icon: "Sparkles" },
              { title: "25+ Years Standing", desc: "One of Chh. Sambhajinagar's oldest and most trusted bone care centers managed by leaders.", icon: "Star" }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-white p-6 border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all group text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/15 text-primary-deep mb-5 group-hover:scale-105 transition-transform">
                  {feature.icon === "Trophy" && <Trophy className="w-6 h-6 text-secondary-dark" />}
                  {feature.icon === "Activity" && <Activity className="w-6 h-6 text-secondary" />}
                  {feature.icon === "HeartPulse" && <HeartPulse className="w-6 h-6 text-secondary-dark" />}
                  {feature.icon === "Stethoscope" && <Stethoscope className="w-6 h-6 text-secondary" />}
                  {feature.icon === "GraduationCap" && <GraduationCap className="w-6 h-6 text-secondary" />}
                  {feature.icon === "ShieldCheck" && <ShieldCheck className="w-6 h-6 text-secondary-dark" />}
                  {feature.icon === "Sparkles" && <Sparkles className="w-6 h-6 text-secondary" />}
                  {feature.icon === "Star" && <Star className="w-6 h-6 text-secondary-dark fill-secondary/20" />}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-deep transition-colors mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* SECTION 8: Clinic Infrastructure */}
      <section className="py-20 bg-white" id="infrastructure-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="editorial-tag">
                Surgical Setup
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mt-2">
                Modern Standard Clinic & Sterile Infrastructure
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Sai Joint & Spine Clinic is conceptualized adjacent to Sai Urology Hospital in Chh. Sambhajinagar, designing a pristine, sterile healthcare atmosphere. Our clinical setting is fully equipped with digital radiology, modern diagnostic checking rooms, and patient consultation spaces.
              </p>
              <div className="space-y-4">
                {[
                  { bold: "High Accuracy Diagnostics", normal: "Equipped with advanced digital spinal exams and coordinate planning screens." },
                  { bold: "Patient-Centered Spaces", normal: "Airy, clean, spacious consultations chambers matching modern sanitized setups." },
                  { bold: "Immediate Specialized Assist", normal: "Immediate backup integration with senior urology & multi-specialist support blocks." }
                ].map((item, id) => (
                  <div key={id} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-success font-bold text-xs mt-0.5">✓</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.bold}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.normal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images block */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-slate-100">
                  <img
                    src="/images/home-joint.jpg"
                    alt="Sai Joint Clinic Diagnostic Chamber Setup"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-slate-100 mt-6 md:mt-10">
                  <img
                    src="/images/home-spine.jpg"
                    alt="Pristine Medical Patient Rooms"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: Patient Testimonials */}
      <section className="py-20 bg-white" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="editorial-tag">
              Success Stories
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sincere Reviews From Reputed Patients
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We stand tall on the confidence of our patients. Here are verified stories from Google Reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TESTIMONIALS.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50 p-7 border border-slate-100 rounded-2xl relative shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed mb-6">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.author}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.condition} • {item.type}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onPageChange("testimonials")}
              className="inline-flex items-center gap-1.5 px-6 py-3 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            >
              <span>View Google Reviews & Bio Stories</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 11: Latest Blogs & Patient Stories */}
      <section className="py-20 bg-slate-50 border-t border-slate-100" id="blogs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
            <div className="text-left max-w-2xl">
              <span className="editorial-tag">
                Medical Resources
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Latest Publications & Healing Stories
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Empower your medical wisdom. Read scientific articles and incredible surgical patient tales.
              </p>
            </div>
            <button
              onClick={() => onPageChange("blogs")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-deep hover:text-primary-dark transition-colors font-mono"
            >
              <span>Browse Blog Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {latestBlogs.map((blog) => (
              <div 
                key={blog.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-[10px] text-white font-bold px-2 py-0.5 rounded-full">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readingTime}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-primary-deep transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-normal">
                      {blog.snippet}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectBlog(blog.id)}
                    className="text-xs font-bold text-primary-deep group-hover:text-primary-dark transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 12: Appointment CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="appointment-cta-section">
        {/* Absolute visual ornaments */}
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-10 blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-accent to-red-500 opacity-5 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="editorial-tag">
            Begin Restoring Motion
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Start Your Journey Towards A Pain-Free Life
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Take the first step in restoring joint power or decompressing your lumbar spine under the supervision of Dr. Uday Phute. Slots fill rapidly!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={onOpenAppointment}
              className="px-8 py-4 font-bold text-slate-950 bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:brightness-105 hover:scale-[1.01] transition-all text-sm flex items-center justify-center gap-2"
              id="cta-book-btn"
            >
              <CalendarDays className="w-4 h-4 text-slate-950" />
              <span>Book Appointment Slot</span>
            </button>
            <a
              href="tel:+918149407269"
              className="px-8 py-4 font-bold text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition-all text-sm flex items-center justify-center gap-2"
              id="cta-call-btn"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span>Call Doctor's Office</span>
            </a>
          </div>

          <div className="pt-6 flex justify-center items-center gap-4 text-xs text-slate-400">
            <span>✓ Mon–Fri Consultation Desk</span>
            <span>•</span>
            <span>✓ Instant WhatsApp Assistance Available</span>
          </div>
        </div>
      </section>

    </div>
  );
}
