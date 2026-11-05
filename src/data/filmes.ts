/**
 * Fallback local — a fonte de verdade é a vitrine (`filmes` no painel).
 * Sem itens na vitrine, a seção some no site.
 */
export type FilmeVitrine = {
  id: string
  titulo: string
  youtubeId: string
  url: string
  destaque?: boolean
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

const PAINEL_PUBLICO = 'https://painel.estudiosites.com.br'

/**
 * URL da capa para o <img>.
 * `/api/midia/file/...` exige login (403 no browser) — não usar.
 * Prefere fontesAoVivo → derivado público → thumb YouTube.
 */
export function urlDaCapa(filme: FilmeVitrine, slugTenant?: string): string | undefined {
  const capa = filme.capa
  const aoVivo = capa?.fontesAoVivo?.computador?.src || capa?.fontesAoVivo?.base?.src
  if (aoVivo) return aoVivo

  const arquivo = capa?.arquivo?.trim()
  if (arquivo && slugTenant && /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(arquivo)) {
    return `${PAINEL_PUBLICO}/api/derivados/${encodeURIComponent(slugTenant)}/${encodeURIComponent(arquivo)}`
  }

  const url = capa?.url?.trim()
  if (url && url !== '.' && !url.includes('/api/midia/file/')) return url

  if (filme.youtubeId) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(filme.youtubeId)}/hqdefault.jpg`
  }
  return undefined
}

export function escolherDestaque(filmes: FilmeVitrine[]): FilmeVitrine | undefined {
  if (!filmes.length) return undefined
  return filmes.find((f) => f.destaque) ?? filmes[0]
}

export function filmesDaGrade(filmes: FilmeVitrine[], destaque?: FilmeVitrine): FilmeVitrine[] {
  if (!destaque) return filmes
  return filmes.filter((f) => f.id !== destaque.id)
}
