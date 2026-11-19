import { anoAberto } from '../lib/agenda'
import type { Vitrine } from '../lib/vitrine'

/** Conteúdo Mayck Filmes (questionário). Painel sobrescreve quando preenchido. */
export const fallback: Vitrine = {
  tenant: { slug: 'maicon-jose', nome: 'Mayck Filmes' },
  identidade: {
    nome: 'Mayck Filmes',
    nomeDoSite: 'Mayck Filmes',
    primeiroNome: 'Mayck',
    fotografo: 'Mayck Filmes',
    especialidade: 'Filmmaker de casamentos',
    frase: 'O seu casamento contado com a emoção e a estética de um filme de cinema.',
    lema: 'Filmes de casamento clássicos, sensíveis e atemporais em Brasília e em qualquer destino onde o amor levar vocês.',
    cidade: 'Brasília',
    uf: 'DF',
    descricao:
      'Mayck Filmes: filmes de casamento cinematográficos, clássicos e acolhedores em Brasília-DF e destinos. Peça seu orçamento e eternize seu grande dia.',
    tituloSeo: 'Mayck Filmes | Filmmaker de Casamentos em Brasília-DF',
  },
  analytics: { gaId: '', gtmId: '' },
  inicio: {
    especialidade: 'Filmmaker de casamentos',
    frase: 'O seu casamento contado com a emoção e a estética de um filme de cinema.',
  },
  sobre: {
    titulo: 'Sobre o Mayck',
    subtitulo: 'Mayck Filmes',
    resumo:
      'Sou Maicon José, mas pode me chamar de Mayck. À frente da Mayck Filmes, transformo o grande dia em uma memória viva, clássica e cinematográfica.',
    apresentacao:
      'Sou Maicon José, mas pode me chamar de Mayck. À frente da Mayck Filmes, dedico meu olhar a transformar um dos dias mais importantes da vida de um casal em uma memória viva, clássica e cinematográfica.\n\nAcredito que um bom filme de casamento vai muito além de câmeras e movimentos bonitos: ele precisa ter alma. Por isso, meu trabalho começa antes mesmo do “sim”, criando um ambiente leve e acolhedor para que vocês se sintam à vontade, sem poses forçadas. Cada sorriso espontâneo, o nervosismo no making of e o som real dos votos são registrados com discrição e sensibilidade para que, daqui a 20 anos, vocês sintam exatamente a mesma emoção ao apertar o play.\n\nBaseado em Brasília-DF e disponível para casamentos em todo o Brasil e no exterior, entrego uma experiência personalizada, com atendimento próximo, pontualidade e entrega rigorosa dentro do prazo acordado.',
    estilo:
      'Híbrido (cinematic + documental) — movimentos suaves, drone estratégico, foco na história e nos votos.',
    numeros: [],
  },
  diferenciais: [
    {
      id: 'audio',
      titulo: 'Áudio cristalino dos votos',
      texto: 'Captação profissional dos votos e discursos — a emoção que só o filme guarda.',
      ordem: 1,
    },
    {
      id: 'color',
      titulo: 'Color grading de cinema',
      texto: 'Estética clássica e atemporal em cada frame, com finalização cinematográfica.',
      ordem: 2,
    },
    {
      id: 'direcao',
      titulo: 'Direcionamento acolhedor',
      texto: 'Condução leve para casais tímidos — naturalidade, sem poses engessadas.',
      ordem: 3,
    },
    {
      id: 'drone',
      titulo: 'Drone e 4K Cinema',
      texto: 'Imagens aéreas estratégicas e captação em 4K nos pacotes principais.',
      ordem: 4,
    },
  ],
  agenda: {
    ativo: true,
    texto: 'Agenda aberta para 2026 e 2027 — Consulte a disponibilidade da sua data.',
    /** Até o painel ter meses reais: tudo aberto (meses passados viram “Encerrado” no site). */
    anos: [anoAberto(2026), anoAberto(2027)],
  },
  comoFunciona: [
    {
      id: 'contato',
      titulo: 'Primeiro contato',
      texto: 'Verificamos a disponibilidade da sua data pelo WhatsApp.',
      detalhe: 'Sem compromisso',
      ordem: 1,
    },
    {
      id: 'reserva',
      titulo: 'Alinhamento & reserva',
      texto: 'Conversa para conhecer a história de vocês e formalizar o contrato.',
      detalhe: 'Reserva com sinal',
      ordem: 2,
    },
    {
      id: 'dia',
      titulo: 'O grande dia',
      texto: 'Registro leve, discreto e cinematográfico de cada detalhe e emoção.',
      detalhe: 'Presença discreta',
      ordem: 3,
    },
    {
      id: 'entrega',
      titulo: 'Entrega emoção',
      texto: 'Teaser e filme completo em 4K para reviver para sempre.',
      detalhe: 'Entrega digital',
      ordem: 4,
    },
  ],
  faq: [
    {
      id: 'reservar',
      pergunta: 'Com quanto tempo de antecedência devemos reservar a data?',
      resposta:
        'Recomendamos reservar assim que definirem a data e o local da cerimônia (idealmente de 6 a 12 meses antes), pois realizamos um número limitado de casamentos por mês para garantir dedicação total na edição de cada filme.',
      ordem: 1,
    },
    {
      id: 'fora-bsb',
      pergunta: 'Vocês atendem fora de Brasília-DF?',
      resposta:
        'Sim! Nossa base é em Brasília-DF, mas viajamos para qualquer cidade do Brasil ou exterior para contar a história de vocês.',
      ordem: 2,
    },
    {
      id: 'prazo',
      pergunta: 'Qual o prazo de entrega dos filmes?',
      resposta:
        'O teaser para redes sociais é entregue rapidamente após o casamento para vocês já reviverem e compartilharem a emoção, e o filme completo é entregue dentro do prazo contratual via link digital em alta resolução (4K).',
      ordem: 3,
    },
    {
      id: 'timidez',
      pergunta: 'Somos muito tímidos para câmeras — o vídeo vai ficar artificial?',
      resposta:
        'De forma alguma. Nosso trabalho é baseado em direcionamento leve e espontâneo. Vocês não precisam saber “atuar” — guiamos vocês com naturalidade para que aproveitem cada segundo enquanto registramos tudo de forma discreta.',
      ordem: 4,
    },
    {
      id: 'fotografo',
      pergunta: 'Já contratamos fotógrafo — precisamos mesmo de filme?',
      resposta:
        'A fotografia congela o instante, mas só o filme guarda o movimento, a voz embargada nos votos, a risada dos amigos e a música da entrada. São memórias complementares que tornam a lembrança viva para sempre.',
      ordem: 5,
    },
  ],
  pacotes: [
    {
      id: 'essencial',
      nome: 'Essencial',
      ordem: 1,
      preco: 0,
      cobertura: 'Casamento civil / mini wedding',
      chamada: 'Cerimônia e recepção íntima com olhar de cinema',
      mensagemWhatsapp:
        'Olá, Mayck! Estava vendo os pacotes no site da Mayck Filmes e me interessei pelo pacote Essencial. Podemos conversar sobre disponibilidade para a nossa data?',
      itens: [
        'Cobertura para cerimônia e recepção íntima',
        '1 filmmaker',
        'Teaser vertical para Reels',
        'Filme editado em 4K',
        'Captação de áudio dos votos',
      ],
      destaque: false,
      selo: 'Civil / Mini wedding',
    },
    {
      id: 'classico',
      nome: 'Clássico',
      ordem: 2,
      preco: 0,
      cobertura: 'Making of, cerimônia e festa',
      chamada: 'Cobertura completa com drone e trailer',
      mensagemWhatsapp:
        'Olá, Mayck! Estava vendo os pacotes no site da Mayck Filmes e me interessei pelo pacote Clássico. Podemos conversar sobre disponibilidade para a nossa data?',
      itens: [
        'Making of da noiva, cerimônia e festa',
        'Imagens aéreas com drone',
        'Teaser vertical para redes',
        'Trailer cinematográfico (3 a 5 min)',
        'Filme completo da cerimônia e momentos principais em 4K',
        'Áudio profissional dos votos e discursos',
      ],
      destaque: true,
      selo: 'Mais escolhido',
    },
    {
      id: 'cinema-legado',
      nome: 'Cinema & Legado',
      ordem: 3,
      preco: 0,
      cobertura: 'Experiência completa',
      chamada: 'Pré-wedding, 2 filmmakers e entrega expressa',
      mensagemWhatsapp:
        'Olá, Mayck! Estava vendo os pacotes no site da Mayck Filmes e me interessei pelo pacote Cinema & Legado. Podemos conversar sobre disponibilidade para a nossa data?',
      itens: [
        'Tudo do Clássico',
        'Ensaio pré-wedding cinematográfico',
        '2 filmmakers (múltiplos ângulos)',
        'Entrega expressa do teaser em 72h',
        'Filme estendido em 4K + discursos na íntegra',
      ],
      destaque: false,
    },
  ],
  extras: [
    {
      id: 'pre-wedding',
      nome: 'Ensaio Pré-Wedding Cinematográfico',
      descricao: 'Ensaio em vídeo com estética de cinema — ótimo combinado com qualquer pacote.',
    },
    {
      id: 'segundo',
      nome: 'Segundo filmmaker',
      descricao: 'Mais ângulos simultâneos no grande dia.',
    },
    {
      id: 'same-day',
      nome: 'Same Day Edit',
      descricao: 'Edição no mesmo dia para exibição na festa.',
    },
    {
      id: 'teaser-72h',
      nome: 'Teaser em 72h',
      descricao: 'Entrega expressa do teaser para redes sociais.',
    },
    {
      id: 'hora-extra',
      nome: 'Hora adicional',
      descricao: 'Extensão da cobertura conforme o roteiro do dia.',
    },
  ],
  depoimentos: [],
  contato: {
    whatsapp: {
      numero: '5561992952662',
      mensagem:
        'Olá, Mayck! Vi o site da Mayck Filmes e adorei o seu trabalho. Gostaria de verificar disponibilidade de data e saber mais sobre os filmes de casamento.',
      exibicao: '(61) 99295-2662',
    },
    instagram: {
      usuario: 'ohmayck',
      url: 'https://www.instagram.com/ohmayck/',
    },
    email: 'mayconjose76@gmail.com',
    youtube: {
      url: 'https://www.youtube.com/channel/UCxhpRLerYKeVUiKUzfP354g',
      rotulo: 'Mayck Filmes',
    },
  },
}
