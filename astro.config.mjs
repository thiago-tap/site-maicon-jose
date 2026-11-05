// @ts-check
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

/**
 * Template de site personalizado (Git).
 * Build (Actions): PAYLOAD_URL + SITE_TENANT → grava URL da vitrine.
 * Runtime: Worker busca textos/preços ao vivo; layout você edita neste repo.
 */
const painel = (process.env.PAYLOAD_URL || '').replace(/\/+$/, '')
const tenant = (process.env.SITE_TENANT || '').trim()
const urlDaVitrine =
  painel && tenant ? `${painel}/api/site-vitrine/${encodeURIComponent(tenant)}` : ''

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: { enabled: false },
  }),
  // Template sem sessão/KV — evita binding SESSION no Worker.
  session: false,
  vite: {
    define: {
      'import.meta.env.SITE_VITRINE_URL': JSON.stringify(urlDaVitrine),
      'import.meta.env.SITE_TENANT': JSON.stringify(tenant),
    },
  },
})
