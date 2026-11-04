# Conecta Doe — protótipo navegável

Protótipo front-end com Next.js 16.4.5, React 19, TypeScript, Tailwind CSS 4, next-intl e Lucide React.

## Instalação

Requisitos: Node.js 20.9+ (recomendado Node 22).

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O Proxy redireciona para `/pt-BR`, `/en` ou `/es` conforme o idioma do navegador e permite a seleção manual persistida pelo next-intl.

Para conferir os tipos e a compilação:

```bash
npm run typecheck
npm run build
```

## Páginas

- `/[locale]` — inicial, categorias, etapas, exemplos de equipamentos, impacto e histórias ilustrativas.
- `/[locale]/equipamentos` — vitrine com busca, filtros de categoria, condição, localização e ordenação.
- `/[locale]/equipamentos/[id]` — detalhes e modal demonstrativo.
- `/[locale]/doar` e `/[locale]/preciso-de-equipamento` — formulários locais em três etapas.
- `/[locale]/sobre` e `/[locale]/como-funciona` — páginas institucionais.

## Acessibilidade

HTML semântico, link para saltar ao conteúdo, estados de foco visíveis, labels associados, feedback de erros, controles ajustáveis de tamanho de fonte, contraste, espaçamento e redução de movimento. VLibras é carregado mediante clique (necessita de acesso à internet). O VLibras não substitui leitores de tela e a tradução automática pode conter erros.

**Ainda requer revisão manual:** navegação por teclado em todos os modais (armadilha de foco), testes com NVDA/VoiceOver, auditoria WCAG 2.2 AA e contraste em todos os estados, avaliação dos textos e revisão de traduções por falantes nativos.

## Limitações e honestidade demonstrativa

Não existe backend, autenticação, upload de fotos, armazenamento nem processamento de doações. Os oito equipamentos são fictícios; a apresentação usa emojis ilustrativos (devem ser substituídos por fotografias autorizadas em versão de produção). A imagem do hero foi recortada do mockup fornecido no chat e pode incluir artefatos gráficos do layout original. Os indicadores 7, 3 e 1 descrevem apenas o protótipo, não resultados reais. O formulário nunca envia dados. O sitemap utiliza o domínio **example.org**, que deve ser trocado antes da publicação. Links de redes sociais e contato não foram criados para evitar destinos falsos.

**Verificação:** a disponibilidade da versão Next.js 16.4.5 foi consultada no npm. Neste ambiente o acesso ao registry do npm via terminal não respondeu; instalação e build ainda não foram executados. Execute `npm install && npm run typecheck && npm run build` localmente para validar.
