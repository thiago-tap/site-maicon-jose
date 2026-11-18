import type { Vitrine } from './vitrine'

/** URL pública padrão do Worker (até domínio próprio). */
export const SITE_PUBLICO_PADRAO = 'https://site-maicon-jose.catiteo.workers.dev'

export function urlDoSite(): string {
  const env =
    typeof import.meta.env.SITE_PUBLIC_URL === 'string' ? import.meta.env.SITE_PUBLIC_URL.trim() : ''
  return (env || SITE_PUBLICO_PADRAO).replace(/\/+$/, '')
}

export function absoluto(caminho: string, base = urlDoSite()): string {
  if (/^https?:\/\//i.test(caminho)) return caminho
  const path = caminho.startsWith('/') ? caminho : `/${caminho}`
  return `${base}${path}`
}

export function truncarMeta(texto: string, max = 155): string {
  const limpo = texto.replace(/\s+/g, ' ').trim()
  if (limpo.length <= max) return limpo
  return `${limpo.slice(0, max - 1).trimEnd()}…`
}

/** Descrição SEO do questionário (fallback). */
export const DESCRICAO_SEO_PADRAO =
  'Mayck Filmes: filmes de casamento cinematográficos, clássicos e acolhedores em Brasília-DF e destinos. Peça seu orçamento e eternize seu grande dia.'

export const TITULO_SEO_PADRAO = 'Mayck Filmes | Filmmaker de Casamentos em Brasília-DF'

/** Imagem de compartilhamento: capa do filme destaque ou thumb YouTube. */
export function imagemSocial(dados: Vitrine): string | undefined {
  const filmes = dados.filmes || []
  const destaque = filmes.find((f) => f.destaque) || filmes[0]
  if (!destaque) return undefined
  const aoVivo =
    destaque.capa?.fontesAoVivo?.computador?.src || destaque.capa?.fontesAoVivo?.base?.src
  if (aoVivo?.startsWith('https://')) return aoVivo
  if (destaque.youtubeId) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(destaque.youtubeId)}/maxresdefault.jpg`
  }
  return undefined
}

export function dadosNegocioJsonLd(dados: Vitrine, paginaUrl: string) {
  const nome =
    dados.identidade?.nomeDoSite?.trim() ||
    dados.identidade?.fotografo?.trim() ||
    'Mayck Filmes'
  const descricao =
    dados.identidade?.descricao?.trim() || DESCRICAO_SEO_PADRAO
  const telefone = dados.contato?.whatsapp?.numero?.replace(/\D/g, '')
  const sameAs = [
    dados.contato?.instagram?.url,
    dados.contato?.youtube?.url,
  ].filter((u): u is string => Boolean(u?.trim()))

  return {
    '@type': 'ProfessionalService',
    '@id': `${urlDoSite()}/#negocio`,
    name: nome,
    alternateName: 'Mayck Filmes',
    description: descricao,
    url: urlDoSite(),
    ...(telefone && { telephone: `+${telefone}` }),
    ...(dados.contato?.email && { email: dados.contato.email }),
    priceRange: '$$',
    image: imagemSocial(dados),
    sameAs,
    founder: {
      '@type': 'Person',
      name: 'Maicon José Oliveira da Vera',
      alternateName: 'Mayck',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: dados.identidade?.cidade || 'Brasília',
      addressRegion: dados.identidade?.uf || 'DF',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Brasília' },
      { '@type': 'AdministrativeArea', name: 'Distrito Federal' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    knowsAbout: [
      'Filme de casamento',
      'Filmmaker de casamento Brasília',
      'Filmagem cinematográfica de casamento',
      'Pré-wedding',
      'Casamento civil',
    ],
    mainEntityOfPage: paginaUrl,
  }
}

export function faqJsonLd(
  perguntas: Array<{ pergunta: string; resposta: string }>,
) {
  if (!perguntas.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: perguntas.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.resposta,
      },
    })),
  }
}

export function breadcrumbJsonLd(itens: Array<{ nome: string; caminho: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: absoluto(item.caminho),
    })),
  }
}
