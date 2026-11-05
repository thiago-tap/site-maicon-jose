/**
 * Showreel — fica no Git até o painel ter campo de vídeo.
 * Troque título, capa e link quando o Maicon enviar os filmes dele.
 */
export type Filme = {
  id: string
  titulo: string
  /** URL do YouTube / Vimeo / página do filme */
  url: string
  /** Capa (URL absoluta ou caminho em /public) — opcional */
  capa?: string
}

export const filmes: Filme[] = [
  {
    id: 'filme-1',
    titulo: 'Filme de casamento',
    url: '#filmes',
  },
  {
    id: 'filme-2',
    titulo: 'Ensaio ao ar livre',
    url: '#filmes',
  },
  {
    id: 'filme-3',
    titulo: 'Cerimônia',
    url: '#filmes',
  },
]
