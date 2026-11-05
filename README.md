# Site — Maicon José

Site personalizado (origem **Git**) do filmmaker **Maicon José**, na plataforma Estúdio Sites.

- **Layout / código:** este repositório
- **Textos / preços / WhatsApp:** painel → `GET /api/site-vitrine/maicon-jose`
- **Referência visual enviada pelo cliente:** [landing de orçamento cinematográfica](https://orcamento.droneefilmes.com.br/) (estrutura e clima; marca própria do Maicon)

## Identificadores

| Campo | Valor |
| --- | --- |
| Slug do tenant | `maicon-jose` |
| Worker Cloudflare | `site-maicon-jose` |
| Repo | `thiago-tap/site-maicon-jose` |

## Dev local

Requer **Node.js ≥ 24** e pnpm.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Sem painel/tenant, a página usa o conteúdo de fallback em `src/data/fallback.ts`.

## Build (igual ao Actions)

```bash
PAYLOAD_URL=https://painel.estudiosites.com.br SITE_TENANT=maicon-jose pnpm build
```

Publicação: workflow `publicar-site-git.yml` no monorepo `plataforma-fotografos` (clone → build → `wrangler deploy --name site-maicon-jose`).

## Próximos passos no painel

1. **Novo cliente** → origem **Site personalizado (Git)** → slug `maicon-jose`
2. Ligar este repo (`https://github.com/thiago-tap/site-maicon-jose.git` ou `git@github.com:thiago-tap/site-maicon-jose.git`)
3. Preencher pacotes, extras, sobre, depoimentos e WhatsApp
4. Publicar (1ª vez sobe o Worker)

## Escopo

Fecha pelo **WhatsApp** (sem orçamento online, galeria privada ou cobrança automática). Filmes do showreel editáveis em `src/data/filmes.ts` até haver campo de vídeo no painel.
