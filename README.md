# FatecLab — Tutorial para rodar

Plataforma de trilhas de estudo gamificada (cadastro, trilhas, progresso com XP, ranking e painel
admin). Este tutorial sobe tudo localmente no Windows.

## O que instalar antes

| Ferramenta | Versão | Para quê |
|---|---|---|
| Java JDK | 17 | back-end |
| Apache Maven | 3.9+ | compilar/rodar o back-end (o projeto **não** traz `mvnw`) |
| Node.js + npm | 20+ | front-end |
| Docker Desktop | qualquer recente | banco MySQL (ou instale um MySQL 8 local) |

Dica (PowerShell) para instalar tudo via winget:

```powershell
winget install EclipseAdoptium.Temurin.17.JDK
winget install Apache.Maven
winget install OpenJS.NodeJS.LTS
winget install Docker.DockerDesktop
```

Feche e reabra o terminal depois de instalar e confira com `java -version`, `mvn -v`, `node -v`.

## Passo 1 — Banco de dados

Abra o Docker Desktop e, na pasta `Pinkie Pie`:

```powershell
docker compose up -d
```

Sobe um MySQL 8 em `localhost:3306` (banco `fateclab`, usuário `root`, senha `fateclab`).

> Sem Docker? Instale um MySQL 8, crie o banco `fateclab` e use usuário `root` / senha `fateclab`
> (ou altere `backend/src/main/resources/application.yml`).

## Passo 2 — Back-end (terminal 1)

```powershell
cd backend
mvn spring-boot:run
```

Aguarde aparecer `Started ... in X seconds`. O Flyway cria as tabelas sozinho. API em
`http://localhost:8080/api`.

## Passo 3 — Front-end (terminal 2)

```powershell
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173**.

## Usando o sistema

- **Cadastro:** só aceita e-mail do domínio `fatec.sp.gov.br` (ex.: `fulano@fatec.sp.gov.br`).
  Para mudar o domínio, edite `fateclab.auth.dominios-institucionais` em
  `backend/src/main/resources/application.yml`.
- **Trilhas:** o catálogo começa vazio. Crie trilhas pelo painel admin (abaixo).
- **Conta de administrador:** não existe autocadastro. Crie uma conta normal pelo site e depois
  promova-a:

  ```powershell
  docker exec -it fateclab-mysql mysql -uroot -pfateclab fateclab -e "UPDATE usuario SET papel='ADMINISTRADOR' WHERE email='seu.email@fatec.sp.gov.br';"
  ```

  Saia e entre de novo no site para o painel Admin ficar disponível.

## Testes (opcional)

```powershell
cd backend ; mvn test
cd ../frontend ; npm run test
```

## Problemas comuns

- **Back-end não conecta no banco:** o container ainda está iniciando — espere ~20 s após o
  `docker compose up -d` e rode o back-end de novo. Confira com `docker ps`.
- **Porta 3306 em uso:** você já tem um MySQL local rodando; pare-o ou use-o em vez do Docker.
- **Porta 8080 ou 5173 em uso:** feche o programa que a usa.
- **Front sem resposta da API / erro de CORS:** confirme que o back-end está de pé e que o front
  está em `http://localhost:5173` (a origem liberada no CORS).
- **Para parar tudo:** `Ctrl+C` nos dois terminais e `docker compose down` (acrescente `-v` para
  apagar também os dados do banco).
