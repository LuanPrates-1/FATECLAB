# Hospedagem do FatecLab: passo a passo para continuar

Objetivo: ter um link público em que todos os usuários compartilham o mesmo servidor. O link mandado
antes era o **modo demonstração**: cada navegador guarda os próprios dados (`localStorage`), por isso o
perfil de um amigo não aparecia para o outro.

```
Vercel (front-end) ──HTTPS──> Render (API Spring Boot) ──SSL──> Aiven (MySQL)
```

## Já feito (24/10/2026)

- [x] `mvn test` rodado pela primeira vez. Havia um erro de compilação no `JwtAuthenticationFilter`
      (o deploy teria falhado) e problemas nos testes. Tudo corrigido: **45 testes passando**.
- [x] Senha do administrador: o back-end troca a senha pública `admin1234` pela variável
      `FATECLAB_ADMIN_SENHA` ao iniciar (mínimo de 12 caracteres).
- [x] Botões "Entrar como aluno/administrador" ocultos fora do modo demonstração.
- [x] Cadastro aceita `fatec.sp.gov.br`, Gmail, Outlook, Hotmail e Yahoo (`FATECLAB_DOMINIOS`, já no
      `render.yaml`).
- [x] Tudo enviado ao GitHub (commit `60c10f6`, branch `master`).

## Antes de começar

Escolha uma **senha nova para o administrador** (12 caracteres ou mais). Ela vai no Render e é com ela
que você entra como `admin@fatec.sp.gov.br` no site hospedado.

**Nunca cole senhas no chat com o Claude.** Elas vão direto nos painéis do Aiven e do Render.

---

## Etapa 1: banco MySQL no Aiven

**Já feito (02/11/2026):** serviço `fateclab-db` criado no plano **Free** (`Free-1-1gb`, North
America, projeto `luanpratesk2-25d1`). URL de conexão:

```
jdbc:mysql://fateclab-db-luanpratesk2-25d1.c.aivencloud.com:27266/defaultdb?sslMode=REQUIRED
```

O plano Free desliga sozinho quando fica sem uso; na véspera da apresentação, conferir se está ligado.
O serviço antigo `fateclab1` (plano Developer-1, pago com créditos do *trial*, que acabam por volta de
24/11/2026) deve ser apagado depois que o site estiver funcionando com o `fateclab-db`.
Os itens abaixo ficam só como referência.

1. Abra https://console.aiven.io/signup e crie a conta (entrar com o GitHub é o mais simples).
2. Se pedir organização ou projeto, use qualquer nome, como `fateclab`.
3. Clique em **Create service** e escolha **MySQL**.
4. Em **Service tier**, escolha **Free** (não *Trial*, que expira).
5. Escolha a região mais próxima disponível no plano Free.
6. Nome do serviço: `fateclab-db`. Clique em **Create free service**.
7. Espere o status mudar para **Running** (de 2 a 5 minutos).
8. Na aba **Overview**, em *Connection information*, anote em um lugar seguro:
   - **Host** (ex.: `fateclab-db-xxxx.aivencloud.com`)
   - **Port** (ex.: `12345`)
   - **User** (`avnadmin`)
   - **Password** (ícone de olho)
9. Monte a URL de conexão trocando HOST e PORTA:
   ```
   jdbc:mysql://HOST:PORTA/defaultdb?sslMode=REQUIRED
   ```

## Etapa 2: API no Render

1. Abra https://dashboard.render.com e entre com o **GitHub** (a mesma conta do repositório
   `LuanPrates-1/FATECLAB`).
2. Clique em **New +** e depois em **Blueprint**.
3. Conecte o repositório `FATECLAB` (se não aparecer, clique em *Configure GitHub* e libere o acesso
   a ele).
4. O Render lê o `render.yaml` e mostra o serviço `fateclab-api`. Ele vai pedir os valores marcados
   como secretos:

   | Variável | Valor |
   |---|---|
   | `DB_URL` | a URL montada na etapa 1, item 9 |
   | `DB_USUARIO` | `avnadmin` |
   | `DB_SENHA` | a senha do Aiven |
   | `FATECLAB_ADMIN_SENHA` | a senha nova do administrador (12+ caracteres) |

   As outras variáveis já vêm preenchidas: `FATECLAB_JWT_SECRET` é gerada sozinha,
   `FATECLAB_CORS_ORIGENS` aceita `https://*.vercel.app` e `FATECLAB_DOMINIOS` já tem os e-mails
   liberados.
5. Clique em **Apply**. O primeiro deploy leva de 5 a 10 minutos (compila o Java com Docker).
6. Quando terminar, copie o endereço do serviço (ex.: `https://fateclab-api.onrender.com`) e teste no
   navegador:
   ```
   https://fateclab-api.onrender.com/api/saude
   ```
   A resposta deve ser `{"status":"ok"}`.
7. Se o deploy falhar, abra a aba **Logs** do serviço e copie as últimas linhas de erro para o Claude
   (confira antes se nenhuma senha aparece nelas).

Observação: no plano gratuito o servidor "dorme" após 15 minutos sem uso e leva cerca de 1 minuto
para acordar.

## Etapa 3: front-end na Vercel

1. Abra https://vercel.com/signup e entre com o **GitHub**.
2. Clique em **Add New…** e depois em **Project**, e importe o repositório `FATECLAB`.
3. Em **Root Directory**, clique em *Edit* e escolha **`frontend`**. O framework **Vite** é
   detectado sozinho.
4. Em **Environment Variables**, adicione:

   | Nome | Valor |
   |---|---|
   | `VITE_API_BASE_URL` | endereço do Render + `/api` (ex.: `https://fateclab-api.onrender.com/api`) |

   Não crie `VITE_DEMO`: sem ela, o app usa o servidor de verdade.
5. Clique em **Deploy**. Ao terminar, a Vercel mostra o endereço (ex.: `https://fateclab.vercel.app`).

## Etapa 4: testar

1. Abra `/api/saude` no navegador para acordar o servidor.
2. Abra o endereço da Vercel. A tela de login **não** deve mostrar os botões de conta de demonstração.
3. Crie uma conta sua (pode ser Gmail) e conclua um módulo.
4. Peça a um amigo para criar uma conta **pelo mesmo link** e concluir um módulo.
5. Os dois devem aparecer no **ranking** um do outro. É isso que prova que o servidor é compartilhado.
6. Entre como `admin@fatec.sp.gov.br` com a senha nova e confira o painel de administração.
   Confirme também que `admin1234` **não** funciona mais.
7. No celular: abra o link e use "Adicionar à tela inicial".

## Depois da hospedagem

- Planejar os recursos sociais. Sugestão (falta cerca de um mês para a entrega): seguir/seguidores,
  perfil público, ranking entre amigos e talvez um feed de atividades. Chat como trabalho futuro no TG.
- No TG: preencher o resultado do `mvn test` (45 de 45) e descrever a proteção da conta de
  administrador na seção de segurança.
- Os 8 alunos fictícios do ranking (senha `aluno1234`) continuam existindo no site hospedado. São só
  dados de exemplo, mas qualquer pessoa pode entrar com eles.
- Para rodar `mvn test` de novo neste PC: o Maven 3.9.9 foi baixado numa pasta temporária, que pode
  ter sido apagada. Peça ao Claude para baixá-lo de novo ou instale-o de https://maven.apache.org.
