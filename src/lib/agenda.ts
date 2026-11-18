/** Situações da agenda (mesmo contrato da vitrine / Mikael). */
export const situacoes = ['disponivel', 'poucas-datas', 'esgotado', 'sem-info'] as const
export type Situacao = (typeof situacoes)[number]

export const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'] as const
export type Mes = (typeof meses)[number]

export type AnoAgenda = { ano: number } & Record<Mes, Situacao>

export type AgendaVitrine = {
  ativo?: boolean
  texto?: string
  anos?: AnoAgenda[]
}

export type EstadoMes = Situacao | 'encerrado'

export const nomesDosMeses: Record<Mes, string> = {
  jan: 'Janeiro',
  fev: 'Fevereiro',
  mar: 'Março',
  abr: 'Abril',
  mai: 'Maio',
  jun: 'Junho',
  jul: 'Julho',
  ago: 'Agosto',
  set: 'Setembro',
  out: 'Outubro',
  nov: 'Novembro',
  dez: 'Dezembro',
}

export function rotuloSituacao(estado: EstadoMes): string {
  switch (estado) {
    case 'disponivel':
      return 'Datas disponíveis'
    case 'poucas-datas':
      return 'Poucas datas'
    case 'esgotado':
      return 'Esgotado'
    case 'sem-info':
      return 'Consulte'
    case 'encerrado':
      return 'Encerrado'
    default: {
      const inesperado: never = estado
      throw new Error(`Situação desconhecida: ${String(inesperado)}`)
    }
  }
}

function mesPadrao(valor: unknown): Situacao {
  if (typeof valor === 'string' && (situacoes as readonly string[]).includes(valor)) {
    return valor as Situacao
  }
  return 'sem-info'
}

/** Normaliza um ano da vitrine com defaults seguros. */
export function normalizarAno(bruto: Record<string, unknown> | AnoAgenda): AnoAgenda {
  const ano = Number(bruto.ano)
  const base = { ano: Number.isFinite(ano) ? ano : new Date().getFullYear() } as AnoAgenda
  for (const mes of meses) {
    base[mes] = mesPadrao((bruto as Record<string, unknown>)[mes])
  }
  return base
}

/** Anos futuros (e o atual) com meses passados marcados como encerrado. */
export function anosParaExibir(anos: AnoAgenda[], agora = new Date()) {
  return [...anos]
    .map(normalizarAno)
    .sort((a, b) => a.ano - b.ano)
    .filter((ano) => ano.ano >= agora.getFullYear())
    .map((ano) => ({
      ano: ano.ano,
      meses: meses.map((mes, indice) => {
        const passou =
          ano.ano < agora.getFullYear() ||
          (ano.ano === agora.getFullYear() && indice < agora.getMonth())
        const estado: EstadoMes = passou ? 'encerrado' : ano[mes]
        return {
          mes,
          nome: nomesDosMeses[mes],
          estado,
          consultavel: estado === 'disponivel' || estado === 'poucas-datas',
        }
      }),
    }))
}

export function agendaTemMeses(agenda?: AgendaVitrine | null): boolean {
  return Boolean(agenda?.ativo && agenda.anos && agenda.anos.length > 0)
}

/** Ano aberto com todos os meses disponíveis (até o painel preencher). */
export function anoAberto(ano: number, situacao: Situacao = 'disponivel'): AnoAgenda {
  const base = { ano } as AnoAgenda
  for (const mes of meses) base[mes] = situacao
  return base
}
