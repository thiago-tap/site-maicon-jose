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
    alt?: string
    fontesAoVivo?: {
      base?: { src: string; srcset?: string }
      computador?: { src: string; srcset?: string }
    }
  }
}

/** Sem placeholders falsos: vazio até o painel devolver filmes. */
export const filmesFallback: FilmeVitrine[] = []

export function urlDaCapa(filme: FilmeVitrine): string | undefined {
  const capa = filme.capa
  if (!capa) return undefined
  const aoVivo = capa.fontesAoVivo?.computador?.src || capa.fontesAoVivo?.base?.src
  if (aoVivo) return aoVivo
  if (capa.url && capa.url !== '.') return capa.url
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
