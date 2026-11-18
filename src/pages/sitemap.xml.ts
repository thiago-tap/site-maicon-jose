import type { APIRoute } from 'astro'
import { urlDoSite } from '../lib/seo'

export const prerender = false

const paginas = [
  { caminho: '/', prioridade: '1.0', mudanca: 'weekly' },
  { caminho: '/filmes', prioridade: '0.9', mudanca: 'weekly' },
  { caminho: '/agenda', prioridade: '0.8', mudanca: 'weekly' },
]

export const GET: APIRoute = () => {
  const base = urlDoSite()
  const hoje = new Date().toISOString().slice(0, 10)
  const urls = paginas
    .map(
      (p) => `  <url>
    <loc>${base}${p.caminho === '/' ? '/' : p.caminho}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>${p.mudanca}</changefreq>
    <priority>${p.prioridade}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
