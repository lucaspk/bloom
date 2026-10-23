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
document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const DEMO_CODE = '482619';
const seedBooks = [
  { id: 'amor', title: 'A História do Amor de Fernando e Isaura', author: 'Ariano Suassuna', year: '1956', bibliography: '1956, Romance / Dramaturgia, Ed. José Olympio', color: '#42382a', description: 'Uma história de amor e destino no sertão. O encontro entre Fernando e Isaura dá forma a uma reflexão sobre desejo, compromisso e renúncia.' },
  { id: 'primeiro', title: 'Primeiro Amor', author: 'Ivan Turguêniev', year: '1860', color: '#30372f', description: 'A descoberta do amor na juventude, contada pela memória de um narrador que revisita seus primeiros encontros com o afeto e a desilusão.' },
  { id: 'assia', title: 'Ássia', author: 'Ivan Turguêniev', year: '1858', color: '#34372f', description: 'Uma leitura sobre o primeiro encontro com o amor, a hesitação e as escolhas que permanecem na memória.' },
  { id: 'ivan', title: 'A Morte de Ivan Ilitch', author: 'Liev Tolstói', year: '1886', color: '#39303b', description: 'Diante da finitude, uma vida aparentemente bem-sucedida revela suas contradições. Uma leitura sobre o tempo, a autenticidade e o que torna uma vida significativa.' },
  { id: 'lear', title: 'Rei Lear', author: 'William Shakespeare', year: '1606', color: '#39302b', description: 'Poder, afeto e reconhecimento se cruzam em uma tragédia de perdas e descobertas.' },
  { id: 'bras', title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', year: '1881', color: '#36382f', description: 'A memória de uma vida narrada com ironia, observação e perguntas sobre a condição humana.' },
  { id: 'crime', title: 'Crime e Castigo', author: 'Fiódor Dostoiévski', year: '1866', color: '#3d2e30', description: 'Uma investigação literária da culpa, da consciência e dos limites das próprias convicções.' },
  { id: 'desassossego', title: 'Livro do Desassossego', author: 'Fernando Pessoa', year: '1982', color: '#29383e', description: 'Fragmentos de uma vida interior: o cotidiano, os sonhos e a inquietação de quem transforma a observação em pensamento.' },
];
const seedReflections = [
  { id: 'r1', bookId: 'primeiro', text: 'O adiamento do afeto não preserva a esperança; converte-a em remorso silencioso diante da irreversibilidade do tempo. Talvez hesitar também seja uma escolha — e toda escolha tenha algo de despedida.', tags: ['Oportunidades perdidas', 'Hesitação'], date: '2026-10-12' },
  { id: 'r2', bookId: 'amor', text: 'A tragédia nordestina eleva o compromisso moral e a renúncia amorosa a uma força cósmica. O sacrifício deixa de ser apenas individual: torna-se uma linguagem para compreender o destino.', tags: ['Sacrifício', 'Destino'], date: '2026-10-11' },
  { id: 'r3', bookId: 'ivan', text: 'Ivan percebe tarde que viveu segundo a medida dos outros. A pergunta que a leitura deixa é simples e incômoda: quanto do meu cotidiano corresponde ao que considero uma vida bem vivida?', tags: ['Finitude', 'Autenticidade'], date: '2026-10-09' },
  { id: 'r4', bookId: 'desassossego', text: 'Há uma forma de atenção que transforma o banal em descoberta. Escrever talvez seja isso: demorar-se no que, sem palavras, passaria despercebido.', tags: ['Amor', 'Autenticidade'], date: '2026-10-07' },
];
const seedThemes = [
  { name: 'Oportunidades perdidas', description: 'O peso do instante decisivo não vivido e o remorso que a passagem irrevogável do tempo consolida.' },
  { name: 'Sacrifício', description: 'O ato soberano de renúncia pessoal em nome de lealdades ou valores inegociáveis.' },
  { name: 'Amor', description: 'Tensão entre revelação do afeto e renúncia trágica diante de imperativos morais.' },
  { name: 'Traição', description: 'Ruptura da fidelidade como desencadeador do desfecho trágico.' },
  { name: 'Ingratidão', description: 'A resposta indiferente ou cruel ao zelo e dedicação do outro.' },
  { name: 'Hesitação', description: 'A paralisia da vontade quando a ação é o único remédio.' },
  { name: 'Destino', description: 'O encontro entre as escolhas pessoais e as forças que parecem conduzir uma vida.' },
  { name: 'Finitude', description: 'A consciência do tempo que termina e transforma o sentido de estar vivo.' },
  { name: 'Autenticidade', description: 'A busca por uma vida que corresponda aos próprios valores e desejos.' },
  { name: 'Tempo', description: 'O intervalo entre o que vivemos, o que lembramos e o que ainda esperamos.' },
  { name: 'Memória', description: 'As marcas do vivido e as histórias que construímos ao recordar.' },
  { name: 'Solidão', description: 'A experiência de estar consigo e a distância entre uma pessoa e o mundo.' },
  { name: 'Liberdade', description: 'A possibilidade de escolher e a responsabilidade pelo caminho escolhido.' },
  { name: 'Esperança', description: 'O que sustenta a imaginação de um futuro possível diante da incerteza.' },
];
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } },
};
const storedThemes = storage.get('arquivo-themes-v1', []);
let customThemes = Array.isArray(storedThemes) ? storedThemes.filter(t => t && typeof t.name === 'string' && t.name.trim() && typeof t.description === 'string').map(t => ({ name: t.name.trim(), description: t.description, addedAt: Number(t.addedAt) || 0, originalName: typeof t.originalName === 'string' ? t.originalName : '' })) : [];
const storedDeletedThemes = storage.get('arquivo-deleted-themes-v1', []);
let deletedThemes = Array.isArray(storedDeletedThemes) ? storedDeletedThemes.filter(t => typeof t === 'string') : [];
const storedSources = storage.get('arquivo-sources-v1', []);
const customSources = Array.isArray(storedSources) ? storedSources.filter(b => b && typeof b.id === 'string' && (/^source-[a-z0-9-]+$/.test(b.id) || seedBooks.some(seed => seed.id === b.id)) && typeof b.title === 'string' && b.title.trim() && typeof b.author === 'string' && b.author.trim()).map(b => ({ ...seedBooks.find(seed => seed.id === b.id), id: b.id, title: b.title, author: b.author, year: typeof b.year === 'string' ? b.year : '', description: typeof b.description === 'string' ? b.description : '', bibliography: typeof b.bibliography === 'string' ? b.bibliography : '', color: seedBooks.find(seed => seed.id === b.id)?.color || '#343126', addedAt: Number(b.addedAt) || 0 })) : [];
const storedDeletedSources = storage.get('arquivo-deleted-sources-v1', []);
let deletedSources = Array.isArray(storedDeletedSources) ? storedDeletedSources.filter(id => typeof id === 'string') : [];
let books = [...customSources.filter((b, i, list) => !seedBooks.some(seed => seed.id === b.id) && list.findIndex(other => other.id === b.id) === i), ...seedBooks.map(seed => customSources.find(b => b.id === seed.id) || seed)].filter(b => !deletedSources.includes(b.id));
let saved = storage.get('arquivo-reflections-v1', seedReflections);
let reflections = Array.isArray(saved) && saved.every((r) => r && typeof r.id === 'string' && typeof r.text === 'string' && books.some((b) => b.id === r.bookId) && Array.isArray(r.tags) && r.tags.every((t) => typeof t === 'string')) ? saved : [...seedReflections];
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
  reflections.push(...examples.filter(example => books.some(b => b.id === example.bookId) && !reflections.some(r => r.id === example.id)));
  if (storage.set('arquivo-reflections-v1', reflections)) storage.set('arquivo-theme-flow-demo-v1', true);
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
  reflections.push(...examples.filter(example => books.some(b => b.id === example.bookId) && !reflections.some(r => r.id === example.id)));
  if (storage.set('arquivo-reflections-v1', reflections)) storage.set('arquivo-source-flow-demo-v1', true);
}
let email = storage.get('arquivo-email-v1', 'leitor@exemplo.com');
if (typeof email !== 'string') email = 'leitor@exemplo.com';
let profileName = storage.get('arquivo-profile-name-v1', 'Leitor Bloom');
profileName = typeof profileName === 'string' && profileName.trim() ? profileName.trim().slice(0, 80) : 'Leitor Bloom';
if (email === 'leitor@exemplo.com' && profileName === 'Leitor do Arquivo') profileName = 'Leitor Bloom';
const emailKey = value => String(value).trim().toLowerCase();
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validUsername = value => /^[a-z0-9][a-z0-9._-]{2,29}$/i.test(value);
const storedAccounts = storage.get('arquivo-accounts-v1', null);
let accounts = Array.isArray(storedAccounts) ? storedAccounts.filter(account => account && typeof account.email === 'string' && validEmail(account.email) && typeof account.name === 'string' && account.name.trim() && account.name.length <= 80 && typeof account.username === 'string' && validUsername(account.username)).map(account => ({ email: emailKey(account.email), name: account.name.trim(), username: account.username.toLowerCase() })) : [];
accounts.forEach(account => {
  if (account.email === 'leitor@exemplo.com' && account.name === 'Leitor do Arquivo') account.name = 'Leitor Bloom';
});
if (!accounts.some(account => account.email === 'leitor@exemplo.com')) accounts.push({ email: 'leitor@exemplo.com', name: emailKey(email) === 'leitor@exemplo.com' ? profileName : 'Leitor Bloom', username: 'leitor.bloom' });
// Preserve access for an e-mail used before the prototype had account registration.
if (storedAccounts === null && validEmail(email) && !accounts.some(account => account.email === emailKey(email))) accounts.push({ email: emailKey(email), name: profileName, username: 'leitor.anterior' });
storage.set('arquivo-accounts-v1', accounts);
const accountFor = value => accounts.find(account => account.email === emailKey(value));
let pendingAccess = storage.get('arquivo-pending-access-v1', null);
if (!pendingAccess || typeof pendingAccess.email !== 'string' || !validEmail(pendingAccess.email) || typeof pendingAccess.name !== 'string' || !pendingAccess.name.trim() || typeof pendingAccess.username !== 'string' || !validUsername(pendingAccess.username) || typeof pendingAccess.isNew !== 'boolean') pendingAccess = null;
let loginDraft = { email: pendingAccess?.email || (email !== 'leitor@exemplo.com' ? email : ''), name: pendingAccess?.isNew ? pendingAccess.name : '', username: pendingAccess?.isNew ? pendingAccess.username : '' };
let route = 'login';
let query = '';
let sourceQuery = '';
let sourceSort = 'recentes';
let themeQuery = '';
let themeSort = 'fichas';
let selectedTheme = '';
let selectedSource = '';
let sourceTheme = '';
let sourceEntryQuery = '';
let sourceEntrySort = 'recentes';
let sourceSearchOpen = false;
let entryQuery = '';
let entrySort = 'recentes';
let newThemeDraft = { name: '', description: '' };
let newThemeReturn = 'temas';
const blankSource = () => ({ title: '', author: '', bibliography: '', immediate: true });
let newSourceDraft = blankSource();
let newSourceReturn = 'obras';
let pendingSourceSheet = null;
let activeTheme = '';
let resendUntil = 0;
let resendTimer;
let toastTimer;
let authTimer;
let opener;
let editor = null;
let sourceEntryDraft = null;
let pendingArchiveImport = null;
let autosaveTimer;
let editorReturn = 'inicio';
const blankEntry = () => ({ id: '', title: '', bookId: '', reference: '', quote: '', text: '', tags: [] });

// Reusable view fragments: their inputs are data, and dynamic text is escaped here.
const countLabel = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;
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
const fieldErrorIds = {
  email: 'email-error', 'signup-name': 'signup-name-error',
  'signup-username': 'signup-username-error', 'profile-name': 'profile-name-error',
};
const formErrorIds = {
  'theme-form': 'theme-error', 'theme-edit-form': 'theme-edit-error',
  'source-form': 'source-error', 'source-edit-form': 'source-edit-error',
  'source-entry-edit-form': 'ficha-edit-error', 'reflection-form': 'reflection-error',
};
function showDialog(content, className = '') {
  opener = document.activeElement;
  modal.className = className;
  modal.innerHTML = content;
  if (!modal.open) modal.showModal();
}
function formatText(value) {
  return esc(value).replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/^&gt; (.+)$/gm, '<span class="inline-quote">$1</span>');
}
const bookFor = (id) => books.find((b) => b.id === id);
const countFor = (id) => reflections.filter((r) => r.bookId === id).length;
const tagName = (tag) => '#' + tag.trim().split(/\s+/).filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join('');
function themeCatalog() {
  const seeds = seedThemes.filter(t => !deletedThemes.includes(normalize(t.name))).map(t => ({ ...t, originalName: t.name, ...customThemes.find(custom => custom.originalName === t.name) }));
  const entries = [...seeds, ...customThemes.filter(t => !t.originalName), ...reflections.flatMap(r => r.tags).map(name => ({ name, description: '' }))];
  const seen = new Set();
  return entries.filter(t => { const key = normalize(t.name); if (seen.has(key)) return false; seen.add(key); return true; });
}
const allThemes = () => themeCatalog().map(t => t.name);
const recordsForTheme = name => reflections.filter(r => r.tags.some(tag => normalize(tag) === normalize(name)));
const themeDescription = theme => theme.description || '';
function toast(message) {
  const el = document.querySelector('#toast');
  clearTimeout(toastTimer);
  el.textContent = message;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3600);
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
    <form id="login-form" novalidate><div class="login-field-heading"><label class="field-label" for="email">E-mail</label></div><div class="input-wrap">${icon('mail')}<input id="email" name="email" type="email" autocomplete="email" placeholder="seu@email.com" value="${esc(loginDraft.email)}" required aria-describedby="email-error"></div><p class="field-error" id="email-error" role="alert"></p>
    <div id="signup-fields" hidden><div class="signup-field"><div class="login-field-heading"><label class="field-label" for="signup-name">Nome completo</label></div><div class="input-wrap">${icon('user')}<input id="signup-name" name="name" autocomplete="name" maxlength="80" placeholder="Como você se chama?" value="${esc(loginDraft.name)}" required disabled aria-describedby="signup-name-error"></div><p class="field-error" id="signup-name-error" role="alert"></p></div><div class="signup-field"><div class="login-field-heading"><label class="field-label" for="signup-username">Nome de usuário (@username)</label></div><div class="input-wrap">${icon('at')}<input id="signup-username" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="30" placeholder="seu.username" value="${esc(loginDraft.username)}" required disabled aria-describedby="signup-username-error"></div><p class="field-error" id="signup-username-error" role="alert"></p></div></div>
    <button type="submit" class="primary-button login-submit"><span id="login-submit-label">Enviar código</span>${icon('arrow')}</button></form>
    <p class="auth-footnote">${icon('lock')} Demonstração · dados locais</p>
  </section>`;
}
function codeHTML() {
  return `<section class="screen auth-screen code-screen" aria-labelledby="code-title"><button class="back-button" data-action="back-login">${icon('back')} Voltar</button><div class="code-content"><div class="mark">${icon('mail-check')}</div><h1 id="code-title">Código de Acesso</h1><p class="code-description">Código enviado para</p><div class="email-line"><strong>${esc(pendingAccess?.email || email)}</strong><button class="text-button underlined" data-action="back-login">Alterar</button></div>
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
  email = account.email; profileName = account.name;
  storage.set('arquivo-email-v1', email); storage.set('arquivo-profile-name-v1', profileName);
  pendingAccess = null; storage.set('arquivo-pending-access-v1', null);
  loginDraft = { email, name: '', username: '' };
}
function navHTML() {
  const link = (id, glyph, title) => `<a href="#${id}" data-action="nav-route" data-route="${id}" ${(route === id || (['tema', 'novo-tema'].includes(route) && id === 'temas') || (route === 'fonte' && id === 'obras')) ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${title}</span></a>`;
  return `<div class="archive-nav-dock"><nav class="archive-nav" aria-label="Navegação principal">${link('inicio', 'archive', 'Início')}${link('fichas', 'copy', 'Fichas')}<details class="create-menu"><summary class="nav-create ${['criar', 'nova-fonte'].includes(route) ? 'active' : ''}" aria-label="Criar"><span class="nav-create-icon">${icon('write')}</span><span>Criar</span></summary><div class="create-menu-panel"><button data-action="menu-create-entry"><span class="create-option-icon">${icon('write')}</span><span><strong>Nova ficha</strong></span>${icon('chevron')}</button><button data-action="menu-create-source"><span class="create-option-icon">${icon('book')}</span><span><strong>Nova fonte</strong></span>${icon('chevron')}</button><button data-action="menu-create-theme"><span class="create-option-icon">${icon('themes')}</span><span><strong>Novo tema</strong></span>${icon('chevron')}</button></div></details>${link('obras', 'book', 'Fontes')}${link('temas', 'themes', 'Temas')}</nav></div>`;
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
  const recent = [...reflections].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const filtered = activeTheme ? recent.filter(r => r.tags.includes(activeTheme)) : recent.slice(0, 2);
  return `<div class="dashboard-grid"><section class="module recent-reflections"><div class="section-heading"><h2>${activeTheme ? 'Reflexões por tema' : 'Últimas reflexões'}</h2><a class="view-all" href="#fichas">Ver todas ${icon('arrow')}</a></div>${activeTheme ? `<div class="filter-note">${icon('tag')}${esc(activeTheme)}<button class="text-button" data-action="clear-filter">Limpar filtro</button></div>` : ''}<div class="reflection-list">${filtered.length ? filtered.map(reflectionCard).join('') : emptyHTML('Uma conexão por fazer', 'Crie uma reflexão e associe este tema.')}</div></section><section class="module recent-sources"><div class="section-heading"><h2>Fontes recentes</h2><button class="view-all" data-action="all-books">Ver todas ${icon('arrow')}</button></div><div class="work-list">${books.slice(0, 2).map(workRow).join('')}</div></section></div>`;
}
function searchHTML() {
  const q = normalize(query);
  const matchingBooks = books.filter((b) => normalize(b.title + ' ' + b.author).includes(q));
  const matchingReflections = reflections.filter((r) => normalize([r.title || '', r.reference || '', r.quote || '', r.text, r.tags.join(' '), bookFor(r.bookId).title, bookFor(r.bookId).author].join(' ')).includes(q));
  if (!matchingBooks.length && !matchingReflections.length) return emptyHTML('Nenhum resultado por aqui', `Experimente outro pensamento, título, autor ou tema.`);
  return `<div class="search-results">${matchingBooks.length ? `<section><div class="section-heading"><h2>Fontes encontradas</h2><span class="eyebrow">${matchingBooks.length} obras</span></div><div class="books-grid">${matchingBooks.map(bookTile).join('')}</div></section>` : ''}${matchingReflections.length ? `<section><div class="section-heading"><h2>Reflexões encontradas</h2><span class="eyebrow">${matchingReflections.length} fichas</span></div><div class="reflection-list">${matchingReflections.map(reflectionCard).join('')}</div></section>` : ''}</div>`;
}
function homeHTML() {
  return `<div class="action-row"><div class="search-wrap">${icon('search')}<input id="search" type="search" placeholder="Buscar…" value="${esc(query)}" aria-label="Buscar no Bloom" autocomplete="off"><button class="clear-search" data-action="clear-search" aria-label="Limpar busca" ${query ? '' : 'hidden'}>${icon('x')}</button></div><button class="primary-button create-button" data-action="create">${icon('plus')} Nova ficha</button></div><div id="home-results" aria-live="polite">${query.trim() ? searchHTML() : dashboardHTML()}</div>`;
}
function matchingEntries() {
  const q = normalize(entryQuery.trim());
  const entries = reflections.filter(r => { const b = bookFor(r.bookId); return normalize([r.title || '', r.reference || '', r.identifier || '', r.quote || '', r.text, ...r.tags, b.title, b.author].join(' ')).includes(q); });
  return entries.sort((a, b) => entrySort === 'fonte' ? bookFor(a.bookId).title.localeCompare(bookFor(b.bookId).title, 'pt-BR') : entrySort === 'antigas' ? (a.date || '').localeCompare(b.date || '') : (b.date || '').localeCompare(a.date || ''));
}
function entryResultsHTML() {
  const entries = matchingEntries();
  return entries.length ? `<div class="reflection-list">${entries.map(reflectionCard).join('')}</div>` : emptyHTML(reflections.length ? 'Nenhuma ficha encontrada' : 'Crie sua primeira ficha', reflections.length ? 'Busque por um título, trecho, autor ou tema.' : 'Crie sua primeira ficha para registrar uma reflexão.');
}
function entriesHTML() {
  const search = searchFieldHTML({
    id: 'entry-search', placeholder: 'Buscar fichas…', label: 'Buscar fichas',
    value: entryQuery, clearAction: 'clear-entry-search', clearLabel: 'Limpar busca de fichas',
  });
  const controls = listControlsHTML({
    count: matchingEntries().length, countId: 'entries-count', singular: 'ficha', plural: 'fichas',
    createAction: 'create', createLabel: 'Nova Ficha',
    sort: { id: 'entry-sort', label: 'Ordenar fichas', value: entrySort,
      options: [['recentes', 'Recentes'], ['antigas', 'Antigas'], ['fonte', 'Fonte A–Z']] },
  });
  return `${search}${controls}<div id="entries-results" aria-live="polite">${entryResultsHTML()}</div>`;
}
function refreshEntries() {
  document.querySelector('#entries-results').innerHTML = entryResultsHTML();
  const count = matchingEntries().length;
  document.querySelector('#entries-count').textContent = countLabel(count, 'ficha', 'fichas');
  document.querySelector('[data-action="clear-entry-search"]').hidden = !entryQuery;
}
function bookTile(book) { return `<button class="book-tile" data-action="book" data-id="${book.id}"><span class="book-spine" style="--book-color:${book.color}">${icon('book-open')}</span><span><h2>${esc(book.title)}</h2><span class="work-author">${esc(book.author)}</span><span class="book-count">${countFor(book.id)} ${countFor(book.id) === 1 ? 'ficha' : 'fichas'} no Bloom</span></span></button>`; }
function sourceRow(book) {
  const entries = reflections.filter(r => r.bookId === book.id);
  const themes = new Set(entries.flatMap(r => r.tags)).size;
  return `<button class="source-row" data-action="book" data-id="${book.id}" aria-label="Abrir fonte: ${esc(book.title)}"><span class="source-icon">${icon('book-open')}</span><span class="source-info"><span class="source-title">${esc(book.title)}</span><span class="source-meta"><span class="source-author">${esc(book.author)}</span><span class="source-stats"><span class="meta-dot">·</span> ${entries.length} ${entries.length === 1 ? 'ficha' : 'fichas'} <span class="meta-dot">·</span> ${themes} ${themes === 1 ? 'tema' : 'temas'}</span></span></span>${icon('arrow')}</button>`;
}
function matchingSources() {
  const q = normalize(sourceQuery.trim());
  const result = books.filter(b => normalize(b.title + ' ' + b.author).includes(q));
  return result.sort((a, b) => sourceSort === 'titulo' ? a.title.localeCompare(b.title, 'pt-BR') : sourceSort === 'autor' ? a.author.localeCompare(b.author, 'pt-BR') || a.title.localeCompare(b.title, 'pt-BR') : sourceSort === 'fichas' ? countFor(b.id) - countFor(a.id) : (b.addedAt || 0) - (a.addedAt || 0));
}
function sourceResultsHTML() {
  const matches = matchingSources();
  return matches.length ? `<div class="source-list">${matches.map(sourceRow).join('')}</div>` : emptyHTML('Nenhuma fonte encontrada', 'Busque por outro título ou autor.');
}
function booksHTML() {
  const search = searchFieldHTML({
    id: 'source-search', placeholder: 'Buscar por título da obra ou autor...', label: 'Buscar fontes por título ou autor',
    value: sourceQuery, clearAction: 'clear-source-search', clearLabel: 'Limpar busca de fontes',
  });
  const controls = listControlsHTML({
    count: matchingSources().length, countId: 'sources-count', singular: 'obra', plural: 'obras',
    createAction: 'new-source', createLabel: 'Nova Fonte',
    sort: { id: 'source-sort', label: 'Ordenar fontes', value: sourceSort,
      options: [['recentes', 'Recentes'], ['titulo', 'Título A–Z'], ['autor', 'Autor A–Z'], ['fichas', 'Mais fichas']] },
  });
  return `${search}${controls}<div id="sources-results" aria-live="polite">${sourceResultsHTML()}</div>`;
}
function refreshSources() {
  document.querySelector('#sources-results').innerHTML = sourceResultsHTML();
  const count = matchingSources().length;
  document.querySelector('#sources-count').textContent = countLabel(count, 'obra', 'obras');
  document.querySelector('.sources-search .clear-search').hidden = !sourceQuery;
}
function openNewSource() {
  newSourceReturn = route === 'nova-fonte' ? 'obras' : location.hash.slice(1) || 'obras';
  newSourceDraft = blankSource();
  go('nova-fonte');
}
function newSourceHTML() {
  return `<form id="source-form" class="new-source-form" novalidate><section class="field"><div class="new-source-label"><label for="source-title">Título da obra <span>*</span></label></div><div class="new-source-input">${icon('book-open')}<input id="source-title" name="title" placeholder="ex: Memórias Póstumas de Brás Cubas" value="${esc(newSourceDraft.title)}" maxlength="200" required aria-describedby="source-error"></div></section><section class="field"><div class="new-source-label"><label for="source-author">Autor(a) <span>*</span></label></div><div class="new-source-input">${icon('user')}<input id="source-author" name="author" placeholder="ex: Machado de Assis" value="${esc(newSourceDraft.author)}" maxlength="120" required aria-describedby="source-error"></div><div class="frequent-authors" role="group" aria-label="Autores frequentes"><span>Frequentes:</span>${[['Machado de Assis', 'Machado de Assis'], ['Dostoiévski', 'Fiódor Dostoiévski'], ['Tolstói', 'Liev Tolstói']].map(([label, author]) => `<button type="button" data-action="suggest-source-author" data-author="${esc(author)}" aria-pressed="${normalize(newSourceDraft.author) === normalize(author)}"><span aria-hidden="true"></span>${esc(label)}</button>`).join('')}</div></section><section class="field"><div class="new-source-label"><label for="source-bibliography">Detalhes</label><span>Opcional</span></div><div class="new-source-input new-source-details">${icon('book')}<textarea id="source-bibliography" name="bibliography" placeholder="ex: 1881, Ed. 34, Trad. Rubens Figueiredo" maxlength="1000">${esc(newSourceDraft.bibliography)}</textarea></div></section><label class="source-immediate"><span class="source-immediate-icon">${icon('book')}</span><span class="source-immediate-copy"><span class="source-immediate-title" id="source-immediate-title">Criar ficha ao salvar</span></span><input id="source-immediate" name="immediate" type="checkbox" role="switch" ${newSourceDraft.immediate ? 'checked' : ''} aria-labelledby="source-immediate-title"><span class="source-switch" aria-hidden="true"></span></label><p class="field-error" id="source-error" role="alert"></p><button class="primary-button new-source-save" type="submit">${icon('check')} Salvar Fonte</button></form>`;
}
function themesHTML() {
  const search = searchFieldHTML({
    id: 'theme-search', placeholder: 'Buscar temas…', label: 'Buscar por tema ou conceito',
    value: themeQuery, clearAction: 'clear-theme-search', clearLabel: 'Limpar busca de temas',
    className: 'sources-search themes-search search-wrap',
  });
  const controls = listControlsHTML({
    count: matchingThemes().length, countId: 'themes-count', singular: 'tema', plural: 'temas',
    createAction: 'new-theme', createLabel: 'Novo Tema', className: 'sources-controls themes-controls',
    sort: { id: 'theme-sort', label: 'Ordenar temas', value: themeSort,
      options: [['fichas', 'Mais fichas'], ['obras', 'Mais obras'], ['nome', 'Nome A–Z'], ['recentes', 'Recentes']] },
  });
  return `${search}${controls}<div id="themes-results" aria-live="polite">${themeResultsHTML()}</div>`;
}
function matchingThemes() {
  const q = normalize(themeQuery.trim());
  return themeCatalog().map(t => { const entries = recordsForTheme(t.name); return { ...t, fichas: entries.length, obras: new Set(entries.map(r => r.bookId)).size }; }).filter(t => normalize(t.name + ' ' + themeDescription(t)).includes(q)).sort((a, b) => themeSort === 'nome' ? a.name.localeCompare(b.name, 'pt-BR') : themeSort === 'obras' ? b.obras - a.obras : themeSort === 'recentes' ? (b.addedAt || 0) - (a.addedAt || 0) : b.fichas - a.fichas);
}
function themeResultsHTML() {
  const matches = matchingThemes();
  return matches.length ? `<div class="theme-list">${matches.map((t, i) => `<button class="theme-card" data-action="theme-details" data-tag="${esc(t.name)}" aria-label="Abrir tema: ${esc(t.name)}"><span class="theme-card-heading"><span class="theme-dot"></span><span class="theme-card-title">${esc(t.name)}</span>${icon('arrow')}</span>${t.description ? `<span class="theme-card-description">${esc(t.description)}</span>` : ''}<span class="theme-card-footer"><span class="theme-card-count">${icon('write')} ${t.fichas} ${t.fichas === 1 ? 'ficha' : 'fichas'}</span><span class="theme-card-books">${icon('book-open')} ${t.obras} ${t.obras === 1 ? 'obra' : 'obras'}</span></span></button>`).join('')}</div>` : emptyHTML('Nenhum tema encontrado', 'Experimente outro tema ou conceito.');
}
function refreshThemes() {
  document.querySelector('#themes-results').innerHTML = themeResultsHTML();
  const count = matchingThemes().length;
  document.querySelector('#themes-count').textContent = countLabel(count, 'tema', 'temas');
  document.querySelector('.themes-search .clear-search').hidden = !themeQuery;
}
function openTheme(name) {
  const theme = themeCatalog().find(t => normalize(t.name) === normalize(name));
  if (!theme) return;
  go('tema/' + encodeURIComponent(theme.name));
}
function themeDetailHTML() {
  const theme = themeCatalog().find(t => t.name === selectedTheme);
  const entries = recordsForTheme(theme.name);
  const sources = books.filter(b => entries.some(r => r.bookId === b.id));
  return `<div class="theme-detail"><button class="theme-back text-button" data-action="theme-back">${icon('back')} Todos os temas</button><div class="theme-title-row"><h2>${esc(theme.name)}</h2><button class="icon-button" data-action="edit-theme" aria-label="Editar tema">${icon('pencil')}</button></div>${theme.description ? `<p class="theme-definition">“${esc(theme.description)}”</p>` : ''}<button class="primary-button theme-add-reflection" data-action="theme-create">${icon('plus')} Adicionar reflexão</button><section class="theme-sources"><h3>${icon('book-open')} Fontes</h3><div class="theme-source-list">${sources.length ? sources.map(b => { const count = entries.filter(r => r.bookId === b.id).length; return `<button class="theme-source-row" data-action="theme-source" data-id="${b.id}" aria-label="Ver ${count} fichas de ${esc(b.title)} neste tema">${icon('book')}<span class="work-info"><span class="work-title">${esc(b.title)}</span><span class="work-author">${esc(b.author)}</span></span><span class="theme-source-count">${count} ${count === 1 ? 'ficha' : 'fichas'}</span>${icon('chevron')}</button>`; }).join('') : emptyHTML('Uma conexão por fazer', 'Adicione uma reflexão com este tema para reunir suas fontes aqui.')}</div></section></div>`;
}
function openSheet(title, subtitle, body, footer = '', className = '') {
  showDialog(`<div class="sheet-handle" aria-hidden="true"></div><header class="sheet-header"><div><h2 id="modal-title">${esc(title)}</h2>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div><button class="sheet-close" data-action="close-modal" aria-label="Fechar">${icon('x')}</button></header>${body}${footer}`, 'sheet ' + className);
}
function themeEntryCard(r, index) {
  return `<article class="theme-entry-card" data-entry="${esc(r.id)}"><div class="theme-entry-reference"><span>${icon('book')} ${esc(r.reference || 'Referência não informada')}</span><span class="entry-number">Ficha #${String(index + 1).padStart(2, '0')}</span></div>${r.title ? `<h3 class="theme-entry-title">${esc(r.title)}</h3>` : ''}${r.quote ? `<blockquote class="theme-entry-quote">«${esc(r.quote)}»</blockquote>` : ''}<div class="reader-reflection"><h3>${icon('write')} Reflexão</h3><p>${formatText(r.text)}</p></div><div class="theme-entry-footer"><div class="chip-list">${r.tags.map(tag => `<button class="chip ${normalize(tag) === normalize(selectedTheme) ? 'active' : ''}" data-action="open-theme" data-tag="${esc(tag)}">${esc(tagName(tag))}</button>`).join('')}</div><details class="entry-actions"><summary aria-label="Ações da ficha ${index + 1}">${icon('more')}</summary><div><button data-action="theme-edit-entry" data-id="${esc(r.id)}">${icon('pencil')} Editar ficha</button><button data-action="reflection" data-id="${esc(r.id)}">${icon('book-open')} Ver ficha</button></div></details></div></article>`;
}
function openThemeSource(id) {
  const b = bookFor(id);
  if (!b || !selectedTheme) return;
  const entries = recordsForTheme(selectedTheme).filter(r => r.bookId === id);
  openSheet(b.title, b.author, `<div class="sheet-theme-context"><span>${icon('tag')} Tema: <strong>${esc(selectedTheme)}</strong></span><button class="text-button" data-action="book" data-id="${id}">Ver obra completa ${icon('arrow')}</button></div><p class="sheet-count">${icon('book-open')} <strong>${entries.length} ${entries.length === 1 ? 'ficha' : 'fichas'}</strong> com este tema</p><div class="sheet-scroll"><div class="theme-entry-list">${entries.length ? entries.map(themeEntryCard).join('') : emptyHTML('Nenhuma ficha neste tema', 'Crie uma ficha nesta obra para fazer esta conexão.')}</div></div>`, `<footer class="sheet-footer"><button class="primary-button" data-action="theme-create" data-book="${id}">${icon('plus')} Nova Ficha nesta Obra</button><button class="sheet-dismiss" data-action="close-modal">Fechar visualização</button></footer>`, 'source-sheet');
}
function openThemeEdit() {
  const theme = themeCatalog().find(t => t.name === selectedTheme);
  if (!theme) return;
  openSheet('Editar Tema', theme.name, `<form id="theme-edit-form" class="sheet-scroll theme-edit-form" novalidate><div class="field"><div class="theme-field-label"><label for="edit-theme-name">Nome do tema <span>(Obrigatório)</span></label><output id="theme-name-count" for="edit-theme-name">${theme.name.length}/40</output></div><input id="edit-theme-name" name="name" value="${esc(theme.name)}" maxlength="40" required aria-describedby="theme-edit-error"></div><div class="field"><div class="theme-field-label"><label for="edit-theme-description">Descrição <span class="optional-label">(Opcional)</span></label><output id="theme-description-count" for="edit-theme-description">${theme.description.length}/280</output></div><textarea id="edit-theme-description" name="description" maxlength="280">${esc(theme.description)}</textarea></div><p class="field-error" id="theme-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer edit-theme-footer"><button class="primary-button" type="submit" form="theme-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="delete-theme">${icon('trash')} Excluir tema</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'edit-theme-sheet');
}
function persistThemeChange(oldName, replacement) {
  const updateTags = tags => [...new Set(tags.flatMap(tag => normalize(tag) === normalize(oldName) ? (replacement ? [replacement] : []) : [tag]))];
  reflections = reflections.map(r => ({ ...r, tags: updateTags(r.tags) }));
  if (editor) { editor.tags = updateTags(editor.tags); if (editor.context?.theme === oldName) editor.context.theme = replacement; }
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft && Array.isArray(draft.tags)) { draft.tags = updateTags(draft.tags); if (draft.context?.theme === oldName) draft.context.theme = replacement; storage.set('arquivo-entry-draft-v2', draft); }
  if (activeTheme === oldName) activeTheme = replacement || '';
  if (sourceTheme === oldName) sourceTheme = replacement || '';
  const themesSaved = storage.set('arquivo-themes-v1', customThemes);
  const entriesSaved = storage.set('arquivo-reflections-v1', reflections);
  return themesSaved && entriesSaved;
}
function confirmThemeDelete() {
  openSheet('Excluir tema?', selectedTheme, `<div class="sheet-scroll delete-theme-description"><p>O tema será removido das fichas associadas. Suas fontes e reflexões continuarão no Bloom.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="confirm-delete-theme">${icon('trash')} Excluir tema</button><button class="sheet-dismiss" data-action="edit-theme">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function deleteSelectedTheme() {
  const theme = themeCatalog().find(t => t.name === selectedTheme);
  if (!theme) return;
  customThemes = customThemes.filter(t => normalize(t.name) !== normalize(theme.name));
  if (theme.originalName) deletedThemes = [...new Set([...deletedThemes, normalize(theme.originalName)])];
  const deletedSaved = storage.set('arquivo-deleted-themes-v1', deletedThemes);
  const persisted = persistThemeChange(theme.name, '');
  themeQuery = ''; go('temas');
  toast(persisted && deletedSaved ? 'Tema excluído. Suas fichas foram preservadas.' : 'Tema excluído nesta sessão.');
}
function openNewTheme() {
  newThemeReturn = route === 'novo-tema' ? 'temas' : location.hash.slice(1) || 'temas';
  newThemeDraft = { name: '', description: '' };
  go('novo-tema');
}
function newThemeHTML() {
  return `<form class="new-theme-form" id="theme-form" novalidate><section class="new-theme-field"><div class="new-theme-label"><label for="theme-name">Nome do tema <span aria-hidden="true">◆</span><span class="sr-only"> (obrigatório)</span></label><output id="new-theme-name-count" for="theme-name">${newThemeDraft.name.length}/40</output></div><input id="theme-name" name="name" placeholder="Ex.: Memória" maxlength="40" value="${esc(newThemeDraft.name)}" required aria-describedby="theme-error"></section><section class="new-theme-field"><div class="new-theme-label"><label for="theme-description">Descrição</label><output id="new-theme-description-count" for="theme-description">${newThemeDraft.description.length}/280</output></div><textarea id="theme-description" name="description" placeholder="Opcional" maxlength="280">${esc(newThemeDraft.description)}</textarea></section><p class="field-error" id="theme-error" role="alert"></p><button type="submit" class="primary-button new-theme-save">${icon('check')} Salvar Tema</button></form>`;
}
function archiveHTML() {
  const title = { inicio: 'Início', obras: 'Fontes', fichas: 'Fichas', temas: 'Temas', tema: 'Temas', fonte: 'Fontes', 'novo-tema': 'Novo Tema', 'nova-fonte': 'Nova Fonte', criar: editor?.id ? 'Editar Ficha' : 'Nova Ficha' }[route];
  const catalog = ['obras', 'temas', 'fichas'].includes(route);
  const screenClass = { inicio: 'home-screen', criar: 'entry-screen', fichas: 'entries-screen', obras: 'sources-screen', temas: 'themes-screen', tema: 'theme-detail-screen', fonte: 'source-detail-screen', 'novo-tema': 'new-theme-screen', 'nova-fonte': 'new-source-screen' }[route] || '';
  const heading = ['novo-tema', 'nova-fonte'].includes(route) ? `<div class="new-theme-heading"><button class="icon-button" data-action="${route === 'nova-fonte' ? 'cancel-new-source' : 'cancel-new-theme'}" aria-label="Fechar criação de ${route === 'nova-fonte' ? 'fonte' : 'tema'}">${icon('x')}</button><h1>${title}</h1></div>` : `<h1>${title}</h1>`;
  const content = { criar: editorHTML, fichas: entriesHTML, obras: booksHTML, temas: themesHTML, tema: themeDetailHTML, fonte: sourceDetailHTML, 'novo-tema': newThemeHTML, 'nova-fonte': newSourceHTML }[route] || homeHTML;
  const header = catalog || ['inicio', 'tema', 'fonte'].includes(route) ? `<h1 class="sr-only">${title}</h1>` : `<header class="archive-header">${heading}</header>`;
  return `<section class="screen archive-screen ${screenClass}"><div class="archive-body">${header}<div class="archive-content">${content()}</div></div>${navHTML()}</section>`;
}
function updateResend() {
  const button = document.querySelector('#resend');
  if (!button) return;
  const remaining = Math.max(0, Math.ceil((resendUntil - Date.now()) / 1000));
  button.disabled = remaining > 0;
  button.textContent = remaining ? `Reenviar em (0:${String(remaining).padStart(2, '0')})` : 'Reenviar código';
}
function startCountdown() {
  resendUntil = Date.now() + 40000;
  updateResend();
}
function render() {
  clearTimeout(authTimer);
  clearInterval(resendTimer);
  if (modal.open) modal.close();
  const next = location.hash.slice(1) || 'login';
  route = ['login', 'codigo', 'inicio', 'fichas', 'obras', 'temas', 'criar', 'novo-tema', 'nova-fonte'].includes(next) ? next : 'login';
  if (next.startsWith('tema/')) {
    let name = '';
    try { name = decodeURIComponent(next.slice(5)); } catch { /* Invalid link falls back to themes. */ }
    const theme = themeCatalog().find(t => normalize(t.name) === normalize(name));
    route = theme ? 'tema' : 'temas';
    selectedTheme = theme?.name || '';
  }
  if (next.startsWith('fonte/')) {
    let id = '';
    try { id = decodeURIComponent(next.slice(6)); } catch { /* Invalid link falls back to sources. */ }
    if (id !== selectedSource) { sourceTheme = ''; sourceEntryQuery = ''; sourceEntrySort = 'recentes'; sourceSearchOpen = false; }
    const source = bookFor(id);
    route = source ? 'fonte' : 'obras';
    selectedSource = source?.id || '';
    if (sourceTheme && !sourceThemes().some(tag => normalize(tag) === normalize(sourceTheme))) sourceTheme = '';
  }
  if (route === 'criar' && !editor) {
    const draft = storage.get('arquivo-entry-draft-v2', null);
    editor = draft && typeof draft.text === 'string' && Array.isArray(draft.tags) && draft.tags.every(t => typeof t === 'string') ? { ...blankEntry(), ...draft } : blankEntry();
    if (editor.context?.theme) editorReturn = 'tema/' + encodeURIComponent(editor.context.theme);
    if (editor.context?.sourceId) editorReturn = 'fonte/' + encodeURIComponent(editor.context.sourceId);
  }
  document.body.dataset.view = ['login', 'codigo'].includes(route) ? 'auth' : 'archive';
  document.querySelector('.brand').href = document.body.dataset.view === 'archive' ? '#inicio' : '#login';
  document.querySelector('.brand').setAttribute('aria-label', 'Bloom');
  app.innerHTML = route === 'login' ? loginHTML() : route === 'codigo' ? codeHTML() : archiveHTML();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (route === 'codigo') {
    if (!resendUntil) startCountdown();
    updateResend();
    resendTimer = setInterval(updateResend, 1000);
    document.querySelector('.otp-digit').focus({ preventScroll: true });
  } else if (route === 'login') {
    updateLoginState();
  } else app.focus({ preventScroll: true });
  document.title = `${{ login: 'Acesse Bloom', codigo: 'Código de Acesso', inicio: 'Início', obras: 'Fontes', fichas: 'Fichas', temas: 'Temas', tema: selectedTheme, fonte: bookFor(selectedSource)?.title, 'novo-tema': 'Novo Tema', 'nova-fonte': 'Nova Fonte', criar: editor?.id ? 'Editar Ficha' : 'Nova Ficha' }[route]} · Bloom`;
  if (route === 'tema' && pendingSourceSheet?.theme === selectedTheme) { const { bookId } = pendingSourceSheet; pendingSourceSheet = null; openThemeSource(bookId); }
}
function refreshHome() {
  const results = document.querySelector('#home-results');
  if (results) results.innerHTML = query.trim() ? searchHTML() : dashboardHTML();
  const clear = document.querySelector('.clear-search');
  if (clear) clear.hidden = !query;
}
function openModal(title, body, eyebrow = '') {
  showDialog(`<header class="modal-header"><div>${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h2 id="modal-title">${esc(title)}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Fechar">${icon('x')}</button></header>${body}`);
}
function openBook(id) {
  if (!bookFor(id)) return;
  sourceTheme = ''; sourceEntryQuery = ''; sourceEntrySort = 'recentes'; sourceSearchOpen = false;
  go('fonte/' + encodeURIComponent(id));
}
function sourceEntries() {
  return reflections.filter(r => r.bookId === selectedSource).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
function sourceThemes() {
  const seen = new Set();
  return sourceEntries().flatMap(r => r.tags).filter(tag => { const key = normalize(tag); if (seen.has(key)) return false; seen.add(key); return true; });
}
function matchingSourceEntries() {
  const q = normalize(sourceEntryQuery.trim());
  const entries = sourceEntries().filter(r => (!sourceTheme || r.tags.some(tag => normalize(tag) === normalize(sourceTheme))) && (!q || normalize([r.title || '', r.reference || '', r.quote || '', r.text, ...r.tags].join(' ')).includes(q)));
  if (sourceEntrySort === 'antigas') entries.reverse();
  if (sourceEntrySort === 'referencia') entries.sort((a, b) => (a.reference || '').localeCompare(b.reference || '', 'pt-BR', { numeric: true }));
  return entries;
}
function sourceFilterStatus() {
  const count = matchingSourceEntries().length;
  return sourceEntryQuery.trim() ? `${count} ${count === 1 ? 'ficha encontrada' : 'fichas encontradas'}` : sourceTheme ? `Exibindo ${sourceTheme} (${count})` : `Exibindo todas fichas (${count})`;
}
function sourceEntryCard(r, index) {
  return `<article class="source-entry-card" data-entry="${esc(r.id)}"><button class="source-entry-main" data-action="source-edit-entry" data-id="${esc(r.id)}" aria-label="Editar ficha ${index + 1}"><span class="source-entry-header"><span class="source-entry-heading">${icon('book')}<span>${esc(r.title || r.reference || 'Reflexão da leitura')}</span></span><span class="entry-number">${esc(r.identifier || `Ficha #${String(index + 1).padStart(2, '0')}`)}</span></span>${r.quote ? `<span class="source-entry-quote">«${esc(r.quote)}»</span>` : ''}<span class="source-entry-text">${formatText(r.text)}</span></button><div class="source-entry-tags">${r.tags.map(tag => `<button data-action="source-filter" data-tag="${esc(tag)}" class="${sourceTheme && normalize(tag) === normalize(sourceTheme) ? 'active' : ''}">${esc(tagName(tag))}</button>`).join('')}</div></article>`;
}
function sourceEntryResultsHTML() {
  const entries = matchingSourceEntries();
  const all = sourceEntries();
  return entries.length ? entries.map(r => sourceEntryCard(r, all.findIndex(entry => entry.id === r.id))).join('') : emptyHTML(sourceEntries().length ? 'Nenhuma ficha encontrada' : 'Uma leitura por registrar', sourceEntries().length ? 'Experimente outro tema ou busque um trecho diferente.' : 'Crie a primeira ficha desta fonte para registrar sua leitura.');
}
function sourceDetailHTML() {
  const b = bookFor(selectedSource);
  const entries = sourceEntries();
  return `<div class="source-detail"><button class="theme-back text-button" data-action="source-back">${icon('back')} Todas as fontes</button><div class="source-title-row"><h2>${esc(b.title)}</h2><button class="icon-button" data-action="edit-source" aria-label="Editar fonte">${icon('pencil')}</button></div><p class="source-detail-author">${esc(b.author)}</p><button class="primary-button source-add-entry" data-action="source-create">${icon('plus')} Nova Ficha</button><section class="source-theme-filters"><div class="source-theme-heading"><h3>${icon('themes')} Temas da obra</h3><span id="source-filter-status" role="status">${esc(sourceFilterStatus())}</span></div><div class="source-filter-chips" role="group" aria-label="Filtrar fichas por tema"><button class="source-filter-chip ${sourceTheme ? '' : 'active'}" data-action="source-filter" data-tag="" aria-pressed="${!sourceTheme}">Todas <span>${entries.length}</span></button>${sourceThemes().map(tag => `<button class="source-filter-chip ${normalize(sourceTheme) === normalize(tag) ? 'active' : ''}" data-action="source-filter" data-tag="${esc(tag)}" aria-pressed="${normalize(sourceTheme) === normalize(tag)}">${esc(tag)} <span>${entries.filter(r => r.tags.some(t => normalize(t) === normalize(tag))).length}</span></button>`).join('')}</div><div class="source-entry-tools"><div class="entry-sort-control">${icon('order')}<select id="source-entry-sort" aria-label="Ordenar fichas da fonte">${[['recentes', 'Mais recentes'], ['antigas', 'Mais antigas'], ['referencia', 'Referência']].map(([value, label]) => `<option value="${value}" ${sourceEntrySort === value ? 'selected' : ''}>${label}</option>`).join('')}</select></div><button class="icon-button" data-action="source-toggle-search" aria-label="Buscar fichas nesta fonte" aria-expanded="${sourceSearchOpen}" aria-controls="source-entry-search-wrap">${icon('search')}</button></div><div id="source-entry-search-wrap" class="search-wrap" ${sourceSearchOpen ? '' : 'hidden'}>${icon('search')}<input id="source-entry-search" type="search" placeholder="Buscar trecho ou reflexão..." aria-label="Buscar fichas nesta fonte" value="${esc(sourceEntryQuery)}"><button class="clear-search" data-action="source-clear-entry-search" aria-label="Limpar busca de fichas" ${sourceEntryQuery ? '' : 'hidden'}>${icon('x')}</button></div></section><div class="source-entry-list" id="source-entry-results" aria-live="polite">${sourceEntryResultsHTML()}</div></div>`;
}
function refreshSourceEntries() {
  document.querySelector('#source-entry-results').innerHTML = sourceEntryResultsHTML();
  document.querySelector('#source-filter-status').textContent = sourceFilterStatus();
  document.querySelectorAll('.source-filter-chip').forEach(button => { const active = normalize(button.dataset.tag) === normalize(sourceTheme); button.classList.toggle('active', active); button.setAttribute('aria-pressed', active); });
  document.querySelector('#source-entry-search-wrap .clear-search').hidden = !sourceEntryQuery;
}
function persistSources() {
  return storage.set('arquivo-sources-v1', books.filter(b => { const seed = seedBooks.find(seed => seed.id === b.id); return !seed || b !== seed; }));
}
function openSourceEdit() {
  const b = bookFor(selectedSource);
  if (!b) return;
  openSheet('Editar Fonte', b.title, `<form id="source-edit-form" class="sheet-scroll source-edit-form" novalidate><div class="field"><div class="source-field-label"><label for="edit-source-title">Título da obra</label></div><input id="edit-source-title" name="title" value="${esc(b.title)}" maxlength="200" required aria-describedby="source-edit-error"></div><div class="field"><div class="source-field-label"><label for="edit-source-author">Autor(a)</label></div><input id="edit-source-author" name="author" value="${esc(b.author)}" maxlength="120" required aria-describedby="source-edit-error"></div><div class="field"><div class="source-field-label"><label for="edit-source-bibliography">Detalhes da Edição / Bibliografia</label><span class="optional-label">Opcional</span></div><textarea id="edit-source-bibliography" name="bibliography" maxlength="1000" placeholder="Ano, edição, gênero, editora…">${esc(b.bibliography ?? (b.year ? b.year : ''))}</textarea></div><p class="field-error" id="source-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer edit-source-footer"><button class="primary-button" type="submit" form="source-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="delete-source">${icon('trash')} Excluir fonte</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'edit-source-sheet');
}
function confirmSourceDelete() {
  const b = bookFor(selectedSource);
  if (!b) return;
  const count = countFor(b.id);
  openSheet('Excluir fonte?', b.title, `<div class="sheet-scroll delete-theme-description"><p>A fonte${count ? ` e ${count === 1 ? 'sua ficha' : `suas ${count} fichas associadas`}` : ''} ${count ? 'serão excluídas' : 'será excluída'} do Bloom.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="confirm-delete-source">${icon('trash')} Excluir fonte</button><button class="sheet-dismiss" data-action="edit-source">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function deleteSelectedSource() {
  const id = selectedSource;
  books = books.filter(b => b.id !== id);
  reflections = reflections.filter(r => r.bookId !== id);
  if (seedBooks.some(b => b.id === id)) deletedSources = [...new Set([...deletedSources, id])];
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft?.bookId === id || draft?.context?.sourceId === id || draft?.context?.bookId === id) { editor = null; storage.set('arquivo-entry-draft-v2', null); }
  const sourcesSaved = persistSources();
  const entriesSaved = storage.set('arquivo-reflections-v1', reflections);
  const deletedSaved = storage.set('arquivo-deleted-sources-v1', deletedSources);
  sourceQuery = ''; go('obras');
  toast(sourcesSaved && entriesSaved && deletedSaved ? 'Fonte excluída do Bloom.' : 'Fonte excluída nesta sessão.');
}
function openSourceEntryEdit(id, fromList = false) {
  const record = reflections.find(r => r.id === id && (fromList || r.bookId === selectedSource));
  if (!record) return;
  const entries = reflections.filter(r => r.bookId === record.bookId).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const number = String(entries.findIndex(r => r.id === id) + 1).padStart(2, '0');
  sourceEntryDraft = { ...record, title: record.title || '', reference: record.reference || record.location || '', identifier: record.identifier || '', quote: record.quote || '', tags: [...record.tags], number, fromList };
  showSourceEntryEdit();
}
function fichaSourceFieldHTML() {
  const source = bookFor(sourceEntryDraft.bookId);
  return `<div class="field ficha-source-field"><div class="ficha-source-label"><label for="ficha-book">Fonte / Obra <span>*</span></label><span>Bibliográfica</span></div><div class="ficha-source-picker"><span class="ficha-source-icon">${icon('book-open')}</span><span class="ficha-source-info"><span id="ficha-book-title">${esc(source?.title || 'Selecionar fonte')}</span><span id="ficha-book-author">${esc(source?.author || '')}</span></span><span class="ficha-source-arrows">${icon('chevron')}</span><select id="ficha-book" name="bookId" aria-label="Fonte / Obra" required aria-describedby="ficha-edit-error"><option value="">Selecionar fonte</option>${books.map(b => `<option value="${b.id}" ${b.id === sourceEntryDraft.bookId ? 'selected' : ''}>${esc(b.title)} — ${esc(b.author)}</option>`).join('')}</select></div></div>`;
}
function sourceEntryTagsHTML() {
  return sourceEntryDraft.tags.map((tag, index) => `<span class="ficha-edit-tag ${index === 0 ? 'primary-tag' : ''}"><span>${esc(tagName(tag))}</span><button type="button" data-action="ficha-remove-tag" data-index="${index}" aria-label="Remover tema ${esc(tag)}">${icon('x')}</button></span>`).join('');
}
function showSourceEntryEdit() {
  const draft = sourceEntryDraft;
  if (!draft) return;
  openSheet(draft.fromList ? (draft.identifier || `Ficha #${draft.number}`) : `Editar Ficha #${draft.number}`, draft.title || draft.reference || 'Reflexão da leitura', `<form id="source-entry-edit-form" class="sheet-scroll ficha-edit-form" novalidate>${draft.fromList ? fichaSourceFieldHTML() : ''}<div class="field"><label for="ficha-title">Título / Referência <span class="optional-label">(Opcional)</span></label><input id="ficha-title" name="title" value="${esc(draft.title)}" maxlength="200" aria-describedby="ficha-edit-error"></div><div class="ficha-edit-grid"><div class="field"><label for="ficha-reference">Capítulo / Cena / Pág.</label><input id="ficha-reference" name="reference" value="${esc(draft.reference)}" maxlength="160" placeholder="Capítulo, cena ou página"></div><div class="field"><label for="ficha-identifier">Identificador</label><input id="ficha-identifier" name="identifier" value="${esc(draft.identifier)}" placeholder="Ficha #${draft.number}" maxlength="40"></div></div><div class="field"><label for="ficha-quote">Trecho citado da obra</label><div class="ficha-quote-field"><textarea id="ficha-quote" name="quote" maxlength="5000" placeholder="Adicione o trecho citado…">${esc(draft.quote)}</textarea></div></div><div class="field"><label for="ficha-text">Reflexão <span aria-hidden="true">*</span></label><textarea id="ficha-text" name="text" maxlength="5000" required aria-describedby="ficha-edit-error">${esc(draft.text)}</textarea></div><div class="field"><div class="ficha-tags-heading"><label>Temas / Tags</label><span id="ficha-tag-count">${draft.tags.length} associados</span></div><div class="ficha-edit-tags" id="ficha-edit-tags">${sourceEntryTagsHTML()}<button class="ficha-new-tag" type="button" data-action="ficha-new-tag">${icon('plus')} Novo tema</button></div><div class="ficha-tag-composer" id="ficha-tag-composer" hidden><label class="sr-only" for="ficha-tag-input">Nome do tema</label><input id="ficha-tag-input" list="ficha-theme-options" maxlength="50" placeholder="Escolha ou digite um tema" autocomplete="off"><datalist id="ficha-theme-options">${allThemes().map(tag => `<option value="${esc(tag)}">`).join('')}</datalist><button type="button" class="secondary-button" data-action="ficha-add-tag">Adicionar</button></div><p class="field-error" id="ficha-tag-error" role="alert"></p></div><p class="field-error" id="ficha-edit-error" role="alert"></p></form>`, `<footer class="sheet-footer ficha-edit-footer"><button class="primary-button" type="submit" form="source-entry-edit-form">${icon('check')} Salvar</button><div class="theme-edit-secondary"><button class="delete-theme-button" data-action="ficha-delete">${icon('trash')} Excluir ficha</button><button class="text-button" data-action="close-modal">Cancelar</button></div></footer>`, 'ficha-edit-sheet' + (draft.fromList ? ' ficha-list-sheet' : ''));
}
function syncSourceEntryDraft() {
  const form = document.querySelector('#source-entry-edit-form');
  if (!form || !sourceEntryDraft) return;
  Object.assign(sourceEntryDraft, readEntryFields(form));
}
function refreshSourceEntryTags() {
  document.querySelector('#ficha-edit-tags').innerHTML = sourceEntryTagsHTML() + `<button class="ficha-new-tag" type="button" data-action="ficha-new-tag">${icon('plus')} Novo tema</button>`;
  document.querySelector('#ficha-tag-count').textContent = `${sourceEntryDraft.tags.length} associados`;
}
function addSourceEntryTag() {
  const field = document.querySelector('#ficha-tag-input');
  let name = field.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  if (!name) { document.querySelector('#ficha-tag-error').textContent = 'Informe o nome do tema.'; field.focus(); return; }
  name = allThemes().find(tag => normalize(tag) === normalize(name)) || name;
  if (sourceEntryDraft.tags.some(tag => normalize(tag) === normalize(name))) { document.querySelector('#ficha-tag-error').textContent = 'Este tema já está associado à ficha.'; field.focus(); return; }
  if (sourceEntryDraft.tags.length >= 8) { document.querySelector('#ficha-tag-error').textContent = 'Você pode adicionar até 8 temas por ficha.'; return; }
  sourceEntryDraft.tags.push(name); refreshSourceEntryTags(); field.value = '';
  document.querySelector('#ficha-tag-composer').hidden = true;
  document.querySelector('#ficha-tag-error').textContent = '';
  document.querySelector('.ficha-new-tag').focus({ preventScroll: true });
}
function confirmSourceEntryDelete() {
  syncSourceEntryDraft();
  openSheet('Excluir ficha?', sourceEntryDraft.identifier, `<div class="sheet-scroll delete-theme-description"><p>Esta ficha será excluída do arquivo. A fonte e os temas continuarão disponíveis.</p></div>`, `<footer class="sheet-footer"><button class="secondary-button delete-theme-button" data-action="ficha-confirm-delete">${icon('trash')} Excluir ficha</button><button class="sheet-dismiss" data-action="ficha-cancel-delete">Cancelar</button></footer>`, 'delete-theme-sheet');
}
function finishSourceEntryChange(message, persisted) {
  const focusId = sourceEntryDraft.id;
  const fromList = sourceEntryDraft.fromList;
  sourceEntryDraft = null;
  if (sourceTheme && !sourceThemes().some(tag => normalize(tag) === normalize(sourceTheme))) sourceTheme = '';
  const content = document.querySelector('.archive-content');
  content.innerHTML = fromList ? entriesHTML() : sourceDetailHTML();
  opener = content.querySelector(`[data-action="${fromList ? 'reflection' : 'source-edit-entry'}"][data-id="${CSS.escape(focusId)}"]`) || content.querySelector(fromList ? '#entry-search' : '.source-add-entry');
  modal.close();
  toast(persisted ? message : message + ' Salvo nesta sessão.');
}
function openReflection(id) {
  if (route === 'fonte') { openSourceEntryEdit(id); return; }
  if (route === 'fichas') { openSourceEntryEdit(id, true); return; }
  const r = reflections.find((record) => record.id === id);
  const b = bookFor(r.bookId);
  openModal(r.title || 'Reflexão', `<div class="modal-body"><button class="text-button" data-action="book" data-id="${b.id}">${esc(b.title)}</button><p class="detail-author">${esc(b.author)}${r.reference ? ` · ${esc(r.reference)}` : ''}</p>${r.quote ? `<blockquote class="entry-detail-quote">${esc(r.quote)}</blockquote>` : ''}<p class="long-reflection">${formatText(r.text)}</p><div class="chip-list">${r.tags.map((tag) => `<button class="chip" data-action="open-theme" data-tag="${esc(tag)}">${esc(tagName(tag))}</button>`).join('')}</div><p class="help">${r.date ? esc(r.date.split('-').reverse().join('/')) : 'Hoje'}</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Fechar</button><button class="primary-button" data-action="edit" data-id="${esc(r.id)}">${icon('write')} Editar reflexão</button></div></div>`, 'Reflexão');
}
function openEditor(bookId = '', reflectionId = '', themeName = '') {
  const record = reflections.find((r) => r.id === reflectionId);
  editorReturn = route === 'tema' ? 'tema/' + encodeURIComponent(selectedTheme) : route === 'fonte' ? 'fonte/' + encodeURIComponent(selectedSource) : ['inicio', 'fichas', 'obras', 'temas'].includes(route) ? route : 'inicio';
  editor = record ? { ...blankEntry(), ...record, tags: [...record.tags] } : blankEntry();
  if (themeName) {
    if (!record) { editor.bookId = bookFor(bookId)?.id || ''; editor.tags = [themeName]; }
    editor.context = { theme: themeName, bookId: bookFor(bookId)?.id || record?.bookId || '' };
  }
  if (route === 'fonte' && (bookId || record)) {
    if (!record) { editor.bookId = bookFor(bookId)?.id || ''; editor.tags = sourceTheme ? [sourceTheme] : []; }
    editor.context = { sourceId: selectedSource, filter: sourceTheme };
  }
  if (route === 'nova-fonte' && bookFor(bookId)) {
    editor.bookId = bookId;
    editor.context = { sourceId: bookId, filter: '' };
    editorReturn = 'fonte/' + encodeURIComponent(bookId);
  }
  clearTimeout(autosaveTimer);
  storage.set('arquivo-entry-draft-v2', editor);
  if (modal.open) modal.close();
  go('criar');
}
function entryTagsHTML() {
  return editor.tags.map((tag, index) => `<span class="entry-tag"><span>${esc(tagName(tag))}</span><button type="button" data-action="remove-entry-tag" data-index="${index}" aria-label="Remover tema ${esc(tag)}">${icon('x')}</button></span>`).join('');
}
function editorHTML() {
  return `<form id="reflection-form" class="entry-form" data-id="${esc(editor.id)}" novalidate>
    <div class="entry-savebar"><button class="icon-button entry-back" type="button" data-action="entry-back" aria-label="Voltar ao Bloom">${icon('back')}</button><span class="entry-save-status" role="status"><span class="status-dot"></span><span id="entry-save-label">${editor.text || editor.title ? 'Salvo automaticamente' : 'Rascunho vazio'}</span></span><button class="primary-button entry-save" type="submit">${icon('check')} Salvar</button></div>
    <input class="entry-title" id="reflection-title" name="title" placeholder="Título (opcional)" aria-label="Título da ficha" maxlength="200" value="${esc(editor.title)}">
    <section class="entry-metadata" aria-label="Obra, referência e temas"><div class="entry-source"><select id="reflection-book" name="bookId" aria-label="Obra" required aria-describedby="reflection-error"><option value="">Selecionar fonte *</option>${books.map((b) => `<option value="${b.id}" ${editor.bookId === b.id ? 'selected' : ''}>${esc(b.title)} — ${esc(b.author)}</option>`).join('')}</select></div><div class="entry-reference"><input id="reflection-reference" name="reference" placeholder="Capítulo, página ou referência" aria-label="Referência na obra" maxlength="160" value="${esc(editor.reference)}"></div><div class="entry-tags" id="entry-tags">${entryTagsHTML()}</div><button type="button" class="entry-add-theme" data-action="add-entry-tag">${icon('plus')} Tema</button></section>
    <section class="entry-quote"><div class="entry-section-header"><label for="reflection-quote">${icon('quote')} Trecho da obra</label><button type="button" class="entry-copy" data-action="copy-quote" aria-label="Copiar trecho da obra">${icon('copy')}</button></div><textarea id="reflection-quote" name="quote" placeholder="" aria-label="Trecho da obra" maxlength="5000">${esc(editor.quote)}</textarea></section>
    <section class="entry-synthesis"><div class="entry-section-header"><label for="reflection-text">${icon('link')} Reflexão <span aria-hidden="true">*</span></label></div><textarea id="reflection-text" name="text" placeholder="" aria-label="Minha síntese e reflexão" required maxlength="5000" aria-describedby="reflection-error">${esc(editor.text)}</textarea></section>
    <p class="field-error" id="reflection-error" role="alert"></p><div class="entry-formatbar" role="toolbar" aria-label="Formatação da reflexão"><button type="button" data-action="format-entry" data-format="bold" aria-label="Negrito" title="Negrito"><strong>B</strong></button><button type="button" data-action="format-entry" data-format="italic" aria-label="Itálico" title="Itálico"><em>I</em></button><button type="button" data-action="format-entry" data-format="quote" aria-label="Citação" title="Citação">${icon('quote')}</button><button type="button" data-action="entry-help" aria-label="Inspiração para refletir" title="Inspiração para refletir">${icon('sparkle')}</button></div>
  </form>`;
}
function autosaveEntry() {
  const form = document.querySelector('#reflection-form');
  if (!form) return;
  Object.assign(editor, readEntryFields(form));
  const persisted = storage.set('arquivo-entry-draft-v2', editor);
  const status = document.querySelector('#entry-save-label');
  status.textContent = 'Salvando…';
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => { if (status.isConnected) status.textContent = persisted ? 'Salvo automaticamente' : 'Salvo nesta sessão'; }, 350);
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
  pendingArchiveImport = null;
  const content = `<header class="profile-header">
    <div class="profile-avatar">${icon('user')}</div>
    <div class="profile-identity"><div class="profile-name-row"><h2 id="modal-title">${esc(profileName)}</h2><button class="profile-edit-name" data-action="profile-edit-name" aria-label="Editar nome do perfil" aria-controls="profile-name-form" aria-expanded="false">${icon('pencil')}</button></div><p class="profile-email">${esc(email)}</p></div>
    <button class="icon-button profile-close" data-action="close-modal" aria-label="Fechar perfil" autofocus>${icon('x')}</button>
  </header>
  <form id="profile-name-form" class="profile-name-form" hidden novalidate><label class="field-label" for="profile-name">Nome do perfil</label><input id="profile-name" name="name" value="${esc(profileName)}" maxlength="80" autocomplete="nickname" required aria-describedby="profile-name-error"><p class="field-error" id="profile-name-error" role="alert"></p><div class="modal-actions"><button type="button" class="secondary-button" data-action="profile-cancel-edit">Cancelar</button><button type="submit" class="primary-button">${icon('check')} Salvar nome</button></div></form>
  <div class="profile-stats"><div><strong>${books.length}</strong><small>obras</small></div><div><strong>${reflections.length}</strong><small>reflexões</small></div><div><strong>${allThemes().length}</strong><small>temas</small></div></div>
  <p class="profile-note">Dados salvos neste navegador.</p>
  <section class="profile-data" aria-labelledby="profile-data-title"><h3 id="profile-data-title">Dados do Bloom</h3><div class="profile-data-actions"><button class="secondary-button" data-action="export-archive">${icon('download')} Exportar JSON</button><button class="secondary-button" data-action="import-archive">${icon('upload')} Importar JSON</button></div><input type="file" id="archive-import-file" accept=".json,application/json" hidden><p id="archive-import-error" class="field-error" role="alert"></p><div class="profile-import-preview" id="archive-import-preview" hidden><p id="archive-import-summary"></p><p>A importação substitui as fontes, fichas e temas atuais pelos dados deste arquivo.</p><div class="modal-actions"><button class="secondary-button" data-action="cancel-archive-import">Cancelar</button><button class="primary-button" data-action="confirm-archive-import">Importar arquivo</button></div></div></section>

  <button class="secondary-button profile-logout" data-action="logout">${icon('logout')} Sair do Bloom</button>`;
  showDialog(content, 'profile-modal');
}
function closeProfileNameEditor() {
  document.querySelector('#profile-name-form').hidden = true;
  const button = modal.querySelector('[data-action="profile-edit-name"]');
  button.setAttribute('aria-expanded', 'false');
  button.focus({ preventScroll: true });
}
function exportArchive() {
  const data = { format: 'bloom-arquivo', version: 1, exportedAt: new Date().toISOString(), sources: books, reflections, themes: themeCatalog().map(({ name, description, addedAt }) => ({ name, description, addedAt: addedAt || 0 })) };
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
    if (!source || typeof source.id !== 'string' || !(/^source-[a-z0-9-]+$/.test(source.id) || seedBooks.some(b => b.id === source.id)) || source.id.length > 160 || sourceIds.has(source.id)) invalid();
    sourceIds.add(source.id);
    return { id: source.id, title: text(source.title, true), author: text(source.author, true), year: optionalText(source.year), bibliography: optionalText(source.bibliography), description: optionalText(source.description), color: seedBooks.find(b => b.id === source.id)?.color || '#343126', addedAt: timestamp(source.addedAt) };
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
  return { sources, reflections: entries, themes };
}
async function prepareArchiveImport(input) {
  const file = input.files[0];
  if (!file) return;
  const error = document.querySelector('#archive-import-error');
  const preview = document.querySelector('#archive-import-preview');
  const buttons = [...modal.querySelectorAll('.profile-data-actions button')];
  pendingArchiveImport = null; preview.hidden = true; error.textContent = '';
  buttons.forEach(button => { button.disabled = true; });
  try {
    if (file.size > 5 * 1024 * 1024) throw new Error('Escolha um arquivo JSON de até 5 MB.');
    const content = await file.text();
    if (!input.isConnected || !modal.open) return;
    let data;
    try { data = JSON.parse(content); } catch { throw new Error('Não foi possível ler o JSON. Verifique o arquivo e tente novamente.'); }
    pendingArchiveImport = validateArchive(data);
    document.querySelector('#archive-import-summary').textContent = `${pendingArchiveImport.sources.length} fontes, ${pendingArchiveImport.reflections.length} fichas e ${pendingArchiveImport.themes.length} temas encontrados.`;
    preview.hidden = false;
  } catch (failure) {
    if (input.isConnected && modal.open) error.textContent = failure.message;
  } finally { input.value = ''; buttons.forEach(button => { button.disabled = false; }); }
}
function importArchive() {
  if (!pendingArchiveImport) return;
  const data = pendingArchiveImport;
  const removedSources = seedBooks.filter(b => !data.sources.some(source => source.id === b.id)).map(b => b.id);
  const removedThemes = seedThemes.map(t => normalize(t.name));
  const updates = {
    'arquivo-sources-v1': data.sources,
    'arquivo-deleted-sources-v1': removedSources,
    'arquivo-reflections-v1': data.reflections,
    'arquivo-themes-v1': data.themes,
    'arquivo-deleted-themes-v1': removedThemes,
    'arquivo-theme-flow-demo-v1': true,
    'arquivo-source-flow-demo-v1': true,
    'arquivo-entry-draft-v2': null,
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
  books = data.sources; reflections = data.reflections; customThemes = data.themes;
  deletedSources = removedSources; deletedThemes = removedThemes;
  clearTimeout(autosaveTimer); editor = null; sourceEntryDraft = null; pendingArchiveImport = null; pendingSourceSheet = null;
  newSourceDraft = blankSource(); newThemeDraft = { name: '', description: '' };
  query = ''; activeTheme = ''; sourceQuery = ''; themeQuery = ''; entryQuery = ''; sourceTheme = '';
  render(); openProfile(); toast('Arquivo importado com sucesso.');
}
document.addEventListener('click', (event) => {
  const menu = document.querySelector('.create-menu[open]');
  if (menu && !menu.contains(event.target)) menu.open = false;
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  if (button.matches('a')) event.preventDefault();
  const action = button.dataset.action;
  if (action === 'nav-route') {
    const next = button.dataset.route;
    if (next === 'inicio') { query = ''; activeTheme = ''; }
    if (next === 'obras') sourceQuery = '';
    if (next === 'temas') themeQuery = '';
    if (next === 'fichas') entryQuery = '';
    go(next);
  } else if (['menu-create-entry', 'menu-create-source', 'menu-create-theme'].includes(action)) {
    const summary = button.closest('.create-menu').querySelector('summary');
    button.closest('.create-menu').open = false;
    if (action === 'menu-create-entry') openEditor();
    else { if (action === 'menu-create-source') openNewSource(); else openNewTheme(); opener = summary; }
  } else if (action === 'clear-entry-search') { entryQuery = ''; document.querySelector('#entry-search').value = ''; refreshEntries(); document.querySelector('#entry-search').focus(); }
  else if (action === 'google') {
    openModal('Continuar com o Google', `<div class="modal-body"><p class="modal-description">Escolha o perfil de demonstração para explorar o Bloom.</p><div class="profile-summary"><div class="profile-avatar">${icon('user')}</div><div><strong>Leitor Bloom</strong><small>leitor@exemplo.com</small></div></div><button class="primary-button" data-action="google-enter">Entrar com este perfil ${icon('arrow')}</button><p class="help">Login simulado para este protótipo.</p></div>`);
  } else if (action === 'google-enter') { activateAccount(accountFor('leitor@exemplo.com')); modal.close(); go('inicio'); toast('Bem-vindo ao Bloom.'); }
  else if (action === 'back-login') go('login');
  else if (action === 'fill-code') { document.querySelectorAll('.otp-digit').forEach((el, i) => { el.value = DEMO_CODE[i]; el.classList.remove('invalid'); el.removeAttribute('aria-invalid'); }); document.querySelector('#code-error').textContent = ''; document.querySelector('#code-form [type="submit"]').focus(); }
  else if (action === 'resend') { startCountdown(); toast('Novo código de demonstração: 482619.'); }
  else if (action === 'all-books') { sourceQuery = ''; go('obras'); }
  else if (action === 'new-source') openNewSource();
  else if (action === 'cancel-new-source') { newSourceDraft = blankSource(); go(newSourceReturn); }
  else if (action === 'suggest-source-author') {
    const field = document.querySelector('#source-author');
    field.value = button.dataset.author;
    field.dispatchEvent(new Event('input', { bubbles: true }));
  }
  else if (action === 'source-back') go('obras');
  else if (action === 'edit-source') openSourceEdit();
  else if (action === 'delete-source') confirmSourceDelete();
  else if (action === 'confirm-delete-source') deleteSelectedSource();
  else if (action === 'source-create') openEditor(selectedSource);
  else if (action === 'source-edit-entry') openSourceEntryEdit(button.dataset.id);
  else if (action === 'ficha-new-tag') { document.querySelector('#ficha-tag-composer').hidden = false; document.querySelector('#ficha-tag-input').focus(); }
  else if (action === 'ficha-add-tag') addSourceEntryTag();
  else if (action === 'ficha-remove-tag') { sourceEntryDraft.tags.splice(Number(button.dataset.index), 1); refreshSourceEntryTags(); document.querySelector('#ficha-tag-error').textContent = ''; document.querySelector('.ficha-new-tag').focus({ preventScroll: true }); }
  else if (action === 'ficha-delete') confirmSourceEntryDelete();
  else if (action === 'ficha-cancel-delete') showSourceEntryEdit();
  else if (action === 'ficha-confirm-delete') {
    reflections = reflections.filter(r => r.id !== sourceEntryDraft.id);
    const persisted = storage.set('arquivo-reflections-v1', reflections);
    const draft = storage.get('arquivo-entry-draft-v2', null);
    if (draft?.id === sourceEntryDraft.id) { editor = null; storage.set('arquivo-entry-draft-v2', null); }
    finishSourceEntryChange('Ficha excluída do Bloom.', persisted);
  }
  else if (action === 'source-filter') { sourceTheme = button.dataset.tag; refreshSourceEntries(); }
  else if (action === 'source-toggle-search') {
    sourceSearchOpen = !sourceSearchOpen;
    document.querySelector('#source-entry-search-wrap').hidden = !sourceSearchOpen;
    button.setAttribute('aria-expanded', sourceSearchOpen);
    if (sourceSearchOpen) document.querySelector('#source-entry-search').focus();
    else { sourceEntryQuery = ''; document.querySelector('#source-entry-search').value = ''; refreshSourceEntries(); }
  }
  else if (action === 'source-clear-entry-search') { sourceEntryQuery = ''; document.querySelector('#source-entry-search').value = ''; refreshSourceEntries(); document.querySelector('#source-entry-search').focus(); }
  else if (action === 'clear-source-search') { sourceQuery = ''; const field = document.querySelector('#source-search'); field.value = ''; refreshSources(); field.focus(); }
  else if (action === 'all-themes') { themeQuery = ''; go('temas'); }
  else if (action === 'new-theme') openNewTheme();
  else if (action === 'cancel-new-theme') { newThemeDraft = { name: '', description: '' }; go(newThemeReturn); }
  else if (action === 'theme-details') openTheme(button.dataset.tag);
  else if (action === 'theme-back') go('temas');
  else if (action === 'theme-source') openThemeSource(button.dataset.id);
  else if (action === 'edit-theme') openThemeEdit();
  else if (action === 'delete-theme') confirmThemeDelete();
  else if (action === 'confirm-delete-theme') deleteSelectedTheme();
  else if (action === 'theme-create') openEditor(button.dataset.book, '', selectedTheme);
  else if (action === 'theme-edit-entry') openEditor('', button.dataset.id, selectedTheme);
  else if (action === 'clear-theme-search') { themeQuery = ''; const field = document.querySelector('#theme-search'); field.value = ''; refreshThemes(); field.focus(); }
  else if (action === 'create') { if (route !== 'criar' || !button.matches('a')) openEditor(button.dataset.book); }
  else if (action === 'edit') openEditor('', button.dataset.id, route === 'tema' ? selectedTheme : '');
  else if (action === 'entry-back') {
    if (editor.context?.sourceId) { selectedSource = editor.context.sourceId; sourceTheme = editor.context.filter || ''; }
    go(editorReturn);
  }
  else if (action === 'add-entry-tag') {
    openModal('Adicionar tema', `<form class="modal-body" id="entry-theme-form" novalidate><label class="field-label" for="entry-theme-input">Nome do tema</label><input id="entry-theme-input" name="tag" placeholder="Digite um tema" list="entry-theme-options" autocomplete="off" maxlength="50" required><datalist id="entry-theme-options">${allThemes().map(tag => `<option value="${esc(tag)}">`).join('')}</datalist><p class="field-error" id="entry-theme-error" role="alert"></p><div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancelar</button><button type="submit" class="primary-button">Adicionar tema</button></div></form>`);
    document.querySelector('#entry-theme-input').focus();
  }
  else if (action === 'remove-entry-tag') { editor.tags.splice(Number(button.dataset.index), 1); document.querySelector('#entry-tags').innerHTML = entryTagsHTML(); autosaveEntry(); document.querySelector('.entry-add-theme').focus({ preventScroll: true }); }
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
    field.value = profileName;
    field.removeAttribute('aria-invalid');
    document.querySelector('#profile-name-error').textContent = '';
    button.setAttribute('aria-expanded', 'true');
    field.focus(); field.select();
  }
  else if (action === 'profile-cancel-edit') closeProfileNameEditor();
  else if (action === 'export-archive') exportArchive();
  else if (action === 'import-archive') document.querySelector('#archive-import-file').click();
  else if (action === 'confirm-archive-import') importArchive();
  else if (action === 'cancel-archive-import') { pendingArchiveImport = null; document.querySelector('#archive-import-preview').hidden = true; document.querySelector('#archive-import-error').textContent = ''; modal.querySelector('[data-action="import-archive"]').focus(); }
  else if (action === 'logout') { modal.close(); query = ''; activeTheme = ''; go('login'); toast('Até a próxima leitura.'); }
  else if (action === 'filter') { activeTheme = activeTheme === button.dataset.tag ? '' : button.dataset.tag; if (route === 'inicio') refreshHome(); else { const scroll = window.scrollY; app.innerHTML = archiveHTML(); window.scrollTo(0, scroll); app.querySelector(`[data-tag="${CSS.escape(button.dataset.tag)}"]`)?.focus({ preventScroll: true }); } }
  else if (action === 'clear-filter') { activeTheme = ''; if (route === 'inicio') refreshHome(); else app.innerHTML = archiveHTML(); }
  else if (action === 'open-theme') openTheme(button.dataset.tag);
  else if (action === 'clear-search') { query = ''; const field = document.querySelector('#search'); field.value = ''; refreshHome(); field.focus(); }
});
document.addEventListener('input', (event) => {
  const field = event.target;
  const errorId = fieldErrorIds[field.id] || formErrorIds[field.closest('form')?.id];
  if (errorId) clearFieldError(field, errorId);
  if (field.closest('#login-form')) {
    const form = field.closest('#login-form');
    loginDraft = { email: form.elements.email.value, name: form.elements.name.value, username: form.elements.username.value };
    if (field.id === 'email') updateLoginState();
  }
  if (field.id === 'search') { query = field.value; refreshHome(); }
  if (field.id === 'source-search') { sourceQuery = field.value; refreshSources(); }
  if (field.id === 'source-entry-search') { sourceEntryQuery = field.value; refreshSourceEntries(); }
  if (field.id === 'theme-search') { themeQuery = field.value; refreshThemes(); }
  if (field.id === 'entry-search') { entryQuery = field.value; refreshEntries(); }
  if (field.closest('#theme-form')) {
    const form = field.closest('#theme-form');
    newThemeDraft = { name: form.elements.name.value, description: form.elements.description.value };
    document.querySelector('#new-theme-name-count').textContent = `${newThemeDraft.name.length}/40`;
    document.querySelector('#new-theme-description-count').textContent = `${newThemeDraft.description.length}/280`;
  }
  if (field.closest('#theme-edit-form')) {
    document.querySelector('#theme-name-count').textContent = `${document.querySelector('#edit-theme-name').value.length}/40`;
    document.querySelector('#theme-description-count').textContent = `${document.querySelector('#edit-theme-description').value.length}/280`;
  }
  if (field.closest('#source-form')) {
    const form = field.closest('#source-form');
    newSourceDraft = { title: form.elements.title.value, author: form.elements.author.value, bibliography: form.elements.bibliography.value, immediate: form.elements.immediate.checked };
    document.querySelectorAll('[data-action="suggest-source-author"]').forEach(button => button.setAttribute('aria-pressed', normalize(newSourceDraft.author) === normalize(button.dataset.author)));
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
    const source = bookFor(sourceEntryDraft.bookId);
    document.querySelector('#ficha-book-title').textContent = source?.title || 'Selecionar fonte';
    document.querySelector('#ficha-book-author').textContent = source?.author || '';
    clearFieldError(event.target, 'ficha-edit-error');
  }
  if (event.target.id === 'reflection-book') event.target.dispatchEvent(new Event('input', { bubbles: true }));
  if (event.target.id === 'source-sort') { sourceSort = event.target.value; refreshSources(); }
  if (event.target.id === 'source-entry-sort') { sourceEntrySort = event.target.value; refreshSourceEntries(); }
  if (event.target.id === 'theme-sort') { themeSort = event.target.value; refreshThemes(); }
  if (event.target.id === 'entry-sort') { entrySort = event.target.value; refreshEntries(); }
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
// Form actions own validation, persistence and the return to their workflow.
function saveProfileName(form) {
  const name = form.elements.name.value.trim().replace(/\s+/g, ' ');
  if (!name || name.length > 80) { document.querySelector('#profile-name-error').textContent = !name ? 'Informe seu nome.' : 'Use até 80 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  profileName = name;
  const currentAccount = accountFor(email);
  if (currentAccount) currentAccount.name = name;
  const nameSaved = storage.set('arquivo-profile-name-v1', profileName);
  const accountsSaved = storage.set('arquivo-accounts-v1', accounts);
  const persisted = nameSaved && accountsSaved;
  document.querySelector('#modal-title').textContent = profileName;
  closeProfileNameEditor();
  toast(persisted ? 'Nome do perfil atualizado.' : 'Nome atualizado nesta sessão.');
}

function saveSourceEntry(form) {
  syncSourceEntryDraft();
  const values = { bookId: sourceEntryDraft.bookId, ...readEntryFields(form, { trim: true }) };
  const error = validateEntry(values, 'Selecione uma fonte para salvar sua ficha.');
  if (error) { showFormError(form, 'ficha-edit-error', error.message, error.field); return; }
  const original = reflections.find(r => r.id === sourceEntryDraft.id);
  if (!original) return;
  const record = { ...original, ...values, tags: [...sourceEntryDraft.tags] };
  reflections = reflections.map(r => r.id === record.id ? record : r);
  const persisted = storage.set('arquivo-reflections-v1', reflections);
  const draft = storage.get('arquivo-entry-draft-v2', null);
  if (draft?.id === record.id) { editor = null; storage.set('arquivo-entry-draft-v2', null); }
  finishSourceEntryChange('Ficha atualizada no Bloom.', persisted);
}

function saveSourceChanges(form) {
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  const bibliography = form.elements.bibliography.value.trim();
  if (!title || !author) { const field = !title ? form.elements.title : form.elements.author; document.querySelector('#source-edit-error').textContent = !title ? 'Informe o título da obra.' : 'Informe o nome do autor.'; field.setAttribute('aria-invalid', 'true'); field.focus(); return; }
  if (books.some(b => b.id !== selectedSource && normalize(b.title) === normalize(title) && normalize(b.author) === normalize(author))) { document.querySelector('#source-edit-error').textContent = 'Esta obra e autor já estão no Bloom.'; form.elements.title.setAttribute('aria-invalid', 'true'); form.elements.title.focus(); return; }
  books = books.map(b => b.id === selectedSource ? { ...b, title, author, bibliography } : b);
  const persisted = persistSources();
  go('fonte/' + encodeURIComponent(selectedSource));
  toast(persisted ? 'Fonte atualizada no Bloom.' : 'Fonte atualizada nesta sessão.');
}

function saveThemeChanges(form) {
  const theme = themeCatalog().find(t => t.name === selectedTheme);
  if (!theme) return;
  const name = form.elements.name.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  const description = form.elements.description.value.trim();
  if (!name || name.length > 40) { document.querySelector('#theme-edit-error').textContent = !name ? 'Informe o nome do tema.' : 'Use até 40 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  if (themeCatalog().some(t => normalize(t.name) !== normalize(theme.name) && normalize(t.name) === normalize(name))) { document.querySelector('#theme-edit-error').textContent = 'Este tema já existe no Bloom.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  customThemes = customThemes.filter(t => normalize(t.name) !== normalize(theme.name));
  customThemes.unshift({ name, description, originalName: theme.originalName || '', addedAt: theme.addedAt || Date.now() });
  // A newly named theme can reuse the name of a previously removed seed.
  const renamedSeed = seedThemes.find(t => normalize(t.name) === normalize(name));
  if (renamedSeed && renamedSeed.name !== theme.originalName) deletedThemes = [...new Set([...deletedThemes, normalize(renamedSeed.name)])];
  storage.set('arquivo-deleted-themes-v1', deletedThemes);
  const persisted = persistThemeChange(theme.name, name);
  openTheme(name);
  toast(persisted ? 'Tema atualizado no Bloom.' : 'Tema atualizado nesta sessão.');
}

function createTheme(form) {
  const name = form.elements.name.value.trim().replace(/^#/, '').trim().replace(/\s+/g, ' ');
  const description = form.elements.description.value.trim();
  if (!name || name.length > 40) { document.querySelector('#theme-error').textContent = !name ? 'Informe o nome do tema.' : 'Use até 40 caracteres para o nome.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  if (allThemes().some(t => normalize(t) === normalize(name))) { document.querySelector('#theme-error').textContent = 'Este tema já existe no Bloom.'; form.elements.name.setAttribute('aria-invalid', 'true'); form.elements.name.focus(); return; }
  customThemes.unshift({ name, description, addedAt: Date.now() });
  const persisted = storage.set('arquivo-themes-v1', customThemes);
  newThemeDraft = { name: '', description: '' }; themeQuery = ''; themeSort = 'recentes';
  go('temas');
  toast(persisted ? 'Novo tema adicionado ao Bloom.' : 'Tema adicionado nesta sessão. Armazenamento local indisponível.');
}

function createSource(form) {
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  const bibliography = form.elements.bibliography.value.trim();
  const immediate = form.elements.immediate.checked;
  if (!title || !author) { const field = !title ? form.elements.title : form.elements.author; document.querySelector('#source-error').textContent = !title ? 'Informe o título da obra.' : 'Informe o nome do autor.'; field.setAttribute('aria-invalid', 'true'); field.focus(); return; }
  if (books.some(b => normalize(b.title) === normalize(title) && normalize(b.author) === normalize(author))) { document.querySelector('#source-error').textContent = 'Esta obra e autor já estão no Bloom.'; form.elements.title.setAttribute('aria-invalid', 'true'); form.elements.title.focus(); return; }
  const source = { id: `source-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, author, year: '', bibliography, description: '', color: '#343126', addedAt: Date.now() };
  books.unshift(source);
  const persisted = persistSources();
  newSourceDraft = blankSource(); sourceQuery = ''; sourceSort = 'recentes';
  if (immediate) openEditor(source.id);
  else go('obras');
  toast(persisted ? 'Nova fonte adicionada ao Bloom.' : 'Fonte adicionada nesta sessão. Armazenamento local indisponível.');
}

function associateEntryTheme(form) {
  let tag = form.elements.tag.value.trim().replace(/^#/, '').trim();
  if (!tag) { document.querySelector('#entry-theme-error').textContent = 'Digite o nome do tema.'; form.elements.tag.focus(); return; }
  if (editor.tags.length >= 8) { document.querySelector('#entry-theme-error').textContent = 'Você pode adicionar até 8 temas por ficha.'; return; }
  tag = allThemes().find(existing => normalize(existing) === normalize(tag)) || tag;
  if (!editor.tags.some(existing => normalize(existing) === normalize(tag))) editor.tags.push(tag);
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
    if (accounts.some(account => account.username === username)) { document.querySelector('#signup-username-error').textContent = 'Este username já está em uso. Escolha outro.'; form.elements.username.setAttribute('aria-invalid', 'true'); form.elements.username.focus(); return; }
    pendingAccess = { email: emailKey(input.value), name, username, isNew: true };
  } else pendingAccess = { ...existing, isNew: false };
  storage.set('arquivo-pending-access-v1', pendingAccess);
  loginDraft = { email: input.value, name: form.elements.name.value, username: form.elements.username.value };
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  document.querySelector('#login-submit-label').textContent = 'Enviando código…';
  [...form.elements].filter(field => field.tagName === 'INPUT').forEach(field => { field.disabled = true; });
  authTimer = setTimeout(() => { startCountdown(); go('codigo'); toast('Código simulado enviado. Use 482619.'); }, 650);
}

function confirmAccessCode(form) {
  const inputs = [...form.querySelectorAll('.otp-digit')];
  const code = inputs.map((el) => el.value).join('');
  if (code !== DEMO_CODE) { document.querySelector('#code-error').textContent = code.length < 6 ? 'Preencha os 6 dígitos do código.' : 'Código incorreto. Neste protótipo, use 482619.'; inputs.forEach((el) => { el.classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); }); (inputs.find((el) => !el.value) || inputs[0]).focus(); return; }
  const button = form.querySelector('[type="submit"]');
  button.disabled = true;
  button.textContent = 'Abrindo Bloom…';
  authTimer = setTimeout(() => {
    const firstAccess = pendingAccess?.isNew;
    if (pendingAccess) {
      let account = accountFor(pendingAccess.email);
      if (!account) { account = { email: pendingAccess.email, name: pendingAccess.name, username: pendingAccess.username }; accounts.push(account); }
      storage.set('arquivo-accounts-v1', accounts);
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
  const record = { ...reflections.find(r => r.id === form.dataset.id), ...values, id: form.dataset.id || `r-${Date.now()}`, tags: [...editor.tags], date: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Fortaleza', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) };
  const editing = !!form.dataset.id;
  if (editing) reflections = reflections.map((r) => r.id === record.id ? record : r); else reflections.unshift(record);
  const persisted = storage.set('arquivo-reflections-v1', reflections);
  storage.set('arquivo-entry-draft-v2', null);
  const context = editor.context;
  clearTimeout(autosaveTimer); editor = null;
  if (modal.open) modal.close(); query = ''; activeTheme = '';
  if (context?.sourceId) {
    selectedSource = record.bookId;
    sourceTheme = context.filter && record.tags.includes(context.filter) ? context.filter : '';
    sourceEntryQuery = ''; sourceSearchOpen = false;
    go('fonte/' + encodeURIComponent(record.bookId));
  } else if (context?.theme && record.tags.includes(context.theme) && allThemes().includes(context.theme)) {
    if (context.bookId) pendingSourceSheet = { theme: context.theme, bookId: record.bookId };
    openTheme(context.theme);
  } else go(editorReturn === 'fichas' ? 'fichas' : 'inicio');
  toast(persisted ? (editing ? 'Reflexão atualizada no Bloom.' : 'Uma nova reflexão no Bloom.') : 'Reflexão salva nesta sessão. Armazenamento local indisponível.');
}

const formHandlers = {
  'profile-name-form': saveProfileName,
  'source-entry-edit-form': saveSourceEntry,
  'source-edit-form': saveSourceChanges,
  'theme-edit-form': saveThemeChanges,
  'theme-form': createTheme,
  'source-form': createSource,
  'entry-theme-form': associateEntryTheme,
  'login-form': requestAccessCode,
  'code-form': confirmAccessCode,
  'reflection-form': saveEntry,
};
document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!Object.hasOwn(formHandlers, form.id)) return;
  event.preventDefault();
  formHandlers[form.id](form);
});
modal.addEventListener('click', (event) => { const rect = modal.getBoundingClientRect(); if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close(); });
modal.addEventListener('close', () => { if (opener?.isConnected) opener.focus({ preventScroll: true }); });
window.addEventListener('hashchange', render);
render();
