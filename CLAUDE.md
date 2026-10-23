# FatecLab: contexto do projeto

Leia este arquivo antes de trabalhar no projeto. Ele resume o estado atual e as decisões já tomadas.

## O projeto

TG II (Trabalho de Graduação) de Análise e Desenvolvimento de Sistemas da Fatec Campinas.
Autores: Luan Prates e Raphael Langer. Orientador: Prof. Adriano Cilhos Doimo. Entrega em novembro de 2026.

Plataforma web gamificada de trilhas de estudo (estilo Duolingo): módulos com lição e quiz, XP, níveis,
ofensiva (dias seguidos), conquistas e ranking. A interface simula um app móvel (PWA); no computador
aparece dentro de uma moldura de celular.

- Front-end: React 18 + TypeScript + Vite (`frontend/`). Modo demonstração sem servidor: `npm run dev:demo`.
- Back-end: Java 17 + Spring Boot 3.2 + JWT + JPA + Flyway + MySQL (`backend/`).
- Conteúdo das trilhas: `conteudo/trilhas.mjs` (fonte única). Depois de editar: `npm run gerar:dados` em `frontend/`.
- Documentação técnica: `docs/` (requisitos, modelo de dados, API, arquitetura, implantação).
- Documento do TG (modelo ABNT da Fatec): `docs/tcc/TG_FatecLab.docx`. Diagramas em `docs/tcc/figuras/` (PlantUML).

## Estado atual

- 8 trilhas, 28 módulos, 84 questões (a mais recente é Cibersegurança).
- Front-end: 32 testes passando, lint limpo.
- Back-end: 42 testes escritos; ainda falta rodar `mvn test` numa máquina com acesso ao Maven Central.
- TG: trechos destacados em amarelo dependem dos autores (teste de usabilidade com SUS, resultado do
  `mvn test`, declaração de uso de IA conforme orientação do professor).

## Decisões que devem ser mantidas

- **Cores com significado fixo:** base preta levemente arroxeada; amarelo (`--amarelo`) para ações,
  progresso e XP; roxo (`--roxo`) para identidade do aluno (nível, ofensiva, "você" no ranking,
  conquistas). Tipografia: Chakra Petch (títulos/números) e IBM Plex Sans (texto). Visual cyberpunk contido.
- **Regras:** aprovação no quiz com 70% arredondado (2 de 3); bônus de 20% por gabarito; nível n começa em
  50·n·(n−1) XP; correção do quiz sempre no servidor.
- **Migrações:** nunca alterar uma migração já aplicada. Trilhas novas usam `migracao: N` em
  `conteudo/trilhas.mjs`, o que gera `V4_N__...sql`.
- **Git:** commits no nome de Luan Prates (e-mail noreply do GitHub). Não adicionar o Claude como coautor
  nos commits; ele é declarado como ferramenta de apoio no TG.
- **Windows:** o repositório local usa quebra de linha CRLF.

## Próximo assunto

Discutir e aprofundar as seções de segurança (no sistema e no TG).