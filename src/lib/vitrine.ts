import { fallback } from '../data/fallback'
import { filmesFallback, type FilmeVitrine } from '../data/filmes'

/** Subconjunto do JSON público GET /api/site-vitrine/:slug usado nesta landing. */
export type Vitrine = {
  tenant?: { slug?: string; nome?: string; url?: string }
  identidade?: {
    nomeDoSite?: string
    primeiroNome?: string
    fotografo?: string
    especialidade?: string
    frase?: string
    lema?: string
    cidade?: string
    uf?: string
    descricao?: string
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
  }
  filmes?: FilmeVitrine[]
}

/**
 * Busca a vitrine ao vivo. Se falhar (build local sem env, painel fora), usa fallback.
 */
export async function buscarVitrine(): Promise<Vitrine> {
  const url = typeof import.meta.env.SITE_VITRINE_URL === 'string' ? import.meta.env.SITE_VITRINE_URL : ''
  if (!url) return fallback
  try {
    const resposta = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(2_500),
    })
    if (!resposta.ok) return fallback
    const dados = (await resposta.json()) as Vitrine
    return mesclarComFallback(dados)
  } catch {
    return fallback
  }
}

/** Garante seções mínimas para a landing mesmo com tenant ainda vazio. */
function mesclarComFallback(dados: Vitrine): Vitrine {
  return {
    ...fallback,
    ...dados,
    identidade: { ...fallback.identidade, ...dados.identidade },
    inicio: { ...fallback.inicio, ...dados.inicio },
    sobre: {
      ...fallback.sobre,
      ...dados.sobre,
      numeros: dados.sobre?.numeros?.length ? dados.sobre.numeros : fallback.sobre?.numeros,
    },
    comoFunciona: dados.comoFunciona?.length ? dados.comoFunciona : fallback.comoFunciona,
    faq: dados.faq?.length ? dados.faq : fallback.faq,
    pacotes: dados.pacotes?.length ? dados.pacotes : fallback.pacotes,
    extras: dados.extras?.length ? dados.extras : fallback.extras,
    depoimentos: dados.depoimentos?.length ? dados.depoimentos : fallback.depoimentos,
    filmes: dados.filmes?.length ? dados.filmes : filmesFallback,
    contato: {
      whatsapp: { ...fallback.contato?.whatsapp, ...dados.contato?.whatsapp },
      instagram: { ...fallback.contato?.instagram, ...dados.contato?.instagram },
      email: dados.contato?.email || fallback.contato?.email,
    },
  }
}

export function linkWhatsapp(vitrine: Vitrine, mensagemExtra?: string): string | null {
  const numero = vitrine.contato?.whatsapp?.numero?.replace(/\D/g, '')
  if (!numero) return null
  const mensagem = encodeURIComponent(
    mensagemExtra?.trim() ||
      vitrine.contato?.whatsapp?.mensagem?.trim() ||
      'Olá! Vi o site e gostaria de conversar.',
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

export function marcaDoSite(dados: Vitrine): string {
  return (
    dados.identidade?.nomeDoSite?.trim() ||
    dados.identidade?.fotografo?.trim() ||
    dados.identidade?.primeiroNome?.trim() ||
    'Maicon José'
  )
}
