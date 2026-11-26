'use strict';

import { AUTH_ENABLED, DEMO_CODE } from './lib/constants.js';
import { storage } from './lib/storage.js';
import { esc, normalize, emailKey, validEmail, validUsername, countLabel, tagName, blankSource, blankEntry } from './lib/utils.js';
import { icon } from './lib/icons.js';
import { app, modal } from './dom.js';
import { state, accountFor } from './state.js';

// Reusable view fragments: their inputs are data, and dynamic text is escaped here.
function searchFieldHTML({ id, placeholder, label, value, clearAction, clearLabel, className = 'sources-search search-wrap' }) {
  return `<div class="${esc(className)}">${icon('search')}<input id="${esc(id)}" type="search" placeholder="${esc(placeholder)}" aria-label="${esc(label)}" value="${esc(value)}" autocomplete="off"><button class="clear-search" data-action="${esc(clearAction)}" aria-label="${esc(clearLabel)}" ${value ? '' : 'hidden'}>${icon('x')}</button></div>`;
}
function selectOptionsHTML(options, selected) {
  return options.map(([value, label]) => `<option value="${esc(value)}" ${selected === value ? 'selected' : ''}>${esc(label)}</option>`).join('');
}
function sortControlHTML({ id, label, value, options }) {
  return `<div class="source-sort">${icon('sort')}<select id="${esc(id)}" aria-label="${esc(label)}">${selectOptionsHTML(options, value)}</select></div>`;
}
function listControlsHTML({ count, countId, singular, plural, createAction, createLabel, sort, className = 'sources-controls' }) {
  return `<div class="${esc(className)}"><span class="sources-count" id="${esc(countId)}" role="status">${countLabel(count, singular, plural)}</span><button class="source-new-button" data-action="${esc(createAction)}">${icon('plus')} ${esc(createLabel)}</button>${sortControlHTML(sort)}</div>`;
}

// Draft reads keep spaces while typing; saving trims only fields present in the form.
function readEntryFields(form, { trim = false } = {}) {
  const values = {};
  for (const name of ['title', 'bookId', 'reference', 'identifier', 'quote', 'text']) {
    const field = form.elements.namedItem(name);
    if (field) values[name] = trim ? field.value.trim() : field.value;
  }
  return values;
}
function validateEntry(values, sourceMessage) {
  if (!bookFor(values.bookId)) return { field: 'bookId', message: sourceMessage };
  if (!values.text.trim()) return { field: 'text', message: 'Escreva uma reflexão ou nota para salvar sua ficha.' };
  return null;
}
function showFormError(form, errorId, message, fieldName) {
  document.getElementById(errorId).textContent = message;
  const field = form.elements.namedItem(fieldName);
  if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
}
function clearFieldError(field, errorId) {
  field.classList.remove('invalid');
  field.removeAttribute('aria-invalid');
  document.getElementById(errorId).textContent = '';
}
const fieldErrorIds = { email: 'email-error', 'signup-name': 'signup-name-error',
  'signup-username': 'signup-username-error', 'profile-name': 'profile-name-error',
};
const formErrorIds = {
  'theme-form': 'theme-error', 'theme-edit-form': 'theme-edit-error',
  'vocabulary-form': 'vocabulary-error', 'vocabulary-edit-form': 'vocabulary-edit-error',
  'source-form': 'source-error', 'source-edit-form': 'source-edit-error',
  'source-entry-edit-form': 'ficha-edit-error', 'reflection-form': 'reflection-error',
};
function parseSynonyms(value) {
  if (typeof value !== 'string' || !value.trim()) return [];
  const seen = new Set();
  return value.split(/[,;\n]+/).map(part => part.trim()).filter(part => {
    if (!part) return false;
    const key = normalize(part);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function synonymsLineHTML(value) {
  const items = parseSynonyms(value);
  if (!items.length) return '';
  return `<span class="word-card-synonyms">${items.map(item => `<span>${esc(item)}</span>`).join('')}</span>`;
}
const wordFor = (id) => state.vocabulary.find(w => w.id === id);
function persistVocabulary() { return storage.set('arquivo-vocabulary-v1', state.vocabulary); }
function showDialog(content, className = '') {
  state.opener = document.activeElement;
  modal.className = className;
  modal.innerHTML = content;
  if (!modal.open) modal.showModal();
}
function formatText(value) {
  return esc(value).replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/^&gt; (.+)$/gm, '<span class="inline-quote">$1</span>');
}
const bookFor = (id) => state.books.find((b) => b.id === id);
const countFor = (id) => state.reflections.filter((r) => r.bookId === id).length;

function themeCatalog() {
  const entries = [...state.customThemes, ...state.reflections.flatMap(r => r.tags).map(name => ({ name, description: '' }))];
  const seen = new Set();
  return entries.filter(t => { const key = normalize(t.name); if (seen.has(key)) return false; seen.add(key); return true; });
}
const allThemes = () => themeCatalog().map(t => t.name);
const recordsForTheme = name => state.reflections.filter(r => r.tags.some(tag => normalize(tag) === normalize(name)));
const themeDescription = theme => theme.description || '';
function toast(message) {
  const el = document.querySelector('#toast');
  clearTimeout(state.toastTimer);
  el.textContent = message;
  el.classList.add('visible');
  state.toastTimer = setTimeout(() => el.classList.remove('visible'), 3600);
}
function go(next) {
  if (location.hash === '#' + next) render();
  else location.hash = next;
}
function loginHTML() {
  return `<section class="screen auth-screen login-screen" aria-labelledby="login-title">
    <div class="auth-hero"><div class="mark">${icon('book-open')}<span class="mark-dot"></span></div><h1 id="login-title">Entrar</h1></div>
    <button class="google-button" data-action="google"><svg class="google-g" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.25c1.9-1.75 2.97-4.32 2.97-7.37Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.4l-3.25-2.52c-.9.6-2.04.96-3.37.96-2.6 0-4.8-1.76-5.58-4.13H3.06v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.42 13.91a6 6 0 0 1 0-3.82v-2.6H3.06a10 10 0 0 0 0 9.02l3.36-2.6Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.36 2.6C7.2 7.72 9.4 5.96 12 5.96Z"/></svg>Continuar com o Google</button>
    <div class="separator">ou</div>
    <form id="login-form" novalidate><div class="login-field-heading"><label class="field-label" for="email">E-mail</label></div><div class="input-wrap">${icon('mail')}<input id="email" name="email" type="email" autocomplete="email" placeholder="seu@email.com" value="${esc(state.loginDraft.email)}" required aria-describedby="email-error"></div><p class="field-error" id="email-error" role="alert"></p>
    <div id="signup-fields" hidden><div class="signup-field"><div class="login-field-heading"><label class="field-label" for="signup-name">Nome completo</label></div><div class="input-wrap">${icon('user')}<input id="signup-name" name="name" autocomplete="name" maxlength="80" placeholder="Como você se chama?" value="${esc(state.loginDraft.name)}" required disabled aria-describedby="signup-name-error"></div><p class="field-error" id="signup-name-error" role="alert"></p></div><div class="signup-field"><div class="login-field-heading"><label class="field-label" for="signup-username">Nome de usuário (@username)</label></div><div class="input-wrap">${icon('at')}<input id="signup-username" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="30" placeholder="seu.username" value="${esc(state.loginDraft.username)}" required disabled aria-describedby="signup-username-error"></div><p class="field-error" id="signup-username-error" role="alert"></p></div></div>
    <button type="submit" class="primary-button login-submit"><span id="login-submit-label">Enviar código</span>${icon('arrow')}</button></form>
    <p class="auth-footnote">${icon('lock')} Demonstração · dados locais</p>
  </section>`;
}
function codeHTML() {
  return `<section class="screen auth-screen code-screen" aria-labelledby="code-title"><button class="back-button" data-action="back-login">${icon('back')} Voltar</button><div class="code-content"><div class="mark">${icon('mail-check')}</div><h1 id="code-title">Código de Acesso</h1><p class="code-description">Código enviado para</p><div class="email-line"><strong>${esc(state.pendingAccess?.email || state.email)}</strong><button class="text-button underlined" data-action="back-login">Alterar</button></div>
    <form id="code-form" novalidate><div class="otp-fields" role="group" aria-label="Código de acesso de 6 dígitos">${Array.from({ length: 6 }, (_, i) => `<input class="otp-digit" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" ${i === 0 ? 'autocomplete="one-time-code"' : 'autocomplete="off"'} aria-label="Dígito ${i + 1}" aria-describedby="code-error" placeholder="·" data-index="${i}">`).join('')}</div><p class="field-error" id="code-error" role="alert"></p><p class="demo-code">Código de demonstração: <button type="button" class="text-button" data-action="fill-code" aria-label="Preencher código de demonstração 482619">482619</button></p><button class="primary-button" type="submit">Confirmar e entrar ${icon('arrow')}</button></form><p class="resend">Não recebeu o código? <button class="text-button" id="resend" data-action="resend">Reenviar código</button></p></div></section>`;
}
function updateLoginState() {
  const form = document.querySelector('#login-form');
  if (!form) return;
  const value = form.elements.email.value.trim();
  const signup = validEmail(value) && form.elements.email.validity.valid && !accountFor(value);
  document.querySelector('#signup-fields').hidden = !signup;
  form.elements.name.disabled = !signup;
  form.elements.username.disabled = !signup;
  document.querySelector('.auth-screen').classList.toggle('signup-screen', signup);
  document.querySelector('#login-submit-label').textContent = signup ? 'Criar conta' : 'Enviar código';
}
function activateAccount(account) {
  state.email = account.email; state.profileName = account.name;
  storage.set('arquivo-email-v1', state.email); storage.set('arquivo-profile-name-v1', state.profileName);
  state.pendingAccess = null; storage.set('arquivo-pending-access-v1', null);
  state.loginDraft = { email: state.email, name: '', username: '' };
}
function navHTML() {
  const link = (id, glyph, title) => `<a href="#${id}" data-action="nav-route" data-route="${id}" ${(state.route === id || (['tema', 'novo-tema'].includes(state.route) && id === 'temas') || (['palavra', 'nova-palavra'].includes(state.route) && id === 'palavras') || (state.route === 'fonte' && id === 'obras')) ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${title}</span></a>`;
  return `<div class="archive-nav-dock"><nav class="archive-nav" aria-label="Navegação principal">${link('inicio', 'archive', 'Início')}${link('fichas', 'copy', 'Fichas')}<details class="create-menu"><summary class="nav-create ${['criar', 'nova-fonte', 'nova-palavra'].includes(state.route) ? 'active' : ''}" aria-label="Criar"><span class="nav-create-icon">${icon('write')}</span><span>Criar</span></summary><div class="create-menu-panel"><button data-action="menu-create-entry"><span class="create-option-icon">${icon('write')}</span><span><strong>Nova ficha</strong></span>${icon('chevron')}</button><button data-action="menu-create-source"><span class="create-option-icon">${icon('book')}</span><span><strong>Nova fonte</strong></span>${icon('chevron')}</button><button data-action="menu-create-theme"><span class="create-option-icon">${icon('themes')}</span><span><strong>Novo tema</strong></span>${icon('chevron')}</button><button data-action="menu-create-word"><span class="create-option-icon">${icon('type')}</span><span><strong>Nova palavra</strong></span>${icon('chevron')}</button></div></details>${link('obras', 'book', 'Fontes')}${link('temas', 'themes', 'Temas')}${link('palavras', 'type', 'Palavras')}</nav></div>`;
}
function workRow(book) {
  return `<button class="work-row" data-action="book" data-id="${book.id}"><span class="work-cover" style="--book-color:${book.color}">${icon('book-open')}</span><span class="work-info"><span class="work-title">${esc(book.title)}</span><span class="work-author">${esc(book.author)}</span><span class="work-count">${countLabel(countFor(book.id), 'ficha', 'fichas')}</span></span>${icon('arrow')}</button>`;
}
function reflectionCard(r) {
  const b = bookFor(r.bookId);
  const parsedDate = new Date(r.date + 'T12:00:00Z');
  const date = /^\d{4}-\d{2}-\d{2}$/.test(r.date || '') && Number.isFinite(parsedDate.getTime()) ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(parsedDate) : '';
  return `<button class="reflection-card" data-action="reflection" data-id="${esc(r.id)}" aria-label="Ler reflexão sobre ${esc(b.title)}"><span class="reflection-meta"><span class="reflection-bookmark">${icon('book-open')}</span><span class="reflection-attribution"><span class="reflection-source">${esc(b.title)}</span><span class="reflection-author">${esc(b.author)}${r.reference ? ` · ${esc(r.reference)}` : ''}</span></span>${date ? `<time class="reflection-date" datetime="${esc(r.date)}">${esc(date)}</time>` : ''}</span>${r.title ? `<span class="reflection-entry-title">${esc(r.title)}</span>` : ''}${r.quote ? `<span class="reflection-quote">“${esc(r.quote)}”</span>` : ''}<span class="reflection-text">${formatText(r.text)}</span><span class="reflection-footer"><span class="reflection-tags">${r.tags.map(tag => `<span>${esc(tagName(tag))}</span>`).join('')}</span><span class="reflection-open" aria-hidden="true">${icon('arrow')}</span></span></button>`;
}
function emptyHTML(title, description) { return `<div class="empty-state">${icon('search')}<h3>${esc(title)}</h3><p>${esc(description)}</p></div>`; }
function dashboardHTML() {
  const recent = [...state.reflections].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const filtered = state.activeTheme ? recent.filter(r => r.tags.includes(state.activeTheme)) : recent.slice(0, 2);
  return `<div class="dashboard-grid"><section class="module recent-reflections"><div class="section-heading"><h2>${state.activeTheme ? 'Reflexões por tema' : 'Últimas reflexões'}</h2><a class="view-all" href="#fichas">Ver todas ${icon('arrow')}</a></div>${state.activeTheme ? `<div class="filter-note">${icon('tag')}${esc(state.activeTheme)}<button class="text-button" data-action="clear-filter">Limpar filtro</button></div>` : ''}<div class="reflection-list">${filtered.length ? filtered.map(reflectionCard).join('') : emptyHTML(state.activeTheme ? 'Uma conexão por fazer' : 'Sua primeira reflexão', state.activeTheme ? 'Crie uma reflexão e associe este tema.' : 'Cadastre uma fonte e crie uma ficha para registrar o que a leitura deixou.')}</div></section><section class="module recent-sources"><div class="section-heading"><h2>Fontes recentes</h2><button class="view-all" data-action="all-books">Ver todas ${icon('arrow')}</button></div><div class="work-list">${state.books.length ? state.books.slice(0, 2).map(workRow).join('') : emptyHTML('Sua primeira fonte', 'Cadastre uma fonte em Fontes para começar suas fichas de leitura.')}</div></section></div>`;
}
function searchHTML() {
  const q = normalize(state.query);
  const matchingBooks = state.books.filter((b) => normalize(b.title + ' ' + b.author).includes(q));
  const matchingReflections = state.reflections.filter((r) => normalize([r.title || '', r.reference || '', r.quote || '', r.text, r.tags.join(' '), bookFor(r.bookId).title, bookFor(r.bookId).author].join(' ')).includes(q));
  if (!matchingBooks.length && !matchingReflections.length) return emptyHTML('Nenhum resultado por aqui', `Experimente outro pensamento, título, autor ou tema.`);
  return `<div class="search-results">${matchingBooks.length ? `<section><div class="section-heading"><h2>Fontes encontradas</h2><span class="eyebrow">${matchingBooks.length} obras</span></div><div class="books-grid">${matchingBooks.map(bookTile).join('')}</div></section>` : ''}${matchingReflections.length ? `<section><div class="section-heading"><h2>Reflexões encontradas</h2><span class="eyebrow">${matchingReflections.length} fichas</span></div><div class="reflection-list">${matchingReflections.map(reflectionCard).join('')}</div></section>` : ''}</div>`;
}
function homeHTML() {
  return `<div class="action-row"><div class="search-wrap">${icon('search')}<input id="search" type="search" placeholder="Buscar…" value="${esc(state.query)}" aria-label="Buscar no Bloom" autocomplete="off"><button class="clear-search" data-action="clear-search" aria-label="Limpar busca" ${state.query ? '' : 'hidden'}>${icon('x')}</button></div><button class="primary-button create-button" data-action="create">${icon('plus')} Nova ficha</button></div><div id="home-results" aria-live="polite">${state.query.trim() ? searchHTML() : dashboardHTML()}</div>`;
}
function matchingEntries() {
  const q = normalize(state.entryQuery.trim());
  const entries = state.reflections.filter(r => { const b = bookFor(r.bookId); return normalize([r.title || '', r.reference || '', r.identifier || '', r.quote || '', r.text, ...r.tags, b.title, b.author].join(' ')).includes(q); });
  return entries.sort((a, b) => state.entrySort === 'fonte' ? bookFor(a.bookId).title.localeCompare(bookFor(b.bookId).title, 'pt-BR') : state.entrySort === 'antigas' ? (a.date || '').localeCompare(b.date || '') : (b.date || '').localeCompare(a.date || ''));
}
function entryResultsHTML() {
  const entries = matchingEntries();
  return entries.length ? `<div class="reflection-list">${entries.map(reflectionCard).join('')}</div>` : emptyHTML(state.reflections.length ? 'Nenhuma ficha encontrada' : 'Crie sua primeira ficha', state.reflections.length ? 'Busque por um título, trecho, autor ou tema.' : 'Crie sua primeira ficha para registrar uma reflexão.');
}
function entriesHTML() {
  const search = searchFieldHTML({
    id: 'entry-search', placeholder: 'Buscar fichas…', label: 'Buscar fichas',
    value: state.entryQuery, clearAction: 'clear-entry-search', clearLabel: 'Limpar busca de fichas',
  });
  const controls = listControlsHTML({
    count: matchingEntries().length, countId: 'entries-count', singular: 'ficha', plural: 'fichas',
    createAction: 'create', createLabel: 'Nova Ficha',
    sort: { id: 'entry-sort', label: 'Ordenar fichas', value: state.entrySort,
      options: [['recentes', 'Recentes'], ['antigas', 'Antigas'], ['fonte', 'Fonte A–Z']] },
  });
  return `${search}${controls}<div id="entries-results" aria-live="polite">${entryResultsHTML()}</div>`;
}
function refreshEntries() {
  document.querySelector('#entries-results').innerHTML = entryResultsHTML();
  const count = matchingEntries().length;
  document.querySelector('#entries-count').textContent = countLabel(count, 'ficha', 'fichas');
  document.querySelector('[data-action="clear-entry-search"]').hidden = !state.entryQuery;
}
function bookTile(book) { return `<button class="book-tile" data-action="book" data-id="${book.id}"><span class="book-spine" style="--book-color:${book.color}">${icon('book-open')}</span><span><h2>${esc(book.title)}</h2><span class="work-author">${esc(book.author)}</span><span class="book-count">${countFor(book.id)} ${countFor(book.id) === 1 ? 'ficha' : 'fichas'} no Bloom</span></span></button>`; }
function sourceRow(book) {
  const entries = state.reflections.filter(r => r.bookId === book.id);
  const themes = new Set(entries.flatMap(r => r.tags)).size;
  return `<button class="source-row" data-action="book" data-id="${book.id}" aria-label="Abrir fonte: ${esc(book.title)}"><span class="source-icon">${icon('book-open')}</span><span class="source-info"><span class="source-title">${esc(book.title)}</span><span class="source-meta"><span class="source-author">${esc(book.author)}</span><span class="source-stats"><span class="meta-dot">·</span> ${entries.length} ${entries.length === 1 ? 'ficha' : 'fichas'} <span class="meta-dot">·</span> ${themes} ${themes === 1 ? 'tema' : 'temas'}</span></span></span>${icon('arrow')}</button>`;
}
function matchingSources() {
  const q = normalize(state.sourceQuery.trim());
  const result = state.books.filter(b => normalize(b.title + ' ' + b.author).includes(q));
  return result.sort((a, b) => state.sourceSort === 'titulo' ? a.title.localeCompare(b.title, 'pt-BR') : state.sourceSort === 'autor' ? a.author.localeCompare(b.author, 'pt-BR') || a.title.localeCompare(b.title, 'pt-BR') : state.sourceSort === 'fichas' ? countFor(b.id) - countFor(a.id) : (b.addedAt || 0) - (a.addedAt || 0));
}
function sourceResultsHTML() {
  const matches = matchingSources();
  return matches.length ? `<div class="source-list">${matches.map(sourceRow).join('')}</div>` : emptyHTML('Nenhuma fonte encontrada', 'Busque por outro título ou autor.');
}
function booksHTML() {
  const search = searchFieldHTML({
    id: 'source-search', placeholder: 'Buscar por título da obra ou autor...', label: 'Buscar fontes por título ou autor',
    value: state.sourceQuery, clearAction: 'clear-source-search', clearLabel: 'Limpar busca de fontes',
  });
  const controls = listControlsHTML({
    count: matchingSources().length, countId: 'sources-count', singular: 'obra', plural: 'obras',
    createAction: 'new-source', createLabel: 'Nova Fonte',
    sort: { id: 'source-sort', label: 'Ordenar fontes', value: state.sourceSort,
      options: [['recentes', 'Recentes'], ['titulo', 'Título A–Z'], ['autor', 'Autor A–Z'], ['fichas', 'Mais fichas']] },
  });
  return `${search}${controls}<div id="sources-results" aria-live="polite">${sourceResultsHTML()}</div>`;
}
function refreshSources() {
  document.querySelector('#sources-results').innerHTML = sourceResultsHTML();
  const count = matchingSources().length;
  document.querySelector('#sources-count').textContent = countLabel(count, 'obra', 'obras');
  document.querySelector('.sources-search .clear-search').hidden = !state.sourceQuery;
}
function openNewSource() {
  state.newSourceReturn = state.route === 'nova-fonte' ? 'obras' : location.hash.slice(1) || 'obras';
  state.newSourceDraft = blankSource();
  go('nova-fonte');
}
function newSourceHTML() {
  return `<form id="source-form" class="new-source-form" novalidate><section class="field"><div class="new-source-label"><label for="source-title">Título da obra <span>*</span></label></div><div class="new-source-input">${icon('book-open')}<input id="source-title" name="title" placeholder="ex: Memórias Póstumas de Brás Cubas" value="${esc(state.newSourceDraft.title)}" maxlength="200" required aria-describedby="source-error"></div></section><section class="field"><div class="new-source-label"><label for="source-author">Autor(a) <span>*</span></label></div><div class="new-source-input">${icon('user')}<input id="source-author" name="author" placeholder="ex: Machado de Assis" value="${esc(state.newSourceDraft.author)}" maxlength="120" required aria-describedby="source-error"></div><div class="frequent-authors" role="group" aria-label="Autores frequentes"><span>Frequentes:</span>${[['Machado de Assis', 'Machado de Assis'], ['Dostoiévski', 'Fiódor Dostoiévski'], ['Tolstói', 'Liev Tolstói']].map(([label, author]) => `<button type="button" data-action="suggest-source-author" data-author="${esc(author)}" aria-pressed="${normalize(state.newSourceDraft.author) === normalize(author)}"><span aria-hidden="true"></span>${esc(label)}</button>`).join('')}</div></section><section class="field"><div class="new-source-label"><label for="source-bibliography">Detalhes</label><span>Opcional</span></div><div class="new-source-input new-source-details">${icon('book')}<textarea id="source-bibliography" name="bibliography" placeholder="ex: 1881, Ed. 34, Trad. Rubens Figueiredo" maxlength="1000">${esc(state.newSourceDraft.bibliography)}</textarea></div></section><label class="source-immediate"><span class="source-immediate-icon">${icon('book')}</span><span class="source-immediate-copy"><span class="source-immediate-title" id="source-immediate-title">Criar ficha ao salvar</span></span><input id="source-immediate" name="immediate" type="checkbox" role="switch" ${state.newSourceDraft.immediate ? 'checked' : ''} aria-labelledby="source-immediate-title"><span class="source-switch" aria-hidden="true"></span></label><p class="field-error" id="source-error" role="alert"></p><button class="primary-button new-source-save" type="submit">${icon('check')} Salvar Fonte</button></form>`;
}
function themesHTML() {
  const search = searchFieldHTML({
    id: 'theme-search', placeholder: 'Buscar temas…', label: 'Buscar por tema ou conceito',
    value: state.themeQuery, clearAction: 'clear-theme-search', clearLabel: 'Limpar busca de temas',
    className: 'sources-search themes-search search-wrap',
  });
  const controls = listControlsHTML({
    count: matchingThemes().length, countId: 'themes-count', singular: 'tema', plural: 'temas',
    createAction: 'new-theme', createLabel: 'Novo Tema', className: 'sources-controls themes-controls',
    sort: { id: 'theme-sort', label: 'Ordenar temas', value: state.themeSort,
      options: [['fichas', 'Mais fichas'], ['obras', 'Mais obras'], ['nome', 'Nome A–Z'], ['recentes', 'Recentes']] },
  });
  return `${search}${controls}<div id="themes-results" aria-live="polite">${themeResultsHTML()}</div>`;
}
function matchingThemes() {
  const q = normalize(state.themeQuery.trim());
  return themeCatalog().map(t => { const entries = recordsForTheme(t.name); return { ...t, fichas: entries.length, obras: new Set(entries.map(r => r.bookId)).size }; }).filter(t => normalize(t.name + ' ' + themeDescription(t)).includes(q)).sort((a, b) => state.themeSort === 'nome' ? a.name.localeCompare(b.name, 'pt-BR') : state.themeSort === 'obras' ? b.obras - a.obras : state.themeSort === 'recentes' ? (b.addedAt || 0) - (a.addedAt || 0) : b.fichas - a.fichas);
}
function themeResultsHTML() {
  const matches = matchingThemes();
  return matches.length ? `<div class="theme-list">${matches.map((t, i) => `<button class="theme-card" data-action="theme-details" data-tag="${esc(t.name)}" aria-label="Abrir tema: ${esc(t.name)}"><span class="theme-card-heading"><span class="theme-dot"></span><span class="theme-card-title">${esc(t.name)}</span>${icon('arrow')}</span>${t.description ? `<span class="theme-card-description">${esc(t.description)}</span>` : ''}<span class="theme-card-footer"><span class="theme-card-count">${icon('write')} ${t.fichas} ${t.fichas === 1 ? 'ficha' : 'fichas'}</span><span class="theme-card-books">${icon('book-open')} ${t.obras} ${t.obras === 1 ? 'obra' : 'obras'}</span></span></button>`).join('')}</div>` : emptyHTML('Nenhum tema encontrado', 'Experimente outro tema ou conceito.');
}
function refreshThemes() {
  document.querySelector('#themes-results').innerHTML = themeResultsHTML();
  const count = matchingThemes().length;
  document.querySelector('#themes-count').textContent = countLabel(count, 'tema', 'temas');
  document.querySelector('.themes-search .clear-search').hidden = !state.themeQuery;
}
function openTheme(name) {
  const theme = themeCatalog().find(t => normalize(t.name) === normalize(name));
  if (!theme) return;
  go('tema/' + encodeURIComponent(theme.name));
}
function themeDetailHTML() {
  const theme = themeCatalog().find(t => t.name === state.selectedTheme);
  const entries = recordsForTheme(theme.name);
  const sources = state.books.filter(b => entries.some(r => r.bookId === b.id));
  return `<div class="theme-detail"><button class="theme-back text-button" data-action="theme-back">${icon('back')} Todos os temas</button><div class="theme-title-row"><h2>${esc(theme.name)}</h2><button class="icon-button" data-action="edit-theme" aria-label="Editar tema">${icon('pencil')}</button></div>${theme.description ? `<p class="theme-definition">“${esc(theme.description)}”</p>` : ''}<button class="primary-button theme-add-reflection" data-action="theme-create">${icon('plus')} Adicionar reflexão</button><section class="theme-sources"><h3>${icon('book-open')} Fontes</h3><div class="theme-source-list">${sources.length ? sources.map(b => { const count = entries.filter(r => r.bookId === b.id).length; return `<button class="theme-source-row" data-action="theme-source" data-id="${b.id}" aria-label="Ver ${count} fichas de ${esc(b.title)} neste tema">${icon('book')}<span class="work-info"><span class="work-title">${esc(b.title)}</span><span class="work-author">${esc(b.author)}</span></span><span class="theme-source-count">${count} ${count === 1 ? 'ficha' : 'fichas'}</span>${icon('chevron')}</button>`; }).join('') : emptyHTML('Uma conexão por fazer', 'Adicione uma reflexão com este tema para reunir suas fontes aqui.')}</div></section></div>`;
}
function openSheet(title, subtitle, body, footer = '', className = '') {
  showDialog(`<div class="sheet-handle" aria-hidden="true"></div><header class="sheet-header"><div><h2 id="modal-title">${esc(title)}</h2>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div><button class="sheet-close" data-action="close-modal" aria-label="Fechar">${icon('x')}</button></header>${body}${footer}`, 'sheet ' + className);
}
function themeEntryCard(r, index) {
  return `<article class="theme-entry-card" data-entry="${esc(r.id)}"><div class="theme-entry-reference"><span>${icon('book')} ${esc(r.reference || 'Referência não informada')}</span><span class="entry-number">Ficha #${String(index + 1).padStart(2, '0')}</span></div>${r.title ? `<h3 class="theme-entry-title">${esc(r.title)}</h3>` : ''}${r.quote ? `<blockquote class="theme-entry-quote">«${esc(r.quote)}»</blockquote>` : ''}<div class="reader-reflection"><h3>${icon('write')} Reflexão</h3><p>${formatText(r.text)}</p></div><div class="theme-entry-footer"><div class="chip-list">${r.tags.map(tag => `<button class="chip ${normalize(tag) === normalize(state.selectedTheme) ? 'active' : ''}" data-action="open-theme" data-tag="${esc(tag)}">${esc(tagName(tag))}</button>`).join('')}</div><details class="entry-actions"><summary aria-label="Ações da ficha ${index + 1}">${icon('more')}</summary><div><button data-action="theme-edit-entry" data-id="${esc(r.id)}">${icon('pencil')} Editar ficha</button><button data-action="reflection" data-id="${esc(r.id)}">${icon('book-open')} Ver ficha</button></div></details></div></article>`;
}
function openThemeSource(id) {
  const b = bookFor(id);
  if (!b || !state.selectedTheme) return;
  const entries = recordsForTheme(state.selectedTheme).filter(r => r.bookId === id);
  openSheet(b.title, b.author, `<div class="sheet-theme-context"><span>${icon('tag')} Tema: <strong>${esc(state.selectedTheme)}</strong></span><button class="text-button" data-action="book" data-id="${id}">Ver obra completa ${icon('arrow')}</button></div><p class="sheet-count">${icon('book-open')} <strong>${entries.length} ${entries.length === 1 ? 'ficha' : 'fichas'}</strong> com este tema</p><div class="sheet-scroll"><div class="theme-entry-list">${entries.length ? entries.map(themeEntryCard).join('') : emptyHTML('Nenhuma ficha neste tema', 'Crie uma ficha nesta obra para fazer esta conexão.')}</div></div>`, `<footer class="sheet-footer"><button class="primary-button" data-action="theme-create" data-book="${id}">${icon('plus')} Nova Ficha nesta Obra</button><button class="sheet-dismiss" data-action="close-modal">Fechar visualização</button></footer>`, 'source-sheet');
}
function openThemeEdit() {
  const theme = themeCatalog().find(t => t.name === state.selectedTheme);
  if (!theme) return;
  openSheet('Editar Tema', theme.name, `<form id="theme-edit-form" class="sheet-scroll theme-edit-form" novalidate><div class="field"><div class="theme-field-label"><label for="edit-theme-name">Nome do tema <span>(Obrigatório)</span></label><output id="theme-name-count" for="edit-theme-name">${theme.name.length}/40</output></div><input id="edit-theme-name" name="name" value="${esc(theme.name)}" maxlength="40" required aria-describedby="theme-edit-error"></div><div class="field"><div class="theme-field-label"><label for="edit-theme-description">Descrição <span class="optional-label">(Opcional)</span></label><output id="theme-description-count" for="edit-theme-description">${theme.description.length}/280</output></div><textarea id="edit-theme-description" name="description" maxlength="280">${esc(theme.description)}</textarea></div><p class="field-error" id="theme-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer edit-theme-footer"><button class="primary-button" type="submit" form="theme-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="delete-theme">${icon('trash')} Excluir tema</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'edit-theme-sheet');
}
function persistThemeChange(oldName, replacement) {
  const updateTags = tags => [...new Set(tags.flatMap(tag => normalize(tag) === normalize(oldName) ? (replacement ? [replacement] : []) : [tag]))];
  state.reflections = state.reflections.map(r => ({ ...r, tags: updateTags(r.tags) }));
  if (state.editor) { state.editor.tags = updateTags(state.editor.tags); if (state.editor.context?.theme === oldName) state.editor.context.theme = replacement; }
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft && Array.isArray(draft.tags)) { draft.tags = updateTags(draft.tags); if (draft.context?.theme === oldName) draft.context.theme = replacement; storage.set('arquivo-entry-draft-v2', draft); }
  if (state.activeTheme === oldName) state.activeTheme = replacement || '';
  if (state.sourceTheme === oldName) state.sourceTheme = replacement || '';
  const themesSaved = storage.set('arquivo-themes-v1', state.customThemes);
  const entriesSaved = storage.set('arquivo-reflections-v1', state.reflections);
  return themesSaved && entriesSaved;
}
function confirmThemeDelete() {
  openSheet('Excluir tema?', state.selectedTheme, `<div class="sheet-scroll delete-theme-description"><p>O tema será removido das fichas associadas. Suas fontes e reflexões continuarão no Bloom.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="confirm-delete-theme">${icon('trash')} Excluir tema</button><button class="sheet-dismiss" data-action="edit-theme">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function deleteSelectedTheme() {
  const theme = themeCatalog().find(t => t.name === state.selectedTheme);
  if (!theme) return;
  state.customThemes = state.customThemes.filter(t => normalize(t.name) !== normalize(theme.name));
  if (theme.originalName) state.deletedThemes = [...new Set([...state.deletedThemes, normalize(theme.originalName)])];
  const deletedSaved = storage.set('arquivo-deleted-themes-v1', state.deletedThemes);
  const persisted = persistThemeChange(theme.name, '');
  state.themeQuery = ''; go('temas');
  toast(persisted && deletedSaved ? 'Tema excluído. Suas fichas foram preservadas.' : 'Tema excluído nesta sessão.');
}
function matchingWords() {
  const q = normalize(state.vocabularyQuery.trim());
  return state.vocabulary.filter(w => normalize([w.word, w.synonyms, w.description].join(' ')).includes(q)).sort((a, b) => state.vocabularySort === 'nome' ? a.word.localeCompare(b.word, 'pt-BR') : (b.updatedAt || b.addedAt || 0) - (a.updatedAt || a.addedAt || 0));
}
function vocabularyResultsHTML() {
  const matches = matchingWords();
  if (matches.length) {
    return `<div class="theme-list">${matches.map(w => `<button class="theme-card" data-action="word-details" data-id="${esc(w.id)}" aria-label="Abrir palavra: ${esc(w.word)}"><span class="theme-card-heading"><span class="theme-dot"></span><span class="theme-card-title">${esc(w.word)}</span>${icon('arrow')}</span>${w.description ? `<span class="theme-card-description">${esc(w.description)}</span>` : ''}${synonymsLineHTML(w.synonyms)}</button>`).join('')}</div>`;
  }
  if (state.vocabulary.length) return emptyHTML('Nenhuma palavra encontrada', 'Experimente outro termo, sinônimo ou definição.');
  return `<div class="empty-state">${icon('type')}<h3>Seu vocabulário começa aqui</h3><p>Registre palavras aprendidas com definição e sinônimos opcionais.</p><button class="primary-button empty-cta" data-action="new-word">${icon('plus')} Nova palavra</button></div>`;
}
function wordsHTML() {
  const search = searchFieldHTML({
    id: 'vocabulary-search', placeholder: 'Buscar palavras…', label: 'Buscar por palavra, sinônimo ou definição',
    value: state.vocabularyQuery, clearAction: 'clear-vocabulary-search', clearLabel: 'Limpar busca de palavras',
    className: 'sources-search vocabulary-search search-wrap',
  });
  const controls = listControlsHTML({
    count: matchingWords().length, countId: 'vocabulary-count', singular: 'palavra', plural: 'palavras',
    createAction: 'new-word', createLabel: 'Nova Palavra', className: 'sources-controls vocabulary-controls',
    sort: { id: 'vocabulary-sort', label: 'Ordenar palavras', value: state.vocabularySort,
      options: [['recentes', 'Recentes'], ['nome', 'Nome A–Z']] },
  });
  return `${search}${controls}<div id="vocabulary-results" aria-live="polite">${vocabularyResultsHTML()}</div>`;
}
function refreshWords() {
  const results = document.querySelector('#vocabulary-results');
  if (!results) return;
  results.innerHTML = vocabularyResultsHTML();
  document.querySelector('#vocabulary-count').textContent = countLabel(matchingWords().length, 'palavra', 'palavras');
  document.querySelector('.vocabulary-search .clear-search').hidden = !state.vocabularyQuery;
}
function openWord(id) {
  const word = wordFor(id);
  if (!word) return;
  go('palavra/' + encodeURIComponent(word.id));
}
function wordDetailHTML() {
  const word = wordFor(state.selectedWord);
  if (!word) return '';
  const synonyms = parseSynonyms(word.synonyms);
  return `<div class="theme-detail word-detail"><button class="theme-back text-button" data-action="word-back">${icon('back')} Todas as palavras</button><div class="theme-title-row"><h2>${esc(word.word)}</h2><button class="icon-button" data-action="edit-word" aria-label="Editar palavra">${icon('pencil')}</button></div>${synonyms.length ? `<section class="word-synonyms-block"><h3>${icon('link')} Sinônimos</h3><div class="chip-list">${synonyms.map(item => `<span class="chip">${esc(item)}</span>`).join('')}</div></section>` : ''}${word.description ? `<p class="theme-definition word-definition">“${esc(word.description)}”</p>` : (!synonyms.length ? emptyHTML('Detalhes opcionais', 'Adicione uma definição ou sinônimos quando quiser enriquecer esta entrada.') : '')}</div>`;
}
function openWordEdit() {
  const word = wordFor(state.selectedWord);
  if (!word) return;
  openSheet('Editar palavra', word.word, `<form id="vocabulary-edit-form" class="sheet-scroll theme-edit-form" novalidate><div class="field"><div class="theme-field-label"><label for="edit-vocabulary-word">Palavra <span>(Obrigatório)</span></label><output id="vocabulary-word-count" for="edit-vocabulary-word">${word.word.length}/80</output></div><input id="edit-vocabulary-word" name="word" value="${esc(word.word)}" maxlength="80" required aria-describedby="vocabulary-edit-error"></div><div class="field"><div class="theme-field-label"><label for="edit-vocabulary-synonyms">Sinônimos <span class="optional-label">(Opcional)</span></label><output id="vocabulary-synonyms-count" for="edit-vocabulary-synonyms">${word.synonyms.length}/280</output></div><textarea id="edit-vocabulary-synonyms" name="synonyms" placeholder="Separe por vírgula ou linha" maxlength="280">${esc(word.synonyms)}</textarea></div><div class="field"><div class="theme-field-label"><label for="edit-vocabulary-description">Definição <span class="optional-label">(Opcional)</span></label><output id="vocabulary-description-count" for="edit-vocabulary-description">${word.description.length}/500</output></div><textarea id="edit-vocabulary-description" name="description" maxlength="500">${esc(word.description)}</textarea></div><p class="field-error" id="vocabulary-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer edit-theme-footer"><button class="primary-button" type="submit" form="vocabulary-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="delete-word">${icon('trash')} Excluir palavra</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'edit-word-sheet');
}
function confirmWordDelete() {
  const word = wordFor(state.selectedWord);
  if (!word) return;
  openSheet('Excluir palavra?', word.word, `<div class="sheet-scroll delete-theme-description"><p>A palavra será removida do seu vocabulário. Esta ação não afeta fichas, fontes ou temas.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="confirm-delete-word">${icon('trash')} Excluir palavra</button><button class="sheet-dismiss" data-action="edit-word">Cancelar</button></footer>`, 'delete-word-sheet');
}
function deleteSelectedWord() {
  const id = state.selectedWord;
  if (!wordFor(id)) return;
  state.vocabulary = state.vocabulary.filter(w => w.id !== id);
  const persisted = persistVocabulary();
  state.vocabularyQuery = '';
  go('palavras');
  toast(persisted ? 'Palavra excluída do vocabulário.' : 'Palavra excluída nesta sessão.');
}
function openNewWord() {
  state.newWordReturn = state.route === 'nova-palavra' ? 'palavras' : location.hash.slice(1) || 'palavras';
  state.newWordDraft = { word: '', synonyms: '', description: '' };
  go('nova-palavra');
}
function newWordHTML() {
  return `<form class="new-theme-form" id="vocabulary-form" novalidate><section class="new-theme-field"><div class="new-theme-label"><label for="vocabulary-word">Palavra <span aria-hidden="true">◆</span><span class="sr-only"> (obrigatório)</span></label><output id="new-vocabulary-word-count" for="vocabulary-word">${state.newWordDraft.word.length}/80</output></div><input id="vocabulary-word" name="word" placeholder="Ex.: melancolia" maxlength="80" value="${esc(state.newWordDraft.word)}" required aria-describedby="vocabulary-error"></section><section class="new-theme-field"><div class="new-theme-label"><label for="vocabulary-synonyms">Sinônimos</label><output id="new-vocabulary-synonyms-count" for="vocabulary-synonyms">${state.newWordDraft.synonyms.length}/280</output></div><textarea id="vocabulary-synonyms" name="synonyms" placeholder="Opcional — ex.: tristeza, nostalgia" maxlength="280">${esc(state.newWordDraft.synonyms)}</textarea><p class="new-theme-help">Separe sinônimos por vírgula ou quebra de linha.</p></section><section class="new-theme-field"><div class="new-theme-label"><label for="vocabulary-description">Definição</label><output id="new-vocabulary-description-count" for="vocabulary-description">${state.newWordDraft.description.length}/500</output></div><textarea id="vocabulary-description" name="description" placeholder="Opcional — o que esta palavra significa para você" maxlength="500">${esc(state.newWordDraft.description)}</textarea></section><p class="field-error" id="vocabulary-error" role="alert"></p><button type="submit" class="primary-button new-theme-save">${icon('check')} Salvar palavra</button></form>`;
}
function createWord(form) {
  const word = form.elements.word.value.trim().replace(/\s+/g, ' ');
  const synonyms = form.elements.synonyms.value.trim();
  const description = form.elements.description.value.trim();
  if (!word || word.length > 80) { document.querySelector('#vocabulary-error').textContent = !word ? 'Informe a palavra.' : 'Use até 80 caracteres para a palavra.'; form.elements.word.setAttribute('aria-invalid', 'true'); form.elements.word.focus(); return; }
  if (state.vocabulary.some(entry => normalize(entry.word) === normalize(word))) { document.querySelector('#vocabulary-error').textContent = 'Esta palavra já está no seu vocabulário.'; form.elements.word.setAttribute('aria-invalid', 'true'); form.elements.word.focus(); return; }
  const now = Date.now();
  state.vocabulary.unshift({ id: `word-${now}-${Math.random().toString(36).slice(2, 7)}`, word, synonyms, description, addedAt: now, updatedAt: now });
  const persisted = persistVocabulary();
  state.newWordDraft = { word: '', synonyms: '', description: '' };
  state.vocabularyQuery = '';
  go('palavras');
  toast(persisted ? 'Palavra adicionada ao vocabulário.' : 'Palavra adicionada nesta sessão. Armazenamento local indisponível.');
}
function saveWordChanges(form) {
  const current = wordFor(state.selectedWord);
  if (!current) return;
  const word = form.elements.word.value.trim().replace(/\s+/g, ' ');
  const synonyms = form.elements.synonyms.value.trim();
  const description = form.elements.description.value.trim();
  if (!word || word.length > 80) { document.querySelector('#vocabulary-edit-error').textContent = !word ? 'Informe a palavra.' : 'Use até 80 caracteres para a palavra.'; form.elements.word.setAttribute('aria-invalid', 'true'); form.elements.word.focus(); return; }
  if (state.vocabulary.some(entry => entry.id !== current.id && normalize(entry.word) === normalize(word))) { document.querySelector('#vocabulary-edit-error').textContent = 'Esta palavra já está no seu vocabulário.'; form.elements.word.setAttribute('aria-invalid', 'true'); form.elements.word.focus(); return; }
  state.vocabulary = state.vocabulary.map(entry => entry.id === current.id ? { ...entry, word, synonyms, description, updatedAt: Date.now() } : entry);
  const persisted = persistVocabulary();
  modal.close();
  go('palavra/' + encodeURIComponent(current.id));
  toast(persisted ? 'Palavra atualizada.' : 'Palavra atualizada nesta sessão.');
}
function openNewTheme() {
  state.newThemeReturn = state.route === 'novo-tema' ? 'temas' : location.hash.slice(1) || 'temas';
  state.newThemeDraft = { name: '', description: '' };
  go('novo-tema');
}
function newThemeHTML() {
  return `<form class="new-theme-form" id="theme-form" novalidate><section class="new-theme-field"><div class="new-theme-label"><label for="theme-name">Nome do tema <span aria-hidden="true">◆</span><span class="sr-only"> (obrigatório)</span></label><output id="new-theme-name-count" for="theme-name">${state.newThemeDraft.name.length}/40</output></div><input id="theme-name" name="name" placeholder="Ex.: Memória" maxlength="40" value="${esc(state.newThemeDraft.name)}" required aria-describedby="theme-error"></section><section class="new-theme-field"><div class="new-theme-label"><label for="theme-description">Descrição</label><output id="new-theme-description-count" for="theme-description">${state.newThemeDraft.description.length}/280</output></div><textarea id="theme-description" name="description" placeholder="Opcional" maxlength="280">${esc(state.newThemeDraft.description)}</textarea></section><p class="field-error" id="theme-error" role="alert"></p><button type="submit" class="primary-button new-theme-save">${icon('check')} Salvar Tema</button></form>`;
}
function archiveHTML() {
  const title = { inicio: 'Início', obras: 'Fontes', fichas: 'Fichas', temas: 'Temas', tema: 'Temas', fonte: 'Fontes', palavras: 'Palavras', palavra: 'Palavras', 'novo-tema': 'Novo Tema', 'nova-fonte': 'Nova Fonte', 'nova-palavra': 'Nova Palavra', criar: state.editor?.id ? 'Editar Ficha' : 'Nova Ficha' }[state.route];
  const catalog = ['obras', 'temas', 'fichas', 'palavras'].includes(state.route);
  const screenClass = { inicio: 'home-screen', criar: 'entry-screen', fichas: 'entries-screen', obras: 'sources-screen', temas: 'themes-screen', tema: 'theme-detail-screen', fonte: 'source-detail-screen', palavras: 'vocabulary-screen', palavra: 'word-detail-screen', 'novo-tema': 'new-theme-screen', 'nova-fonte': 'new-source-screen', 'nova-palavra': 'new-word-screen' }[state.route] || '';
  const newFormRoute = ['novo-tema', 'nova-fonte', 'nova-palavra'].includes(state.route);
  const cancelAction = { 'nova-fonte': 'cancel-new-source', 'nova-palavra': 'cancel-new-word', 'novo-tema': 'cancel-new-theme' }[state.route];
  const createLabel = { 'nova-fonte': 'fonte', 'nova-palavra': 'palavra', 'novo-tema': 'tema' }[state.route];
  const heading = newFormRoute ? `<div class="new-theme-heading"><button class="icon-button" data-action="${cancelAction}" aria-label="Fechar criação de ${createLabel}">${icon('x')}</button><h1>${title}</h1></div>` : `<h1>${title}</h1>`;
  const content = { criar: editorHTML, fichas: entriesHTML, obras: booksHTML, temas: themesHTML, tema: themeDetailHTML, fonte: sourceDetailHTML, palavras: wordsHTML, palavra: wordDetailHTML, 'novo-tema': newThemeHTML, 'nova-fonte': newSourceHTML, 'nova-palavra': newWordHTML }[state.route] || homeHTML;
  const header = catalog || ['inicio', 'tema', 'fonte', 'palavra'].includes(state.route) ? `<h1 class="sr-only">${title}</h1>` : `<header class="archive-header">${heading}</header>`;
  return `<section class="screen archive-screen ${screenClass}"><div class="archive-body">${header}<div class="archive-content">${content()}</div></div>${navHTML()}</section>`;
}
function updateResend() {
  const button = document.querySelector('#resend');
  if (!button) return;
  const remaining = Math.max(0, Math.ceil((state.resendUntil - Date.now()) / 1000));
  button.disabled = remaining > 0;
  button.textContent = remaining ? `Reenviar em (0:${String(remaining).padStart(2, '0')})` : 'Reenviar código';
}
function startCountdown() {
  state.resendUntil = Date.now() + 40000;
  updateResend();
}
function render() {
  clearTimeout(state.authTimer);
  clearInterval(state.resendTimer);
  if (modal.open) modal.close();
  const defaultRoute = AUTH_ENABLED ? 'login' : 'inicio';
  const next = location.hash.slice(1) || defaultRoute;
  state.route = ['login', 'codigo', 'inicio', 'fichas', 'obras', 'temas', 'palavras', 'criar', 'novo-tema', 'nova-fonte', 'nova-palavra'].includes(next) ? next : defaultRoute;
  if (!AUTH_ENABLED && ['login', 'codigo'].includes(state.route)) state.route = 'inicio';
  if (state.route !== next && !next.includes('/')) history.replaceState(null, '', '#' + state.route);
  if (next.startsWith('palavra/')) {
    let id = '';
    try { id = decodeURIComponent(next.slice(8)); } catch { /* Invalid link falls back to vocabulary list. */ }
    const word = wordFor(id);
    state.route = word ? 'palavra' : 'palavras';
    state.selectedWord = word?.id || '';
  }
  if (next.startsWith('tema/')) {
    let name = '';
    try { name = decodeURIComponent(next.slice(5)); } catch { /* Invalid link falls back to themes. */ }
    const theme = themeCatalog().find(t => normalize(t.name) === normalize(name));
    state.route = theme ? 'tema' : 'temas';
    state.selectedTheme = theme?.name || '';
  }
  if (next.startsWith('fonte/')) {
    let id = '';
    try { id = decodeURIComponent(next.slice(6)); } catch { /* Invalid link falls back to sources. */ }
    if (id !== state.selectedSource) { state.sourceTheme = ''; state.sourceEntryQuery = ''; state.sourceEntrySort = 'recentes'; state.sourceSearchOpen = false; }
    const source = bookFor(id);
    state.route = source ? 'fonte' : 'obras';
    state.selectedSource = source?.id || '';
    if (state.sourceTheme && !sourceThemes().some(tag => normalize(tag) === normalize(state.sourceTheme))) state.sourceTheme = '';
  }
  if (state.route === 'criar' && !state.editor) {
    const draft = storage.get('arquivo-entry-draft-v2', null);
    state.editor = draft && typeof draft.text === 'string' && Array.isArray(draft.tags) && draft.tags.every(t => typeof t === 'string') ? { ...blankEntry(), ...draft } : blankEntry();
    if (state.editor.context?.theme) state.editorReturn = 'tema/' + encodeURIComponent(state.editor.context.theme);
    if (state.editor.context?.sourceId) state.editorReturn = 'fonte/' + encodeURIComponent(state.editor.context.sourceId);
  }
  document.body.dataset.view = ['login', 'codigo'].includes(state.route) ? 'auth' : 'archive';
  document.querySelector('.brand').href = document.body.dataset.view === 'archive' ? '#inicio' : '#login';
  document.querySelector('.brand').setAttribute('aria-label', 'Bloom');
  document.querySelector('.local-data-button').hidden = AUTH_ENABLED;
  document.querySelector('.preview-link').hidden = !AUTH_ENABLED;
  app.innerHTML = state.route === 'login' ? loginHTML() : state.route === 'codigo' ? codeHTML() : archiveHTML();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (state.route === 'codigo') {
    if (!state.resendUntil) startCountdown();
    updateResend();
    state.resendTimer = setInterval(updateResend, 1000);
    document.querySelector('.otp-digit').focus({ preventScroll: true });
  } else if (state.route === 'login') {
    updateLoginState();
  } else app.focus({ preventScroll: true });
  document.title = `${{ login: 'Acesse Bloom', codigo: 'Código de Acesso', inicio: 'Início', obras: 'Fontes', fichas: 'Fichas', temas: 'Temas', palavras: 'Palavras', palavra: wordFor(state.selectedWord)?.word, tema: state.selectedTheme, fonte: bookFor(state.selectedSource)?.title, 'novo-tema': 'Novo Tema', 'nova-fonte': 'Nova Fonte', 'nova-palavra': 'Nova Palavra', criar: state.editor?.id ? 'Editar Ficha' : 'Nova Ficha' }[state.route]} · Bloom`;
  if (state.route === 'tema' && state.pendingSourceSheet?.theme === state.selectedTheme) { const { bookId } = state.pendingSourceSheet; state.pendingSourceSheet = null; openThemeSource(bookId); }
}
function refreshHome() {
  const results = document.querySelector('#home-results');
  if (results) results.innerHTML = state.query.trim() ? searchHTML() : dashboardHTML();
  const clear = document.querySelector('.clear-search');
  if (clear) clear.hidden = !state.query;
}
function openModal(title, body, eyebrow = '') {
  showDialog(`<header class="modal-header"><div>${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h2 id="modal-title">${esc(title)}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Fechar">${icon('x')}</button></header>${body}`);
}
function openBook(id) {
  if (!bookFor(id)) return;
  state.sourceTheme = ''; state.sourceEntryQuery = ''; state.sourceEntrySort = 'recentes'; state.sourceSearchOpen = false;
  go('fonte/' + encodeURIComponent(id));
}
function sourceEntries() {
  return state.reflections.filter(r => r.bookId === state.selectedSource).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
function sourceThemes() {
  const seen = new Set();
  return sourceEntries().flatMap(r => r.tags).filter(tag => { const key = normalize(tag); if (seen.has(key)) return false; seen.add(key); return true; });
}
function matchingSourceEntries() {
  const q = normalize(state.sourceEntryQuery.trim());
  const entries = sourceEntries().filter(r => (!state.sourceTheme || r.tags.some(tag => normalize(tag) === normalize(state.sourceTheme))) && (!q || normalize([r.title || '', r.reference || '', r.quote || '', r.text, ...r.tags].join(' ')).includes(q)));
  if (state.sourceEntrySort === 'antigas') entries.reverse();
  if (state.sourceEntrySort === 'referencia') entries.sort((a, b) => (a.reference || '').localeCompare(b.reference || '', 'pt-BR', { numeric: true }));
  return entries;
}
function sourceFilterStatus() {
  const count = matchingSourceEntries().length;
  return state.sourceEntryQuery.trim() ? `${count} ${count === 1 ? 'ficha encontrada' : 'fichas encontradas'}` : state.sourceTheme ? `Exibindo ${state.sourceTheme} (${count})` : `Exibindo todas fichas (${count})`;
}
function sourceEntryCard(r, index) {
  return `<article class="source-entry-card" data-entry="${esc(r.id)}"><button class="source-entry-main" data-action="source-edit-entry" data-id="${esc(r.id)}" aria-label="Editar ficha ${index + 1}"><span class="source-entry-header"><span class="source-entry-heading">${icon('book')}<span>${esc(r.title || r.reference || 'Reflexão da leitura')}</span></span><span class="entry-number">${esc(r.identifier || `Ficha #${String(index + 1).padStart(2, '0')}`)}</span></span>${r.quote ? `<span class="source-entry-quote">«${esc(r.quote)}»</span>` : ''}<span class="source-entry-text">${formatText(r.text)}</span></button><div class="source-entry-tags">${r.tags.map(tag => `<button data-action="source-filter" data-tag="${esc(tag)}" class="${state.sourceTheme && normalize(tag) === normalize(state.sourceTheme) ? 'active' : ''}">${esc(tagName(tag))}</button>`).join('')}</div></article>`;
}
function sourceEntryResultsHTML() {
  const entries = matchingSourceEntries();
  const all = sourceEntries();
  return entries.length ? entries.map(r => sourceEntryCard(r, all.findIndex(entry => entry.id === r.id))).join('') : emptyHTML(sourceEntries().length ? 'Nenhuma ficha encontrada' : 'Uma leitura por registrar', sourceEntries().length ? 'Experimente outro tema ou busque um trecho diferente.' : 'Crie a primeira ficha desta fonte para registrar sua leitura.');
}
function sourceDetailHTML() {
  const b = bookFor(state.selectedSource);
  const entries = sourceEntries();
  return `<div class="source-detail"><button class="theme-back text-button" data-action="source-back">${icon('back')} Todas as fontes</button><div class="source-title-row"><h2>${esc(b.title)}</h2><button class="icon-button" data-action="edit-source" aria-label="Editar fonte">${icon('pencil')}</button></div><p class="source-detail-author">${esc(b.author)}</p><button class="primary-button source-add-entry" data-action="source-create">${icon('plus')} Nova Ficha</button><section class="source-theme-filters"><div class="source-theme-heading"><h3>${icon('themes')} Temas da obra</h3><span id="source-filter-status" role="status">${esc(sourceFilterStatus())}</span></div><div class="source-filter-chips" role="group" aria-label="Filtrar fichas por tema"><button class="source-filter-chip ${state.sourceTheme ? '' : 'active'}" data-action="source-filter" data-tag="" aria-pressed="${!state.sourceTheme}">Todas <span>${entries.length}</span></button>${sourceThemes().map(tag => `<button class="source-filter-chip ${normalize(state.sourceTheme) === normalize(tag) ? 'active' : ''}" data-action="source-filter" data-tag="${esc(tag)}" aria-pressed="${normalize(state.sourceTheme) === normalize(tag)}">${esc(tag)} <span>${entries.filter(r => r.tags.some(t => normalize(t) === normalize(tag))).length}</span></button>`).join('')}</div><div class="source-entry-tools"><div class="entry-sort-control">${icon('order')}<select id="source-entry-sort" aria-label="Ordenar fichas da fonte">${[['recentes', 'Mais recentes'], ['antigas', 'Mais antigas'], ['referencia', 'Referência']].map(([value, label]) => `<option value="${value}" ${state.sourceEntrySort === value ? 'selected' : ''}>${label}</option>`).join('')}</select></div><button class="icon-button" data-action="source-toggle-search" aria-label="Buscar fichas nesta fonte" aria-expanded="${state.sourceSearchOpen}" aria-controls="source-entry-search-wrap">${icon('search')}</button></div><div id="source-entry-search-wrap" class="search-wrap" ${state.sourceSearchOpen ? '' : 'hidden'}>${icon('search')}<input id="source-entry-search" type="search" placeholder="Buscar trecho ou reflexão..." aria-label="Buscar fichas nesta fonte" value="${esc(state.sourceEntryQuery)}"><button class="clear-search" data-action="source-clear-entry-search" aria-label="Limpar busca de fichas" ${state.sourceEntryQuery ? '' : 'hidden'}>${icon('x')}</button></div></section><div class="source-entry-list" id="source-entry-results" aria-live="polite">${sourceEntryResultsHTML()}</div></div>`;
}
function refreshSourceEntries() {
  document.querySelector('#source-entry-results').innerHTML = sourceEntryResultsHTML();
  document.querySelector('#source-filter-status').textContent = sourceFilterStatus();
  document.querySelectorAll('.source-filter-chip').forEach(button => { const active = normalize(button.dataset.tag) === normalize(state.sourceTheme); button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
  document.querySelector('#source-entry-search-wrap .clear-search').hidden = !state.sourceEntryQuery;
}
function persistSources() {
  return storage.set('arquivo-sources-v1', state.books);
}
function openSourceEdit() {
  const b = bookFor(state.selectedSource);
  if (!b) return;
  openSheet('Editar Fonte', b.title, `<form id="source-edit-form" class="sheet-scroll source-edit-form" novalidate><div class="field"><div class="source-field-label"><label for="edit-source-title">Título da obra</label></div><input id="edit-source-title" name="title" value="${esc(b.title)}" maxlength="200" required aria-describedby="source-edit-error"></div><div class="field"><div class="source-field-label"><label for="edit-source-author">Autor(a)</label></div><input id="edit-source-author" name="author" value="${esc(b.author)}" maxlength="120" required aria-describedby="source-edit-error"></div><div class="field"><div class="source-field-label"><label for="edit-source-bibliography">Detalhes da Edição / Bibliografia</label><span class="optional-label">Opcional</span></div><textarea id="edit-source-bibliography" name="bibliography" maxlength="1000" placeholder="Ano, edição, gênero, editora…">${esc(b.bibliography ?? (b.year ? b.year : ''))}</textarea></div><p class="field-error" id="source-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer edit-source-footer"><button class="primary-button" type="submit" form="source-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="delete-source">${icon('trash')} Excluir fonte</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'edit-source-sheet');
}
function confirmSourceDelete() {
  const b = bookFor(state.selectedSource);
  if (!b) return;
  const count = countFor(b.id);
  openSheet('Excluir fonte?', b.title, `<div class="sheet-scroll delete-theme-description"><p>A fonte${count ? ` e ${count === 1 ? 'sua ficha' : `suas ${count} fichas associadas`}` : ''} ${count ? 'serão excluídas' : 'será excluída'} do Bloom.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="confirm-delete-source">${icon('trash')} Excluir fonte</button><button class="sheet-dismiss" data-action="edit-source">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function deleteSelectedSource() {
  const id = state.selectedSource;
  state.books = state.books.filter(b => b.id !== id);
  state.reflections = state.reflections.filter(r => r.bookId !== id);
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft?.bookId === id || draft?.context?.sourceId === id || draft?.context?.bookId === id) { state.editor = null; storage.set('arquivo-entry-draft-v2', null); }
  const sourcesSaved = persistSources();
  const entriesSaved = storage.set('arquivo-reflections-v1', state.reflections);
  const deletedSaved = storage.set('arquivo-deleted-sources-v1', state.deletedSources);
  state.sourceQuery = ''; go('obras');
  toast(sourcesSaved && entriesSaved && deletedSaved ? 'Fonte excluída do Bloom.' : 'Fonte excluída nesta sessão.');
}
function openSourceEntryEdit(id, fromList = false) {
  const record = state.reflections.find(r => r.id === id && (fromList || r.bookId === state.selectedSource));
  if (!record) return;
  const entries = state.reflections.filter(r => r.bookId === record.bookId).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const number = String(entries.findIndex(r => r.id === id) + 1).padStart(2, '0');
  state.sourceEntryDraft = { ...record, title: record.title || '', reference: record.reference || record.location || '', identifier: record.identifier || '', quote: record.quote || '', tags: [...record.tags], number, fromList };
  showSourceEntryEdit();
}
function fichaSourceFieldHTML() {
  const source = bookFor(state.sourceEntryDraft.bookId);
  return `<div class="field ficha-source-field"><div class="ficha-source-label"><label for="ficha-book">Fonte / Obra <span>*</span></label><span>Bibliográfica</span></div><div class="ficha-source-picker"><span class="ficha-source-icon">${icon('book-open')}</span><span class="ficha-source-info"><span id="ficha-book-title">${esc(source?.title || 'Selecionar fonte')}</span><span id="ficha-book-author">${esc(source?.author || '')}</span></span><span class="ficha-source-arrows">${icon('chevron')}</span><select id="ficha-book" name="bookId" aria-label="Fonte / Obra" required aria-describedby="ficha-edit-error"><option value="">Selecionar fonte</option>${state.books.map(b => `<option value="${b.id}" ${b.id === state.sourceEntryDraft.bookId ? 'selected' : ''}>${esc(b.title)} — ${esc(b.author)}</option>`).join('')}</select></div></div>`;
}
function sourceEntryTagsHTML() {
  return state.sourceEntryDraft.tags.map((tag, index) => `<span class="ficha-edit-tag ${index === 0 ? 'primary-tag' : ''}"><span>${esc(tagName(tag))}</span><button type="button" data-action="ficha-remove-tag" data-index="${index}" aria-label="Remover tema ${esc(tag)}">${icon('x')}</button></span>`).join('');
}
function showSourceEntryEdit() {
  const draft = state.sourceEntryDraft;
  if (!draft) return;
  openSheet(draft.fromList ? (draft.identifier || `Ficha #${draft.number}`) : `Editar Ficha #${draft.number}`, draft.title || draft.reference || 'Reflexão da leitura', `<form id="source-entry-edit-form" class="sheet-scroll ficha-edit-form" novalidate>${draft.fromList ? fichaSourceFieldHTML() : ''}<div class="field"><label for="ficha-title">Título / Referência <span class="optional-label">(Opcional)</span></label><input id="ficha-title" name="title" value="${esc(draft.title)}" maxlength="200" aria-describedby="ficha-edit-error"></div><div class="ficha-edit-grid"><div class="field"><label for="ficha-reference">Capítulo / Cena / Pág.</label><input id="ficha-reference" name="reference" value="${esc(draft.reference)}" maxlength="160" placeholder="Capítulo, cena ou página"></div><div class="field"><label for="ficha-identifier">Identificador</label><input id="ficha-identifier" name="identifier" value="${esc(draft.identifier)}" placeholder="Ficha #${draft.number}" maxlength="40"></div></div><div class="field"><label for="ficha-quote">Trecho citado da obra</label><div class="ficha-quote-field"><textarea id="ficha-quote" name="quote" maxlength="5000" placeholder="Adicione o trecho citado…">${esc(draft.quote)}</textarea></div></div><div class="field"><label for="ficha-text">Reflexão <span aria-hidden="true">*</span></label><textarea id="ficha-text" name="text" maxlength="5000" required aria-describedby="ficha-edit-error">${esc(draft.text)}</textarea></div><div class="field"><div class="ficha-tags-heading"><label>Temas / Tags</label><span id="ficha-tag-count">${draft.tags.length} associados</span></div><div class="ficha-edit-tags" id="ficha-edit-tags">${sourceEntryTagsHTML()}<button class="ficha-new-tag" type="button" data-action="ficha-new-tag">${icon('plus')} Novo tema</button></div><div class="ficha-tag-composer" id="ficha-tag-composer" hidden><label class="sr-only" for="ficha-tag-input">Nome do tema</label><input id="ficha-tag-input" list="ficha-theme-options" maxlength="50" placeholder="Escolha ou digite um tema" autocomplete="off"><datalist id="ficha-theme-options">${allThemes().map(tag => `<option value="${esc(tag)}">`).join('')}</datalist><button type="button" class="secondary-button" data-action="ficha-add-tag">Adicionar</button></div><p class="field-error" id="ficha-tag-error" role="alert"></p></div><p class="field-error" id="ficha-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer ficha-edit-footer"><button class="primary-button" type="submit" form="source-entry-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="ficha-delete">${icon('trash')} Excluir ficha</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'ficha-edit-sheet' + (draft.fromList ? ' ficha-list-sheet' : ''));
}
function syncSourceEntryDraft() {
  const form = document.querySelector('#source-entry-edit-form');
  if (!form || !state.sourceEntryDraft) return;
  Object.assign(state.sourceEntryDraft, readEntryFields(form));
}
function refreshSourceEntryTags() {
  document.querySelector('#ficha-edit-tags').innerHTML = sourceEntryTagsHTML() + `<button class="ficha-new-tag" type="button" data-action="ficha-new-tag">${icon('plus')} Novo tema</button>`;
  document.querySelector('#ficha-tag-count').textContent = `${state.sourceEntryDraft.tags.length} associados`;
}
function addSourceEntryTag() {
  const field = document.querySelector('#ficha-tag-input');
  let name = field.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  if (!name) { document.querySelector('#ficha-tag-error').textContent = 'Informe o nome do tema.'; field.focus(); return; }
  name = allThemes().find(tag => normalize(tag) === normalize(name)) || name;
  if (state.sourceEntryDraft.tags.some(tag => normalize(tag) === normalize(name))) { document.querySelector('#ficha-tag-error').textContent = 'Este tema já está associado à ficha.'; field.focus(); return; }
  if (state.sourceEntryDraft.tags.length >= 8) { document.querySelector('#ficha-tag-error').textContent = 'Você pode adicionar até 8 temas por ficha.'; return; }
  state.sourceEntryDraft.tags.push(name); refreshSourceEntryTags(); field.value = '';
  document.querySelector('#ficha-tag-composer').hidden = true;
  document.querySelector('#ficha-tag-error').textContent = '';
  document.querySelector('.ficha-new-tag').focus({ preventScroll: true });
}
function confirmSourceEntryDelete() {
  syncSourceEntryDraft();
  openSheet('Excluir ficha?', state.sourceEntryDraft.identifier, `<div class="sheet-scroll delete-theme-description"><p>Esta ficha será excluída do arquivo. A fonte e os temas continuarão disponíveis.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="ficha-confirm-delete">${icon('trash')} Excluir ficha</button><button class="sheet-dismiss" data-action="ficha-cancel-delete">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function finishSourceEntryChange(message, persisted) {
  const focusId = state.sourceEntryDraft.id;
  const fromList = state.sourceEntryDraft.fromList;
  state.sourceEntryDraft = null;
  if (state.sourceTheme && !sourceThemes().some(tag => normalize(tag) === normalize(state.sourceTheme))) state.sourceTheme = '';
  const content = document.querySelector('.archive-content');
  content.innerHTML = fromList ? entriesHTML() : sourceDetailHTML();
  state.opener = content.querySelector(`[data-action="${fromList ? 'reflection' : 'source-edit-entry'}"][data-id="${CSS.escape(focusId)}"]`) || content.querySelector(fromList ? '#entry-search' : '.source-add-entry');
  modal.close();
  toast(persisted ? message : message + ' Salvo nesta sessão.');
}
function openReflection(id) {
  if (state.route === 'fonte') { openSourceEntryEdit(id); return; }
  if (state.route === 'fichas') { openSourceEntryEdit(id, true); return; }
  const r = state.reflections.find((record) => record.id === id);
  const b = bookFor(r.bookId);
  openModal(r.title || 'Reflexão', `<div class="modal-body"><button class="text-button" data-action="book" data-id="${b.id}">${esc(b.title)}</button><p class="detail-author">${esc(b.author)}${r.reference ? ` · ${esc(r.reference)}` : ''}</p>${r.quote ? `<blockquote class="entry-detail-quote">${esc(r.quote)}</blockquote>` : ''}<p class="long-reflection">${formatText(r.text)}</p><div class="chip-list">${r.tags.map((tag) => `<button class="chip" data-action="open-theme" data-tag="${esc(tag)}">${esc(tagName(tag))}</button>`).join('')}</div><p class="help">${r.date ? esc(r.date.split('-').reverse().join('/')) : 'Hoje'}</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Fechar</button><button class="primary-button" data-action="edit" data-id="${esc(r.id)}">${icon('write')} Editar reflexão</button></div></div>`, 'Reflexão');
}
function openEditor(bookId = '', reflectionId = '', themeName = '') {
  const record = state.reflections.find((r) => r.id === reflectionId);
  state.editorReturn = state.route === 'tema' ? 'tema/' + encodeURIComponent(state.selectedTheme) : state.route === 'fonte' ? 'fonte/' + encodeURIComponent(state.selectedSource) : ['inicio', 'fichas', 'obras', 'temas'].includes(state.route) ? state.route : 'inicio';
  state.editor = record ? { ...blankEntry(), ...record, tags: [...record.tags] } : blankEntry();
  if (themeName) {
    if (!record) { state.editor.bookId = bookFor(bookId)?.id || ''; state.editor.tags = [themeName]; }
    state.editor.context = { theme: themeName, bookId: bookFor(bookId)?.id || record?.bookId || '' };
  }
  if (state.route === 'fonte' && (bookId || record)) {
    if (!record) { state.editor.bookId = bookFor(bookId)?.id || ''; state.editor.tags = state.sourceTheme ? [state.sourceTheme] : []; }
    state.editor.context = { sourceId: state.selectedSource, filter: state.sourceTheme };
  }
  if (state.route === 'nova-fonte' && bookFor(bookId)) {
    state.editor.bookId = bookId;
    state.editor.context = { sourceId: bookId, filter: '' };
    state.editorReturn = 'fonte/' + encodeURIComponent(bookId);
  }
  clearTimeout(state.autosaveTimer);
  storage.set('arquivo-entry-draft-v2', state.editor);
  if (modal.open) modal.close();
  go('criar');
}
function entryTagsHTML() {
  return state.editor.tags.map((tag, index) => `<span class="entry-tag"><span>${esc(tagName(tag))}</span><button type="button" data-action="remove-entry-tag" data-index="${index}" aria-label="Remover tema ${esc(tag)}">${icon('x')}</button></span>`).join('');
}
function editorHTML() {
  return `<form id="reflection-form" class="entry-form" data-id="${esc(state.editor.id)}" novalidate>
    <div class="entry-savebar"><button class="icon-button entry-back" type="button" data-action="entry-back" aria-label="Voltar ao Bloom">${icon('back')}</button><span class="entry-save-status" role="status"><span class="status-dot"></span><span id="entry-save-label">${state.editor.text || state.editor.title ? 'Rascunho recuperado' : 'Rascunho vazio'}</span></span><button class="primary-button entry-save" type="submit">${icon('check')} Salvar</button></div>
    <input class="entry-title" id="reflection-title" name="title" placeholder="Título (opcional)" aria-label="Título da ficha" maxlength="200" value="${esc(state.editor.title)}">
    <section class="entry-metadata" aria-label="Obra, referência e temas"><div class="entry-source"><select id="reflection-book" name="bookId" aria-label="Obra" required aria-describedby="reflection-error"><option value="">Selecionar fonte *</option>${state.books.map((b) => `<option value="${b.id}" ${state.editor.bookId === b.id ? 'selected' : ''}>${esc(b.title)} — ${esc(b.author)}</option>`).join('')}</select></div><div class="entry-reference"><input id="reflection-reference" name="reference" placeholder="Capítulo, página ou referência" aria-label="Referência na obra" maxlength="160" value="${esc(state.editor.reference)}"></div><div class="entry-tags" id="entry-tags">${entryTagsHTML()}</div><button type="button" class="entry-add-theme" data-action="add-entry-tag">${icon('plus')} Tema</button></section>
    <section class="entry-quote"><div class="entry-section-header"><label for="reflection-quote">${icon('quote')} Trecho da obra</label><button type="button" class="entry-copy" data-action="copy-quote" aria-label="Copiar trecho da obra">${icon('copy')}</button></div><textarea id="reflection-quote" name="quote" placeholder="" aria-label="Trecho da obra" maxlength="5000">${esc(state.editor.quote)}</textarea></section>
    <section class="entry-synthesis"><div class="entry-section-header"><label for="reflection-text">${icon('link')} Reflexão <span aria-hidden="true">*</span></label></div><textarea id="reflection-text" name="text" placeholder="" aria-label="Minha síntese e reflexão" required maxlength="5000" aria-describedby="reflection-error">${esc(state.editor.text)}</textarea></section>
    <p class="field-error" id="reflection-error" role="alert"></p><div class="entry-formatbar" role="toolbar" aria-label="Formatação da reflexão"><button type="button" data-action="format-entry" data-format="bold" aria-label="Negrito" title="Negrito"><strong>B</strong></button><button type="button" data-action="format-entry" data-format="italic" aria-label="Itálico" title="Itálico"><em>I</em></button><button type="button" data-action="format-entry" data-format="quote" aria-label="Citação" title="Citação">${icon('quote')}</button><button type="button" data-action="entry-help" aria-label="Inspiração para refletir" title="Inspiração para refletir">${icon('sparkle')}</button></div>
  </form>`;
}
function autosaveEntry() {
  const form = document.querySelector('#reflection-form');
  if (!form) return;
  Object.assign(state.editor, readEntryFields(form));
  const persisted = storage.set('arquivo-entry-draft-v2', state.editor);
  const status = document.querySelector('#entry-save-label');
  status.textContent = 'Salvando…';
  clearTimeout(state.autosaveTimer);
  state.autosaveTimer = setTimeout(() => { if (status.isConnected) status.textContent = persisted ? 'Rascunho salvo neste navegador' : 'Rascunho apenas nesta sessão'; }, 350);
}
function formatEntry(kind) {
  const field = document.querySelector('#reflection-text');
  const start = field.selectionStart;
  const end = field.selectionEnd;
  const selected = field.value.slice(start, end);
  const marker = kind === 'bold' ? '**' : kind === 'italic' ? '*' : '> ';
  const replacement = kind === 'quote' ? marker + selected : marker + selected + marker;
  if (field.value.length + replacement.length - selected.length > 5000) return;
  field.setRangeText(replacement, start, end, 'end');
  field.focus({ preventScroll: true });
  field.setSelectionRange(start + marker.length, start + marker.length + selected.length);
  field.dispatchEvent(new Event('input', { bubbles: true }));
}
function openProfile() {
  state.pendingArchiveImport = null;
  const content = `<header class="profile-header">
    <div class="profile-avatar">${icon('user')}</div>
    <div class="profile-identity"><div class="profile-name-row"><h2 id="modal-title">${esc(state.profileName)}</h2><button class="profile-edit-name" data-action="profile-edit-name" aria-label="Editar nome do perfil" aria-controls="profile-name-form" aria-expanded="false">${icon('pencil')}</button></div><p class="profile-email">${AUTH_ENABLED ? esc(state.email) : 'Perfil local · sem conta'}</p></div>
    <button class="icon-button profile-close" data-action="close-modal" aria-label="Fechar perfil" autofocus>${icon('x')}</button>
  </header>
  <form id="profile-name-form" class="profile-name-form" hidden novalidate><label class="field-label" for="profile-name">Nome do perfil</label><input id="profile-name" name="name" value="${esc(state.profileName)}" maxlength="80" autocomplete="nickname" required aria-describedby="profile-name-error"><p class="field-error" id="profile-name-error" role="alert"></p><div class="modal-actions"><button type="button" class="secondary-button" data-action="profile-cancel-edit">Cancelar</button><button type="submit" class="primary-button">${icon('check')} Salvar nome</button></div></form>
  <div class="profile-stats"><div><strong>${state.books.length}</strong><small>obras</small></div><div><strong>${state.reflections.length}</strong><small>reflexões</small></div><div><strong>${allThemes().length}</strong><small>temas</small></div><div><strong>${state.vocabulary.length}</strong><small>palavras</small></div></div>
  <p class="profile-note">Seus dados ficam apenas neste navegador, neste dispositivo. Limpar os dados do site pode apagá-los. Exporte um backup para guardar ou transferir suas leituras.</p>
  <section class="profile-data" aria-labelledby="profile-data-title"><h3 id="profile-data-title">Dados do Bloom</h3><div class="profile-data-actions"><button class="secondary-button" data-action="export-archive">${icon('download')} Exportar JSON</button><button class="secondary-button" data-action="import-archive">${icon('upload')} Importar JSON</button></div><input type="file" id="archive-import-file" accept=".json,application/json" hidden><p id="archive-import-error" class="field-error" role="alert"></p><div class="profile-import-preview" id="archive-import-preview" hidden><p id="archive-import-summary"></p><p>A importação substitui as fontes, fichas, temas e palavras atuais pelos dados deste arquivo.</p><div class="modal-actions"><button class="secondary-button" data-action="cancel-archive-import">Cancelar</button><button class="primary-button" data-action="confirm-archive-import">Importar arquivo</button></div></div></section>

  ${AUTH_ENABLED ? `<button class="secondary-button profile-logout" data-action="logout">${icon('logout')} Sair do Bloom</button>` : ''}`;
  showDialog(content, 'profile-modal');
}
function closeProfileNameEditor() {
  document.querySelector('#profile-name-form').hidden = true;
  const button = modal.querySelector('[data-action="profile-edit-name"]');
  button.setAttribute('aria-expanded', 'false');
  button.focus({ preventScroll: true });
}
function exportArchive() {
  const data = { format: 'bloom-arquivo', version: 1, exportedAt: new Date().toISOString(), sources: state.books, reflections: state.reflections, themes: themeCatalog().map(({ name, description, addedAt }) => ({ name, description, addedAt: addedAt || 0 })), vocabulary: state.vocabulary.map(({ id, word, synonyms, description, addedAt, updatedAt }) => ({ id, word, synonyms, description, addedAt: addedAt || 0, updatedAt: updatedAt || 0 })) };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `bloom-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Arquivo exportado em JSON.');
}
function validateArchive(data) {
  const invalid = () => { throw new Error('O JSON não contém um arquivo válido. Use um arquivo gerado por Exportar JSON.'); };
  if (!data || data.format !== 'bloom-arquivo' || data.version !== 1) invalid();
  for (const key of ['sources', 'reflections', 'themes']) if (!Array.isArray(data[key]) || data[key].length > 10000) invalid();
  const text = (value, required = false, max = 20000) => { if (typeof value !== 'string' || value.length > max || (required && !value.trim())) invalid(); return value; };
  const optionalText = (value) => value === undefined ? '' : text(value);
  const timestamp = (value) => { if (value === undefined) return 0; if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) invalid(); return value; };
  const sourceIds = new Set();
  const sources = data.sources.map(source => {
    if (!source || typeof source.id !== 'string' || !/^[a-z0-9-]+$/.test(source.id) || source.id.length > 160 || sourceIds.has(source.id)) invalid();
    sourceIds.add(source.id);
    return { id: source.id, title: text(source.title, true), author: text(source.author, true), year: optionalText(source.year), bibliography: optionalText(source.bibliography), description: optionalText(source.description), color: '#343126', addedAt: timestamp(source.addedAt) };
  });
  const themeNames = new Set();
  const themes = data.themes.map(theme => {
    if (!theme) invalid();
    const name = text(theme.name, true).trim();
    if (themeNames.has(normalize(name))) invalid();
    themeNames.add(normalize(name));
    return { name, description: text(theme.description), addedAt: timestamp(theme.addedAt) };
  });
  const entryIds = new Set();
  const entries = data.reflections.map(entry => {
    if (!entry || typeof entry.id !== 'string' || !/^[a-z0-9-]{1,160}$/i.test(entry.id) || entryIds.has(entry.id) || !sourceIds.has(entry.bookId) || !Array.isArray(entry.tags) || entry.tags.length > 8) invalid();
    entryIds.add(entry.id);
    const tags = entry.tags.map(tag => text(tag, true).trim());
    if (new Set(tags.map(normalize)).size !== tags.length || tags.some(tag => !themeNames.has(normalize(tag)))) invalid();
    const date = optionalText(entry.date);
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) invalid();
    return { id: entry.id, bookId: entry.bookId, title: optionalText(entry.title), reference: optionalText(entry.reference), location: optionalText(entry.location), identifier: optionalText(entry.identifier), quote: optionalText(entry.quote), text: text(entry.text, true), tags, date };
  });
  const wordIds = new Set();
  const vocabulary = Array.isArray(data.vocabulary) ? data.vocabulary.map(item => {
    if (!item || typeof item.id !== 'string' || !/^word-[a-z0-9-]+$/i.test(item.id) || item.id.length > 160 || wordIds.has(item.id)) invalid();
    wordIds.add(item.id);
    return { id: item.id, word: text(item.word, true).trim(), synonyms: optionalText(item.synonyms), description: optionalText(item.description), addedAt: timestamp(item.addedAt), updatedAt: timestamp(item.updatedAt) };
  }) : [];
  if (vocabulary.length > 10000) invalid();
  return { sources, reflections: entries, themes, vocabulary };
}
async function prepareArchiveImport(input) {
  const file = input.files[0];
  if (!file) return;
  const error = document.querySelector('#archive-import-error');
  const preview = document.querySelector('#archive-import-preview');
  const buttons = [...modal.querySelectorAll('.profile-data-actions button')];
  state.pendingArchiveImport = null; preview.hidden = true; error.textContent = '';
  buttons.forEach(button => { button.disabled = true; });
  try {
    if (file.size > 5 * 1024 * 1024) throw new Error('Escolha um arquivo JSON de até 5 MB.');
    const content = await file.text();
    if (!input.isConnected || !modal.open) return;
    let data;
    try { data = JSON.parse(content); } catch { throw new Error('Não foi possível ler o JSON. Verifique o arquivo e tente novamente.'); }
    state.pendingArchiveImport = validateArchive(data);
    document.querySelector('#archive-import-summary').textContent = `${state.pendingArchiveImport.sources.length} fontes, ${state.pendingArchiveImport.reflections.length} fichas, ${state.pendingArchiveImport.themes.length} temas e ${state.pendingArchiveImport.vocabulary.length} palavras encontrados.`;
    preview.hidden = false;
  } catch (failure) {
    if (input.isConnected && modal.open) error.textContent = failure.message;
  } finally { input.value = ''; buttons.forEach(button => { button.disabled = false; }); }
}
function importArchive() {
  if (!state.pendingArchiveImport) return;
  const data = state.pendingArchiveImport;
  const removedSources = [];
  const removedThemes = [];
  const updates = {
    'arquivo-sources-v1': data.sources,
    'arquivo-deleted-sources-v1': removedSources,
    'arquivo-reflections-v1': data.reflections,
    'arquivo-themes-v1': data.themes,
    'arquivo-deleted-themes-v1': removedThemes,
    'bloom-clean-archive-v1': true,
    'arquivo-entry-draft-v2': null,
    'arquivo-vocabulary-v1': data.vocabulary,
  };
  const previous = new Map();
  try {
    for (const key of Object.keys(updates)) previous.set(key, localStorage.getItem(key));
    for (const [key, value] of Object.entries(updates)) localStorage.setItem(key, JSON.stringify(value));
  } catch {
    for (const [key, value] of previous) { try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch { /* Keep the current in-memory archive available. */ } }
    document.querySelector('#archive-import-error').textContent = 'Não foi possível salvar a importação neste navegador. Os dados atuais foram mantidos.';
    return;
  }
  state.books = data.sources; state.reflections = data.reflections; state.customThemes = data.themes; state.vocabulary = data.vocabulary;
  state.deletedSources = removedSources; state.deletedThemes = removedThemes;
  clearTimeout(state.autosaveTimer); state.editor = null; state.sourceEntryDraft = null; state.pendingArchiveImport = null; state.pendingSourceSheet = null;
  state.newSourceDraft = blankSource(); state.newThemeDraft = { name: '', description: '' }; state.newWordDraft = { word: '', synonyms: '', description: '' };
  state.query = ''; state.activeTheme = ''; state.sourceQuery = ''; state.themeQuery = ''; state.entryQuery = ''; state.sourceTheme = ''; state.vocabularyQuery = '';
  render(); openProfile(); toast('Arquivo importado com sucesso.');
}
function saveProfileName(form) {
  const name = form.elements.name.value.trim().replace(/\s+/g, ' ');
  if (!name || name.length > 80) { document.querySelector('#profile-name-error').textContent = !name ? 'Informe seu nome.' : 'Use até 80 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  state.profileName = name;
  const currentAccount = accountFor(state.email);
  if (currentAccount) currentAccount.name = name;
  const nameSaved = storage.set('arquivo-profile-name-v1', state.profileName);
  const accountsSaved = storage.set('arquivo-accounts-v1', state.accounts);
  const persisted = nameSaved && accountsSaved;
  document.querySelector('#modal-title').textContent = state.profileName;
  closeProfileNameEditor();
  toast(persisted ? 'Nome do perfil atualizado.' : 'Nome atualizado nesta sessão.');
}

function saveSourceEntry(form) {
  syncSourceEntryDraft();
  const values = { bookId: state.sourceEntryDraft.bookId, ...readEntryFields(form, { trim: true }) };
  const error = validateEntry(values, 'Selecione uma fonte para salvar sua ficha.');
  if (error) { showFormError(form, 'ficha-edit-error', error.message, error.field); return; }
  const original = state.reflections.find(r => r.id === state.sourceEntryDraft.id);
  if (!original) return;
  const record = { ...original, ...values, tags: [...state.sourceEntryDraft.tags] };
  state.reflections = state.reflections.map(r => r.id === record.id ? record : r);
  const persisted = storage.set('arquivo-reflections-v1', state.reflections);
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft?.id === record.id) { state.editor = null; storage.set('arquivo-entry-draft-v2', null); }
  finishSourceEntryChange('Ficha atualizada no Bloom.', persisted);
}

function saveSourceChanges(form) {
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  const bibliography = form.elements.bibliography.value.trim();
  if (!title || !author) { const field = !title ? form.elements.title : form.elements.author; document.querySelector('#source-edit-error').textContent = !title ? 'Informe o título da obra.' : 'Informe o nome do autor.'; field.setAttribute('aria-invalid', 'true'); field.focus(); return; }
  if (state.books.some(b => b.id !== state.selectedSource && normalize(b.title) === normalize(title) && normalize(b.author) === normalize(author))) { document.querySelector('#source-edit-error').textContent = 'Esta obra e autor já estão no Bloom.'; form.elements.title.setAttribute('aria-invalid', 'true'); form.elements.title.focus(); return; }
  state.books = state.books.map(b => b.id === state.selectedSource ? { ...b, title, author, bibliography } : b);
  const persisted = persistSources();
  go('fonte/' + encodeURIComponent(state.selectedSource));
  toast(persisted ? 'Fonte atualizada no Bloom.' : 'Fonte atualizada nesta sessão.');
}

function saveThemeChanges(form) {
  const theme = themeCatalog().find(t => t.name === state.selectedTheme);
  if (!theme) return;
  const name = form.elements.name.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  const description = form.elements.description.value.trim();
  if (!name || name.length > 40) { document.querySelector('#theme-edit-error').textContent = !name ? 'Informe o nome do tema.' : 'Use até 40 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  if (themeCatalog().some(t => normalize(t.name) !== normalize(theme.name) && normalize(t.name) === normalize(name))) { document.querySelector('#theme-edit-error').textContent = 'Este tema já existe no Bloom.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  state.customThemes = state.customThemes.filter(t => normalize(t.name) !== normalize(theme.name));
  state.customThemes.unshift({ name, description, originalName: theme.originalName || '', addedAt: theme.addedAt || Date.now() });
  const persisted = persistThemeChange(theme.name, name);
  openTheme(name);
  toast(persisted ? 'Tema atualizado no Bloom.' : 'Tema atualizado nesta sessão.');
}

function createTheme(form) {
  const name = form.elements.name.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  const description = form.elements.description.value.trim();
  if (!name || name.length > 40) { document.querySelector('#theme-error').textContent = !name ? 'Informe o nome do tema.' : 'Use até 40 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  if (allThemes().some(t => normalize(t) === normalize(name))) { document.querySelector('#theme-error').textContent = 'Este tema já existe no Bloom.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  state.customThemes.unshift({ name, description, addedAt: Date.now() });
  const persisted = storage.set('arquivo-themes-v1', state.customThemes);
  state.newThemeDraft = { name: '', description: '' }; state.themeQuery = ''; state.themeSort = 'recentes';
  go('temas');
  toast(persisted ? 'Novo tema adicionado ao Bloom.' : 'Tema adicionado nesta sessão. Armazenamento local indisponível.');
}

function createSource(form) {
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  const bibliography = form.elements.bibliography.value.trim();
  const immediate = form.elements.immediate.checked;
  if (!title || !author) { const field = !title ? form.elements.title : form.elements.author; document.querySelector('#source-error').textContent = !title ? 'Informe o título da obra.' : 'Informe o nome do autor.'; field.setAttribute('aria-invalid', 'true'); field.focus(); return; }
  if (state.books.some(b => normalize(b.title) === normalize(title) && normalize(b.author) === normalize(author))) { document.querySelector('#source-error').textContent = 'Esta obra e autor já estão no Bloom.'; form.elements.title.setAttribute('aria-invalid', 'true'); form.elements.title.focus(); return; }
  const source = { id: `source-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, author, year: '', bibliography, description: '', color: '#343126', addedAt: Date.now() };
  state.books.unshift(source);
  const persisted = persistSources();
  state.newSourceDraft = blankSource(); state.sourceQuery = ''; state.sourceSort = 'recentes';
  if (immediate) openEditor(source.id);
  else go('obras');
  toast(persisted ? 'Nova fonte adicionada ao Bloom.' : 'Fonte adicionada nesta sessão. Armazenamento local indisponível.');
}

function associateEntryTheme(form) {
  let tag = form.elements.tag.value.trim().replace(/^#/, '').trim();
  if (!tag) { document.querySelector('#entry-theme-error').textContent = 'Digite o nome do tema.'; form.elements.tag.focus(); return; }
  if (state.editor.tags.length >= 8) { document.querySelector('#entry-theme-error').textContent = 'Você pode adicionar até 8 temas por ficha.'; return; }
  tag = allThemes().find(existing => normalize(existing) === normalize(tag)) || tag;
  if (!state.editor.tags.some(existing => normalize(existing) === normalize(tag))) state.editor.tags.push(tag);
  document.querySelector('#entry-tags').innerHTML = entryTagsHTML();
  autosaveEntry(); modal.close();
}

function requestAccessCode(form) {
  const input = form.elements.email;
  input.value = input.value.trim();
  if (!input.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); document.querySelector('#email-error').textContent = 'Digite um e-mail válido para continuar.'; input.focus(); return; }
  const existing = accountFor(input.value);
  if (!existing) {
    updateLoginState();
    const name = form.elements.name.value.trim().replace(/\s+/g, ' ');
    const username = form.elements.username.value.trim().replace(/^@/, '').toLowerCase();
    if (!name || name.length > 80) { document.querySelector('#signup-name-error').textContent = !name ? 'Informe seu nome completo.' : 'Use até 80 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
    if (!validUsername(username)) { document.querySelector('#signup-username-error').textContent = 'Use de 3 a 30 caracteres: letras, números, ponto, traço ou sublinhado.'; form.elements.username.setAttribute('aria-invalid', 'true'); form.elements.username.focus(); return; }
    if (state.accounts.some(account => account.username === username)) { document.querySelector('#signup-username-error').textContent = 'Este username já está em uso. Escolha outro.'; form.elements.username.setAttribute('aria-invalid', 'true'); form.elements.username.focus(); return; }
    state.pendingAccess = { email: emailKey(input.value), name, username, isNew: true };
  } else state.pendingAccess = { ...existing, isNew: false };
  storage.set('arquivo-pending-access-v1', state.pendingAccess);
  state.loginDraft = { email: input.value, name: form.elements.name.value, username: form.elements.username.value };
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  document.querySelector('#login-submit-label').textContent = 'Enviando código…';
  [...form.elements].filter(field => field.tagName === 'INPUT').forEach(field => { field.disabled = true; });
  state.authTimer = setTimeout(() => { startCountdown(); go('codigo'); toast('Código simulado enviado. Use 482619.'); }, 650);
}

function confirmAccessCode(form) {
  const inputs = [...form.querySelectorAll('.otp-digit')];
  const code = inputs.map((el) => el.value).join('');
  if (code !== DEMO_CODE) { document.querySelector('#code-error').textContent = code.length < 6 ? 'Preencha os 6 dígitos do código.' : 'Código incorreto. Neste protótipo, use 482619.'; inputs.forEach((el) => { el.classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); }); (inputs.find((el) => !el.value) || inputs[0]).focus(); return; }
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  button.textContent = 'Abrindo Bloom…';
  state.authTimer = setTimeout(() => {
    const firstAccess = state.pendingAccess?.isNew;
    if (state.pendingAccess) {
      let account = accountFor(state.pendingAccess.email);
      if (!account) { account = { email: state.pendingAccess.email, name: state.pendingAccess.name, username: state.pendingAccess.username }; state.accounts.push(account); }
      storage.set('arquivo-accounts-v1', state.accounts);
      activateAccount(account);
    }
    go('inicio'); toast(firstAccess ? 'Conta criada. Bem-vindo ao Bloom.' : 'Bem-vindo ao Bloom.');
  }, 500);
}

function saveEntry(form) {
  const values = readEntryFields(form, { trim: true });
  const error = validateEntry(values, 'Selecione uma obra para salvar sua ficha.');
  if (error) {
    if (error.field === 'text') form.elements.text.classList.add('invalid');
    showFormError(form, 'reflection-error', error.message, error.field);
    return;
  }
  const record = { ...state.reflections.find(r => r.id === form.dataset.id), ...values, id: form.dataset.id || `r-${Date.now()}`, tags: [...state.editor.tags], date: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Fortaleza', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) };
  const editing = !!form.dataset.id;
  if (editing) state.reflections = state.reflections.map((r) => r.id === record.id ? record : r); else state.reflections.unshift(record);
  const persisted = storage.set('arquivo-reflections-v1', state.reflections);
  storage.set('arquivo-entry-draft-v2', null);
  const context = state.editor.context;
  clearTimeout(state.autosaveTimer); state.editor = null;
  if (modal.open) modal.close(); state.query = ''; state.activeTheme = '';
  if (context?.sourceId) {
    state.selectedSource = record.bookId;
    state.sourceTheme = context.filter && record.tags.includes(context.filter) ? context.filter : '';
    state.sourceEntryQuery = ''; state.sourceSearchOpen = false;
    go('fonte/' + encodeURIComponent(record.bookId));
  } else if (context?.theme && record.tags.includes(context.theme) && allThemes().includes(context.theme)) {
    if (context.bookId) state.pendingSourceSheet = { theme: context.theme, bookId: record.bookId };
    openTheme(context.theme);
  } else go(state.editorReturn === 'fichas' ? 'fichas' : 'inicio');
  toast(persisted ? (editing ? 'Reflexão atualizada no Bloom.' : 'Uma nova reflexão no Bloom.') : 'Reflexão salva nesta sessão. Armazenamento local indisponível.');
}

const formHandlers = {
  'profile-name-form': saveProfileName,
  'source-entry-edit-form': saveSourceEntry,
  'source-edit-form': saveSourceChanges,
  'theme-edit-form': saveThemeChanges,
  'theme-form': createTheme,
  'vocabulary-form': createWord,
  'vocabulary-edit-form': saveWordChanges,
  'source-form': createSource,
  'entry-theme-form': associateEntryTheme,
  'login-form': requestAccessCode,
  'code-form': confirmAccessCode,
  'reflection-form': saveEntry,
};

export {
  render, go, toast, refreshHome, refreshEntries, refreshSources, refreshThemes, refreshWords,
  refreshSourceEntries, openEditor, openNewSource, openNewTheme, openNewWord, openTheme, openBook, openWord,
  openReflection, openProfile, openSourceEdit, confirmSourceDelete, deleteSelectedSource,
  openSourceEntryEdit, openThemeEdit, confirmThemeDelete, deleteSelectedTheme,
  openWordEdit, confirmWordDelete, deleteSelectedWord,
  openThemeSource, openModal, exportArchive, importArchive, prepareArchiveImport,
  closeProfileNameEditor, addSourceEntryTag, confirmSourceEntryDelete, showSourceEntryEdit,
  archiveHTML, activateAccount, startCountdown, updateLoginState, autosaveEntry, entryTagsHTML,
  syncSourceEntryDraft, allThemes, clearFieldError, fieldErrorIds, formErrorIds,
  formHandlers, openSheet, showDialog,
  saveProfileName, saveSourceEntry, saveSourceChanges, saveThemeChanges, saveWordChanges, createTheme, createSource, createWord,
  associateEntryTheme, requestAccessCode, confirmAccessCode, saveEntry,
  readEntryFields, validateEntry, bookFor, wordFor, themeCatalog, persistSources, persistThemeChange, persistVocabulary,
  finishSourceEntryChange, formatEntry, refreshSourceEntryTags,
};
