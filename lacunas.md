# Stich com design
https://stitch.withgoogle.com/projects/16184340414099768666


# Lacunas de navegação, fluxo e evolução do produto

Registro das sugestões levantadas na revisão do protótipo mobile e dos requisitos adicionais indicados pelo usuário para a evolução do produto. Os status identificam o que está resolvido, o que precisa de definição e o que foi registrado para implementação futura.

## 1. Criar uma fonte durante o preenchimento da ficha

- **Status:** implementada.
- **Caso de uso:** a pessoa começa a escrever uma ficha e percebe que a fonte ainda não está cadastrada.
- **Lacuna:** a fonte é obrigatória, mas o seletor permite apenas escolher uma existente. Criar uma fonte exige sair do fluxo de preenchimento.
- **Sugestão:** incluir “+ Nova fonte” no seletor. Preservar o conteúdo da ficha e, após salvar a fonte, retornar ao preenchimento com ela selecionada.

## 2. Retomar rascunhos

- **Status:** implementada.
- **Caso de uso:** a pessoa interrompe uma reflexão e quer continuar depois.
- **Lacuna:** “Salvo automaticamente” representa um rascunho local, que ainda não aparece na listagem de fichas. Abrir “Nova ficha” novamente substitui esse rascunho.
- **Sugestão:** identificar o estado como “Rascunho salvo” e oferecer uma ação explícita para continuar ou descartar o rascunho antes de iniciar outra ficha.

## 3. Sair de uma edição com alterações

- **Status:** implementada.
- **Caso de uso:** a pessoa altera uma ficha, fonte ou tema e fecha o modal antes de salvar.
- **Lacuna:** fechar pelo X, tocar fora ou cancelar pode descartar o conteúdo digitado sem aviso.
- **Sugestão:** quando houver alterações não salvas, oferecer salvar, descartar ou continuar editando. Aplicar um comportamento consistente às diferentes formas de sair.

## 4. Voltar entre visualizações

- **Status:** implementada.
- **Caso de uso:** a pessoa percorre Tema → Fonte filtrada pelo tema → Ficha e quer retornar à etapa anterior.
- **Lacuna:** abrir a ficha substitui o modal da fonte filtrada. Fechá-la retorna ao tema sem recuperar essa visualização. Os modais também não representam etapas próprias no histórico do navegador.
- **Sugestão:** preservar o contexto da fonte filtrada ao abrir a ficha. Fechar ou voltar deve recuperar a etapa anterior; o botão Voltar do navegador/celular deve acompanhar esse comportamento.

## 5. Consistência entre criação e edição de ficha

- **Status:** resolvida.
- **Lacuna identificada:** a criação aceitava uma ficha sem título, mas a edição pelo modal exigia título para salvar.
- **Regra definida pelo usuário e implementada:** apenas fonte/obra e reflexão/nota são obrigatórias. Título, referência, identificador, trecho citado e temas são opcionais em todos os fluxos de criação e edição.
- **Validação atual:** a reflexão/nota precisa ter conteúdo; notas curtas são aceitas, sem o mínimo anterior de 10 caracteres. Campos opcionais vazios permanecem vazios ao reabrir a edição.

## 6. Preservar buscas e posição nas listas

- **Status:** implementada.
- **Caso de uso:** a pessoa encontra uma fonte ou ficha em uma lista, abre o item e depois retorna para continuar a consulta.
- **Lacuna:** algumas navegações limpam a busca, e a troca de página retorna ao topo.
- **Sugestão:** preservar busca, filtros, ordenação e posição de rolagem ao retornar à lista de origem. Limpar esses estados mediante ação explícita.

## 7. Encontrar temas sem fichas

- **Status:** implementada.
- **Caso de uso:** a pessoa busca um tema recém-criado que ainda não possui fichas associadas.
- **Lacuna:** a busca inicial apresenta fontes e reflexões, mas não apresenta temas como resultados próprios. Um tema sem fichas só é encontrável na listagem de temas.
- **Sugestão:** incluir temas nos resultados da busca inicial, com acesso à visão do tema mesmo quando ele estiver vazio.

## 8. Consultar uma ficha sem entrar em edição

- **Status:** implementada.
- **Caso de uso:** a pessoa quer apenas reler um trecho ou uma reflexão.
- **Comportamento atual:** tocar numa ficha na listagem ou dentro de uma fonte abre diretamente os campos editáveis e o botão “Salvar alterações”.
- **Sugestão:** abrir primeiro uma visualização de leitura, apresentando fonte, trecho, reflexão e temas como conteúdo. Um botão “Editar” abriria o formulário atual.
- **Fluxo proposto:** Listagem ou Fonte → Visualização da ficha → Editar ficha. Ao encerrar a edição, retornar à visualização e preservar a origem da navegação.

## 9. Primeiro acesso e separação dos dados por conta

- **Status:** implementada (protótipo com acervo por conta via `bloom-archive-v2-<email>`).
- **Caso de uso:** uma pessoa cria sua primeira conta ou alterna entre contas no mesmo navegador.
- **Lacuna:** contas diferentes usam o mesmo acervo local do protótipo. O primeiro acesso também não representa um arquivo pessoal vazio.
- **Sugestão:** definir o estado inicial sem fontes, fichas ou temas, com ações claras para começar. Separar acervo, rascunhos e operações de importação/exportação por conta.

## 10. Definir o comportamento da busca

- **Status:** implementada (normalização sem acento, `includes`, escopo por listagem).
- **Caso de uso:** a pessoa procura uma fonte, ficha ou tema e espera resultados previsíveis entre a busca inicial e as buscas das listagens.
- **Lacuna:** falta consolidar quais campos cada busca considera, como os termos são comparados e quando os resultados são atualizados.
- **Sugestão:** definir o alcance de cada busca, o tratamento de maiúsculas, minúsculas e acentos, a combinação com filtros e o comportamento ao limpar o termo. Definir também se a busca ocorre durante a digitação ou mediante confirmação, com estados claros de carregamento, ausência de resultados e erro.
- **Integração futura:** ao alterar o termo ou os filtros, reiniciar a paginação e carregar os resultados correspondentes à busca atual.

## 11. Definir o comportamento da ordenação

- **Status:** implementada (`Recentes` = `updatedAt`/`date`/`addedAt`, desempate estável).
- **Caso de uso:** a pessoa ordena uma listagem para encontrar registros recentes, consultar títulos em ordem alfabética ou identificar fontes e temas com mais fichas.
- **Lacuna:** falta consolidar a ordenação padrão de cada listagem, os critérios disponíveis e o significado de opções como “Recentes”, incluindo se consideram criação ou última atualização.
- **Sugestão:** definir critérios e sentidos de ordenação por listagem, com rótulos claros e uma regra de desempate estável. A ordenação deve respeitar a busca e os filtros ativos, além de ser preservada ao retornar de uma visualização.
- **Integração futura:** aplicar a ordenação antes da paginação no backend. Ao mudar o critério, reiniciar o carregamento da lista para evitar misturar páginas com ordens diferentes.

## 12. Criar um tema durante o preenchimento da ficha

- **Status:** implementada.
- **Caso de uso:** durante uma anotação, a leitura suscita um tema novo que a pessoa ainda não havia mapeado.
- **Lacuna:** o protótipo permite digitar um tema novo na associação de tags, mas falta consolidar uma criação rápida e explícita dentro do preenchimento da ficha.
- **Sugestão:** permitir criar um tema diretamente na seleção de temas da ficha, exigindo apenas o título/nome do tema. A definição ou reflexão conceitual deve permanecer opcional, podendo ser preenchida depois.
- **Fluxo proposto:** Ficha em preenchimento → Adicionar tema → Selecionar existente ou criar pelo título → Associar o tema à ficha e continuar a anotação. Preservar todos os campos já preenchidos e indicar quando o tema informado já existir.

## 13. Paginação e rolagem infinita nas listagens

- **Status:** implementada no protótipo (`PAGE_SIZE = 10`, scroll infinito local).
- **Caso de uso:** a pessoa percorre uma listagem extensa e recebe novos registros conforme avança na rolagem.
- **Lacuna:** as listagens atuais trabalham com o acervo local completo, sem paginação no fetch.
- **Requisito definido pelo usuário:** buscar os registros com `offset` e `limit`, usando `limit = 10` itens por página. Iniciar com `offset = 0` e avançar para as páginas seguintes conforme a rolagem exigir novos itens.
- **Sugestão:** manter busca, filtros e ordenação nos fetches de cada página. Exibir carregamento, fim da lista e erro com opção de tentar novamente; evitar requisições simultâneas da mesma página e registros duplicados. Reiniciar a paginação quando a consulta mudar.

## 14. Datas de criação e atualização no modelo de dados

- **Status:** implementada (`createdAt` / `updatedAt` em fontes, fichas e temas).
- **Caso de uso:** o produto precisa identificar quando um registro foi criado e quando foi alterado, inclusive para apresentar e ordenar o acervo de forma consistente.
- **Lacuna:** o protótipo utiliza datas e metadados locais, sem um padrão completo de criação e atualização para todas as entidades.
- **Requisito definido pelo usuário:** incluir `created_at` e `updated_at` em todos os modelos persistidos no banco de dados, incluindo contas, fontes, fichas, temas e demais registros futuros.
- **Sugestão:** preencher ambas as datas na criação, preservar `created_at` nas edições e atualizar `updated_at` quando o registro for alterado. Usar um padrão consistente de data e fuso horário, definindo como essas informações serão preservadas na importação e exportação.

# Lacunas de UX e UI

Registro das melhorias de experiência e interface levantadas na revisão do protótipo. Prioridade alta reforça fluxo (já parcialmente coberto nas lacunas 1–12); as itens abaixo cobrem tela inicial, empty states, desktop, consistência visual e feedback de lista.

## 15. Tela inicial mais enxuta

- **Status:** implementada.
- **Caso de uso:** a pessoa abre o Início para retomar o que estava lendo ou refletindo, sem ruído.
- **Lacuna:** a home ainda carrega cabeçalhos de “onde estou”, blocos de temas e hierarquia que compete com o conteúdo recente. Contagens grandes não têm teto visual.
- **Sugestão:** remover o cabeçalho de temas; deixar só fontes recentes e as últimas 2 fichas, com reflexões primeiro na ordem. Remover títulos de seção do tipo “Fichas” / “Início” — a navegação já indica o lugar. Quando fontes, fichas ou temas passarem de 99, exibir `99+`.

## 16. Empty states com ação clara

- **Status:** implementada.
- **Caso de uso:** a pessoa chega a uma lista vazia (acervo novo, filtro sem resultados ou tema sem fichas) e precisa saber o próximo passo.
- **Lacuna:** os empty states atuais são sobretudo texto + ícone de lupa, sem CTA direto para criar ou limpar o filtro.
- **Sugestão:** em acervo vazio, oferecer ações como “Criar primeira ficha”, “Nova fonte” ou “Novo tema”. Em busca/filtro sem resultado, oferecer limpar a consulta e, quando fizer sentido, criar o registro a partir do termo.

## 17. Layout desktop além do frame mobile

- **Status:** implementada.
- **Caso de uso:** a pessoa usa o Bloom em tela larga para ler e anotar com mais conforto.
- **Lacuna:** o layout cresce (até ~1120px), mas a composição ainda remete ao protótipo de ~390px — shell de card, densidade e leitura estreitas demais para desktop.
- **Sugestão:** em breakpoints maiores, aproveitar sidebar de navegação + área de conteúdo/leitura mais larga na ficha e nas listagens, sem envolver tudo em card-shell. Manter a linguagem Athenaeum Obsidian; só expandir a composição.

## 18. Consistência do botão e do modal de perfil

- **Status:** implementada.
- **Caso de uso:** a pessoa abre o perfil a partir de qualquer tela do arquivo.
- **Lacuna:** o botão de perfil muda de estilo entre telas; em alguns estados o contraste parece frágil (cor de canvas sobre fundo escuro).
- **Sugestão:** unificar tamanho, borda, cor e hover do botão de perfil em todo o archive. Garantir contraste legível no auth e no archive.

## 19. Uso parcimonioso do ouro

- **Status:** implementada.
- **Caso de uso:** a pessoa precisa perceber rapidamente o que é ação principal ou foco ativo.
- **Lacuna:** o ouro aparece em botões grandes, nav ativa, chips, stats e ícones ao mesmo tempo, diluindo a hierarquia.
- **Sugestão:** reservar o ouro para foco e ação principal. Demais elementos estruturais e metadados devem permanecer em graphite / muted, alinhados ao DESIGN.md.

## 20. Uma linguagem só para overlays

- **Status:** implementada (sheets para leitura/edição contextual; perfil em modal).
- **Caso de uso:** a pessoa cria, edita ou consulta fichas, fontes e temas em fluxos parecidos.
- **Lacuna:** o protótipo mistura modal centrado, bottom sheet e tela cheia para tarefas de natureza semelhante.
- **Sugestão:** definir uma regra única — sheet no mobile, painel/lateral ou modal amplo no desktop — e aplicar de forma consistente a leitura, edição e criação.

## 21. Feedback visual de listagens longas

- **Status:** implementada.
- **Caso de uso:** a pessoa percorre listagens paginadas e precisa saber se há carregamento, fim da lista ou erro.
- **Lacuna:** sem skeleton, indicador de carregamento ou “fim da lista” na UI atual, porque o acervo local ainda vem inteiro.
- **Sugestão:** ao integrar `offset` / `limit = 10`, exibir skeleton ou estado de carregamento, mensagem de fim da lista e erro com “Tentar novamente”. Evitar tela em branco entre páginas.

# Referências de UX e UI

Curadoria alinhada à proposta Athenaeum Obsidian (arquivo de leitura, fichas, temas, reflexão longa). Priorizar Matter + Capacities + Are.na para fluxo; Linear + Bear/iA Writer para desktop e tipografia; NN/g + HIG para overlays.

## Produtos

### Matter — leitura imersiva
- **URL:** https://robertbreen.com/2025/02/27/elevate-your-online-reading-with-matter/
- **O que roubar:** fila e leitor minimalistas; chrome some durante a leitura e volta no fim; contraste noturno sem glare.
- **Lacunas:** 8, 15, 16.

### Readwise Reader — arquivo (e anti-padrão de clutter)
- **URL:** https://www.wired.com/story/the-best-read-it-later-apps-for-curating-your-longreads/
- **O que roubar:** escopo completo de highlights, tags, busca e ordenação. Evitar a UI sobrecarregada de gestos e menus.
- **Lacunas:** 10, 11, 13, 21.

### Capacities — object types
- **URL:** https://docs.capacities.io/tutorials/object-types-vs-folders
- **O que roubar:** Fonte / Ficha / Tema como objetos tipados com properties; criar objeto sem sair do contexto; cards por tipo.
- **Lacunas:** 1, 7, 12.

### Obsidian — PKM e rascunho
- **URL:** https://obsidian.md/
- **O que roubar:** backlinks, tags, painel de propriedades; leitura vs edição em nota; draft local que não some da lista.
- **Lacunas:** 2, 4, 8.

### Are.na — arquivo lento
- **URL:** https://www.are.na/
- **Tokens / UI:** https://tastekit.dev/gallery/apps/arena
- **Crítica iOS (o que não fazer):** https://ixd.prattsi.org/2026/02/design-critique-are-na-ios-app-2/
- **O que roubar:** modelo canal/bloco ≈ tema/ficha; captura → arranjo → busca → conexão; ramp de cinzas com accent raro; hierarquia por tipografia, não por cor. Evitar metadata competindo com o conteúdo.
- **Lacunas:** 7, 15, 16, 18, 19.

### Literal — página de obra
- **URL (redesign):** https://literal.club/changelog/book-pages-redesigned
- **Galeria UI:** https://dezzayn.com/apps/literal
- **O que roubar:** página de obra clara; destaque de quotes/notas; home sem widgets competindo; estética literária tipográfica.
- **Lacunas:** 8, 15, 17.

## Padrões de interação

### NN/g — Bottom sheets
- **URL:** https://www.nngroup.com/articles/bottom-sheet/
- **O que roubar:** sheet só para interação curta e contextual; leitura/edição longa em tela cheia, não em sheet.
- **Lacunas:** 8, 20.

### Apple HIG — Sheets
- **URL:** https://developer.apple.com/design/human-interface-guidelines/sheets
- **O que roubar:** sheet para tarefa scoped; Cancel/Done explícitos; tarefas longas em full-screen.
- **Lacunas:** 3, 20.

### Material 3 — Bottom sheets
- **URL:** https://m3.material.io/components/bottom-sheets/overview
- **O que roubar:** standard vs modal; conteúdo secundário; dismiss para voltar ao primary.
- **Lacunas:** 4, 20.

### Linear UI redesign
- **URL:** https://linear.app/now/how-we-redesigned-the-linear-ui
- **O que roubar:** sidebar + painéis densos; hierarquia por superfície/opacidade; um accent.
- **Lacunas:** 17, 19.

## UI / tipografia

### Bear — tipografia e foco
- **URL:** https://bear.app/faq/typography-options/
- **O que roubar:** measure de leitura; tema true-black (Dieci); focus mode sem chrome.
- **Lacunas:** 8, 17, 19.

### iA Writer — measure e toolbar
- **URL:** https://ia.net/writer/support/basics/settings
- **O que roubar:** line length 64–80ch; toolbar que some; focus por sentença/parágrafo.
- **Lacunas:** 8, 17.

## Mapeamento rápido

| Prioridade | Lacunas | Referências |
|---|---|---|
| Fluxo (P0) | 1–4, 8, 12 | Capacities, Obsidian, Matter, HIG |
| Clareza (P1) | 15–16, 10–11 | Are.na, Literal, Readwise (escopo) |
| Visual (P2) | 17–20 | Linear, Are.na tokens, Bear, iA Writer, NN/g |
| Listas | 13, 21 | Readwise (escopo), Linear (densidade) |
