# FatecLab: API REST

Base: `http://localhost:8080/api` (local) ou `https://<seu-servico>.onrender.com/api` (hospedado).

- Formato: JSON (UTF-8).
- Autenticação: cabeçalho `Authorization: Bearer <token>`, com o token devolvido no cadastro ou no login.
- Erros: corpo `{"mensagem": "texto explicando o problema"}`.

| Status | Quando |
|---|---|
| 400 | Dados inválidos (campo obrigatório ausente, JSON malformado, parâmetro inválido). |
| 401 | Sem token, token inválido ou expirado, ou credenciais erradas. |
| 403 | Autenticado, mas sem permissão (aluno acessando `/admin`). |
| 404 | Recurso inexistente ou trilha inativa. |
| 409 | Conflito de regra: e-mail já cadastrado, módulo fora de ordem ou bloqueado, módulo com quiz concluído sem quiz, exclusão de módulo com progresso. |
| 422 | Regra de domínio: e-mail fora do domínio institucional, questão sem exatamente uma alternativa correta, ordem de módulo repetida. |

## Endpoints

| Método | Caminho | Acesso | Descrição |
|---|---|---|---|
| GET | `/saude` | Público | Verificação de disponibilidade (`{"status":"ok"}`). |
| POST | `/auth/cadastro` | Público | Cria conta de aluno e devolve a sessão (201). |
| POST | `/auth/login` | Público | Autentica e devolve a sessão. |
| GET | `/alunos/me` | Autenticado | Perfil do usuário logado. |
| PATCH | `/alunos/me` | Autenticado | Altera o apelido. |
| GET | `/alunos/me/resumo` | Autenticado | Perfil, estatísticas, trilhas iniciadas e conquistas. |
| GET | `/alunos/me/progresso` | Autenticado | Progresso em cada trilha iniciada. |
| GET | `/trilhas?area=&nivel=` | Autenticado | Trilhas ativas, com filtros opcionais. |
| GET | `/trilhas/{trilhaId}` | Autenticado | Detalhe da trilha com os módulos. |
| POST | `/trilhas/{trilhaId}/iniciar` | Autenticado | Inicia a trilha (idempotente). |
| GET | `/trilhas/{trilhaId}/modulos/{moduloId}/licao` | Autenticado | Lição e questões, sem o gabarito. |
| POST | `/trilhas/{trilhaId}/modulos/{moduloId}/questoes/{questaoId}/verificar` | Autenticado | Corrige uma questão. |
| POST | `/trilhas/{trilhaId}/modulos/{moduloId}/responder` | Autenticado | Envia o quiz e conclui o módulo se aprovado. |
| POST | `/trilhas/{trilhaId}/modulos/{moduloId}/concluir` | Autenticado | Conclui módulo **sem** quiz. |
| GET | `/ranking` | Autenticado | Ranking geral de alunos. |
| GET | `/admin/trilhas/{trilhaId}` | Administrador | Trilha completa, com lições e gabarito. |
| POST | `/admin/trilhas` | Administrador | Cria trilha (201). |
| PUT | `/admin/trilhas/{trilhaId}` | Administrador | Edita trilha, módulos, lições e questões. |
| DELETE | `/admin/trilhas/{trilhaId}` | Administrador | Remove (desativa) a trilha (204). |

## Exemplos

### Login

```http
POST /api/auth/login
Content-Type: application/json

{ "email": "aluno@fatec.sp.gov.br", "senha": "aluno1234" }
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "aluno": {
    "id": 2, "nome": "Aluno Demonstração", "papel": "ALUNO", "apelido": "Calouro",
    "xpTotal": 140, "nivel": 2, "xpInicioNivel": 100, "xpProximoNivel": 300,
    "ofensiva": 2, "maiorOfensiva": 4
  }
}
```

### Lição do módulo

```http
GET /api/trilhas/1/modulos/1/licao
```

```json
{
  "id": 1, "trilhaId": 1, "ordem": 1, "titulo": "Algoritmos e variáveis",
  "conteudo": "Um **algoritmo** é ...", "xpConcedido": 20, "minimoParaAprovacao": 2,
  "questoes": [
    {
      "id": 1, "ordem": 1, "enunciado": "O que melhor define um algoritmo?",
      "alternativas": [ { "id": 3, "texto": "Um componente físico do computador" }, ... ]
    }
  ]
}
```

### Verificar uma questão

```http
POST /api/trilhas/1/modulos/1/questoes/1/verificar
{ "alternativaId": 2 }
```

```json
{ "questaoId": 1, "correta": true, "alternativaCorretaId": 2, "explicacao": "Algoritmo é a sequência de passos..." }
```

### Responder o quiz

```http
POST /api/trilhas/1/modulos/1/responder
{ "respostas": [ { "questaoId": 1, "alternativaId": 2 }, { "questaoId": 2, "alternativaId": 7 }, { "questaoId": 3, "alternativaId": 10 } ] }
```

```json
{
  "aprovado": true, "acertos": 3, "totalQuestoes": 3, "minimoParaAprovacao": 2,
  "xpGanho": 24, "bonusGabarito": 4, "subiuDeNivel": false,
  "correcao": [ { "questaoId": 1, "correta": true, "alternativaCorretaId": 2, "explicacao": "..." } ],
  "progresso": { "trilhaId": 1, "status": "EM_ANDAMENTO", "moduloAtualId": 2, "xpObtidoNaTrilha": 24 },
  "aluno": { "id": 2, "xpTotal": 24, "nivel": 1, "ofensiva": 1, ... }
}
```

### Criar trilha (administrador)

```http
POST /api/admin/trilhas
{
  "titulo": "Git e GitHub",
  "area": "Ferramentas",
  "nivel": "INICIANTE",
  "descricao": "Controle de versão do zero.",
  "modulos": [
    {
      "ordem": 1,
      "titulo": "Commits",
      "xpConcedido": 20,
      "conteudo": "## O que é um commit\n\nUm commit registra...",
      "questoes": [
        {
          "enunciado": "Qual comando cria um commit?",
          "explicacao": "git commit grava as mudanças preparadas com git add.",
          "alternativas": [
            { "texto": "git commit", "correta": true },
            { "texto": "git push", "correta": false }
          ]
        }
      ]
    }
  ]
}
```

`conteudo` e `questoes` são opcionais. Sem questões, o módulo é concluído pela leitura da lição.
