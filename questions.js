// ============================================
// Banco de Questões ENEM - CyberQuiz v3.0
// Todas as questões organizadas por matéria
// ============================================

const questionsBank = {
    // ============================================
    // LINGUAGENS, CÓDIGOS E SUAS TECNOLOGIAS
    // ============================================
    linguagens: [
        {
            id: 1,
            subject: "linguagens",
            difficulty: "normal",
            question: `Leia o texto a seguir:

"A linguagem é o veículo da comunicação. É por meio dela que expressamos nossos pensamentos, sentimentos e desejos. Mas a linguagem não é apenas um instrumento de comunicação: ela também é um instrumento de ação sobre o outro."

Considerando as funções da linguagem, o trecho destacado refere-se principalmente à função:`,
            options: [
                "A) Referencial, pois transmite informações objetivas sobre a realidade.",
                "B) Emotiva, pois expressa os sentimentos do emissor.",
                "C) Conativa, pois busca influenciar o comportamento do receptor.",
                "D) Metalinguística, pois a linguagem fala sobre si mesma.",
                "E) Fática, pois testa o canal de comunicação."
            ],
            correct: 2,
            explanation: "A função conativa (ou apelativa) da linguagem tem como objetivo influenciar o comportamento do receptor, buscando convencê-lo ou persuadi-lo. O trecho 'instrumento de ação sobre o outro' indica claramente essa função, que centra-se no receptor da mensagem."
        },
        {
            id: 2,
            subject: "linguagens",
            difficulty: "normal",
            question: `Leia o poema de Carlos Drummond de Andrade:

'No meio do caminho tinha uma pedra
tinha uma pedra no meio do caminho
tinha uma pedra
no meio do caminho tinha uma pedra.'

Este poema de Drummond é considerado um marco do Modernismo brasileiro. A repetição da palavra 'pedra' sugere:`,
            options: [
                "A) A beleza da natureza e a contemplação paisagística.",
                "B) Um obstáculo existencial que se impõe ao sujeito lírico.",
                "C) A riqueza mineral do Brasil e seu potencial econômico.",
                "D) A simplicidade da linguagem coloquial modernista.",
                "E) Uma crítica social à desigualdade nas estradas."
            ],
            correct: 1,
            explanation: "A 'pedra' no poema de Drummond simboliza um obstáculo existencial, uma dificuldade que se impõe ao indivíduo em seu caminho. A repetição obsessiva reforça a ideia de algo que não pode ser ignorado, representando as dificuldades e impasses da existência humana."
        },
        {
            id: 3,
            subject: "linguagens",
            difficulty: "easy",
            question: `Leia a charge:

[Descrição: Uma pessoa olhando para o celular enquanto caminha, com vários obstáculos no caminho. Legenda: 'Conectado com o mundo, desconectado da realidade.']

A charge critica:`,
            options: [
                "A) A falta de infraestrutura nas cidades brasileiras.",
                "B) O excesso de dependência dos aparelhos celulares.",
                "C) A dificuldade de locomoção em grandes centros urbanos.",
                "D) A evolução tecnológica dos smartphones.",
                "E) A importância das redes sociais na vida moderna."
            ],
            correct: 1,
            explanation: "A charge faz uma crítica social ao comportamento de pessoas que ficam tão absortas em seus celulares que se desconectam do mundo real ao seu redor, não percebendo os obstáculos e perigos imediatos. É uma ironia sobre como a hiperconexão digital pode gerar desconexão da realidade física."
        },
        {
            id: 4,
            subject: "linguagens",
            difficulty: "hard",
            question: "Assinale a alternativa em que a regência verbal está de acordo com a norma-padrão da língua portuguesa:",
            options: [
                'A) "Assisti o filme ontem à noite."',
                'B) "O filme que mais gostei foi o de comédia."',
                'C) "Precisamos obedecer as regras do trânsito."',
                'D) "Aspiro ao cargo de gerente desde ano passado."',
                'E) "Vou pagar você o almoço de hoje."'
            ],
            correct: 3,
            explanation: "O verbo 'aspirar' no sentido de 'desejar, almejar' é transitivo indireto e exige a preposição 'a'. Portanto, 'Aspiro ao cargo' está correto. Nas outras alternativas: A) 'assistir' no sentido de ver exige 'a' (assisti ao filme); B) 'gostar' exige 'de' (de que mais gostei); C) 'obedecer' exige 'a' (obedecer às regras); E) 'pagar' no sentido de quitar exige 'a' (pagar a você)."
        },
        {
            id: 5,
            subject: "linguagens",
            difficulty: "normal",
            question: "Machado de Assis, em 'Memórias Póstumas de Brás Cubas', inova ao criar um narrador que:",
            options: [
                "A) Narra em primeira pessoa os fatos de forma cronológica.",
                "B) É um defunto-autor, narrando sua vida após a morte.",
                "C) Mantém imparcialidade total sobre os fatos narrados.",
                "D) Utiliza linguagem simples e direta, sem ironias.",
                "E) Foca apenas nos aspectos positivos da sociedade."
            ],
            correct: 1,
            explanation: "A grande inovação de Machado de Assis em 'Memórias Póstumas de Brás Cubas' (1881) é o narrador-protagonista que é um 'defunto-autor', ou seja, alguém que narra sua própria vida depois de morto. Essa perspectiva única permite ao autor desenvolver uma narrativa irônica e crítica, com digressões e reflexões filosóficas."
        },
        {
            id: 6,
            subject: "linguagens",
            difficulty: "normal",
            question: "A obra 'Abaporu', de Tarsila do Amaral, é considerada um ícone do Modernismo brasileiro e inspirou o movimento:",
            options: [
                "A) Concretismo",
                "B) Tropicalismo",
                "C) Antropofagia",
                "D) Neoconcretismo",
                "E) Semana de 22"
            ],
            correct: 2,
            explanation: "A pintura 'Abaporu' (1928) de Tarsila do Amaral inspirou Oswald de Andrade a criar o 'Manifesto Antropófago', dando origem ao Movimento Antropofágico. O termo 'antropofagia' foi usado metaforicamente para representar a ideia de 'devorar' influências culturais estrangeiras e transformá-las em algo genuinamente brasileiro."
        },
        {
            id: 7,
            subject: "linguagens",
            difficulty: "normal",
            question: `Read the following text:

'Social media has transformed the way we communicate. While it connects people across distances, studies show that excessive use can lead to feelings of isolation and anxiety, particularly among teenagers.'

The main idea of the text is:`,
            options: [
                "A) Social media is beneficial for all age groups.",
                "B) Technology should be avoided by teenagers.",
                "C) Social media has both positive and negative effects.",
                "D) Communication has become easier with technology.",
                "E) Teenagers are addicted to social networks."
            ],
            correct: 2,
            explanation: "The text presents a balanced view of social media, acknowledging both its benefits ('connects people across distances') and its drawbacks ('excessive use can lead to feelings of isolation and anxiety'). This duality is best captured by option C, which recognizes both positive and negative effects."
        },
        {
            id: 8,
            subject: "linguagens",
            difficulty: "normal",
            question: `Leia o trecho da música 'Água de Beber', de Vinicius de Moraes:

'Água de beber, água de beber
Eu tomei, eu tomei
Água de beber, água de beber
Mas não me saciei'

A água, nesse contexto, funciona como:`,
            options: [
                "A) Elemento de crítica à falta de saneamento básico.",
                "B) Metáfora para algo essencial que não satisfaz completamente.",
                "C) Símbolo de pureza e inocência infantil.",
                "D) Representação literal da sede física.",
                "E) Crítica ao desperdício de recursos naturais."
            ],
            correct: 2,
            explanation: "Na letra de Vinicius, a água funciona como metáfora para algo que, embora essencial e consumido repetidamente ('eu tomei, eu tomei'), não consegue satisfazer completamente ('mas não me saciei'). Pode representar amor, conhecimento, ou qualquer necessidade humana que permanece insatisfeita mesmo após tentativas de preenchimento."
        },
        {
            id: 9,
            subject: "linguagens",
            difficulty: "hard",
            question: "Em qual alternativa a colocação pronominal está de acordo com a norma-padrão?",
            options: [
                'A) "Me empresta um lápis?"',
                'B) "Não se esqueça de mim."',
                'C) "Te vejo amanhã."',
                'D) "Me diz a verdade."',
                'E) "Espera-me aqui."'
            ],
            correct: 1,
            explanation: "A alternativa B está correta. Com palavras de sentido negativo (não, nunca, jamais, etc.), a próclise (pronome antes do verbo) é obrigatória na norma-padrão. 'Não se esqueça' segue essa regra."
        },
        {
            id: 10,
            subject: "linguagens",
            difficulty: "normal",
            question: "O livro 'Vidas Secas', de Graciliano Ramos, é um marco do Romance de 30 e retrata:",
            options: [
                "A) A vida urbana das classes médias no Rio de Janeiro.",
                "B) As dificuldades da família sertaneja nordestina.",
                "C) Os conflitos fundiários na região amazônica.",
                "D) A imigração italiana em São Paulo.",
                "E) As tradições gaúchas no sul do Brasil."
            ],
            correct: 1,
            explanation: "'Vidas Secas' (1938) é uma obra-prima do Romance de 30 que retrata a vida de uma família de retirantes no sertão nordestino, enfrentando a seca, a fome e a miséria. A obra é um retrato cru e realista das condições de vida no sertão, com uma narrativa fragmentada que reflete a descontinuidade da existência dos personagens."
        }
    ],

    // ============================================
    // MATEMÁTICA E SUAS TECNOLOGIAS
    // ============================================
    matematica: [
        {
            id: 1,
            subject: "matematica",
            difficulty: "normal",
            question: "Um aplicativo de transporte cobra uma taxa fixa de R$ 5,00 mais R$ 2,50 por quilômetro rodado. Qual é a expressão que representa o valor total (V) a ser pago por uma corrida de x quilômetros?",
            options: [
                "A) V = 5x + 2,5",
                "B) V = 2,5x + 5",
                "C) V = 7,5x",
                "D) V = 5x - 2,5",
                "E) V = 2,5x - 5"
            ],
            correct: 1,
            explanation: "A função afim que representa o custo é V(x) = taxa fixa + (valor por km × km rodados). Portanto: V = 5 + 2,5x ou V = 2,5x + 5. A taxa fixa de R$ 5,00 é o coeficiente linear (valor quando x = 0), e R$ 2,50 por km é o coeficiente angular (taxa de variação)."
        },
        {
            id: 2,
            subject: "matematica",
            difficulty: "easy",
            question: "Em uma pesquisa com 500 pessoas, 60% preferem café em vez de chá. Desses que preferem café, 25% adicionam açúcar. Quantas pessoas preferem café com açúcar?",
            options: [
                "A) 30",
                "B) 60",
                "C) 75",
                "D) 125",
                "E) 150"
            ],
            correct: 2,
            explanation: "Primeiro calculamos quantas pessoas preferem café: 60% de 500 = 0,6 × 500 = 300 pessoas. Depois, calculamos 25% dessas 300 pessoas: 25% de 300 = 0,25 × 300 = 75 pessoas. Portanto, 75 pessoas preferem café com açúcar."
        },
        {
            id: 3,
            subject: "matematica",
            difficulty: "normal",
            question: "Um terreno retangular tem 30 m de comprimento e 20 m de largura. Se aumentarmos o comprimento em 10% e diminuirmos a largura em 10%, a área do terreno:",
            options: [
                "A) Permanece a mesma.",
                "B) Aumenta 1%.",
                "C) Diminui 1%.",
                "D) Aumenta 10%.",
                "E) Diminui 10%."
            ],
            correct: 2,
            explanation: "Área original: 30 × 20 = 600 m². Novo comprimento: 30 + 10% = 33 m. Nova largura: 20 - 10% = 18 m. Nova área: 33 × 18 = 594 m². Variação: (594 - 600) / 600 = -6/600 = -0,01 = -1%. Portanto, a área diminui 1%."
        },
        {
            id: 4,
            subject: "matematica",
            difficulty: "normal",
            question: "A média aritmética de 5 números é 20. Se adicionarmos um sexto número, a nova média passa a ser 22. Qual é o sexto número?",
            options: [
                "A) 28",
                "B) 30",
                "C) 32",
                "D) 34",
                "E) 36"
            ],
            correct: 2,
            explanation: "Soma dos 5 números: 5 × 20 = 100. Nova soma com 6 números: 6 × 22 = 132. Sexto número: 132 - 100 = 32."
        },
        {
            id: 5,
            subject: "matematica",
            difficulty: "hard",
            question: "Em uma urna há 10 bolas: 4 vermelhas, 3 azuis e 3 verdes. Retirando-se duas bolas sucessivamente, sem reposição, qual a probabilidade de ambas serem vermelhas?",
            options: [
                "A) 2/15",
                "B) 4/25",
                "C) 1/5",
                "D) 8/45",
                "E) 2/9"
            ],
            correct: 0,
            explanation: "Probabilidade da primeira bola ser vermelha: 4/10. Após retirar uma vermelha, restam 9 bolas, sendo 3 vermelhas. Probabilidade da segunda ser vermelha: 3/9. Probabilidade total: (4/10) × (3/9) = 12/90 = 2/15."
        },
        {
            id: 6,
            subject: "matematica",
            difficulty: "normal",
            question: "O lucro L de uma empresa é dado por L(x) = -x² + 100x - 1500, onde x é a quantidade vendida. Qual quantidade maximiza o lucro?",
            options: [
                "A) 25",
                "B) 40",
                "C) 50",
                "D) 60",
                "E) 75"
            ],
            correct: 2,
            explanation: "A função L(x) = -x² + 100x - 1500 é uma parábola com concavidade para baixo. O vértice (ponto de máximo) ocorre em x = -b/(2a) = -100/(2×(-1)) = -100/(-2) = 50. Portanto, 50 unidades maximizam o lucro."
        },
        {
            id: 7,
            subject: "matematica",
            difficulty: "easy",
            question: "Um produto custa R$ 200,00 à vista. A prazo, tem um acréscimo de 15%. Qual o valor a prazo?",
            options: [
                "A) R$ 215,00",
                "B) R$ 220,00",
                "C) R$ 225,00",
                "D) R$ 230,00",
                "E) R$ 235,00"
            ],
            correct: 3,
            explanation: "Acréscimo de 15% sobre R$ 200,00: 15% × 200 = 0,15 × 200 = R$ 30,00. Valor a prazo: 200 + 30 = R$ 230,00. Ou diretamente: 200 × 1,15 = R$ 230,00."
        },
        {
            id: 8,
            subject: "matematica",
            difficulty: "normal",
            question: "Em um triângulo retângulo, um cateto mede 6 cm e a hipotenusa mede 10 cm. Qual é o seno do ângulo oposto ao cateto de 6 cm?",
            options: [
                "A) 0,4",
                "B) 0,5",
                "C) 0,6",
                "D) 0,75",
                "E) 0,8"
            ],
            correct: 2,
            explanation: "O seno de um ângulo em um triângulo retângulo é dado por: seno = cateto oposto / hipotenusa. Portanto, sen(θ) = 6/10 = 0,6."
        },
        {
            id: 9,
            subject: "matematica",
            difficulty: "normal",
            question: "De quantas maneiras diferentes podemos organizar 5 livros em uma prateleira?",
            options: [
                "A) 25",
                "B) 60",
                "C) 100",
                "D) 120",
                "E) 720"
            ],
            correct: 3,
            explanation: "Trata-se de uma permutação simples de 5 elementos. O número de maneiras de organizar n elementos distintos é n! (n fatorial). Portanto: 5! = 5 × 4 × 3 × 2 × 1 = 120 maneiras."
        },
        {
            id: 10,
            subject: "matematica",
            difficulty: "easy",
            question: "As notas de um aluno em 5 provas foram: 7,0; 8,5; 6,0; 9,0; 7,5. Qual é a mediana dessas notas?",
            options: [
                "A) 6,0",
                "B) 7,0",
                "C) 7,5",
                "D) 7,6",
                "E) 8,5"
            ],
            correct: 2,
            explanation: "Para encontrar a mediana, primeiro organizamos os dados em ordem crescente: 6,0; 7,0; 7,5; 8,5; 9,0. Como temos 5 valores (ímpar), a mediana é o valor central, ou seja, a terceira posição: 7,5."
        }
    ],

    // ============================================
    // CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS
    // ============================================
    natureza: [
        {
            id: 1,
            subject: "natureza",
            difficulty: "easy",
            question: "Um carro percorre uma estrada com velocidade constante de 90 km/h. Qual a distância percorrida em 20 minutos?",
            options: [
                "A) 15 km",
                "B) 20 km",
                "C) 25 km",
                "D) 30 km",
                "E) 35 km"
            ],
            correct: 3,
            explanation: "Velocidade = 90 km/h. Tempo = 20 minutos = 1/3 hora. Distância = velocidade × tempo = 90 × (1/3) = 30 km."
        },
        {
            id: 2,
            subject: "natureza",
            difficulty: "normal",
            question: "O pH de uma solução aquosa é 3. Isso indica que a solução é:",
            options: [
                "A) Fortemente básica.",
                "B) Levemente básica.",
                "C) Neutra.",
                "D) Levemente ácida.",
                "E) Fortemente ácida."
            ],
            correct: 4,
            explanation: "A escala de pH varia de 0 a 14. Valores abaixo de 7 indicam acidez, sendo que quanto menor o valor, mais ácida é a solução. pH = 3 está bem abaixo de 7, indicando uma solução fortemente ácida. pH = 7 é neutro, e valores acima de 7 indicam basicidade."
        },
        {
            id: 3,
            subject: "natureza",
            difficulty: "normal",
            question: "A fotossíntese é o processo pelo qual as plantas convertem energia luminosa em energia química. Qual é a equação geral da fotossíntese?",
            options: [
                "A) C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energia",
                "B) 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂",
                "C) 6O₂ + C₆H₁₂O₆ → 6CO₂ + 6H₂O",
                "D) CO₂ + H₂O → C₆H₁₂O₆ + O₂",
                "E) C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"
            ],
            correct: 1,
            explanation: "A equação geral da fotossíntese é: 6CO₂ + 6H₂O + energia luminosa → C₆H₁₂O₆ (glicose) + 6O₂. As plantas absorvem dióxido de carbono e água, utilizando a energia da luz solar (captada pela clorofila) para produzir glicose e liberar oxigênio como subproduto."
        },
        {
            id: 4,
            subject: "natureza",
            difficulty: "easy",
            question: "Segundo a Primeira Lei de Newton (Lei da Inércia), um corpo em repouso tende a:",
            options: [
                "A) Entrar em movimento espontaneamente.",
                "B) Permanecer em repouso, a menos que uma força atue sobre ele.",
                "C) Acelerar indefinidamente.",
                "D) Oscilar em torno de uma posição de equilíbrio.",
                "E) Diminuir sua massa."
            ],
            correct: 1,
            explanation: "A Primeira Lei de Newton, também conhecida como Lei da Inércia, estabelece que todo corpo tende a manter seu estado de movimento (repouso ou movimento retilíneo uniforme) a menos que uma força resultante atue sobre ele. Portanto, um corpo em repouso permanece em repouso até que uma força externa o faça mudar de estado."
        },
        {
            id: 5,
            subject: "natureza",
            difficulty: "normal",
            question: "Qual é o tipo de ligação química presente na molécula de água (H₂O)?",
            options: [
                "A) Ligação iônica.",
                "B) Ligação covalente polar.",
                "C) Ligação covalente apolar.",
                "D) Ligação metálica.",
                "E) Ligação de hidrogênio."
            ],
            correct: 1,
            explanation: "Na molécula de água, os átomos de hidrogênio e oxigênio compartilham elétrons, formando ligações covalentes. Como o oxigênio é mais eletronegativo que o hidrogênio, os elétrons são atraídos mais fortemente para o oxigênio, criando uma ligação covalente polar. As ligações de hidrogênio são interações entre moléculas de água, não dentro da molécula."
        },
        {
            id: 6,
            subject: "natureza",
            difficulty: "normal",
            question: "O DNA é a molécula responsável pelo armazenamento da informação genética. Qual das seguintes bases nitrogenadas NÃO está presente no DNA?",
            options: [
                "A) Adenina",
                "B) Timina",
                "C) Uracila",
                "D) Citosina",
                "E) Guanina"
            ],
            correct: 2,
            explanation: "O DNA contém quatro bases nitrogenadas: Adenina (A), Timina (T), Citosina (C) e Guanina (G). A Uracila (U) está presente apenas no RNA, substituindo a Timina. No DNA, A pareia com T, e C pareia com G."
        },
        {
            id: 7,
            subject: "natureza",
            difficulty: "normal",
            question: "Um resistor de 10 Ω é percorrido por uma corrente de 2 A. Qual é a tensão (voltagem) aplicada ao resistor?",
            options: [
                "A) 5 V",
                "B) 10 V",
                "C) 15 V",
                "D) 20 V",
                "E) 25 V"
            ],
            correct: 3,
            explanation: "Pela Lei de Ohm: V = R × I, onde V é a tensão (volts), R é a resistência (ohms) e I é a corrente (amperes). Portanto: V = 10 Ω × 2 A = 20 V."
        },
        {
            id: 8,
            subject: "natureza",
            difficulty: "normal",
            question: "O processo de separação de componentes do petróleo em uma refinaria é baseado na diferença de:",
            options: [
                "A) Densidade.",
                "B) Solubilidade.",
                "C) Ponto de fusão.",
                "D) Ponto de ebulição.",
                "E) Massa molecular."
            ],
            correct: 3,
            explanation: "O petróleo é separado em suas frações através da destilação fracionada, que se baseia nas diferentes temperaturas de ebulição dos componentes. Os hidrocarbonetos mais leves (como gasolina) evaporam primeiro, enquanto os mais pesados (como óleo combustível) permanecem líquidos em temperaturas mais altas."
        },
        {
            id: 9,
            subject: "natureza",
            difficulty: "normal",
            question: "A seleção natural, proposta por Charles Darwin, é o mecanismo central da evolução. Segundo essa teoria:",
            options: [
                "A) Os organismos se adaptam durante a vida e transmitem essas características.",
                "B) As espécies são imutáveis e foram criadas como são.",
                "C) Os indivíduos mais aptos sobrevivem e reproduzem-se mais.",
                "D) Todas as mutações são benéficas para os organismos.",
                "E) A evolução ocorre apenas em animais."
            ],
            correct: 2,
            explanation: "A seleção natural de Darwin propõe que, em uma população, existem variações naturais entre indivíduos. Aqueles com características mais vantajosas para o ambiente têm maior probabilidade de sobreviver e se reproduzir, transmitindo essas características à descendência. Com o tempo, isso leva à evolução das espécies."
        },
        {
            id: 10,
            subject: "natureza",
            difficulty: "normal",
            question: "A energia cinética de um corpo de massa 2 kg que se move a 3 m/s é:",
            options: [
                "A) 3 J",
                "B) 6 J",
                "C) 9 J",
                "D) 18 J",
                "E) 36 J"
            ],
            correct: 2,
            explanation: "A energia cinética é dada por Ec = (m × v²) / 2. Portanto: Ec = (2 × 3²) / 2 = (2 × 9) / 2 = 18 / 2 = 9 J."
        }
    ],

    // ============================================
    // CIÊNCIAS HUMANAS E SUAS TECNOLOGIAS
    // ============================================
    humanas: [
        {
            id: 1,
            subject: "humanas",
            difficulty: "normal",
            question: "A Revolução Industrial, iniciada na Inglaterra no século XVIII, provocou transformações profundas na sociedade. Uma dessas transformações foi:",
            options: [
                "A) O fim do trabalho assalariado.",
                "B) A diminuição da produção de mercadorias.",
                "C) O êxodo rural e crescimento das cidades.",
                "D) A valorização do trabalho artesanal.",
                "E) A redução da jornada de trabalho para 4 horas."
            ],
            correct: 2,
            explanation: "A Revolução Industrial provocou um intenso êxodo rural, com trabalhadores migrando do campo para as cidades em busca de emprego nas fábricas. Isso resultou em um crescimento urbano acelerado e desorganizado, com surgimento de bairros operários e problemas sociais como superlotação e falta de infraestrutura."
        },
        {
            id: 2,
            subject: "humanas",
            difficulty: "normal",
            question: "O fenômeno das ilhas de calor urbanas ocorre devido:",
            options: [
                "A) À presença de muitas áreas verdes nas cidades.",
                "B) À concentração de asfalto, concreto e pouca vegetação.",
                "C) À proximidade com oceanos e rios.",
                "D) À altitude elevada das cidades.",
                "E) À baixa densidade populacional."
            ],
            correct: 1,
            explanation: "As ilhas de calor urbanas são causadas pela substituição de áreas naturais por superfícies impermeáveis (asfalto, concreto) que absorvem e retêm calor, somado à falta de vegetação que proporcionaria resfriamento por evapotranspiração. A poluição e o calor gerado por veículos e indústrias também contribuem para o fenômeno."
        },
        {
            id: 3,
            subject: "humanas",
            difficulty: "normal",
            question: "Platão, em sua obra 'A República', propõe uma sociedade governada por:",
            options: [
                "A) Democratas eleitos pelo povo.",
                "B) Reis guerreiros.",
                "C) Filósofos-reis.",
                "D) Sacerdotes.",
                "E) Comerciantes."
            ],
            correct: 2,
            explanation: "Em 'A República', Platão defende que a sociedade ideal deveria ser governada por filósofos-reis, ou seja, governantes que possuíssem conhecimento filosófico e sabedoria para tomar decisões justas. Para ele, apenas aqueles que contemplaram a ideia do Bem seriam capazes de governar com justiça."
        },
        {
            id: 4,
            subject: "humanas",
            difficulty: "normal",
            question: "Émile Durkheim, um dos fundadores da Sociologia, conceituou 'fato social' como:",
            options: [
                "A) Um evento histórico de grande importância.",
                "B) Uma ação individual que influencia a sociedade.",
                "C) Maneiras de agir, pensar e sentir exteriores e coercitivos ao indivíduo.",
                "D) Um fenômeno econômico que afeta as classes sociais.",
                "E) Uma manifestação cultural de um grupo específico."
            ],
            correct: 2,
            explanation: "Para Durkheim, fatos sociais são maneiras de agir, pensar e sentir que existem independentemente das consciências individuais, sendo exteriores aos indivíduos e dotados de poder coercitivo. Exemplos incluem leis, normas morais, costumes e instituições sociais que moldam o comportamento individual."
        },
        {
            id: 5,
            subject: "humanas",
            difficulty: "easy",
            question: "O período conhecido como 'Brasil Colônia' durou de 1500 a 1822. Durante esse período, a economia colonial foi baseada principalmente:",
            options: [
                "A) Na industrialização de bens de consumo.",
                "B) No comércio de especiarias com a Ásia.",
                "C) Na exploração de recursos naturais e agricultura de exportação.",
                "D) No turismo e serviços.",
                "E) Na produção de tecnologia."
            ],
            correct: 2,
            explanation: "Durante o período colonial, a economia brasileira foi baseada na exploração de recursos naturais (pau-brasil, ouro, diamantes) e na agricultura de exportação (cana-de-açúcar, café, algodão), organizada em latifúndios e baseada no trabalho escravo. O Brasil funcionava como fornecedor de matérias-primas para a metrópole portuguesa."
        },
        {
            id: 6,
            subject: "humanas",
            difficulty: "normal",
            question: "O Cerrado brasileiro é um bioma caracterizado por:",
            options: [
                "A) Floresta densa e úmida.",
                "B) Vegetação de clima semiárido.",
                "C) Savana com árvores de troncos retorcidos.",
                "D) Campos limpos sem árvores.",
                "E) Manguezais litorâneos."
            ],
            correct: 2,
            explanation: "O Cerrado é o segundo maior bioma brasileiro e caracteriza-se por uma vegetação de savana, com árvores de porte médio, troncos retorcidos e cascas grossas (adaptações ao fogo e à seca sazonal). É um dos biomas mais ameaçados do Brasil devido à expansão da agricultura e pecuária."
        },
        {
            id: 7,
            subject: "humanas",
            difficulty: "normal",
            question: "Karl Marx desenvolveu o conceito de 'luta de classes' para explicar:",
            options: [
                "A) Conflitos entre países em guerra.",
                "B) Disputas esportivas entre nações.",
                "C) O conflito entre burguesia e proletariado no capitalismo.",
                "D) Competições acadêmicas entre universidades.",
                "E) Rivalidades regionais dentro de um país."
            ],
            correct: 2,
            explanation: "Para Marx, a história das sociedades é a história da luta de classes. No capitalismo, essa luta se dá entre a burguesia (donos dos meios de produção) e o proletariado (trabalhadores que vendem sua força de trabalho). Esse conflito seria o motor das transformações sociais e levaria, segundo Marx, ao socialismo."
        },
        {
            id: 8,
            subject: "humanas",
            difficulty: "normal",
            question: "A abolição da escravatura no Brasil ocorreu em 1888, com a Lei Áurea. Um fator que contribuiu para esse processo foi:",
            options: [
                "A) A vontade espontânea dos senhores de engenho.",
                "B) A pressão internacional e movimentos abolicionistas.",
                "C) A falta de escravos para serem libertados.",
                "D) A proibição do cultivo de cana-de-açúcar.",
                "E) A independência do Brasil."
            ],
            correct: 1,
            explanation: "A abolição foi resultado de um longo processo que incluiu pressão internacional (especialmente da Inglaterra, que queria ampliar seu mercado consumidor), leis graduais (Lei Eusébio de Queirós, Lei do Ventre Livre, Lei dos Sexagenários), movimentos abolicionistas, revoltas de escravizados e a resistência quilombola."
        },
        {
            id: 9,
            subject: "humanas",
            difficulty: "normal",
            question: "René Descartes, filósofo racionalista, é famoso pela frase 'Penso, logo existo'. Essa afirmação representa:",
            options: [
                "A) Uma dúvida sobre a existência humana.",
                "B) A certeza da existência a partir do ato de pensar.",
                "C) Uma negação da realidade material.",
                "D) Uma crítica à religião.",
                "E) Uma defesa do empirismo."
            ],
            correct: 1,
            explanation: "Descartes, em seu método da dúvida hiperbólica, questionou tudo o que poderia ser duvidado. Chegou à conclusão de que, mesmo duvidando de tudo, não poderia duvidar de que estava duvidando (pensando). Portanto, o ato de pensar prova a existência do pensador: 'Cogito, ergo sum' (Penso, logo existo)."
        },
        {
            id: 10,
            subject: "humanas",
            difficulty: "easy",
            question: "A globalização é um processo caracterizado principalmente por:",
            options: [
                "A) Isolamento econômico entre países.",
                "B) Intensificação das trocas comerciais e culturais em escala mundial.",
                "C) Diminuição do uso de tecnologias de comunicação.",
                "D) Fortalecimento das fronteiras nacionais.",
                "E) Redução da mobilidade de capitais."
            ],
            correct: 1,
            explanation: "A globalização é o processo de integração econômica, cultural, social e política em escala mundial, caracterizado pela intensificação do comércio internacional, fluxos de capitais, avanços nos transportes e comunicações, e intercâmbio cultural entre diferentes países e regiões."
        }
    ]
};

// ============================================
// FUNÇÃO PARA SEMEADURA NO MONGODB
// ============================================

// Esta função pode ser usada para importar as questões para o MongoDB
async function seedQuestionsToMongoDB() {
    const mongoose = require('mongoose');
    require('dotenv').config();

    const QuestionSchema = new mongoose.Schema({
        subject: String,
        difficulty: String,
        question: String,
        options: [String],
        correct: Number,
        explanation: String,
        id: Number
    });

    const Question = mongoose.model('Question', QuestionSchema);

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB conectado');

        // Limpar questões existentes
        await Question.deleteMany({});
        console.log('🗑️ Questões antigas removidas');

        // Inserir todas as questões
        const allQuestions = [
            ...questionsBank.linguagens,
            ...questionsBank.matematica,
            ...questionsBank.natureza,
            ...questionsBank.humanas
        ];

        await Question.insertMany(allQuestions);
        console.log(`✅ ${allQuestions.length} questões inseridas com sucesso!`);

        // Mostrar estatísticas
        const stats = await Question.aggregate([
            { $group: { _id: '$subject', count: { $sum: 1 } } }
        ]);

        console.log('\n📊 Questões por matéria:');
        stats.forEach(stat => {
            console.log(`   ${stat._id}: ${stat.count} questões`);
        });

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Conexão MongoDB fechada');
    }
}

// Export para uso no Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsBank, seedQuestionsToMongoDB };
}

// Se executado diretamente no Node.js, roda a semeadura
if (typeof window === 'undefined' && require.main === module) {
    seedQuestionsToMongoDB();
}