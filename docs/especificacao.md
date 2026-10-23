# FatecLab: especificação de requisitos

Versão 2.0, outubro de 2026. Reescrita a partir do código-fonte e do banner do TG-I, já incluindo
lições com quiz, níveis, ofensiva, conquistas e o modo demonstração.

## 1. Visão geral

O FatecLab é uma plataforma web gamificada de trilhas de estudo para alunos da Fatec Campinas,
inspirada no Duolingo. O aluno escolhe uma trilha (ex.: SQL Essencial), estuda módulos curtos em
sequência, prova o que aprendeu em quizzes, acumula XP, sobe de nível, mantém uma ofensiva de dias
seguidos e compete no ranking geral. Um administrador cadastra e mantém as trilhas, as lições e as
questões.

A interface simula um aplicativo móvel: no celular ocupa a tela inteira e pode ser instalada como
app (PWA); no computador aparece dentro de uma moldura de smartphone.

### 1.1 Atores

| Ator | Descrição |
|---|---|
| Visitante | Pessoa não autenticada. Pode criar conta e entrar. |
| Aluno | Usuário com e-mail institucional. Estuda, responde quizzes, acompanha o progresso e aparece no ranking. |
| Administrador | Mantém o conteúdo (trilhas, módulos, lições e questões). Não aparece no ranking. |

### 1.2 Glossário

| Termo | Significado |
|---|---|
| Trilha | Conjunto ordenado de módulos de uma área (ex.: Banco de Dados) e de um nível (iniciante, intermediário, avançado). |
| Módulo | Unidade de estudo: uma lição (texto) e, opcionalmente, um quiz. |
| Quiz | Questões de múltipla escolha do módulo, com exatamente uma alternativa correta e uma explicação. |
| XP | Pontos de experiência ganhos ao concluir módulos. Definem o nível e a posição no ranking. |
| Nível | Faixa de XP do aluno (nível 2 a partir de 100 XP, 3 a partir de 300, 4 a partir de 600...). |
| Ofensiva | Número de dias seguidos em que o aluno concluiu pelo menos um módulo. |
| Conquista | Marco desbloqueado pelo histórico do aluno (ex.: "Gabaritou"). |

## 2. Requisitos funcionais

| Código | Requisito | Ator |
|---|---|---|
| RF01 | O sistema deve permitir o cadastro de alunos com nome, e-mail e senha de no mínimo 8 caracteres. | Visitante |
| RF02 | O sistema deve impedir o cadastro de dois usuários com o mesmo e-mail. | Visitante |
| RF03 | O sistema deve autenticar usuários por e-mail e senha, emitindo um token de sessão (JWT). | Visitante |
| RF04 | O sistema deve exigir autenticação para todas as funcionalidades, exceto cadastro e login. | Todos |
| RF05 | O sistema deve permitir encerrar a sessão e deve encerrá-la automaticamente quando o token expirar. | Aluno, Administrador |
| RF06 | O sistema deve listar as trilhas ativas e permitir filtrá-las por área e por nível. | Aluno |
| RF07 | O sistema deve exibir os detalhes da trilha com seus módulos em ordem, indicando os concluídos, o atual e os bloqueados. | Aluno |
| RF08 | O sistema deve permitir iniciar uma trilha e manter o progresso do aluno entre sessões. | Aluno |
| RF09 | O sistema deve liberar os módulos em sequência: um módulo só fica disponível após a conclusão do anterior. | Aluno |
| RF10 | O sistema deve creditar o XP do módulo ao aluno quando ele o concluir. | Aluno |
| RF11 | O sistema deve exibir o ranking geral de alunos ordenado por XP total, com desempate pelo apelido. | Aluno |
| RF12 | O sistema deve destacar o aluno autenticado no ranking. | Aluno |
| RF13 | O sistema deve oferecer interface responsiva, com navegação de aplicativo móvel. | Todos |
| RF14 | O sistema deve permitir ao administrador criar e editar trilhas e seus módulos. | Administrador |
| RF15 | O sistema deve restringir o painel de administração a usuários com papel de administrador. | Administrador |
| RF16 | O sistema deve permitir ao administrador remover uma trilha sem apagar o progresso já registrado pelos alunos (remoção lógica). | Administrador |
| RF17 | O sistema deve aceitar no cadastro apenas e-mails do domínio institucional (configurável; padrão `fatec.sp.gov.br`). | Visitante |
| RF18 | O sistema deve permitir ao aluno definir o apelido exibido no ranking. Por padrão, o apelido é o primeiro nome. | Aluno |
| RF19 | O sistema deve exibir a lição do módulo (texto com títulos, listas, destaques e trechos de código). | Aluno |
| RF20 | O sistema deve apresentar o quiz do módulo questão a questão, informando após cada resposta se ela está certa, qual é a correta e a explicação. | Aluno |
| RF21 | O sistema deve concluir o módulo quando o aluno acertar pelo menos 70% das questões (arredondado), e permitir novas tentativas em caso de reprovação. | Aluno |
| RF22 | O sistema deve conceder 20% de XP de bônus quando o aluno acertar todas as questões do quiz. | Aluno |
| RF23 | O sistema deve exibir ao aluno seu nível, XP para o próximo nível, ofensiva, posição no ranking e estatísticas de estudo. | Aluno |
| RF24 | O sistema deve exibir as conquistas do aluno, indicando as desbloqueadas e as pendentes. | Aluno |
| RF25 | O sistema deve permitir ao administrador cadastrar a lição e as questões (com alternativas, resposta correta e explicação) de cada módulo. | Administrador |
| RF26 | O sistema deve permitir revisar a lição e praticar o quiz de módulos já concluídos, sem creditar XP novamente. | Aluno |

## 3. Requisitos não funcionais

| Código | Categoria | Requisito |
|---|---|---|
| RNF01 | Segurança | As senhas devem ser armazenadas com hash BCrypt e nunca devolvidas pela API. |
| RNF02 | Segurança | A sessão deve usar JWT assinado (HS256) com expiração configurável (padrão de 8 horas); o segredo deve vir de variável de ambiente. |
| RNF03 | Segurança | Autorização, domínio de e-mail, ordem dos módulos e correção do quiz devem ser validados no back-end; a alternativa correta não deve ser enviada ao cliente antes da resposta. |
| RNF04 | Segurança | O conteúdo das lições deve ser exibido sem interpretar HTML, impedindo injeção de scripts. |
| RNF05 | Usabilidade | A interface deve funcionar a partir de 320 px de largura e, em telas grandes, simular um smartphone. |
| RNF06 | Acessibilidade | Foco de teclado visível, rótulos em todos os campos, textos alternativos para ícones informativos e respeito à preferência de movimento reduzido. |
| RNF07 | Portabilidade | O front-end deve ser instalável como aplicativo (PWA) e funcionar nas versões atuais de Chrome, Edge, Firefox e Safari. |
| RNF08 | Desempenho | As respostas da API devem ser compactadas; o XP total é mantido de forma denormalizada para leitura rápida do ranking. |
| RNF09 | Manutenibilidade | O código deve ter testes automatizados no back-end (JUnit/MockMvc) e no front-end (Vitest/Testing Library), e o esquema do banco deve ser versionado (Flyway). |
| RNF10 | Implantação | O sistema deve poder ser publicado em planos gratuitos de hospedagem, com configuração por variáveis de ambiente e imagem Docker para o back-end. |
| RNF11 | Disponibilidade | Deve existir um modo demonstração que funcione sem servidor, para apresentações sem rede. |
| RNF12 | Observabilidade | Eventos relevantes (cadastro, login, conclusão de módulo, quiz respondido, alterações administrativas) devem ser registrados em log. |

## 4. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | Somente e-mails do domínio institucional configurado podem se cadastrar. |
| RN02 | Novos cadastros recebem o papel ALUNO. Administradores são criados diretamente no banco (ou pelos dados de demonstração). |
| RN03 | Um aluno tem no máximo um registro de progresso por trilha. Iniciar uma trilha já iniciada devolve o progresso existente. |
| RN04 | Só o módulo atual pode ser concluído. O próximo módulo é o de menor ordem maior que a do atual. |
| RN05 | Módulos sem questões são concluídos pela leitura da lição. Módulos com questões só são concluídos pelo quiz. |
| RN06 | Mínimo de acertos = 70% do total de questões, arredondado para o inteiro mais próximo, nunca menos que 1 (2 de 3, 3 de 4, 4 de 5). |
| RN07 | XP do módulo concluído = XP do módulo + bônus de gabarito (20% do XP do módulo, arredondado) quando todas as questões estão certas. |
| RN08 | O nível n começa em 50 · n · (n − 1) XP. |
| RN09 | A ofensiva soma 1 quando o aluno conclui um módulo no dia seguinte ao da última atividade, mantém-se no mesmo dia e volta para 1 após um dia sem estudo. Ela é exibida como 0 se o aluno não estudou nem hoje nem ontem. As datas seguem o fuso America/Sao_Paulo. |
| RN10 | O ranking considera apenas alunos, ordenados por XP total decrescente e, no empate, por apelido. |
| RN11 | Remover uma trilha a desativa: ela some da listagem, e o progresso e o XP dos alunos são mantidos. |
| RN12 | Na edição de uma trilha, os módulos são identificados pela ordem. Não é possível excluir um módulo que algum aluno já concluiu ou está cursando. |
| RN13 | Cada questão deve ter de 2 a 6 alternativas e exatamente uma correta. |
| RN14 | Revisar ou praticar um módulo já concluído não credita XP. |

## 5. Conquistas

| Código | Nome | Condição |
|---|---|---|
| PRIMEIRO_PASSO | Primeiro passo | Concluir 1 módulo |
| MARATONISTA | Maratonista | Concluir 10 módulos |
| TRILHA_COMPLETA | Trilha completa | Concluir uma trilha |
| GABARITOU | Gabaritou | Acertar todas as questões de um quiz |
| EM_CHAMAS | Em chamas | Maior ofensiva de 3 dias ou mais |
| IMPARAVEL | Imparável | Maior ofensiva de 7 dias ou mais |
| PODIO | Pódio | Estar entre os 3 primeiros do ranking, com XP maior que zero |
| VETERANO | Veterano | Alcançar o nível 5 |

## 6. Casos de uso

| Código | Caso de uso | Ator | Requisitos |
|---|---|---|---|
| UC01 | Criar conta | Visitante | RF01, RF02, RF17 |
| UC02 | Entrar no sistema | Visitante | RF03 |
| UC03 | Sair do sistema | Aluno, Administrador | RF05 |
| UC04 | Consultar trilhas | Aluno | RF06 |
| UC05 | Iniciar trilha | Aluno | RF07, RF08 |
| UC06 | Estudar módulo (ler lição e responder quiz) | Aluno | RF09, RF10, RF19 a RF22, RF26 |
| UC07 | Consultar ranking | Aluno | RF11, RF12 |
| UC08 | Consultar perfil e conquistas | Aluno | RF18, RF23, RF24 |
| UC09 | Manter trilhas | Administrador | RF14 a RF16, RF25 |

### UC06: Estudar módulo

- **Ator:** Aluno.
- **Pré-condições:** aluno autenticado; trilha iniciada; o módulo é o atual ou já foi concluído.
- **Fluxo principal:**
  1. O aluno toca no módulo atual no mapa da trilha.
  2. O sistema exibe a lição e informa quantas questões há, o mínimo de acertos e o XP.
  3. O aluno inicia o quiz.
  4. O sistema exibe a primeira questão e suas alternativas.
  5. O aluno escolhe uma alternativa e toca em "Verificar".
  6. O sistema indica se a resposta está certa, destaca a alternativa correta e mostra a explicação.
  7. Os passos 4 a 6 se repetem até a última questão.
  8. O sistema corrige o quiz, conclui o módulo, credita o XP (com bônus, se for o caso), atualiza a ofensiva e libera o próximo módulo.
  9. O sistema exibe o resultado, com XP ganho, eventual subida de nível e ofensiva.
- **Fluxos alternativos:**
  - **A1, reprovação (passo 8):** o aluno não atinge o mínimo. Nenhum XP é creditado e o módulo continua atual. O sistema oferece "Tentar de novo" e "Rever a lição".
  - **A2, módulo sem quiz (passo 2):** o sistema oferece "Concluir módulo", que credita o XP diretamente.
  - **A3, módulo já concluído:** o quiz roda como prática. Não há envio nem crédito de XP.
  - **A4, módulo bloqueado:** o sistema não permite abrir o módulo e informa que é preciso concluir os anteriores.
- **Pós-condições:** progresso, XP, ofensiva e ranking atualizados.

### UC09: Manter trilhas

- **Ator:** Administrador.
- **Fluxo principal:**
  1. O administrador abre o painel e toca em "Nova trilha" ou no ícone de edição de uma trilha.
  2. Informa título, área, nível, descrição e os módulos (título, XP, lição e questões).
  3. Toca em "Criar trilha" ou "Salvar alterações".
  4. O sistema valida os dados e publica a trilha para os alunos.
- **Fluxos alternativos:**
  - **A1, questão sem alternativa correta:** o sistema recusa e informa o módulo com problema.
  - **A2, exclusão de módulo com progresso:** o sistema recusa e mantém o módulo.
  - **A3, remover trilha:** após confirmação, a trilha é desativada e deixa de aparecer para os alunos.

## 7. Histórias de usuário

| Código | História | Critérios de aceitação |
|---|---|---|
| US1 | Como aluno, quero criar minha conta com o e-mail da Fatec para salvar meu progresso. | E-mail de outro domínio é recusado; e-mail repetido é recusado; após o cadastro, entro direto no app. |
| US2 | Como aluno, quero seguir uma trilha em ordem para aprender do básico ao avançado. | Módulos futuros aparecem bloqueados; o progresso continua de onde parei em outro dispositivo. |
| US3 | Como aluno, quero responder quizzes com correção imediata para fixar o conteúdo. | Vejo se acertei logo após cada questão, com a explicação; com 2 de 3 acertos concluo o módulo; acertando todas, ganho bônus. |
| US4 | Como administrador, quero cadastrar trilhas, lições e questões sem mexer em código. | Consigo criar, editar e remover; um aluno comum não acessa o painel. |
| US5 | Como aluno, quero ver meu nível, minha ofensiva e minha posição para me manter motivado. | O topo do app mostra ofensiva e XP; o perfil mostra estatísticas e conquistas; o ranking destaca minha posição. |
