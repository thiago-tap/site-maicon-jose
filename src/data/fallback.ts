import type { Vitrine } from '../lib/vitrine'

/** Conteúdo de demonstração enquanto o tenant não está no painel / vitrine fora. */
export const fallback: Vitrine = {
  tenant: { slug: 'maicon-jose', nome: 'Maicon José' },
  identidade: {
    nomeDoSite: 'Maicon José',
    primeiroNome: 'Maicon',
    fotografo: 'Maicon José',
    especialidade: 'Filmagem cinematográfica',
    frase: 'O dia de vocês, com as vozes e os abraços de quem estava lá',
    lema: 'Filmes de casamento e conteúdo em vídeo com olhar de cinema.',
    cidade: 'Brasília',
    uf: 'DF',
    descricao:
      'Maicon José — filmmaker. Filmagem cinematográfica de casamentos e produção de conteúdo em vídeo.',
  },
  inicio: {
    especialidade: 'Filmagem cinematográfica',
    frase: 'O dia de vocês, com as vozes e os abraços de quem estava lá',
  },
  sobre: {
    titulo: 'Quem sou',
    subtitulo: 'Filmmaker',
    resumo:
      'Produzo filmes e conteúdos em vídeo com olhar cinematográfico — do casamento ao making-of, com equipamento moderno e narrativa que respeita a emoção do dia.',
    apresentacao:
      'Cada história pede um ritmo. Meu trabalho é transformar o que aconteceu em um filme que vocês vão querer reviver.',
    estilo: 'Cinematográfico, emocional e discreto',
  },
  pacotes: [
    {
      id: 'pacote-1',
      nome: 'Pacote 1',
      ordem: 1,
      preco: 4200,
      cobertura: 'Cerimônia e recepção',
      chamada: 'Essencial para registrar o grande dia',
      itens: [
        'Filmagens com 2 câmeras',
        'Trailer do casamento (1 min)',
        'Entrega online',
        'Material captado na íntegra',
        'Vídeo cerimônia e recepção (12 min)',
      ],
      destaque: false,
    },
    {
      id: 'pacote-2',
      nome: 'Pacote 2',
      ordem: 2,
      preco: 5000,
      cobertura: 'Cerimônia, recepção e drone',
      chamada: 'Mais ângulos, mais emoção',
      itens: [
        'Filmagens com 3 câmeras + drone',
        'Making-of da noiva',
        'Trailer do casamento (1 min)',
        'Entrega online',
        'Material captado na íntegra',
        'Vídeo cerimônia e recepção (15 min)',
      ],
      destaque: true,
      selo: 'Mais pedido',
    },
    {
      id: 'pacote-3',
      nome: 'Pacote 3',
      ordem: 3,
      preco: 6000,
      cobertura: 'Dia completo com extras',
      chamada: 'Cobertura completa com presentes',
      itens: [
        'Filmagens com 3 câmeras + drone',
        'Making-of da noiva e do noivo',
        'Trailer do casamento (1 min)',
        'Entrega online',
        'Material captado na íntegra',
        'Vídeo cerimônia e recepção (20 min)',
        'Ensaio Save the Date (1 min)',
        'Caixa personalizada + pen drive',
      ],
      destaque: false,
    },
  ],
  extras: [
    {
      id: 'save-the-date',
      nome: 'Save the Date',
      descricao: 'Vídeo pré-casamento para anunciar a data. Produção cinematográfica de até 1 minuto.',
    },
    {
      id: 'drone',
      nome: 'Filmagem com drone',
      descricao: 'Imagens aéreas do local da cerimônia e da festa.',
      aPartirDe: true,
    },
    {
      id: 'same-day',
      nome: 'Same Day Edit',
      descricao: 'Vídeo editado e exibido no mesmo dia do casamento.',
    },
    {
      id: 'ao-vivo',
      nome: 'Transmissão ao vivo',
      descricao: 'Para convidados que não puderam comparecer.',
    },
  ],
  depoimentos: [
    {
      id: 'd1',
      casal: 'Ana & Lucas',
      texto:
        'O filme do nosso casamento ficou incrível. Cada vez que assistimos, nos emocionamos como se estivéssemos vivendo tudo de novo.',
      ordem: 1,
    },
    {
      id: 'd2',
      casal: 'Mariana & Rafael',
      texto:
        'A filmagem com drone deu um toque cinematográfico que não esperávamos. Profissional, discreto e talentoso.',
      ordem: 2,
    },
    {
      id: 'd3',
      casal: 'Juliana & Pedro',
      texto:
        'Do começo ao fim, a experiência foi impecável. O trailer ficou pronto antes do esperado e a qualidade é de cinema.',
      ordem: 3,
    },
  ],
  contato: {
    whatsapp: {
      numero: '',
      mensagem: 'Olá, Maicon! Vi o site e gostaria de consultar a data do nosso casamento.',
    },
    instagram: {
      usuario: '',
      url: '',
    },
  },
}
