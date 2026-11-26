'use strict';

const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch {
      const warning = document.getElementById('storage-warning');
      if (warning) warning.hidden = false;
      return false;
    }
  },
};
export { storage };
