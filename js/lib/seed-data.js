'use strict';

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
export { seedBooks, seedReflections, seedThemes };
