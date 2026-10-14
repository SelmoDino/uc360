import apatamGeojson from './APATAM.json';
// @ts-ignore
import pecGeojson from './PEC.json';
// @ts-ignore
import peigGeojson from './PEIG.json';
// @ts-ignore
import reservaSulGeojson from './RESERVA_SUL.json';
// @ts-ignore
import icmbioGeojson from './ICmBio.json';
// @ts-ignore
import rdsGeojson from './RDS.json';
// @ts-ignore
import reejGeojson from './REEJ.json';
// @ts-ignore
import supbigGeojson from './SUPBIG.json';
// @ts-ignore
import parqueDaCidadeGeojson from './parque-da-cidade.json';
// @ts-ignore
import ngiParatyGeojson from './NGI_Paraty.json';

export type BoundaryFeature = {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  properties: Record<string, any>;
};

export type ConservationUnit = {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  category: string;
  coordinates: [number, number]; // [longitude, latitude]
  zoom: number;
  pitch: number;
  bearing: number;
  gestor: string;
  presentation: {
    dimensao: string;
    localizacao: string;
    abrangencia: string;
    description: string;
    regiaoHidrografica?: string;
    mosaico?: string;
    objetivos?: string[];
    visitacao?: string;
    historicoCriacao?: { evento: string; dect: string }[];
  };
  trails: string[];
  pointsOfInterest: string[];
  imageUrl: string;
  curiosity: string;
  logoUrl?: string; // Optional logo URL
  geojson?: any; // Will hold the parsed GeoJSON data
  gallery: string[];
  recursos: {
    paisagem: string;
    socio: string;
  };
  projetos: {
    description: string;
    items: { title: string; desc: string; color: string }[];
  };
  planoDeManejo: {
    description: string;
    documentUrl: string;
  };
  supbigSpecial?: {
    atribuicoes: string;
    licenciamento: string;
    fiscalizacao: string;
  };
};

const unorderedUnits: ConservationUnit[] = [
  {
    id: 'pe-cunhambebe',
    name: 'Parque Estadual Cunhambebe',
    shortName: 'PE Cunhambebe',
    abbr: 'CUNHAMBEBE',
    category: 'Parque Estadual',
    coordinates: [-44.003402409433065, -22.926468692023246],
    zoom: 11.1,
    pitch: 60,
    bearing: -15,
    gestor: 'Ivan Cobra',
    imageUrl: '/PEC/1.jpg',
    logoUrl: '/LOGOS/PEC.svg',
    presentation: {
      dimensao: '38.053,88 hectares, conforme Portal GeoINEA.',
      localizacao: 'Costa Verde.',
      abrangencia: 'Municípios de Angra dos Reis, Mangaratiba, Rio Claro e Itaguaí.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande e RH II Guandu.',
      mosaico: 'Mosaico Bocaina.',
      description: 'Abrange partes da Serra do Mar, com um relevo escarpado e denso de vegetação preservada. É vital para corredores ecológicos.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual nº 41.358, de 13 de junho de 2008.' }
      ],
      objetivos: [
        'Assegurar a preservação dos remanescentes de Mata Atlântica da porção fluminense da Serra do Mar, bem como recuperar as áreas degradadas ali existentes;',
        'Possibilitar a conectividade dos maciços florestais da Bocaina e do Tinguá;',
        'Manter populações de animais e plantas nativas e oferecer refúgio para espécies raras, vulneráveis, endêmicas e ameaçadas de extinção da fauna e flora nativas;',
        'Preservar montanhas, cachoeiras e demais paisagens notáveis contidas em seus limites;',
        'Oferecer oportunidades de visitação, recreação, aprendizagem, interpretação, educação, pesquisa, e relaxamento;',
        'Estimular o turismo e a geração de empregos e renda;',
        'Assegurar a continuidade dos serviços ambientais.'
      ]
    },
    trails: ['Trilha do Pico do Frade', 'Trilha das Cachoeiras Mágicas', 'Trilha do Caminho do Ouro', 'Trilha do Sahy', 'Travessia da Serra'],
    pointsOfInterest: ['Pico do Frade', 'Cachoeiras de Mangaratiba', 'Ruínas do Baixio', 'Mirante Imperial'],
    curiosity: 'O parque abriga nascentes que fornecem água para grande parte da região da Costa Verde e oeste metropolitano do Rio.',
    recursos: {
      paisagem: 'A paisagem é marcada pelo imponente Pico do Frade, com 1.560 metros de altitude, rodeado por paredões escarpados cobertos pela rica floresta de encosta típica da Serra do Mar, além de inúmeras cachoeiras cristalinas com grande desnível topográfico.',
      socio: 'Constitui um remanescente crucial de Mata Atlântica que serve de corredor ecológico para mamíferos terrestres de grande porte, como a onça-parda. O parque se integra a comunidades tradicionais de encosta detentoras de saberes agrícolas e históricos tradicionais.'
    },
    projetos: {
      description: 'Programas científicos contínuos voltados para a preservação de nascentes, reflorestamento e engajamento comunitário na Serra do Mar.',
      items: [
        { title: 'Monitoramento Genético da Fauna', desc: 'Monitoramento ativo de felinos de grande porte (como a onça-parda e jaguatiricas) por meio de armadilhas fotográficas instaladas em refúgios montanhosos remotos.', color: 'sea' },
        { title: 'Guarda-Parques Comunitários', desc: 'Formação ecológica de moradores locais para atuar na manutenção das trilhas e no monitoramento de focos de incêndio florestal.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'O Plano de Manejo estabelece as regras de zoneamento para garantir a integridade ecológica das nascentes de água que abastecem a região, direcionando o turismo de montanha ao Pico do Frade de forma controlada e segura.',
      documentUrl: 'https://www.inea.rj.gov.br/biodiversidade-e-areas-protegidas/parque-estadual-cunhambebe/'
    },
    geojson: pecGeojson,
    gallery: [
      '/PEC/1.jpg',
      '/PEC/2.jpeg',
      '/PEC/2.jpg',
      '/PEC/3.webp'
    ]
  },
  {
    id: 'pe-ilha-grande',
    name: 'Parque Estadual da Ilha Grande',
    shortName: 'PEIG',
    abbr: 'PEIG',
    category: 'Parque Estadual',
    coordinates: [-44.202856396060945, -23.141479731773707],
    zoom: 11.2,
    pitch: 50,
    bearing: 45,
    gestor: 'André Érse',
    imageUrl: '/PEIG/1.jpeg',
    logoUrl: '/LOGOS/PEIG.svg',
    presentation: {
      dimensao: '12.082,14 hectares',
      localizacao: 'Parte insular da Costa Verde.',
      abrangencia: 'Município de Angra dos Reis.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      description: 'Ocupando grande parte da Ilha Grande, este parque abriga praias deslumbrantes, Mata primária e ruínas históricas.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual nº 15.273, de 26 de junho de 1971.' },
        { evento: 'Demarcação do Parque', dect: 'Decreto Estadual n° 16.067, de 04 de junho de 1973.' },
        { evento: 'Redução de 2/3 da área protegida', dect: 'Decreto Estadual n° 2.062, de 28 de agosto de 1978.' },
        { evento: 'Ampliação e consolidação', dect: 'Decreto Estadual nº 40.602, de 12 de fevereiro de 2007, quando foram acrescentadas todas as demais terras localizadas acima da cota de 100 m, excetuando-se aquelas pertencentes à Reserva Biológica Estadual da Praia do Sul.' }
      ]
    },
    trails: ['Volta à Ilha', 'Lopes Mendes', 'Palmas', 'Cachoeira da Feiticeira', 'Dois Rios'],
    pointsOfInterest: ['Praia do Aventureiro', 'Ruínas do Presídio Cândido Mendes', 'Pico do Papagaio', 'Vila do Abraão'],
    curiosity: 'Abriga ruínas de um antigo presídio e lazareto que contam histórias desde a época do império até meados do século XX.',
    recursos: {
      paisagem: 'Geografia espetacular dominada pelo Pico do Papagaio (982m) e contornada por enseadas oceânicas profundas, praias de areia finíssima e mata intocada que se estende até as margens de límpidos cursos de água.',
      socio: 'Rico patrimônio cultural caiçara e histórico colonial, abrigando ruínas imponentes do Lazareto e do Presídio de Dois Rios, que representam marcos importantes sobre a imigração, saúde e a história política nacional.'
    },
    projetos: {
      description: 'Projetos institucionais focados em regular o alto fluxo de turistas, preservar ruínas arqueológicas raras e proteger o ecossistema insular.',
      items: [
        { title: 'Arqueologia e Memória Viva', desc: 'Conservação e abertura de trilhas históricas interpretativas nas ruínas do antigo presídio e lazareto, resgatando a história social do local.', color: 'sea' },
        { title: 'Preservação de Trilhas do Papagaio', desc: 'Restabelecimento físico, contenção de encostas e manejo de erosão na íngreme trilha que leva ao Pico do Papagaio.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Estabelece limites estritos de visitação diária em áreas ambientalmente vulneráveis (como Lopes Mendes e o Pico do Papagaio) para mitigar impactos no solo e assegurar a regeneração da fauna insular nativa.',
      documentUrl: 'https://www.inea.rj.gov.br/parque-estadual-da-ilha-grande/'
    },
    geojson: peigGeojson,
    gallery: [
      '/PEIG/1.jpeg',
      '/PEIG/2.jpeg',
      '/PEIG/2.jpg',
      '/PEIG/3.webp',
      '/PEIG/3.jfif',
      '/PEIG/5.jpeg',
      '/PEIG/6.webp'
    ]
  },
  {
    id: 'apa-tamoios',
    name: 'Área de Proteção Ambiental de Tamoios',
    shortName: 'APA de Tamoios',
    abbr: 'APATAM',
    category: 'APA',
    coordinates: [-44.29891152313558, -23.005060103696444],
    zoom: 10.8,
    pitch: 45,
    bearing: -20,
    gestor: '',
    imageUrl: '/APATAM/3.webp',
    logoUrl: '/LOGOS/APATAM.svg',
    presentation: {
      dimensao: '22.530,36 hectares, conforme Portal GeoINEA.',
      localizacao: 'Região da Costa Verde.',
      abrangencia: 'Município de Angra dos Reis.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      mosaico: 'Mosaico Bocaina.',
      description: 'Contempla a Baía da Ilha Grande, suas centenas de ilhas, lajes e a rica vida marinha costeira.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual nº 9.452, de 5 de dezembro de 1986.' }
      ],
      objetivos: [
        'Proteção do ambiente natural, das paisagens de grande beleza cênica e dos sistemas geo-hidrológicos da região, que abrigam espécies biológicas raras e ameaçadas de extinção, bem como as comunidades caiçaras integradas naqueles ecossistemas.'
      ]
    },
    trails: ['Trilha da Banqueta', 'Caminho Caiçara', 'Trilha do Tanguá', 'Rota das Ilhas (Náutica)', 'Caminho do Ouro (Angra)'],
    pointsOfInterest: ['Ilha de Cataguases', 'Lagoa Azul', 'Ilhas Botinas', 'Centro Histórico de Angra', 'Santuário Pelado'],
    curiosity: 'Possui mais de 365 ilhas, formando um dos litorais mais recortados e belos do mundo, com águas protegidas de grandes correntes.',
    recursos: {
      paisagem: 'Ambiente marinho extraordinário composto por centenas de ilhas, lajes de pedra submersas, riquíssimos costões rochosos e ecossistemas estuarinos repletos de vida que abrigam uma água de coloração esmeralda inesquecível.',
      socio: 'Essencial berçário ecológico regional para botos, tartarugas e espécies pesqueiras comerciais. Integra de forma harmoniosa as colônias tradicionais de pesca artesanal caiçara de Angra dos Reis.'
    },
    projetos: {
      description: 'Iniciativas dinâmicas para mitigar poluição, ordenar o turismo náutico e promover a conscientização pesqueira regional.',
      items: [
        { title: 'Santuário de Cetáceos e Tartarugas', desc: 'Identificação fotográfica, monitoramento e mapeamento de rotas migratórias do boto-cinza e de tartarugas marinhas na baía.', color: 'sea' },
        { title: 'Ordenamento do Turismo Náutico', desc: 'Instalação de poitas de ancoragem ecológica próximas às Ilhas Botinas e Lagoa Azul para evitar a destruição de corais por âncoras.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Regula o zoneamento náutico para delimitar corredores exclusivos de navegação, velocidade máxima permitida em áreas de lazer, além de proibir a ancoragem predatória sobre os bancos de corais.',
      documentUrl: 'https://www.inea.rj.gov.br/apa-da-baia-de-tamoios/'
    },
    geojson: apatamGeojson,
    gallery: [
      '/APATAM/1.jfif',
      '/APATAM/2.jfif',
      '/APATAM/2.jpg',
      '/APATAM/3.webp',
      '/APATAM/4.jpg'
    ]
  },
  {
    id: 'esec-tamoios',
    name: 'Estação Ecológica de Tamoios',
    shortName: 'ESEC Tamoios',
    abbr: 'ESECTAM',
    category: 'Estação Ecológica',
    coordinates: [-44.503124287130305, -23.063448008887917],
    zoom: 10.6,
    pitch: 35,
    bearing: 15,
    gestor: 'Andeson Nascimento',
    imageUrl: '/ESEC Tamoios/6.jpg',
    logoUrl: '/LOGOS/ESECTamoios.svg',
    presentation: {
      dimensao: '8.660,35 hectares.',
      localizacao: 'Baía da Ilha Grande.',
      abrangencia: 'Municípios de Angra dos Reis e Paraty.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      description: 'Estação Ecológica Federal gerida pelo ICMBio, abrangendo 29 ilhas, lajes e costeiras da Baía da Ilha Grande. Unidade de Proteção Integral com restrição de acesso e foco em pesquisa científica marinha altamente protegida.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Federal nº 98.864, de 23 de janeiro de 1990.' }
      ],
      objetivos: [
        'Preservar os ecossistemas marinho e insular da Baía da Ilha Grande;',
        'Resguardar bancos de corais, algas e fauna ictiológica regional;',
        'Oferecer suporte para pesquisa científica ambiental e educação conservacionista.'
      ]
    },
    trails: ['Acesso Náutico Científico Controlado'],
    pointsOfInterest: ['Ilha das Palmas', 'Ilha do Meio', 'Ilha do Sandri', 'Laje do Alagado'],
    curiosity: 'É uma unidade de Proteção Integral estrita, onde a visitação pública é proibida e apenas pesquisas científicas autorizadas são permitidas nas ilhas e no raio de entorno marinho.',
    recursos: {
      paisagem: 'Costões rochosos íngremes sob águas translúcidas em ilhas graníticas intocadas, cobertas de exuberante vegetação rasteira ou floresta de Mata Atlântica primária.',
      socio: 'Funciona como um importantíssimo berçário natural de reprodução biológica para espécies marinhas da Costa Verde, assegurando a sustentabilidade da pesca em todo seu entorno.'
    },
    projetos: {
      description: 'Programas especializados de monitoramento científico da biota marinha, catalogação de corais e proteção aos ninhos de aves marinhas.',
      items: [
        { title: 'Monitoramento de Quelônios', desc: 'Acompanhamento do uso das praias insulares protegidas para alimentação e descanso de tartarugas marinhas de várias espécies.', color: 'sea' },
        { title: 'Inventário de Ictiofauna', desc: 'Catalogação periódica da diversidade de peixes demersais e de costão rochoso por cientistas credenciados.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'O Plano de Manejo (Minuta V4 Final) detalha as normas de proteção integral para a conservação e pesquisa marinha nas 29 ilhas, lajes e costeiras e no raio de entorno de 1 km (zona de amortecimento). Ele estabelece regras estritas contra a pesca náutica motorizada, pesca amadora de lazer e ancoragem irregular, visando salvaguardar os ricos bancos de corais, algas e berçários da ictiofauna na Baía da Ilha Grande.',
      documentUrl: 'https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/marinho/lista-de-ucs/esec-de-tamoios/arquivos/Minuta_PM_Esec_Tamoios___V4_final.pdf'
    },
    geojson: icmbioGeojson,
    gallery: [
      '/ESEC Tamoios/1.jpg', // Pescadores artesanais locais na Baía de Ilha Grande
      '/ESEC Tamoios/2.jpg', // Briefing e integração das equipes do ICMBio/Tamoios/Paraty
      '/ESEC Tamoios/3.jpg', // Detalhe do Peixe Blênio da fauna recifal local protegida
      '/ESEC Tamoios/4.jpg', // Equipes e parceiros em reunião de planejamento
      '/ESEC Tamoios/5.jpg', // Mutirão de limpeza voluntária de resíduos e lixo marinho nas ilhas
      '/ESEC Tamoios/6.jpg'  // Vista aérea espetacular com pôr-do-sol de uma ilha da ESEC
    ]
  },
  {
    id: 'rds-aventureiro',
    name: 'Reserva Sustentável do Aventureiro',
    shortName: 'RDS Aventureiro',
    abbr: 'AVENTUREIRO',
    category: 'Reserva',
    coordinates: [-44.317606170073724, -23.185561230607085],
    zoom: 12.5,
    pitch: 65,
    bearing: 10,
    gestor: 'Iliana Salgado',
    imageUrl: '/AVENTUREIRO/1.webp',
    logoUrl: '/LOGOS/RDS AVENTUREIRO.svg',
    presentation: {
      dimensao: '1.312,00 hectares.',
      localizacao: 'Costa Verde, Ilha Grande e área terrestre.',
      abrangencia: 'Município de Angra dos Reis.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      description: 'Combina praias belíssimas com a preservação do modo de vida das comunidades tradicionais marítimas.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual n° 15.983, de 27 de novembro de 1990.' }
      ]
    },
    trails: ['Trilha da Praia do Aventureiro', 'Mirante do Sundae', 'Mirante da Espia', 'Costão de Fora', 'Caminho de Provetá'],
    pointsOfInterest: ['Coqueiro Deitado', 'Vila Caiçara', 'Praia do Sul (limites)', 'Pedra do Sundae'],
    curiosity: 'É nacionalmente famosa pelo "Coqueiro Deitado", uma árvore que cresceu em formato de "L" formando o cenário de fotos icônicas.',
    recursos: {
      paisagem: 'União harmônica de uma isolada e selvagem praia arenosa sob a vigia do imponente Costão de Fora, dunas protegidas, lagoas costeiras limítrofes e densa mata úmida.',
      socio: 'Representa um dos baluartes vivos da legítima cultura tradicional caiçara do Estado, resguardando técnicas ancestrais de confecção de canoas de um só tronco e festejos religiosos centenários.'
    },
    projetos: {
      description: 'Preservação da autonomia caiçara, saneamento com foco ecológico descentralizado e controle sustentável de campings.',
      items: [
        { title: 'Saneamento Descentralizado e Ecológico', desc: 'Substituição gradual de fossas por sistemas biológicos de tratamento de águas cinzas de bananeiras (TEVs) protegendo dunas e igarapés.', color: 'sea' },
        { title: 'Turismo de Base Comunitária (TBC)', desc: 'Gestão autônoma das vagas para campings gerida pela própria associação de moradores tradicionais locais, retendo renda na economia caiçara.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Garante em caráter definitivo e inalienável o direito coletivo de uso da terra e recursos pesqueiros pela população caiçara tradicional autóctone, disciplinando rigorosamente regras construtivas ecológicas.',
      documentUrl: 'https://www.inea.rj.gov.br/rds-do-aventureiro/'
    },
    geojson: rdsGeojson,
    gallery: [
      '/AVENTUREIRO/1.webp',
      '/AVENTUREIRO/2.jpeg',
      '/AVENTUREIRO/3.jpeg',
      '/AVENTUREIRO/3.jpg',
      '/AVENTUREIRO/5.jpg'
    ]
  },
  {
    id: 'reej',
    name: 'Reserva Ecológica Estadual da Juatinga',
    shortName: 'REEJ',
    abbr: 'REEJ',
    category: 'Reserva Ecológica',
    coordinates: [-44.6030, -23.2865],
    zoom: 11.5,
    pitch: 50,
    bearing: 15,
    gestor: 'Mario Loyola',
    imageUrl: '/REEJ/1.webp',
    logoUrl: '/LOGOS/REEJ.svg',
    presentation: {
      dimensao: '9.959,67 hectares, conforme Portal GeoINEA.',
      localizacao: 'Costa Verde.',
      abrangencia: 'Município de Paraty.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      mosaico: 'Mosaico Bocaina.',
      description: 'Protege a impressionante Península da Juatinga e suas riquezas naturais, englobando a forte presença de comunidades caiçaras tradicionais em suas praias abrigadas.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual n° 17.981, de 30 de outubro de 1992.' }
      ],
      objetivos: [
        'Fomentar a cultura caiçara local, compatibilizando a utilização dos recursos naturais com conservação do ecossistema local, composto por costões rochosos, remanescentes florestais de Mata Atlântica restingas e mangues que, em conjunto com o mar, ao fundo, forma cenário de notável beleza, apresentando peculiaridades não encontradas em outras regiões do Estado.'
      ],
      visitacao: 'Para visitar a Cachoeira do Saco Bravo, na Ponta Negra, Paraty, é obrigatória a contratação de guia de turismo ou condutor de visitante credenciado pelo Inea, conforme Resolução Inea n. 192 de 18 de dezembro de 2019.'
    },
    trails: ['Ponta da Juatinga', 'Trilha do Sono', 'Ponta Negra', 'Martim de Sá'],
    pointsOfInterest: ['Praia do Sono', 'Cachoeira do Saco Bravo', 'Praia de Ponta Negra', 'Farol da Juatinga'],
    curiosity: 'A reserva se sobrepõe a territórios tradicionalmente ocupados por comunidades caiçaras, tornando sua gestão um dinâmico desafio de harmonização entre conservação e modo de vida tradicional.',
    recursos: {
      paisagem: 'Paisagem exuberante e escarpada com imponentes costões rochosos que caem abruptamente no mar, ladeada por praias preservadíssimas e Mata Atlântica extremamente densa.',
      socio: 'Forte presença da identidade caiçara com ricas tradições pesqueiras, extrativismo responsável, cultivo de mandioca e vibrante produção artesanal de farinha e canoas.'
    },
    projetos: {
      description: 'Programas de auxílio ao turismo de base comunitária, saneamento sustentável e forte valorização da cultura e memória locais.',
      items: [
        { title: 'Turismo de Base Comunitária', desc: 'Apoio técnico ao turismo de trilhas gerido pelos próprios moradores das praias, garantindo geração de renda local.', color: 'sea' },
        { title: 'Rota Tradicional Caiçara', desc: 'Mapeamento sustentável e sinalização interpretativa de trilhas e costumes ancestrais.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'O ordenamento orienta a harmonia entre a manutenção protetiva e restritiva do frágil ecossistema insular e os inegociáveis direitos das centenárias populações tradicionais residentes.',
      documentUrl: 'https://www.inea.rj.gov.br/'
    },
    geojson: reejGeojson,
    gallery: [
      '/REEJ/1.webp',
      '/REEJ/2.jpg',
      '/REEJ/3.png',
      '/REEJ/4.jpeg',
      '/REEJ/6.webp'
    ]
  },
  {
    id: 'rebio-praia-do-sul',
    name: 'Reserva Biológica Estadual da Praia do Sul',
    shortName: 'REBIO Praia do Sul',
    abbr: 'REBIO PS',
    category: 'Reserva Biológica',
    coordinates: [-44.28754041600835, -23.165467364586068],
    zoom: 13.8,
    pitch: 55,
    bearing: 5,
    gestor: 'Iliana Salgado',
    imageUrl: '/PRAIA DO SUL/2.webp',
    logoUrl: '/LOGOS/PRAIA DO SUL.svg',
    presentation: {
      dimensao: '3.309,63 hectares, conforme Portal GeoINEA.',
      localizacao: 'Costa Verde, Ilha Grande.',
      abrangencia: 'Município de Angra dos Reis.',
      regiaoHidrografica: 'RH I Baía da Ilha Grande.',
      mosaico: 'Mosaico Mantiqueira.',
      description: 'Constitui a mais restritiva e intocável área de conservação da Ilha Grande, dedicada exclusivamente à estrita preservação dos ecossistemas e pesquisa científica acadêmica.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Estadual n° 4.972, de 2 de dezembro de 1981.' },
        { evento: 'Redelimitação', dect: 'Lei Estadual nº 6.793, de 28 de maio de 2014.' }
      ]
    },
    trails: ['Acesso Estritamente Restrito (Pesquisa)'],
    pointsOfInterest: ['Praia do Sul', 'Praia do Leste', 'Lagoa do Leste', 'Restingas Nativas'],
    curiosity: 'Com o maior grau de restrição possível, é uma das áreas litorâneas mais sagradas e intocadas de todo o Estado do Rio, não sendo permitida visitação turística.',
    recursos: {
      paisagem: 'Refúgio de belíssimas e selvagens praias oceânicas batidas, contornadas por restingas virgens, manguezais preservados e imensas lagoas costeiras blindadas da presença humana.',
      socio: 'Representa uma inestimável reserva e banco genético para o Estado do Rio de Janeiro, funcionando como um puro "laboratório a céu aberto" de um ecossistema natural isento de impacto de terceiros.'
    },
    projetos: {
      description: 'Focado exclusivamente no fomento e acompanhamento de pesquisas acadêmicas rigorosas de alto nível que não agridam a mata.',
      items: [
        { title: 'Monitoramento Preditivo de Restingas', desc: 'Pesquisas contínuas botânicas e de fauna sobre o ecossistema intocável, gerando relatórios climáticos vitais.', color: 'sea' },
        { title: 'Conservação de Desovas', desc: 'Monitoramento absoluto das sensíveis áreas de desova de tartarugas nas praias da face oceânica.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Determina a total e completa intangibilidade do ambiente, permitindo rigorosamente apenas atividades de pesquisa científica com aprovação por comitês de ética, visando fins educacionais do Estado.',
      documentUrl: 'https://www.inea.rj.gov.br/'
    },
    geojson: reservaSulGeojson,
    gallery: [
      '/PRAIA DO SUL/1.jpg.jpeg',
      '/PRAIA DO SUL/2.webp',
      '/PRAIA DO SUL/3.jpeg',
      '/PRAIA DO SUL/4.jpg',
      '/PRAIA DO SUL/5.jpg'
    ]
  },
  {
    id: 'ngi-paraty',
    name: 'Núcleo de Gestão Integrada Paraty / ICMBio',
    shortName: 'NGI Parati/ICMBio',
    abbr: 'NGI/ICMBIO',
    category: 'Núcleo de Gestão Integrada',
    coordinates: [-44.750701893607705, -23.268641959921695],
    zoom: 11.2,
    pitch: 45,
    bearing: 45,
    gestor: 'Anderson Nascimento',
    imageUrl: '/ICMBIO/1.jpg',
    logoUrl: '/LOGOS/ICMBIO.svg',
    presentation: {
      dimensao: 'Complexo de Territórios Federais',
      localizacao: 'Região de Paraty e Entorno',
      abrangencia: 'Limites de Cunha e Angra dos Reis',
      description: 'Órgão administrativo unificado que atua como aglomerador e gerencia diversas unidades de conservação cruciais em nível federal em âmbito local, como o Parque Nacional da Serra da Bocaina e a APA de Cairuçu.'
    },
    trails: ['Trilha da Cachoeira do Veado (Bocaina)', 'Caminho Histórico de Mambucaba', 'Trilhas da APA de Cairuçu'],
    pointsOfInterest: ['Parque Nacional da Serra da Bocaina', 'APA de Cairuçu', 'Base Operacional ICMBio'],
    curiosity: 'O modelo em Núcleo otimiza formidavelmente os orçamentos e a equipe, unindo a administração de múltiplas Unidades Federais fragmentadas sob uma só frente estratégica eficiente.',
    recursos: {
      paisagem: 'Do elevado pico e montanhas cristalinas e geladas da Bocaina no alto da serra, cruzando precipícios vertiginosos, até mergulhar diretamente no fundo das águas cálidas do litoral da baía tropical.',
      socio: 'Representa a esfera de controle federal na região, garantindo articulação contínua institucional para o sólido ordenamento ecossistêmico e territorial cobrindo milhares de vidas litorâneas.'
    },
    projetos: {
      description: 'Implementação de grandiosas políticas públicas focadas na integração pacífica e sustentável entre o uso da União e comunidades do mar e montanha.',
      items: [
        { title: 'Gestão Policial e Ambiental Unificada', desc: 'Vasto e rigoroso controle unificado de baías e cristas selvagens contra extrações ilegais, caça e desmatamento.', color: 'sea' },
        { title: 'Sustentabilidade em Larga Escala', desc: 'Fomento a capacitações institucionais de ecoturismo mantendo os altíssimos padrões de proteção do ICMBio.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Como uma administração integrada suprema, harmoniza os trâmites dos planos individuais das Áreas (APA, Parque Nacional) na jurisdição paratyense sob uma coerência legal comum e assertiva.',
      documentUrl: 'https://www.icmbio.gov.br/ngiparaty/'
    },
    geojson: ngiParatyGeojson,
    gallery: [
      '/ICMBIO/1.jpg',
      '/ICMBIO/2.jpg',
      '/ICMBIO/3.jpg'
    ]
  },
  {
    id: 'supbig',
    name: 'Superintendência da Baía da Ilha Grande',
    shortName: 'SUPBIG',
    abbr: 'SUPBIG / INEA',
    category: 'Superintendência',
    coordinates: [-44.4400, -23.1000],
    zoom: 10.2,
    pitch: 40,
    bearing: 0,
    gestor: 'Janaina Sousa',
    imageUrl: '/SUPBIG/1.jpg',
    logoUrl: '/LOGOS/SUPBIG.svg',
    presentation: {
      dimensao: 'Território da Costa Verde',
      localizacao: 'Região Estadual da Costa Verde',
      abrangencia: 'Gestão Regional das UCs',
      description: 'O INEA atua de maneira descentralizada por meio de oito Superintendências Regionais, que abrangem as nove regiões hidrográficas e todos os 92 municípios do Estado do Rio de Janeiro. A Superintendência Regional da Baia da Ilha Grande (SUPBIG) compreende a Região Hidrográfica I, atendendo aos municípios Paraty, Angra dos Reis e Mangaratiba.'
    },
    supbigSpecial: {
      atribuicoes: 'De maneira geral, e de acordo com a Lei nº 5.101, de 4 de outubro de 2007, as superintendências regionais procedem às análises e pareceres de licenciamento ambiental, fazem o acompanhamento do cumprimento das obrigações pactuadas em termos de ajustamento de conduta e conversão de multas, exercem o poder de polícia e fiscalização, adotam medidas cautelares e aplicam as devidas sanções, bem como decidem sobre os licenciamentos de atividades de baixo impacto ambiental.',
      licenciamento: 'O licenciamento ambiental tem por objetivo direcionar as atividades potencialmente poluidoras para o exercício sustentável, conservando os recursos naturais, as belezas naturais exuberantes da Costa Verde e garantindo sua preservação para as atuais e futuras gerações.',
      fiscalizacao: 'A fiscalização ambiental desempenha papel fundamental na proteção dos ecossistemas da Costa Verde, atuando na prevenção, identificação e repressão de atividades que possam causar degradação ambiental. Por meio de ações de monitoramento, vistorias técnicas e aplicação da legislação vigente, a SUPBIG busca assegurar a conservação dos recursos naturais, da biodiversidade e dos serviços ecossistêmicos essenciais à região. Se encontra dividida em dois núcleos, sendo eles:\n\n• **Pós Licença**: Compete a este núcleo fiscalizar se as condicionantes das licenças ambientais emitidas pelo INEA estão sendo cumpridas.\n\n• **Atendimento**: Compete a este núcleo o atendimento a demandas ministeriais, da Ouvidoria do INEA e demais órgãos competentes.'
    },
    trails: ['Coordenações Logísticas', 'Sede Regional', 'Monitoramento Geral'],
    pointsOfInterest: ['Sede Regional de Angra', 'Bases Avançadas do INEA', 'Infraestrutura da Baía'],
    curiosity: 'Atua como um forte "órgão guarda-chuva" vital para as engrenagens de parques maiores. Ajuda a centralizar a governança das áreas, suprindo os parques com viaturas e brigadas nas emergências.',
    recursos: {
      paisagem: 'Sua amplitude engloba visualmente a integridade de todas as bacias litorâneas, as ilhas paradisíacas e serras da Baía de Angra dos Reis e adjacências visuais, integrando os ecossistemas como teia sistêmica.',
      socio: 'Casa da governança pública, produz e emite os laudos e licenças estaduais na baía e constrói de forma macro um ordenamento político das parcerias ativas com universidades, ONGs e Prefeituras.'
    },
    projetos: {
      description: 'Estratégias suprarregionais interligadas macro ambientalmente, servindo todas as APA, Reservas, e Parques ligados ao núcleo.',
      items: [
         { title: 'Comando Único de Prevenção e Incêndios', desc: 'Centralização tática para organizar e despachar logística rápida de recursos humanos nos meses de estiagem.', color: 'sea' },
         { title: 'Educação Ambiental Contínua Estadual', desc: 'Eixo estruturante na elaboração das diretrizes escolares e roteiros informativos sobre a preservação disseminados na Costa Verde.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'Por ser um aparato administrativo gerencial, não dispõe de Plano de Manejo próprio do edifício, sendo a chave de suporte orientadora para elaborar, revisar e aplicar os planos técnicos de cada UC subordinada regionalmente.',
      documentUrl: 'https://www.inea.rj.gov.br/'
    },
    geojson: supbigGeojson,
    gallery: [
      '/SUPBIG/1.jpg',
      '/SUPBIG/2.jpg',
      '/SUPBIG/3.jpg',
      '/SUPBIG/4.jpg',
      '/SUPBIG/5.jpg',
      '/SUPBIG/7.jpg',
      '/SUPBIG/8.jpg'
    ]
  },
  {
    id: 'parque-da-cidade',
    name: 'Parque Natural Municipal da Cidade',
    shortName: 'Parque da Cidade',
    abbr: 'PARQUE DA CIDADE',
    category: 'Parque Municipal',
    coordinates: [-44.31239606513246, -22.987017585888687],
    zoom: 14.2,
    pitch: 55,
    bearing: 15,
    gestor: 'Carlos Alberto Mendes',
    imageUrl: '/PARQUE_CIDADE/1.jpg',
    logoUrl: '/LOGOS/PARQUE_CIDADE.svg',
    presentation: {
      dimensao: '21,3 hectares.',
      localizacao: 'Bairro Centro / Serrinha da Banqueta, Angra dos Reis.',
      abrangencia: 'Área urbana e encostas centrais de Angra dos Reis.',
      description: 'O Parque Natural Municipal da Cidade, popularmente conhecido como Parque da Cidade de Angra, constitui um dos principais fragmentos de Mata Atlântica urbana preservados no coração do município. Projetando mirantes deslumbrantes que revelam a totalidade da Baía de Angra dos Reis, o parque é um refúgio ecológico fundamental de lazer, educação ambiental, pesquisa acadêmica e contenção de encostas urbanas.',
      historicoCriacao: [
        { evento: 'Criação', dect: 'Decreto Municipal nº 1.408, de 05 de junho de 1990.' }
      ]
    },
    trails: ['Trilha do Mirante da Cruz', 'Trilha das Encostas Preservadas', 'Caminho Ecológico da Banqueta'],
    pointsOfInterest: ['Mirante Principal da Baía', 'Ruínas Históricas da Banqueta', 'Sede e Centro de Visitantes'],
    curiosity: 'Apesar de estar rodeado de áreas altamente habitadas, o parque mantém uma rica biodiversidade silvestre de pequeno e médio porte e impede processos erosivos nas encostas íngremes do município.',
    recursos: {
      paisagem: 'A paisagem é decorada por encostas florestadas típicas do bioma de Mata Atlântica que sobem de forma íngreme até mirantes naturais que concedem uma espetacular vista em 360 graus da Baía de Angra, do porto histórico e das ilhas.',
      socio: 'Funciona como o maior polo ativo de lazer ao ar livre e contato direto com a natureza para os moradores e estudantes das escolas da rede municipal urbana de Angra, fomentando a educação socioambiental comunitária.'
    },
    projetos: {
      description: 'Programas permanentes de reflorestamento, conservação de nascentes urbanas e recepção de público escolar local.',
      items: [
        { title: 'Reflorestamento de Encostas Centrais', desc: 'Recuperação de áreas degradadas com espécies nativas de rápido crescimento para proteção do solo.', color: 'sea' },
        { title: 'Sementes do Amanhã', desc: 'Roteiros de visitação pedagógica integrando alunos das redes públicas com plantio direto de mudas e trilhas monitoradas.', color: '#a3f3b9' }
      ]
    },
    planoDeManejo: {
      description: 'O regimento estabelece zonas restritas para conservação da cobertura florestal das encostas urbanas e incentiva roteiros organizados de baixo impacto nas vias de ecoturismo.',
      documentUrl: 'https://www.angra.rj.gov.br/'
    },
    geojson: parqueDaCidadeGeojson,
    gallery: [
      '/PARQUE_CIDADE/1.jpg',
      '/PARQUE_CIDADE/2.jpg',
      '/PARQUE_CIDADE/3.jpg'
    ]
  }
];

const orderIds = [
  'apa-tamoios',
  'pe-ilha-grande',
  'rds-aventureiro',
  'rebio-praia-do-sul',
  'reej',
  'supbig',
  'pe-cunhambebe',
  'esec-tamoios',
  'ngi-paraty',
  'parque-da-cidade'
];

export const conservationUnits: ConservationUnit[] = [...unorderedUnits].sort((a, b) => {
  const indexA = orderIds.indexOf(a.id);
  const indexB = orderIds.indexOf(b.id);
  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
});
