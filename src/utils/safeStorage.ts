/**
 * Safe local storage utility with memory-based fallback.
 * Prevents DOMException / SecurityError crashes when accessing localStorage in sandboxed iframes.
 */

class SafeStorage {
  private memoryCache: Record<string, string> = {};

  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("Storage access failed, using memory cache", e);
    }
    return this.memoryCache[key] !== undefined ? this.memoryCache[key] : null;
  }

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn("Storage write failed, saving to memory cache", e);
    }
    this.memoryCache[key] = value;
  }

  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn("Storage removal failed, removing from memory cache", e);
    }
    delete this.memoryCache[key];
  }

  clear(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.clear();
        return;
      }
    } catch (e) {
      console.warn("Storage clear failed, clearing memory cache", e);
    }
    this.memoryCache = {};
  }
}

export const safeStorage = new SafeStorage();
