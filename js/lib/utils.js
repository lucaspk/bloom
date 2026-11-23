'use strict';

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const emailKey = value => String(value).trim().toLowerCase();
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validUsername = value => /^[a-z0-9][a-z0-9._-]{2,29}$/i.test(value);
export const countLabel = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;
export const tagName = (tag) => '#' + tag.trim().split(/\s+/).filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join('');
export const blankSource = () => ({ title: '', author: '', bibliography: '', immediate: true });
export const blankEntry = () => ({ id: '', title: '', bookId: '', reference: '', quote: '', text: '', tags: [] });
export { esc, normalize, emailKey, validEmail, validUsername };
