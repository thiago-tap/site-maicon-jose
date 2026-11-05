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

export function escolherDestaque(filmes: FilmeVitrine[]): FilmeVitrine | undefined {
  if (!filmes.length) return undefined
  return filmes.find((f) => f.destaque) ?? filmes[0]
}

export function filmesDaGrade(filmes: FilmeVitrine[], destaque?: FilmeVitrine): FilmeVitrine[] {
  if (!destaque) return filmes
  return filmes.filter((f) => f.id !== destaque.id)
}
