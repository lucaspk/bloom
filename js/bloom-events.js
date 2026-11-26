'use strict';

import { state } from './state.js';
import { modal, app } from './dom.js';
import { DEMO_CODE } from './lib/constants.js';
import { storage } from './lib/storage.js';
import { esc, normalize, validEmail, blankSource } from './lib/utils.js';
import { icon } from './lib/icons.js';
import { accountFor } from './state.js';
import {
  render, go, toast, refreshHome, refreshEntries, refreshSources, refreshThemes, refreshWords,
  refreshSourceEntries, openEditor, openNewSource, openNewTheme, openNewWord, openTheme, openBook, openWord,
  openReflection, openProfile, openSourceEdit, confirmSourceDelete, deleteSelectedSource,
  openSourceEntryEdit, openThemeEdit, confirmThemeDelete, deleteSelectedTheme,
  openWordEdit, confirmWordDelete, deleteSelectedWord,
  openThemeSource, openModal, exportArchive, importArchive, prepareArchiveImport,
  closeProfileNameEditor, addSourceEntryTag, confirmSourceEntryDelete, showSourceEntryEdit,
  activateAccount, startCountdown, updateLoginState, autosaveEntry, entryTagsHTML,
  syncSourceEntryDraft, allThemes, clearFieldError, fieldErrorIds, formErrorIds,
  formHandlers, readEntryFields, bookFor, formatEntry, refreshSourceEntryTags,
  archiveHTML, finishSourceEntryChange,
} from './bloom-app.js';

document.addEventListener('click', (event) => {
  const menu = document.querySelector('.create-menu[open]');
  if (menu && !menu.contains(event.target)) menu.open = false;
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  if (button.matches('a')) event.preventDefault();
  const action = button.dataset.action;
  if (action === 'nav-route') {
    const next = button.dataset.route;
    if (next === 'inicio') { state.query = ''; state.activeTheme = ''; }
    if (next === 'obras') state.sourceQuery = '';
    if (next === 'temas') state.themeQuery = '';
    if (next === 'fichas') state.entryQuery = '';
    if (next === 'palavras') state.vocabularyQuery = '';
    go(next);
  } else if (['menu-create-entry', 'menu-create-source', 'menu-create-theme', 'menu-create-word'].includes(action)) {
    const summary = button.closest('.create-menu').querySelector('summary');
    button.closest('.create-menu').open = false;
    if (action === 'menu-create-entry') openEditor();
    else if (action === 'menu-create-source') { openNewSource(); state.opener = summary; }
    else if (action === 'menu-create-word') { openNewWord(); state.opener = summary; }
    else { openNewTheme(); state.opener = summary; }
  } else if (action === 'clear-entry-search') { state.entryQuery = ''; document.querySelector('#entry-search').value = ''; refreshEntries(); document.querySelector('#entry-search').focus(); }
  else if (action === 'google') {
    openModal('Continuar com o Google', `<div class="modal-body"><p class="modal-description">Escolha o perfil de demonstração para explorar o Bloom.</p><div class="profile-summary"><div class="profile-avatar">${icon('user')}</div><div><strong>Leitor Bloom</strong><small>leitor@exemplo.com</small></div></div><button class="primary-button" data-action="google-enter">Entrar com este perfil ${icon('arrow')}</button><p class="help">Login simulado para este protótipo.</p></div>`);
  } else if (action === 'google-enter') { activateAccount(accountFor('leitor@exemplo.com')); modal.close(); go('inicio'); toast('Bem-vindo ao Bloom.'); }
  else if (action === 'back-login') go('login');
  else if (action === 'fill-code') { document.querySelectorAll('.otp-digit').forEach((el, i) => { el.value = DEMO_CODE[i]; el.classList.remove('invalid'); el.removeAttribute('aria-invalid'); }); document.querySelector('#code-error').textContent = ''; document.querySelector('#code-form [type="submit"]').focus(); }
  else if (action === 'resend') { startCountdown(); toast('Novo código de demonstração: 482619.'); }
  else if (action === 'all-books') { state.sourceQuery = ''; go('obras'); }
  else if (action === 'new-source') openNewSource();
  else if (action === 'cancel-new-source') { state.newSourceDraft = blankSource(); go(state.newSourceReturn); }
  else if (action === 'suggest-source-author') {
    const field = document.querySelector('#source-author');
    field.value = button.dataset.author;
    field.dispatchEvent(new Event('input', { bubbles: true }));
  }
  else if (action === 'source-back') go('obras');
  else if (action === 'edit-source') openSourceEdit();
  else if (action === 'delete-source') confirmSourceDelete();
  else if (action === 'confirm-delete-source') deleteSelectedSource();
  else if (action === 'source-create') openEditor(state.selectedSource);
  else if (action === 'source-edit-entry') openSourceEntryEdit(button.dataset.id);
  else if (action === 'ficha-new-tag') { document.querySelector('#ficha-tag-composer').hidden = false; document.querySelector('#ficha-tag-input').focus(); }
  else if (action === 'ficha-add-tag') addSourceEntryTag();
  else if (action === 'ficha-remove-tag') { state.sourceEntryDraft.tags.splice(Number(button.dataset.index), 1); refreshSourceEntryTags(); document.querySelector('#ficha-tag-error').textContent = ''; document.querySelector('.ficha-new-tag').focus({ preventScroll: true }); }
  else if (action === 'ficha-delete') confirmSourceEntryDelete();
  else if (action === 'ficha-cancel-delete') showSourceEntryEdit();
  else if (action === 'ficha-confirm-delete') {
    state.reflections = state.reflections.filter(r => r.id !== state.sourceEntryDraft.id);
    const persisted = storage.set('arquivo-reflections-v1', state.reflections);
    const draft = storage.get('arquivo-entry-draft-v2', null);
    if (draft?.id === state.sourceEntryDraft.id) { state.editor = null; storage.set('arquivo-entry-draft-v2', null); }
    finishSourceEntryChange('Ficha excluída do Bloom.', persisted);
  }
  else if (action === 'source-filter') { state.sourceTheme = button.dataset.tag; refreshSourceEntries(); }
  else if (action === 'source-toggle-search') {
    state.sourceSearchOpen = !state.sourceSearchOpen;
    document.querySelector('#source-entry-search-wrap').hidden = !state.sourceSearchOpen;
    button.setAttribute('aria-expanded', state.sourceSearchOpen);
    if (state.sourceSearchOpen) document.querySelector('#source-entry-search').focus();
    else { state.sourceEntryQuery = ''; document.querySelector('#source-entry-search').value = ''; refreshSourceEntries(); }
  }
  else if (action === 'source-clear-entry-search') { state.sourceEntryQuery = ''; document.querySelector('#source-entry-search').value = ''; refreshSourceEntries(); document.querySelector('#source-entry-search').focus(); }
  else if (action === 'clear-source-search') { state.sourceQuery = ''; const field = document.querySelector('#source-search'); field.value = ''; refreshSources(); field.focus(); }
  else if (action === 'all-themes') { state.themeQuery = ''; go('temas'); }
  else if (action === 'new-theme') openNewTheme();
  else if (action === 'cancel-new-theme') { state.newThemeDraft = { name: '', description: '' }; go(state.newThemeReturn); }
  else if (action === 'theme-details') openTheme(button.dataset.tag);
  else if (action === 'theme-back') go('temas');
  else if (action === 'theme-source') openThemeSource(button.dataset.id);
  else if (action === 'edit-theme') openThemeEdit();
  else if (action === 'delete-theme') confirmThemeDelete();
  else if (action === 'confirm-delete-theme') deleteSelectedTheme();
  else if (action === 'theme-create') openEditor(button.dataset.book, '', state.selectedTheme);
  else if (action === 'theme-edit-entry') openEditor('', button.dataset.id, state.selectedTheme);
  else if (action === 'clear-theme-search') { state.themeQuery = ''; const field = document.querySelector('#theme-search'); field.value = ''; refreshThemes(); field.focus(); }
  else if (action === 'new-word') openNewWord();
  else if (action === 'cancel-new-word') { state.newWordDraft = { word: '', synonyms: '', description: '' }; go(state.newWordReturn); }
  else if (action === 'word-details') openWord(button.dataset.id);
  else if (action === 'word-back') go('palavras');
  else if (action === 'edit-word') openWordEdit();
  else if (action === 'delete-word') confirmWordDelete();
  else if (action === 'confirm-delete-word') deleteSelectedWord();
  else if (action === 'clear-vocabulary-search') { state.vocabularyQuery = ''; const field = document.querySelector('#vocabulary-search'); field.value = ''; refreshWords(); field.focus(); }
  else if (action === 'create') { if (state.route !== 'criar' || !button.matches('a')) openEditor(button.dataset.book); }
  else if (action === 'edit') openEditor('', button.dataset.id, state.route === 'tema' ? state.selectedTheme : '');
  else if (action === 'entry-back') {
    if (state.editor.context?.sourceId) { state.selectedSource = state.editor.context.sourceId; state.sourceTheme = state.editor.context.filter || ''; }
    go(state.editorReturn);
  }
  else if (action === 'add-entry-tag') {
    openModal('Adicionar tema', `<form class="modal-body" id="entry-theme-form" novalidate><label class="field-label" for="entry-theme-input">Nome do tema</label><input id="entry-theme-input" name="tag" placeholder="Digite um tema" list="entry-theme-options" autocomplete="off" maxlength="50" required><datalist id="entry-theme-options">${allThemes().map(tag => `<option value="${esc(tag)}">`).join('')}</datalist><p class="field-error" id="entry-theme-error" role="alert"></p><div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancelar</button><button type="submit" class="primary-button">Adicionar tema</button></div></form>`);
    document.querySelector('#entry-theme-input').focus();
  }
  else if (action === 'remove-entry-tag') { state.editor.tags.splice(Number(button.dataset.index), 1); document.querySelector('#entry-tags').innerHTML = entryTagsHTML(); autosaveEntry(); document.querySelector('.entry-add-theme').focus({ preventScroll: true }); }
  else if (action === 'format-entry') formatEntry(button.dataset.format);
  else if (action === 'entry-help') openModal('Perguntas para começar', `<div class="modal-body"><p class="modal-description">Volte ao que a leitura deixou em você.</p><ul class="entry-prompts"><li>Que ideia chamou sua atenção neste trecho?</li><li>Onde ela encontra uma experiência sua?</li><li>Com que outra leitura você faria uma conexão?</li></ul><button class="primary-button" data-action="close-modal">Voltar à escrita</button></div>`, 'Inspiração para refletir');
  else if (action === 'copy-quote') {
    const field = document.querySelector('#reflection-quote');
    if (!field.value.trim()) { toast('Adicione um trecho da obra para copiar.'); return; }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(field.value).then(() => toast('Trecho copiado.')).catch(() => { field.focus(); field.select(); toast('Trecho selecionado. Use a opção Copiar do navegador.'); });
    else { field.focus(); field.select(); toast('Trecho selecionado. Use a opção Copiar do navegador.'); }
  }
  else if (action === 'close-modal') modal.close();
  else if (action === 'book') openBook(button.dataset.id);
  else if (action === 'reflection') openReflection(button.dataset.id);
  else if (action === 'profile') openProfile();
  else if (action === 'profile-edit-name') {
    document.querySelector('#profile-name-form').hidden = false;
    const field = document.querySelector('#profile-name');
    field.value = state.profileName;
    field.removeAttribute('aria-invalid');
    document.querySelector('#profile-name-error').textContent = '';
    button.setAttribute('aria-expanded', 'true');
    field.focus(); field.select();
  }
  else if (action === 'profile-cancel-edit') closeProfileNameEditor();
  else if (action === 'export-archive') exportArchive();
  else if (action === 'import-archive') document.querySelector('#archive-import-file').click();
  else if (action === 'confirm-archive-import') importArchive();
  else if (action === 'cancel-archive-import') { state.pendingArchiveImport = null; document.querySelector('#archive-import-preview').hidden = true; document.querySelector('#archive-import-error').textContent = ''; modal.querySelector('[data-action="import-archive"]').focus(); }
  else if (action === 'logout') { modal.close(); state.query = ''; state.activeTheme = ''; go('login'); toast('Até a próxima leitura.'); }
  else if (action === 'filter') { state.activeTheme = state.activeTheme === button.dataset.tag ? '' : button.dataset.tag; if (state.route === 'inicio') refreshHome(); else { const scroll = window.scrollY; app.innerHTML = archiveHTML(); window.scrollTo(0, scroll); app.querySelector(`[data-tag="${CSS.escape(button.dataset.tag)}"]`)?.focus({ preventScroll: true }); } }
  else if (action === 'clear-filter') { state.activeTheme = ''; if (state.route === 'inicio') refreshHome(); else app.innerHTML = archiveHTML(); }
  else if (action === 'open-theme') openTheme(button.dataset.tag);
  else if (action === 'clear-search') { state.query = ''; const field = document.querySelector('#search'); field.value = ''; refreshHome(); field.focus(); }
});
document.addEventListener('input', (event) => {
  const field = event.target;
  const errorId = fieldErrorIds[field.id] || formErrorIds[field.closest('form')?.id];
  if (errorId) clearFieldError(field, errorId);
  if (field.closest('#login-form')) {
    const form = field.closest('#login-form');
    state.loginDraft = { email: form.elements.email.value, name: form.elements.name.value, username: form.elements.username.value };
    if (field.id === 'email') updateLoginState();
  }
  if (field.id === 'search') { state.query = field.value; refreshHome(); }
  if (field.id === 'source-search') { state.sourceQuery = field.value; refreshSources(); }
  if (field.id === 'source-entry-search') { state.sourceEntryQuery = field.value; refreshSourceEntries(); }
  if (field.id === 'theme-search') { state.themeQuery = field.value; refreshThemes(); }
  if (field.id === 'entry-search') { state.entryQuery = field.value; refreshEntries();
  }
  if (field.id === 'vocabulary-search') { state.vocabularyQuery = field.value; refreshWords(); }
  if (field.closest('#vocabulary-form')) {
    const form = field.closest('#vocabulary-form');
    state.newWordDraft = { word: form.elements.word.value, synonyms: form.elements.synonyms.value, description: form.elements.description.value };
    document.querySelector('#new-vocabulary-word-count').textContent = `${state.newWordDraft.word.length}/80`;
    document.querySelector('#new-vocabulary-synonyms-count').textContent = `${state.newWordDraft.synonyms.length}/280`;
    document.querySelector('#new-vocabulary-description-count').textContent = `${state.newWordDraft.description.length}/500`;
  }
  if (field.closest('#vocabulary-edit-form')) {
    document.querySelector('#vocabulary-word-count').textContent = `${document.querySelector('#edit-vocabulary-word').value.length}/80`;
    document.querySelector('#vocabulary-synonyms-count').textContent = `${document.querySelector('#edit-vocabulary-synonyms').value.length}/280`;
    document.querySelector('#vocabulary-description-count').textContent = `${document.querySelector('#edit-vocabulary-description').value.length}/500`;
  }
  if (field.closest('#theme-form')) {
    const form = field.closest('#theme-form');
    state.newThemeDraft = { name: form.elements.name.value, description: form.elements.description.value };
    document.querySelector('#new-theme-name-count').textContent = `${state.newThemeDraft.name.length}/40`;
    document.querySelector('#new-theme-description-count').textContent = `${state.newThemeDraft.description.length}/280`;
  }
  if (field.closest('#theme-edit-form')) {
    document.querySelector('#theme-name-count').textContent = `${document.querySelector('#edit-theme-name').value.length}/40`;
    document.querySelector('#theme-description-count').textContent = `${document.querySelector('#edit-theme-description').value.length}/280`;
  }
  if (field.closest('#source-form')) {
    const form = field.closest('#source-form');
    state.newSourceDraft = { title: form.elements.title.value, author: form.elements.author.value, bibliography: form.elements.bibliography.value, immediate: form.elements.immediate.checked };
    document.querySelectorAll('[data-action="suggest-source-author"]').forEach(button => button.setAttribute('aria-pressed', normalize(state.newSourceDraft.author) === normalize(button.dataset.author)));
  }
  if (field.closest('#source-entry-edit-form')) syncSourceEntryDraft();
  if (field.id === 'ficha-tag-input') document.querySelector('#ficha-tag-error').textContent = '';
  if (field.classList.contains('otp-digit')) {
    const inputs = [...document.querySelectorAll('.otp-digit')];
    const index = Number(field.dataset.index);
    const digits = field.value.replace(/\D/g, '');
    field.value = digits[0] || '';
    if (digits.length > 1) { const offset = digits.length >= 6 ? 0 : index; digits.slice(0, 6 - offset).split('').forEach((digit, i) => { inputs[offset + i].value = digit; }); inputs[Math.min(5, offset + digits.length)].focus(); }
    else if (digits && index < 5) inputs[index + 1].focus();
    inputs.forEach((el) => { el.classList.remove('invalid'); el.removeAttribute('aria-invalid'); });
    document.querySelector('#code-error').textContent = '';
  }
  if (field.closest('#reflection-form')) {
    autosaveEntry();
  }
});
document.addEventListener('change', (event) => {
  if (event.target.id === 'archive-import-file') prepareArchiveImport(event.target);
  if (event.target.id === 'ficha-book') {
    syncSourceEntryDraft();
    const source = bookFor(state.sourceEntryDraft.bookId);
    document.querySelector('#ficha-book-title').textContent = source?.title || 'Selecionar fonte';
    document.querySelector('#ficha-book-author').textContent = source?.author || '';
    clearFieldError(event.target, 'ficha-edit-error');
  }
  if (event.target.id === 'reflection-book') event.target.dispatchEvent(new Event('input', { bubbles: true }));
  if (event.target.id === 'source-sort') { state.sourceSort = event.target.value; refreshSources(); }
  if (event.target.id === 'source-entry-sort') { state.sourceEntrySort = event.target.value; refreshSourceEntries(); }
  if (event.target.id === 'theme-sort') { state.themeSort = event.target.value; refreshThemes(); }
  if (event.target.id === 'entry-sort') { state.entrySort = event.target.value; refreshEntries(); }
  if (event.target.id === 'vocabulary-sort') { state.vocabularySort = event.target.value; refreshWords(); }
});
document.addEventListener('keydown', (event) => {
  const field = event.target;
  const menu = document.querySelector('.create-menu[open]');
  if (event.key === 'Escape' && menu && !modal.open) { menu.open = false; menu.querySelector('summary').focus({ preventScroll: true }); }
  if (field.id === 'ficha-tag-input' && event.key === 'Enter') { event.preventDefault(); addSourceEntryTag(); return; }
  if (!field.classList.contains('otp-digit')) return;
  const inputs = [...document.querySelectorAll('.otp-digit')];
  const index = Number(field.dataset.index);
  if (event.key === 'Backspace' && !field.value && index > 0) { event.preventDefault(); inputs[index - 1].value = ''; inputs[index - 1].focus(); }
  if (event.key === 'ArrowLeft' && index > 0) { event.preventDefault(); inputs[index - 1].focus(); }
  if (event.key === 'ArrowRight' && index < 5) { event.preventDefault(); inputs[index + 1].focus(); }
});
document.addEventListener('focusin', (event) => { if (event.target.classList.contains('otp-digit')) event.target.select(); });
document.addEventListener('paste', (event) => {
  if (!event.target.classList.contains('otp-digit')) return;
  const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
  if (!digits) return;
  event.preventDefault();
  event.target.value = digits;
  event.target.dispatchEvent(new Event('input', { bubbles: true }));
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!Object.hasOwn(formHandlers, form.id)) return;
  event.preventDefault();
  formHandlers[form.id](form);
});
modal.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close();
});
modal.addEventListener('close', () => {
  if (state.opener?.isConnected) state.opener.focus({ preventScroll: true });
});
window.addEventListener('hashchange', render);
// Form actions own validation, persistence and the return to their workflow.
