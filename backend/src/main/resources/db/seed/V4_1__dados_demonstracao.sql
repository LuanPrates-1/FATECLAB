-- GERADO AUTOMATICAMENTE por frontend/scripts/gerar-dados-demo.mjs a partir de conteudo/trilhas.mjs.
-- Não edite à mão: altere o conteúdo e rode `npm run gerar:dados` na pasta frontend.
-- Dados de demonstração (trilhas, lições, quizzes e usuários fictícios).

INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (1, 'Administrador FatecLab', 'admin@fatec.sp.gov.br', '$2a$10$XShOfB/SIXF34HkhzzdBHO7yin2SZjp.R7EMEsApgAd0LjpdQni8i', 'ADMINISTRADOR', NULL, 0, 0, 0, NULL);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (2, 'Aluno Demonstração', 'aluno@fatec.sp.gov.br', '$2a$10$NY8nvT5CNKPzwOGYf.hQAezsSLK8agPLbP6hwEwQP2FZzspigRYJa', 'ALUNO', 'Calouro', 0, 0, 0, NULL);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (3, 'Ana Beatriz Souza', 'ana.souza@fatec.sp.gov.br', '$2a$10$IHx5XrBdZIPRKBaKg3M7.u.VRQ2ppbxl4Zzyw9zKypcGcoWHAVSF2', 'ALUNO', 'AnaB', 1340, 12, 15, CURRENT_DATE);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (4, 'Rafael Moreira', 'rafael.moreira@fatec.sp.gov.br', '$2a$10$tZ7PhXuQumNjQoiHhuJoQu/LRmWUMZiT0qVnrrEEjmsepRdL0521i', 'ALUNO', 'byte_rafa', 985, 6, 9, CURRENT_DATE);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (5, 'Camila Nogueira', 'camila.nogueira@fatec.sp.gov.br', '$2a$10$kHVNOl4RJTEMtBRgmh2Av.hsCIeTV3/W0Bxe5aNPBJ9tWnzhkb9h2', 'ALUNO', 'camila.dev', 760, 4, 7, DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY));
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (6, 'Diego Albuquerque', 'diego.albuquerque@fatec.sp.gov.br', '$2a$10$xL77pwc3c2tmtqUZ0Wu8oOPuLyTtZR7yAypVOKzx8S0XOg4/l1Noy', 'ALUNO', 'Diego_SQL', 545, 3, 5, CURRENT_DATE);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (7, 'Eduarda Lima', 'eduarda.lima@fatec.sp.gov.br', '$2a$10$5u3T/JVLrBe6SydfmxK99uM3hleKxyesmbSXF3tomYaL9ZKavSzyi', 'ALUNO', 'Duda', 420, 0, 4, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY));
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (8, 'Felipe Andrade', 'felipe.andrade@fatec.sp.gov.br', '$2a$10$6JYbILa/LJyYqGP8sW/LDu66UW67jc9Kv8k3YHknU.7ivkd5F4aEe', 'ALUNO', 'FelipeA', 305, 2, 3, DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY));
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (9, 'Gabriela Torres', 'gabriela.torres@fatec.sp.gov.br', '$2a$10$IXu7Q2aClv9S2h2exdGuKeArmphIFrwF4l.R.N50g.PuEkoiQt.ka', 'ALUNO', 'gabi.t', 180, 1, 2, CURRENT_DATE);
INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (10, 'Heitor Campos', 'heitor.campos@fatec.sp.gov.br', '$2a$10$L.9CU4mAxCKYneDns3jwRubHFf6fdOX/oSt2hSl7XJaGY0ynzE9tC', 'ALUNO', 'Heitor', 95, 0, 1, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY));

-- Trilha 1: Lógica de Programação
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (1, 'Lógica de Programação', 'Programação', 'INICIANTE', 'Do algoritmo ao código: variáveis, operadores, decisões e repetições. A base para qualquer linguagem.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (1, 1, 1, 'Algoritmos e variáveis', 'Um **algoritmo** é uma sequência finita e ordenada de passos que resolve um problema. Uma receita de bolo é um algoritmo: tem entrada (ingredientes), processamento (modo de preparo) e saída (o bolo).

## Variáveis

Programas guardam dados em **variáveis**: espaços na memória identificados por um nome. Cada variável tem um **tipo**, que define o que ela pode armazenar:

- **inteiro**: números sem casas decimais (idade, quantidade)
- **real**: números com casas decimais (preço, média)
- **texto** (string): sequências de caracteres (nome, e-mail)
- **lógico** (booleano): verdadeiro ou falso

```
idade = 19
media = 7.5
nome = "Luan"
aprovado = verdadeiro
```

## Atribuição

O sinal `=` na maioria das linguagens significa **atribuição**, não igualdade: "guarde o valor da direita na variável da esquerda". Por isso `x = x + 1` faz sentido: pega o valor atual de x, soma 1 e guarda de volta.', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (1, 1, 1, 'O que melhor define um algoritmo?', 'Algoritmo é a sequência de passos em si, independente da linguagem. O programa é a implementação do algoritmo em uma linguagem.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (1, 1, 1, 'Uma sequência finita e ordenada de passos para resolver um problema', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (2, 1, 2, 'Um componente físico do computador', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (3, 1, 3, 'Um programa escrito obrigatoriamente em Java', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (4, 1, 4, 'Um tipo de variável que guarda textos', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (2, 1, 2, 'Qual tipo de dado é o mais adequado para guardar o preço de um produto, como 19,90?', 'Preços têm casas decimais, por isso o tipo real (float/double) é o adequado.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (5, 2, 1, 'Lógico', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (6, 2, 2, 'Inteiro', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (7, 2, 3, 'Texto', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (8, 2, 4, 'Real', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (3, 1, 3, 'Se x vale 4, quanto x passa a valer depois da instrução x = x + 1?', 'O lado direito é calculado primeiro (4 + 1 = 5) e o resultado é atribuído de volta a x.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (9, 3, 1, '4', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (10, 3, 2, '1', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (11, 3, 3, 'A instrução é inválida', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (12, 3, 4, '5', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (2, 1, 2, 'Operadores e expressões', 'Operadores combinam valores para formar **expressões**.

## Aritméticos

- `+` soma, `-` subtração, `*` multiplicação, `/` divisão
- `%` **resto da divisão** (módulo): `10 % 3` resulta em 1

A precedência segue a matemática: multiplicação e divisão antes de soma e subtração. Use parênteses para deixar a intenção clara: `(nota1 + nota2) / 2`.

## Relacionais

Comparam valores e sempre resultam em verdadeiro ou falso: `==` (igual), `!=` (diferente), `>`, `<`, `>=`, `<=`.

## Lógicos

- **E** (`&&`): verdadeiro só se as duas condições forem verdadeiras
- **OU** (`||`): verdadeiro se pelo menos uma for verdadeira
- **NÃO** (`!`): inverte o valor

```
podeVotar = idade >= 16
aprovado = media >= 6 && frequencia >= 75
```

Um uso clássico do operador `%`: um número é par quando `numero % 2 == 0`.', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (4, 2, 1, 'Qual é o resultado de 17 % 5?', '17 dividido por 5 dá 3 com resto 2. O operador % devolve o resto: 2.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (13, 4, 1, '12', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (14, 4, 2, '2', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (15, 4, 3, '3,4', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (16, 4, 4, '3', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (5, 2, 2, 'Qual é o valor da expressão 2 + 3 * 4?', 'A multiplicação tem precedência: 3 * 4 = 12, depois 2 + 12 = 14.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (17, 5, 1, '20', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (18, 5, 2, '24', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (19, 5, 3, '14', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (20, 5, 4, '9', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (6, 2, 3, 'Com media = 7 e frequencia = 70, qual é o resultado de (media >= 6 && frequencia >= 75)?', 'A primeira condição é verdadeira, mas a segunda é falsa (70 < 75). Com o operador E, basta uma falsa para o resultado ser falso.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (21, 6, 1, 'Falso', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (22, 6, 2, 'Erro de execução', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (23, 6, 3, 'Verdadeiro', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (24, 6, 4, '7', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (3, 1, 3, 'Estruturas de decisão', 'Estruturas de decisão permitem que o programa siga caminhos diferentes conforme uma condição.

## Se / senão

```
se (media >= 6) {
    escreva("Aprovado")
} senão se (media >= 4) {
    escreva("Exame")
} senão {
    escreva("Reprovado")
}
```

O programa testa as condições **de cima para baixo** e executa apenas o primeiro bloco cuja condição for verdadeira. Por isso a ordem das condições importa.

## Escolha (switch)

Quando a decisão depende de um único valor com várias opções fixas, a estrutura **escolha/caso** (switch) costuma ser mais legível:

```
escolha (opcao) {
    caso 1: cadastrar()
    caso 2: listar()
    padrão: escreva("Opção inválida")
}
```

## Boas práticas

- Evite aninhar muitos "se" uns dentro dos outros: extraia funções ou combine condições
- Cubra o caso "senão": o que acontece quando nenhuma condição é verdadeira?', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (7, 3, 1, 'No código do exemplo (aprovado com média >= 6, exame com média >= 4), o que é exibido para média 5?', '5 não é >= 6, então o primeiro teste falha. 5 é >= 4, então o segundo bloco é executado: Exame.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (25, 7, 1, 'Nada é exibido', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (26, 7, 2, 'Aprovado', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (27, 7, 3, 'Reprovado', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (28, 7, 4, 'Exame', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (8, 3, 2, 'Quando a estrutura escolha/caso (switch) é mais indicada?', 'O switch compara um mesmo valor contra vários casos, como as opções de um menu.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (29, 8, 1, 'Para declarar variáveis', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (30, 8, 2, 'Quando a decisão depende de um único valor com várias opções fixas', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (31, 8, 3, 'Quando há apenas uma condição verdadeira ou falsa', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (32, 8, 4, 'Para repetir um bloco várias vezes', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (9, 3, 3, 'Em uma cadeia se / senão se / senão, quantos blocos são executados no máximo?', 'A cadeia para no primeiro bloco verdadeiro. Se nenhum for, executa o senão. Sempre um bloco, no máximo.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (33, 9, 1, 'Todos os que forem verdadeiros', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (34, 9, 2, 'Exatamente dois', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (35, 9, 3, 'Apenas um', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (36, 9, 4, 'Nenhum', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (4, 1, 4, 'Estruturas de repetição', 'Laços (loops) repetem um bloco de código enquanto uma condição for verdadeira.

## Enquanto (while)

Testa a condição **antes** de cada repetição. Se ela já começar falsa, o bloco nunca executa.

```
contador = 1
enquanto (contador <= 5) {
    escreva(contador)
    contador = contador + 1
}
```

## Para (for)

Ideal quando sabemos quantas vezes repetir. Reúne inicialização, condição e incremento em uma linha:

```
para (i = 0; i < 10; i++) {
    soma = soma + i
}
```

## Faça-enquanto (do-while)

Executa o bloco **pelo menos uma vez** e só depois testa a condição. Útil em menus: mostra as opções e repete enquanto o usuário não escolher "sair".

## Cuidado com o laço infinito

Se nada dentro do laço altera a condição, ele nunca termina. No exemplo do "enquanto", esquecer `contador = contador + 1` trava o programa.', 25);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (10, 4, 1, 'Quantas vezes o bloco de um laço para (i = 0; i < 10; i++) é executado?', 'i assume os valores 0 a 9, ou seja, 10 execuções. Quando i chega a 10, a condição i < 10 é falsa.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (37, 10, 1, 'Infinitas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (38, 10, 2, '9', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (39, 10, 3, '10', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (40, 10, 4, '11', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (11, 4, 2, 'Qual laço garante que o bloco execute pelo menos uma vez?', 'O faça-enquanto executa o bloco e só depois testa a condição.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (41, 11, 1, 'Nenhum deles', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (42, 11, 2, 'enquanto (while)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (43, 11, 3, 'faça-enquanto (do-while)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (44, 11, 4, 'para (for)', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (12, 4, 3, 'O que provoca um laço infinito?', 'Se nada altera a condição, ela continua verdadeira para sempre e o laço não termina.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (45, 12, 1, 'A condição de parada nunca se tornar falsa', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (46, 12, 2, 'Usar mais de uma condição no laço', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (47, 12, 3, 'Declarar variáveis dentro do laço', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (48, 12, 4, 'Usar o laço para em vez do enquanto', FALSE);

-- Trilha 2: SQL Essencial
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (2, 'SQL Essencial', 'Banco de Dados', 'INICIANTE', 'Modelo relacional e as consultas que você mais vai usar: SELECT, filtros, JOINs e agregações.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (5, 2, 1, 'O modelo relacional', 'Em um banco de dados relacional, os dados ficam organizados em **tabelas**. Cada tabela tem **colunas** (atributos) e **linhas** (registros).

## Chave primária

A **chave primária** (PK) identifica cada linha de forma única. Ela não pode repetir nem ser nula. Exemplo: o `id` de um aluno, ou o RA.

## Chave estrangeira

A **chave estrangeira** (FK) é uma coluna que referencia a chave primária de outra tabela. É ela que cria o **relacionamento** entre tabelas.

```
aluno (id PK, nome, email)
matricula (id PK, aluno_id FK -> aluno.id, disciplina_id FK -> disciplina.id)
```

## Cardinalidade

- **1:1**: um aluno tem um único cadastro de acesso
- **1:N**: um curso tem muitos alunos
- **N:N**: alunos cursam muitas disciplinas e disciplinas têm muitos alunos. Na prática, o N:N vira uma **tabela associativa** (como `matricula` acima)', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (13, 5, 1, 'Qual característica é obrigatória em uma chave primária?', 'A chave primária identifica a linha, então não pode se repetir nem ficar vazia.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (49, 13, 1, 'Referenciar outra tabela', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (50, 13, 2, 'Ser única e não nula', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (51, 13, 3, 'Ser sempre do tipo texto', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (52, 13, 4, 'Ser a primeira coluna da tabela', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (14, 5, 2, 'Para que serve uma chave estrangeira?', 'A FK guarda o valor da PK de outra tabela, criando o relacionamento entre elas.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (53, 14, 1, 'Criptografar os dados da tabela', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (54, 14, 2, 'Impedir que a tabela tenha linhas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (55, 14, 3, 'Relacionar uma tabela à chave primária de outra', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (56, 14, 4, 'Acelerar todas as consultas', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (15, 5, 3, 'Como um relacionamento N:N costuma ser implementado no banco?', 'A tabela associativa (ex.: matricula) liga as duas tabelas, cada linha com uma FK para cada lado.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (57, 15, 1, 'Com uma única coluna de texto separada por vírgulas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (58, 15, 2, 'Duplicando as duas tabelas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (59, 15, 3, 'Não é possível representar N:N', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (60, 15, 4, 'Com uma tabela associativa contendo as duas chaves estrangeiras', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (6, 2, 2, 'SELECT e WHERE', 'O comando `SELECT` consulta dados. A estrutura básica é:

```
SELECT nome, email
FROM aluno
WHERE semestre = 3
ORDER BY nome;
```

- **SELECT**: quais colunas (`*` traz todas)
- **FROM**: de qual tabela
- **WHERE**: filtra as linhas
- **ORDER BY**: ordena o resultado (`ASC` crescente, padrão; `DESC` decrescente)

## Filtros úteis

- `AND`, `OR`, `NOT` combinam condições
- `BETWEEN 5 AND 8`: intervalo inclusivo
- `IN (''ADS'', ''GTI'')`: um valor dentro de uma lista
- `LIKE ''Ana%''`: texto que começa com "Ana" (`%` é qualquer sequência de caracteres)
- `IS NULL`: valores ausentes. **Nunca** use `= NULL`, que não funciona

```
SELECT * FROM aluno
WHERE curso IN (''ADS'', ''GTI'') AND email IS NOT NULL
ORDER BY semestre DESC;
```', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (16, 6, 1, 'Qual cláusula filtra as linhas retornadas por uma consulta?', 'WHERE define as condições que cada linha precisa atender para entrar no resultado.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (61, 16, 1, 'WHERE', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (62, 16, 2, 'ORDER BY', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (63, 16, 3, 'FROM', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (64, 16, 4, 'SELECT', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (17, 6, 2, 'Qual filtro encontra os alunos cujo nome começa com "Mar"?', 'Com LIKE, ''Mar%'' significa "Mar" seguido de qualquer coisa. ''%Mar'' seria terminar com Mar.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (65, 17, 1, 'nome IN (''Mar'')', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (66, 17, 2, 'nome = ''Mar%''', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (67, 17, 3, 'nome LIKE ''%Mar''', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (68, 17, 4, 'nome LIKE ''Mar%''', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (18, 6, 3, 'Como selecionar os registros em que a coluna telefone não foi preenchida?', 'NULL representa ausência de valor e não pode ser comparado com =. Use IS NULL / IS NOT NULL.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (69, 18, 1, 'telefone = NULL', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (70, 18, 2, 'telefone == NULL', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (71, 18, 3, 'telefone = ''''', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (72, 18, 4, 'telefone IS NULL', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (7, 2, 3, 'Juntando tabelas com JOIN', 'Como os dados ficam em tabelas separadas, o **JOIN** junta linhas relacionadas em uma única consulta.

## INNER JOIN

Retorna só as linhas que têm correspondência **nas duas** tabelas:

```
SELECT a.nome, c.nome AS curso
FROM aluno a
INNER JOIN curso c ON c.id = a.curso_id;
```

Alunos sem curso (`curso_id` nulo) não aparecem no resultado.

## LEFT JOIN

Retorna **todas** as linhas da tabela da esquerda e, quando não há correspondência, preenche as colunas da direita com NULL:

```
SELECT c.nome, a.nome
FROM curso c
LEFT JOIN aluno a ON a.curso_id = c.id;
```

Aqui aparecem inclusive os cursos sem nenhum aluno.

## Dicas

- A condição do `ON` normalmente liga a FK de uma tabela à PK da outra
- Use **apelidos** (`aluno a`) para deixar a consulta curta e legível
- Esquecer o `ON` gera um **produto cartesiano**: cada linha combinada com todas as outras', 25);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (19, 7, 1, 'O que o INNER JOIN retorna?', 'O INNER JOIN mantém apenas os pares de linhas que satisfazem a condição do ON.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (73, 19, 1, 'Somente as linhas sem correspondência', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (74, 19, 2, 'Todas as linhas da tabela da esquerda', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (75, 19, 3, 'Somente as linhas com correspondência nas duas tabelas', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (76, 19, 4, 'Todas as linhas das duas tabelas', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (20, 7, 2, 'Você quer listar todos os cursos, inclusive os que não têm alunos. Qual JOIN usar (curso à esquerda)?', 'O LEFT JOIN preserva todas as linhas da tabela da esquerda, mesmo sem correspondência.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (77, 20, 1, 'LEFT JOIN', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (78, 20, 2, 'Nenhum, basta um WHERE', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (79, 20, 3, 'INNER JOIN', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (80, 20, 4, 'CROSS JOIN', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (21, 7, 3, 'O que acontece ao juntar duas tabelas sem condição de junção?', 'Sem condição, cada linha de uma tabela é combinada com todas as linhas da outra.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (81, 21, 1, 'Só a primeira linha é retornada', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (82, 21, 2, 'O banco escolhe a chave automaticamente', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (83, 21, 3, 'A consulta retorna vazio', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (84, 21, 4, 'É gerado um produto cartesiano', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (8, 2, 4, 'Agregações e GROUP BY', 'Funções de agregação resumem várias linhas em um valor:

- `COUNT(*)`: quantidade de linhas
- `SUM(coluna)`, `AVG(coluna)`: soma e média
- `MIN(coluna)`, `MAX(coluna)`: menor e maior valor

## GROUP BY

Agrupa as linhas por uma ou mais colunas e aplica a agregação a **cada grupo**:

```
SELECT curso_id, COUNT(*) AS total, AVG(media) AS media_geral
FROM aluno
GROUP BY curso_id;
```

Regra importante: toda coluna no SELECT que não está dentro de uma função de agregação precisa estar no GROUP BY.

## HAVING

O `WHERE` filtra linhas **antes** do agrupamento. O `HAVING` filtra **grupos depois** da agregação:

```
SELECT curso_id, COUNT(*) AS total
FROM aluno
WHERE ativo = TRUE
GROUP BY curso_id
HAVING COUNT(*) > 30;
```

Ordem de execução lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', 25);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (22, 8, 1, 'Qual função conta quantas linhas existem em cada grupo?', 'COUNT(*) conta as linhas. SUM soma os valores de uma coluna numérica.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (85, 22, 1, 'MAX(*)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (86, 22, 2, 'TOTAL(*)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (87, 22, 3, 'SUM(*)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (88, 22, 4, 'COUNT(*)', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (23, 8, 2, 'Qual a diferença entre WHERE e HAVING?', 'WHERE age sobre as linhas originais; HAVING age sobre o resultado das agregações.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (89, 23, 1, 'HAVING só funciona com ORDER BY', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (90, 23, 2, 'WHERE filtra grupos e HAVING filtra linhas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (91, 23, 3, 'WHERE filtra linhas antes do agrupamento e HAVING filtra grupos depois', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (92, 23, 4, 'Não há diferença', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (24, 8, 3, 'Para mostrar apenas os cursos com média geral acima de 7, qual cláusula usar?', 'A condição usa uma agregação (AVG), por isso precisa ficar no HAVING.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (93, 24, 1, 'WHERE AVG(media) > 7', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (94, 24, 2, 'ORDER BY AVG(media) > 7', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (95, 24, 3, 'HAVING AVG(media) > 7', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (96, 24, 4, 'GROUP BY media > 7', FALSE);

-- Trilha 3: Java Orientado a Objetos
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (3, 'Java Orientado a Objetos', 'Programação', 'INTERMEDIARIO', 'Classes, encapsulamento, herança, polimorfismo e interfaces na prática com Java.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (9, 3, 1, 'Classes e objetos', 'Na orientação a objetos, o programa é organizado em torno de **objetos** que reúnem dados e comportamento.

## Classe x objeto

A **classe** é o molde; o **objeto** é uma instância criada a partir dela.

```
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
```

- **Atributos** guardam o estado (nome, xp)
- **Métodos** definem o comportamento (ganharXp)
- `new` cria o objeto na memória

## Construtores

O **construtor** tem o mesmo nome da classe, não tem tipo de retorno e é chamado no `new`. Ele garante que o objeto já nasça em um estado válido:

```
public Aluno(String nome) {
    this.nome = nome;
    this.xp = 0;
}
```

O `this` se refere ao próprio objeto e desfaz a ambiguidade entre o atributo e o parâmetro de mesmo nome.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (25, 9, 1, 'Qual frase descreve corretamente a relação entre classe e objeto?', 'A classe define atributos e métodos; cada new cria um objeto (instância) a partir dela.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (97, 25, 1, 'A classe é o molde e o objeto é uma instância dela', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (98, 25, 2, 'O objeto é o molde e a classe é a instância', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (99, 25, 3, 'Uma classe só pode gerar um objeto', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (100, 25, 4, 'Classe e objeto são sinônimos', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (26, 9, 2, 'Qual característica pertence a um construtor em Java?', 'O construtor tem o nome da classe, não declara retorno e é executado automaticamente no new.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (101, 26, 1, 'Precisa ser chamado manualmente depois do new', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (102, 26, 2, 'Tem o mesmo nome da classe e não declara tipo de retorno', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (103, 26, 3, 'Só pode existir um por projeto', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (104, 26, 4, 'Sempre retorna void', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (27, 9, 3, 'No construtor, para que serve this.nome = nome?', 'this.nome é o atributo do objeto; nome sozinho é o parâmetro recebido.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (105, 27, 1, 'Compara o atributo com o parâmetro', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (106, 27, 2, 'Atribui o parâmetro nome ao atributo nome do objeto', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (107, 27, 3, 'Apaga o valor do atributo', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (108, 27, 4, 'Cria uma nova classe chamada nome', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (10, 3, 2, 'Encapsulamento', '**Encapsular** é esconder os detalhes internos de um objeto e expor só o necessário. Isso protege o estado contra alterações inválidas.

## Modificadores de acesso

- `private`: visível só dentro da própria classe
- (padrão, sem modificador): visível no mesmo pacote
- `protected`: pacote e subclasses
- `public`: visível em qualquer lugar

## Getters e setters com regra

```
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
```

Com `xp` privado, ninguém consegue fazer `aluno.xp = -500`. A única forma de mudar o XP é pelo método, que aplica a regra de negócio.

Encapsular não é criar getter e setter para tudo: exponha **operações com significado** (`ganharXp`), não apenas acesso direto aos campos.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (28, 10, 1, 'Qual modificador restringe o acesso a um atributo apenas à própria classe?', 'private limita o acesso ao código da própria classe.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (109, 28, 1, 'public', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (110, 28, 2, 'private', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (111, 28, 3, 'protected', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (112, 28, 4, 'static', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (29, 10, 2, 'Qual é o principal benefício do encapsulamento?', 'Com o estado privado, toda alteração passa por métodos que validam as regras.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (113, 29, 1, 'Eliminar a necessidade de construtores', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (114, 29, 2, 'Proteger o estado do objeto e centralizar as regras de alteração', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (115, 29, 3, 'Deixar o programa mais rápido', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (116, 29, 4, 'Permitir herança múltipla', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (30, 10, 3, 'No exemplo, o que acontece ao chamar aluno.ganharXp(-10)?', 'O método valida a entrada e lança a exceção para pontos menores ou iguais a zero.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (117, 30, 1, 'O XP vira zero', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (118, 30, 2, 'O XP diminui 10 pontos', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (119, 30, 3, 'Uma IllegalArgumentException é lançada', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (120, 30, 4, 'Nada acontece', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (11, 3, 3, 'Herança e polimorfismo', '## Herança

Uma classe pode **estender** outra e reaproveitar seus atributos e métodos. Em Java, cada classe estende **uma única** classe (`extends`).

```
public class Usuario {
    protected String nome;
    public String saudacao() { return "Olá, " + nome; }
}

public class Professor extends Usuario {
    @Override
    public String saudacao() { return "Olá, prof. " + nome; }
}
```

Herança representa uma relação **"é um"**: um Professor **é um** Usuario.

## Sobrescrita (override)

A subclasse pode redefinir um método herdado. A anotação `@Override` pede ao compilador que confira se o método realmente existe na superclasse.

## Polimorfismo

Uma variável do tipo da superclasse pode guardar qualquer subclasse, e o método executado é o **do objeto real**:

```
Usuario u = new Professor();
u.saudacao(); // "Olá, prof. ..."
```

Isso permite escrever código genérico (uma lista de `Usuario`) que se comporta corretamente para cada tipo concreto.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (31, 11, 1, 'Quantas classes uma classe Java pode estender diretamente?', 'Java tem herança simples de classes. Para combinar contratos, usam-se interfaces.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (121, 31, 1, 'Uma', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (122, 31, 2, 'Duas', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (123, 31, 3, 'Nenhuma', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (124, 31, 4, 'Quantas quiser', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (32, 11, 2, 'Para que serve a anotação @Override?', 'Se a assinatura não corresponder a um método herdado, o compilador acusa erro.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (125, 32, 1, 'Tornar o método privado', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (126, 32, 2, 'Fazer o compilador verificar que o método sobrescreve um da superclasse', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (127, 32, 3, 'Impedir que o método seja herdado', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (128, 32, 4, 'Executar o método duas vezes', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (33, 11, 3, 'Com Usuario u = new Professor(); qual saudacao() é executada?', 'No polimorfismo, o método chamado é decidido pelo objeto real em tempo de execução.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (129, 33, 1, 'A de Usuario, porque é o tipo da variável', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (130, 33, 2, 'As duas, em sequência', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (131, 33, 3, 'Nenhuma, gera erro de compilação', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (132, 33, 4, 'A de Professor, porque é o tipo do objeto', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (12, 3, 4, 'Interfaces e coleções', '## Interfaces

Uma **interface** define um contrato: o que uma classe deve saber fazer, sem dizer como. Uma classe pode implementar **várias** interfaces.

```
public interface Pontuavel {
    int calcularPontos();
}

public class Quiz implements Pontuavel {
    public int calcularPontos() { return acertos * 10; }
}
```

## Coleções

O pacote `java.util` oferece estruturas prontas, todas baseadas em interfaces:

- `List` (ex.: `ArrayList`): ordenada, aceita repetidos, acesso por índice
- `Set` (ex.: `HashSet`): **não aceita elementos repetidos**
- `Map` (ex.: `HashMap`): pares chave → valor

```
List<String> trilhas = new ArrayList<>();
trilhas.add("SQL");
Map<String, Integer> xpPorAluno = new HashMap<>();
xpPorAluno.put("luan", 120);
```

Declarar a variável pelo tipo da interface (`List`) e não pela implementação (`ArrayList`) deixa o código flexível para trocar a implementação depois.', 35);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (34, 12, 1, 'Qual afirmação sobre interfaces em Java está correta?', 'A herança de classe é simples, mas uma classe pode implementar quantas interfaces precisar.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (133, 34, 1, 'Uma classe só pode implementar uma interface', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (134, 34, 2, 'Uma interface pode ser instanciada com new', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (135, 34, 3, 'Interfaces guardam o estado dos objetos', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (136, 34, 4, 'Uma classe pode implementar várias interfaces', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (35, 12, 2, 'Qual coleção é a mais adequada para guardar e-mails sem permitir repetidos?', 'Set não aceita elementos duplicados; HashSet é a implementação mais comum.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (137, 35, 1, 'LinkedList', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (138, 35, 2, 'ArrayList', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (139, 35, 3, 'HashSet', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (140, 35, 4, 'Array de String', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (36, 12, 3, 'Qual estrutura associa uma chave (como o apelido) a um valor (como o XP)?', 'Map guarda pares chave → valor, com busca rápida pela chave.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (141, 36, 1, 'Set', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (142, 36, 2, 'Queue', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (143, 36, 3, 'List', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (144, 36, 4, 'Map', TRUE);

-- Trilha 4: Requisitos e UML
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (4, 'Requisitos e UML', 'Engenharia de Software', 'INICIANTE', 'Como levantar, escrever e modelar requisitos: casos de uso e diagrama de classes.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (13, 4, 1, 'Requisitos funcionais e não funcionais', '**Requisitos** descrevem o que um sistema deve fazer e sob quais condições. São o ponto de partida de qualquer projeto, inclusive do seu TCC.

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
- Sem ambiguidade: evite "fácil", "amigável", "etc."', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (37, 13, 1, '"O sistema deve permitir que o aluno altere seu apelido" é um requisito:', 'Descreve uma função que o usuário realiza no sistema, então é funcional.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (145, 37, 1, 'Não funcional', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (146, 37, 2, 'Regra de negócio de banco', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (147, 37, 3, 'De hardware', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (148, 37, 4, 'Funcional', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (38, 13, 2, 'Qual destes é um requisito não funcional?', 'Tempo de resposta é uma qualidade (desempenho), não uma função do sistema.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (149, 38, 1, 'As páginas devem carregar em até 2 segundos em conexão 4G', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (150, 38, 2, 'O aluno deve responder quizzes', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (151, 38, 3, 'O sistema deve exibir o ranking', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (152, 38, 4, 'O administrador deve cadastrar trilhas', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (39, 13, 3, 'Qual requisito está mais bem escrito?', 'É específico e verificável: dá para testar exatamente se o comportamento acontece.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (153, 39, 1, 'O sistema deve ser rápido', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (154, 39, 2, 'O sistema deve ser fácil de usar etc.', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (155, 39, 3, 'O sistema deve bloquear o login após 5 tentativas incorretas seguidas', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (156, 39, 4, 'O sistema deve ser bom', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (14, 4, 2, 'Casos de uso', 'O **diagrama de casos de uso** mostra, em alto nível, quem usa o sistema e para quê.

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

Cada caso de uso importante ganha uma descrição textual: atores, pré-condições, **fluxo principal** (passo a passo), **fluxos alternativos** (erros e exceções) e pós-condições.', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (40, 14, 1, 'No diagrama de casos de uso, o que é um ator?', 'Ator é um papel externo ao sistema que interage com ele.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (157, 40, 1, 'Um método Java', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (158, 40, 2, 'Uma classe do banco de dados', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (159, 40, 3, 'Quem interage com o sistema, seja pessoa ou outro sistema', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (160, 40, 4, 'Uma tela do sistema', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (41, 14, 2, 'Qual relacionamento indica um comportamento opcional, que só ocorre sob uma condição?', 'O extend acrescenta comportamento opcional; o include é sempre executado.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (161, 41, 1, 'Composição', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (162, 41, 2, 'Associação', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (163, 41, 3, '<<include>>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (164, 41, 4, '<<extend>>', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (42, 14, 3, 'Onde ficam descritos os erros e exceções de um caso de uso?', 'O fluxo principal descreve o caminho de sucesso; os alternativos cobrem desvios e erros.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (165, 42, 1, 'No ator', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (166, 42, 2, 'Na fronteira do sistema', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (167, 42, 3, 'Nos fluxos alternativos da especificação', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (168, 42, 4, 'No nome do caso de uso', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (15, 4, 3, 'Diagrama de classes', 'O **diagrama de classes** mostra a estrutura estática do sistema: classes, seus atributos, métodos e relacionamentos.

## Notação da classe

Um retângulo em três partes: nome, atributos e métodos. A visibilidade vem antes de cada item:

- `+` público, `-` privado, `#` protegido

```
Aluno
- nome: String
- xpTotal: int
+ ganharXp(pontos: int): void
```

## Relacionamentos

- **Associação**: uma classe conhece a outra (linha simples, com multiplicidade como 1 e 0..*)
- **Agregação** (losango vazio): "tem um", mas a parte existe sozinha. Ex.: Turma e Aluno
- **Composição** (losango cheio): a parte não existe sem o todo. Ex.: Trilha e Módulo: excluída a trilha, os módulos deixam de existir
- **Herança** (seta com triângulo vazio): "é um"

## Multiplicidade

`1` exatamente um, `0..1` zero ou um, `*` ou `0..*` muitos, `1..*` pelo menos um.', 25);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (43, 15, 1, 'No diagrama de classes, o que o símbolo "-" antes de um atributo indica?', '+ é público, - é privado e # é protegido.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (169, 43, 1, 'Protegido', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (170, 43, 2, 'Privado', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (171, 43, 3, 'Público', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (172, 43, 4, 'Estático', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (44, 15, 2, 'Uma Trilha tem Módulos que não existem sem ela. Qual relacionamento representa isso?', 'Na composição, o ciclo de vida da parte depende do todo.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (173, 44, 1, 'Agregação', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (174, 44, 2, 'Herança', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (175, 44, 3, 'Dependência', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (176, 44, 4, 'Composição', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (45, 15, 3, 'Qual multiplicidade significa "pelo menos um"?', '1..* indica um ou mais elementos.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (177, 45, 1, '1..*', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (178, 45, 2, '0..*', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (179, 45, 3, '0..1', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (180, 45, 4, '1', FALSE);

-- Trilha 5: Estruturas de Dados
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (5, 'Estruturas de Dados', 'Programação', 'AVANCADO', 'Análise de complexidade, pilhas, filas e árvores binárias de busca.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (16, 5, 1, 'Complexidade de algoritmos (Big O)', 'A notação **Big O** descreve como o tempo (ou a memória) de um algoritmo cresce conforme o tamanho da entrada **n** aumenta. Ela considera o pior caso e ignora constantes.

## Classes mais comuns

- **O(1)** constante: acessar `vetor[i]`
- **O(log n)** logarítmica: busca binária, que descarta metade dos dados a cada passo
- **O(n)** linear: percorrer uma lista uma vez
- **O(n log n)**: bons algoritmos de ordenação (merge sort)
- **O(n²)** quadrática: dois laços aninhados sobre os mesmos dados (bubble sort)

```
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        soma += m[i][j];   // O(n²)
```

## Por que importa

Com n = 1.000.000, um algoritmo O(n²) faz cerca de 10¹² operações, enquanto um O(n log n) faz cerca de 2 × 10⁷. A escolha do algoritmo pesa mais que a velocidade da máquina.

Regras práticas: passos em sequência somam (fica o maior termo); laços aninhados multiplicam.', 40);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (46, 16, 1, 'Qual é a complexidade da busca binária em um vetor ordenado?', 'A cada comparação metade dos elementos é descartada, então são cerca de log₂ n passos.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (181, 46, 1, 'O(log n)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (182, 46, 2, 'O(n²)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (183, 46, 3, 'O(n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (184, 46, 4, 'O(1)', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (47, 16, 2, 'Dois laços aninhados, cada um percorrendo os n elementos, resultam em:', 'Laços aninhados multiplicam: n × n = n².');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (185, 47, 1, 'O(n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (186, 47, 2, 'O(log n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (187, 47, 3, 'O(2n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (188, 47, 4, 'O(n²)', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (48, 16, 3, 'Um algoritmo faz um laço O(n) e, depois, outro laço O(n²) em sequência. Qual sua complexidade?', 'Passos em sequência somam (n + n²) e, no Big O, fica só o termo dominante: n².');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (189, 48, 1, 'O(n³)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (190, 48, 2, 'O(n + 1)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (191, 48, 3, 'O(n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (192, 48, 4, 'O(n²)', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (17, 5, 2, 'Pilhas e filas', '## Pilha (stack): LIFO

O **último a entrar é o primeiro a sair** (Last In, First Out), como uma pilha de pratos.

- `push`: empilha no topo
- `pop`: remove do topo
- `peek`: consulta o topo sem remover

Usos: desfazer (Ctrl+Z), histórico do navegador, pilha de chamadas de funções, conferir parênteses balanceados.

## Fila (queue): FIFO

O **primeiro a entrar é o primeiro a sair** (First In, First Out), como a fila do bandejão.

- `enqueue` (ou `offer`): insere no fim
- `dequeue` (ou `poll`): remove do início

Usos: fila de impressão, processamento de pedidos, busca em largura em grafos.

```
Deque<Integer> pilha = new ArrayDeque<>();
pilha.push(1); pilha.push(2);
pilha.pop();          // 2

Queue<Integer> fila = new ArrayDeque<>();
fila.offer(1); fila.offer(2);
fila.poll();          // 1
```

Bem implementadas, as operações de inserir e remover de pilhas e filas são **O(1)**.', 40);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (49, 17, 1, 'Em uma pilha, foram empilhados A, B e C, nessa ordem. Qual elemento sai no primeiro pop?', 'Pilha é LIFO: o último a entrar (C) é o primeiro a sair.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (193, 49, 1, 'C', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (194, 49, 2, 'Depende da implementação', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (195, 49, 3, 'B', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (196, 49, 4, 'A', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (50, 17, 2, 'Qual estrutura modela melhor uma fila de impressão?', 'Documentos são impressos na ordem de chegada: FIFO.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (197, 50, 1, 'Fila', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (198, 50, 2, 'Árvore', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (199, 50, 3, 'Pilha', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (200, 50, 4, 'Tabela hash', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (51, 17, 3, 'O recurso "desfazer" de um editor de texto costuma usar qual estrutura?', 'Desfazer reverte a ação mais recente primeiro, comportamento LIFO.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (201, 51, 1, 'Pilha', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (202, 51, 2, 'Fila', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (203, 51, 3, 'Grafo', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (204, 51, 4, 'Lista ordenada', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (18, 5, 3, 'Árvores binárias de busca', 'Uma **árvore binária** é formada por nós, e cada nó tem no máximo dois filhos (esquerdo e direito). O nó do topo é a **raiz**; nós sem filhos são **folhas**.

## Árvore binária de busca (BST)

Para todo nó:

- tudo na subárvore **esquerda** é **menor** que ele
- tudo na subárvore **direita** é **maior** que ele

Assim, para buscar um valor, compara-se com a raiz e desce-se para um único lado, descartando o outro.

```
        50
       /  \\
     30    70
    /  \\     \\
  20   40     80
```

## Custos

- Árvore **balanceada**: busca, inserção e remoção em **O(log n)**
- Árvore **degenerada** (inserir dados já ordenados vira uma "lista"): **O(n)**

Árvores autobalanceadas (AVL, rubro-negra) fazem rotações para manter a altura em O(log n). O `TreeMap` do Java usa uma rubro-negra.

## Percurso em ordem

Visitar esquerda → nó → direita retorna os valores **em ordem crescente**: 20, 30, 40, 50, 70, 80.', 45);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (52, 18, 1, 'Em uma BST, onde ficam os valores menores que um nó?', 'Pela definição, menores à esquerda e maiores à direita.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (205, 52, 1, 'Sempre na raiz', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (206, 52, 2, 'Em qualquer lado', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (207, 52, 3, 'Na subárvore direita', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (208, 52, 4, 'Na subárvore esquerda', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (53, 18, 2, 'Inserindo 10, 20, 30, 40, 50 nessa ordem em uma BST sem balanceamento, a busca fica:', 'Dados ordenados geram uma árvore degenerada, que se comporta como uma lista ligada.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (209, 53, 1, 'O(n²)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (210, 53, 2, 'O(log n)', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (211, 53, 3, 'O(n)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (212, 53, 4, 'O(1)', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (54, 18, 3, 'Qual percurso de uma BST lista os valores em ordem crescente?', 'O percurso em ordem visita primeiro os menores (esquerda), depois o nó e então os maiores.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (213, 54, 1, 'Em ordem (esquerda, nó, direita)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (214, 54, 2, 'Pré-ordem', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (215, 54, 3, 'Pós-ordem', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (216, 54, 4, 'Por níveis', FALSE);

-- Trilha 6: Redes de Computadores
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (6, 'Redes de Computadores', 'Infraestrutura', 'INTERMEDIARIO', 'Camadas TCP/IP, endereçamento IPv4 e os protocolos por trás da web.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (19, 6, 1, 'Modelo TCP/IP', 'Para organizar a comunicação em rede, os protocolos são divididos em **camadas**. Cada camada usa os serviços da camada de baixo e oferece serviços à de cima.

## As camadas do TCP/IP

- **Aplicação**: protocolos usados pelos programas: HTTP, DNS, SMTP, FTP
- **Transporte**: comunicação entre processos, identificados por **portas**. TCP e UDP
- **Internet (rede)**: endereçamento e roteamento entre redes: **IP**
- **Acesso à rede (enlace/física)**: transmissão no meio físico: Ethernet, Wi-Fi

## TCP x UDP

- **TCP**: orientado à conexão (handshake de 3 vias), garante entrega e ordem, retransmite pacotes perdidos. Usado em páginas web, e-mail, transferência de arquivos
- **UDP**: sem conexão, sem garantia de entrega, com baixa latência. Usado em streaming de vídeo, jogos online, chamadas de voz e DNS

O modelo **OSI** tem 7 camadas e é usado como referência teórica; o TCP/IP é o que roda na internet.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (55, 19, 1, 'Em qual camada do modelo TCP/IP fica o protocolo HTTP?', 'HTTP é usado diretamente pelos programas (navegador e servidor): camada de aplicação.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (217, 55, 1, 'Internet', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (218, 55, 2, 'Transporte', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (219, 55, 3, 'Acesso à rede', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (220, 55, 4, 'Aplicação', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (56, 19, 2, 'Qual protocolo é mais adequado para um jogo online em tempo real?', 'Em tempo real, um pacote atrasado já não serve; a baixa latência do UDP vale mais que a retransmissão.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (221, 56, 1, 'FTP', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (222, 56, 2, 'TCP, pela garantia de entrega', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (223, 56, 3, 'SMTP', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (224, 56, 4, 'UDP, pela baixa latência', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (57, 19, 3, 'O que o TCP faz e o UDP não faz?', 'Ambos usam portas e IP, mas só o TCP tem conexão, confirmação e retransmissão.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (225, 57, 1, 'Funciona sobre IP', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (226, 57, 2, 'Estabelece conexão e garante a entrega ordenada', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (227, 57, 3, 'Transporta dados de aplicações', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (228, 57, 4, 'Usa portas', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (20, 6, 2, 'Endereçamento IPv4', 'Um endereço **IPv4** tem 32 bits, escritos em quatro octetos decimais: `192.168.0.10`.

## Rede e host

A **máscara de sub-rede** indica quantos bits identificam a **rede**; o restante identifica o **host**. Na notação CIDR:

- `192.168.0.0/24`: 24 bits de rede, 8 de host (máscara 255.255.255.0)
- 2⁸ = 256 endereços, mas **254 utilizáveis**: o primeiro é o endereço de rede e o último é o broadcast

## Endereços privados

Reservados para redes internas e não roteados na internet:

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

O roteador usa **NAT** para que vários dispositivos da rede interna saiam para a internet com um único IP público.

## Endereços especiais

- `127.0.0.1`: **localhost**, a própria máquina (o seu back-end roda em localhost:8080)
- **Gateway padrão**: o roteador por onde o tráfego sai da rede local', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (58, 20, 1, 'Quantos hosts utilizáveis existem em uma rede /24?', 'São 256 endereços, menos o de rede e o de broadcast: 254 hosts.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (229, 58, 1, '256', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (230, 58, 2, '255', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (231, 58, 3, '254', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (232, 58, 4, '24', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (59, 20, 2, 'Qual destes é um endereço IP privado?', '192.168.0.0/16 é uma das faixas privadas; os demais são públicos.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (233, 59, 1, '192.168.1.15', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (234, 59, 2, '1.1.1.1', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (235, 59, 3, '8.8.8.8', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (236, 59, 4, '200.150.10.1', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (60, 20, 3, 'O que o endereço 127.0.0.1 representa?', '127.0.0.1 é o loopback: a máquina falando com ela mesma.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (237, 60, 1, 'O broadcast da rede', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (238, 60, 2, 'O roteador da rede', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (239, 60, 3, 'A própria máquina (localhost)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (240, 60, 4, 'O servidor DNS', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (21, 6, 3, 'HTTP e DNS', '## DNS

Pessoas lembram nomes; computadores usam IPs. O **DNS** traduz nomes de domínio (`fatecampinas.edu.br`) em endereços IP. A consulta é feita antes de qualquer acesso a um site.

## HTTP

O **HTTP** funciona em **requisição e resposta**: o cliente (navegador ou app) pede, o servidor responde. Ele é **sem estado** (stateless): cada requisição é independente. Por isso, APIs como a do FatecLab enviam um **token JWT** em toda requisição para identificar o usuário.

## Métodos

- `GET`: buscar dados
- `POST`: criar
- `PUT` / `PATCH`: atualizar (inteiro / em parte)
- `DELETE`: remover

## Códigos de status

- **2xx** sucesso: 200 OK, 201 Created, 204 No Content
- **3xx** redirecionamento
- **4xx** erro do cliente: 400 Bad Request, 401 Unauthorized (sem login), 403 Forbidden (sem permissão), 404 Not Found
- **5xx** erro do servidor: 500 Internal Server Error

O **HTTPS** é o HTTP sobre TLS: os dados trafegam criptografados.', 35);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (61, 21, 1, 'Qual a função do DNS?', 'O DNS resolve nomes em IPs. Atribuir IPs automaticamente é papel do DHCP.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (241, 61, 1, 'Armazenar as páginas em cache', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (242, 61, 2, 'Atribuir IPs aos computadores da rede', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (243, 61, 3, 'Traduzir nomes de domínio em endereços IP', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (244, 61, 4, 'Criptografar as páginas', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (62, 21, 2, 'Um aluno logado tenta acessar o painel de administrador e é barrado. Qual status a API deve retornar?', 'Ele está autenticado (não é 401), mas não tem permissão para o recurso: 403.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (245, 62, 1, '401 Unauthorized', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (246, 62, 2, '403 Forbidden', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (247, 62, 3, '404 Not Found', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (248, 62, 4, '500 Internal Server Error', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (63, 21, 3, 'Por que uma API REST envia o token de autenticação em toda requisição?', 'Sem estado no protocolo, cada requisição precisa carregar a identificação do usuário.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (249, 63, 1, 'Porque o HTTP é sem estado e não lembra requisições anteriores', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (250, 63, 2, 'Para criptografar o corpo da requisição', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (251, 63, 3, 'Para deixar a resposta mais rápida', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (252, 63, 4, 'Porque o DNS exige', FALSE);

-- Trilha 7: Desenvolvimento Web
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (7, 'Desenvolvimento Web', 'Web', 'INICIANTE', 'HTML semântico, layouts com CSS Flexbox e interação com JavaScript.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (22, 7, 1, 'HTML semântico', 'O **HTML** estrutura o conteúdo da página por meio de **tags**. HTML **semântico** usa a tag que descreve o significado do conteúdo, não só a aparência.

## Estrutura de uma página

```
<header>   cabeçalho, logotipo e menu
<nav>      navegação principal
<main>     conteúdo principal (um por página)
<section>  seção temática
<article>  conteúdo independente (um post, um cartão)
<footer>   rodapé
```

## Por que importa

- **Acessibilidade**: leitores de tela usam as tags para navegar pela página
- **SEO**: buscadores entendem melhor a hierarquia do conteúdo
- **Manutenção**: o código fica autoexplicativo

## Boas práticas

- Use títulos em ordem (`h1` → `h2` → `h3`), com um único `h1` por página
- Toda imagem informativa precisa de `alt`: `<img src="logo.png" alt="Logo do FatecLab">`
- Use `<button>` para ações e `<a>` para navegação
- Em formulários, ligue cada `<label>` ao seu campo com `for` e `id`', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (64, 22, 1, 'Qual tag representa o conteúdo principal e único da página?', '<main> marca o conteúdo principal; deve existir apenas um por página.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (253, 64, 1, '<main>', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (254, 64, 2, '<div>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (255, 64, 3, '<header>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (256, 64, 4, '<section>', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (65, 22, 2, 'Para que serve o atributo alt em uma imagem?', 'O texto alternativo garante acessibilidade e aparece se a imagem falhar.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (257, 65, 1, 'Criar um link', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (258, 65, 2, 'Definir o tamanho da imagem', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (259, 65, 3, 'Descrever a imagem para leitores de tela e quando ela não carrega', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (260, 65, 4, 'Aplicar um filtro de cor', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (66, 22, 3, 'Qual elemento usar para um botão "Enviar respostas" que dispara uma ação?', '<button> é focável pelo teclado e anunciado como botão. <a> é para navegação.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (261, 66, 1, '<span>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (262, 66, 2, '<div>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (263, 66, 3, '<a>', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (264, 66, 4, '<button>', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (23, 7, 2, 'CSS e Flexbox', 'O **CSS** define a aparência dos elementos. Uma regra tem **seletor** e **declarações**:

```
.cartao {
    padding: 16px;
    border-radius: 12px;
}
```

## Modelo de caixa

Todo elemento é uma caixa: **conteúdo**, `padding` (espaço interno), `border` e `margin` (espaço externo). Com `box-sizing: border-box`, a largura informada já inclui padding e borda.

## Flexbox

O Flexbox organiza itens em **uma dimensão** (linha ou coluna):

```
.menu {
    display: flex;
    justify-content: space-between; /* eixo principal */
    align-items: center;            /* eixo cruzado */
    gap: 12px;
}
```

- `flex-direction: row | column` define o eixo principal
- `justify-content` distribui no eixo principal
- `align-items` alinha no eixo cruzado

## Responsividade

**Media queries** aplicam estilos conforme o tamanho da tela. A abordagem **mobile first** escreve primeiro para o celular e amplia para telas maiores:

```
@media (min-width: 768px) {
    .grade { grid-template-columns: 1fr 1fr; }
}
```', 20);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (67, 23, 1, 'No modelo de caixa, qual propriedade define o espaço interno entre o conteúdo e a borda?', 'padding é interno; margin é o espaço externo, fora da borda.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (265, 67, 1, 'margin', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (266, 67, 2, 'outline', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (267, 67, 3, 'gap', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (268, 67, 4, 'padding', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (68, 23, 2, 'Em um container flex com flex-direction: row, qual propriedade centraliza os itens verticalmente?', 'Em row, o eixo cruzado é o vertical, controlado por align-items.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (269, 68, 1, 'vertical-align: middle', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (270, 68, 2, 'text-align: center', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (271, 68, 3, 'align-items: center', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (272, 68, 4, 'justify-content: center', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (69, 23, 3, 'O que significa a abordagem mobile first?', 'O estilo base atende o celular, e min-width acrescenta ajustes para telas maiores.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (273, 69, 1, 'Escrever os estilos para telas pequenas primeiro e ampliar com media queries', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (274, 69, 2, 'Criar só a versão para celular', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (275, 69, 3, 'Usar apenas aplicativos nativos', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (276, 69, 4, 'Testar somente no celular', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (24, 7, 3, 'JavaScript e o DOM', 'O **JavaScript** dá comportamento à página. Ele manipula o **DOM** (Document Object Model), a árvore de objetos que o navegador cria a partir do HTML.

## Selecionar e alterar

```
const titulo = document.querySelector("#titulo");
titulo.textContent = "Bem-vindo ao FatecLab";
titulo.classList.add("destaque");
```

## Eventos

```
const botao = document.querySelector("#enviar");
botao.addEventListener("click", () => {
    alert("Respostas enviadas!");
});
```

## Variáveis

- `const`: não pode ser reatribuída (use por padrão)
- `let`: pode ser reatribuída
- `var`: forma antiga, evite

## Requisições assíncronas

O `fetch` busca dados de uma API sem recarregar a página. Como a resposta demora, usamos `async`/`await`:

```
async function carregarRanking() {
    const resposta = await fetch("/api/ranking");
    const dados = await resposta.json();
    console.log(dados.entradas);
}
```

Frameworks como o **React**, usado no FatecLab, atualizam o DOM automaticamente quando o estado muda.', 25);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (70, 24, 1, 'O que é o DOM?', 'O navegador transforma o HTML em uma árvore de objetos que o JavaScript pode manipular.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (277, 70, 1, 'Um servidor web', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (278, 70, 2, 'Um banco de dados do navegador', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (279, 70, 3, 'A representação em árvore de objetos da página HTML', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (280, 70, 4, 'Uma linguagem de estilos', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (71, 24, 2, 'Qual método registra uma função para ser executada quando o usuário clicar em um botão?', 'addEventListener associa uma função (handler) a um evento do elemento.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (281, 71, 1, 'botao.querySelector("click")', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (282, 71, 2, 'botao.fetch("click")', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (283, 71, 3, 'botao.onClickRun()', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (284, 71, 4, 'botao.addEventListener("click", ...)', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (72, 24, 3, 'Qual declaração usar para um valor que não será reatribuído?', 'const impede a reatribuição e deixa a intenção explícita.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (285, 72, 1, 'static', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (286, 72, 2, 'const', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (287, 72, 3, 'let', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (288, 72, 4, 'var', FALSE);
