/**
 * Safely executes window.scrollTo with fallback for older browsers and sandboxed environments
 */
export function safeScrollTo(top = 0, behavior: "smooth" | "auto" = "smooth") {
  try {
    if (typeof window !== "undefined") {
      window.scrollTo({ top, behavior });
    }
  } catch (e) {
    try {
      if (typeof window !== "undefined") {
        window.scrollTo(0, top);
      }
    } catch (err) {
      console.warn("safeScrollTo fallback failed:", err);
    }
  }
}

/**
 * Safely dispatches standard events in sandboxed context
 */
export function safeDispatchEvent(eventName: string) {
  try {
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new Event(eventName));
      } catch (e) {
        // Fallback for older browsers or restricted sandboxes
        const event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
        window.dispatchEvent(event);
      }
    }
  } catch (err) {
    console.warn(`safeDispatchEvent for ${eventName} failed:`, err);
  }
}

