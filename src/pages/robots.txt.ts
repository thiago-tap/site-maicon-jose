import type { APIRoute } from 'astro'
import { urlDoSite } from '../lib/seo'

export const prerender = false

export const GET: APIRoute = () => {
  // Formato clássico (linha em branco final) — evita falso negativo em auditors.
  const corpo = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${urlDoSite()}/sitemap.xml`,
    '',
  ].join('\n')

  return new Response(corpo, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
