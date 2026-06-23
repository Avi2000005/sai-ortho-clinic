import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, Check, Phone, Settings, Key } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function FloatingChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! 🏥 Welcome to **Sai Joint & Spine Clinic**, Chh. Sambhajinagar.\n\nI am your supportive digital health assistant. I can guide you through our advanced treatments, robotic joint replacement procedures, spinal wellness programs, and clinic consult timings.\n\nHow can I support your joint or spinal wellness journey today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [localKey, setLocalKey] = useState<string>(
    localStorage.getItem("VITE_GEMINI_API_KEY") || ""
  );
  const [tempKey, setTempKey] = useState<string>(
    localStorage.getItem("VITE_GEMINI_API_KEY") || ""
  );

  const activeKey = import.meta.env.VITE_GEMINI_API_KEY || localKey || "";

  const handleSaveKey = () => {
    localStorage.setItem("VITE_GEMINI_API_KEY", tempKey);
    setLocalKey(tempKey);
    setShowSettings(false);
  };

  // Suggested quick prompts
  const QuickPrompts = [
    { label: "🔬 Robotic Knee Surgery", prompt: "Explain Dr. Phute's fully automatic robotic knee joint replacement." },
    { label: "🦴 Spine Surgeries", prompt: "What are the minimally invasive/endoscopic spine treatment protocols at your clinic?" },
    { label: "📅 Practice Timings", prompt: "What are Dr. Uday Phute's OPD consultation hours and weekly schedule?" },
    { label: "📍 Clinic Address", prompt: "Where is Sai Joint & Spine Clinic situated in Chh. Sambhajinagar?" }
  ];

  // Auto scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Append User message
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now() + "-user",
      sender: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    if (!activeKey) {
      triggerLocalFallback(trimmed);
      return;
    }

    try {
      // Build simple prompt history for contextual conversations
      const history = messages
        .filter((m) => m.id !== "welcome-1") // skip static welcome message
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const systemInstruction = `You are the official clinical AI Assistant of "Sai Joint & Spine Clinic".
Your sole purpose is to answer queries using ONLY the facts provided below. You must not use any outside knowledge, assume details, or give general medical advice.

[CRITICAL DIRECTIVE: ONLY USE WEBSITE/CLINIC FACTS]
1. Answer queries ONLY using the Clinic Facts listed below.
2. If the user asks about any topic, question, general medical advice, medicine names, drugs, or details not explicitly present in the Clinic Facts below, respond exactly with: "I can only answer questions related to Sai Joint & Spine Clinic, its treatments, schedule, and Dr. Uday Phute as described on our website."
3. Do not formulate answers using general knowledge, external medical facts, or internet data. If a treatment, timing, or fact is not in the text below, treat it as unknown and refuse to answer.
4. Keep answers brief (2-4 sentences or bullets), structured, factual, and warm.
5. Strictly forbid prescribing drugs or self-diagnosis. Remind them to request an appointment using this website or via WhatsApp (+91 8149407269).

[CLINIC FACTS]
- Clinic Name: Sai Joint & Spine Clinic.
- Doctor: Dr. Uday Phute, Eminent Consultant Orthopedic and Spine Surgeon in the Marathwada region since 1998 (25+ years experience).
- Academics: Assistant Lecturer at MGM Medical College Chh. Sambhajinagar, Post Graduate Teacher for CPS Fellowship, Post Graduate Teacher for DNB Spinal Surgery, Certified Instructor for Association of Trauma Life Support (ATLS).
- Doctor's Education & Training: Fellowship at National Institute of Neurosurgery, London (UK) in advanced microsurgical spine decompression; AO Spine Basic in Chennai; AO Spine Advanced in Singapore; Specialist Surgical Training in Switzerland for robotic spinal alignment.
- Organizational Leadership: Ex-Secretary & President of IMA Chh. Sambhajinagar, Ex-President of Chh. Sambhajinagar Orthopedic Association (AOA), Joint Secretary of ISRM.
- Philanthropy: Paul Harris Fellow Award (Rotary International). Performed 400+ free corrective surgeries for polio foot deficits. Outreaches with NGO Janarth inside tribal communities of Garkheda.
- OPD Hours: Monday to Saturday: 10:30 AM to 2:00 PM (Morning), 6:00 PM to 8:30 PM (Evening). Sunday: Closed (Emergency admissions & hospital rounds only).
- Location/Address: Beside Sai Urology Hospital, Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra - 431009. Parking: Ample road parking, wheelchair-friendly ramp access.
- Helplines: Call/WhatsApp Helpline: +91 8149407269.

[TREATMENTS OFFERED (ONLY DISCUSS THESE)]
- Robotic Joint Replacement: Knee and hip replacements using digital 3D planning and robotic alignment. Align implants within fractions of a millimeter. Same-day mobilization. Lifespan 20-25 years.
- Bone Trauma Surgery: Management of complex fractures, multiple trauma injuries. ORIF with titanium plates/screws (biocompatible). Intramedullary nailing.
- Joint Pain Treatment: Comprehensive care for shoulder, hip, ankle, wrist wear, gout, overuse. Injections (viscosupplementation, PRP).
- Sports Injury Treatment: Arthroscopic minimally invasive ACL/PCL ligament reconstruction using autografts, meniscus repair, shoulder stabilization (Bankart repair). Contact sports return in 6-9 months.
- Spondylosis Care: Age-related wear-and-tear of cervical (neck) and lumbar (lower back) facet joints and discs. core stabilizing physiotherapy, facet blocks/epidural blocks.
- Spine Disorders: Herniated/slipped discs, sciatica (burning leg pain), spinal stenosis. Microdiscectomy, spinal fusion (TLIF/PLIF). Patients walk within 24 hours post-operation.
- Back Pain Treatment: Lower back pain, muscle spasm, posture deficit. McKenzie core strengthening, trigger point injections.
- Neck Pain Treatment: Posture deficits (tech-neck/looking down at screens), cervical strain. Cervical traction, nerve root blocks. Recovery in 2-6 weeks.
- Arthritis Care: Osteoarthritis, Rheumatoid Arthritis, Gout. Medical DMARDs/biologics, HA/steroid injections, joint-saving osteotomies.
- Fracture Management: Casting, splinting, pinning (K-wires) for pediatric cases, titanium osteosynthesis. Fusion in 4-8 weeks.`;

      // Call Gemini API directly via client-side fetch
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...history.map((h) => ({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.parts[0].text }],
            })),
            {
              role: "user",
              parts: [{ text: trimmed }],
            },
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.15,
            maxOutputTokens: 350,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error (${res.status})`);
      }

      const data = await res.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!replyText) {
        throw new Error("No response text returned from Gemini API");
      }

      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: "msg-" + Date.now() + "-ai",
        sender: "ai",
        text: replyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn("Gemini API direct call failed or was rejected. Engaging local medical intelligence fallback...", err);
      triggerLocalFallback(trimmed);
    }
  };

  const triggerLocalFallback = (trimmed: string) => {
    setTimeout(() => {
      setIsTyping(false);
      const query = trimmed.toLowerCase();
      let reply = "";

      if (query.includes("robotic") || query.includes("knee") || query.includes("joint") || query.includes("replace") || query.includes("surgery") || query.includes("arthrit")) {
        reply = "🔬 **Robotic Knee Joint Replacement:**\n\nDr. Uday Phute specializes in State-of-the-Art, Fully Automatic Robotic Joint Replacement. Our clinic uses the most advanced medical navigation tools.\n\n• **Sub-millimeter Precision:** Protects healthy ligaments and bone structure.\n• **Minimal Incision:** Decreases pain levels post-surgery.\n• **Rapid Recovery:** Most patients are able to take independent, assisted steps within **24 hours** after surgery.\n\nWould you like to schedule an expert physical evaluation or discuss clinical symptoms?";
      } else if (query.includes("spine") || query.includes("back") || query.includes("disc") || query.includes("sciatica") || query.includes("spondy") || query.includes("neck") || query.includes("pain")) {
        reply = "🦴 **Minimally Invasive Spine Orthopedics:**\n\nWe provide complete diagnostic protocols for spinal ailments, treating severe conditions with surgical preservation first where applicable:\n\n• **Keyhole Endoscopic Slipped Disc Relief:** Targeted spinal decompression with a sub-centimeter entry incision.\n• **Sciatica & Stenosis Treatment:** Customized spinal block injections and medical spine strength regimens.\n• **Sciatica & Spondylosis Rehabilitation:** High-grade diagnostic imaging to accurately detect intervertebral narrowing.\n\nWe would be honored to assist you in walking pain-free!";
      } else if (query.includes("timing") || query.includes("hour") || query.includes("open") || query.includes("schedule") || query.includes("consult") || query.includes("days") || query.includes("when")) {
        reply = "📅 **OPD Consultation Hours:**\n\nDr. Uday Phute is available for clinic consultations with the following schedule:\n\n• **Monday to Saturday (Morning):** 10:30 AM to 2:00 PM\n• **Monday to Saturday (Evening):** 6:00 PM to 8:30 PM\n• **Sunday:** Closed (Emergency admissions & hospital rounds only)\n\nTo lock your clinical Slot, click the **Request Appointment** button above or click the Floating **WhatsApp Button** below to send an instant booking request!";
      } else if (query.includes("address") || query.includes("location") || query.includes("where") || query.includes("direction") || query.includes("map") || query.includes("landm")) {
        reply = "📍 **Clinic Location & Directions:**\n\nSai Joint & Spine Clinic is highly accessible, situated adjacent to Sai Urology Hospital:\n\n🏠 **Landmark Address:**\nGajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra - 431009.\n\n• Wheelchair-friendly ramp access is fully active.\n• Ample road parking is available on-site.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("greetings") || query.includes("name") || query.includes("doctor")) {
        reply = "🏥 Hello there! I am Dr. Uday Phute's clinical AI Assistant.\n\nHow may I support you today? You can ask me anything about:\n\n1. **Robotic Knee Joint Replacements** 🔬\n2. **Minimally Invasive Spine & Disc Surgeries** 🦴\n3. **Clinic Consultation Hours & Timings** 📅\n4. **How to Book an Appointment** 📅\n\nPlease let me know your symptoms, or what questions you have!";
      } else if (query.includes("contact") || query.includes("phone") || query.includes("call") || query.includes("number") || query.includes("mobile") || query.includes("whatsapp")) {
        reply = "📞 **Clinic Helplines:**\n\nTo speak directly to our receptionist or book a priority slot, please use:\n\n• **Call / WhatsApp Helpline:** +91 8149407269\n• **Interactive Scheduling:** You can fill out the interactive appointment booking form right inside this page by clicking requests.";
      } else {
        reply = "🏥 **Sai Joint & Spine Clinic Support:**\n\nThank you for reaching out! To assist you best:\n\n• Dr. Uday Phute specializes in **Fully Automatic Robotic Knee Replacements** and **Endoscopic Spine Micro-surgeries**.\n• We are located on **Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar**.\n• You can book a priority consult on the website or via **WhatsApp** (+91 8149407269).\n\nPlease ask about joint replacement, spine treatments, scheduling, or help with any pain symptoms!";
      }

      const aiMsg: ChatMessage = {
        id: "msg-" + Date.now() + "-ai-fallback",
        sender: "ai",
        text: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputText);
    }
  };

  // Simple Markdown-to-HTML parser (bold and lists) for a cohesive and high-fidelity output
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, blockIndex) => {
      let formatted = line;

      // Unordered lists format
      const isListItem = formatted.startsWith("- ") || formatted.startsWith("• ");
      if (isListItem) {
        formatted = formatted.substring(2);
      }

      // Match bold text '**text**'
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIdx = 0;
      let match;

      while ((match = boldRegex.exec(formatted)) !== null) {
        if (match.index > lastIdx) {
          parts.push(formatted.substring(lastIdx, match.index));
        }
        parts.push(<strong key={match.index} className="font-extrabold text-slate-900">{match[1]}</strong>);
        lastIdx = boldRegex.lastIndex;
      }
      if (lastIdx < formatted.length) {
        parts.push(formatted.substring(lastIdx));
      }

      const content = parts.length > 0 ? parts : formatted;

      if (isListItem) {
        return (
          <li key={blockIndex} className="ml-4 list-disc pl-1 text-slate-700 leading-relaxed text-xs">
            {content}
          </li>
        );
      }

      return (
        <p key={blockIndex} className="text-xs text-slate-700 leading-relaxed min-h-[0.5rem]">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5" id="floating-support-container">
      
      {/* Floating Stack */}
      <div className="flex flex-col items-end gap-2.5">
        
        {/* WA Floating Shortcut - Green */}
        <a
          href="https://wa.me/918149407269?text=Hello%20Sai%20Joint%20and%20Spine%20Clinic,%20I'd%20like%20to%20discuss%20my%20joint/spinal%20issue..."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
          aria-label="Contact via WhatsApp"
          id="floating-whatsapp-action"
        >
          {/* Action indicator tooltip */}
          <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-right whitespace-nowrap bg-slate-900 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-md font-sans">
            Chat on WhatsApp
          </span>
          <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.375 3.47 2.234 2.237 3.463 5.214 3.46 8.381-.005 6.536-5.33 11.861-11.862 11.861-2.016-.002-3.993-.518-5.733-1.499L0 24zm6.758-15.016c-.199-.444-.41-.453-.601-.461-.155-.006-.333-.006-.511-.006-.178 0-.466.067-.71.333-.244.267-.932.911-.932 2.222 0 1.311.954 2.578 1.087 2.756.133.178 1.878 2.87 4.548 4.02 2.221.958 2.673.767 3.16.722.488-.045 1.576-.644 1.799-1.267.223-.622.223-1.156.156-1.267-.067-.111-.244-.178-.522-.311-.278-.134-1.644-.811-1.899-.9-.255-.09-.44-.134-.622.134-.182.267-.71.9-.87 1.078-.16.178-.321.2-.6.067-.278-.134-1.173-.433-2.234-1.38-.825-.736-1.382-1.644-1.544-1.922-.16-.278-.018-.43.12-.566.126-.12.278-.322.417-.489.138-.167.184-.278.278-.461.093-.183.047-.344-.023-.478-.069-.134-.601-1.448-.826-1.97-.219-.533-.46-.461-.601-.469z"/>
          </svg>
        </a>

        {/* AI Clinician Support Floating Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-cyan-200 transition-all duration-200 hover:scale-105 active:scale-95 ${
            isOpen 
              ? "bg-[#FF2222] text-white hover:bg-[#D41515]" 
              : "bg-[#00D5C9] text-slate-950 hover:bg-[#00BDB3] hover:text-white"
          }`}
          aria-label="Toggle Clinical Chatbot"
          id="floating-chatbot-toggle"
        >
          {isOpen ? (
            <X className="w-5.5 h-5.5 animate-spin-once" />
          ) : (
            <>
              <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-right whitespace-nowrap bg-slate-900 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-md font-sans">
                ASK Sai Spine AI
              </span>
              <Bot className="w-5.5 h-5.5" />
            </>
          )}
        </button>

      </div>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[390px] h-[calc(100vh-140px)] max-h-[520px] min-h-[320px] bg-white rounded-2xl shadow-2xl border border-slate-150 overflow-hidden flex flex-col font-sans animate-slide-up"
          id="clinical-chat-box"
        >
          {/* Chat Header matching signage styling: Red (Sai) & Teal (Joint & Spine) */}
          <div className="bg-slate-950 p-4 border-b border-slate-900 flex items-center justify-between text-left relative">
            {/* Signage top thin gradient border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF2222] to-[#00D5C9]" />
            
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                <Sparkles className="w-4.5 h-4.5 text-[#00D5C9]" />
              </div>
              <div>
                <div className="flex items-baseline gap-1 text-xs">
                  <span className="text-[#FF2222] font-black uppercase text-sm">Sai</span>
                  <span className="text-[#00D5C9] font-black uppercase text-xs">AI Assistant</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Digital Ortho & Spinal Care Expert</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-full transition-colors ${
                  showSettings ? "text-[#00D5C9] bg-slate-900" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
                aria-label="Configure API Key"
                title="Configure Gemini API Key"
              >
                <Settings className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded-full hover:bg-slate-900"
                aria-label="Close message window"
                id="close-chat-widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel for API Key */}
          {showSettings && (
            <div className="bg-slate-900 p-3 border-b border-slate-800 text-xs text-white space-y-2 text-left relative z-10 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#00D5C9] flex items-center gap-1">
                  <Key className="w-3.5 h-3.5" /> Gemini API Config
                </span>
                <span className="text-[9px] text-[#25D366] font-bold">
                  {activeKey ? "✓ Connected" : "⚠ Fallback Mode"}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Enter your Gemini API Key to enable live AI responses. If left empty, the chatbot will use local matching rules.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste Gemini API Key..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00D5C9]"
                />
                <button
                  onClick={handleSaveKey}
                  className="bg-[#00D5C9] hover:bg-[#00BDB3] text-slate-950 font-bold px-3 py-1.5 rounded-xl transition-colors text-[10px] shrink-0"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-left">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-slate-200 text-slate-700" 
                    : "bg-[#00D5C9]/10 text-[#007D77]"
                }`}>
                  {msg.sender === "user" ? (
                    <span className="text-[10px] font-extrabold uppercase font-mono">You</span>
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div className={`p-3 rounded-2xl max-w-[80%] space-y-2 relative transition-all ${
                  msg.sender === "user"
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none"
                }`}>
                  <div className="space-y-1.5 break-words">
                    {msg.sender === "user" ? (
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                    ) : (
                      renderMessageText(msg.text)
                    )}
                  </div>
                  <span className={`block text-[8px] font-semibold text-right ${
                    msg.sender === "user" ? "text-slate-400" : "text-slate-400"
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Simulated Clinical Assistant Thinking/Typing State */}
            {isTyping && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#00D5C9]/10 text-[#007D77] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="block w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="block w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="block w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Row */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-none text-left">
            {QuickPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(item.prompt)}
                className="shrink-0 px-3 py-1.5 bg-slate-50 border border-slate-100 hover:border-[#00D5C9]/30 hover:bg-[#00D5C9]/5 rounded-xl text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-all font-sans"
                id={`quick-prompt-${idx}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Form input controls */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center shrink-0">
            <input
              type="text"
              required
              placeholder="Ask about treatments, OPD schedule..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D5C9]/10 focus:border-[#00D5C9] transition-all text-slate-800"
              id="chatbot-message-input"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-[#00D5C9] hover:bg-[#00BDB3] text-white disabled:bg-slate-100 disabled:text-slate-400 rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0"
              aria-label="Send user message"
              id="chatbot-send-action"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Warning disclaimer */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100">
            <p className="text-[8.5px] font-semibold text-slate-400 text-center uppercase tracking-wide leading-none">
              ℹ️ Educational assist tool. Not a substitute for medical consultation.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
