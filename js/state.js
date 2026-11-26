'use strict';

import { AUTH_ENABLED, LEGACY_DEMO_SOURCE_IDS } from './lib/constants.js';
import { storage } from './lib/storage.js';
import { validEmail, validUsername, emailKey, blankSource } from './lib/utils.js';

export const state = {};

export function initAppState() {
  const storedThemes = storage.get('arquivo-themes-v1', []);
  state.customThemes = Array.isArray(storedThemes) ? storedThemes.filter(t => t && typeof t.name === 'string' && t.name.trim() && typeof t.description === 'string').map(t => ({ name: t.name.trim(), description: t.description, addedAt: Number(t.addedAt) || 0, originalName: typeof t.originalName === 'string' ? t.originalName : '' })) : [];
  const storedDeletedThemes = storage.get('arquivo-deleted-themes-v1', []);
  state.deletedThemes = Array.isArray(storedDeletedThemes) ? storedDeletedThemes.filter(t => typeof t === 'string') : [];
  const storedSources = storage.get('arquivo-sources-v1', []);
  const storedDeletedSources = storage.get('arquivo-deleted-sources-v1', []);
  state.deletedSources = Array.isArray(storedDeletedSources) ? storedDeletedSources.filter(id => typeof id === 'string') : [];
  const saved = storage.get('arquivo-reflections-v1', []);
  // Remove only the old fixture IDs once; keep personal records and explicit imports.
  const migrateDemo = !storage.get('bloom-clean-archive-v1', false);
  const sources = Array.isArray(storedSources) ? storedSources : [];
  state.books = sources.filter(b => b && typeof b.id === 'string' && /^[a-z0-9-]+$/.test(b.id) && (!migrateDemo || !LEGACY_DEMO_SOURCE_IDS.includes(b.id)) && typeof b.title === 'string' && b.title.trim() && typeof b.author === 'string' && b.author.trim() && !state.deletedSources.includes(b.id)).map(b => ({ id: b.id, title: b.title, author: b.author, year: typeof b.year === 'string' ? b.year : '', description: typeof b.description === 'string' ? b.description : '', bibliography: typeof b.bibliography === 'string' ? b.bibliography : '', color: '#343126', addedAt: Number(b.addedAt) || 0 })).filter((b, i, list) => list.findIndex(other => other.id === b.id) === i);
  state.reflections = (Array.isArray(saved) ? saved : []).filter(r => r && typeof r.id === 'string' && (!migrateDemo || !/^(?:r[1-4]|theme-demo-\d+|source-demo-\d+)$/.test(r.id)) && typeof r.text === 'string' && state.books.some(b => b.id === r.bookId) && Array.isArray(r.tags) && r.tags.every(t => typeof t === 'string'));
  if (migrateDemo) {
    const sourcesSaved = storage.set('arquivo-sources-v1', state.books);
    const reflectionsSaved = storage.set('arquivo-reflections-v1', state.reflections);
    const draft = storage.get('arquivo-entry-draft-v2', null);
    const draftSaved = !draft || !LEGACY_DEMO_SOURCE_IDS.includes(draft.bookId) || storage.set('arquivo-entry-draft-v2', null);
    if (sourcesSaved && reflectionsSaved && draftSaved) storage.set('bloom-clean-archive-v1', true);
  }
  state.email = AUTH_ENABLED ? storage.get('arquivo-email-v1', 'leitor@exemplo.com') : '';
  if (typeof state.email !== 'string') state.email = '';
  state.profileName = storage.get('arquivo-profile-name-v1', 'Meu acervo');
  state.profileName = typeof state.profileName === 'string' && state.profileName.trim() ? state.profileName.trim().slice(0, 80) : 'Meu acervo';
  if (state.email === 'leitor@exemplo.com' && state.profileName === 'Leitor do Arquivo') state.profileName = 'Leitor Bloom';
  const storedAccounts = AUTH_ENABLED ? storage.get('arquivo-accounts-v1', null) : [];
  state.accounts = Array.isArray(storedAccounts) ? storedAccounts.filter(account => account && typeof account.email === 'string' && validEmail(account.email) && typeof account.name === 'string' && account.name.trim() && account.name.length <= 80 && typeof account.username === 'string' && validUsername(account.username)).map(account => ({ email: emailKey(account.email), name: account.name.trim(), username: account.username.toLowerCase() })) : [];
  state.accounts.forEach(account => {
    if (account.email === 'leitor@exemplo.com' && account.name === 'Leitor do Arquivo') account.name = 'Leitor Bloom';
  });
  if (AUTH_ENABLED && !state.accounts.some(account => account.email === 'leitor@exemplo.com')) state.accounts.push({ email: 'leitor@exemplo.com', name: emailKey(state.email) === 'leitor@exemplo.com' ? state.profileName : 'Leitor Bloom', username: 'leitor.bloom' });
  // Preserve access for an e-mail used before the prototype had account registration.
  if (AUTH_ENABLED && storedAccounts === null && validEmail(state.email) && !state.accounts.some(account => account.email === emailKey(state.email))) state.accounts.push({ email: emailKey(state.email), name: state.profileName, username: 'leitor.anterior' });
  if (AUTH_ENABLED) storage.set('arquivo-accounts-v1', state.accounts);
  state.pendingAccess = AUTH_ENABLED ? storage.get('arquivo-pending-access-v1', null) : null;
  if (!state.pendingAccess || typeof state.pendingAccess.email !== 'string' || !validEmail(state.pendingAccess.email) || typeof state.pendingAccess.name !== 'string' || !state.pendingAccess.name.trim() || typeof state.pendingAccess.username !== 'string' || !validUsername(state.pendingAccess.username) || typeof state.pendingAccess.isNew !== 'boolean') state.pendingAccess = null;
  state.loginDraft = { email: state.pendingAccess?.email || (state.email !== 'leitor@exemplo.com' ? state.email : ''), name: state.pendingAccess?.isNew ? state.pendingAccess.name : '', username: state.pendingAccess?.isNew ? state.pendingAccess.username : '' };
  state.route = 'inicio';
  state.query = '';
  state.sourceQuery = '';
  state.sourceSort = 'recentes';
  state.themeQuery = '';
  state.themeSort = 'fichas';
  state.selectedTheme = '';
  state.selectedSource = '';
  state.sourceTheme = '';
  state.sourceEntryQuery = '';
  state.sourceEntrySort = 'recentes';
  state.sourceSearchOpen = false;
  state.entryQuery = '';
  state.entrySort = 'recentes';
  const storedVocabulary = storage.get('arquivo-vocabulary-v1', []);
  state.vocabulary = Array.isArray(storedVocabulary) ? storedVocabulary.filter(w => w && typeof w.id === 'string' && typeof w.word === 'string' && w.word.trim()).map(w => ({
    id: w.id,
    word: w.word.trim(),
    synonyms: typeof w.synonyms === 'string' ? w.synonyms : '',
    description: typeof w.description === 'string' ? w.description : '',
    addedAt: Number(w.addedAt) || 0,
    updatedAt: Number(w.updatedAt) || 0,
  })) : [];
  state.vocabularyQuery = '';
  state.vocabularySort = 'recentes';
  state.selectedWord = '';
  state.newWordDraft = { word: '', synonyms: '', description: '' };
  state.newWordReturn = 'palavras';
  state.newThemeDraft = { name: '', description: '' };
  state.newThemeReturn = 'temas';
  state.newSourceDraft = blankSource();
  state.newSourceReturn = 'obras';
  state.pendingSourceSheet = null;
  state.activeTheme = '';
  state.resendUntil = 0;
  state.resendTimer;
  state.toastTimer;
  state.authTimer;
  state.opener;
  state.editor = null;
  state.sourceEntryDraft = null;
  state.pendingArchiveImport = null;
  state.autosaveTimer;
  state.editorReturn = 'inicio';
}

export const accountFor = (value) => state.accounts.find((account) => account.email === emailKey(value));
