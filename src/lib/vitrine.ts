import { fallback } from '../data/fallback'
import { filmesFallback, type FilmeVitrine } from '../data/filmes'
import type { AgendaVitrine } from './agenda'

/** Subconjunto do JSON público GET /api/site-vitrine/:slug usado nesta landing. */
export type Vitrine = {
  tenant?: { slug?: string; nome?: string; url?: string }
  identidade?: {
    /** Contrato da vitrine (painel). */
    nome?: string
    /** Alias legado / fallback local. */
    nomeDoSite?: string
    primeiroNome?: string
    fotografo?: string
    especialidade?: string
    frase?: string
    lema?: string
    cidade?: string
    uf?: string
    descricao?: string
    tituloSeo?: string
  }
  analytics?: { gaId?: string; gtmId?: string }
  marca?: {
    monograma?: { url?: string; fontesAoVivo?: { base?: { src: string }; computador?: { src: string } } }
    imagemSocial?: { url?: string; fontesAoVivo?: { base?: { src: string }; computador?: { src: string } } }
  }
  fotos?: {
    'sobre-retrato'?: {
      imagem?: { url?: string; fontesAoVivo?: { base?: { src: string }; computador?: { src: string } } }
    }
  }
  inicio?: {
    especialidade?: string
    frase?: string
    bannerVideo?: {
      desktop?: { youtubeId?: string; url?: string }
      mobile?: { youtubeId?: string; url?: string }
      capa?: {
        url?: string
        alt?: string
        fontesAoVivo?: {
          base?: { src: string }
          computador?: { src: string }
        }
      }
    }
  }
  sobre?: {
    titulo?: string
    subtitulo?: string
    resumo?: string
    apresentacao?: string
    estilo?: string
    numeros?: Array<{ valor: number; rotulo: string }>
  }
  diferenciais?: Array<{
    id: string
    titulo: string
    texto: string
    ordem: number
  }>
  agenda?: AgendaVitrine
  comoFunciona?: Array<{
    id: string
    titulo: string
    texto: string
    detalhe?: string
    ordem: number
  }>
  faq?: Array<{
    id: string
    pergunta: string
    resposta: string
    ordem: number
  }>
  pacotes?: Array<{
    id: string
    nome: string
    ordem: number
    preco: number
    cobertura?: string
    chamada?: string
    mensagemWhatsapp?: string
    itens: string[]
    destaque?: boolean
    selo?: string
  }>
  extras?: Array<{
    id: string
    nome: string
    preco?: number
    aPartirDe?: boolean
    unidade?: string
    descricao?: string
    itens?: string[]
  }>
  depoimentos?: Array<{
    id: string
    casal: string
    local?: string
    texto: string
    ordem?: number
  }>
  contato?: {
    whatsapp?: { numero?: string; mensagem?: string; exibicao?: string }
    instagram?: { usuario?: string; url?: string }
    email?: string
    /** Canal YouTube (sites Git / filmmaker). */
    youtube?: { url?: string; rotulo?: string }
  }
  filmes?: FilmeVitrine[]
}

/** TTL do JSON da vitrine no Cache API do Worker (corta TTFB nas visitas seguintes). */
const CACHE_VITRINE_SEGUNDOS = 90

type CacheGlobal = { default?: { match: (req: Request) => Promise<Response | undefined>; put: (req: Request, res: Response) => Promise<void> } }

function cacheDoWorker(): CacheGlobal['default'] | undefined {
  return (globalThis as unknown as { caches?: CacheGlobal }).caches?.default
}

async function vitrineDoCache(url: string): Promise<Vitrine | null> {
  const cache = cacheDoWorker()
  if (!cache) return null
  try {
    const hit = await cache.match(new Request(url))
    if (!hit?.ok) return null
    return (await hit.json()) as Vitrine
  } catch {
    return null
  }
}

async function guardarVitrineNoCache(url: string, dados: Vitrine): Promise<void> {
  const cache = cacheDoWorker()
  if (!cache) return
  try {
    await cache.put(
      new Request(url),
      new Response(JSON.stringify(dados), {
        headers: {
          'content-type': 'application/json',
          'cache-control': `public, max-age=${CACHE_VITRINE_SEGUNDOS}`,
        },
      }),
    )
  } catch {
    /* Cache API indisponível (dev/preview) — segue sem cache. */
  }
}

/** Painel ainda manda “Olá, Maicon!” — alinha à marca Mayck no site. */
export function normalizarMensagemWhatsapp(mensagem: string): string {
  return mensagem
    .replace(/\bOlá,\s*Maicon!/gi, 'Olá, Mayck!')
    .replace(/\bOi,\s*Maicon!/gi, 'Oi, Mayck!')
    .replace(/\bHello,\s*Maicon!/gi, 'Hello, Mayck!')
}

/**
 * Busca a vitrine ao vivo. Se falhar (build local sem env, painel fora), usa fallback.
 * No Worker: Cache API ~90s para não bater no painel a cada HTML.
 */
export async function buscarVitrine(): Promise<Vitrine> {
  const url = typeof import.meta.env.SITE_VITRINE_URL === 'string' ? import.meta.env.SITE_VITRINE_URL : ''
  if (!url) return fallback

  const emCache = await vitrineDoCache(url)
  if (emCache) return mesclarComFallback(emCache)

  try {
    const resposta = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(2_500),
      // Cloudflare: cacheia o subrequest na borda quando disponível.
      cf: { cacheTtl: CACHE_VITRINE_SEGUNDOS, cacheEverything: true },
    } as RequestInit)
    if (!resposta.ok) return fallback
    const dados = (await resposta.json()) as Vitrine
    await guardarVitrineNoCache(url, dados)
    return mesclarComFallback(dados)
  } catch {
    return fallback
  }
}

/** Seed de fotógrafo no painel ainda não trocado pela marca Mayck. */
function aindaSeedFotografo(dados: Vitrine): boolean {
  const especialidade = `${dados.identidade?.especialidade || ''} ${dados.inicio?.especialidade || ''}`
  const sobre = `${dados.sobre?.resumo || ''} ${dados.sobre?.titulo || ''}`
  return /fotografia|fotógrafo|fotografa/i.test(`${especialidade} ${sobre}`)
}

function pacotesProntos(pacotes: Vitrine['pacotes']): boolean {
  if (!pacotes?.length || pacotes.length < 3) return false
  return pacotes.every((p) => (p.itens?.length ?? 0) > 0 && p.nome?.trim())
}

/** Garante seções Mayck mesmo com tenant ainda no seed de fotógrafo. */
function mesclarComFallback(dados: Vitrine): Vitrine {
  const seedFoto = aindaSeedFotografo(dados)
  const identidade = seedFoto
    ? {
        ...fallback.identidade,
        cidade: dados.identidade?.cidade?.trim() || fallback.identidade?.cidade,
        uf: dados.identidade?.uf?.trim() || fallback.identidade?.uf,
      }
    : { ...fallback.identidade, ...dados.identidade }

  const inicio = seedFoto
    ? {
        ...fallback.inicio,
        bannerVideo: dados.inicio?.bannerVideo || fallback.inicio?.bannerVideo,
      }
    : { ...fallback.inicio, ...dados.inicio }

  const sobre = seedFoto
    ? {
        ...fallback.sobre,
        numeros: dados.sobre?.numeros?.length ? dados.sobre.numeros : fallback.sobre?.numeros,
      }
    : {
        ...fallback.sobre,
        ...dados.sobre,
        numeros: dados.sobre?.numeros?.length ? dados.sobre.numeros : fallback.sobre?.numeros,
      }

  return {
    ...fallback,
    ...dados,
    identidade,
    inicio,
    sobre,
    diferenciais: dados.diferenciais?.length ? dados.diferenciais : fallback.diferenciais,
    agenda: {
      ativo: dados.agenda?.anos?.length ? Boolean(dados.agenda.ativo) : Boolean(fallback.agenda?.ativo),
      texto: dados.agenda?.texto?.trim() || fallback.agenda?.texto,
      anos: dados.agenda?.anos?.length ? dados.agenda.anos : fallback.agenda?.anos,
    },
    comoFunciona: dados.comoFunciona?.length ? dados.comoFunciona : fallback.comoFunciona,
    faq: dados.faq?.length ? dados.faq : fallback.faq,
    pacotes: pacotesProntos(dados.pacotes) ? dados.pacotes : fallback.pacotes,
    extras: dados.extras?.length ? dados.extras : fallback.extras,
    depoimentos: dados.depoimentos?.length ? dados.depoimentos : fallback.depoimentos,
    filmes: dados.filmes?.length ? dados.filmes : filmesFallback,
    contato: {
      whatsapp: {
        ...fallback.contato?.whatsapp,
        ...dados.contato?.whatsapp,
        mensagem: normalizarMensagemWhatsapp(
          dados.contato?.whatsapp?.mensagem?.trim() ||
            fallback.contato?.whatsapp?.mensagem ||
            '',
        ),
      },
      instagram: { ...fallback.contato?.instagram, ...dados.contato?.instagram },
      email: dados.contato?.email || fallback.contato?.email,
      youtube: { ...fallback.contato?.youtube, ...dados.contato?.youtube },
    },
  }
}

export function linkWhatsapp(vitrine: Vitrine, mensagemExtra?: string): string | null {
  const numero = vitrine.contato?.whatsapp?.numero?.replace(/\D/g, '')
  if (!numero) return null
  const mensagem = encodeURIComponent(
    normalizarMensagemWhatsapp(
      mensagemExtra?.trim() ||
        vitrine.contato?.whatsapp?.mensagem?.trim() ||
        'Olá, Mayck! Vi o site da Mayck Filmes e gostaria de conversar.',
    ),
  )
  return `https://wa.me/${numero}?text=${mensagem}`
}

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

/** Preço 0 ou ausente = sob consulta (Mayck Filmes). */
export function rotuloPreco(valor?: number | null): string {
  if (valor == null || !Number.isFinite(valor) || valor <= 0) return 'Sob consulta'
  return formatarPreco(valor)
}

export function marcaDoSite(dados: Vitrine): string {
  return (
    dados.identidade?.nome?.trim() ||
    dados.identidade?.nomeDoSite?.trim() ||
    dados.identidade?.fotografo?.trim() ||
    dados.identidade?.primeiroNome?.trim() ||
    'Mayck Filmes'
  )
}

/** URL pública de imagem da vitrine (fontesAoVivo ou url http). */
export function urlMidiaVitrine(foto?: {
  url?: string
  fontesAoVivo?: { base?: { src: string }; computador?: { src: string } }
}): string | undefined {
  const aoVivo = foto?.fontesAoVivo?.computador?.src || foto?.fontesAoVivo?.base?.src
  if (aoVivo?.startsWith('https://')) return aoVivo
  const url = foto?.url?.trim()
  if (url && url !== '.' && url.startsWith('https://')) return url
  return undefined
}

export function urlRetratoSobre(dados: Vitrine): string | undefined {
  return (
    urlMidiaVitrine(dados.fotos?.['sobre-retrato']?.imagem) ||
    urlMidiaVitrine(dados.marca?.monograma)
  )
}
