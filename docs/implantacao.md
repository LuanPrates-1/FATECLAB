# FatecLab: execução e implantação

Há três formas de rodar o FatecLab:

| Forma | Para quê | Precisa de |
|---|---|---|
| Modo demonstração | Mostrar o app sem servidor (plano B da banca) | Node.js |
| Local completo | Desenvolver e testar | Java 17, Maven, Node.js, MySQL (ou Docker) |
| Hospedado | Link público para a apresentação | Contas gratuitas no Aiven, Render e Vercel |

## 1. Modo demonstração (sem back-end)

```bash
cd frontend
npm install
npm run dev:demo        # abre em http://localhost:5173
```

A API é simulada no navegador com as mesmas regras do back-end e as 7 trilhas de exemplo. O
progresso fica salvo só naquele navegador; o botão "Reiniciar demonstração", ao lado da moldura do
celular, volta tudo ao estado inicial.

Para gerar uma versão estática (pode ser aberta em qualquer servidor de arquivos ou publicada na
Vercel ou na Netlify): `npm run build:demo`, que gera a pasta `dist/`.

## 2. Local completo

### Banco

```bash
docker compose up -d          # MySQL 8 em localhost:3306, banco "fateclab", senha "fateclab"
```

Sem Docker: instale o MySQL 8, crie o banco `fateclab` e ajuste usuário e senha com as variáveis
`DB_USUARIO` e `DB_SENHA`.

### Back-end

```bash
cd backend
mvn spring-boot:run           # API em http://localhost:8080/api
mvn test                      # testes automatizados
```

Na primeira execução, o Flyway cria as tabelas e carrega os dados de demonstração.

### Front-end

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
npm run test                  # testes
npm run lint                  # padrão de código
```

### Contas de demonstração

| Papel | E-mail | Senha |
|---|---|---|
| Administrador | admin@fatec.sp.gov.br | admin1234 |
| Aluno (sem progresso) | aluno@fatec.sp.gov.br | aluno1234 |
| Outros 8 alunos do ranking | ex.: ana.souza@fatec.sp.gov.br | aluno1234 |

Todos os nomes são fictícios. A tela de login tem atalhos para entrar como aluno ou administrador.
**Em uma instalação real, troque essas senhas** ou desligue os dados de demonstração com
`FATECLAB_FLYWAY_LOCATIONS=classpath:db/migration`.

## 3. Hospedagem gratuita

O conjunto abaixo funciona sem cartão de crédito. Os planos gratuitos podem mudar; confira os
limites no site de cada serviço antes de publicar.

```
Vercel (front-end) ──HTTPS──> Render (API em Docker) ──SSL──> Aiven (MySQL)
```

### 3.1 Banco MySQL no Aiven

1. Crie uma conta em aiven.io e um serviço **MySQL** no plano **Free**.
2. Na página do serviço, copie *Host*, *Port*, *User* (`avnadmin`) e *Password*.
3. Monte a URL JDBC (o Aiven exige SSL):
   ```
   jdbc:mysql://HOST:PORT/defaultdb?sslMode=REQUIRED
   ```

Observação: o Aiven pode desligar serviços gratuitos sem uso. Se isso acontecer, religue o serviço
pelo painel alguns minutos antes da apresentação.

### 3.2 API no Render

1. Suba o projeto para um repositório no GitHub.
2. No Render, crie um **Web Service** a partir do repositório, com *Root Directory* `backend`,
   *Runtime* **Docker** e plano **Free**. O arquivo `render.yaml` na raiz já descreve essa
   configuração (opção *Blueprint*).
3. Configure as variáveis de ambiente:

| Variável | Valor |
|---|---|
| `DB_URL` | URL JDBC do Aiven (passo 3.1) |
| `DB_USUARIO` | `avnadmin` |
| `DB_SENHA` | senha do Aiven |
| `FATECLAB_JWT_SECRET` | texto aleatório com 32 caracteres ou mais |
| `FATECLAB_CORS_ORIGENS` | endereço do front-end, ex.: `https://fateclab.vercel.app` |

4. Depois do deploy, teste `https://SEU-SERVICO.onrender.com/api/saude`. A resposta deve ser
   `{"status":"ok"}`.

O plano gratuito do Render suspende o serviço após 15 minutos sem acesso e leva cerca de 1 minuto
para religar. **Abra o link uns 2 minutos antes da banca.** A tela de login do FatecLab também faz uma
chamada de "acordar" assim que é aberta.

### 3.3 Front-end na Vercel

1. Na Vercel, importe o mesmo repositório com *Root Directory* `frontend` (o framework Vite é
   detectado sozinho).
2. Crie a variável `VITE_API_BASE_URL` = `https://SEU-SERVICO.onrender.com/api`.
3. Faça o deploy. O arquivo `vercel.json` já redireciona as rotas do app para o `index.html`.
4. Volte ao Render e confira se `FATECLAB_CORS_ORIGENS` contém o endereço final da Vercel.

Abra o endereço no celular e use "Adicionar à tela inicial" para instalar o FatecLab como app.

### 3.4 Prévia sem servidor

Para ter um link que funciona mesmo com a API fora do ar, publique também a versão de demonstração:
na Vercel, crie um segundo projeto com o mesmo repositório, *Build Command*
`npm run build:demo` e nenhuma variável de ambiente.

## 4. Checklist do dia da apresentação

- [ ] Banco do Aiven ligado (painel do Aiven).
- [ ] `/api/saude` respondendo, aberto 2 minutos antes.
- [ ] Login com a conta de aluno e com a de administrador testados.
- [ ] Notebook com o modo demonstração rodando (`npm run dev:demo`), caso a internet falhe.
- [ ] Celular com o app instalado para mostrar a versão mobile.
