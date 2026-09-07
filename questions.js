/**
 * ENEM CyberQuiz - Banco de Questões
 * ------------------------------------------------------------
 * Todas as questões abaixo são de autoria própria do projeto,
 * escritas no estilo ENEM apenas como material de estudo — não
 * são reproduções de provas oficiais do INEP.
 *
 * Cada questão segue o formato:
 * {
 *   id: string único,
 *   subject: 'linguagens' | 'matematica' | 'natureza' | 'humanas',
 *   difficulty: 'easy' | 'normal' | 'hard',
 *   question: string,
 *   options: string[4],
 *   correct: número do índice correto em options,
 *   explanation: string
 * }
 *
 * O módulo funciona tanto no navegador (window.QUESTIONS) quanto
 * no Node.js (module.exports), sem depender de bundlers.
 */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.QUESTIONS = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const QUESTIONS = {
    linguagens: [
      {
        id: 'ling-01',
        subject: 'linguagens',
        difficulty: 'easy',
        question:
          'Em "Ainda que eu fale as línguas dos homens e dos anjos, se não tiver amor, serei como o bronze que soa", a figura de linguagem predominante é:',
        options: ['Metáfora', 'Hipérbole', 'Eufemismo', 'Onomatopeia'],
        correct: 0,
        explanation:
          'A comparação implícita entre a fala vazia e "o bronze que soa" configura uma metáfora, pois um termo é usado no lugar do outro por relação de semelhança.',
      },
      {
        id: 'ling-02',
        subject: 'linguagens',
        difficulty: 'normal',
        question:
          'A variação linguística que ocorre entre gerações diferentes, como o uso de gírias distintas por jovens e idosos, é chamada de:',
        options: ['Variação geográfica', 'Variação histórica', 'Variação geracional', 'Variação de registro'],
        correct: 2,
        explanation:
          'Diferenças de fala relacionadas à idade dos falantes caracterizam a variação geracional, um dos tipos de variação linguística estudados em sociolinguística.',
      },
      {
        id: 'ling-03',
        subject: 'linguagens',
        difficulty: 'normal',
        question:
          'No período composto "Estudei bastante, portanto fui bem na prova", a oração introduzida por "portanto" expressa relação de:',
        options: ['Causa', 'Consequência', 'Concessão', 'Condição'],
        correct: 1,
        explanation:
          '"Portanto" é uma conjunção conclusiva: introduz uma consequência lógica do que foi dito anteriormente.',
      },
      {
        id: 'ling-04',
        subject: 'linguagens',
        difficulty: 'hard',
        question:
          'O movimento literário brasileiro marcado pela valorização da linguagem coloquial, do nacionalismo crítico e da liberdade formal, iniciado com a Semana de Arte Moderna de 1922, é o:',
        options: ['Parnasianismo', 'Modernismo', 'Simbolismo', 'Arcadismo'],
        correct: 1,
        explanation:
          'O Modernismo brasileiro, deflagrado pela Semana de Arte Moderna de 1922, rompeu com o academicismo parnasiano e incorporou a fala cotidiana e temas nacionais de forma crítica.',
      },
      {
        id: 'ling-05',
        subject: 'linguagens',
        difficulty: 'easy',
        question: 'Um texto cuja finalidade principal é convencer o leitor de um ponto de vista pertence ao gênero:',
        options: ['Narrativo', 'Descritivo', 'Dissertativo-argumentativo', 'Injuntivo'],
        correct: 2,
        explanation:
          'Textos dissertativo-argumentativos organizam ideias em defesa de uma tese, usando argumentos para persuadir o leitor.',
      },
      {
        id: 'ling-06',
        subject: 'linguagens',
        difficulty: 'normal',
        question:
          'Em uma charge que combina imagem e texto verbal para criticar um fato do noticiário, o efeito de humor crítico é chamado de:',
        options: ['Ironia', 'Intertextualidade', 'Prosopopeia', 'Aliteração'],
        correct: 0,
        explanation:
          'A ironia consiste em dizer o contrário do que se pensa (ou sugerir uma leitura crítica por contraste), recurso comum em charges e cartuns.',
      },
      {
        id: 'ling-07',
        subject: 'linguagens',
        difficulty: 'hard',
        question:
          'Na frase "Se eu tivesse estudado mais, teria passado no vestibular", o tempo verbal do verbo "teria passado" é:',
        options: ['Futuro do subjuntivo', 'Futuro do pretérito composto', 'Pretérito mais-que-perfeito', 'Presente do subjuntivo'],
        correct: 1,
        explanation:
          '"Teria passado" é o futuro do pretérito composto, usado para indicar uma ação hipotética que dependeria de uma condição não realizada.',
      },
      {
        id: 'ling-08',
        subject: 'linguagens',
        difficulty: 'easy',
        question: 'O conjunto de regras que orienta a prática esportiva do voleibol, estudado em Educação Física, é chamado de:',
        options: ['Regulamento', 'Modalidade', 'Súmula', 'Protocolo'],
        correct: 0,
        explanation:
          'Regulamento é o termo técnico para o conjunto de regras oficiais que rege uma modalidade esportiva.',
      },
      {
        id: 'ling-09',
        subject: 'linguagens',
        difficulty: 'normal',
        question:
          'Em inglês, a frase "She has been studying for three hours" está no tempo verbal:',
        options: ['Simple Past', 'Present Perfect Continuous', 'Simple Future', 'Past Perfect'],
        correct: 1,
        explanation:
          'A estrutura "has been + verbo-ing" indica uma ação iniciada no passado e que continua até o momento presente: o Present Perfect Continuous.',
      },
      {
        id: 'ling-10',
        subject: 'linguagens',
        difficulty: 'hard',
        question:
          'Uma tela cubista que representa um mesmo objeto sob vários ângulos simultaneamente rompe principalmente com o princípio artístico da:',
        options: ['Perspectiva única', 'Proporção áurea', 'Simetria radial', 'Paleta monocromática'],
        correct: 0,
        explanation:
          'O Cubismo fragmenta a representação em múltiplos pontos de vista simultâneos, abandonando a perspectiva única da pintura clássica.',
      },
    ],

    matematica: [
      {
        id: 'mat-01',
        subject: 'matematica',
        difficulty: 'easy',
        question: 'O valor de x na equação 3x - 7 = 14 é:',
        options: ['5', '7', '9', '21'],
        correct: 1,
        explanation: '3x - 7 = 14 → 3x = 21 → x = 7.',
      },
      {
        id: 'mat-02',
        subject: 'matematica',
        difficulty: 'normal',
        question:
          'Uma torneira enche um tanque em 6 horas. Outra torneira, sozinha, enche o mesmo tanque em 3 horas. Trabalhando juntas, quanto tempo levam para encher o tanque?',
        options: ['2 horas', '4 horas', '4,5 horas', '9 horas'],
        correct: 0,
        explanation:
          'Somando as taxas: 1/6 + 1/3 = 1/2 do tanque por hora. Logo, o tempo é o inverso: 2 horas.',
      },
      {
        id: 'mat-03',
        subject: 'matematica',
        difficulty: 'normal',
        question: 'A área de um círculo de raio 4 cm, aproximando π por 3,14, é:',
        options: ['12,56 cm²', '25,12 cm²', '50,24 cm²', '100,48 cm²'],
        correct: 2,
        explanation: 'A = π·r² = 3,14 × 4² = 3,14 × 16 = 50,24 cm².',
      },
      {
        id: 'mat-04',
        subject: 'matematica',
        difficulty: 'hard',
        question:
          'Em uma progressão geométrica de razão 2, o primeiro termo é 3. A soma dos 5 primeiros termos é:',
        options: ['45', '63', '93', '99'],
        correct: 2,
        explanation:
          'Termos: 3, 6, 12, 24, 48. Soma = 3+6+12+24+48 = 93.',
      },
      {
        id: 'mat-05',
        subject: 'matematica',
        difficulty: 'easy',
        question: 'Se um produto custava R$ 80 e teve desconto de 25%, o novo preço é:',
        options: ['R$ 20', 'R$ 55', 'R$ 60', 'R$ 65'],
        correct: 2,
        explanation: '25% de 80 é 20. 80 - 20 = R$ 60.',
      },
      {
        id: 'mat-06',
        subject: 'matematica',
        difficulty: 'normal',
        question:
          'Lançando um dado de 6 faces não viciado, a probabilidade de obter um número maior que 4 é:',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correct: 1,
        explanation:
          'Números maiores que 4 no dado: 5 e 6 (2 casos favoráveis) em 6 possíveis → 2/6 = 1/3.',
      },
      {
        id: 'mat-07',
        subject: 'matematica',
        difficulty: 'hard',
        question: 'As raízes da equação x² - 5x + 6 = 0 são:',
        options: ['1 e 6', '2 e 3', '-2 e -3', '2 e -3'],
        correct: 1,
        explanation:
          'Fatorando: (x-2)(x-3) = 0 → x = 2 ou x = 3, pois 2+3=5 e 2×3=6.',
      },
      {
        id: 'mat-08',
        subject: 'matematica',
        difficulty: 'normal',
        question: 'A medida do terceiro ângulo de um triângulo, sabendo que os outros dois medem 40° e 65°, é:',
        options: ['65°', '75°', '105°', '115°'],
        correct: 1,
        explanation:
          'A soma dos ângulos internos de um triângulo é 180°. 180° - 40° - 65° = 75°.',
      },
      {
        id: 'mat-09',
        subject: 'matematica',
        difficulty: 'easy',
        question: 'A fração 3/4 corresponde a qual porcentagem?',
        options: ['34%', '43%', '75%', '80%'],
        correct: 2,
        explanation: '3 ÷ 4 = 0,75, que corresponde a 75%.',
      },
      {
        id: 'mat-10',
        subject: 'matematica',
        difficulty: 'hard',
        question:
          'Uma função do 1º grau f(x) = ax + b passa pelos pontos (0, 3) e (2, 7). O valor de a é:',
        options: ['1', '2', '3', '4'],
        correct: 1,
        explanation:
          'Com b = 3 (pois f(0)=3), usando f(2)=7: 2a + 3 = 7 → 2a = 4 → a = 2.',
      },
    ],

    natureza: [
      {
        id: 'nat-01',
        subject: 'natureza',
        difficulty: 'easy',
        question: 'A organela responsável pela produção de energia (ATP) na célula é a:',
        options: ['Mitocôndria', 'Ribossomo', 'Complexo de Golgi', 'Lisossomo'],
        correct: 0,
        explanation:
          'A mitocôndria realiza a respiração celular, processo que produz ATP, a principal moeda energética da célula.',
      },
      {
        id: 'nat-02',
        subject: 'natureza',
        difficulty: 'normal',
        question:
          'Um corpo de massa 2 kg sofre uma força resultante de 10 N. Pela segunda lei de Newton, sua aceleração é:',
        options: ['2 m/s²', '5 m/s²', '10 m/s²', '20 m/s²'],
        correct: 1,
        explanation: 'F = m·a → a = F/m = 10/2 = 5 m/s².',
      },
      {
        id: 'nat-03',
        subject: 'natureza',
        difficulty: 'hard',
        question:
          'Na tabela periódica, elementos da mesma família (coluna) apresentam propriedades químicas semelhantes principalmente porque possuem:',
        options: [
          'O mesmo número de prótons',
          'O mesmo número de nêutrons',
          'O mesmo número de elétrons na camada de valência',
          'A mesma massa atômica',
        ],
        correct: 2,
        explanation:
          'Elementos de uma mesma família têm o mesmo número de elétrons na camada de valência, o que determina comportamento químico semelhante.',
      },
      {
        id: 'nat-04',
        subject: 'natureza',
        difficulty: 'normal',
        question: 'O processo de divisão celular responsável pela formação de gametas é a:',
        options: ['Mitose', 'Meiose', 'Fissão binária', 'Brotamento'],
        correct: 1,
        explanation:
          'A meiose reduz o número de cromossomos à metade, originando células reprodutivas (gametas) geneticamente variadas.',
      },
      {
        id: 'nat-05',
        subject: 'natureza',
        difficulty: 'easy',
        question: 'A unidade de medida do Sistema Internacional para força é o:',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correct: 2,
        explanation: 'O Newton (N) é a unidade de força no SI, definida como kg·m/s².',
      },
      {
        id: 'nat-06',
        subject: 'natureza',
        difficulty: 'hard',
        question:
          'Uma reação de combustão completa do metano (CH₄) produz principalmente:',
        options: ['CO e H₂', 'CO₂ e H₂O', 'C e O₂', 'CH₃OH'],
        correct: 1,
        explanation:
          'A combustão completa de hidrocarbonetos, na presença de oxigênio suficiente, gera dióxido de carbono (CO₂) e água (H₂O).',
      },
      {
        id: 'nat-07',
        subject: 'natureza',
        difficulty: 'normal',
        question: 'O bioma brasileiro caracterizado por vegetação de gramíneas e árvores tortuosas, adaptado à seca sazonal, é o:',
        options: ['Cerrado', 'Mata Atlântica', 'Pantanal', 'Caatinga'],
        correct: 0,
        explanation:
          'O Cerrado é uma savana tropical com árvores de troncos retorcidos e cascas grossas, adaptadas ao fogo e à estação seca.',
      },
      {
        id: 'nat-08',
        subject: 'natureza',
        difficulty: 'easy',
        question: 'O processo pelo qual as plantas convertem luz solar em energia química é chamado de:',
        options: ['Respiração celular', 'Fotossíntese', 'Fermentação', 'Osmose'],
        correct: 1,
        explanation:
          'Na fotossíntese, organismos clorofilados convertem luz, água e CO₂ em glicose e oxigênio.',
      },
      {
        id: 'nat-09',
        subject: 'natureza',
        difficulty: 'hard',
        question:
          'Um circuito elétrico com dois resistores de 4 Ω e 6 Ω associados em série tem resistência equivalente de:',
        options: ['2 Ω', '2,4 Ω', '10 Ω', '24 Ω'],
        correct: 2,
        explanation:
          'Em associação em série, as resistências se somam: 4 + 6 = 10 Ω.',
      },
      {
        id: 'nat-10',
        subject: 'natureza',
        difficulty: 'normal',
        question: 'O gás mais abundante na atmosfera terrestre, correspondendo a cerca de 78% do ar, é o:',
        options: ['Oxigênio', 'Gás carbônico', 'Nitrogênio', 'Argônio'],
        correct: 2,
        explanation: 'O nitrogênio (N₂) compõe aproximadamente 78% da atmosfera terrestre.',
      },
    ],

    humanas: [
      {
        id: 'hum-01',
        subject: 'humanas',
        difficulty: 'easy',
        question: 'O processo histórico de ocupação e exploração do território brasileiro pelos portugueses, a partir de 1500, é conhecido como:',
        options: ['Independência', 'Colonização', 'Regência', 'Proclamação'],
        correct: 1,
        explanation:
          'A colonização portuguesa se estendeu do descobrimento até a independência em 1822, marcada pela exploração de recursos e mão de obra.',
      },
      {
        id: 'hum-02',
        subject: 'humanas',
        difficulty: 'normal',
        question:
          'O tipo de relevo formado por processos de acúmulo de sedimentos ao longo de rios e planícies, comum em regiões costeiras, é chamado de:',
        options: ['Planalto', 'Planície', 'Depressão', 'Serra'],
        correct: 1,
        explanation:
          'Planícies são áreas de terreno baixo e relativamente plano, formadas principalmente por deposição de sedimentos.',
      },
      {
        id: 'hum-03',
        subject: 'humanas',
        difficulty: 'hard',
        question:
          'Na filosofia de Platão, o "Mito da Caverna" é utilizado principalmente para ilustrar a diferença entre:',
        options: [
          'Corpo e alma',
          'Mundo sensível e mundo das ideias',
          'Razão e fé',
          'Natureza e cultura',
        ],
        correct: 1,
        explanation:
          'O mito descreve prisioneiros que confundem sombras com a realidade, representando a diferença entre as aparências do mundo sensível e o conhecimento verdadeiro do mundo das ideias.',
      },
      {
        id: 'hum-04',
        subject: 'humanas',
        difficulty: 'normal',
        question: 'O conceito sociológico que descreve normas e valores compartilhados por um grupo social é:',
        options: ['Cultura', 'Economia', 'Anomia', 'Estratificação'],
        correct: 0,
        explanation:
          'Cultura, em sociologia, refere-se ao conjunto de valores, crenças, costumes e práticas compartilhadas por um grupo.',
      },
      {
        id: 'hum-05',
        subject: 'humanas',
        difficulty: 'easy',
        question: 'A Revolução Industrial teve início, no século XVIII, principalmente em qual país?',
        options: ['França', 'Alemanha', 'Inglaterra', 'Estados Unidos'],
        correct: 2,
        explanation:
          'A Inglaterra foi pioneira na Revolução Industrial devido a fatores como acúmulo de capital, disponibilidade de carvão e inovações tecnológicas.',
      },
      {
        id: 'hum-06',
        subject: 'humanas',
        difficulty: 'hard',
        question:
          'O processo de urbanização acelerada e desordenada, comum em países em desenvolvimento e associado à formação de periferias precárias, é chamado de:',
        options: ['Gentrificação', 'Macrocefalia urbana', 'Conurbação', 'Êxodo rural'],
        correct: 1,
        explanation:
          'A macrocefalia urbana ocorre quando uma cidade cresce desproporcionalmente em relação às demais, concentrando população e infraestrutura de forma desigual.',
      },
      {
        id: 'hum-07',
        subject: 'humanas',
        difficulty: 'normal',
        question: 'O regime político brasileiro entre 1964 e 1985, marcado por governos militares, é conhecido como:',
        options: ['República Velha', 'Era Vargas', 'Ditadura Militar', 'Nova República'],
        correct: 2,
        explanation:
          'Após o golpe de 1964, o Brasil viveu um período de governos militares que durou até a redemocratização em 1985.',
      },
      {
        id: 'hum-08',
        subject: 'humanas',
        difficulty: 'easy',
        question: 'A linha imaginária que divide a Terra em hemisférios Norte e Sul é a:',
        options: ['Linha do Equador', 'Meridiano de Greenwich', 'Trópico de Câncer', 'Trópico de Capricórnio'],
        correct: 0,
        explanation: 'A Linha do Equador (latitude 0°) divide o planeta nos hemisférios Norte e Sul.',
      },
      {
        id: 'hum-09',
        subject: 'humanas',
        difficulty: 'hard',
        question:
          'No pensamento de Karl Marx, o termo "mais-valia" refere-se principalmente a:',
        options: [
          'O lucro obtido com juros bancários',
          'O valor excedente gerado pelo trabalho não pago ao trabalhador',
          'O imposto cobrado sobre mercadorias',
          'A valorização de ações na bolsa',
        ],
        correct: 1,
        explanation:
          'Para Marx, a mais-valia é a diferença entre o valor produzido pelo trabalhador e o salário que ele recebe, apropriada pelo capitalista.',
      },
      {
        id: 'hum-10',
        subject: 'humanas',
        difficulty: 'normal',
        question: 'A organização internacional criada em 1945 para promover paz e cooperação entre os países é a:',
        options: ['OMC', 'ONU', 'OTAN', 'UNESCO'],
        correct: 1,
        explanation:
          'A Organização das Nações Unidas (ONU) foi fundada em 1945, após a Segunda Guerra Mundial, para promover paz, segurança e cooperação internacional.',
      },
    ],
  };

  return QUESTIONS;
});
