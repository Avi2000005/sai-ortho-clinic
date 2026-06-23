import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export default function LanguageTranslator() {
  const [currentLang, setCurrentLang] = useState("en");

  // Helper to read cookie
  const getCookie = (name: string) => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    } catch (e) {
      console.warn(e);
    }
    return null;
  };

  // Helper to set cookie
  const setCookie = (name: string, value: string) => {
    try {
      document.cookie = `${name}=${value}; path=/;`;
      const host = window.location.hostname;
      document.cookie = `${name}=${value}; path=/; domain=${host}`;
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    // 1. Initialize language state from cookie
    const cookieVal = getCookie("googtrans");
    if (cookieVal) {
      const lang = cookieVal.split("/").pop();
      if (lang === "mr" || lang === "en") {
        setCurrentLang(lang);
      }
    }

    // 2. Setup Google Translate Element Init callback
    (window as any).googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: "en",
          includedLanguages: "en,mr",
          autoDisplay: false
        }, "google_translate_element");
      } catch (e) {
        console.error("Google Translate Element Init failure", e);
      }
    };

    // 3. Inject Google Translate script if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "mr" : "en";
    setCurrentLang(nextLang);

    // Update cookie googtrans
    const cookieVal = `/en/${nextLang}`;
    setCookie("googtrans", cookieVal);

    // Try to trigger Google Translate dynamic select
    let success = false;
    try {
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = nextLang;
        selectEl.dispatchEvent(new Event("change"));
        success = true;
      }
    } catch (e) {
      console.warn("Failed to set google translate value dynamically", e);
    }

    // If dynamic selector is not loaded or failed, do page reload
    if (!success) {
      window.location.reload();
    }
  };

  return (
    <div className="inline-block" id="language-translator-widget">
      {/* Hidden container for Google Translate script */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-primary-deep transition-all select-none cursor-pointer"
        aria-label="Toggle Language (English / Marathi)"
      >
        <Globe className="w-3.5 h-3.5 text-primary-dark" />
        <span>{currentLang === "en" ? "मराठी" : "English"}</span>
      </button>
    </div>
  );
}
