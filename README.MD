# Bloom

Aplicação estática para guardar fontes, fichas de leitura, temas e palavras. Esta versão abre direto no acervo, sem login, e salva os dados no localStorage do navegador.

## Rodar localmente

Na pasta do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Use um servidor HTTP porque a aplicação carrega módulos JavaScript.

## Publicar no GitHub Pages

Não precisa de instalação de dependências ou build. Depois de enviar as alterações ao GitHub, selecione em **Settings → Pages → Build and deployment → Deploy from a branch** a branch desejada e a pasta **/ (root)**. O `index.html` já está na raiz e o arquivo `.nojekyll` desativa o processamento do Jekyll.

Os caminhos dos arquivos são relativos e a navegação usa hashes (`#inicio`, `#fichas`), inclusive para funcionar sob `/bloom/`. Referência: [documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Dados e backup

- Os dados ficam apenas neste navegador e nesta origem. Não existe sincronização entre dispositivos, navegadores, localhost, GitHub Pages ou Vercel.
- O acervo começa vazio. Os exemplos de UI ficam arquivados em `js/lib/seed-data.js`, sem importação pela aplicação. A migração inicial remove os IDs de demonstração antigos do navegador e mantém os registros pessoais válidos.
- Abra **Dados neste navegador** ou o perfil para exportar e importar um backup JSON. A importação mostra uma prévia e pede confirmação antes de substituir o acervo.
- Limpar os dados do site pode apagar o acervo. Em navegação privada, os dados podem ser descartados ao fechar a sessão.
- Se uma gravação falhar, a aplicação exibe um aviso para exportar os dados antes de sair.

## Conceito de login

As telas e ações de login demonstrativo foram preservadas. `AUTH_ENABLED` em `js/lib/constants.js` fica `false` nesta versão; habilitá-lo restaura somente o protótipo de acesso. A versão futura precisa de autenticação real e armazenamento por usuário antes de usar esse fluxo em produção. Hospedar no Vercel, por si só, não implementa isso.

## Melhorias já anotadas

### Tela inicial
- Remover esse cabeçalho de temas
    - deixar só fontes recentes e últimas 2 fichas
    - últimas reflexões primeiro na ordem

- paginação -> 10 resultados por página -> offset + limit

- não precisa ter esses cabeçalhos indicando onde estou: "fichas", "início"...
    - pela opção e UI eu sei onde estou.

- quando forem mais de 99 fontes, fichas etc -> aparecer 99+

- encriptar email / dados de acesso
