// Conteúdo de demonstração do FatecLab.
// Fonte única para:
//   - backend/src/main/resources/db/seed/V4_1__dados_demonstracao.sql (banco de dados)
//   - frontend/src/demo/dadosDemo.json (modo demonstração, sem back-end)
// Depois de editar, rode na pasta frontend:  npm run gerar:dados
//
// Formato do conteúdo das lições (Markdown simplificado):
//   ## Título      parágrafos     - item de lista     **negrito**     `código`     ```bloco```
// Em cada questão, "correta" é o índice (a partir de 0) da alternativa certa.
// "migracao: 2" (ou maior) gera um arquivo de migração novo, sem alterar os já aplicados no banco.

export const trilhas = [
  {
    titulo: "Lógica de Programação",
    area: "Programação",
    nivel: "INICIANTE",
    descricao:
      "Do algoritmo ao código: variáveis, operadores, decisões e repetições. A base para qualquer linguagem.",
    modulos: [
      {
        titulo: "Algoritmos e variáveis",
        xp: 20,
        conteudo: `Um **algoritmo** é uma sequência finita e ordenada de passos que resolve um problema. Uma receita de bolo é um algoritmo: tem entrada (ingredientes), processamento (modo de preparo) e saída (o bolo).

## Variáveis

Programas guardam dados em **variáveis**: espaços na memória identificados por um nome. Cada variável tem um **tipo**, que define o que ela pode armazenar:

- **inteiro**: números sem casas decimais (idade, quantidade)
- **real**: números com casas decimais (preço, média)
- **texto** (string): sequências de caracteres (nome, e-mail)
- **lógico** (booleano): verdadeiro ou falso

\`\`\`
idade = 19
media = 7.5
nome = "Luan"
aprovado = verdadeiro
\`\`\`

## Atribuição

O sinal \`=\` na maioria das linguagens significa **atribuição**, não igualdade: "guarde o valor da direita na variável da esquerda". Por isso \`x = x + 1\` faz sentido: pega o valor atual de x, soma 1 e guarda de volta.`,
        questoes: [
          {
            enunciado: "O que melhor define um algoritmo?",
            alternativas: [
              "Um programa escrito obrigatoriamente em Java",
              "Uma sequência finita e ordenada de passos para resolver um problema",
              "Um componente físico do computador",
              "Um tipo de variável que guarda textos",
            ],
            correta: 1,
            explicacao:
              "Algoritmo é a sequência de passos em si, independente da linguagem. O programa é a implementação do algoritmo em uma linguagem.",
          },
          {
            enunciado: "Qual tipo de dado é o mais adequado para guardar o preço de um produto, como 19,90?",
            alternativas: ["Inteiro", "Lógico", "Real", "Texto"],
            correta: 2,
            explicacao: "Preços têm casas decimais, por isso o tipo real (float/double) é o adequado.",
          },
          {
            enunciado: "Se x vale 4, quanto x passa a valer depois da instrução x = x + 1?",
            alternativas: ["4", "5", "1", "A instrução é inválida"],
            correta: 1,
            explicacao:
              "O lado direito é calculado primeiro (4 + 1 = 5) e o resultado é atribuído de volta a x.",
          },
        ],
      },
      {
        titulo: "Operadores e expressões",
        xp: 20,
        conteudo: `Operadores combinam valores para formar **expressões**.

## Aritméticos

- \`+\` soma, \`-\` subtração, \`*\` multiplicação, \`/\` divisão
- \`%\` **resto da divisão** (módulo): \`10 % 3\` resulta em 1

A precedência segue a matemática: multiplicação e divisão antes de soma e subtração. Use parênteses para deixar a intenção clara: \`(nota1 + nota2) / 2\`.

## Relacionais

Comparam valores e sempre resultam em verdadeiro ou falso: \`==\` (igual), \`!=\` (diferente), \`>\`, \`<\`, \`>=\`, \`<=\`.

## Lógicos

- **E** (\`&&\`): verdadeiro só se as duas condições forem verdadeiras
- **OU** (\`||\`): verdadeiro se pelo menos uma for verdadeira
- **NÃO** (\`!\`): inverte o valor

\`\`\`
podeVotar = idade >= 16
aprovado = media >= 6 && frequencia >= 75
\`\`\`

Um uso clássico do operador \`%\`: um número é par quando \`numero % 2 == 0\`.`,
        questoes: [
          {
            enunciado: "Qual é o resultado de 17 % 5?",
            alternativas: ["3", "2", "3,4", "12"],
            correta: 1,
            explicacao: "17 dividido por 5 dá 3 com resto 2. O operador % devolve o resto: 2.",
          },
          {
            enunciado: "Qual é o valor da expressão 2 + 3 * 4?",
            alternativas: ["20", "14", "24", "9"],
            correta: 1,
            explicacao: "A multiplicação tem precedência: 3 * 4 = 12, depois 2 + 12 = 14.",
          },
          {
            enunciado:
              "Com media = 7 e frequencia = 70, qual é o resultado de (media >= 6 && frequencia >= 75)?",
            alternativas: ["Verdadeiro", "Falso", "7", "Erro de execução"],
            correta: 1,
            explicacao:
              "A primeira condição é verdadeira, mas a segunda é falsa (70 < 75). Com o operador E, basta uma falsa para o resultado ser falso.",
          },
        ],
      },
      {
        titulo: "Estruturas de decisão",
        xp: 20,
        conteudo: `Estruturas de decisão permitem que o programa siga caminhos diferentes conforme uma condição.

## Se / senão

\`\`\`
se (media >= 6) {
    escreva("Aprovado")
} senão se (media >= 4) {
    escreva("Exame")
} senão {
    escreva("Reprovado")
}
\`\`\`

O programa testa as condições **de cima para baixo** e executa apenas o primeiro bloco cuja condição for verdadeira. Por isso a ordem das condições importa.

## Escolha (switch)

Quando a decisão depende de um único valor com várias opções fixas, a estrutura **escolha/caso** (switch) costuma ser mais legível:

\`\`\`
escolha (opcao) {
    caso 1: cadastrar()
    caso 2: listar()
    padrão: escreva("Opção inválida")
}
\`\`\`

## Boas práticas

- Evite aninhar muitos "se" uns dentro dos outros: extraia funções ou combine condições
- Cubra o caso "senão": o que acontece quando nenhuma condição é verdadeira?`,
        questoes: [
          {
            enunciado:
              "No código do exemplo (aprovado com média >= 6, exame com média >= 4), o que é exibido para média 5?",
            alternativas: ["Aprovado", "Exame", "Reprovado", "Nada é exibido"],
            correta: 1,
            explicacao: "5 não é >= 6, então o primeiro teste falha. 5 é >= 4, então o segundo bloco é executado: Exame.",
          },
          {
            enunciado: "Quando a estrutura escolha/caso (switch) é mais indicada?",
            alternativas: [
              "Para repetir um bloco várias vezes",
              "Quando a decisão depende de um único valor com várias opções fixas",
              "Para declarar variáveis",
              "Quando há apenas uma condição verdadeira ou falsa",
            ],
            correta: 1,
            explicacao: "O switch compara um mesmo valor contra vários casos, como as opções de um menu.",
          },
          {
            enunciado: "Em uma cadeia se / senão se / senão, quantos blocos são executados no máximo?",
            alternativas: ["Todos os que forem verdadeiros", "Exatamente dois", "Apenas um", "Nenhum"],
            correta: 2,
            explicacao: "A cadeia para no primeiro bloco verdadeiro. Se nenhum for, executa o senão. Sempre um bloco, no máximo.",
          },
        ],
      },
      {
        titulo: "Estruturas de repetição",
        xp: 25,
        conteudo: `Laços (loops) repetem um bloco de código enquanto uma condição for verdadeira.

## Enquanto (while)

Testa a condição **antes** de cada repetição. Se ela já começar falsa, o bloco nunca executa.

\`\`\`
contador = 1
enquanto (contador <= 5) {
    escreva(contador)
    contador = contador + 1
}
\`\`\`

## Para (for)

Ideal quando sabemos quantas vezes repetir. Reúne inicialização, condição e incremento em uma linha:

\`\`\`
para (i = 0; i < 10; i++) {
    soma = soma + i
}
\`\`\`

## Faça-enquanto (do-while)

Executa o bloco **pelo menos uma vez** e só depois testa a condição. Útil em menus: mostra as opções e repete enquanto o usuário não escolher "sair".

## Cuidado com o laço infinito

Se nada dentro do laço altera a condição, ele nunca termina. No exemplo do "enquanto", esquecer \`contador = contador + 1\` trava o programa.`,
        questoes: [
          {
            enunciado: "Quantas vezes o bloco de um laço para (i = 0; i < 10; i++) é executado?",
            alternativas: ["9", "10", "11", "Infinitas"],
            correta: 1,
            explicacao: "i assume os valores 0 a 9, ou seja, 10 execuções. Quando i chega a 10, a condição i < 10 é falsa.",
          },
          {
            enunciado: "Qual laço garante que o bloco execute pelo menos uma vez?",
            alternativas: ["enquanto (while)", "para (for)", "faça-enquanto (do-while)", "Nenhum deles"],
            correta: 2,
            explicacao: "O faça-enquanto executa o bloco e só depois testa a condição.",
          },
          {
            enunciado: "O que provoca um laço infinito?",
            alternativas: [
              "Usar o laço para em vez do enquanto",
              "Declarar variáveis dentro do laço",
              "A condição de parada nunca se tornar falsa",
              "Usar mais de uma condição no laço",
            ],
            correta: 2,
            explicacao: "Se nada altera a condição, ela continua verdadeira para sempre e o laço não termina.",
          },
        ],
      },
    ],
  },
  {
    titulo: "SQL Essencial",
    area: "Banco de Dados",
    nivel: "INICIANTE",
    descricao: "Modelo relacional e as consultas que você mais vai usar: SELECT, filtros, JOINs e agregações.",
    modulos: [
      {
        titulo: "O modelo relacional",
        xp: 20,
        conteudo: `Em um banco de dados relacional, os dados ficam organizados em **tabelas**. Cada tabela tem **colunas** (atributos) e **linhas** (registros).

## Chave primária

A **chave primária** (PK) identifica cada linha de forma única. Ela não pode repetir nem ser nula. Exemplo: o \`id\` de um aluno, ou o RA.

## Chave estrangeira

A **chave estrangeira** (FK) é uma coluna que referencia a chave primária de outra tabela. É ela que cria o **relacionamento** entre tabelas.

\`\`\`
aluno (id PK, nome, email)
matricula (id PK, aluno_id FK -> aluno.id, disciplina_id FK -> disciplina.id)
\`\`\`

## Cardinalidade

- **1:1**: um aluno tem um único cadastro de acesso
- **1:N**: um curso tem muitos alunos
- **N:N**: alunos cursam muitas disciplinas e disciplinas têm muitos alunos. Na prática, o N:N vira uma **tabela associativa** (como \`matricula\` acima)`,
        questoes: [
          {
            enunciado: "Qual característica é obrigatória em uma chave primária?",
            alternativas: [
              "Ser sempre do tipo texto",
              "Ser única e não nula",
              "Referenciar outra tabela",
              "Ser a primeira coluna da tabela",
            ],
            correta: 1,
            explicacao: "A chave primária identifica a linha, então não pode se repetir nem ficar vazia.",
          },
          {
            enunciado: "Para que serve uma chave estrangeira?",
            alternativas: [
              "Criptografar os dados da tabela",
              "Acelerar todas as consultas",
              "Relacionar uma tabela à chave primária de outra",
              "Impedir que a tabela tenha linhas",
            ],
            correta: 2,
            explicacao: "A FK guarda o valor da PK de outra tabela, criando o relacionamento entre elas.",
          },
          {
            enunciado: "Como um relacionamento N:N costuma ser implementado no banco?",
            alternativas: [
              "Com uma tabela associativa contendo as duas chaves estrangeiras",
              "Com uma única coluna de texto separada por vírgulas",
              "Duplicando as duas tabelas",
              "Não é possível representar N:N",
            ],
            correta: 0,
            explicacao: "A tabela associativa (ex.: matricula) liga as duas tabelas, cada linha com uma FK para cada lado.",
          },
        ],
      },
      {
        titulo: "SELECT e WHERE",
        xp: 20,
        conteudo: `O comando \`SELECT\` consulta dados. A estrutura básica é:

\`\`\`
SELECT nome, email
FROM aluno
WHERE semestre = 3
ORDER BY nome;
\`\`\`

- **SELECT**: quais colunas (\`*\` traz todas)
- **FROM**: de qual tabela
- **WHERE**: filtra as linhas
- **ORDER BY**: ordena o resultado (\`ASC\` crescente, padrão; \`DESC\` decrescente)

## Filtros úteis

- \`AND\`, \`OR\`, \`NOT\` combinam condições
- \`BETWEEN 5 AND 8\`: intervalo inclusivo
- \`IN ('ADS', 'GTI')\`: um valor dentro de uma lista
- \`LIKE 'Ana%'\`: texto que começa com "Ana" (\`%\` é qualquer sequência de caracteres)
- \`IS NULL\`: valores ausentes. **Nunca** use \`= NULL\`, que não funciona

\`\`\`
SELECT * FROM aluno
WHERE curso IN ('ADS', 'GTI') AND email IS NOT NULL
ORDER BY semestre DESC;
\`\`\``,
        questoes: [
          {
            enunciado: "Qual cláusula filtra as linhas retornadas por uma consulta?",
            alternativas: ["ORDER BY", "WHERE", "FROM", "SELECT"],
            correta: 1,
            explicacao: "WHERE define as condições que cada linha precisa atender para entrar no resultado.",
          },
          {
            enunciado: "Qual filtro encontra os alunos cujo nome começa com \"Mar\"?",
            alternativas: ["nome = 'Mar%'", "nome LIKE '%Mar'", "nome LIKE 'Mar%'", "nome IN ('Mar')"],
            correta: 2,
            explicacao: "Com LIKE, 'Mar%' significa \"Mar\" seguido de qualquer coisa. '%Mar' seria terminar com Mar.",
          },
          {
            enunciado: "Como selecionar os registros em que a coluna telefone não foi preenchida?",
            alternativas: ["telefone = NULL", "telefone IS NULL", "telefone = ''", "telefone == NULL"],
            correta: 1,
            explicacao: "NULL representa ausência de valor e não pode ser comparado com =. Use IS NULL / IS NOT NULL.",
          },
        ],
      },
      {
        titulo: "Juntando tabelas com JOIN",
        xp: 25,
        conteudo: `Como os dados ficam em tabelas separadas, o **JOIN** junta linhas relacionadas em uma única consulta.

## INNER JOIN

Retorna só as linhas que têm correspondência **nas duas** tabelas:

\`\`\`
SELECT a.nome, c.nome AS curso
FROM aluno a
INNER JOIN curso c ON c.id = a.curso_id;
\`\`\`

Alunos sem curso (\`curso_id\` nulo) não aparecem no resultado.

## LEFT JOIN

Retorna **todas** as linhas da tabela da esquerda e, quando não há correspondência, preenche as colunas da direita com NULL:

\`\`\`
SELECT c.nome, a.nome
FROM curso c
LEFT JOIN aluno a ON a.curso_id = c.id;
\`\`\`

Aqui aparecem inclusive os cursos sem nenhum aluno.

## Dicas

- A condição do \`ON\` normalmente liga a FK de uma tabela à PK da outra
- Use **apelidos** (\`aluno a\`) para deixar a consulta curta e legível
- Esquecer o \`ON\` gera um **produto cartesiano**: cada linha combinada com todas as outras`,
        questoes: [
          {
            enunciado: "O que o INNER JOIN retorna?",
            alternativas: [
              "Todas as linhas das duas tabelas",
              "Somente as linhas com correspondência nas duas tabelas",
              "Todas as linhas da tabela da esquerda",
              "Somente as linhas sem correspondência",
            ],
            correta: 1,
            explicacao: "O INNER JOIN mantém apenas os pares de linhas que satisfazem a condição do ON.",
          },
          {
            enunciado: "Você quer listar todos os cursos, inclusive os que não têm alunos. Qual JOIN usar (curso à esquerda)?",
            alternativas: ["INNER JOIN", "LEFT JOIN", "Nenhum, basta um WHERE", "CROSS JOIN"],
            correta: 1,
            explicacao: "O LEFT JOIN preserva todas as linhas da tabela da esquerda, mesmo sem correspondência.",
          },
          {
            enunciado: "O que acontece ao juntar duas tabelas sem condição de junção?",
            alternativas: [
              "O banco escolhe a chave automaticamente",
              "A consulta retorna vazio",
              "É gerado um produto cartesiano",
              "Só a primeira linha é retornada",
            ],
            correta: 2,
            explicacao: "Sem condição, cada linha de uma tabela é combinada com todas as linhas da outra.",
          },
        ],
      },
      {
        titulo: "Agregações e GROUP BY",
        xp: 25,
        conteudo: `Funções de agregação resumem várias linhas em um valor:

- \`COUNT(*)\`: quantidade de linhas
- \`SUM(coluna)\`, \`AVG(coluna)\`: soma e média
- \`MIN(coluna)\`, \`MAX(coluna)\`: menor e maior valor

## GROUP BY

Agrupa as linhas por uma ou mais colunas e aplica a agregação a **cada grupo**:

\`\`\`
SELECT curso_id, COUNT(*) AS total, AVG(media) AS media_geral
FROM aluno
GROUP BY curso_id;
\`\`\`

Regra importante: toda coluna no SELECT que não está dentro de uma função de agregação precisa estar no GROUP BY.

## HAVING

O \`WHERE\` filtra linhas **antes** do agrupamento. O \`HAVING\` filtra **grupos depois** da agregação:

\`\`\`
SELECT curso_id, COUNT(*) AS total
FROM aluno
WHERE ativo = TRUE
GROUP BY curso_id
HAVING COUNT(*) > 30;
\`\`\`

Ordem de execução lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.`,
        questoes: [
          {
            enunciado: "Qual função conta quantas linhas existem em cada grupo?",
            alternativas: ["SUM(*)", "COUNT(*)", "TOTAL(*)", "MAX(*)"],
            correta: 1,
            explicacao: "COUNT(*) conta as linhas. SUM soma os valores de uma coluna numérica.",
          },
          {
            enunciado: "Qual a diferença entre WHERE e HAVING?",
            alternativas: [
              "Não há diferença",
              "WHERE filtra grupos e HAVING filtra linhas",
              "WHERE filtra linhas antes do agrupamento e HAVING filtra grupos depois",
              "HAVING só funciona com ORDER BY",
            ],
            correta: 2,
            explicacao: "WHERE age sobre as linhas originais; HAVING age sobre o resultado das agregações.",
          },
          {
            enunciado: "Para mostrar apenas os cursos com média geral acima de 7, qual cláusula usar?",
            alternativas: ["WHERE AVG(media) > 7", "HAVING AVG(media) > 7", "ORDER BY AVG(media) > 7", "GROUP BY media > 7"],
            correta: 1,
            explicacao: "A condição usa uma agregação (AVG), por isso precisa ficar no HAVING.",
          },
        ],
      },
    ],
  },
  {
    titulo: "Java Orientado a Objetos",
    area: "Programação",
    nivel: "INTERMEDIARIO",
    descricao: "Classes, encapsulamento, herança, polimorfismo e interfaces na prática com Java.",
    modulos: [
      {
        titulo: "Classes e objetos",
        xp: 30,
        conteudo: `Na orientação a objetos, o programa é organizado em torno de **objetos** que reúnem dados e comportamento.

## Classe x objeto

A **classe** é o molde; o **objeto** é uma instância criada a partir dela.

\`\`\`
public class Aluno {
    String nome;
    int xp;

    void ganharXp(int pontos) {
        xp += pontos;
    }
}

Aluno luan = new Aluno();
luan.nome = "Luan";
luan.ganharXp(20);
\`\`\`

- **Atributos** guardam o estado (nome, xp)
- **Métodos** definem o comportamento (ganharXp)
- \`new\` cria o objeto na memória

## Construtores

O **construtor** tem o mesmo nome da classe, não tem tipo de retorno e é chamado no \`new\`. Ele garante que o objeto já nasça em um estado válido:

\`\`\`
public Aluno(String nome) {
    this.nome = nome;
    this.xp = 0;
}
\`\`\`

O \`this\` se refere ao próprio objeto e desfaz a ambiguidade entre o atributo e o parâmetro de mesmo nome.`,
        questoes: [
          {
            enunciado: "Qual frase descreve corretamente a relação entre classe e objeto?",
            alternativas: [
              "O objeto é o molde e a classe é a instância",
              "A classe é o molde e o objeto é uma instância dela",
              "Classe e objeto são sinônimos",
              "Uma classe só pode gerar um objeto",
            ],
            correta: 1,
            explicacao: "A classe define atributos e métodos; cada new cria um objeto (instância) a partir dela.",
          },
          {
            enunciado: "Qual característica pertence a um construtor em Java?",
            alternativas: [
              "Tem o mesmo nome da classe e não declara tipo de retorno",
              "Sempre retorna void",
              "Precisa ser chamado manualmente depois do new",
              "Só pode existir um por projeto",
            ],
            correta: 0,
            explicacao: "O construtor tem o nome da classe, não declara retorno e é executado automaticamente no new.",
          },
          {
            enunciado: "No construtor, para que serve this.nome = nome?",
            alternativas: [
              "Cria uma nova classe chamada nome",
              "Atribui o parâmetro nome ao atributo nome do objeto",
              "Compara o atributo com o parâmetro",
              "Apaga o valor do atributo",
            ],
            correta: 1,
            explicacao: "this.nome é o atributo do objeto; nome sozinho é o parâmetro recebido.",
          },
        ],
      },
      {
        titulo: "Encapsulamento",
        xp: 30,
        conteudo: `**Encapsular** é esconder os detalhes internos de um objeto e expor só o necessário. Isso protege o estado contra alterações inválidas.

## Modificadores de acesso

- \`private\`: visível só dentro da própria classe
- (padrão, sem modificador): visível no mesmo pacote
- \`protected\`: pacote e subclasses
- \`public\`: visível em qualquer lugar

## Getters e setters com regra

\`\`\`
public class Aluno {
    private int xp;

    public int getXp() {
        return xp;
    }

    public void ganharXp(int pontos) {
        if (pontos <= 0) {
            throw new IllegalArgumentException("Pontos devem ser positivos");
        }
        xp += pontos;
    }
}
\`\`\`

Com \`xp\` privado, ninguém consegue fazer \`aluno.xp = -500\`. A única forma de mudar o XP é pelo método, que aplica a regra de negócio.

Encapsular não é criar getter e setter para tudo: exponha **operações com significado** (\`ganharXp\`), não apenas acesso direto aos campos.`,
        questoes: [
          {
            enunciado: "Qual modificador restringe o acesso a um atributo apenas à própria classe?",
            alternativas: ["public", "protected", "private", "static"],
            correta: 2,
            explicacao: "private limita o acesso ao código da própria classe.",
          },
          {
            enunciado: "Qual é o principal benefício do encapsulamento?",
            alternativas: [
              "Deixar o programa mais rápido",
              "Proteger o estado do objeto e centralizar as regras de alteração",
              "Permitir herança múltipla",
              "Eliminar a necessidade de construtores",
            ],
            correta: 1,
            explicacao: "Com o estado privado, toda alteração passa por métodos que validam as regras.",
          },
          {
            enunciado: "No exemplo, o que acontece ao chamar aluno.ganharXp(-10)?",
            alternativas: [
              "O XP diminui 10 pontos",
              "Nada acontece",
              "Uma IllegalArgumentException é lançada",
              "O XP vira zero",
            ],
            correta: 2,
            explicacao: "O método valida a entrada e lança a exceção para pontos menores ou iguais a zero.",
          },
        ],
      },
      {
        titulo: "Herança e polimorfismo",
        xp: 30,
        conteudo: `## Herança

Uma classe pode **estender** outra e reaproveitar seus atributos e métodos. Em Java, cada classe estende **uma única** classe (\`extends\`).

\`\`\`
public class Usuario {
    protected String nome;
    public String saudacao() { return "Olá, " + nome; }
}

public class Professor extends Usuario {
    @Override
    public String saudacao() { return "Olá, prof. " + nome; }
}
\`\`\`

Herança representa uma relação **"é um"**: um Professor **é um** Usuario.

## Sobrescrita (override)

A subclasse pode redefinir um método herdado. A anotação \`@Override\` pede ao compilador que confira se o método realmente existe na superclasse.

## Polimorfismo

Uma variável do tipo da superclasse pode guardar qualquer subclasse, e o método executado é o **do objeto real**:

\`\`\`
Usuario u = new Professor();
u.saudacao(); // "Olá, prof. ..."
\`\`\`

Isso permite escrever código genérico (uma lista de \`Usuario\`) que se comporta corretamente para cada tipo concreto.`,
        questoes: [
          {
            enunciado: "Quantas classes uma classe Java pode estender diretamente?",
            alternativas: ["Nenhuma", "Uma", "Duas", "Quantas quiser"],
            correta: 1,
            explicacao: "Java tem herança simples de classes. Para combinar contratos, usam-se interfaces.",
          },
          {
            enunciado: "Para que serve a anotação @Override?",
            alternativas: [
              "Tornar o método privado",
              "Fazer o compilador verificar que o método sobrescreve um da superclasse",
              "Executar o método duas vezes",
              "Impedir que o método seja herdado",
            ],
            correta: 1,
            explicacao: "Se a assinatura não corresponder a um método herdado, o compilador acusa erro.",
          },
          {
            enunciado: "Com Usuario u = new Professor(); qual saudacao() é executada?",
            alternativas: [
              "A de Usuario, porque é o tipo da variável",
              "A de Professor, porque é o tipo do objeto",
              "As duas, em sequência",
              "Nenhuma, gera erro de compilação",
            ],
            correta: 1,
            explicacao: "No polimorfismo, o método chamado é decidido pelo objeto real em tempo de execução.",
          },
        ],
      },
      {
        titulo: "Interfaces e coleções",
        xp: 35,
        conteudo: `## Interfaces

Uma **interface** define um contrato: o que uma classe deve saber fazer, sem dizer como. Uma classe pode implementar **várias** interfaces.

\`\`\`
public interface Pontuavel {
    int calcularPontos();
}

public class Quiz implements Pontuavel {
    public int calcularPontos() { return acertos * 10; }
}
\`\`\`

## Coleções

O pacote \`java.util\` oferece estruturas prontas, todas baseadas em interfaces:

- \`List\` (ex.: \`ArrayList\`): ordenada, aceita repetidos, acesso por índice
- \`Set\` (ex.: \`HashSet\`): **não aceita elementos repetidos**
- \`Map\` (ex.: \`HashMap\`): pares chave → valor

\`\`\`
List<String> trilhas = new ArrayList<>();
trilhas.add("SQL");
Map<String, Integer> xpPorAluno = new HashMap<>();
xpPorAluno.put("luan", 120);
\`\`\`

Declarar a variável pelo tipo da interface (\`List\`) e não pela implementação (\`ArrayList\`) deixa o código flexível para trocar a implementação depois.`,
        questoes: [
          {
            enunciado: "Qual afirmação sobre interfaces em Java está correta?",
            alternativas: [
              "Uma classe pode implementar várias interfaces",
              "Uma interface pode ser instanciada com new",
              "Uma classe só pode implementar uma interface",
              "Interfaces guardam o estado dos objetos",
            ],
            correta: 0,
            explicacao: "A herança de classe é simples, mas uma classe pode implementar quantas interfaces precisar.",
          },
          {
            enunciado: "Qual coleção é a mais adequada para guardar e-mails sem permitir repetidos?",
            alternativas: ["ArrayList", "HashSet", "LinkedList", "Array de String"],
            correta: 1,
            explicacao: "Set não aceita elementos duplicados; HashSet é a implementação mais comum.",
          },
          {
            enunciado: "Qual estrutura associa uma chave (como o apelido) a um valor (como o XP)?",
            alternativas: ["List", "Set", "Map", "Queue"],
            correta: 2,
            explicacao: "Map guarda pares chave → valor, com busca rápida pela chave.",
          },
        ],
      },
    ],
  },
  {
    titulo: "Requisitos e UML",
    area: "Engenharia de Software",
    nivel: "INICIANTE",
    descricao: "Como levantar, escrever e modelar requisitos: casos de uso e diagrama de classes.",
    modulos: [
      {
        titulo: "Requisitos funcionais e não funcionais",
        xp: 20,
        conteudo: `**Requisitos** descrevem o que um sistema deve fazer e sob quais condições. São o ponto de partida de qualquer projeto, inclusive do seu TCC.

## Requisito funcional (RF)

Descreve uma **função** ou serviço do sistema, algo que o usuário consegue fazer:

- RF01: o sistema deve permitir o cadastro de alunos com e-mail institucional
- RF02: o sistema deve exibir o ranking de alunos por XP

## Requisito não funcional (RNF)

Descreve uma **qualidade** ou restrição: desempenho, segurança, usabilidade, compatibilidade.

- RNF01: as senhas devem ser armazenadas com hash (BCrypt)
- RNF02: a interface deve funcionar em telas a partir de 360 px

## Como escrever bem

- Um requisito por frase, com verbo claro ("o sistema deve...")
- Verificável: dá para testar se foi cumprido? "Rápido" não é verificável; "responder em até 2 segundos" é
- Sem ambiguidade: evite "fácil", "amigável", "etc."`,
        questoes: [
          {
            enunciado: "\"O sistema deve permitir que o aluno altere seu apelido\" é um requisito:",
            alternativas: ["Não funcional", "Funcional", "De hardware", "Regra de negócio de banco"],
            correta: 1,
            explicacao: "Descreve uma função que o usuário realiza no sistema, então é funcional.",
          },
          {
            enunciado: "Qual destes é um requisito não funcional?",
            alternativas: [
              "O administrador deve cadastrar trilhas",
              "O aluno deve responder quizzes",
              "As páginas devem carregar em até 2 segundos em conexão 4G",
              "O sistema deve exibir o ranking",
            ],
            correta: 2,
            explicacao: "Tempo de resposta é uma qualidade (desempenho), não uma função do sistema.",
          },
          {
            enunciado: "Qual requisito está mais bem escrito?",
            alternativas: [
              "O sistema deve ser rápido",
              "O sistema deve ser fácil de usar etc.",
              "O sistema deve bloquear o login após 5 tentativas incorretas seguidas",
              "O sistema deve ser bom",
            ],
            correta: 2,
            explicacao: "É específico e verificável: dá para testar exatamente se o comportamento acontece.",
          },
        ],
      },
      {
        titulo: "Casos de uso",
        xp: 20,
        conteudo: `O **diagrama de casos de uso** mostra, em alto nível, quem usa o sistema e para quê.

## Elementos

- **Ator**: quem interage com o sistema (pessoa ou outro sistema). Ex.: Aluno, Administrador
- **Caso de uso**: um objetivo do ator, escrito com verbo no infinitivo. Ex.: "Responder quiz"
- **Fronteira do sistema**: o retângulo que separa o que está dentro do sistema

## Relacionamentos

- **Associação**: liga o ator ao caso de uso que ele executa
- **<<include>>**: o caso base **sempre** executa o incluído. Ex.: "Concluir módulo" inclui "Calcular XP"
- **<<extend>>**: comportamento **opcional**, sob condição. Ex.: "Ganhar bônus de gabarito" estende "Responder quiz"
- **Generalização**: um ator herda os casos de outro

## Especificação

Cada caso de uso importante ganha uma descrição textual: atores, pré-condições, **fluxo principal** (passo a passo), **fluxos alternativos** (erros e exceções) e pós-condições.`,
        questoes: [
          {
            enunciado: "No diagrama de casos de uso, o que é um ator?",
            alternativas: [
              "Uma classe do banco de dados",
              "Quem interage com o sistema, seja pessoa ou outro sistema",
              "Uma tela do sistema",
              "Um método Java",
            ],
            correta: 1,
            explicacao: "Ator é um papel externo ao sistema que interage com ele.",
          },
          {
            enunciado: "Qual relacionamento indica um comportamento opcional, que só ocorre sob uma condição?",
            alternativas: ["<<include>>", "<<extend>>", "Associação", "Composição"],
            correta: 1,
            explicacao: "O extend acrescenta comportamento opcional; o include é sempre executado.",
          },
          {
            enunciado: "Onde ficam descritos os erros e exceções de um caso de uso?",
            alternativas: [
              "No nome do caso de uso",
              "Nos fluxos alternativos da especificação",
              "Na fronteira do sistema",
              "No ator",
            ],
            correta: 1,
            explicacao: "O fluxo principal descreve o caminho de sucesso; os alternativos cobrem desvios e erros.",
          },
        ],
      },
      {
        titulo: "Diagrama de classes",
        xp: 25,
        conteudo: `O **diagrama de classes** mostra a estrutura estática do sistema: classes, seus atributos, métodos e relacionamentos.

## Notação da classe

Um retângulo em três partes: nome, atributos e métodos. A visibilidade vem antes de cada item:

- \`+\` público, \`-\` privado, \`#\` protegido

\`\`\`
Aluno
- nome: String
- xpTotal: int
+ ganharXp(pontos: int): void
\`\`\`

## Relacionamentos

- **Associação**: uma classe conhece a outra (linha simples, com multiplicidade como 1 e 0..*)
- **Agregação** (losango vazio): "tem um", mas a parte existe sozinha. Ex.: Turma e Aluno
- **Composição** (losango cheio): a parte não existe sem o todo. Ex.: Trilha e Módulo: excluída a trilha, os módulos deixam de existir
- **Herança** (seta com triângulo vazio): "é um"

## Multiplicidade

\`1\` exatamente um, \`0..1\` zero ou um, \`*\` ou \`0..*\` muitos, \`1..*\` pelo menos um.`,
        questoes: [
          {
            enunciado: "No diagrama de classes, o que o símbolo \"-\" antes de um atributo indica?",
            alternativas: ["Público", "Privado", "Protegido", "Estático"],
            correta: 1,
            explicacao: "+ é público, - é privado e # é protegido.",
          },
          {
            enunciado: "Uma Trilha tem Módulos que não existem sem ela. Qual relacionamento representa isso?",
            alternativas: ["Herança", "Agregação", "Composição", "Dependência"],
            correta: 2,
            explicacao: "Na composição, o ciclo de vida da parte depende do todo.",
          },
          {
            enunciado: "Qual multiplicidade significa \"pelo menos um\"?",
            alternativas: ["0..1", "1", "0..*", "1..*"],
            correta: 3,
            explicacao: "1..* indica um ou mais elementos.",
          },
        ],
      },
    ],
  },
  {
    titulo: "Estruturas de Dados",
    area: "Programação",
    nivel: "AVANCADO",
    descricao: "Análise de complexidade, pilhas, filas e árvores binárias de busca.",
    modulos: [
      {
        titulo: "Complexidade de algoritmos (Big O)",
        xp: 40,
        conteudo: `A notação **Big O** descreve como o tempo (ou a memória) de um algoritmo cresce conforme o tamanho da entrada **n** aumenta. Ela considera o pior caso e ignora constantes.

## Classes mais comuns

- **O(1)** constante: acessar \`vetor[i]\`
- **O(log n)** logarítmica: busca binária, que descarta metade dos dados a cada passo
- **O(n)** linear: percorrer uma lista uma vez
- **O(n log n)**: bons algoritmos de ordenação (merge sort)
- **O(n²)** quadrática: dois laços aninhados sobre os mesmos dados (bubble sort)

\`\`\`
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        soma += m[i][j];   // O(n²)
\`\`\`

## Por que importa

Com n = 1.000.000, um algoritmo O(n²) faz cerca de 10¹² operações, enquanto um O(n log n) faz cerca de 2 × 10⁷. A escolha do algoritmo pesa mais que a velocidade da máquina.

Regras práticas: passos em sequência somam (fica o maior termo); laços aninhados multiplicam.`,
        questoes: [
          {
            enunciado: "Qual é a complexidade da busca binária em um vetor ordenado?",
            alternativas: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correta: 1,
            explicacao: "A cada comparação metade dos elementos é descartada, então são cerca de log₂ n passos.",
          },
          {
            enunciado: "Dois laços aninhados, cada um percorrendo os n elementos, resultam em:",
            alternativas: ["O(n)", "O(2n)", "O(n²)", "O(log n)"],
            correta: 2,
            explicacao: "Laços aninhados multiplicam: n × n = n².",
          },
          {
            enunciado: "Um algoritmo faz um laço O(n) e, depois, outro laço O(n²) em sequência. Qual sua complexidade?",
            alternativas: ["O(n³)", "O(n²)", "O(n)", "O(n + 1)"],
            correta: 1,
            explicacao: "Passos em sequência somam (n + n²) e, no Big O, fica só o termo dominante: n².",
          },
        ],
      },
      {
        titulo: "Pilhas e filas",
        xp: 40,
        conteudo: `## Pilha (stack): LIFO

O **último a entrar é o primeiro a sair** (Last In, First Out), como uma pilha de pratos.

- \`push\`: empilha no topo
- \`pop\`: remove do topo
- \`peek\`: consulta o topo sem remover

Usos: desfazer (Ctrl+Z), histórico do navegador, pilha de chamadas de funções, conferir parênteses balanceados.

## Fila (queue): FIFO

O **primeiro a entrar é o primeiro a sair** (First In, First Out), como a fila do bandejão.

- \`enqueue\` (ou \`offer\`): insere no fim
- \`dequeue\` (ou \`poll\`): remove do início

Usos: fila de impressão, processamento de pedidos, busca em largura em grafos.

\`\`\`
Deque<Integer> pilha = new ArrayDeque<>();
pilha.push(1); pilha.push(2);
pilha.pop();          // 2

Queue<Integer> fila = new ArrayDeque<>();
fila.offer(1); fila.offer(2);
fila.poll();          // 1
\`\`\`

Bem implementadas, as operações de inserir e remover de pilhas e filas são **O(1)**.`,
        questoes: [
          {
            enunciado: "Em uma pilha, foram empilhados A, B e C, nessa ordem. Qual elemento sai no primeiro pop?",
            alternativas: ["A", "B", "C", "Depende da implementação"],
            correta: 2,
            explicacao: "Pilha é LIFO: o último a entrar (C) é o primeiro a sair.",
          },
          {
            enunciado: "Qual estrutura modela melhor uma fila de impressão?",
            alternativas: ["Pilha", "Fila", "Árvore", "Tabela hash"],
            correta: 1,
            explicacao: "Documentos são impressos na ordem de chegada: FIFO.",
          },
          {
            enunciado: "O recurso \"desfazer\" de um editor de texto costuma usar qual estrutura?",
            alternativas: ["Fila", "Pilha", "Lista ordenada", "Grafo"],
            correta: 1,
            explicacao: "Desfazer reverte a ação mais recente primeiro, comportamento LIFO.",
          },
        ],
      },
      {
        titulo: "Árvores binárias de busca",
        xp: 45,
        conteudo: `Uma **árvore binária** é formada por nós, e cada nó tem no máximo dois filhos (esquerdo e direito). O nó do topo é a **raiz**; nós sem filhos são **folhas**.

## Árvore binária de busca (BST)

Para todo nó:

- tudo na subárvore **esquerda** é **menor** que ele
- tudo na subárvore **direita** é **maior** que ele

Assim, para buscar um valor, compara-se com a raiz e desce-se para um único lado, descartando o outro.

\`\`\`
        50
       /  \\
     30    70
    /  \\     \\
  20   40     80
\`\`\`

## Custos

- Árvore **balanceada**: busca, inserção e remoção em **O(log n)**
- Árvore **degenerada** (inserir dados já ordenados vira uma "lista"): **O(n)**

Árvores autobalanceadas (AVL, rubro-negra) fazem rotações para manter a altura em O(log n). O \`TreeMap\` do Java usa uma rubro-negra.

## Percurso em ordem

Visitar esquerda → nó → direita retorna os valores **em ordem crescente**: 20, 30, 40, 50, 70, 80.`,
        questoes: [
          {
            enunciado: "Em uma BST, onde ficam os valores menores que um nó?",
            alternativas: ["Na subárvore direita", "Na subárvore esquerda", "Sempre na raiz", "Em qualquer lado"],
            correta: 1,
            explicacao: "Pela definição, menores à esquerda e maiores à direita.",
          },
          {
            enunciado: "Inserindo 10, 20, 30, 40, 50 nessa ordem em uma BST sem balanceamento, a busca fica:",
            alternativas: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correta: 2,
            explicacao: "Dados ordenados geram uma árvore degenerada, que se comporta como uma lista ligada.",
          },
          {
            enunciado: "Qual percurso de uma BST lista os valores em ordem crescente?",
            alternativas: ["Pré-ordem", "Pós-ordem", "Em ordem (esquerda, nó, direita)", "Por níveis"],
            correta: 2,
            explicacao: "O percurso em ordem visita primeiro os menores (esquerda), depois o nó e então os maiores.",
          },
        ],
      },
    ],
  },
  {
    titulo: "Redes de Computadores",
    area: "Infraestrutura",
    nivel: "INTERMEDIARIO",
    descricao: "Camadas TCP/IP, endereçamento IPv4 e os protocolos por trás da web.",
    modulos: [
      {
        titulo: "Modelo TCP/IP",
        xp: 30,
        conteudo: `Para organizar a comunicação em rede, os protocolos são divididos em **camadas**. Cada camada usa os serviços da camada de baixo e oferece serviços à de cima.

## As camadas do TCP/IP

- **Aplicação**: protocolos usados pelos programas: HTTP, DNS, SMTP, FTP
- **Transporte**: comunicação entre processos, identificados por **portas**. TCP e UDP
- **Internet (rede)**: endereçamento e roteamento entre redes: **IP**
- **Acesso à rede (enlace/física)**: transmissão no meio físico: Ethernet, Wi-Fi

## TCP x UDP

- **TCP**: orientado à conexão (handshake de 3 vias), garante entrega e ordem, retransmite pacotes perdidos. Usado em páginas web, e-mail, transferência de arquivos
- **UDP**: sem conexão, sem garantia de entrega, com baixa latência. Usado em streaming de vídeo, jogos online, chamadas de voz e DNS

O modelo **OSI** tem 7 camadas e é usado como referência teórica; o TCP/IP é o que roda na internet.`,
        questoes: [
          {
            enunciado: "Em qual camada do modelo TCP/IP fica o protocolo HTTP?",
            alternativas: ["Transporte", "Internet", "Aplicação", "Acesso à rede"],
            correta: 2,
            explicacao: "HTTP é usado diretamente pelos programas (navegador e servidor): camada de aplicação.",
          },
          {
            enunciado: "Qual protocolo é mais adequado para um jogo online em tempo real?",
            alternativas: ["TCP, pela garantia de entrega", "UDP, pela baixa latência", "FTP", "SMTP"],
            correta: 1,
            explicacao: "Em tempo real, um pacote atrasado já não serve; a baixa latência do UDP vale mais que a retransmissão.",
          },
          {
            enunciado: "O que o TCP faz e o UDP não faz?",
            alternativas: [
              "Usa portas",
              "Estabelece conexão e garante a entrega ordenada",
              "Funciona sobre IP",
              "Transporta dados de aplicações",
            ],
            correta: 1,
            explicacao: "Ambos usam portas e IP, mas só o TCP tem conexão, confirmação e retransmissão.",
          },
        ],
      },
      {
        titulo: "Endereçamento IPv4",
        xp: 30,
        conteudo: `Um endereço **IPv4** tem 32 bits, escritos em quatro octetos decimais: \`192.168.0.10\`.

## Rede e host

A **máscara de sub-rede** indica quantos bits identificam a **rede**; o restante identifica o **host**. Na notação CIDR:

- \`192.168.0.0/24\`: 24 bits de rede, 8 de host (máscara 255.255.255.0)
- 2⁸ = 256 endereços, mas **254 utilizáveis**: o primeiro é o endereço de rede e o último é o broadcast

## Endereços privados

Reservados para redes internas e não roteados na internet:

- \`10.0.0.0/8\`
- \`172.16.0.0/12\`
- \`192.168.0.0/16\`

O roteador usa **NAT** para que vários dispositivos da rede interna saiam para a internet com um único IP público.

## Endereços especiais

- \`127.0.0.1\`: **localhost**, a própria máquina (o seu back-end roda em localhost:8080)
- **Gateway padrão**: o roteador por onde o tráfego sai da rede local`,
        questoes: [
          {
            enunciado: "Quantos hosts utilizáveis existem em uma rede /24?",
            alternativas: ["256", "255", "254", "24"],
            correta: 2,
            explicacao: "São 256 endereços, menos o de rede e o de broadcast: 254 hosts.",
          },
          {
            enunciado: "Qual destes é um endereço IP privado?",
            alternativas: ["8.8.8.8", "192.168.1.15", "200.150.10.1", "1.1.1.1"],
            correta: 1,
            explicacao: "192.168.0.0/16 é uma das faixas privadas; os demais são públicos.",
          },
          {
            enunciado: "O que o endereço 127.0.0.1 representa?",
            alternativas: ["O roteador da rede", "O servidor DNS", "A própria máquina (localhost)", "O broadcast da rede"],
            correta: 2,
            explicacao: "127.0.0.1 é o loopback: a máquina falando com ela mesma.",
          },
        ],
      },
      {
        titulo: "HTTP e DNS",
        xp: 35,
        conteudo: `## DNS

Pessoas lembram nomes; computadores usam IPs. O **DNS** traduz nomes de domínio (\`fatecampinas.edu.br\`) em endereços IP. A consulta é feita antes de qualquer acesso a um site.

## HTTP

O **HTTP** funciona em **requisição e resposta**: o cliente (navegador ou app) pede, o servidor responde. Ele é **sem estado** (stateless): cada requisição é independente. Por isso, APIs como a do FatecLab enviam um **token JWT** em toda requisição para identificar o usuário.

## Métodos

- \`GET\`: buscar dados
- \`POST\`: criar
- \`PUT\` / \`PATCH\`: atualizar (inteiro / em parte)
- \`DELETE\`: remover

## Códigos de status

- **2xx** sucesso: 200 OK, 201 Created, 204 No Content
- **3xx** redirecionamento
- **4xx** erro do cliente: 400 Bad Request, 401 Unauthorized (sem login), 403 Forbidden (sem permissão), 404 Not Found
- **5xx** erro do servidor: 500 Internal Server Error

O **HTTPS** é o HTTP sobre TLS: os dados trafegam criptografados.`,
        questoes: [
          {
            enunciado: "Qual a função do DNS?",
            alternativas: [
              "Criptografar as páginas",
              "Traduzir nomes de domínio em endereços IP",
              "Atribuir IPs aos computadores da rede",
              "Armazenar as páginas em cache",
            ],
            correta: 1,
            explicacao: "O DNS resolve nomes em IPs. Atribuir IPs automaticamente é papel do DHCP.",
          },
          {
            enunciado: "Um aluno logado tenta acessar o painel de administrador e é barrado. Qual status a API deve retornar?",
            alternativas: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500 Internal Server Error"],
            correta: 1,
            explicacao: "Ele está autenticado (não é 401), mas não tem permissão para o recurso: 403.",
          },
          {
            enunciado: "Por que uma API REST envia o token de autenticação em toda requisição?",
            alternativas: [
              "Porque o HTTP é sem estado e não lembra requisições anteriores",
              "Para deixar a resposta mais rápida",
              "Porque o DNS exige",
              "Para criptografar o corpo da requisição",
            ],
            correta: 0,
            explicacao: "Sem estado no protocolo, cada requisição precisa carregar a identificação do usuário.",
          },
        ],
      },
    ],
  },
  {
    titulo: "Desenvolvimento Web",
    area: "Web",
    nivel: "INICIANTE",
    descricao: "HTML semântico, layouts com CSS Flexbox e interação com JavaScript.",
    modulos: [
      {
        titulo: "HTML semântico",
        xp: 20,
        conteudo: `O **HTML** estrutura o conteúdo da página por meio de **tags**. HTML **semântico** usa a tag que descreve o significado do conteúdo, não só a aparência.

## Estrutura de uma página

\`\`\`
<header>   cabeçalho, logotipo e menu
<nav>      navegação principal
<main>     conteúdo principal (um por página)
<section>  seção temática
<article>  conteúdo independente (um post, um cartão)
<footer>   rodapé
\`\`\`

## Por que importa

- **Acessibilidade**: leitores de tela usam as tags para navegar pela página
- **SEO**: buscadores entendem melhor a hierarquia do conteúdo
- **Manutenção**: o código fica autoexplicativo

## Boas práticas

- Use títulos em ordem (\`h1\` → \`h2\` → \`h3\`), com um único \`h1\` por página
- Toda imagem informativa precisa de \`alt\`: \`<img src="logo.png" alt="Logo do FatecLab">\`
- Use \`<button>\` para ações e \`<a>\` para navegação
- Em formulários, ligue cada \`<label>\` ao seu campo com \`for\` e \`id\``,
        questoes: [
          {
            enunciado: "Qual tag representa o conteúdo principal e único da página?",
            alternativas: ["<section>", "<main>", "<div>", "<header>"],
            correta: 1,
            explicacao: "<main> marca o conteúdo principal; deve existir apenas um por página.",
          },
          {
            enunciado: "Para que serve o atributo alt em uma imagem?",
            alternativas: [
              "Definir o tamanho da imagem",
              "Descrever a imagem para leitores de tela e quando ela não carrega",
              "Criar um link",
              "Aplicar um filtro de cor",
            ],
            correta: 1,
            explicacao: "O texto alternativo garante acessibilidade e aparece se a imagem falhar.",
          },
          {
            enunciado: "Qual elemento usar para um botão \"Enviar respostas\" que dispara uma ação?",
            alternativas: ["<a>", "<div>", "<button>", "<span>"],
            correta: 2,
            explicacao: "<button> é focável pelo teclado e anunciado como botão. <a> é para navegação.",
          },
        ],
      },
      {
        titulo: "CSS e Flexbox",
        xp: 20,
        conteudo: `O **CSS** define a aparência dos elementos. Uma regra tem **seletor** e **declarações**:

\`\`\`
.cartao {
    padding: 16px;
    border-radius: 12px;
}
\`\`\`

## Modelo de caixa

Todo elemento é uma caixa: **conteúdo**, \`padding\` (espaço interno), \`border\` e \`margin\` (espaço externo). Com \`box-sizing: border-box\`, a largura informada já inclui padding e borda.

## Flexbox

O Flexbox organiza itens em **uma dimensão** (linha ou coluna):

\`\`\`
.menu {
    display: flex;
    justify-content: space-between; /* eixo principal */
    align-items: center;            /* eixo cruzado */
    gap: 12px;
}
\`\`\`

- \`flex-direction: row | column\` define o eixo principal
- \`justify-content\` distribui no eixo principal
- \`align-items\` alinha no eixo cruzado

## Responsividade

**Media queries** aplicam estilos conforme o tamanho da tela. A abordagem **mobile first** escreve primeiro para o celular e amplia para telas maiores:

\`\`\`
@media (min-width: 768px) {
    .grade { grid-template-columns: 1fr 1fr; }
}
\`\`\``,
        questoes: [
          {
            enunciado: "No modelo de caixa, qual propriedade define o espaço interno entre o conteúdo e a borda?",
            alternativas: ["margin", "padding", "gap", "outline"],
            correta: 1,
            explicacao: "padding é interno; margin é o espaço externo, fora da borda.",
          },
          {
            enunciado: "Em um container flex com flex-direction: row, qual propriedade centraliza os itens verticalmente?",
            alternativas: ["justify-content: center", "align-items: center", "text-align: center", "vertical-align: middle"],
            correta: 1,
            explicacao: "Em row, o eixo cruzado é o vertical, controlado por align-items.",
          },
          {
            enunciado: "O que significa a abordagem mobile first?",
            alternativas: [
              "Criar só a versão para celular",
              "Escrever os estilos para telas pequenas primeiro e ampliar com media queries",
              "Usar apenas aplicativos nativos",
              "Testar somente no celular",
            ],
            correta: 1,
            explicacao: "O estilo base atende o celular, e min-width acrescenta ajustes para telas maiores.",
          },
        ],
      },
      {
        titulo: "JavaScript e o DOM",
        xp: 25,
        conteudo: `O **JavaScript** dá comportamento à página. Ele manipula o **DOM** (Document Object Model), a árvore de objetos que o navegador cria a partir do HTML.

## Selecionar e alterar

\`\`\`
const titulo = document.querySelector("#titulo");
titulo.textContent = "Bem-vindo ao FatecLab";
titulo.classList.add("destaque");
\`\`\`

## Eventos

\`\`\`
const botao = document.querySelector("#enviar");
botao.addEventListener("click", () => {
    alert("Respostas enviadas!");
});
\`\`\`

## Variáveis

- \`const\`: não pode ser reatribuída (use por padrão)
- \`let\`: pode ser reatribuída
- \`var\`: forma antiga, evite

## Requisições assíncronas

O \`fetch\` busca dados de uma API sem recarregar a página. Como a resposta demora, usamos \`async\`/\`await\`:

\`\`\`
async function carregarRanking() {
    const resposta = await fetch("/api/ranking");
    const dados = await resposta.json();
    console.log(dados.entradas);
}
\`\`\`

Frameworks como o **React**, usado no FatecLab, atualizam o DOM automaticamente quando o estado muda.`,
        questoes: [
          {
            enunciado: "O que é o DOM?",
            alternativas: [
              "Um banco de dados do navegador",
              "A representação em árvore de objetos da página HTML",
              "Uma linguagem de estilos",
              "Um servidor web",
            ],
            correta: 1,
            explicacao: "O navegador transforma o HTML em uma árvore de objetos que o JavaScript pode manipular.",
          },
          {
            enunciado: "Qual método registra uma função para ser executada quando o usuário clicar em um botão?",
            alternativas: ["botao.onClickRun()", "botao.addEventListener(\"click\", ...)", "botao.querySelector(\"click\")", "botao.fetch(\"click\")"],
            correta: 1,
            explicacao: "addEventListener associa uma função (handler) a um evento do elemento.",
          },
          {
            enunciado: "Qual declaração usar para um valor que não será reatribuído?",
            alternativas: ["var", "let", "const", "static"],
            correta: 2,
            explicacao: "const impede a reatribuição e deixa a intenção explícita.",
          },
        ],
      },
    ],
  },
  {
    // Adicionada depois do primeiro lote: vai para a migração V4_2 (não altera a V4_1 já aplicada).
    migracao: 2,
    titulo: "Cibersegurança",
    area: "Segurança",
    nivel: "INTERMEDIARIO",
    descricao:
      "Os pilares da segurança da informação, senhas e autenticação, ataques comuns em aplicações web e criptografia na prática.",
    modulos: [
      {
        titulo: "Fundamentos da segurança da informação",
        xp: 30,
        conteudo: `A segurança da informação protege dados e sistemas contra acesso, alteração e indisponibilidade indevidos. Ela se apoia em três pilares, conhecidos como **tríade CID**:

- **Confidencialidade**: só quem tem permissão acessa a informação (ex.: suas notas no sistema acadêmico)
- **Integridade**: a informação não é alterada de forma indevida (ex.: ninguém muda sua nota no caminho)
- **Disponibilidade**: a informação está acessível quando necessária (ex.: o sistema não cai na semana de provas)

## Ameaça, vulnerabilidade e risco

- **Vulnerabilidade**: uma fraqueza, como um sistema desatualizado ou uma senha fraca
- **Ameaça**: algo ou alguém que pode explorar a vulnerabilidade, como um atacante ou um malware
- **Risco**: a chance de a ameaça explorar a vulnerabilidade, combinada com o impacto que isso causaria

Reduzir o risco é o objetivo: corrigir vulnerabilidades, dificultar ameaças e diminuir o impacto (backups, por exemplo).

## Defesa em profundidade

Nenhuma proteção é perfeita, então se usam **várias camadas**: firewall, atualização de sistemas, controle de acesso, criptografia, monitoramento e conscientização dos usuários. Se uma camada falha, as outras continuam protegendo.

## Engenharia social

Muitos ataques exploram pessoas, não máquinas. O **phishing** é uma mensagem falsa, que imita um banco ou a própria faculdade, para fazer a vítima clicar em um link ou entregar a senha. Desconfie de urgência, confira o remetente e o endereço do site antes de digitar dados.`,
        questoes: [
          {
            enunciado: "Um invasor altera o valor de uma transferência enquanto ela trafega pela rede. Qual pilar da segurança foi violado?",
            alternativas: ["Confidencialidade", "Integridade", "Disponibilidade", "Autenticidade do usuário"],
            correta: 1,
            explicacao: "A informação foi modificada de forma indevida: isso fere a integridade.",
          },
          {
            enunciado: "Um servidor sem atualizações de segurança há dois anos é um exemplo de:",
            alternativas: ["Ameaça", "Risco", "Vulnerabilidade", "Incidente"],
            correta: 2,
            explicacao: "É uma fraqueza que pode ser explorada. A ameaça seria o atacante que a explora.",
          },
          {
            enunciado: "Um e-mail com o logotipo da Fatec pede, com urgência, que você confirme sua senha em um link. Isso é provavelmente:",
            alternativas: ["Um aviso oficial de rotina", "Phishing", "Uma atualização automática", "Um teste de disponibilidade"],
            correta: 1,
            explicacao: "Urgência e pedido de senha por link são sinais clássicos de phishing. Instituições não pedem sua senha por e-mail.",
          },
        ],
      },
      {
        titulo: "Senhas e autenticação",
        xp: 30,
        conteudo: `**Autenticação** é provar quem você é; **autorização** é definir o que você pode fazer depois de autenticado. No FatecLab, o login autentica, e o papel de administrador autoriza o acesso ao painel.

## Como guardar senhas

Um sistema **nunca** deve guardar a senha em texto puro. Ele guarda um **hash**: o resultado de uma função de mão única, que não pode ser revertida.

- **Salt**: um valor aleatório somado à senha antes do hash. Assim, duas pessoas com a mesma senha têm hashes diferentes, e tabelas prontas de hashes (rainbow tables) deixam de funcionar
- Use algoritmos **lentos de propósito**, feitos para senhas, como **bcrypt** ou Argon2. MD5 e SHA-1 são rápidos demais e permitem testar bilhões de tentativas

\`\`\`
senha "fatec2026" + salt  ->  bcrypt  ->  $2a$10$N9qo8uLOickgx2ZMRZoMye...
\`\`\`

## Senhas fortes

Comprimento vale mais que complexidade: uma frase longa como \`cafe-com-pao-na-fatec\` é mais forte e mais fácil de lembrar que \`F@t3c!\`. Não repita senhas entre serviços e use um gerenciador de senhas.

## Autenticação multifator (MFA)

Combina fatores de tipos diferentes:

- algo que você **sabe** (senha)
- algo que você **tem** (celular com aplicativo autenticador)
- algo que você **é** (biometria)

Com MFA, uma senha vazada sozinha não basta para invadir a conta.`,
        questoes: [
          {
            enunciado: "Qual é a forma correta de um sistema armazenar as senhas dos usuários?",
            alternativas: [
              "Em texto puro, em uma tabela protegida",
              "Criptografadas com uma chave guardada no próprio servidor",
              "Como hash com salt, usando um algoritmo como bcrypt",
              "Codificadas em Base64",
            ],
            correta: 2,
            explicacao: "Hash com salt em algoritmo lento impede recuperar a senha e dificulta ataques de força bruta. Base64 é só codificação e se reverte facilmente.",
          },
          {
            enunciado: "Para que serve o salt no armazenamento de senhas?",
            alternativas: [
              "Deixar o hash mais curto",
              "Fazer senhas iguais gerarem hashes diferentes e inutilizar tabelas prontas de hashes",
              "Permitir recuperar a senha original",
              "Substituir a autenticação multifator",
            ],
            correta: 1,
            explicacao: "Com um salt aleatório por usuário, o mesmo texto gera hashes distintos e as rainbow tables deixam de servir.",
          },
          {
            enunciado: "Senha e código do aplicativo autenticador no celular combinam quais fatores?",
            alternativas: [
              "Algo que você sabe e algo que você tem",
              "Algo que você é e algo que você sabe",
              "Dois fatores do mesmo tipo",
              "Algo que você tem e algo que você é",
            ],
            correta: 0,
            explicacao: "A senha é conhecimento (sabe); o celular é posse (tem). Por serem de tipos diferentes, formam uma MFA de verdade.",
          },
        ],
      },
      {
        titulo: "Ataques comuns em aplicações web",
        xp: 35,
        conteudo: `O **OWASP Top 10** é a lista de referência dos riscos mais críticos em aplicações web. Três deles aparecem o tempo todo:

## Injeção de SQL

Acontece quando a entrada do usuário é **concatenada** direto na consulta:

\`\`\`
"SELECT * FROM usuario WHERE email = '" + email + "'"
-- email digitado: ' OR '1'='1
\`\`\`

A consulta passa a retornar todos os usuários. A defesa é usar **consultas parametrizadas** (prepared statements), em que o banco trata a entrada como dado, nunca como comando. O Spring Data JPA, usado no FatecLab, faz isso por padrão.

## Cross-site scripting (XSS)

O atacante consegue que a página exiba um **script** dele para outros usuários, por exemplo em um comentário. O script roda no navegador da vítima e pode roubar dados da sessão. A defesa é **escapar** toda saída e nunca inserir HTML vindo do usuário sem tratamento. Por isso o FatecLab exibe as lições como texto formatado, sem interpretar HTML.

## Quebra de controle de acesso

É o primeiro da lista atual: o sistema não verifica se o usuário pode fazer aquilo. Exemplos: um aluno chamar diretamente a rota \`/api/admin/trilhas\`, ou trocar o ID na URL para ver dados de outro aluno. A regra de ouro: **toda autorização é verificada no servidor**. Esconder um botão na interface não protege nada.`,
        questoes: [
          {
            enunciado: "Qual é a principal defesa contra injeção de SQL?",
            alternativas: [
              "Esconder as mensagens de erro do banco",
              "Usar consultas parametrizadas (prepared statements)",
              "Limitar o tamanho dos campos no formulário",
              "Usar HTTPS",
            ],
            correta: 1,
            explicacao: "Com parâmetros, a entrada nunca é interpretada como parte do comando SQL. As outras medidas ajudam, mas não resolvem a causa.",
          },
          {
            enunciado: "Um comentário contendo <script> passa a ser executado no navegador de quem abre a página. Que ataque é esse?",
            alternativas: ["Injeção de SQL", "Phishing", "Cross-site scripting (XSS)", "Negação de serviço"],
            correta: 2,
            explicacao: "No XSS, o código do atacante é injetado na página e executado no navegador das vítimas.",
          },
          {
            enunciado: "Um aluno descobre que, chamando a API diretamente, consegue apagar trilhas. Qual a correção adequada?",
            alternativas: [
              "Esconder o botão de excluir na interface",
              "Trocar a URL da rota por um nome difícil de adivinhar",
              "Verificar no servidor se o usuário tem papel de administrador",
              "Pedir que os alunos não usem a API",
            ],
            correta: 2,
            explicacao: "Controle de acesso precisa ser feito no back-end. Esconder ou ofuscar a rota não impede a chamada.",
          },
        ],
      },
      {
        titulo: "Criptografia e HTTPS",
        xp: 35,
        conteudo: `**Criptografia** transforma dados legíveis em um formato que só quem tem a chave consegue ler.

## Simétrica

Usa a **mesma chave** para cifrar e decifrar (ex.: AES). É rápida, mas tem um problema: como enviar a chave ao outro lado com segurança?

## Assimétrica

Usa um **par de chaves**: a **pública**, que pode ser distribuída, e a **privada**, que fica só com o dono (ex.: RSA, curvas elípticas).

- O que é cifrado com a chave pública só é decifrado com a privada: serve para **sigilo**
- O que é assinado com a chave privada é verificado com a pública: serve para **assinatura digital**, provando autoria e integridade

## Como o HTTPS usa as duas

O HTTPS é o HTTP protegido pelo protocolo **TLS**. Na conexão:

- o servidor apresenta um **certificado digital**, emitido por uma autoridade certificadora, que comprova que ele é mesmo quem diz ser
- a criptografia assimétrica é usada para combinar, com segurança, uma chave de sessão
- o restante da conversa usa criptografia **simétrica**, que é mais rápida

## Hash não é criptografia

Hash é de mão única e não tem chave para "decifrar". Ele serve para verificar integridade e guardar senhas. Já o **JWT** usado no FatecLab é **assinado**, não cifrado: qualquer um consegue ler o conteúdo, mas ninguém consegue alterá-lo sem invalidar a assinatura. Por isso ele não deve carregar dados sigilosos.`,
        questoes: [
          {
            enunciado: "Na criptografia assimétrica, para enviar uma mensagem sigilosa a Ana, com qual chave você deve cifrá-la?",
            alternativas: ["Sua chave privada", "Sua chave pública", "A chave pública de Ana", "A chave privada de Ana"],
            correta: 2,
            explicacao: "Só a chave privada de Ana decifra o que foi cifrado com a pública dela. A privada nunca é compartilhada.",
          },
          {
            enunciado: "Para que serve o certificado digital apresentado em uma conexão HTTPS?",
            alternativas: [
              "Acelerar o carregamento da página",
              "Comprovar a identidade do servidor",
              "Armazenar a senha do usuário",
              "Substituir a criptografia simétrica",
            ],
            correta: 1,
            explicacao: "O certificado, emitido por uma autoridade certificadora, garante que você está falando com o servidor legítimo.",
          },
          {
            enunciado: "Sobre um JWT assinado, é correto afirmar:",
            alternativas: [
              "Seu conteúdo é sigiloso e ninguém consegue lê-lo",
              "Seu conteúdo pode ser lido, mas não alterado sem invalidar a assinatura",
              "Ele pode ser alterado livremente pelo cliente",
              "Ele substitui o uso de HTTPS",
            ],
            correta: 1,
            explicacao: "A assinatura garante integridade, não sigilo. Por isso o token não deve carregar dados confidenciais e deve trafegar sempre por HTTPS.",
          },
        ],
      },
    ],
  },
];

// Usuários de demonstração. Todos os nomes são fictícios.
// "diasAtras" = há quantos dias foi a última atividade (0 = hoje), para a ofensiva aparecer ativa.
export const usuarios = [
  { nome: "Administrador FatecLab", email: "admin@fatec.sp.gov.br", senha: "admin1234", papel: "ADMINISTRADOR", apelido: null, xp: 0, ofensiva: 0, maiorOfensiva: 0, diasAtras: null },
  { nome: "Aluno Demonstração", email: "aluno@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "Calouro", xp: 0, ofensiva: 0, maiorOfensiva: 0, diasAtras: null },
  { nome: "Ana Beatriz Souza", email: "ana.souza@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "AnaB", xp: 1340, ofensiva: 12, maiorOfensiva: 15, diasAtras: 0 },
  { nome: "Rafael Moreira", email: "rafael.moreira@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "byte_rafa", xp: 985, ofensiva: 6, maiorOfensiva: 9, diasAtras: 0 },
  { nome: "Camila Nogueira", email: "camila.nogueira@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "camila.dev", xp: 760, ofensiva: 4, maiorOfensiva: 7, diasAtras: 1 },
  { nome: "Diego Albuquerque", email: "diego.albuquerque@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "Diego_SQL", xp: 545, ofensiva: 3, maiorOfensiva: 5, diasAtras: 0 },
  { nome: "Eduarda Lima", email: "eduarda.lima@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "Duda", xp: 420, ofensiva: 0, maiorOfensiva: 4, diasAtras: 5 },
  { nome: "Felipe Andrade", email: "felipe.andrade@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "FelipeA", xp: 305, ofensiva: 2, maiorOfensiva: 3, diasAtras: 1 },
  { nome: "Gabriela Torres", email: "gabriela.torres@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "gabi.t", xp: 180, ofensiva: 1, maiorOfensiva: 2, diasAtras: 0 },
  { nome: "Heitor Campos", email: "heitor.campos@fatec.sp.gov.br", senha: "aluno1234", papel: "ALUNO", apelido: "Heitor", xp: 95, ofensiva: 0, maiorOfensiva: 1, diasAtras: 9 },
];
