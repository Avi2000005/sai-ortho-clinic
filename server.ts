import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Fallback responses generator for local matching when API limits are exceeded
function getLocalFallbackResponse(query: string): string {
  const q = (query || "").toLowerCase();
  if (
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where") ||
    q.includes("direction") ||
    q.includes("map") ||
    q.includes("landm") ||
    q.includes("reach") ||
    q.includes("located") ||
    q.includes("situated")
  ) {
    return "📍 **Clinic Location & Directions:**\n\nSai Joint & Spine Clinic is highly accessible, situated adjacent to Sai Urology Hospital:\n\n🏠 **Landmark Address:**\nGajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra - 431009.\n\n• Wheelchair-friendly ramp access is fully active.\n• Ample road parking is available on-site.";
  } else if (
    q.includes("timing") ||
    q.includes("hour") ||
    q.includes("open") ||
    q.includes("schedule") ||
    q.includes("consult") ||
    q.includes("days") ||
    q.includes("when")
  ) {
    return "📅 **OPD Consultation Hours:**\n\nDr. Uday Phute is available for clinic consultations with the following schedule:\n\n• **Monday to Friday:** 07:00 PM to 09:00 PM\n• **Saturday & Sunday:** Closed (Emergency admissions & hospital rounds only)\n\nTo lock your clinical Slot, click the **Request Appointment** button above or click the Floating **WhatsApp Button** below to send an instant booking request!";
  } else if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("number") ||
    q.includes("mobile") ||
    q.includes("whatsapp")
  ) {
    return "📞 **Clinic Helplines:**\n\nTo speak directly to our receptionist or book a priority slot, please use:\n\n• **Call / WhatsApp Helpline:** +91 8149407269\n• **Interactive Scheduling:** You can fill out the interactive appointment booking form right inside this page by clicking requests.";
  } else if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("greetings") ||
    q.includes("name") ||
    q.includes("doctor")
  ) {
    return "🏥 Hello there! I am Dr. Uday Phute's clinical AI Assistant.\n\nHow may I support you today? You can ask me anything about:\n\n1. **Robotic Knee Joint Replacements** 🔬\n2. **Minimally Invasive Spine & Disc Surgeries** 🦴\n3. **Clinic Consultation Hours & Timings** 📅\n4. **How to Book an Appointment** 📅\n\nPlease let me know your symptoms, or what questions you have!";
  } else if (
    q.includes("robotic") ||
    q.includes("knee") ||
    q.includes("hip") ||
    q.includes("joint replacement") ||
    q.includes("joint pain") ||
    q.includes("replace") ||
    q.includes("surgery") ||
    q.includes("arthrit")
  ) {
    return "🔬 **Robotic Knee Joint Replacement:**\n\nDr. Uday Phute specializes in State-of-the-Art, Fully Automatic Robotic Joint Replacement. Our clinic uses the most advanced medical navigation tools.\n\n• **Sub-millimeter Precision:** Protects healthy ligaments and bone structure.\n• **Minimal Incision:** Decreases pain levels post-surgery.\n• **Rapid Recovery:** Most patients are able to take independent, assisted steps within **24 hours** after surgery.\n\nWould you like to schedule an expert physical evaluation or discuss clinical symptoms?";
  } else if (
    q.includes("spine") ||
    q.includes("back") ||
    q.includes("disc") ||
    q.includes("sciatica") ||
    q.includes("spondy") ||
    q.includes("neck") ||
    q.includes("pain")
  ) {
    return "🦴 **Minimally Invasive Spine Orthopedics:**\n\nWe provide complete diagnostic protocols for spinal ailments, treating severe conditions with surgical preservation first where applicable:\n\n• **Keyhole Endoscopic Slipped Disc Relief:** Targeted spinal decompression with a sub-centimeter entry incision.\n• **Sciatica & Stenosis Treatment:** Customized spinal block injections and medical spine strength regimens.\n• **Sciatica & Spondylosis Rehabilitation:** High-grade diagnostic imaging to accurately detect intervertebral narrowing.\n\nWe would be honored to assist you in walking pain-free!";
  } else {
    return "🏥 **Sai Joint & Spine Clinic Support:**\n\nThank you for reaching out! To assist you best:\n\n• Dr. Uday Phute specializes in **Fully Automatic Robotic Knee Replacements** and **Endoscopic Spine Micro-surgeries**.\n• We are located on **Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar**.\n• You can book a priority consult on the website or via **WhatsApp** (+91 8149407269).\n\nPlease ask about joint replacement, spine treatments, scheduling, or help with any pain symptoms!";
  }
}

function streamLocalFallback(message: string, res: express.Response) {
  try {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();
    }
    const fallbackText = getLocalFallbackResponse(message);
    res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.warn("streamLocalFallback issue:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat API - SSE Streaming enabled for responsive, low-latency chatbot answers
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    // Safe lazy initialization
    let ai;
    try {
      ai = getAiClient();
    } catch (err: any) {
      console.warn("AI client not available, engaging local clinical matching fallback.");
      return streamLocalFallback(message, res);
    }

    try {
      // Format complete history for model.generateContentStream according to Google GenAI content guidelines
      const contents = [
        ...((history || []).map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.parts?.[0]?.text || "" }]
        }))),
        { role: "user", parts: [{ text: message }] }
      ];

      // Set headers for standard EventStream and bypass intermediate proxy buffering (like Nginx / Cloud Run)
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();

      try {
        const responseStream = await ai.models.generateContentStream({
          model: "gemini-3.5-flash",
          contents,
          config: {
            temperature: 0.15,
            maxOutputTokens: 350,
            systemInstruction: `You are the official clinical AI Assistant of "Sai Joint & Spine Clinic" in Chh. Sambhajinagar, Maharashtra, supporting Dr. Uday Phute (Eminent Robotic Joint Replacement & Spine Surgeon).
Respond with compassion, absolute medical alignment, and clear structured clinical guidance.

IMPORTANT VISUAL & PERFORMANCE DIRECTIVES:
- Keep your answers highly structured, factual, warm, and brief (ideally within 2-4 sentences or a few bullets) to ensure rapid loading.
- Avoid repeating generic introductions; dive directly into addressing the user's clinical or logistic question.
- Always mention that users can schedule a professional appointment dynamically using this website or via WhatsApp.
- STRICTLY forbid prescribing any medicinal drugs, clinical dosages, or specific self-treatment diagnostics; instead, suggest scheduling a professional, sterile consultation.

Clinic Details:
- Location: Beside Sai Urology Hospital, Gajanan Maharaj Mandir Road, Garkheda, Chh. Sambhajinagar, Maharashtra, India.
- Phone/WhatsApp Helpline: +91 8149407269.
- OPD Hours: Monday to Friday: 07:00 PM to 09:00 PM. Saturday & Sunday: Closed.
- Specialties: Robotic Knee Joint Replacement, Hip Replacement, Minimally Invasive Spine Surgeries (Endoscopic), Fracture Treatments, and Advanced Arthritis care.`,
          }
        });

        for await (const chunk of responseStream) {
          if (chunk.text) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
          }
        }

        res.write("data: [DONE]\n\n");
        res.end();
      } catch (streamError: any) {
        // Fallback gracefully without throwing standard console.error warnings
        console.warn("AI generation session failed or quota limits exceeded. Initiating premium local backup responder.");
        const fallbackText = getLocalFallbackResponse(message);
        res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
      }
    } catch (outerError: any) {
      console.warn("Express outer error caught:", outerError);
      return streamLocalFallback(message, res);
    }
  });

  // Vite static/asset serving & Hot-Module-Replacement proxying
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched on port ${PORT}`);
  });
}

startServer();
