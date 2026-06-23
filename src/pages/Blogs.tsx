import { useState, useEffect } from "react";
import { Search, Folder, Clock, Calendar, ArrowLeft, ArrowUpRight, BookOpen, Share2, Play } from "lucide-react";
import { BLOGS } from "../data/blogs";
import { Blog } from "../types";
import { safeScrollTo } from "../utils/safeScroll";

interface BlogsProps {
  selectedBlogId: string | null;
  onClearSelection: () => void;
  onSelectBlog: (blogId: string) => void;
  onOpenAppointment: () => void;
}

type CategoryType = "All" | "Spine" | "Robotics" | "Orthopedics" | "Lifestyle" | "Marathi";

export default function Blogs({ selectedBlogId, onClearSelection, onSelectBlog, onOpenAppointment }: BlogsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedBlogId) {
      const found = BLOGS.find((b) => b.id === selectedBlogId);
      if (found) {
        setActiveBlog(found);
      }
    } else {
      setActiveBlog(null);
    }
  }, [selectedBlogId]);

  // Filter processes
  const filteredBlogs = BLOGS.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All" || 
      blog.category === selectedCategory ||
      (selectedCategory === "Robotics" && blog.category === "Robotics") ||
      (selectedCategory === "Spine" && blog.category === "Spine") ||
      (selectedCategory === "Marathi" && blog.isMarathi);

    return matchesSearch && matchesCategory;
  });

  const categories: CategoryType[] = ["All", "Marathi", "Spine", "Robotics", "Lifestyle"];

  const handleBackClick = () => {
    onClearSelection();
    setActiveBlog(null);
    safeScrollTo(0, "smooth");
  };

  const shareArticle = (title: string) => {
    let currentUrl = "https://saijointspineclinic.com";
    try {
      if (typeof window !== "undefined" && window.location) {
        currentUrl = window.location.href || currentUrl;
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        navigator.share({
          title: title,
          url: currentUrl
        }).catch(() => {});
      } else if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(currentUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          // Fallback if writing clipboard failed due to permission/sandbox
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      // Fallback for secure origin clipboard writes
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-800 animate-fade-in" id="blogs-view-container">
      
      {!activeBlog ? (
        /* ================= BLOG ARCHIVE/LIST VIEW ================= */
        <div id="blog-archive-layout">
          {/* Header Banner */}
          <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="space-y-3">
                <span className="editorial-tag">
                  Orthopedic & Spine Publications
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Surgical Insights & Patient Success Tales
                </h1>
                <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
                  Understand orthopedic conditions, postural spine deficits, and read real post-surgical outcome stories in Marathi and English written directly by Dr. Uday Phute.
                </p>
              </div>
            </div>
          </section>

          {/* Search, Filter & Grid Container */}
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            
            {/* Action Bar: Search input & Category list */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-10 bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
              
              {/* Category tags */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 border text-xs font-bold rounded-xl transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-slate-950 border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Element */}
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Query condition, symptom, story..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-xs transition-colors bg-white font-sans"
                />
              </div>

            </div>

            {/* Grid Display results */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((b) => (
                  <div 
                    key={b.id}
                    onClick={() => onSelectBlog(b.id)}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {b.youtubeId && (
                          <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center transition-colors group-hover:bg-slate-950/40">
                            <div className="bg-white/90 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
                              <Play className="w-5 h-5 text-secondary fill-secondary" />
                            </div>
                          </div>
                        )}
                        {/* Display Category/Language tags over image */}
                        <div className="absolute top-3 left-3 bg-slate-900/90 text-[10px] text-white font-bold px-2 py-0.5 rounded-full font-mono flex items-center gap-1.5 shadow-sm">
                          {b.isPatientStory && <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />}
                          <span>{b.isPatientStory ? "Success Story" : b.category}</span>
                        </div>
                      </div>
                      <div className="p-6 space-y-3.5">
                        <div className="flex gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {b.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {b.readingTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-primary-deep transition-colors leading-snug">
                          {b.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {b.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-100 mt-4">
                      <span className="text-[11px] font-bold text-slate-400">By {b.author}</span>
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-primary-deep group-hover:text-primary-dark transition-colors font-mono">
                        <span>Read Case</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl max-w-lg mx-auto">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-slate-700">No Articles Found</h4>
                <p className="text-xs text-slate-400 mt-1">Try resetting your category filter or searching different clinical terminology.</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors"
                >
                  Reset Search Filter
                </button>
              </div>
            )}

          </section>
        </div>
      ) : (
        /* ================= DETAILED ARTICLE PANE ================= */
        <div id="blog-reading-view" className="bg-white">
          
          {/* Sticky reader back bar */}
          <div className="bg-slate-100/60 border-b border-slate-200/80 sticky top-[80px] z-20 py-3.5 px-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-250 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition-all font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Archive Library</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => shareArticle(activeBlog.title)}
                  className="p-2 border border-slate-250 bg-white hover:bg-slate-50 text-slate-500 rounded-xl hover:text-slate-700 transition"
                  title="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenAppointment}
                  className="px-4 py-2 bg-gradient-to-r from-primary-dark to-secondary text-slate-950 text-xs font-bold rounded-xl transition shadow-sm"
                >
                  Schedule Consult
                </button>
              </div>
            </div>
          </div>

          {/* Reading container */}
          <article className="py-12 max-w-3xl mx-auto px-4 sm:px-6 text-left font-sans leading-relaxed">
            
            {/* Header elements */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap items-center gap-3.5 text-xs font-bold text-slate-400 font-mono">
                <span className="px-2.5 py-1 bg-primary/10 rounded-lg text-primary-deep text-[10px] uppercase font-bold">{activeBlog.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {activeBlog.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {activeBlog.readingTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                {activeBlog.title}
              </h1>

              {/* Author Card */}
              <div className="flex items-center gap-3 border-y border-slate-100 py-3 mt-4">
                <img
                  src="/doctor.jpg"
                  alt="Dr. Uday Phute"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-800 leading-none">{activeBlog.author}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">Consultant Spinal Surgeon seit 1998</p>
                </div>
              </div>
            </div>

            {/* Poster image or YouTube Video embed */}
            {activeBlog.youtubeId ? (
              <div className="rounded-2xl overflow-hidden aspect-video w-full mb-8 bg-black shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${activeBlog.youtubeId}?autoplay=0&rel=0`}
                  title={activeBlog.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden h-72 sm:h-[400px] mb-8 bg-slate-100">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Article Content - Structured and formatted to reflect Markdown text */}
            <div className="prose max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base font-sans pb-16">
              {activeBlog.content.split("\n\n").map((para, id) => {
                const trimmed = para.trim();
                
                // Blockquote detect
                if (trimmed.startsWith(">")) {
                  return (
                    <blockquote key={id} className="border-l-4 border-slate-300 bg-slate-50/80 p-4 rounded-r-xl italic my-4 text-slate-600 pl-4">
                      {trimmed.replace(/^>\s*/, "").replace(/[“”"]/g, "")}
                    </blockquote>
                  );
                }
                
                // Bullet points detect
                if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
                  const bullets = trimmed.split("\n");
                  return (
                    <ul key={id} className="list-disc pl-5 space-y-2.5 my-4">
                      {bullets.map((b, bIdx) => {
                        const cleanBullet = b.replace(/^[\*\-]\s*/, "");
                        const formattedBullet = cleanBullet.split("**").map((textChunk, chunkIdx) => {
                          if (chunkIdx % 2 === 1) {
                            return <strong key={chunkIdx} className="font-extrabold text-slate-950">{textChunk}</strong>;
                          }
                          return textChunk;
                        });
                        return (
                          <li key={bIdx} className="text-slate-600 leading-normal pl-1.5 font-sans">
                            {formattedBullet}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                // Heading 3 detect
                if (trimmed.startsWith("###")) {
                  return (
                    <h4 key={id} className="text-base sm:text-lg font-extrabold text-slate-950 pt-5 tracking-tight uppercase border-b border-slate-100 pb-1 mt-6">
                      {trimmed.replace(/^###\s*/, "")}
                    </h4>
                  );
                }

                // Heading 2 detect
                if (trimmed.startsWith("##")) {
                  return (
                    <h3 key={id} className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 pt-8 tracking-tight capitalize border-l-2 border-primary pl-2.5 mt-8">
                      {trimmed.replace(/^##\s*/, "")}
                    </h3>
                  );
                }

                // Divider line
                if (trimmed === "---") {
                  return <hr key={id} className="border-slate-200/60 my-8" />;
                }

                // Default Paragraph with strong parsing
                const formattedText = trimmed.split("**").map((textChunk, chunkIdx) => {
                  if (chunkIdx % 2 === 1) {
                    return <strong key={chunkIdx} className="font-extrabold text-slate-950">{textChunk}</strong>;
                  }
                  return textChunk;
                });

                return (
                  <p key={id} className="text-slate-600 leading-relaxed font-sans text-justify">
                    {formattedText}
                  </p>
                );
              })}
            </div>

            {/* Quick reading exit bar */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto my-12">
              <BookOpen className="w-8 h-8 text-secondary mx-auto" />
              <h4 className="text-base font-extrabold text-slate-900">Restore Bone & Joint Strength</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                If you suffer from clinical symptoms mentioned in this article, schedule an examination at Sai Joint & Spine Clinic.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="px-5 py-2 text-xs font-bold border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  All Articles
                </button>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800"
                >
                  Book Slot
                </button>
              </div>
            </div>

          </article>
        </div>
      )}

      {copied && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl font-semibold flex items-center gap-2 animate-slide-up border border-slate-800">
          <span>✨ Article Link Copied to Clipboard!</span>
        </div>
      )}

    </div>
  );
}
