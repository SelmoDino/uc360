export type ZoneDetail = {
  id: string;
  code: string;
  name: string;
  color: string;
  protectionLevel: string;
  areaPercent: string;
  description: string;
  objectives: string[];
  allowedActivities: string[];
  forbiddenActivities: string[];
  coordinates: [number, number]; // [lng, lat]
  polygon: [number, number][]; // Ring of [lng, lat]
};

export type UnitZoning = {
  ucId: string;
  title: string;
  summary: string;
  zones: ZoneDetail[];
};

export const ucsZoningData: Record<string, UnitZoning> = {
  'reej': {
    ucId: 'reej',
    title: 'Zoneamento da Reserva Ecológica Estadual da Juatinga',
    summary: 'O zoneamento da Juatinga compatibiliza a máxima preservação dos costões e florestas primárias com a salvaguarda territorial inalienável dos modos de vida das comunidades caiçaras tradicionais.',
    zones: [
      {
        id: 'reej-zp',
        code: 'ZP',
        name: 'Zona de Preservação Rigorosa (Intangível)',
        color: '#dc2626',
        protectionLevel: 'Proteção Integral Rigorosa',
        areaPercent: '52% da área total (~5.180 ha)',
        description: 'Engloba as cristas mais elevadas da Península da Juatinga, encostas de declividade vertiginosa e cabeceiras de drenagem onde a interferência antrópica é estritamente proibida.',
        objectives: [
          'Garantir a evolução natural dos ecossistemas de Mata Atlântica de altitude;',
          'Proteger nascentes cristalinas que abastecem as praias caiçaras;',
          'Refúgio seguro para fauna ameaçada de extinção (onça-parda, primatas e aves endêmicas).'
        ],
        allowedActivities: [
          'Pesquisa científica previamente autorizada pelo INEA;',
          'Fiscalização ambiental e monitoramento biológico contínuo;',
          'Ações de combate a incêndios e vigilância territorial.'
        ],
        forbiddenActivities: [
          'Qualquer tipo de visitação turística desacompanhada ou abertura de trilhas;',
          'Corte de madeira, extrativismo vegetal ou caça de fauna;',
          'Acampamento, fogueiras e instalação de infraestruturas.'
        ],
        coordinates: [-44.6030, -23.2865],
        polygon: [
          [-44.620, -23.275],
          [-44.595, -23.268],
          [-44.580, -23.285],
          [-44.600, -23.300],
          [-44.625, -23.290],
          [-44.620, -23.275]
        ]
      },
      {
        id: 'reej-zotc',
        code: 'ZOTC',
        name: 'Zona de Ocupação Tradicional Caiçara',
        color: '#ea580c',
        protectionLevel: 'Manejo Sustentável Tradicional',
        areaPercent: '18% da área total (~1.800 ha)',
        description: 'Abrange as vilas e praias históricas de pescadores tradicionais, como Praia do Sono, Ponta Negra, Pouso da Cajaíba, Martim de Sá e Cairuçu das Pedras.',
        objectives: [
          'Garantir a reprodução cultural e socioeconômica das famílias caiçaras nativas;',
          'Fomentar a pesca artesanal sustentável em canoas bordadas;',
          'Integrar práticas tradicionais de roça de mandioca e agroflorestas familiares.'
        ],
        allowedActivities: [
          'Moradia familiar caiçara com regras construtivas sustentáveis;',
          'Pesca de subsistência e artesanal costeira;',
          'Turismo de Base Comunitária (TBC) gerido pelas associações de moradores;',
          'Pequenos comércios locais e casas de farinha comunitárias.'
        ],
        forbiddenActivities: [
          'Especulação imobiliária ou venda de terras para pessoas de fora da comunidade;',
          'Edificações de alvenaria descaracterizantes de grande porte;',
          'Pesca predatória com rede de arrasto ou equipamentos industriais.'
        ],
        coordinates: [-44.6300, -23.3300],
        polygon: [
          [-44.640, -23.325],
          [-44.615, -23.318],
          [-44.610, -23.338],
          [-44.635, -23.345],
          [-44.640, -23.325]
        ]
      },
      {
        id: 'reej-zue',
        code: 'ZUE',
        name: 'Zona de Uso Extensivo (Ecoturismo e Trilhas)',
        color: '#10b981',
        protectionLevel: 'Uso Público Controlado',
        areaPercent: '20% da área total (~2.000 ha)',
        description: 'Corredores da travessia clássica da Ponta da Juatinga, acessos à Cachoeira do Saco Bravo, mirantes do Farol e praias com visitação monitorada.',
        objectives: [
          'Proporcionar contato responsável e seguro com a natureza cênica;',
          'Educação ambiental e conscientização sobre a conservação costeira;',
          'Gerar renda local por meio da contratação de condutores credenciados.'
        ],
        allowedActivities: [
          'Caminhada em trilhas demarcadas e sinalizadas;',
          'Visita monitorada à Cachoeira do Saco Bravo com guia credenciado (Res. INEA 192/2019);',
          'Fotografia de natureza, banho de mar e observação de aves;',
          'Interpretação ambiental guiada.'
        ],
        forbiddenActivities: [
          'Acesso sem condutor credenciado a atrativos de alto risco (ex: Saco Bravo);',
          'Uso de veículos motorizados (quadriciclos, motos) em trilhas pedestres;',
          'Caixas de som com volume excessivo e descarte de lixo na natureza.'
        ],
        coordinates: [-44.5700, -23.2950],
        polygon: [
          [-44.580, -23.288],
          [-44.550, -23.275],
          [-44.545, -23.305],
          [-44.575, -23.315],
          [-44.580, -23.288]
        ]
      },
      {
        id: 'reej-za',
        code: 'ZA',
        name: 'Zona de Amortecimento Marinho e Costeiro',
        color: '#0284c7',
        protectionLevel: 'Amortecimento e Transição',
        areaPercent: '10% de faixa marítima contígua',
        description: 'Faixa náutica marítima ao redor da península que assegura a integridade das águas limpas, costões e deslocamento dos botos e canoas tradicionais.',
        objectives: [
          'Controlar a velocidade de lanchas e escunas nas enseadas abrigadas;',
          'Evitar a degradação dos bancos de algas e recifes de costão rochoso;',
          'Proteger corredores de navegação para pescadores artesanais.'
        ],
        allowedActivities: [
          'Navegação em velocidade reduzida respeitando boias demarcatórias;',
          'Mergulho livre contemplativo com snorkel;',
          'Transporte marítimo de moradores e turistas em embarcações autorizadas.'
        ],
        forbiddenActivities: [
          'Lançamento de efluentes, óleo ou resíduos sólidos no mar;',
          'Ancoragem destrutiva com âncora sobre costões coralíneos;',
          'Prática de esportes náuticos velozes (jet-ski) sobre zonas de banho.'
        ],
        coordinates: [-44.5800, -23.3200],
        polygon: [
          [-44.600, -23.310],
          [-44.560, -23.295],
          [-44.550, -23.330],
          [-44.590, -23.340],
          [-44.600, -23.310]
        ]
      }
    ]
  },
  'pe-ilha-grande': {
    ucId: 'pe-ilha-grande',
    title: 'Zoneamento do Parque Estadual da Ilha Grande',
    summary: 'Estruturado a partir das cotas altimétricas (terras acima da cota 100m) e enseadas históricas, preservando a floresta densa insular e ordenando o ecoturismo de fama internacional.',
    zones: [
      {
        id: 'peig-zi',
        code: 'ZI',
        name: 'Zona Intangível (Cota 100m e Cumes)',
        color: '#dc2626',
        protectionLevel: 'Proteção Integral Rigorosa',
        areaPercent: '65% do território insular protegido',
        description: 'Matas primárias intocadas nos maciços montanhosos e encostas íngremes do Pico do Papagaio (982m) e cumes centrais da ilha.',
        objectives: [
          'Preservação total de remanescentes densos da Mata Atlântica insular;',
          'Salvaguarda das nascentes de água doce que abastecem vilarejos costeiros;',
          'Manutenção de espécies da fauna raras e endêmicas da ilha.'
        ],
        allowedActivities: [
          'Pesquisas científicas e estudos de regeneração botânica;',
          'Monitoramento biológico de fauna silvestre;',
          'Prevenção e combate a focos de fogo florestal.'
        ],
        forbiddenActivities: [
          'Turismo sem autorização especial do parque;',
          'Instalação de acampamentos ou queima de vegetação;',
          'Caça, captura de aves ou animais silvestres.'
        ],
        coordinates: [-44.2028, -23.1414],
        polygon: [
          [-44.225, -23.130],
          [-44.180, -23.125],
          [-44.170, -23.155],
          [-44.215, -23.160],
          [-44.225, -23.130]
        ]
      },
      {
        id: 'peig-zue',
        code: 'ZUE',
        name: 'Zona de Uso Extensivo (Lopes Mendes e Trilhas T1-T14)',
        color: '#10b981',
        protectionLevel: 'Uso Público Controlado',
        areaPercent: '20% das rotas e praias oceânicas',
        description: 'Inclui praias oceânicas de preservação com visitação permitida durante o dia (Lopes Mendes, Santo Antônio) e a rede oficial de trilhas sinalizadas da Ilha Grande.',
        objectives: [
          'Permitir o desfrute público da beleza cênica das praias;',
          'Educação ambiental prática de conservação com os visitantes;',
          'Manejo de erosão nas trilhas de travessia.'
        ],
        allowedActivities: [
          'Caminhada em trilhas catalogadas;',
          'Banho de mar e prática de surf em Lopes Mendes;',
          'Visitação diurna sem pernoite ou estruturas fixas.'
        ],
        forbiddenActivities: [
          'Acampamento selvagem na areia da praia de Lopes Mendes;',
          'Consumo e descarte de latas, garrafas de vidro e embalagens plásticas;',
          'Comércio ambulante não cadastrado ou geração de resíduos.'
        ],
        coordinates: [-44.1350, -23.1360],
        polygon: [
          [-44.150, -23.128],
          [-44.120, -23.125],
          [-44.115, -23.145],
          [-44.145, -23.150],
          [-44.150, -23.128]
        ]
      },
      {
        id: 'peig-zhc',
        code: 'ZHC',
        name: 'Zona Histórico-Cultural (Lazareto e Presídio de Dois Rios)',
        color: '#8b5cf6',
        protectionLevel: 'Patrimônio Histórico e Cultural',
        areaPercent: '8% da área',
        description: 'Sítios arqueológicos e ruínas da época colonial, imigração e do antigo presídio político Cândido Mendes na Vila de Dois Rios.',
        objectives: [
          'Preservação material das ruínas e do acervo arquitetônico;',
          'Difusão da memória histórica social e política do Brasil;',
          'Integração de roteiros educativos com a UERJ / Ceads.'
        ],
        allowedActivities: [
          'Tours históricos e visitas pedagógicas guiadas;',
          'Pesquisas em museologia e arqueologia industrial/médica;',
          'Atividades educativas e científicas do Museu do Cárcere.'
        ],
        forbiddenActivities: [
          'Vandalismo, pichação ou remoção de tijolos e fragmentos arqueológicos;',
          'Construções que descaracterizem o conjunto tombado;',
          'Descarte de entulho nos monumentos.'
        ],
        coordinates: [-44.1900, -23.1800],
        polygon: [
          [-44.200, -23.170],
          [-44.180, -23.168],
          [-44.175, -23.190],
          [-44.195, -23.195],
          [-44.200, -23.170]
        ]
      },
      {
        id: 'peig-zr',
        code: 'ZR',
        name: 'Zona de Recuperação Florestal',
        color: '#14b8a6',
        protectionLevel: 'Restauração Ecológica',
        areaPercent: '7% da área',
        description: 'Antigas clareiras e pastagens da época prisional em processo assistido de regeneração com plantio de mudas nativas da Mata Atlântica.',
        objectives: [
          'Acelerar a sucessão ecológica secundária da floresta;',
          'Controlar espécies invasoras exóticas (ex: jaqueiras e capim-gordura);',
          'Recuperar o microclima e a microfauna do solo.'
        ],
        allowedActivities: [
          'Plantio de enriquecimento florestal com mudas nativas;',
          'Manejo biológico e erradicação controlada de exóticas invasoras;',
          'Aulas práticas de silvicultura e restauração ambiental.'
        ],
        forbiddenActivities: [
          'Pisotear áreas cercadas em fase inicial de brotação;',
          'Introdução de espécies vegetais ou animais exóticos;',
          'Queimadas para limpeza de solo.'
        ],
        coordinates: [-44.2150, -23.1500],
        polygon: [
          [-44.225, -23.142],
          [-44.205, -23.138],
          [-44.200, -23.158],
          [-44.220, -23.162],
          [-44.225, -23.142]
        ]
      }
    ]
  },
  'pe-cunhambebe': {
    ucId: 'pe-cunhambebe',
    title: 'Zoneamento do Parque Estadual Cunhambebe',
    summary: 'Abrange mais de 38 mil hectares da imponente Serra do Mar fluminense, com foco absoluto em salvaguardar nascentes de água que abastecem a região e corredores da onça-parda.',
    zones: [
      {
        id: 'pec-zp',
        code: 'ZP',
        name: 'Zona de Proteção Rigorosa (Pico do Frade e Cristas da Serra)',
        color: '#dc2626',
        protectionLevel: 'Proteção Integral Rigorosa',
        areaPercent: '70% do território do parque (~26.600 ha)',
        description: 'O maciço montanhoso do Pico do Frade (1.560m) e muralhas de pedra com vegetação rupícola e floresta ombrófila densa montana.',
        objectives: [
          'Proteção integral das bacias hidrográficas das RH I e RH II;',
          'Conectividade dos maciços florestais da Bocaina e do Tinguá;',
          'Garantia de refúgio isolado para predadores de topo de cadeia.'
        ],
        allowedActivities: [
          'Pesquisas científicas de universidades credenciadas;',
          'Operações de comando e controle do INEA e Guarda-Parques;',
          'Monitoramento genético por armadilhas fotográficas.'
        ],
        forbiddenActivities: [
          'Caça ilegal, palmitagem e captura de animais silvestres;',
          'Abertura clandestina de clareiras ou desmatamento;',
          'Trânsito não autorizado fora dos roteiros monitorados.'
        ],
        coordinates: [-44.2250, -22.9550],
        polygon: [
          [-44.250, -22.930],
          [-44.200, -22.920],
          [-44.180, -22.970],
          [-44.230, -22.980],
          [-44.250, -22.930]
        ]
      },
      {
        id: 'pec-zue',
        code: 'ZUE',
        name: 'Zona de Uso Extensivo (Trilhas e Cachoeiras)',
        color: '#10b981',
        protectionLevel: 'Uso Público Controlado',
        areaPercent: '18% da área',
        description: 'Roteiros de montanhismo para o cume do Pico do Frade, Trilha do Sahy, Cachoeiras de Mangaratiba e caminhos históricos.',
        objectives: [
          'Oferecer oportunidades recreativas e de montanhismo seguro;',
          'Estimular a educação ambiental dos caminhantes;',
          'Fomentar guias de turismo ecológico regionais.'
        ],
        allowedActivities: [
          'Trekking em trilhas demarcadas;',
          'Banho contemplativo nos poços de cachoeiras autorizados;',
          'Escalada esportiva controlada em vias homologadas.'
        ],
        forbiddenActivities: [
          'Fazer fogueiras e acampamento fora de áreas designadas;',
          'Deixar resíduos ou lixo nas margens dos rios e trilhas;',
          'Arrancar bromélias, orquídeas ou plantas das pedras.'
        ],
        coordinates: [-44.0200, -22.9400],
        polygon: [
          [-44.050, -22.925],
          [-43.990, -22.915],
          [-43.980, -22.955],
          [-44.040, -22.965],
          [-44.050, -22.925]
        ]
      },
      {
        id: 'pec-za',
        code: 'ZA',
        name: 'Zona de Amortecimento e Encostas de Transição',
        color: '#ca8a04',
        protectionLevel: 'Amortecimento e Transição',
        areaPercent: '12% da faixa periférica',
        description: 'Faixa de transição limítrofe com as comunidades rurais de Angra, Mangaratiba, Rio Claro e Itaguaí.',
        objectives: [
          'Prevenir a expansão desordenada urbana sobre a serra;',
          'Engajar agricultores locais na prevenção de queimadas;',
          'Fortalecer a atuação dos Guarda-Parques comunitários.'
        ],
        allowedActivities: [
          'Agroecologia sustentável e sistemas agroflorestais;',
          'Projetos comunitários de vigilância contra o fogo;',
          'Restauração de matas ciliares com apoio do INEA.'
        ],
        forbiddenActivities: [
          'Queimadas para limpeza de pastagens e roçadas;',
          'Loteamentos clandestinos em encostas de risco geotécnico;',
          'Uso intensivo de defensivos agrícolas perigosos nas cabeceiras.'
        ],
        coordinates: [-44.0034, -22.9264],
        polygon: [
          [-44.030, -22.910],
          [-43.970, -22.900],
          [-43.960, -22.935],
          [-44.020, -22.945],
          [-44.030, -22.910]
        ]
      }
    ]
  },
  'apa-tamoios': {
    ucId: 'apa-tamoios',
    title: 'Zoneamento da APA de Tamoios',
    summary: 'Zonação náutica e insular que abrange centenas de ilhas, lajes e enseadas na Baía da Ilha Grande, balanceando turismo náutico e proteção de recifes.',
    zones: [
      {
        id: 'apa-zvs',
        code: 'ZVS',
        name: 'Zona de Vida Silvestre (Ilhas e Lajes Intocadas)',
        color: '#dc2626',
        protectionLevel: 'Proteção Rigorosa dos Refúgios',
        areaPercent: '30% da área da APA',
        description: 'Ilhotas inabitadas, lajes e costões isolados que abrigam ninhos de aves marinhas (fragatas, gaivotões) e berçários subaquáticos.',
        objectives: [
          'Salvaguardar a nidificação das colônias de aves oceânicas;',
          'Preservar os recifes rochosos e ecossistemas bentônicos;',
          'Garantir reprodução de tartarugas marinhas e botos.'
        ],
        allowedActivities: [
          'Monitoramento científico não invasivo;',
          'Passagem de embarcações a distância respeitosa (>150m);',
          'Vigilância ambiental e fiscalização contra pesca ilegal.'
        ],
        forbiddenActivities: [
          'Desembarque de pessoas em ilhas de nidificação de aves;',
          'Pesca esportiva ou amadora no raio de proteção;',
          'Lançamento de âncoras sobre os fundos rochosos e corais.'
        ],
        coordinates: [-44.3200, -23.0300],
        polygon: [
          [-44.340, -23.020],
          [-44.300, -23.015],
          [-44.295, -23.045],
          [-44.335, -23.050],
          [-44.340, -23.020]
        ]
      },
      {
        id: 'apa-ztn',
        code: 'ZTN',
        name: 'Zona de Turismo Náutico Ordenado (Lagoa Azul e Botinas)',
        color: '#0284c7',
        protectionLevel: 'Uso Turístico Controlado',
        areaPercent: '25% das áreas de lazer náutico',
        description: 'Pontos de alto apelo turístico como Ilhas Botinas, Lagoa Azul, Ilha de Cataguases e praias abrigadas de Angra.',
        objectives: [
          'Proporcionar lazer náutico seguro e sustentável;',
          'Instalar poitas de ancoragem ecológica;',
          'Orientar lanchas e escunas com regras rígidas de segurança.'
        ],
        allowedActivities: [
          'Fundear exclusivamente em poitas oficiais instaladas pelo INEA;',
          'Mergulho livre com máscara e snorkel;',
          'Passeios de escunas e lanchas homologadas.'
        ],
        forbiddenActivities: [
          'Lançar âncora sobre os corais e bancos de algas subaquáticos;',
          'Despejar esgoto sanitário ou óleo de porão no mar;',
          'Utilizar caixas de som de alta potência perturbando a fauna.'
        ],
        coordinates: [-44.3500, -23.0500],
        polygon: [
          [-44.370, -23.040],
          [-44.330, -23.035],
          [-44.325, -23.065],
          [-44.365, -23.070],
          [-44.370, -23.040]
        ]
      },
      {
        id: 'apa-zpa',
        code: 'ZPA',
        name: 'Zona de Pesca Artesanal Caiçara',
        color: '#ea580c',
        protectionLevel: 'Manejo Sustentável de Recursos',
        areaPercent: '45% da bacia marítima',
        description: 'Canais e baías costeiras utilizadas ancestralmente pelas colônias de pescadores tradicionais de Angra dos Reis.',
        objectives: [
          'Garantir a subsistência e a soberania alimentar dos pescadores;',
          'Promover a pesca seletiva de baixo impacto;',
          'Controlar a entrada de barcos de arrasto industrial predatório.'
        ],
        allowedActivities: [
          'Pesca de linha, covo tradicional e redes de emalhar autorizadas;',
          'Manejo de mariculturas familiares (vieiras e mexilhões);',
          'Navegação tradicional de canoas e baleeiras artesanais.'
        ],
        forbiddenActivities: [
          'Arrasto de praia ou de fundo com barcos industriais de grande porte;',
          'Pesca submarina com compressor ou em áreas de exclusão;',
          'Captura de espécies ameaçadas ou em época de defeso.'
        ],
        coordinates: [-44.2989, -23.0050],
        polygon: [
          [-44.330, -22.990],
          [-44.270, -22.980],
          [-44.260, -23.020],
          [-44.320, -23.030],
          [-44.330, -22.990]
        ]
      }
    ]
  },
  'esec-tamoios': {
    ucId: 'esec-tamoios',
    title: 'Zoneamento da Estação Ecológica de Tamoios',
    summary: 'Classificada como Proteção Integral sob gestão do ICMBio, com acesso proibido ao público geral e zoneamento focado exclusivamente em pesquisa marinha e refúgio biológico.',
    zones: [
      {
        id: 'esec-zpi',
        code: 'ZPI',
        name: 'Zona de Proteção Integral (29 Ilhas e Lajes)',
        color: '#dc2626',
        protectionLevel: 'Proteção Máxima Federal',
        areaPercent: '75% do território da ESEC',
        description: '29 ilhas graníticas e lajes marinhas que formam o santuário reprodutivo biológico mais rigorosamente protegido do litoral fluminense.',
        objectives: [
          'Assegurar refúgio intocado para alimentação de tartarugas marinhas;',
          'Garantir berçário genético seguro para cardumes demersais e pelágicos;',
          'Servir de referência padrão zero de impacto humano para o oceano.'
        ],
        allowedActivities: [
          'Pesquisa científica acadêmica cadastrada no SISBIO/ICMBio;',
          'Operações federais de fiscalização armada e patrulhamento náutico;',
          'Estudos de monitoramento das populações de cetáceos.'
        ],
        forbiddenActivities: [
          'Qualquer tipo de visitação turística, banho de mar ou desembarque;',
          'Toda modalidade de pesca (amadora, esportiva ou comercial);',
          'Fundeio ou aproximação de barcos de recreio.'
        ],
        coordinates: [-44.5031, -23.0634],
        polygon: [
          [-44.525, -23.050],
          [-44.480, -23.045],
          [-44.475, -23.080],
          [-44.520, -23.085],
          [-44.525, -23.050]
        ]
      },
      {
        id: 'esec-zam',
        code: 'ZAM',
        name: 'Zona de Amortecimento Marinho (Raio de 1 km)',
        color: '#ca8a04',
        protectionLevel: 'Amortecimento com Restrições Estritas',
        areaPercent: '25% da área envolvente',
        description: 'Raio de 1.000 metros no mar ao redor de cada ilha e laje da ESEC, atuando como escudo protetor contra pressões náuticas.',
        objectives: [
          'Filtrar perturbações sonoras e de velocidade na proximidade dos ninhos;',
          'Evitar a colisão de hélices com tartarugas marinhas e botos;',
          'Impedir o avanço de redes e espinhéis sobre as bordas dos recifes.'
        ],
        allowedActivities: [
          'Passagem de embarcações em linha reta sem parada ou fundeio;',
          'Velocidade controlada inferior a 8 nós;',
          'Pesquisas de dispersão de larvas e nutrientes.'
        ],
        forbiddenActivities: [
          'Pesca com redes, tarrafas, linhas ou arpões de qualquer natureza;',
          'Ancoragem de lazer ou permanência estática de embarcações;',
          'Despejo de qualquer substância contaminante na lâmina d\'água.'
        ],
        coordinates: [-44.4950, -23.0700],
        polygon: [
          [-44.540, -23.040],
          [-44.460, -23.030],
          [-44.450, -23.095],
          [-44.530, -23.105],
          [-44.540, -23.040]
        ]
      }
    ]
  },
  'rds-aventureiro': {
    ucId: 'rds-aventureiro',
    title: 'Zoneamento da RDS do Aventureiro',
    summary: 'Combina dunas e costões de preservação extrema com o reconhecimento territorial da comunidade caiçara secular do Aventureiro.',
    zones: [
      {
        id: 'rds-zpe',
        code: 'ZPE',
        name: 'Zona de Proteção Estrita (Costão de Fora e Dunas)',
        color: '#dc2626',
        protectionLevel: 'Proteção Rigorosa',
        areaPercent: '60% da reserva',
        description: 'O maciço granítico do Costão de Fora, campos de dunas e encostas florestadas que resguardam o ecossistema e nascentes.',
        objectives: [
          'Blindar as dunas vegetadas contra o pisoteio desordenado;',
          'Garantir a integridade da paisagem cênica de renome internacional;',
          'Proteger a fauna de costão exposto a ondas fortes.'
        ],
        allowedActivities: [
          'Caminhada em trilhas sinalizadas guiadas (Mirante da Espia e Sundae);',
          'Pesquisas botânicas de restinga e geomorfologia;',
          'Contemplação fotográfica do icônico Coqueiro Deitado.'
        ],
        forbiddenActivities: [
          'Acampar sobre a vegetação fixadora das dunas;',
          'Remover orquídeas, bromélias de restinga ou areia;',
          'Abertura de trilhas não autorizadas nas escarpas.'
        ],
        coordinates: [-44.3176, -23.1855],
        polygon: [
          [-44.330, -23.175],
          [-44.305, -23.170],
          [-44.300, -23.195],
          [-44.325, -23.200],
          [-44.330, -23.175]
        ]
      },
      {
        id: 'rds-zoc',
        code: 'ZOC',
        name: 'Zona de Ocupação e Cultura Caiçara',
        color: '#ea580c',
        protectionLevel: 'Manejo Sustentável Tradicional',
        areaPercent: '40% da área habitada',
        description: 'Vila caiçara do Aventureiro, áreas de camping regulamentado e porto de desembarque de canoas.',
        objectives: [
          'Assegurar a autonomia dos moradores nativos na gestão de campings;',
          'Implementar saneamento ecológico com bacias de evapotranspiração;',
          'Preservar os festejos da padroeira e a culinária caiçara tradicional.'
        ],
        allowedActivities: [
          'Hospedagem em campings cadastrados limitados à capacidade de carga;',
          'Restaurantes caiçaras familiares servindo peixe fresco;',
          'Passeios de barco conduzidos pelos barqueiros caiçaras nativos.'
        ],
        forbiddenActivities: [
          'Entrada de turistas sem a devida pulseira de autorização da Prefeitura/INEA;',
          'Uso de geradores ruidosos em horários de descanso;',
          'Entrada de bebidas em garrafas de vidro descartadas nas trilhas.'
        ],
        coordinates: [-44.3120, -23.1880],
        polygon: [
          [-44.320, -23.182],
          [-44.308, -23.180],
          [-44.305, -23.192],
          [-44.318, -23.195],
          [-44.320, -23.182]
        ]
      }
    ]
  },
  'rebio-praia-do-sul': {
    ucId: 'rebio-praia-do-sul',
    title: 'Zoneamento da Reserva Biológica Estadual da Praia do Sul',
    summary: 'A unidade com o mais alto nível de restrição legal de todo o Estado do Rio de Janeiro. Proibida qualquer forma de visitação turística comercial.',
    zones: [
      {
        id: 'rebio-zi',
        code: 'ZI',
        name: 'Zona Intangível (Praia do Sul, Lagoa do Sul e Leste)',
        color: '#dc2626',
        protectionLevel: 'Intangibilidade Absoluta',
        areaPercent: '88% da reserva',
        description: 'A praia oceânica selvagem, as duas maiores lagoas costeiras de água doce/salobra da Ilha Grande e manguezais virgens.',
        objectives: [
          'Preservar integralmente o ecossistema estuarino e lagunar;',
          'Salvaguardar sítios intocados de desova de tartarugas de couro;',
          'Servir como santuário reprodutivo genético blindado de interferência.'
        ],
        allowedActivities: [
          'Pesquisas científicas de alto impacto biológico autorizadas pelo INEA;',
          'Fiscalização e patrulhamento armado contra invasores e caçadores.'
        ],
        forbiddenActivities: [
          'Qualquer presença de turistas, caminhantes ou banhistas;',
          'Acampamento, pesca, caça ou coleta de qualquer organismo vivo;',
          'Entrada de barcos a motor nas lagoas ou nas praias.'
        ],
        coordinates: [-44.2875, -23.1654],
        polygon: [
          [-44.305, -23.150],
          [-44.270, -23.145],
          [-44.260, -23.180],
          [-44.295, -23.185],
          [-44.305, -23.150]
        ]
      },
      {
        id: 'rebio-zpr',
        code: 'ZPR',
        name: 'Zona de Pesquisa Científica Controlada',
        color: '#8b5cf6',
        protectionLevel: 'Pesquisa Acadêmica Estrita',
        areaPercent: '12% das trilhas científicas',
        description: 'Trilhas delimitadas para trânsito de biólogos e guarda-parques entre as estações de amostragem ambiental.',
        objectives: [
          'Viabilizar o monitoramento de parâmetros físico-químicos e de fauna;',
          'Comprovar cientificamente os benefícios da preservação integral.'
        ],
        allowedActivities: [
          'Coleta estrita de amostras biológicas com autorização do órgão;',
          'Instalação temporária de sensores climáticos e armadilhas fotográficas.'
        ],
        forbiddenActivities: [
          'Trânsito desacompanhado de fiscais do INEA;',
          'Degradação do solo ou corte de vegetação nas parcelas de estudo.'
        ],
        coordinates: [-44.2780, -23.1620],
        polygon: [
          [-44.290, -23.155],
          [-44.265, -23.150],
          [-44.260, -23.170],
          [-44.285, -23.175],
          [-44.290, -23.155]
        ]
      }
    ]
  },
  'supbig': {
    ucId: 'supbig',
    title: 'Zoneamento Regional SUPBIG / INEA',
    summary: 'Estruturação territorial e operacional da Superintendência Regional da Baía da Ilha Grande sobre a Região Hidrográfica I (Paraty, Angra dos Reis e Mangaratiba).',
    zones: [
      {
        id: 'supbig-lic',
        code: 'NLA',
        name: 'Núcleo de Licenciamento Ambiental',
        color: '#0284c7',
        protectionLevel: 'Regulação Ambiental Estadual',
        areaPercent: 'Cobertura dos 3 municípios (RH I)',
        description: 'Análise de empreendimentos de baixo e médio impacto, vistorias técnicas de viabilidade e emissão de licenças (LP, LI, LO).',
        objectives: [
          'Condicionar atividades econômicas à conservação dos recursos naturais;',
          'Exigir medidas mitigatórias e compensatórias robustas;',
          'Garantir transparência pública nos atos administrativos ambientais.'
        ],
        allowedActivities: [
          'Vistorias técnicas de instrução de processos de licenciamento;',
          'Audiências públicas consultivas e pareceres ambientais técnicos;',
          'Emissão de certidões e termos de compromisso ambiental (TCA).'
        ],
        forbiddenActivities: [
          'Instalação de atividades potencialmente poluidoras sem licença prévia;',
          'Descumprimento de condicionantes ambientais obrigatórias;',
          'Sonegação de informações técnicas nos estudos de impacto.'
        ],
        coordinates: [-44.4400, -23.1000],
        polygon: [
          [-44.480, -23.080],
          [-44.400, -23.070],
          [-44.390, -23.130],
          [-44.470, -23.140],
          [-44.480, -23.080]
        ]
      },
      {
        id: 'supbig-fisc',
        code: 'NFA',
        name: 'Núcleo de Fiscalização e Pós-Licença',
        color: '#dc2626',
        protectionLevel: 'Polícia Ambiental e Tutela',
        areaPercent: 'Bacias litorâneas e marítimas',
        description: 'Vistorias in loco de atendimento a denúncias da Ouvidoria e Ministério Público, combate a desmatamentos e loteamentos clandestinos.',
        objectives: [
          'Cessar imediatamente agressões ao meio ambiente na Costa Verde;',
          'Autuar e multar infratores conforme Lei de Crimes Ambientais (Lei 9.605/98);',
          'Embargar construções irregulares em áreas de preservação permanente (APP).'
        ],
        allowedActivities: [
          'Patrulhamento terrestre e náutico com poder de polícia administrativo;',
          'Apreensão de motosserras, embarcações e materiais de crimes ambientais;',
          'Notificação e lavratura de autos de infração e interdições.'
        ],
        forbiddenActivities: [
          'Desobediência a embargos administrativos emitidos pelo INEA;',
          'Destruição de restingas, manguezais e encostas florestadas;',
          'Obstrução da ação fiscalizatória dos agentes do órgão ambiental.'
        ],
        coordinates: [-44.3800, -23.0800],
        polygon: [
          [-44.420, -23.060],
          [-44.350, -23.050],
          [-44.340, -23.110],
          [-44.410, -23.120],
          [-44.420, -23.060]
        ]
      }
    ]
  },
  'ngi-paraty': {
    ucId: 'ngi-paraty',
    title: 'Zoneamento NGI Paraty / ICMBio',
    summary: 'Territórios federais integrados englobando o Parque Nacional da Serra da Bocaina, a APA de Cairuçu e o Saco do Mamanguá.',
    zones: [
      {
        id: 'ngi-bocaina',
        code: 'PNSB',
        name: 'Zona Núcleo Serra da Bocaina',
        color: '#dc2626',
        protectionLevel: 'Proteção Integral Federal',
        areaPercent: '60% do complexo federal',
        description: 'Campos de altitude, florestas nebulares e paredões da Serra da Bocaina que deságuam na costa.',
        objectives: [
          'Preservação do mosaico de florestas montanas;',
          'Manutenção dos caminhos históricos do ouro e tropeiros;',
          'Pesquisas bioclimáticas de longo prazo.'
        ],
        allowedActivities: [
          'Caminhada no Caminho do Ouro com condutor credenciado;',
          'Acesso monitorado à Cachoeira do Veado;',
          'Educação ambiental nos centros de visitantes federais.'
        ],
        forbiddenActivities: [
          'Fogueiras e acampamento selvagem desordenado;',
          'Caça ou pesca predatória;',
          'Uso de veículos automotores nas trilhas históricas de pedra.'
        ],
        coordinates: [-44.7507, -23.2686],
        polygon: [
          [-44.780, -23.240],
          [-44.720, -23.230],
          [-44.710, -23.290],
          [-44.770, -23.300],
          [-44.780, -23.240]
        ]
      },
      {
        id: 'ngi-cairucu',
        code: 'APAC',
        name: 'Zona de Conservação Costeira (Cairuçu e Mamanguá)',
        color: '#0284c7',
        protectionLevel: 'Uso Sustentável e Ecoturismo',
        areaPercent: '40% da faixa litorânea',
        description: 'O fiorde tropical Saco do Mamanguá, praias paradisíacas e manguezais preservados.',
        objectives: [
          'Conservar a paisagem geológica do fiorde tropical;',
          'Harmonizar canoagem e ecoturismo com as vilas caiçaras;',
          'Ordenar o fundeio de lanchas e escunas.'
        ],
        allowedActivities: [
          'Passeios de canoa havaiana e caiaque no fiorde;',
          'Ecoturismo de base comunitária nos vilarejos;',
          'Pesca tradicional artesanal.'
        ],
        forbiddenActivities: [
          'Velocidade excessiva de lanchas no canal estreito do Mamanguá;',
          'Construções em manguezais e costões;',
          'Poluição sonora e descarte de efluentes.'
        ],
        coordinates: [-44.6400, -23.2840],
        polygon: [
          [-44.670, -23.270],
          [-44.610, -23.260],
          [-44.600, -23.310],
          [-44.660, -23.320],
          [-44.670, -23.270]
        ]
      }
    ]
  },
  'parque-da-cidade': {
    ucId: 'parque-da-cidade',
    title: 'Zoneamento do Parque da Cidade de Angra',
    summary: 'Fragmento de Mata Atlântica urbana na Serrinha da Banqueta que protege as encostas de Angra e oferece mirantes deslumbrantes da baía.',
    zones: [
      {
        id: 'pc-zpe',
        code: 'ZPE',
        name: 'Zona de Proteção de Encostas e Nascentes',
        color: '#dc2626',
        protectionLevel: 'Preservação Urbana Permanente',
        areaPercent: '65% do parque municipal',
        description: 'Encostas íngremes de mata densa que exercem função vital de retenção geológica e abastecimento de água.',
        objectives: [
          'Prevenir deslizamentos e erosão do solo urbano;',
          'Preservar nascentes de água que cortam o centro de Angra;',
          'Refúgio para pássaros e pequenos mamíferos da Mata Atlântica.'
        ],
        allowedActivities: [
          'Reflorestamento de enriquecimento com espécies nativas;',
          'Vistoria técnica geotécnica da Defesa Civil e Meio Ambiente;',
          'Estudos biológicos urbanos de biodiversidade.'
        ],
        forbiddenActivities: [
          'Ocupação irregular ou corte de árvores nas encostas;',
          'Despejo de entulho, escombros ou resíduos domésticos;',
          'Fogueiras e queima de lixo.'
        ],
        coordinates: [-44.3123, -22.9870],
        polygon: [
          [-44.318, -22.982],
          [-44.306, -22.980],
          [-44.304, -22.992],
          [-44.316, -22.994],
          [-44.318, -22.982]
        ]
      },
      {
        id: 'pc-zup',
        code: 'ZUP',
        name: 'Zona de Uso Público e Mirantes',
        color: '#10b981',
        protectionLevel: 'Lazer e Educação Ambiental',
        areaPercent: '35% da área',
        description: 'Sede administrativa, centro de visitantes, mirante 360° da Baía de Angra e trilhas pedagógicas.',
        objectives: [
          'Atender escolas da rede pública com trilhas monitoradas;',
          'Disponibilizar área de lazer e contemplação para os moradores;',
          'Promover a conscientização sobre o valor das florestas urbanas.'
        ],
        allowedActivities: [
          'Visitação aos mirantes com visão panorâmica das ilhas;',
          'Aulas ao ar livre e oficinas de plantio de mudas;',
          'Caminhadas na Trilha da Cruz e áreas de descanso.'
        ],
        forbiddenActivities: [
          'Danos aos mirantes, bancos ou sinalização pedagógica;',
          'Uso de fogueiras ou churrasqueiras em área florestada;',
          'Acesso noturno sem autorização da administração municipal.'
        ],
        coordinates: [-44.3100, -22.9850],
        polygon: [
          [-44.314, -22.981],
          [-44.306, -22.980],
          [-44.305, -22.989],
          [-44.313, -22.990],
          [-44.314, -22.981]
        ]
      }
    ]
  }
};

export function getZoningGeojson(ucId: string) {
  const zoning = ucsZoningData[ucId];
  if (!zoning) return { type: 'FeatureCollection', features: [] };

  return {
    type: 'FeatureCollection',
    features: zoning.zones.map(z => ({
      type: 'Feature',
      id: z.id,
      properties: {
        id: z.id,
        ucId: ucId,
        code: z.code,
        name: z.name,
        color: z.color,
        protectionLevel: z.protectionLevel,
        areaPercent: z.areaPercent,
        description: z.description,
        objectives: z.objectives.join('; '),
        allowedActivities: z.allowedActivities.join('; '),
        forbiddenActivities: z.forbiddenActivities.join('; ')
      },
      geometry: {
        type: 'Polygon',
        coordinates: [z.polygon]
      }
    }))
  };
}
