'use strict';

import { seedBooks, seedReflections, seedThemes } from './lib/seed-data.js';
import { storage } from './lib/storage.js';
import { validEmail, validUsername, emailKey, blankSource } from './lib/utils.js';

export const state = {};

export function initAppState() {
  const storedThemes = storage.get('arquivo-themes-v1', []);
  state.customThemes = Array.isArray(storedThemes) ? storedThemes.filter(t => t && typeof t.name === 'string' && t.name.trim() && typeof t.description === 'string').map(t => ({ name: t.name.trim(), description: t.description, addedAt: Number(t.addedAt) || 0, originalName: typeof t.originalName === 'string' ? t.originalName : '' })) : [];
  const storedDeletedThemes = storage.get('arquivo-deleted-themes-v1', []);
  state.deletedThemes = Array.isArray(storedDeletedThemes) ? storedDeletedThemes.filter(t => typeof t === 'string') : [];
  const storedSources = storage.get('arquivo-sources-v1', []);
  const customSources = Array.isArray(storedSources) ? storedSources.filter(b => b && typeof b.id === 'string' && (/^source-[a-z0-9-]+$/.test(b.id) || seedBooks.some(seed => seed.id === b.id)) && typeof b.title === 'string' && b.title.trim() && typeof b.author === 'string' && b.author.trim()).map(b => ({ ...seedBooks.find(seed => seed.id === b.id), id: b.id, title: b.title, author: b.author, year: typeof b.year === 'string' ? b.year : '', description: typeof b.description === 'string' ? b.description : '', bibliography: typeof b.bibliography === 'string' ? b.bibliography : '', color: seedBooks.find(seed => seed.id === b.id)?.color || '#343126', addedAt: Number(b.addedAt) || 0 })) : [];
  const storedDeletedSources = storage.get('arquivo-deleted-sources-v1', []);
  state.deletedSources = Array.isArray(storedDeletedSources) ? storedDeletedSources.filter(id => typeof id === 'string') : [];
  state.books = [...customSources.filter((b, i, list) => !seedBooks.some(seed => seed.id === b.id) && list.findIndex(other => other.id === b.id) === i), ...seedBooks.map(seed => customSources.find(b => b.id === seed.id) || seed)].filter(b => !state.deletedSources.includes(b.id));
  const saved = storage.get('arquivo-reflections-v1', seedReflections);
  state.reflections = Array.isArray(saved) && saved.every((r) => r && typeof r.id === 'string' && typeof r.text === 'string' && state.books.some((b) => b.id === r.bookId) && Array.isArray(r.tags) && r.tags.every((t) => typeof t === 'string')) ? saved : [...seedReflections];
  // Add sample connections once, keeping subsequent edits and removals intact.
  if (!storage.get('arquivo-theme-flow-demo-v1', false)) {
    const examples = [
      ['primeiro', 'Capítulo XXI · Pág. 112', 'A recusa em viver o afeto no instante em que ele se oferece decorre do receio da entrega. A leitura me faz pensar nas decisões que adiamos esperando uma certeza impossível.', 'Hesitação', 'Amanhã serei feliz! Mas a felicidade não tem o dia de amanhã; não pensa no futuro; ela só tem o presente…'],
      ['primeiro', 'Capítulo XV · Pág. 84', 'Há encontros que só compreendemos depois da despedida. A memória guarda o que poderia ter sido, enquanto a vida continua a pedir presença.', 'Memória'],
      ['primeiro', 'Capítulo XXII · Pág. 119', 'Quando a coragem chega tarde, resta aprender com a ausência. Quero reconhecer os momentos em que uma palavra simples pode mudar o rumo de uma relação.', 'Tempo'],
      ['assia', 'Capítulo IX · Pág. 48', 'O silêncio também responde. Deixar uma conversa para depois pode transformar uma possibilidade de encontro numa distância difícil de atravessar.', 'Hesitação'],
      ['assia', 'Capítulo XVI · Pág. 76', 'A dúvida parece proteger, mas cobra seu preço. Nesta leitura, vejo como o medo de escolher pode acabar escolhendo por nós.', 'Liberdade'],
      ['assia', 'Capítulo XX · Pág. 95', 'A lembrança de uma chance perdida insiste porque continua fazendo perguntas. O que eu faria hoje com a coragem que não tive naquele dia?', 'Memória'],
      ['ivan', 'Capítulo VI · Pág. 62', 'A rotina pode esconder aquilo que realmente desejamos. A consciência de que o tempo termina me leva a perguntar que encontros merecem mais atenção agora.', 'Finitude'],
      ['ivan', 'Capítulo IX · Pág. 88', 'Uma vida guiada pela aprovação alheia pode deixar pouco espaço para a própria voz. Ainda há tempo para escutar o que fui adiando.', 'Autenticidade'],
      ['lear', 'Ato V · Cena III', 'O reconhecimento tardio não desfaz a perda, mas muda a maneira de olhar para ela. O afeto precisa encontrar uma forma de ser dito enquanto há encontro.', 'Amor'],
      ['primeiro', 'Capítulo II · Pág. 18', 'O primeiro afeto altera a maneira de observar o cotidiano. Pequenos gestos passam a carregar uma intensidade que antes eu não percebia.', 'Amor'],
    ].map(([bookId, reference, text, tag, quote = ''], i) => ({ id: `theme-demo-${i + 1}`, bookId, reference, text, quote, tags: i === 9 ? [tag] : ['Oportunidades perdidas', tag], date: '2026-10-06' }));
    state.reflections.push(...examples.filter(example => state.books.some(b => b.id === example.bookId) && !state.reflections.some(r => r.id === example.id)));
    if (storage.set('arquivo-reflections-v1', state.reflections)) storage.set('arquivo-theme-flow-demo-v1', true);
  }
  if (!storage.get('arquivo-source-flow-demo-v1', false)) {
    const examples = [
      ['Ato II — O juramento', 'O sacrifício como único ato de soberania restante perante a rigidez moral do sertão.', ['Amor', 'Sacrifício'], 'Se hei de perder-te para a vida mundana, que me reste ao menos a certeza de que a alma foi fiel até a terra se fechar.'],
      ['Ato III — O confronto na ribeira', 'A traição como imperativo trágico imposto pelo medo da exclusão comunitária.', ['Traição', 'Ingratidão'], 'O punhal que me fere dói menos que os olhos com que me miraste ao me entregar.'],
      ['Ato I — O primeiro encontro', 'O despertar do amor como revelação trágica e prenúncio de comunhão inexorável.', ['Amor', 'Destino'], 'Antes de ver-te, Isaura, não sabia que a luz pudesse arder sem queimar…'],
      ['Pág. 42 — A espera', 'A espera altera o valor de cada encontro. O afeto cresce entre pequenos gestos e as expectativas que depositamos no outro.', ['Amor', 'Esperança']],
      ['Pág. 58 — A escolha', 'Uma escolha íntima também transforma as relações ao redor. A liberdade de amar encontra os limites das lealdades herdadas.', ['Amor', 'Liberdade']],
      ['Pág. 75 — A despedida', 'A despedida revela o que a convivência tornava invisível. O amor permanece na maneira de recordar os dias partilhados.', ['Amor', 'Memória']],
      ['Pág. 89 — A promessa', 'Renunciar pode ser uma forma de manter uma promessa. Pergunto-me quando essa fidelidade fortalece a vida e quando a reduz.', ['Sacrifício', 'Destino']],
      ['Pág. 103 — A lealdade', 'As lealdades entram em conflito e nenhuma decisão parece sem custo. O sacrifício mostra os valores que escolhemos preservar.', ['Sacrifício', 'Liberdade']],
      ['Pág. 116 — A ruptura', 'Uma confiança desfeita muda também a lembrança do passado. Os mesmos gestos passam a ser vistos sob uma nova luz.', ['Traição', 'Memória']],
      ['Pág. 128 — O silêncio', 'A traição nem sempre começa num gesto evidente. Também pode surgir no silêncio de quem poderia ter estado presente.', ['Traição', 'Hesitação']],
      ['Pág. 141 — O reconhecimento', 'A ausência de reconhecimento torna mais difícil sustentar a entrega. Esta leitura me faz pensar no cuidado como uma troca de atenção.', ['Ingratidão', 'Solidão']],
      ['Pág. 153 — O destino', 'O que chamamos de destino talvez reúna circunstâncias e escolhas. A leitura deixa espaço para imaginar outros caminhos possíveis.', ['Destino', 'Tempo']],
    ].map(([reference, text, tags, quote = ''], i) => ({ id: `source-demo-${i + 1}`, bookId: 'amor', reference, text, tags, quote, date: '2026-10-12' }));
    state.reflections.push(...examples.filter(example => state.books.some(b => b.id === example.bookId) && !state.reflections.some(r => r.id === example.id)));
    if (storage.set('arquivo-reflections-v1', state.reflections)) storage.set('arquivo-source-flow-demo-v1', true);
  }
  state.email = storage.get('arquivo-email-v1', 'leitor@exemplo.com');
  if (typeof state.email !== 'string') state.email = 'leitor@exemplo.com';
  state.profileName = storage.get('arquivo-profile-name-v1', 'Leitor Bloom');
  state.profileName = typeof state.profileName === 'string' && state.profileName.trim() ? state.profileName.trim().slice(0, 80) : 'Leitor Bloom';
  if (state.email === 'leitor@exemplo.com' && state.profileName === 'Leitor do Arquivo') state.profileName = 'Leitor Bloom';
  const storedAccounts = storage.get('arquivo-accounts-v1', null);
  state.accounts = Array.isArray(storedAccounts) ? storedAccounts.filter(account => account && typeof account.email === 'string' && validEmail(account.email) && typeof account.name === 'string' && account.name.trim() && account.name.length <= 80 && typeof account.username === 'string' && validUsername(account.username)).map(account => ({ email: emailKey(account.email), name: account.name.trim(), username: account.username.toLowerCase() })) : [];
  state.accounts.forEach(account => {
    if (account.email === 'leitor@exemplo.com' && account.name === 'Leitor do Arquivo') account.name = 'Leitor Bloom';
  });
  if (!state.accounts.some(account => account.email === 'leitor@exemplo.com')) state.accounts.push({ email: 'leitor@exemplo.com', name: emailKey(state.email) === 'leitor@exemplo.com' ? state.profileName : 'Leitor Bloom', username: 'leitor.bloom' });
  // Preserve access for an e-mail used before the prototype had account registration.
  if (storedAccounts === null && validEmail(state.email) && !state.accounts.some(account => account.email === emailKey(state.email))) state.accounts.push({ email: emailKey(state.email), name: state.profileName, username: 'leitor.anterior' });
  storage.set('arquivo-accounts-v1', state.accounts);
  state.pendingAccess = storage.get('arquivo-pending-access-v1', null);
  if (!state.pendingAccess || typeof state.pendingAccess.email !== 'string' || !validEmail(state.pendingAccess.email) || typeof state.pendingAccess.name !== 'string' || !state.pendingAccess.name.trim() || typeof state.pendingAccess.username !== 'string' || !validUsername(state.pendingAccess.username) || typeof state.pendingAccess.isNew !== 'boolean') state.pendingAccess = null;
  state.loginDraft = { email: state.pendingAccess?.email || (state.email !== 'leitor@exemplo.com' ? state.email : ''), name: state.pendingAccess?.isNew ? state.pendingAccess.name : '', username: state.pendingAccess?.isNew ? state.pendingAccess.username : '' };
  state.route = 'login';
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
