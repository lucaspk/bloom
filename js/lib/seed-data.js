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

// Archived UI fixtures. These are deliberately not imported by the application.
export const themeFlowExamples = [
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
export const sourceFlowExamples = [
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
