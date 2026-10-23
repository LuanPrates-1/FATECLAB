-- GERADO AUTOMATICAMENTE por frontend/scripts/gerar-dados-demo.mjs a partir de conteudo/trilhas.mjs.
-- Não edite à mão. Depois de aplicada no banco, uma migração não deve mais ser alterada.
-- Trilhas adicionadas no lote 2.

-- Trilha 8: Cibersegurança
INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (8, 'Cibersegurança', 'Segurança', 'INTERMEDIARIO', 'Os pilares da segurança da informação, senhas e autenticação, ataques comuns em aplicações web e criptografia na prática.', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (25, 8, 1, 'Fundamentos da segurança da informação', 'A segurança da informação protege dados e sistemas contra acesso, alteração e indisponibilidade indevidos. Ela se apoia em três pilares, conhecidos como **tríade CID**:

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

Muitos ataques exploram pessoas, não máquinas. O **phishing** é uma mensagem falsa, que imita um banco ou a própria faculdade, para fazer a vítima clicar em um link ou entregar a senha. Desconfie de urgência, confira o remetente e o endereço do site antes de digitar dados.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (73, 25, 1, 'Um invasor altera o valor de uma transferência enquanto ela trafega pela rede. Qual pilar da segurança foi violado?', 'A informação foi modificada de forma indevida: isso fere a integridade.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (289, 73, 1, 'Disponibilidade', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (290, 73, 2, 'Integridade', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (291, 73, 3, 'Confidencialidade', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (292, 73, 4, 'Autenticidade do usuário', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (74, 25, 2, 'Um servidor sem atualizações de segurança há dois anos é um exemplo de:', 'É uma fraqueza que pode ser explorada. A ameaça seria o atacante que a explora.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (293, 74, 1, 'Risco', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (294, 74, 2, 'Ameaça', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (295, 74, 3, 'Incidente', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (296, 74, 4, 'Vulnerabilidade', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (75, 25, 3, 'Um e-mail com o logotipo da Fatec pede, com urgência, que você confirme sua senha em um link. Isso é provavelmente:', 'Urgência e pedido de senha por link são sinais clássicos de phishing. Instituições não pedem sua senha por e-mail.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (297, 75, 1, 'Uma atualização automática', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (298, 75, 2, 'Um aviso oficial de rotina', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (299, 75, 3, 'Um teste de disponibilidade', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (300, 75, 4, 'Phishing', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (26, 8, 2, 'Senhas e autenticação', '**Autenticação** é provar quem você é; **autorização** é definir o que você pode fazer depois de autenticado. No FatecLab, o login autentica, e o papel de administrador autoriza o acesso ao painel.

## Como guardar senhas

Um sistema **nunca** deve guardar a senha em texto puro. Ele guarda um **hash**: o resultado de uma função de mão única, que não pode ser revertida.

- **Salt**: um valor aleatório somado à senha antes do hash. Assim, duas pessoas com a mesma senha têm hashes diferentes, e tabelas prontas de hashes (rainbow tables) deixam de funcionar
- Use algoritmos **lentos de propósito**, feitos para senhas, como **bcrypt** ou Argon2. MD5 e SHA-1 são rápidos demais e permitem testar bilhões de tentativas

```
senha "fatec2026" + salt  ->  bcrypt  ->  $2a$10$N9qo8uLOickgx2ZMRZoMye...
```

## Senhas fortes

Comprimento vale mais que complexidade: uma frase longa como `cafe-com-pao-na-fatec` é mais forte e mais fácil de lembrar que `F@t3c!`. Não repita senhas entre serviços e use um gerenciador de senhas.

## Autenticação multifator (MFA)

Combina fatores de tipos diferentes:

- algo que você **sabe** (senha)
- algo que você **tem** (celular com aplicativo autenticador)
- algo que você **é** (biometria)

Com MFA, uma senha vazada sozinha não basta para invadir a conta.', 30);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (76, 26, 1, 'Qual é a forma correta de um sistema armazenar as senhas dos usuários?', 'Hash com salt em algoritmo lento impede recuperar a senha e dificulta ataques de força bruta. Base64 é só codificação e se reverte facilmente.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (301, 76, 1, 'Codificadas em Base64', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (302, 76, 2, 'Criptografadas com uma chave guardada no próprio servidor', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (303, 76, 3, 'Como hash com salt, usando um algoritmo como bcrypt', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (304, 76, 4, 'Em texto puro, em uma tabela protegida', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (77, 26, 2, 'Para que serve o salt no armazenamento de senhas?', 'Com um salt aleatório por usuário, o mesmo texto gera hashes distintos e as rainbow tables deixam de servir.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (305, 77, 1, 'Deixar o hash mais curto', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (306, 77, 2, 'Permitir recuperar a senha original', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (307, 77, 3, 'Fazer senhas iguais gerarem hashes diferentes e inutilizar tabelas prontas de hashes', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (308, 77, 4, 'Substituir a autenticação multifator', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (78, 26, 3, 'Senha e código do aplicativo autenticador no celular combinam quais fatores?', 'A senha é conhecimento (sabe); o celular é posse (tem). Por serem de tipos diferentes, formam uma MFA de verdade.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (309, 78, 1, 'Algo que você é e algo que você sabe', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (310, 78, 2, 'Algo que você tem e algo que você é', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (311, 78, 3, 'Algo que você sabe e algo que você tem', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (312, 78, 4, 'Dois fatores do mesmo tipo', FALSE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (27, 8, 3, 'Ataques comuns em aplicações web', 'O **OWASP Top 10** é a lista de referência dos riscos mais críticos em aplicações web. Três deles aparecem o tempo todo:

## Injeção de SQL

Acontece quando a entrada do usuário é **concatenada** direto na consulta:

```
"SELECT * FROM usuario WHERE email = ''" + email + "''"
-- email digitado: '' OR ''1''=''1
```

A consulta passa a retornar todos os usuários. A defesa é usar **consultas parametrizadas** (prepared statements), em que o banco trata a entrada como dado, nunca como comando. O Spring Data JPA, usado no FatecLab, faz isso por padrão.

## Cross-site scripting (XSS)

O atacante consegue que a página exiba um **script** dele para outros usuários, por exemplo em um comentário. O script roda no navegador da vítima e pode roubar dados da sessão. A defesa é **escapar** toda saída e nunca inserir HTML vindo do usuário sem tratamento. Por isso o FatecLab exibe as lições como texto formatado, sem interpretar HTML.

## Quebra de controle de acesso

É o primeiro da lista atual: o sistema não verifica se o usuário pode fazer aquilo. Exemplos: um aluno chamar diretamente a rota `/api/admin/trilhas`, ou trocar o ID na URL para ver dados de outro aluno. A regra de ouro: **toda autorização é verificada no servidor**. Esconder um botão na interface não protege nada.', 35);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (79, 27, 1, 'Qual é a principal defesa contra injeção de SQL?', 'Com parâmetros, a entrada nunca é interpretada como parte do comando SQL. As outras medidas ajudam, mas não resolvem a causa.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (313, 79, 1, 'Limitar o tamanho dos campos no formulário', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (314, 79, 2, 'Esconder as mensagens de erro do banco', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (315, 79, 3, 'Usar HTTPS', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (316, 79, 4, 'Usar consultas parametrizadas (prepared statements)', TRUE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (80, 27, 2, 'Um comentário contendo <script> passa a ser executado no navegador de quem abre a página. Que ataque é esse?', 'No XSS, o código do atacante é injetado na página e executado no navegador das vítimas.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (317, 80, 1, 'Phishing', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (318, 80, 2, 'Cross-site scripting (XSS)', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (319, 80, 3, 'Injeção de SQL', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (320, 80, 4, 'Negação de serviço', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (81, 27, 3, 'Um aluno descobre que, chamando a API diretamente, consegue apagar trilhas. Qual a correção adequada?', 'Controle de acesso precisa ser feito no back-end. Esconder ou ofuscar a rota não impede a chamada.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (321, 81, 1, 'Esconder o botão de excluir na interface', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (322, 81, 2, 'Trocar a URL da rota por um nome difícil de adivinhar', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (323, 81, 3, 'Pedir que os alunos não usem a API', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (324, 81, 4, 'Verificar no servidor se o usuário tem papel de administrador', TRUE);
INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (28, 8, 4, 'Criptografia e HTTPS', '**Criptografia** transforma dados legíveis em um formato que só quem tem a chave consegue ler.

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

Hash é de mão única e não tem chave para "decifrar". Ele serve para verificar integridade e guardar senhas. Já o **JWT** usado no FatecLab é **assinado**, não cifrado: qualquer um consegue ler o conteúdo, mas ninguém consegue alterá-lo sem invalidar a assinatura. Por isso ele não deve carregar dados sigilosos.', 35);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (82, 28, 1, 'Na criptografia assimétrica, para enviar uma mensagem sigilosa a Ana, com qual chave você deve cifrá-la?', 'Só a chave privada de Ana decifra o que foi cifrado com a pública dela. A privada nunca é compartilhada.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (325, 82, 1, 'A chave pública de Ana', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (326, 82, 2, 'A chave privada de Ana', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (327, 82, 3, 'Sua chave privada', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (328, 82, 4, 'Sua chave pública', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (83, 28, 2, 'Para que serve o certificado digital apresentado em uma conexão HTTPS?', 'O certificado, emitido por uma autoridade certificadora, garante que você está falando com o servidor legítimo.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (329, 83, 1, 'Comprovar a identidade do servidor', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (330, 83, 2, 'Substituir a criptografia simétrica', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (331, 83, 3, 'Armazenar a senha do usuário', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (332, 83, 4, 'Acelerar o carregamento da página', FALSE);
INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (84, 28, 3, 'Sobre um JWT assinado, é correto afirmar:', 'A assinatura garante integridade, não sigilo. Por isso o token não deve carregar dados confidenciais e deve trafegar sempre por HTTPS.');
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (333, 84, 1, 'Ele pode ser alterado livremente pelo cliente', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (334, 84, 2, 'Seu conteúdo é sigiloso e ninguém consegue lê-lo', FALSE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (335, 84, 3, 'Seu conteúdo pode ser lido, mas não alterado sem invalidar a assinatura', TRUE);
INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (336, 84, 4, 'Ele substitui o uso de HTTPS', FALSE);
