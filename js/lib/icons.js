'use strict';

const icons = {
  'book-open': '<path d="M12 7v14m0-14C9 4 5 4 2 5v15c3-1 7-1 10 1 3-2 7-2 10-1V5c-3-1-7-1-10 2Z"/>',
  book: '<path d="M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 14h14M7 3v14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
  'mail-check': '<path d="M20 11V5H3v14h9M3 6l8.5 7L20 6m-4 11 3 3 4-6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3Z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v7a3 3 0 0 0 6 0v-3a10 10 0 1 0-4 8"/>',
  archive: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M5 9h14M5 15h14m-5-9h-4m4 6h-4m4 6h-4"/>',
  write: '<path d="M3 5h12M3 10h10M3 15h6m5 5 7-7-3-3-7 7-1 4 4-1Z"/>',
  tag: '<path d="m13 3 8 9-8 9H3l7-9-7-9h10Z"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  x: '<path d="m6 6 12 12M6 18 18 6"/>',
  logout: '<path d="M9 4H4v16h5m4-14 6 6-6 6m-5-6h12"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  quote: '<path d="M4 5h6v6H5c0 4-1 5-2 6m11-12h6v6h-5c0 4-1 5-2 6"/>',
  copy: '<rect x="8" y="3" width="12" height="15" rx="1"/><path d="M5 7H3v14h13v-2"/>',
  link: '<path d="m10 14 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
  sparkle: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Zm8-2v4m-2-2h4"/>',
  sort: '<path d="M4 6h16M4 11h11M4 16h6"/>',
  pencil: '<path d="m15 4 5 5M4 20l4-1L21 6l-4-4L4 15v5Z"/>',
  trash: '<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  order: '<path d="M8 4v16m-4-4 4 4 4-4m4 4V4m-4 4 4-4 4 4"/>',
  themes: '<circle cx="12" cy="12" r="2"/><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="4" cy="7" r="1.5"/><circle cx="20" cy="7" r="1.5"/><circle cx="4" cy="17" r="1.5"/><circle cx="20" cy="17" r="1.5"/><path d="M12 5v5m0 4v5M6 8l4 3m4 2 4 3M6 16l4-3m4-2 4-3"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.book}</svg>`;
export { icons, icon };
export function mountIcons() {
  document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
}
