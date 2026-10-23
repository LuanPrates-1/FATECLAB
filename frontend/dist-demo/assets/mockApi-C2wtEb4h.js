import{c as I,x as L}from"./index-BxEsDJ41.js";const k=[{id:1,titulo:"Lógica de Programação",area:"Programação",nivel:"INICIANTE",descricao:"Do algoritmo ao código: variáveis, operadores, decisões e repetições. A base para qualquer linguagem.",modulos:[{id:1,ordem:1,titulo:"Algoritmos e variáveis",xpConcedido:20,conteudo:`Um **algoritmo** é uma sequência finita e ordenada de passos que resolve um problema. Uma receita de bolo é um algoritmo: tem entrada (ingredientes), processamento (modo de preparo) e saída (o bolo).

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

O sinal \`=\` na maioria das linguagens significa **atribuição**, não igualdade: "guarde o valor da direita na variável da esquerda". Por isso \`x = x + 1\` faz sentido: pega o valor atual de x, soma 1 e guarda de volta.`,questoes:[{id:1,ordem:1,enunciado:"O que melhor define um algoritmo?",explicacao:"Algoritmo é a sequência de passos em si, independente da linguagem. O programa é a implementação do algoritmo em uma linguagem.",alternativas:[{id:1,ordem:1,texto:"Uma sequência finita e ordenada de passos para resolver um problema",correta:!0},{id:2,ordem:2,texto:"Um componente físico do computador",correta:!1},{id:3,ordem:3,texto:"Um programa escrito obrigatoriamente em Java",correta:!1},{id:4,ordem:4,texto:"Um tipo de variável que guarda textos",correta:!1}]},{id:2,ordem:2,enunciado:"Qual tipo de dado é o mais adequado para guardar o preço de um produto, como 19,90?",explicacao:"Preços têm casas decimais, por isso o tipo real (float/double) é o adequado.",alternativas:[{id:5,ordem:1,texto:"Lógico",correta:!1},{id:6,ordem:2,texto:"Inteiro",correta:!1},{id:7,ordem:3,texto:"Texto",correta:!1},{id:8,ordem:4,texto:"Real",correta:!0}]},{id:3,ordem:3,enunciado:"Se x vale 4, quanto x passa a valer depois da instrução x = x + 1?",explicacao:"O lado direito é calculado primeiro (4 + 1 = 5) e o resultado é atribuído de volta a x.",alternativas:[{id:9,ordem:1,texto:"4",correta:!1},{id:10,ordem:2,texto:"1",correta:!1},{id:11,ordem:3,texto:"A instrução é inválida",correta:!1},{id:12,ordem:4,texto:"5",correta:!0}]}]},{id:2,ordem:2,titulo:"Operadores e expressões",xpConcedido:20,conteudo:"Operadores combinam valores para formar **expressões**.\n\n## Aritméticos\n\n- `+` soma, `-` subtração, `*` multiplicação, `/` divisão\n- `%` **resto da divisão** (módulo): `10 % 3` resulta em 1\n\nA precedência segue a matemática: multiplicação e divisão antes de soma e subtração. Use parênteses para deixar a intenção clara: `(nota1 + nota2) / 2`.\n\n## Relacionais\n\nComparam valores e sempre resultam em verdadeiro ou falso: `==` (igual), `!=` (diferente), `>`, `<`, `>=`, `<=`.\n\n## Lógicos\n\n- **E** (`&&`): verdadeiro só se as duas condições forem verdadeiras\n- **OU** (`||`): verdadeiro se pelo menos uma for verdadeira\n- **NÃO** (`!`): inverte o valor\n\n```\npodeVotar = idade >= 16\naprovado = media >= 6 && frequencia >= 75\n```\n\nUm uso clássico do operador `%`: um número é par quando `numero % 2 == 0`.",questoes:[{id:4,ordem:1,enunciado:"Qual é o resultado de 17 % 5?",explicacao:"17 dividido por 5 dá 3 com resto 2. O operador % devolve o resto: 2.",alternativas:[{id:13,ordem:1,texto:"12",correta:!1},{id:14,ordem:2,texto:"2",correta:!0},{id:15,ordem:3,texto:"3,4",correta:!1},{id:16,ordem:4,texto:"3",correta:!1}]},{id:5,ordem:2,enunciado:"Qual é o valor da expressão 2 + 3 * 4?",explicacao:"A multiplicação tem precedência: 3 * 4 = 12, depois 2 + 12 = 14.",alternativas:[{id:17,ordem:1,texto:"20",correta:!1},{id:18,ordem:2,texto:"24",correta:!1},{id:19,ordem:3,texto:"14",correta:!0},{id:20,ordem:4,texto:"9",correta:!1}]},{id:6,ordem:3,enunciado:"Com media = 7 e frequencia = 70, qual é o resultado de (media >= 6 && frequencia >= 75)?",explicacao:"A primeira condição é verdadeira, mas a segunda é falsa (70 < 75). Com o operador E, basta uma falsa para o resultado ser falso.",alternativas:[{id:21,ordem:1,texto:"Falso",correta:!0},{id:22,ordem:2,texto:"Erro de execução",correta:!1},{id:23,ordem:3,texto:"Verdadeiro",correta:!1},{id:24,ordem:4,texto:"7",correta:!1}]}]},{id:3,ordem:3,titulo:"Estruturas de decisão",xpConcedido:20,conteudo:`Estruturas de decisão permitem que o programa siga caminhos diferentes conforme uma condição.

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
- Cubra o caso "senão": o que acontece quando nenhuma condição é verdadeira?`,questoes:[{id:7,ordem:1,enunciado:"No código do exemplo (aprovado com média >= 6, exame com média >= 4), o que é exibido para média 5?",explicacao:"5 não é >= 6, então o primeiro teste falha. 5 é >= 4, então o segundo bloco é executado: Exame.",alternativas:[{id:25,ordem:1,texto:"Nada é exibido",correta:!1},{id:26,ordem:2,texto:"Aprovado",correta:!1},{id:27,ordem:3,texto:"Reprovado",correta:!1},{id:28,ordem:4,texto:"Exame",correta:!0}]},{id:8,ordem:2,enunciado:"Quando a estrutura escolha/caso (switch) é mais indicada?",explicacao:"O switch compara um mesmo valor contra vários casos, como as opções de um menu.",alternativas:[{id:29,ordem:1,texto:"Para declarar variáveis",correta:!1},{id:30,ordem:2,texto:"Quando a decisão depende de um único valor com várias opções fixas",correta:!0},{id:31,ordem:3,texto:"Quando há apenas uma condição verdadeira ou falsa",correta:!1},{id:32,ordem:4,texto:"Para repetir um bloco várias vezes",correta:!1}]},{id:9,ordem:3,enunciado:"Em uma cadeia se / senão se / senão, quantos blocos são executados no máximo?",explicacao:"A cadeia para no primeiro bloco verdadeiro. Se nenhum for, executa o senão. Sempre um bloco, no máximo.",alternativas:[{id:33,ordem:1,texto:"Todos os que forem verdadeiros",correta:!1},{id:34,ordem:2,texto:"Exatamente dois",correta:!1},{id:35,ordem:3,texto:"Apenas um",correta:!0},{id:36,ordem:4,texto:"Nenhum",correta:!1}]}]},{id:4,ordem:4,titulo:"Estruturas de repetição",xpConcedido:25,conteudo:`Laços (loops) repetem um bloco de código enquanto uma condição for verdadeira.

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

Se nada dentro do laço altera a condição, ele nunca termina. No exemplo do "enquanto", esquecer \`contador = contador + 1\` trava o programa.`,questoes:[{id:10,ordem:1,enunciado:"Quantas vezes o bloco de um laço para (i = 0; i < 10; i++) é executado?",explicacao:"i assume os valores 0 a 9, ou seja, 10 execuções. Quando i chega a 10, a condição i < 10 é falsa.",alternativas:[{id:37,ordem:1,texto:"Infinitas",correta:!1},{id:38,ordem:2,texto:"9",correta:!1},{id:39,ordem:3,texto:"10",correta:!0},{id:40,ordem:4,texto:"11",correta:!1}]},{id:11,ordem:2,enunciado:"Qual laço garante que o bloco execute pelo menos uma vez?",explicacao:"O faça-enquanto executa o bloco e só depois testa a condição.",alternativas:[{id:41,ordem:1,texto:"Nenhum deles",correta:!1},{id:42,ordem:2,texto:"enquanto (while)",correta:!1},{id:43,ordem:3,texto:"faça-enquanto (do-while)",correta:!0},{id:44,ordem:4,texto:"para (for)",correta:!1}]},{id:12,ordem:3,enunciado:"O que provoca um laço infinito?",explicacao:"Se nada altera a condição, ela continua verdadeira para sempre e o laço não termina.",alternativas:[{id:45,ordem:1,texto:"A condição de parada nunca se tornar falsa",correta:!0},{id:46,ordem:2,texto:"Usar mais de uma condição no laço",correta:!1},{id:47,ordem:3,texto:"Declarar variáveis dentro do laço",correta:!1},{id:48,ordem:4,texto:"Usar o laço para em vez do enquanto",correta:!1}]}]}]},{id:2,titulo:"SQL Essencial",area:"Banco de Dados",nivel:"INICIANTE",descricao:"Modelo relacional e as consultas que você mais vai usar: SELECT, filtros, JOINs e agregações.",modulos:[{id:5,ordem:1,titulo:"O modelo relacional",xpConcedido:20,conteudo:`Em um banco de dados relacional, os dados ficam organizados em **tabelas**. Cada tabela tem **colunas** (atributos) e **linhas** (registros).

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
- **N:N**: alunos cursam muitas disciplinas e disciplinas têm muitos alunos. Na prática, o N:N vira uma **tabela associativa** (como \`matricula\` acima)`,questoes:[{id:13,ordem:1,enunciado:"Qual característica é obrigatória em uma chave primária?",explicacao:"A chave primária identifica a linha, então não pode se repetir nem ficar vazia.",alternativas:[{id:49,ordem:1,texto:"Referenciar outra tabela",correta:!1},{id:50,ordem:2,texto:"Ser única e não nula",correta:!0},{id:51,ordem:3,texto:"Ser sempre do tipo texto",correta:!1},{id:52,ordem:4,texto:"Ser a primeira coluna da tabela",correta:!1}]},{id:14,ordem:2,enunciado:"Para que serve uma chave estrangeira?",explicacao:"A FK guarda o valor da PK de outra tabela, criando o relacionamento entre elas.",alternativas:[{id:53,ordem:1,texto:"Criptografar os dados da tabela",correta:!1},{id:54,ordem:2,texto:"Impedir que a tabela tenha linhas",correta:!1},{id:55,ordem:3,texto:"Relacionar uma tabela à chave primária de outra",correta:!0},{id:56,ordem:4,texto:"Acelerar todas as consultas",correta:!1}]},{id:15,ordem:3,enunciado:"Como um relacionamento N:N costuma ser implementado no banco?",explicacao:"A tabela associativa (ex.: matricula) liga as duas tabelas, cada linha com uma FK para cada lado.",alternativas:[{id:57,ordem:1,texto:"Com uma única coluna de texto separada por vírgulas",correta:!1},{id:58,ordem:2,texto:"Duplicando as duas tabelas",correta:!1},{id:59,ordem:3,texto:"Não é possível representar N:N",correta:!1},{id:60,ordem:4,texto:"Com uma tabela associativa contendo as duas chaves estrangeiras",correta:!0}]}]},{id:6,ordem:2,titulo:"SELECT e WHERE",xpConcedido:20,conteudo:"O comando `SELECT` consulta dados. A estrutura básica é:\n\n```\nSELECT nome, email\nFROM aluno\nWHERE semestre = 3\nORDER BY nome;\n```\n\n- **SELECT**: quais colunas (`*` traz todas)\n- **FROM**: de qual tabela\n- **WHERE**: filtra as linhas\n- **ORDER BY**: ordena o resultado (`ASC` crescente, padrão; `DESC` decrescente)\n\n## Filtros úteis\n\n- `AND`, `OR`, `NOT` combinam condições\n- `BETWEEN 5 AND 8`: intervalo inclusivo\n- `IN ('ADS', 'GTI')`: um valor dentro de uma lista\n- `LIKE 'Ana%'`: texto que começa com \"Ana\" (`%` é qualquer sequência de caracteres)\n- `IS NULL`: valores ausentes. **Nunca** use `= NULL`, que não funciona\n\n```\nSELECT * FROM aluno\nWHERE curso IN ('ADS', 'GTI') AND email IS NOT NULL\nORDER BY semestre DESC;\n```",questoes:[{id:16,ordem:1,enunciado:"Qual cláusula filtra as linhas retornadas por uma consulta?",explicacao:"WHERE define as condições que cada linha precisa atender para entrar no resultado.",alternativas:[{id:61,ordem:1,texto:"WHERE",correta:!0},{id:62,ordem:2,texto:"ORDER BY",correta:!1},{id:63,ordem:3,texto:"FROM",correta:!1},{id:64,ordem:4,texto:"SELECT",correta:!1}]},{id:17,ordem:2,enunciado:'Qual filtro encontra os alunos cujo nome começa com "Mar"?',explicacao:`Com LIKE, 'Mar%' significa "Mar" seguido de qualquer coisa. '%Mar' seria terminar com Mar.`,alternativas:[{id:65,ordem:1,texto:"nome IN ('Mar')",correta:!1},{id:66,ordem:2,texto:"nome = 'Mar%'",correta:!1},{id:67,ordem:3,texto:"nome LIKE '%Mar'",correta:!1},{id:68,ordem:4,texto:"nome LIKE 'Mar%'",correta:!0}]},{id:18,ordem:3,enunciado:"Como selecionar os registros em que a coluna telefone não foi preenchida?",explicacao:"NULL representa ausência de valor e não pode ser comparado com =. Use IS NULL / IS NOT NULL.",alternativas:[{id:69,ordem:1,texto:"telefone = NULL",correta:!1},{id:70,ordem:2,texto:"telefone == NULL",correta:!1},{id:71,ordem:3,texto:"telefone = ''",correta:!1},{id:72,ordem:4,texto:"telefone IS NULL",correta:!0}]}]},{id:7,ordem:3,titulo:"Juntando tabelas com JOIN",xpConcedido:25,conteudo:`Como os dados ficam em tabelas separadas, o **JOIN** junta linhas relacionadas em uma única consulta.

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
- Esquecer o \`ON\` gera um **produto cartesiano**: cada linha combinada com todas as outras`,questoes:[{id:19,ordem:1,enunciado:"O que o INNER JOIN retorna?",explicacao:"O INNER JOIN mantém apenas os pares de linhas que satisfazem a condição do ON.",alternativas:[{id:73,ordem:1,texto:"Somente as linhas sem correspondência",correta:!1},{id:74,ordem:2,texto:"Todas as linhas da tabela da esquerda",correta:!1},{id:75,ordem:3,texto:"Somente as linhas com correspondência nas duas tabelas",correta:!0},{id:76,ordem:4,texto:"Todas as linhas das duas tabelas",correta:!1}]},{id:20,ordem:2,enunciado:"Você quer listar todos os cursos, inclusive os que não têm alunos. Qual JOIN usar (curso à esquerda)?",explicacao:"O LEFT JOIN preserva todas as linhas da tabela da esquerda, mesmo sem correspondência.",alternativas:[{id:77,ordem:1,texto:"LEFT JOIN",correta:!0},{id:78,ordem:2,texto:"Nenhum, basta um WHERE",correta:!1},{id:79,ordem:3,texto:"INNER JOIN",correta:!1},{id:80,ordem:4,texto:"CROSS JOIN",correta:!1}]},{id:21,ordem:3,enunciado:"O que acontece ao juntar duas tabelas sem condição de junção?",explicacao:"Sem condição, cada linha de uma tabela é combinada com todas as linhas da outra.",alternativas:[{id:81,ordem:1,texto:"Só a primeira linha é retornada",correta:!1},{id:82,ordem:2,texto:"O banco escolhe a chave automaticamente",correta:!1},{id:83,ordem:3,texto:"A consulta retorna vazio",correta:!1},{id:84,ordem:4,texto:"É gerado um produto cartesiano",correta:!0}]}]},{id:8,ordem:4,titulo:"Agregações e GROUP BY",xpConcedido:25,conteudo:`Funções de agregação resumem várias linhas em um valor:

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

Ordem de execução lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.`,questoes:[{id:22,ordem:1,enunciado:"Qual função conta quantas linhas existem em cada grupo?",explicacao:"COUNT(*) conta as linhas. SUM soma os valores de uma coluna numérica.",alternativas:[{id:85,ordem:1,texto:"MAX(*)",correta:!1},{id:86,ordem:2,texto:"TOTAL(*)",correta:!1},{id:87,ordem:3,texto:"SUM(*)",correta:!1},{id:88,ordem:4,texto:"COUNT(*)",correta:!0}]},{id:23,ordem:2,enunciado:"Qual a diferença entre WHERE e HAVING?",explicacao:"WHERE age sobre as linhas originais; HAVING age sobre o resultado das agregações.",alternativas:[{id:89,ordem:1,texto:"HAVING só funciona com ORDER BY",correta:!1},{id:90,ordem:2,texto:"WHERE filtra grupos e HAVING filtra linhas",correta:!1},{id:91,ordem:3,texto:"WHERE filtra linhas antes do agrupamento e HAVING filtra grupos depois",correta:!0},{id:92,ordem:4,texto:"Não há diferença",correta:!1}]},{id:24,ordem:3,enunciado:"Para mostrar apenas os cursos com média geral acima de 7, qual cláusula usar?",explicacao:"A condição usa uma agregação (AVG), por isso precisa ficar no HAVING.",alternativas:[{id:93,ordem:1,texto:"WHERE AVG(media) > 7",correta:!1},{id:94,ordem:2,texto:"ORDER BY AVG(media) > 7",correta:!1},{id:95,ordem:3,texto:"HAVING AVG(media) > 7",correta:!0},{id:96,ordem:4,texto:"GROUP BY media > 7",correta:!1}]}]}]},{id:3,titulo:"Java Orientado a Objetos",area:"Programação",nivel:"INTERMEDIARIO",descricao:"Classes, encapsulamento, herança, polimorfismo e interfaces na prática com Java.",modulos:[{id:9,ordem:1,titulo:"Classes e objetos",xpConcedido:30,conteudo:`Na orientação a objetos, o programa é organizado em torno de **objetos** que reúnem dados e comportamento.

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

O \`this\` se refere ao próprio objeto e desfaz a ambiguidade entre o atributo e o parâmetro de mesmo nome.`,questoes:[{id:25,ordem:1,enunciado:"Qual frase descreve corretamente a relação entre classe e objeto?",explicacao:"A classe define atributos e métodos; cada new cria um objeto (instância) a partir dela.",alternativas:[{id:97,ordem:1,texto:"A classe é o molde e o objeto é uma instância dela",correta:!0},{id:98,ordem:2,texto:"O objeto é o molde e a classe é a instância",correta:!1},{id:99,ordem:3,texto:"Uma classe só pode gerar um objeto",correta:!1},{id:100,ordem:4,texto:"Classe e objeto são sinônimos",correta:!1}]},{id:26,ordem:2,enunciado:"Qual característica pertence a um construtor em Java?",explicacao:"O construtor tem o nome da classe, não declara retorno e é executado automaticamente no new.",alternativas:[{id:101,ordem:1,texto:"Precisa ser chamado manualmente depois do new",correta:!1},{id:102,ordem:2,texto:"Tem o mesmo nome da classe e não declara tipo de retorno",correta:!0},{id:103,ordem:3,texto:"Só pode existir um por projeto",correta:!1},{id:104,ordem:4,texto:"Sempre retorna void",correta:!1}]},{id:27,ordem:3,enunciado:"No construtor, para que serve this.nome = nome?",explicacao:"this.nome é o atributo do objeto; nome sozinho é o parâmetro recebido.",alternativas:[{id:105,ordem:1,texto:"Compara o atributo com o parâmetro",correta:!1},{id:106,ordem:2,texto:"Atribui o parâmetro nome ao atributo nome do objeto",correta:!0},{id:107,ordem:3,texto:"Apaga o valor do atributo",correta:!1},{id:108,ordem:4,texto:"Cria uma nova classe chamada nome",correta:!1}]}]},{id:10,ordem:2,titulo:"Encapsulamento",xpConcedido:30,conteudo:`**Encapsular** é esconder os detalhes internos de um objeto e expor só o necessário. Isso protege o estado contra alterações inválidas.

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

Encapsular não é criar getter e setter para tudo: exponha **operações com significado** (\`ganharXp\`), não apenas acesso direto aos campos.`,questoes:[{id:28,ordem:1,enunciado:"Qual modificador restringe o acesso a um atributo apenas à própria classe?",explicacao:"private limita o acesso ao código da própria classe.",alternativas:[{id:109,ordem:1,texto:"public",correta:!1},{id:110,ordem:2,texto:"private",correta:!0},{id:111,ordem:3,texto:"protected",correta:!1},{id:112,ordem:4,texto:"static",correta:!1}]},{id:29,ordem:2,enunciado:"Qual é o principal benefício do encapsulamento?",explicacao:"Com o estado privado, toda alteração passa por métodos que validam as regras.",alternativas:[{id:113,ordem:1,texto:"Eliminar a necessidade de construtores",correta:!1},{id:114,ordem:2,texto:"Proteger o estado do objeto e centralizar as regras de alteração",correta:!0},{id:115,ordem:3,texto:"Deixar o programa mais rápido",correta:!1},{id:116,ordem:4,texto:"Permitir herança múltipla",correta:!1}]},{id:30,ordem:3,enunciado:"No exemplo, o que acontece ao chamar aluno.ganharXp(-10)?",explicacao:"O método valida a entrada e lança a exceção para pontos menores ou iguais a zero.",alternativas:[{id:117,ordem:1,texto:"O XP vira zero",correta:!1},{id:118,ordem:2,texto:"O XP diminui 10 pontos",correta:!1},{id:119,ordem:3,texto:"Uma IllegalArgumentException é lançada",correta:!0},{id:120,ordem:4,texto:"Nada acontece",correta:!1}]}]},{id:11,ordem:3,titulo:"Herança e polimorfismo",xpConcedido:30,conteudo:`## Herança

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

Isso permite escrever código genérico (uma lista de \`Usuario\`) que se comporta corretamente para cada tipo concreto.`,questoes:[{id:31,ordem:1,enunciado:"Quantas classes uma classe Java pode estender diretamente?",explicacao:"Java tem herança simples de classes. Para combinar contratos, usam-se interfaces.",alternativas:[{id:121,ordem:1,texto:"Uma",correta:!0},{id:122,ordem:2,texto:"Duas",correta:!1},{id:123,ordem:3,texto:"Nenhuma",correta:!1},{id:124,ordem:4,texto:"Quantas quiser",correta:!1}]},{id:32,ordem:2,enunciado:"Para que serve a anotação @Override?",explicacao:"Se a assinatura não corresponder a um método herdado, o compilador acusa erro.",alternativas:[{id:125,ordem:1,texto:"Tornar o método privado",correta:!1},{id:126,ordem:2,texto:"Fazer o compilador verificar que o método sobrescreve um da superclasse",correta:!0},{id:127,ordem:3,texto:"Impedir que o método seja herdado",correta:!1},{id:128,ordem:4,texto:"Executar o método duas vezes",correta:!1}]},{id:33,ordem:3,enunciado:"Com Usuario u = new Professor(); qual saudacao() é executada?",explicacao:"No polimorfismo, o método chamado é decidido pelo objeto real em tempo de execução.",alternativas:[{id:129,ordem:1,texto:"A de Usuario, porque é o tipo da variável",correta:!1},{id:130,ordem:2,texto:"As duas, em sequência",correta:!1},{id:131,ordem:3,texto:"Nenhuma, gera erro de compilação",correta:!1},{id:132,ordem:4,texto:"A de Professor, porque é o tipo do objeto",correta:!0}]}]},{id:12,ordem:4,titulo:"Interfaces e coleções",xpConcedido:35,conteudo:'## Interfaces\n\nUma **interface** define um contrato: o que uma classe deve saber fazer, sem dizer como. Uma classe pode implementar **várias** interfaces.\n\n```\npublic interface Pontuavel {\n    int calcularPontos();\n}\n\npublic class Quiz implements Pontuavel {\n    public int calcularPontos() { return acertos * 10; }\n}\n```\n\n## Coleções\n\nO pacote `java.util` oferece estruturas prontas, todas baseadas em interfaces:\n\n- `List` (ex.: `ArrayList`): ordenada, aceita repetidos, acesso por índice\n- `Set` (ex.: `HashSet`): **não aceita elementos repetidos**\n- `Map` (ex.: `HashMap`): pares chave → valor\n\n```\nList<String> trilhas = new ArrayList<>();\ntrilhas.add("SQL");\nMap<String, Integer> xpPorAluno = new HashMap<>();\nxpPorAluno.put("luan", 120);\n```\n\nDeclarar a variável pelo tipo da interface (`List`) e não pela implementação (`ArrayList`) deixa o código flexível para trocar a implementação depois.',questoes:[{id:34,ordem:1,enunciado:"Qual afirmação sobre interfaces em Java está correta?",explicacao:"A herança de classe é simples, mas uma classe pode implementar quantas interfaces precisar.",alternativas:[{id:133,ordem:1,texto:"Uma classe só pode implementar uma interface",correta:!1},{id:134,ordem:2,texto:"Uma interface pode ser instanciada com new",correta:!1},{id:135,ordem:3,texto:"Interfaces guardam o estado dos objetos",correta:!1},{id:136,ordem:4,texto:"Uma classe pode implementar várias interfaces",correta:!0}]},{id:35,ordem:2,enunciado:"Qual coleção é a mais adequada para guardar e-mails sem permitir repetidos?",explicacao:"Set não aceita elementos duplicados; HashSet é a implementação mais comum.",alternativas:[{id:137,ordem:1,texto:"LinkedList",correta:!1},{id:138,ordem:2,texto:"ArrayList",correta:!1},{id:139,ordem:3,texto:"HashSet",correta:!0},{id:140,ordem:4,texto:"Array de String",correta:!1}]},{id:36,ordem:3,enunciado:"Qual estrutura associa uma chave (como o apelido) a um valor (como o XP)?",explicacao:"Map guarda pares chave → valor, com busca rápida pela chave.",alternativas:[{id:141,ordem:1,texto:"Set",correta:!1},{id:142,ordem:2,texto:"Queue",correta:!1},{id:143,ordem:3,texto:"List",correta:!1},{id:144,ordem:4,texto:"Map",correta:!0}]}]}]},{id:4,titulo:"Requisitos e UML",area:"Engenharia de Software",nivel:"INICIANTE",descricao:"Como levantar, escrever e modelar requisitos: casos de uso e diagrama de classes.",modulos:[{id:13,ordem:1,titulo:"Requisitos funcionais e não funcionais",xpConcedido:20,conteudo:`**Requisitos** descrevem o que um sistema deve fazer e sob quais condições. São o ponto de partida de qualquer projeto, inclusive do seu TCC.

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
- Sem ambiguidade: evite "fácil", "amigável", "etc."`,questoes:[{id:37,ordem:1,enunciado:'"O sistema deve permitir que o aluno altere seu apelido" é um requisito:',explicacao:"Descreve uma função que o usuário realiza no sistema, então é funcional.",alternativas:[{id:145,ordem:1,texto:"Não funcional",correta:!1},{id:146,ordem:2,texto:"Regra de negócio de banco",correta:!1},{id:147,ordem:3,texto:"De hardware",correta:!1},{id:148,ordem:4,texto:"Funcional",correta:!0}]},{id:38,ordem:2,enunciado:"Qual destes é um requisito não funcional?",explicacao:"Tempo de resposta é uma qualidade (desempenho), não uma função do sistema.",alternativas:[{id:149,ordem:1,texto:"As páginas devem carregar em até 2 segundos em conexão 4G",correta:!0},{id:150,ordem:2,texto:"O aluno deve responder quizzes",correta:!1},{id:151,ordem:3,texto:"O sistema deve exibir o ranking",correta:!1},{id:152,ordem:4,texto:"O administrador deve cadastrar trilhas",correta:!1}]},{id:39,ordem:3,enunciado:"Qual requisito está mais bem escrito?",explicacao:"É específico e verificável: dá para testar exatamente se o comportamento acontece.",alternativas:[{id:153,ordem:1,texto:"O sistema deve ser rápido",correta:!1},{id:154,ordem:2,texto:"O sistema deve ser fácil de usar etc.",correta:!1},{id:155,ordem:3,texto:"O sistema deve bloquear o login após 5 tentativas incorretas seguidas",correta:!0},{id:156,ordem:4,texto:"O sistema deve ser bom",correta:!1}]}]},{id:14,ordem:2,titulo:"Casos de uso",xpConcedido:20,conteudo:`O **diagrama de casos de uso** mostra, em alto nível, quem usa o sistema e para quê.

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

Cada caso de uso importante ganha uma descrição textual: atores, pré-condições, **fluxo principal** (passo a passo), **fluxos alternativos** (erros e exceções) e pós-condições.`,questoes:[{id:40,ordem:1,enunciado:"No diagrama de casos de uso, o que é um ator?",explicacao:"Ator é um papel externo ao sistema que interage com ele.",alternativas:[{id:157,ordem:1,texto:"Um método Java",correta:!1},{id:158,ordem:2,texto:"Uma classe do banco de dados",correta:!1},{id:159,ordem:3,texto:"Quem interage com o sistema, seja pessoa ou outro sistema",correta:!0},{id:160,ordem:4,texto:"Uma tela do sistema",correta:!1}]},{id:41,ordem:2,enunciado:"Qual relacionamento indica um comportamento opcional, que só ocorre sob uma condição?",explicacao:"O extend acrescenta comportamento opcional; o include é sempre executado.",alternativas:[{id:161,ordem:1,texto:"Composição",correta:!1},{id:162,ordem:2,texto:"Associação",correta:!1},{id:163,ordem:3,texto:"<<include>>",correta:!1},{id:164,ordem:4,texto:"<<extend>>",correta:!0}]},{id:42,ordem:3,enunciado:"Onde ficam descritos os erros e exceções de um caso de uso?",explicacao:"O fluxo principal descreve o caminho de sucesso; os alternativos cobrem desvios e erros.",alternativas:[{id:165,ordem:1,texto:"No ator",correta:!1},{id:166,ordem:2,texto:"Na fronteira do sistema",correta:!1},{id:167,ordem:3,texto:"Nos fluxos alternativos da especificação",correta:!0},{id:168,ordem:4,texto:"No nome do caso de uso",correta:!1}]}]},{id:15,ordem:3,titulo:"Diagrama de classes",xpConcedido:25,conteudo:`O **diagrama de classes** mostra a estrutura estática do sistema: classes, seus atributos, métodos e relacionamentos.

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

\`1\` exatamente um, \`0..1\` zero ou um, \`*\` ou \`0..*\` muitos, \`1..*\` pelo menos um.`,questoes:[{id:43,ordem:1,enunciado:'No diagrama de classes, o que o símbolo "-" antes de um atributo indica?',explicacao:"+ é público, - é privado e # é protegido.",alternativas:[{id:169,ordem:1,texto:"Protegido",correta:!1},{id:170,ordem:2,texto:"Privado",correta:!0},{id:171,ordem:3,texto:"Público",correta:!1},{id:172,ordem:4,texto:"Estático",correta:!1}]},{id:44,ordem:2,enunciado:"Uma Trilha tem Módulos que não existem sem ela. Qual relacionamento representa isso?",explicacao:"Na composição, o ciclo de vida da parte depende do todo.",alternativas:[{id:173,ordem:1,texto:"Agregação",correta:!1},{id:174,ordem:2,texto:"Herança",correta:!1},{id:175,ordem:3,texto:"Dependência",correta:!1},{id:176,ordem:4,texto:"Composição",correta:!0}]},{id:45,ordem:3,enunciado:'Qual multiplicidade significa "pelo menos um"?',explicacao:"1..* indica um ou mais elementos.",alternativas:[{id:177,ordem:1,texto:"1..*",correta:!0},{id:178,ordem:2,texto:"0..*",correta:!1},{id:179,ordem:3,texto:"0..1",correta:!1},{id:180,ordem:4,texto:"1",correta:!1}]}]}]},{id:5,titulo:"Estruturas de Dados",area:"Programação",nivel:"AVANCADO",descricao:"Análise de complexidade, pilhas, filas e árvores binárias de busca.",modulos:[{id:16,ordem:1,titulo:"Complexidade de algoritmos (Big O)",xpConcedido:40,conteudo:`A notação **Big O** descreve como o tempo (ou a memória) de um algoritmo cresce conforme o tamanho da entrada **n** aumenta. Ela considera o pior caso e ignora constantes.

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

Regras práticas: passos em sequência somam (fica o maior termo); laços aninhados multiplicam.`,questoes:[{id:46,ordem:1,enunciado:"Qual é a complexidade da busca binária em um vetor ordenado?",explicacao:"A cada comparação metade dos elementos é descartada, então são cerca de log₂ n passos.",alternativas:[{id:181,ordem:1,texto:"O(log n)",correta:!0},{id:182,ordem:2,texto:"O(n²)",correta:!1},{id:183,ordem:3,texto:"O(n)",correta:!1},{id:184,ordem:4,texto:"O(1)",correta:!1}]},{id:47,ordem:2,enunciado:"Dois laços aninhados, cada um percorrendo os n elementos, resultam em:",explicacao:"Laços aninhados multiplicam: n × n = n².",alternativas:[{id:185,ordem:1,texto:"O(n)",correta:!1},{id:186,ordem:2,texto:"O(log n)",correta:!1},{id:187,ordem:3,texto:"O(2n)",correta:!1},{id:188,ordem:4,texto:"O(n²)",correta:!0}]},{id:48,ordem:3,enunciado:"Um algoritmo faz um laço O(n) e, depois, outro laço O(n²) em sequência. Qual sua complexidade?",explicacao:"Passos em sequência somam (n + n²) e, no Big O, fica só o termo dominante: n².",alternativas:[{id:189,ordem:1,texto:"O(n³)",correta:!1},{id:190,ordem:2,texto:"O(n + 1)",correta:!1},{id:191,ordem:3,texto:"O(n)",correta:!1},{id:192,ordem:4,texto:"O(n²)",correta:!0}]}]},{id:17,ordem:2,titulo:"Pilhas e filas",xpConcedido:40,conteudo:`## Pilha (stack): LIFO

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

Bem implementadas, as operações de inserir e remover de pilhas e filas são **O(1)**.`,questoes:[{id:49,ordem:1,enunciado:"Em uma pilha, foram empilhados A, B e C, nessa ordem. Qual elemento sai no primeiro pop?",explicacao:"Pilha é LIFO: o último a entrar (C) é o primeiro a sair.",alternativas:[{id:193,ordem:1,texto:"C",correta:!0},{id:194,ordem:2,texto:"Depende da implementação",correta:!1},{id:195,ordem:3,texto:"B",correta:!1},{id:196,ordem:4,texto:"A",correta:!1}]},{id:50,ordem:2,enunciado:"Qual estrutura modela melhor uma fila de impressão?",explicacao:"Documentos são impressos na ordem de chegada: FIFO.",alternativas:[{id:197,ordem:1,texto:"Fila",correta:!0},{id:198,ordem:2,texto:"Árvore",correta:!1},{id:199,ordem:3,texto:"Pilha",correta:!1},{id:200,ordem:4,texto:"Tabela hash",correta:!1}]},{id:51,ordem:3,enunciado:'O recurso "desfazer" de um editor de texto costuma usar qual estrutura?',explicacao:"Desfazer reverte a ação mais recente primeiro, comportamento LIFO.",alternativas:[{id:201,ordem:1,texto:"Pilha",correta:!0},{id:202,ordem:2,texto:"Fila",correta:!1},{id:203,ordem:3,texto:"Grafo",correta:!1},{id:204,ordem:4,texto:"Lista ordenada",correta:!1}]}]},{id:18,ordem:3,titulo:"Árvores binárias de busca",xpConcedido:45,conteudo:`Uma **árvore binária** é formada por nós, e cada nó tem no máximo dois filhos (esquerdo e direito). O nó do topo é a **raiz**; nós sem filhos são **folhas**.

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

Visitar esquerda → nó → direita retorna os valores **em ordem crescente**: 20, 30, 40, 50, 70, 80.`,questoes:[{id:52,ordem:1,enunciado:"Em uma BST, onde ficam os valores menores que um nó?",explicacao:"Pela definição, menores à esquerda e maiores à direita.",alternativas:[{id:205,ordem:1,texto:"Sempre na raiz",correta:!1},{id:206,ordem:2,texto:"Em qualquer lado",correta:!1},{id:207,ordem:3,texto:"Na subárvore direita",correta:!1},{id:208,ordem:4,texto:"Na subárvore esquerda",correta:!0}]},{id:53,ordem:2,enunciado:"Inserindo 10, 20, 30, 40, 50 nessa ordem em uma BST sem balanceamento, a busca fica:",explicacao:"Dados ordenados geram uma árvore degenerada, que se comporta como uma lista ligada.",alternativas:[{id:209,ordem:1,texto:"O(n²)",correta:!1},{id:210,ordem:2,texto:"O(log n)",correta:!1},{id:211,ordem:3,texto:"O(n)",correta:!0},{id:212,ordem:4,texto:"O(1)",correta:!1}]},{id:54,ordem:3,enunciado:"Qual percurso de uma BST lista os valores em ordem crescente?",explicacao:"O percurso em ordem visita primeiro os menores (esquerda), depois o nó e então os maiores.",alternativas:[{id:213,ordem:1,texto:"Em ordem (esquerda, nó, direita)",correta:!0},{id:214,ordem:2,texto:"Pré-ordem",correta:!1},{id:215,ordem:3,texto:"Pós-ordem",correta:!1},{id:216,ordem:4,texto:"Por níveis",correta:!1}]}]}]},{id:6,titulo:"Redes de Computadores",area:"Infraestrutura",nivel:"INTERMEDIARIO",descricao:"Camadas TCP/IP, endereçamento IPv4 e os protocolos por trás da web.",modulos:[{id:19,ordem:1,titulo:"Modelo TCP/IP",xpConcedido:30,conteudo:`Para organizar a comunicação em rede, os protocolos são divididos em **camadas**. Cada camada usa os serviços da camada de baixo e oferece serviços à de cima.

## As camadas do TCP/IP

- **Aplicação**: protocolos usados pelos programas: HTTP, DNS, SMTP, FTP
- **Transporte**: comunicação entre processos, identificados por **portas**. TCP e UDP
- **Internet (rede)**: endereçamento e roteamento entre redes: **IP**
- **Acesso à rede (enlace/física)**: transmissão no meio físico: Ethernet, Wi-Fi

## TCP x UDP

- **TCP**: orientado à conexão (handshake de 3 vias), garante entrega e ordem, retransmite pacotes perdidos. Usado em páginas web, e-mail, transferência de arquivos
- **UDP**: sem conexão, sem garantia de entrega, com baixa latência. Usado em streaming de vídeo, jogos online, chamadas de voz e DNS

O modelo **OSI** tem 7 camadas e é usado como referência teórica; o TCP/IP é o que roda na internet.`,questoes:[{id:55,ordem:1,enunciado:"Em qual camada do modelo TCP/IP fica o protocolo HTTP?",explicacao:"HTTP é usado diretamente pelos programas (navegador e servidor): camada de aplicação.",alternativas:[{id:217,ordem:1,texto:"Internet",correta:!1},{id:218,ordem:2,texto:"Transporte",correta:!1},{id:219,ordem:3,texto:"Acesso à rede",correta:!1},{id:220,ordem:4,texto:"Aplicação",correta:!0}]},{id:56,ordem:2,enunciado:"Qual protocolo é mais adequado para um jogo online em tempo real?",explicacao:"Em tempo real, um pacote atrasado já não serve; a baixa latência do UDP vale mais que a retransmissão.",alternativas:[{id:221,ordem:1,texto:"FTP",correta:!1},{id:222,ordem:2,texto:"TCP, pela garantia de entrega",correta:!1},{id:223,ordem:3,texto:"SMTP",correta:!1},{id:224,ordem:4,texto:"UDP, pela baixa latência",correta:!0}]},{id:57,ordem:3,enunciado:"O que o TCP faz e o UDP não faz?",explicacao:"Ambos usam portas e IP, mas só o TCP tem conexão, confirmação e retransmissão.",alternativas:[{id:225,ordem:1,texto:"Funciona sobre IP",correta:!1},{id:226,ordem:2,texto:"Estabelece conexão e garante a entrega ordenada",correta:!0},{id:227,ordem:3,texto:"Transporta dados de aplicações",correta:!1},{id:228,ordem:4,texto:"Usa portas",correta:!1}]}]},{id:20,ordem:2,titulo:"Endereçamento IPv4",xpConcedido:30,conteudo:`Um endereço **IPv4** tem 32 bits, escritos em quatro octetos decimais: \`192.168.0.10\`.

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
- **Gateway padrão**: o roteador por onde o tráfego sai da rede local`,questoes:[{id:58,ordem:1,enunciado:"Quantos hosts utilizáveis existem em uma rede /24?",explicacao:"São 256 endereços, menos o de rede e o de broadcast: 254 hosts.",alternativas:[{id:229,ordem:1,texto:"256",correta:!1},{id:230,ordem:2,texto:"255",correta:!1},{id:231,ordem:3,texto:"254",correta:!0},{id:232,ordem:4,texto:"24",correta:!1}]},{id:59,ordem:2,enunciado:"Qual destes é um endereço IP privado?",explicacao:"192.168.0.0/16 é uma das faixas privadas; os demais são públicos.",alternativas:[{id:233,ordem:1,texto:"192.168.1.15",correta:!0},{id:234,ordem:2,texto:"1.1.1.1",correta:!1},{id:235,ordem:3,texto:"8.8.8.8",correta:!1},{id:236,ordem:4,texto:"200.150.10.1",correta:!1}]},{id:60,ordem:3,enunciado:"O que o endereço 127.0.0.1 representa?",explicacao:"127.0.0.1 é o loopback: a máquina falando com ela mesma.",alternativas:[{id:237,ordem:1,texto:"O broadcast da rede",correta:!1},{id:238,ordem:2,texto:"O roteador da rede",correta:!1},{id:239,ordem:3,texto:"A própria máquina (localhost)",correta:!0},{id:240,ordem:4,texto:"O servidor DNS",correta:!1}]}]},{id:21,ordem:3,titulo:"HTTP e DNS",xpConcedido:35,conteudo:`## DNS

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

O **HTTPS** é o HTTP sobre TLS: os dados trafegam criptografados.`,questoes:[{id:61,ordem:1,enunciado:"Qual a função do DNS?",explicacao:"O DNS resolve nomes em IPs. Atribuir IPs automaticamente é papel do DHCP.",alternativas:[{id:241,ordem:1,texto:"Armazenar as páginas em cache",correta:!1},{id:242,ordem:2,texto:"Atribuir IPs aos computadores da rede",correta:!1},{id:243,ordem:3,texto:"Traduzir nomes de domínio em endereços IP",correta:!0},{id:244,ordem:4,texto:"Criptografar as páginas",correta:!1}]},{id:62,ordem:2,enunciado:"Um aluno logado tenta acessar o painel de administrador e é barrado. Qual status a API deve retornar?",explicacao:"Ele está autenticado (não é 401), mas não tem permissão para o recurso: 403.",alternativas:[{id:245,ordem:1,texto:"401 Unauthorized",correta:!1},{id:246,ordem:2,texto:"403 Forbidden",correta:!0},{id:247,ordem:3,texto:"404 Not Found",correta:!1},{id:248,ordem:4,texto:"500 Internal Server Error",correta:!1}]},{id:63,ordem:3,enunciado:"Por que uma API REST envia o token de autenticação em toda requisição?",explicacao:"Sem estado no protocolo, cada requisição precisa carregar a identificação do usuário.",alternativas:[{id:249,ordem:1,texto:"Porque o HTTP é sem estado e não lembra requisições anteriores",correta:!0},{id:250,ordem:2,texto:"Para criptografar o corpo da requisição",correta:!1},{id:251,ordem:3,texto:"Para deixar a resposta mais rápida",correta:!1},{id:252,ordem:4,texto:"Porque o DNS exige",correta:!1}]}]}]},{id:7,titulo:"Desenvolvimento Web",area:"Web",nivel:"INICIANTE",descricao:"HTML semântico, layouts com CSS Flexbox e interação com JavaScript.",modulos:[{id:22,ordem:1,titulo:"HTML semântico",xpConcedido:20,conteudo:'O **HTML** estrutura o conteúdo da página por meio de **tags**. HTML **semântico** usa a tag que descreve o significado do conteúdo, não só a aparência.\n\n## Estrutura de uma página\n\n```\n<header>   cabeçalho, logotipo e menu\n<nav>      navegação principal\n<main>     conteúdo principal (um por página)\n<section>  seção temática\n<article>  conteúdo independente (um post, um cartão)\n<footer>   rodapé\n```\n\n## Por que importa\n\n- **Acessibilidade**: leitores de tela usam as tags para navegar pela página\n- **SEO**: buscadores entendem melhor a hierarquia do conteúdo\n- **Manutenção**: o código fica autoexplicativo\n\n## Boas práticas\n\n- Use títulos em ordem (`h1` → `h2` → `h3`), com um único `h1` por página\n- Toda imagem informativa precisa de `alt`: `<img src="logo.png" alt="Logo do FatecLab">`\n- Use `<button>` para ações e `<a>` para navegação\n- Em formulários, ligue cada `<label>` ao seu campo com `for` e `id`',questoes:[{id:64,ordem:1,enunciado:"Qual tag representa o conteúdo principal e único da página?",explicacao:"<main> marca o conteúdo principal; deve existir apenas um por página.",alternativas:[{id:253,ordem:1,texto:"<main>",correta:!0},{id:254,ordem:2,texto:"<div>",correta:!1},{id:255,ordem:3,texto:"<header>",correta:!1},{id:256,ordem:4,texto:"<section>",correta:!1}]},{id:65,ordem:2,enunciado:"Para que serve o atributo alt em uma imagem?",explicacao:"O texto alternativo garante acessibilidade e aparece se a imagem falhar.",alternativas:[{id:257,ordem:1,texto:"Criar um link",correta:!1},{id:258,ordem:2,texto:"Definir o tamanho da imagem",correta:!1},{id:259,ordem:3,texto:"Descrever a imagem para leitores de tela e quando ela não carrega",correta:!0},{id:260,ordem:4,texto:"Aplicar um filtro de cor",correta:!1}]},{id:66,ordem:3,enunciado:'Qual elemento usar para um botão "Enviar respostas" que dispara uma ação?',explicacao:"<button> é focável pelo teclado e anunciado como botão. <a> é para navegação.",alternativas:[{id:261,ordem:1,texto:"<span>",correta:!1},{id:262,ordem:2,texto:"<div>",correta:!1},{id:263,ordem:3,texto:"<a>",correta:!1},{id:264,ordem:4,texto:"<button>",correta:!0}]}]},{id:23,ordem:2,titulo:"CSS e Flexbox",xpConcedido:20,conteudo:`O **CSS** define a aparência dos elementos. Uma regra tem **seletor** e **declarações**:

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
\`\`\``,questoes:[{id:67,ordem:1,enunciado:"No modelo de caixa, qual propriedade define o espaço interno entre o conteúdo e a borda?",explicacao:"padding é interno; margin é o espaço externo, fora da borda.",alternativas:[{id:265,ordem:1,texto:"margin",correta:!1},{id:266,ordem:2,texto:"outline",correta:!1},{id:267,ordem:3,texto:"gap",correta:!1},{id:268,ordem:4,texto:"padding",correta:!0}]},{id:68,ordem:2,enunciado:"Em um container flex com flex-direction: row, qual propriedade centraliza os itens verticalmente?",explicacao:"Em row, o eixo cruzado é o vertical, controlado por align-items.",alternativas:[{id:269,ordem:1,texto:"vertical-align: middle",correta:!1},{id:270,ordem:2,texto:"text-align: center",correta:!1},{id:271,ordem:3,texto:"align-items: center",correta:!0},{id:272,ordem:4,texto:"justify-content: center",correta:!1}]},{id:69,ordem:3,enunciado:"O que significa a abordagem mobile first?",explicacao:"O estilo base atende o celular, e min-width acrescenta ajustes para telas maiores.",alternativas:[{id:273,ordem:1,texto:"Escrever os estilos para telas pequenas primeiro e ampliar com media queries",correta:!0},{id:274,ordem:2,texto:"Criar só a versão para celular",correta:!1},{id:275,ordem:3,texto:"Usar apenas aplicativos nativos",correta:!1},{id:276,ordem:4,texto:"Testar somente no celular",correta:!1}]}]},{id:24,ordem:3,titulo:"JavaScript e o DOM",xpConcedido:25,conteudo:`O **JavaScript** dá comportamento à página. Ele manipula o **DOM** (Document Object Model), a árvore de objetos que o navegador cria a partir do HTML.

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

Frameworks como o **React**, usado no FatecLab, atualizam o DOM automaticamente quando o estado muda.`,questoes:[{id:70,ordem:1,enunciado:"O que é o DOM?",explicacao:"O navegador transforma o HTML em uma árvore de objetos que o JavaScript pode manipular.",alternativas:[{id:277,ordem:1,texto:"Um servidor web",correta:!1},{id:278,ordem:2,texto:"Um banco de dados do navegador",correta:!1},{id:279,ordem:3,texto:"A representação em árvore de objetos da página HTML",correta:!0},{id:280,ordem:4,texto:"Uma linguagem de estilos",correta:!1}]},{id:71,ordem:2,enunciado:"Qual método registra uma função para ser executada quando o usuário clicar em um botão?",explicacao:"addEventListener associa uma função (handler) a um evento do elemento.",alternativas:[{id:281,ordem:1,texto:'botao.querySelector("click")',correta:!1},{id:282,ordem:2,texto:'botao.fetch("click")',correta:!1},{id:283,ordem:3,texto:"botao.onClickRun()",correta:!1},{id:284,ordem:4,texto:'botao.addEventListener("click", ...)',correta:!0}]},{id:72,ordem:3,enunciado:"Qual declaração usar para um valor que não será reatribuído?",explicacao:"const impede a reatribuição e deixa a intenção explícita.",alternativas:[{id:285,ordem:1,texto:"static",correta:!1},{id:286,ordem:2,texto:"const",correta:!0},{id:287,ordem:3,texto:"let",correta:!1},{id:288,ordem:4,texto:"var",correta:!1}]}]}]}],W=[{id:1,nome:"Administrador FatecLab",email:"admin@fatec.sp.gov.br",papel:"ADMINISTRADOR",apelido:null,xp:0,ofensiva:0,maiorOfensiva:0,diasAtras:null,senha:"admin1234"},{id:2,nome:"Aluno Demonstração",email:"aluno@fatec.sp.gov.br",papel:"ALUNO",apelido:"Calouro",xp:0,ofensiva:0,maiorOfensiva:0,diasAtras:null,senha:"aluno1234"},{id:3,nome:"Ana Beatriz Souza",email:"ana.souza@fatec.sp.gov.br",papel:"ALUNO",apelido:"AnaB",xp:1340,ofensiva:12,maiorOfensiva:15,diasAtras:0,senha:"aluno1234"},{id:4,nome:"Rafael Moreira",email:"rafael.moreira@fatec.sp.gov.br",papel:"ALUNO",apelido:"byte_rafa",xp:985,ofensiva:6,maiorOfensiva:9,diasAtras:0,senha:"aluno1234"},{id:5,nome:"Camila Nogueira",email:"camila.nogueira@fatec.sp.gov.br",papel:"ALUNO",apelido:"camila.dev",xp:760,ofensiva:4,maiorOfensiva:7,diasAtras:1,senha:"aluno1234"},{id:6,nome:"Diego Albuquerque",email:"diego.albuquerque@fatec.sp.gov.br",papel:"ALUNO",apelido:"Diego_SQL",xp:545,ofensiva:3,maiorOfensiva:5,diasAtras:0,senha:"aluno1234"},{id:7,nome:"Eduarda Lima",email:"eduarda.lima@fatec.sp.gov.br",papel:"ALUNO",apelido:"Duda",xp:420,ofensiva:0,maiorOfensiva:4,diasAtras:5,senha:"aluno1234"},{id:8,nome:"Felipe Andrade",email:"felipe.andrade@fatec.sp.gov.br",papel:"ALUNO",apelido:"FelipeA",xp:305,ofensiva:2,maiorOfensiva:3,diasAtras:1,senha:"aluno1234"},{id:9,nome:"Gabriela Torres",email:"gabriela.torres@fatec.sp.gov.br",papel:"ALUNO",apelido:"gabi.t",xp:180,ofensiva:1,maiorOfensiva:2,diasAtras:0,senha:"aluno1234"},{id:10,nome:"Heitor Campos",email:"heitor.campos@fatec.sp.gov.br",papel:"ALUNO",apelido:"Heitor",xp:95,ofensiva:0,maiorOfensiva:1,diasAtras:9,senha:"aluno1234"}],_={trilhas:k,usuarios:W},Q="fateclab.demo.estado",G=1,K="fatec.sp.gov.br";function w(){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo"}).format(new Date)}function X(e){const a=new Date(`${w()}T12:00:00`);return a.setDate(a.getDate()-e),a.toISOString().slice(0,10)}function J(e,a){return Math.round((Date.parse(`${a}T12:00:00`)-Date.parse(`${e}T12:00:00`))/864e5)}let b=null;function B(){const e=_;return{versao:G,trilhas:e.trilhas.map(a=>({...a,ativa:!0})),usuarios:e.usuarios.map(({diasAtras:a,...o})=>({...o,ultimaAtividade:a===null?null:X(a)})),progresso:[],proximoId:1e4}}function Y(){if(b)return b;try{const e=localStorage.getItem(Q);if(e){const a=JSON.parse(e);if(a.versao===G)return b=a,a}}catch{}return b=B(),b}function V(){try{localStorage.setItem(Q,JSON.stringify(b))}catch{}}function re(){b=B(),V()}class s extends Error{constructor(a,o){super(o),this.status=a}}const u=(e,a=200)=>({status:a,corpo:e});function y(e){return e.ultimaAtividade&&J(e.ultimaAtividade,w())<=1?e.ofensiva:0}function Z(e){const a=w();e.ultimaAtividade!==a&&(e.ofensiva=e.ultimaAtividade&&J(e.ultimaAtividade,a)===1?e.ofensiva+1:1,e.maiorOfensiva=Math.max(e.maiorOfensiva,e.ofensiva),e.ultimaAtividade=a)}function q(e){const a=I(e.xp);return{id:e.id,nome:e.nome,papel:e.papel,apelido:e.apelido,xpTotal:e.xp,nivel:a,xpInicioNivel:L(a),xpProximoNivel:L(a+1),ofensiva:y(e),maiorOfensiva:e.maiorOfensiva}}const ee=e=>e.modulos.reduce((a,o)=>a+o.xpConcedido,0),C=e=>[...e.modulos].sort((a,o)=>a.ordem-o.ordem);function $(e){return{id:e.id,titulo:e.titulo,area:e.area,nivel:e.nivel,descricao:e.descricao,totalModulos:e.modulos.length,xpTotal:ee(e)}}function S(e){return{...$(e),modulos:C(e).map(a=>({id:a.id,ordem:a.ordem,titulo:a.titulo,xpConcedido:a.xpConcedido,totalQuestoes:a.questoes.length}))}}function A(e){return{trilhaId:e.trilhaId,status:e.status,moduloAtualId:e.moduloAtualId,xpObtidoNaTrilha:e.xpObtido}}function U(e){return e.usuarios.filter(a=>a.papel==="ALUNO").sort((a,o)=>o.xp-a.xp||(a.apelido??"").localeCompare(o.apelido??""))}function v(e,a){const o=a!=null&&a.startsWith("demo-")?Number(a.slice(5)):NaN,r=e.usuarios.find(t=>t.id===o);if(!r)throw new s(401,"Sua sessão expirou. Entre novamente.");return r}function R(e,a){const o=e.trilhas.find(r=>r.id===a&&r.ativa);if(!o)throw new s(404,"Trilha não encontrada ou inativa");return o}function E(e,a,o){const r=R(e,a),t=r.modulos.find(n=>n.id===o);if(!t)throw new s(404,"Módulo não encontrado");return{t:r,m:t}}function T(e,a,o){return e.progresso.find(r=>r.alunoId===a&&r.trilhaId===o)}function D(e,a,o,r){if(a.papel==="ADMINISTRADOR")return;const t=T(e,a.id,o.id);if(!t)throw new s(409,"Inicie a trilha para acessar os módulos");if(t.status==="CONCLUIDA")return;const n=o.modulos.find(i=>i.id===t.moduloAtualId);if(!n||r.ordem>n.ordem)throw new s(409,"Módulo bloqueado: conclua os módulos anteriores")}function M(e,a,o,r,t,n,i){const c=T(e,a.id,o.id);if(!c)throw new s(404,"Trilha ainda não iniciada por este aluno");if(c.moduloAtualId!==r.id)throw new s(409,"Conclua os módulos em ordem: este não é o módulo atual da trilha");const l=r.xpConcedido+i;c.concluidos.push({moduloId:r.id,acertos:t,total:n}),c.xpObtido+=l,a.xp+=l,Z(a);const f=C(o).find(p=>p.ordem>r.ordem);return f?c.moduloAtualId=f.id:(c.status="CONCLUIDA",c.moduloAtualId=null),c}function z(e,a){var r;const o=((r=e.alternativas.find(t=>t.correta))==null?void 0:r.id)??null;return{questaoId:e.id,correta:o!==null&&o===a,alternativaCorretaId:o,explicacao:e.explicacao}}const F=e=>Math.max(1,Math.round(e*.7));function P(e){return typeof e=="string"&&e.trim()?e.trim():null}function H(e,a,o=[]){const r=a.modulos;if(!Array.isArray(r)||r.length===0)throw new s(400,"modulos: trilha deve ter ao menos um módulo");const t=new Set;return r.map(n=>{var f;const i=n;if(t.has(i.ordem))throw new s(422,`Há mais de um módulo com a ordem ${i.ordem}`);if(t.add(i.ordem),!((f=i.titulo)!=null&&f.trim()))throw new s(400,"titulo: o módulo precisa de um título");const c=(i.questoes??[]).map((p,x)=>{if(p.alternativas.filter(d=>d.correta).length!==1)throw new s(422,`Cada questão deve ter exatamente uma alternativa correta (módulo "${i.titulo}")`);return{id:e.proximoId++,ordem:x+1,enunciado:p.enunciado,explicacao:P(p.explicacao),alternativas:p.alternativas.map((d,m)=>({id:e.proximoId++,ordem:m+1,texto:d.texto,correta:d.correta}))}}),l=o.find(p=>p.ordem===i.ordem);return{id:(l==null?void 0:l.id)??e.proximoId++,ordem:i.ordem,titulo:i.titulo,xpConcedido:Number(i.xpConcedido)||0,conteudo:P(i.conteudo),questoes:c}})}const ae=[["POST",/^\/auth\/login$/,({e,corpo:a})=>{const o=e.usuarios.find(r=>r.email.toLowerCase()===String((a==null?void 0:a.email)??"").toLowerCase());if(!o||o.senha!==(a==null?void 0:a.senha))throw new s(401,"E-mail ou senha inválidos");return u({token:`demo-${o.id}`,aluno:q(o)})}],["POST",/^\/auth\/cadastro$/,({e,corpo:a})=>{var i;const o=String((a==null?void 0:a.nome)??"").trim(),r=String((a==null?void 0:a.email)??"").trim(),t=String((a==null?void 0:a.senha)??"");if(!o)throw new s(400,"nome: nome é obrigatório");if(!/^[^@\s]+@[^@\s]+$/.test(r))throw new s(400,"email: e-mail inválido");if(t.length<8)throw new s(400,"senha: senha deve ter ao menos 8 caracteres");if(e.usuarios.some(c=>c.email.toLowerCase()===r.toLowerCase()))throw new s(409,"E-mail já cadastrado");if(((i=r.split("@")[1])==null?void 0:i.toLowerCase())!==K)throw new s(422,"E-mail deve pertencer ao domínio institucional da Fatec");const n={id:e.proximoId++,nome:o,email:r,senha:t,papel:"ALUNO",apelido:o.split(/\s+/)[0]||"Aluno",xp:0,ofensiva:0,maiorOfensiva:0,ultimaAtividade:null};return e.usuarios.push(n),u({token:`demo-${n.id}`,aluno:q(n)},201)}],["GET",/^\/alunos\/me$/,({e,token:a})=>u(q(v(e,a)))],["PATCH",/^\/alunos\/me$/,({e,token:a,corpo:o})=>{const r=v(e,a),t=String((o==null?void 0:o.apelido)??"").trim();if(!t)throw new s(400,"apelido: apelido é obrigatório");return r.apelido=t,u(q(r))}],["GET",/^\/alunos\/me\/progresso$/,({e,token:a})=>{const o=v(e,a);return u(e.progresso.filter(r=>r.alunoId===o.id).map(A))}],["GET",/^\/alunos\/me\/resumo$/,({e,token:a})=>{const o=v(e,a),r=e.progresso.filter(d=>d.alunoId===o.id),t=r.reduce((d,m)=>d+m.concluidos.length,0),n=r.filter(d=>d.status==="CONCLUIDA").length,i=r.reduce((d,m)=>d+m.concluidos.filter(g=>g.total&&g.acertos===g.total).length,0),c=U(e),l=c.findIndex(d=>d.id===o.id)+1,f=q(o),p=[["PRIMEIRO_PASSO","Primeiro passo","Conclua seu primeiro módulo",t>=1],["MARATONISTA","Maratonista","Conclua 10 módulos",t>=10],["TRILHA_COMPLETA","Trilha completa","Conclua uma trilha inteira",n>=1],["GABARITOU","Gabaritou","Acerte todas as questões de um quiz",i>=1],["EM_CHAMAS","Em chamas","Estude 3 dias seguidos",o.maiorOfensiva>=3],["IMPARAVEL","Imparável","Estude 7 dias seguidos",o.maiorOfensiva>=7],["PODIO","Pódio","Fique entre os 3 primeiros do ranking",l>=1&&l<=3&&o.xp>0],["VETERANO","Veterano","Alcance o nível 5",f.nivel>=5]],x=r.map(d=>({pr:d,t:e.trilhas.find(m=>m.id===d.trilhaId&&m.ativa)})).filter(d=>!!d.t).map(({pr:d,t:m})=>({trilhaId:m.id,titulo:m.titulo,area:m.area,nivel:m.nivel,status:d.status,modulosConcluidos:d.concluidos.length,totalModulos:m.modulos.length,xpObtido:d.xpObtido})).sort((d,m)=>+(d.status==="CONCLUIDA")-+(m.status==="CONCLUIDA"));return u({aluno:f,posicaoRanking:l,totalAlunos:c.length,modulosConcluidos:t,trilhasConcluidas:n,quizzesGabaritados:i,trilhas:x,conquistas:p.map(([d,m,g,O])=>({codigo:d,titulo:m,descricao:g,desbloqueada:O}))})}],["GET",/^\/trilhas$/,({e,token:a,query:o})=>{v(e,a);const r=o.get("area"),t=o.get("nivel");return u(e.trilhas.filter(n=>n.ativa&&(!r||n.area===r)&&(!t||n.nivel===t)).map($))}],["GET",/^\/trilhas\/(\d+)$/,({e,token:a,params:o})=>(v(e,a),u(S(R(e,o[0]))))],["POST",/^\/trilhas\/(\d+)\/iniciar$/,({e,token:a,params:o})=>{const r=v(e,a),t=R(e,o[0]);let n=T(e,r.id,t.id);if(!n){const i=C(t)[0];if(!i)throw new s(404,"Trilha sem módulos");n={alunoId:r.id,trilhaId:t.id,status:"EM_ANDAMENTO",moduloAtualId:i.id,xpObtido:0,concluidos:[]},e.progresso.push(n)}return u(A(n))}],["GET",/^\/trilhas\/(\d+)\/modulos\/(\d+)\/licao$/,({e,token:a,params:o})=>{const r=v(e,a),{t,m:n}=E(e,o[0],o[1]);return D(e,r,t,n),u({id:n.id,trilhaId:t.id,ordem:n.ordem,titulo:n.titulo,conteudo:n.conteudo,xpConcedido:n.xpConcedido,minimoParaAprovacao:F(n.questoes.length),questoes:n.questoes.map(i=>({id:i.id,ordem:i.ordem,enunciado:i.enunciado,alternativas:i.alternativas.map(c=>({id:c.id,texto:c.texto}))}))})}],["POST",/^\/trilhas\/(\d+)\/modulos\/(\d+)\/questoes\/(\d+)\/verificar$/,({e,token:a,params:o,corpo:r})=>{const t=v(e,a),{t:n,m:i}=E(e,o[0],o[1]);D(e,t,n,i);const c=i.questoes.find(l=>l.id===o[2]);if(!c)throw new s(404,"Questão não encontrada");return u(z(c,Number(r==null?void 0:r.alternativaId)))}],["POST",/^\/trilhas\/(\d+)\/modulos\/(\d+)\/responder$/,({e,token:a,params:o,corpo:r})=>{const t=v(e,a),{t:n,m:i}=E(e,o[0],o[1]);if(i.questoes.length===0)throw new s(409,"Este módulo não possui quiz");const c=T(e,t.id,n.id);if(!c)throw new s(404,"Trilha ainda não iniciada por este aluno");if(c.moduloAtualId!==i.id)throw new s(409,"Conclua os módulos em ordem: este não é o módulo atual da trilha");const l=new Map(((r==null?void 0:r.respostas)??[]).map(h=>[Number(h.questaoId),Number(h.alternativaId)])),f=i.questoes.map(h=>z(h,l.get(h.id))),p=f.filter(h=>h.correta).length,x=i.questoes.length,d=F(x),m=p>=d,g=I(t.xp);let O=0;return m&&(O=p===x?Math.round(i.xpConcedido*.2):0,M(e,t,n,i,p,x,O)),u({aprovado:m,acertos:p,totalQuestoes:x,minimoParaAprovacao:d,xpGanho:m?i.xpConcedido+O:0,bonusGabarito:O,subiuDeNivel:I(t.xp)>g,correcao:f,progresso:A(c),aluno:q(t)})}],["POST",/^\/trilhas\/(\d+)\/modulos\/(\d+)\/concluir$/,({e,token:a,params:o})=>{const r=v(e,a),{t,m:n}=E(e,o[0],o[1]);if(n.questoes.length>0)throw new s(409,"Este módulo tem quiz: responda às questões para concluí-lo");return u(A(M(e,r,t,n,null,null,0)))}],["GET",/^\/ranking$/,({e,token:a})=>{const o=v(e,a);return u({entradas:U(e).map((r,t)=>({posicao:t+1,apelido:r.apelido,xpTotal:r.xp,ehVoce:r.id===o.id,nivel:I(r.xp),ofensiva:y(r)}))})}],["GET",/^\/admin\/trilhas\/(\d+)$/,({e,token:a,params:o})=>{N(e,a);const r=e.trilhas.find(t=>t.id===o[0]);if(!r)throw new s(404,"Trilha não encontrada");return u({...r,modulos:C(r)})}],["POST",/^\/admin\/trilhas$/,({e,token:a,corpo:o})=>{N(e,a),j(o);const r={id:e.proximoId++,titulo:o.titulo,area:o.area,nivel:o.nivel,descricao:P(o.descricao),ativa:!0,modulos:H(e,o)};return e.trilhas.push(r),u(S(r),201)}],["PUT",/^\/admin\/trilhas\/(\d+)$/,({e,token:a,params:o,corpo:r})=>{N(e,a),j(r);const t=e.trilhas.find(i=>i.id===o[0]);if(!t)throw new s(404,"Trilha não encontrada");const n=H(e,r,t.modulos);for(const i of t.modulos){if(n.some(l=>l.id===i.id))continue;if(e.progresso.some(l=>l.moduloAtualId===i.id||l.concluidos.some(f=>f.moduloId===i.id)))throw new s(409,`O módulo "${i.titulo}" já tem progresso de alunos e não pode ser excluído`)}return Object.assign(t,{titulo:r.titulo,area:r.area,nivel:r.nivel,descricao:P(r.descricao),modulos:n}),u(S(t))}],["DELETE",/^\/admin\/trilhas\/(\d+)$/,({e,token:a,params:o})=>{N(e,a);const r=e.trilhas.find(t=>t.id===o[0]);if(!r)throw new s(404,"Trilha não encontrada");return r.ativa=!1,u(void 0,204)}],["GET",/^\/saude$/,()=>u({status:"ok"})]];function N(e,a){if(v(e,a).papel!=="ADMINISTRADOR")throw new s(403,"Acesso negado para este recurso")}function j(e){var a,o;if(!((a=e==null?void 0:e.titulo)!=null&&a.trim()))throw new s(400,"titulo: informe o título da trilha");if(!((o=e==null?void 0:e.area)!=null&&o.trim()))throw new s(400,"area: informe a área da trilha");if(!["INICIANTE","INTERMEDIARIO","AVANCADO"].includes(e==null?void 0:e.nivel))throw new s(400,"nivel: nível inválido")}async function te(e,a,o,r){await new Promise(c=>setTimeout(c,120));const[t,n]=e.split("?"),i=Y();for(const[c,l,f]of ae){if(c!==a)continue;const p=t.match(l);if(p)try{const x=o===void 0?void 0:JSON.parse(JSON.stringify(o)),d=f({e:i,corpo:x,token:r,params:p.slice(1).map(Number),query:new URLSearchParams(n)});return V(),JSON.parse(JSON.stringify(d))}catch(x){if(x instanceof s)return{status:x.status,corpo:{mensagem:x.message}};throw x}}return{status:404,corpo:{mensagem:`Rota não encontrada: ${a} ${t}`}}}export{te as mockFetch,re as reiniciarDemo};
