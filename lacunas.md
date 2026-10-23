# Stich com design
https://stitch.withgoogle.com/projects/16184340414099768666


# Lacunas de navegação, fluxo e evolução do produto

Registro das sugestões levantadas na revisão do protótipo mobile e dos requisitos adicionais indicados pelo usuário para a evolução do produto. Os status identificam o que está resolvido, o que precisa de definição e o que foi registrado para implementação futura.

## 1. Criar uma fonte durante o preenchimento da ficha

- **Status:** pendente.
- **Caso de uso:** a pessoa começa a escrever uma ficha e percebe que a fonte ainda não está cadastrada.
- **Lacuna:** a fonte é obrigatória, mas o seletor permite apenas escolher uma existente. Criar uma fonte exige sair do fluxo de preenchimento.
- **Sugestão:** incluir “+ Nova fonte” no seletor. Preservar o conteúdo da ficha e, após salvar a fonte, retornar ao preenchimento com ela selecionada.

## 2. Retomar rascunhos

- **Status:** pendente.
- **Caso de uso:** a pessoa interrompe uma reflexão e quer continuar depois.
- **Lacuna:** “Salvo automaticamente” representa um rascunho local, que ainda não aparece na listagem de fichas. Abrir “Nova ficha” novamente substitui esse rascunho.
- **Sugestão:** identificar o estado como “Rascunho salvo” e oferecer uma ação explícita para continuar ou descartar o rascunho antes de iniciar outra ficha.

## 3. Sair de uma edição com alterações

- **Status:** pendente.
- **Caso de uso:** a pessoa altera uma ficha, fonte ou tema e fecha o modal antes de salvar.
- **Lacuna:** fechar pelo X, tocar fora ou cancelar pode descartar o conteúdo digitado sem aviso.
- **Sugestão:** quando houver alterações não salvas, oferecer salvar, descartar ou continuar editando. Aplicar um comportamento consistente às diferentes formas de sair.

## 4. Voltar entre visualizações

- **Status:** pendente.
- **Caso de uso:** a pessoa percorre Tema → Fonte filtrada pelo tema → Ficha e quer retornar à etapa anterior.
- **Lacuna:** abrir a ficha substitui o modal da fonte filtrada. Fechá-la retorna ao tema sem recuperar essa visualização. Os modais também não representam etapas próprias no histórico do navegador.
- **Sugestão:** preservar o contexto da fonte filtrada ao abrir a ficha. Fechar ou voltar deve recuperar a etapa anterior; o botão Voltar do navegador/celular deve acompanhar esse comportamento.

## 5. Consistência entre criação e edição de ficha

- **Status:** resolvida.
- **Lacuna identificada:** a criação aceitava uma ficha sem título, mas a edição pelo modal exigia título para salvar.
- **Regra definida pelo usuário e implementada:** apenas fonte/obra e reflexão/nota são obrigatórias. Título, referência, identificador, trecho citado e temas são opcionais em todos os fluxos de criação e edição.
- **Validação atual:** a reflexão/nota precisa ter conteúdo; notas curtas são aceitas, sem o mínimo anterior de 10 caracteres. Campos opcionais vazios permanecem vazios ao reabrir a edição.

## 6. Preservar buscas e posição nas listas

- **Status:** pendente.
- **Caso de uso:** a pessoa encontra uma fonte ou ficha em uma lista, abre o item e depois retorna para continuar a consulta.
- **Lacuna:** algumas navegações limpam a busca, e a troca de página retorna ao topo.
- **Sugestão:** preservar busca, filtros, ordenação e posição de rolagem ao retornar à lista de origem. Limpar esses estados mediante ação explícita.

## 7. Encontrar temas sem fichas

- **Status:** pendente.
- **Caso de uso:** a pessoa busca um tema recém-criado que ainda não possui fichas associadas.
- **Lacuna:** a busca inicial apresenta fontes e reflexões, mas não apresenta temas como resultados próprios. Um tema sem fichas só é encontrável na listagem de temas.
- **Sugestão:** incluir temas nos resultados da busca inicial, com acesso à visão do tema mesmo quando ele estiver vazio.

## 8. Consultar uma ficha sem entrar em edição

- **Status:** sugestão pendente; o comportamento atual segue o wireframe enviado.
- **Caso de uso:** a pessoa quer apenas reler um trecho ou uma reflexão.
- **Comportamento atual:** tocar numa ficha na listagem ou dentro de uma fonte abre diretamente os campos editáveis e o botão “Salvar alterações”.
- **Sugestão:** abrir primeiro uma visualização de leitura, apresentando fonte, trecho, reflexão e temas como conteúdo. Um botão “Editar” abriria o formulário atual.
- **Fluxo proposto:** Listagem ou Fonte → Visualização da ficha → Editar ficha. Ao encerrar a edição, retornar à visualização e preservar a origem da navegação.

## 9. Primeiro acesso e separação dos dados por conta

- **Status:** pendente para um produto real; o protótipo usa dados de demonstração.
- **Caso de uso:** uma pessoa cria sua primeira conta ou alterna entre contas no mesmo navegador.
- **Lacuna:** contas diferentes usam o mesmo acervo local do protótipo. O primeiro acesso também não representa um arquivo pessoal vazio.
- **Sugestão:** definir o estado inicial sem fontes, fichas ou temas, com ações claras para começar. Separar acervo, rascunhos e operações de importação/exportação por conta.

## 10. Definir o comportamento da busca

- **Status:** pendente de definição.
- **Caso de uso:** a pessoa procura uma fonte, ficha ou tema e espera resultados previsíveis entre a busca inicial e as buscas das listagens.
- **Lacuna:** falta consolidar quais campos cada busca considera, como os termos são comparados e quando os resultados são atualizados.
- **Sugestão:** definir o alcance de cada busca, o tratamento de maiúsculas, minúsculas e acentos, a combinação com filtros e o comportamento ao limpar o termo. Definir também se a busca ocorre durante a digitação ou mediante confirmação, com estados claros de carregamento, ausência de resultados e erro.
- **Integração futura:** ao alterar o termo ou os filtros, reiniciar a paginação e carregar os resultados correspondentes à busca atual.

## 11. Definir o comportamento da ordenação

- **Status:** pendente de definição.
- **Caso de uso:** a pessoa ordena uma listagem para encontrar registros recentes, consultar títulos em ordem alfabética ou identificar fontes e temas com mais fichas.
- **Lacuna:** falta consolidar a ordenação padrão de cada listagem, os critérios disponíveis e o significado de opções como “Recentes”, incluindo se consideram criação ou última atualização.
- **Sugestão:** definir critérios e sentidos de ordenação por listagem, com rótulos claros e uma regra de desempate estável. A ordenação deve respeitar a busca e os filtros ativos, além de ser preservada ao retornar de uma visualização.
- **Integração futura:** aplicar a ordenação antes da paginação no backend. Ao mudar o critério, reiniciar o carregamento da lista para evitar misturar páginas com ordens diferentes.

## 12. Criar um tema durante o preenchimento da ficha

- **Status:** pendente.
- **Caso de uso:** durante uma anotação, a leitura suscita um tema novo que a pessoa ainda não havia mapeado.
- **Lacuna:** o protótipo permite digitar um tema novo na associação de tags, mas falta consolidar uma criação rápida e explícita dentro do preenchimento da ficha.
- **Sugestão:** permitir criar um tema diretamente na seleção de temas da ficha, exigindo apenas o título/nome do tema. A definição ou reflexão conceitual deve permanecer opcional, podendo ser preenchida depois.
- **Fluxo proposto:** Ficha em preenchimento → Adicionar tema → Selecionar existente ou criar pelo título → Associar o tema à ficha e continuar a anotação. Preservar todos os campos já preenchidos e indicar quando o tema informado já existir.

## 13. Paginação e rolagem infinita nas listagens

- **Status:** requisito registrado para integração com o backend.
- **Caso de uso:** a pessoa percorre uma listagem extensa e recebe novos registros conforme avança na rolagem.
- **Lacuna:** as listagens atuais trabalham com o acervo local completo, sem paginação no fetch.
- **Requisito definido pelo usuário:** buscar os registros com `offset` e `limit`, usando `limit = 10` itens por página. Iniciar com `offset = 0` e avançar para as páginas seguintes conforme a rolagem exigir novos itens.
- **Sugestão:** manter busca, filtros e ordenação nos fetches de cada página. Exibir carregamento, fim da lista e erro com opção de tentar novamente; evitar requisições simultâneas da mesma página e registros duplicados. Reiniciar a paginação quando a consulta mudar.

## 14. Datas de criação e atualização no modelo de dados

- **Status:** requisito registrado para a modelagem futura do banco de dados.
- **Caso de uso:** o produto precisa identificar quando um registro foi criado e quando foi alterado, inclusive para apresentar e ordenar o acervo de forma consistente.
- **Lacuna:** o protótipo utiliza datas e metadados locais, sem um padrão completo de criação e atualização para todas as entidades.
- **Requisito definido pelo usuário:** incluir `created_at` e `updated_at` em todos os modelos persistidos no banco de dados, incluindo contas, fontes, fichas, temas e demais registros futuros.
- **Sugestão:** preencher ambas as datas na criação, preservar `created_at` nas edições e atualizar `updated_at` quando o registro for alterado. Usar um padrão consistente de data e fuso horário, definindo como essas informações serão preservadas na importação e exportação.
