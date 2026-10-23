# FatecLab

Plataforma web gamificada de trilhas de estudo para alunos da Fatec Campinas, inspirada no
Duolingo. O aluno estuda módulos curtos, responde quizzes com correção imediata, ganha XP, sobe de
nível, mantém uma ofensiva de dias seguidos e disputa o ranking com a turma. O administrador
cadastra trilhas, lições e questões.

A interface simula um aplicativo móvel: no celular ocupa a tela inteira e pode ser instalada como
app; no computador aparece dentro de uma moldura de smartphone.

Trabalho de Graduação da Fatec Campinas, de Luan Prates e Raphael Langer, com orientação do Prof.
Adriano Cilhos Doimo.

## Começo rápido

Sem back-end (modo demonstração):

```bash
cd frontend && npm install && npm run dev:demo
```

Completo (MySQL + API + front-end):

```bash
docker compose up -d
cd backend && mvn spring-boot:run          # http://localhost:8080/api
cd frontend && npm install && npm run dev  # http://localhost:5173
```

Contas de demonstração: `aluno@fatec.sp.gov.br` / `aluno1234` e `admin@fatec.sp.gov.br` / `admin1234`.

## Tecnologias

React 18 + TypeScript + Vite (PWA) · Java 17 + Spring Boot 3.2 + Spring Security (JWT) + JPA ·
MySQL 8 + Flyway · Vitest e JUnit.

## Documentação

| Documento | Conteúdo |
|---|---|
| [docs/especificacao.md](docs/especificacao.md) | Requisitos funcionais e não funcionais, regras de negócio, casos de uso e histórias |
| [docs/modelo-de-dados.md](docs/modelo-de-dados.md) | Diagrama ER e dicionário de dados |
| [docs/api.md](docs/api.md) | Endpoints da API REST com exemplos |
| [docs/arquitetura.md](docs/arquitetura.md) | Arquitetura, tecnologias, decisões, segurança e qualidade |
| [docs/implantacao.md](docs/implantacao.md) | Como rodar localmente e publicar de graça (Aiven, Render, Vercel) |

## Conteúdo de demonstração

As 8 trilhas de exemplo (Lógica, SQL, Java OO, Requisitos e UML, Estruturas de Dados, Redes,
Desenvolvimento Web e Cibersegurança), com 28 módulos e 84 questões, ficam em `conteudo/trilhas.mjs`.
Depois de editar esse arquivo, rode `npm run gerar:dados` na pasta `frontend` para atualizar o SQL do
banco e os dados do modo demonstração.

Para incluir trilhas novas num banco que já recebeu os dados de demonstração, marque-as com
`migracao: 3` (ou o próximo número). O gerador cria uma migração nova (`V4_3__...sql`) e nunca
reescreve as que já existem, o que evita erro de checksum no Flyway.
