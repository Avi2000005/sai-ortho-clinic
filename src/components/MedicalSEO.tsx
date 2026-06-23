import { useEffect } from "react";

export default function MedicalSEO() {
  useEffect(() => {
    // 1. Meta Titles & Description setup on document head
    document.title = "Sai Joint & Spine Clinic - Chh. Sambhajinagar | Dr. Uday Phute";
    
    const metaDescription = "Premium Orthopedic, Spine & Robotic Joint Replacement Center in Garkheda, Chh. Sambhajinagar. Led by Dr. Uday Phute with 25+ Years Experience. Precision with Compassion.";
    
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement("meta");
      metaDescEl.setAttribute("name", "description");
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute("content", metaDescription);

    // Safe location parameters to avoid SecurityError / DOMException inside sandboxed iframes
    let safeUrl = "https://saijointspineclinic.com";
    let safeOrigin = "https://saijointspineclinic.com";
    try {
      if (typeof window !== "undefined" && window.location) {
        safeUrl = window.location.href || safeUrl;
        safeOrigin = window.location.origin || safeOrigin;
      }
    } catch (e) {
      console.warn("Could not access window.location safely inside sandbox:", e);
    }

    // 2. Open Graph tags
    const ogTags = [
      { property: "og:title", content: "Sai Joint & Spine Clinic - Premium Bone & Spinal Care" },
      { property: "og:description", content: "Specialist Robotic Knee Replacement & Spinal Micro-surgeries in Garkheda, Chh. Sambhajinagar adjacent to Sai Urology." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: safeUrl },
      { property: "og:image", content: "/images/hero-main.jpg" }
    ];

    ogTags.forEach((tag) => {
      let el = document.querySelector(`meta[property="${tag.property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", tag.content);
    });

    // 3. Inject Structured Schema JSON-LD
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "SAI JOINT & SPINE CLINIC",
      "alternateName": "Dr. Uday Phute Joint Spine Clinic Chh. Sambhajinagar",
      "url": safeOrigin,
      "logo": "/images/logo.jpg",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-8149407269",
          "contactType": "Emergency / Appointment Desk",
          "areaServed": "India",
          "availableLanguage": ["English", "Marathi", "Hindi"]
        }
      ]
    };

    const physicianSchema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Uday Phute",
      "image": "/doctor.jpg",
      "medicalSpecialty": [
        "https://schema.org/OrthopedicSurgeon",
        "https://schema.org/SpineSurgeon",
        "https://schema.org/JointReplacement"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gajanan Maharaj Mandir Road, Garkheda, Beside Sai Urology Hospital",
        "addressLocality": "Chh. Sambhajinagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431009",
        "addressCountry": "IN"
      },
      "telephone": "+918149407269",
      "knowsAbout": ["Robotic Knee Replacement", "Spine Decompression", "Joint Wear Care", "Bone Trauma Fixation"]
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Sai Joint & Spine Clinic",
      "image": "/images/home-joint.jpg",
      "telephone": "0240 2993122",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gajanan Maharaj Mandir Road, Garkheda",
        "addressLocality": "Chh. Sambhajinagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431009",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.8596",
        "longitude": "75.3411"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "19:00",
          "closes": "21:00"
        }
      ],
      "priceRange": "$$"
    };

    const scriptId = "medical-jsonld-schema";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    
    // Combine schemas in graph array
    scriptTag.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [organizationSchema, physicianSchema, localBusinessSchema]
    });

    return () => {
      // Cleanup schemas if needed to keep DOM clean
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return null; // Side-effect only component
}
