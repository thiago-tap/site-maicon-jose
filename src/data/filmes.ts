/**
 * Fallback local — a fonte de verdade é a vitrine (`filmes` no painel).
 * Sem itens na vitrine, a seção some no site.
 */

export const tiposFilme = ['teaser', 'casamento', 'making-of', 'vertical', 'outro'] as const
export type TipoFilme = (typeof tiposFilme)[number]

export const rotulosTipoFilme: Record<TipoFilme, string> = {
  teaser: 'Teaser',
  casamento: 'Casamento',
  'making-of': 'Making of',
  vertical: 'Vertical',
  outro: 'Outro',
}

export type FilmeVitrine = {
  id: string
  titulo: string
  youtubeId: string
  url: string
  destaque?: boolean
  tipo?: TipoFilme | string
  casal?: string
  local?: string
  ano?: number
  capa?: {
    url?: string
    arquivo?: string
    alt?: string
    fontesAoVivo?: {
      base?: { src: string; srcset?: string }
      computador?: { src: string; srcset?: string }
    }
  }
}

/** Sem placeholders falsos: vazio até o painel devolver filmes. */
export const filmesFallback: FilmeVitrine[] = []

/**
 * URL da capa para o <img>.
 * `/api/midia/file/...` exige login (403). `/api/derivados/...` só depois dos
 * derivados existirem (senão 404). Enquanto não há `fontesAoVivo`, usa a thumb
 * pública do YouTube — sempre carrega no browser.
 */
export function urlDaCapa(filme: FilmeVitrine, _slugTenant?: string): string | undefined {
  const capa = filme.capa
  const aoVivo = capa?.fontesAoVivo?.computador?.src || capa?.fontesAoVivo?.base?.src
  if (aoVivo) return aoVivo

  if (filme.youtubeId) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(filme.youtubeId)}/hqdefault.jpg`
  }

  const url = capa?.url?.trim()
  if (url && url !== '.' && !url.includes('/api/midia/file/') && !url.includes('/api/derivados/')) {
    return url
  }
  return undefined
}

export function tipoDoFilme(filme: FilmeVitrine): TipoFilme {
  const tipo = filme.tipo
  if (tipo && (tiposFilme as readonly string[]).includes(tipo)) return tipo as TipoFilme
  return 'casamento'
}

export function metaDoFilme(filme: FilmeVitrine): string {
  return [filme.casal?.trim(), filme.local?.trim(), filme.ano ? String(filme.ano) : '']
    .filter(Boolean)
    .join(' · ')
}

export function escolherDestaque(filmes: FilmeVitrine[]): FilmeVitrine | undefined {
  const horizontais = filmes.filter((f) => tipoDoFilme(f) !== 'vertical')
  const base = horizontais.length ? horizontais : filmes
  if (!base.length) return undefined
  return base.find((f) => f.destaque) ?? base[0]
}

export function filmesDaGrade(
  filmes: FilmeVitrine[],
  destaque?: FilmeVitrine,
  opcoes: { incluirVerticais?: boolean; max?: number } = {},
): FilmeVitrine[] {
  const { incluirVerticais = false, max } = opcoes
  let lista = filmes.filter((f) => {
    if (destaque && f.id === destaque.id) return false
    if (!incluirVerticais && tipoDoFilme(f) === 'vertical') return false
    return true
  })
  if (typeof max === 'number') lista = lista.slice(0, Math.max(0, max))
  return lista
}

export function filmesVerticais(filmes: FilmeVitrine[]): FilmeVitrine[] {
  return filmes.filter((f) => tipoDoFilme(f) === 'vertical')
}

export function tiposPresentes(filmes: FilmeVitrine[]): TipoFilme[] {
  const vistos = new Set<TipoFilme>()
  for (const filme of filmes) vistos.add(tipoDoFilme(filme))
  return tiposFilme.filter((t) => vistos.has(t))
}
