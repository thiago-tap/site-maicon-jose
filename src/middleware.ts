import { defineMiddleware } from 'astro:middleware'

/**
 * HTML curto na borda (s-maxage) + SWR — visita seguinte não espera o painel.
 * Assets /_astro já saem com immutable no adapter.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const resposta = await next()
  const tipo = resposta.headers.get('content-type') || ''
  if (!tipo.includes('text/html')) return resposta

  const headers = new Headers(resposta.headers)
  if (!headers.has('Cache-Control')) {
    headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  }
  return new Response(resposta.body, {
    status: resposta.status,
    statusText: resposta.statusText,
    headers,
  })
})
