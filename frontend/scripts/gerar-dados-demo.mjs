// Gera o SQL de demonstração do back-end e o JSON do modo demonstração do front-end
// a partir de conteudo/trilhas.mjs. Uso (na pasta frontend): npm run gerar:dados
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { trilhas, usuarios } from "../../conteudo/trilhas.mjs";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const destinoSql = resolve(raiz, "backend/src/main/resources/db/seed/V4_1__dados_demonstracao.sql");
const destinoJson = resolve(raiz, "frontend/src/demo/dadosDemo.json");

// Embaralhamento determinístico das alternativas, para a resposta certa não ficar sempre
// na mesma posição. A mesma semente gera sempre a mesma ordem.
function embaralhar(lista, semente) {
  const copia = [...lista];
  let s = semente;
  for (let i = copia.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const sqlTexto = (v) =>
  v === null || v === undefined ? "NULL" : `'${String(v).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;

let idModulo = 0;
let idQuestao = 0;
let idAlternativa = 0;

const trilhasComIds = trilhas.map((t, i) => ({
  id: i + 1,
  titulo: t.titulo,
  area: t.area,
  nivel: t.nivel,
  descricao: t.descricao,
  modulos: t.modulos.map((m, mi) => ({
    id: ++idModulo,
    ordem: mi + 1,
    titulo: m.titulo,
    xpConcedido: m.xp,
    conteudo: m.conteudo,
    questoes: m.questoes.map((q, qi) => {
      const id = ++idQuestao;
      if (q.correta < 0 || q.correta >= q.alternativas.length) {
        throw new Error(`Índice de resposta inválido em "${q.enunciado}"`);
      }
      const marcadas = q.alternativas.map((texto, ai) => ({ texto, correta: ai === q.correta }));
      return {
        id,
        ordem: qi + 1,
        enunciado: q.enunciado,
        explicacao: q.explicacao,
        alternativas: embaralhar(marcadas, id * 7919).map((a, ai) => ({
          id: ++idAlternativa,
          ordem: ai + 1,
          ...a,
        })),
      };
    }),
  })),
}));

const usuariosComIds = usuarios.map((u, i) => ({ id: i + 1, ...u }));

// ---------- SQL ----------
const linhas = [
  "-- GERADO AUTOMATICAMENTE por frontend/scripts/gerar-dados-demo.mjs a partir de conteudo/trilhas.mjs.",
  "-- Não edite à mão: altere o conteúdo e rode `npm run gerar:dados` na pasta frontend.",
  "-- Dados de demonstração (trilhas, lições, quizzes e usuários fictícios).",
  "",
];

for (const u of usuariosComIds) {
  const hash = bcrypt.hashSync(u.senha, 10);
  const ultima =
    u.diasAtras === null ? "NULL" : u.diasAtras === 0 ? "CURRENT_DATE" : `DATE_SUB(CURRENT_DATE, INTERVAL ${u.diasAtras} DAY)`;
  linhas.push(
    `INSERT INTO usuario (id, nome, email, senha_hash, papel, apelido, xp_total, ofensiva_atual, maior_ofensiva, ultima_atividade) VALUES (${u.id}, ${sqlTexto(u.nome)}, ${sqlTexto(u.email)}, ${sqlTexto(hash)}, ${sqlTexto(u.papel)}, ${sqlTexto(u.apelido)}, ${u.xp}, ${u.ofensiva}, ${u.maiorOfensiva}, ${ultima});`,
  );
}
linhas.push("");

for (const t of trilhasComIds) {
  linhas.push(`-- Trilha ${t.id}: ${t.titulo}`);
  linhas.push(
    `INSERT INTO trilha_de_estudo (id, titulo, area, nivel, descricao, ativa) VALUES (${t.id}, ${sqlTexto(t.titulo)}, ${sqlTexto(t.area)}, ${sqlTexto(t.nivel)}, ${sqlTexto(t.descricao)}, TRUE);`,
  );
  for (const m of t.modulos) {
    linhas.push(
      `INSERT INTO modulo (id, trilha_id, ordem, titulo, conteudo, xp_concedido) VALUES (${m.id}, ${t.id}, ${m.ordem}, ${sqlTexto(m.titulo)}, ${sqlTexto(m.conteudo)}, ${m.xpConcedido});`,
    );
    for (const q of m.questoes) {
      linhas.push(
        `INSERT INTO questao (id, modulo_id, ordem, enunciado, explicacao) VALUES (${q.id}, ${m.id}, ${q.ordem}, ${sqlTexto(q.enunciado)}, ${sqlTexto(q.explicacao)});`,
      );
      for (const a of q.alternativas) {
        linhas.push(
          `INSERT INTO alternativa (id, questao_id, ordem, texto, correta) VALUES (${a.id}, ${q.id}, ${a.ordem}, ${sqlTexto(a.texto)}, ${a.correta ? "TRUE" : "FALSE"});`,
        );
      }
    }
  }
  linhas.push("");
}

writeFileSync(destinoSql, linhas.join("\n"));

// ---------- JSON do modo demonstração ----------
writeFileSync(
  destinoJson,
  JSON.stringify(
    {
      trilhas: trilhasComIds,
      usuarios: usuariosComIds.map(({ senha, ...resto }) => ({ ...resto, senha })),
    },
    null,
    2,
  ) + "\n",
);

const totalQuestoes = trilhasComIds.reduce(
  (s, t) => s + t.modulos.reduce((sm, m) => sm + m.questoes.length, 0),
  0,
);
const posicoes = [0, 0, 0, 0];
trilhasComIds.forEach((t) =>
  t.modulos.forEach((m) => m.questoes.forEach((q) => posicoes[q.alternativas.findIndex((a) => a.correta)]++)),
);
console.log(
  `OK: ${trilhasComIds.length} trilhas, ${idModulo} módulos, ${totalQuestoes} questões, ${usuariosComIds.length} usuários.`,
);
console.log(`Posição da alternativa correta (A, B, C, D): ${posicoes.join(", ")}`);
