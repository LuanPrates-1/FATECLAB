/* eslint-disable @typescript-eslint/no-explicit-any */
// API simulada para o modo demonstração (VITE_DEMO=true).
// Reproduz as regras do back-end Java para que o app funcione sem servidor:
// é o plano B da apresentação e o que roda na prévia publicada.
// O estado fica no localStorage do navegador e pode ser zerado por reiniciarDemo().

import dados from "./dadosDemo.json";
import { calcularNivel, xpInicialDoNivel } from "../lib/gamificacao";
import type { RespostaBruta } from "../services/apiClient";

type Nivel = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";
type Status = "EM_ANDAMENTO" | "CONCLUIDA";

interface AlternativaD {
  id: number;
  ordem: number;
  texto: string;
  correta: boolean;
}
interface QuestaoD {
  id: number;
  ordem: number;
  enunciado: string;
  explicacao: string | null;
  alternativas: AlternativaD[];
}
interface ModuloD {
  id: number;
  ordem: number;
  titulo: string;
  xpConcedido: number;
  conteudo: string | null;
  questoes: QuestaoD[];
}
interface TrilhaD {
  id: number;
  titulo: string;
  area: string;
  nivel: Nivel;
  descricao: string | null;
  ativa: boolean;
  modulos: ModuloD[];
}
interface UsuarioD {
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: "ALUNO" | "ADMINISTRADOR";
  apelido: string | null;
  xp: number;
  ofensiva: number;
  maiorOfensiva: number;
  ultimaAtividade: string | null;
}
interface ProgressoD {
  alunoId: number;
  trilhaId: number;
  status: Status;
  moduloAtualId: number | null;
  xpObtido: number;
  concluidos: { moduloId: number; acertos: number | null; total: number | null }[];
}
interface Estado {
  versao: number;
  trilhas: TrilhaD[];
  usuarios: UsuarioD[];
  progresso: ProgressoD[];
  proximoId: number;
}

const CHAVE = "fateclab.demo.estado";
const VERSAO = 1;
const DOMINIO = "fatec.sp.gov.br";

// ---------- datas (fuso de Campinas) ----------
function hoje(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}
function diasAntes(dias: number): string {
  const d = new Date(`${hoje()}T12:00:00`);
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
}
function diferencaEmDias(de: string, ate: string): number {
  return Math.round((Date.parse(`${ate}T12:00:00`) - Date.parse(`${de}T12:00:00`)) / 86_400_000);
}

// ---------- estado ----------
let memoria: Estado | null = null;

function estadoInicial(): Estado {
  const fonte = dados as unknown as {
    trilhas: Omit<TrilhaD, "ativa">[];
    usuarios: (Omit<UsuarioD, "ultimaAtividade"> & { diasAtras: number | null })[];
  };
  return {
    versao: VERSAO,
    trilhas: fonte.trilhas.map((t) => ({ ...t, ativa: true })),
    usuarios: fonte.usuarios.map(({ diasAtras, ...u }) => ({
      ...u,
      ultimaAtividade: diasAtras === null ? null : diasAntes(diasAtras),
    })),
    progresso: [],
    proximoId: 10_000,
  };
}

function carregar(): Estado {
  if (memoria) return memoria;
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      const estado = JSON.parse(salvo) as Estado;
      if (estado.versao === VERSAO) {
        memoria = estado;
        return estado;
      }
    }
  } catch {
    // armazenamento indisponível ou corrompido: recomeça
  }
  memoria = estadoInicial();
  return memoria;
}

function salvar(): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(memoria));
  } catch {
    // sem armazenamento: o estado vale enquanto a página estiver aberta
  }
}

export function reiniciarDemo(): void {
  memoria = estadoInicial();
  salvar();
}

// ---------- utilidades ----------
class Erro extends Error {
  constructor(
    public status: number,
    mensagem: string,
  ) {
    super(mensagem);
  }
}

const ok = (corpo: unknown, status = 200): RespostaBruta => ({ status, corpo });

function ofensivaVigente(u: UsuarioD): number {
  if (!u.ultimaAtividade) return 0;
  return diferencaEmDias(u.ultimaAtividade, hoje()) <= 1 ? u.ofensiva : 0;
}

function registrarAtividade(u: UsuarioD): void {
  const dia = hoje();
  if (u.ultimaAtividade === dia) return;
  u.ofensiva = u.ultimaAtividade && diferencaEmDias(u.ultimaAtividade, dia) === 1 ? u.ofensiva + 1 : 1;
  u.maiorOfensiva = Math.max(u.maiorOfensiva, u.ofensiva);
  u.ultimaAtividade = dia;
}

function perfil(u: UsuarioD) {
  const nivel = calcularNivel(u.xp);
  return {
    id: u.id,
    nome: u.nome,
    papel: u.papel,
    apelido: u.apelido,
    xpTotal: u.xp,
    nivel,
    xpInicioNivel: xpInicialDoNivel(nivel),
    xpProximoNivel: xpInicialDoNivel(nivel + 1),
    ofensiva: ofensivaVigente(u),
    maiorOfensiva: u.maiorOfensiva,
  };
}

const xpDaTrilha = (t: TrilhaD) => t.modulos.reduce((s, m) => s + m.xpConcedido, 0);
const ordenarModulos = (t: TrilhaD) => [...t.modulos].sort((a, b) => a.ordem - b.ordem);

function trilhaResumo(t: TrilhaD) {
  return {
    id: t.id,
    titulo: t.titulo,
    area: t.area,
    nivel: t.nivel,
    descricao: t.descricao,
    totalModulos: t.modulos.length,
    xpTotal: xpDaTrilha(t),
  };
}

function trilhaDetalhe(t: TrilhaD) {
  return {
    ...trilhaResumo(t),
    modulos: ordenarModulos(t).map((m) => ({
      id: m.id,
      ordem: m.ordem,
      titulo: m.titulo,
      xpConcedido: m.xpConcedido,
      totalQuestoes: m.questoes.length,
    })),
  };
}

function progressoResposta(p: ProgressoD) {
  return {
    trilhaId: p.trilhaId,
    status: p.status,
    moduloAtualId: p.moduloAtualId,
    xpObtidoNaTrilha: p.xpObtido,
  };
}

function alunosOrdenados(e: Estado): UsuarioD[] {
  return e.usuarios
    .filter((u) => u.papel === "ALUNO")
    .sort((a, b) => b.xp - a.xp || (a.apelido ?? "").localeCompare(b.apelido ?? ""));
}

function usuarioDoToken(e: Estado, token: string | null): UsuarioD {
  const id = token?.startsWith("demo-") ? Number(token.slice(5)) : NaN;
  const u = e.usuarios.find((x) => x.id === id);
  if (!u) throw new Erro(401, "Sua sessão expirou. Entre novamente.");
  return u;
}

function trilhaAtiva(e: Estado, id: number): TrilhaD {
  const t = e.trilhas.find((x) => x.id === id && x.ativa);
  if (!t) throw new Erro(404, "Trilha não encontrada ou inativa");
  return t;
}

function moduloDaTrilha(e: Estado, trilhaId: number, moduloId: number): { t: TrilhaD; m: ModuloD } {
  const t = trilhaAtiva(e, trilhaId);
  const m = t.modulos.find((x) => x.id === moduloId);
  if (!m) throw new Erro(404, "Módulo não encontrado");
  return { t, m };
}

function progressoDe(e: Estado, alunoId: number, trilhaId: number): ProgressoD | undefined {
  return e.progresso.find((p) => p.alunoId === alunoId && p.trilhaId === trilhaId);
}

function garantirLiberado(e: Estado, u: UsuarioD, t: TrilhaD, m: ModuloD): void {
  if (u.papel === "ADMINISTRADOR") return;
  const p = progressoDe(e, u.id, t.id);
  if (!p) throw new Erro(409, "Inicie a trilha para acessar os módulos");
  if (p.status === "CONCLUIDA") return;
  const atual = t.modulos.find((x) => x.id === p.moduloAtualId);
  if (!atual || m.ordem > atual.ordem) {
    throw new Erro(409, "Módulo bloqueado: conclua os módulos anteriores");
  }
}

function concluir(e: Estado, u: UsuarioD, t: TrilhaD, m: ModuloD, acertos: number | null, total: number | null, bonus: number) {
  const p = progressoDe(e, u.id, t.id);
  if (!p) throw new Erro(404, "Trilha ainda não iniciada por este aluno");
  if (p.moduloAtualId !== m.id) {
    throw new Erro(409, "Conclua os módulos em ordem: este não é o módulo atual da trilha");
  }
  const xp = m.xpConcedido + bonus;
  p.concluidos.push({ moduloId: m.id, acertos, total });
  p.xpObtido += xp;
  u.xp += xp;
  registrarAtividade(u);
  const proximo = ordenarModulos(t).find((x) => x.ordem > m.ordem);
  if (proximo) {
    p.moduloAtualId = proximo.id;
  } else {
    p.status = "CONCLUIDA";
    p.moduloAtualId = null;
  }
  return p;
}

function corrigir(q: QuestaoD, escolhida: number | undefined) {
  const correta = q.alternativas.find((a) => a.correta)?.id ?? null;
  return {
    questaoId: q.id,
    correta: correta !== null && correta === escolhida,
    alternativaCorretaId: correta,
    explicacao: q.explicacao,
  };
}

const minimoAprovacao = (total: number) => Math.max(1, Math.round(total * 0.7));

function textoOuNulo(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function montarModulos(e: Estado, entrada: unknown, existentes: ModuloD[] = []): ModuloD[] {
  const lista = (entrada as { modulos?: unknown[] }).modulos;
  if (!Array.isArray(lista) || lista.length === 0) {
    throw new Erro(400, "modulos: trilha deve ter ao menos um módulo");
  }
  const ordens = new Set<number>();
  return lista.map((bruto) => {
    const m = bruto as {
      ordem: number;
      titulo: string;
      xpConcedido: number;
      conteudo?: string;
      questoes?: { enunciado: string; explicacao?: string; alternativas: { texto: string; correta: boolean }[] }[];
    };
    if (ordens.has(m.ordem)) throw new Erro(422, `Há mais de um módulo com a ordem ${m.ordem}`);
    ordens.add(m.ordem);
    if (!m.titulo?.trim()) throw new Erro(400, "titulo: o módulo precisa de um título");
    const questoes = (m.questoes ?? []).map((q, qi) => {
      if (q.alternativas.filter((a) => a.correta).length !== 1) {
        throw new Erro(422, `Cada questão deve ter exatamente uma alternativa correta (módulo "${m.titulo}")`);
      }
      return {
        id: e.proximoId++,
        ordem: qi + 1,
        enunciado: q.enunciado,
        explicacao: textoOuNulo(q.explicacao),
        alternativas: q.alternativas.map((a, ai) => ({ id: e.proximoId++, ordem: ai + 1, texto: a.texto, correta: a.correta })),
      };
    });
    const anterior = existentes.find((x) => x.ordem === m.ordem);
    return {
      id: anterior?.id ?? e.proximoId++,
      ordem: m.ordem,
      titulo: m.titulo,
      xpConcedido: Number(m.xpConcedido) || 0,
      conteudo: textoOuNulo(m.conteudo),
      questoes,
    };
  });
}

// ---------- rotas ----------
type Handler = (ctx: { e: Estado; corpo: any; token: string | null; params: number[]; query: URLSearchParams }) => RespostaBruta;

const rotas: [string, RegExp, Handler][] = [
  ["POST", /^\/auth\/login$/, ({ e, corpo }) => {
    const u = e.usuarios.find((x) => x.email.toLowerCase() === String(corpo?.email ?? "").toLowerCase());
    if (!u || u.senha !== corpo?.senha) throw new Erro(401, "E-mail ou senha inválidos");
    return ok({ token: `demo-${u.id}`, aluno: perfil(u) });
  }],
  ["POST", /^\/auth\/cadastro$/, ({ e, corpo }) => {
    const nome = String(corpo?.nome ?? "").trim();
    const email = String(corpo?.email ?? "").trim();
    const senha = String(corpo?.senha ?? "");
    if (!nome) throw new Erro(400, "nome: nome é obrigatório");
    if (!/^[^@\s]+@[^@\s]+$/.test(email)) throw new Erro(400, "email: e-mail inválido");
    if (senha.length < 8) throw new Erro(400, "senha: senha deve ter ao menos 8 caracteres");
    if (e.usuarios.some((x) => x.email.toLowerCase() === email.toLowerCase())) throw new Erro(409, "E-mail já cadastrado");
    if (email.split("@")[1]?.toLowerCase() !== DOMINIO) throw new Erro(422, "E-mail deve pertencer ao domínio institucional da Fatec");
    const u: UsuarioD = {
      id: e.proximoId++, nome, email, senha, papel: "ALUNO", apelido: nome.split(/\s+/)[0] || "Aluno",
      xp: 0, ofensiva: 0, maiorOfensiva: 0, ultimaAtividade: null,
    };
    e.usuarios.push(u);
    return ok({ token: `demo-${u.id}`, aluno: perfil(u) }, 201);
  }],
  ["GET", /^\/alunos\/me$/, ({ e, token }) => ok(perfil(usuarioDoToken(e, token)))],
  ["PATCH", /^\/alunos\/me$/, ({ e, token, corpo }) => {
    const u = usuarioDoToken(e, token);
    const apelido = String(corpo?.apelido ?? "").trim();
    if (!apelido) throw new Erro(400, "apelido: apelido é obrigatório");
    u.apelido = apelido;
    return ok(perfil(u));
  }],
  ["GET", /^\/alunos\/me\/progresso$/, ({ e, token }) => {
    const u = usuarioDoToken(e, token);
    return ok(e.progresso.filter((p) => p.alunoId === u.id).map(progressoResposta));
  }],
  ["GET", /^\/alunos\/me\/resumo$/, ({ e, token }) => {
    const u = usuarioDoToken(e, token);
    const meus = e.progresso.filter((p) => p.alunoId === u.id);
    const modulosConcluidos = meus.reduce((s, p) => s + p.concluidos.length, 0);
    const trilhasConcluidas = meus.filter((p) => p.status === "CONCLUIDA").length;
    const gabaritos = meus.reduce((s, p) => s + p.concluidos.filter((c) => c.total && c.acertos === c.total).length, 0);
    const ranking = alunosOrdenados(e);
    const posicao = ranking.findIndex((x) => x.id === u.id) + 1;
    const p = perfil(u);
    const regras: [string, string, string, boolean][] = [
      ["PRIMEIRO_PASSO", "Primeiro passo", "Conclua seu primeiro módulo", modulosConcluidos >= 1],
      ["MARATONISTA", "Maratonista", "Conclua 10 módulos", modulosConcluidos >= 10],
      ["TRILHA_COMPLETA", "Trilha completa", "Conclua uma trilha inteira", trilhasConcluidas >= 1],
      ["GABARITOU", "Gabaritou", "Acerte todas as questões de um quiz", gabaritos >= 1],
      ["EM_CHAMAS", "Em chamas", "Estude 3 dias seguidos", u.maiorOfensiva >= 3],
      ["IMPARAVEL", "Imparável", "Estude 7 dias seguidos", u.maiorOfensiva >= 7],
      ["PODIO", "Pódio", "Fique entre os 3 primeiros do ranking", posicao >= 1 && posicao <= 3 && u.xp > 0],
      ["VETERANO", "Veterano", "Alcance o nível 5", p.nivel >= 5],
    ];
    const trilhas = meus
      .map((pr) => ({ pr, t: e.trilhas.find((t) => t.id === pr.trilhaId && t.ativa) }))
      .filter((x): x is { pr: ProgressoD; t: TrilhaD } => Boolean(x.t))
      .map(({ pr, t }) => ({
        trilhaId: t.id, titulo: t.titulo, area: t.area, nivel: t.nivel, status: pr.status,
        modulosConcluidos: pr.concluidos.length, totalModulos: t.modulos.length, xpObtido: pr.xpObtido,
      }))
      .sort((a, b) => Number(a.status === "CONCLUIDA") - Number(b.status === "CONCLUIDA"));
    return ok({
      aluno: p,
      posicaoRanking: posicao,
      totalAlunos: ranking.length,
      modulosConcluidos,
      trilhasConcluidas,
      quizzesGabaritados: gabaritos,
      trilhas,
      conquistas: regras.map(([codigo, titulo, descricao, desbloqueada]) => ({ codigo, titulo, descricao, desbloqueada })),
    });
  }],
  ["GET", /^\/trilhas$/, ({ e, token, query }) => {
    usuarioDoToken(e, token);
    const area = query.get("area");
    const nivel = query.get("nivel");
    return ok(
      e.trilhas
        .filter((t) => t.ativa && (!area || t.area === area) && (!nivel || t.nivel === nivel))
        .map(trilhaResumo),
    );
  }],
  ["GET", /^\/trilhas\/(\d+)$/, ({ e, token, params }) => {
    usuarioDoToken(e, token);
    return ok(trilhaDetalhe(trilhaAtiva(e, params[0])));
  }],
  ["POST", /^\/trilhas\/(\d+)\/iniciar$/, ({ e, token, params }) => {
    const u = usuarioDoToken(e, token);
    const t = trilhaAtiva(e, params[0]);
    let p = progressoDe(e, u.id, t.id);
    if (!p) {
      const primeiro = ordenarModulos(t)[0];
      if (!primeiro) throw new Erro(404, "Trilha sem módulos");
      p = { alunoId: u.id, trilhaId: t.id, status: "EM_ANDAMENTO", moduloAtualId: primeiro.id, xpObtido: 0, concluidos: [] };
      e.progresso.push(p);
    }
    return ok(progressoResposta(p));
  }],
  ["GET", /^\/trilhas\/(\d+)\/modulos\/(\d+)\/licao$/, ({ e, token, params }) => {
    const u = usuarioDoToken(e, token);
    const { t, m } = moduloDaTrilha(e, params[0], params[1]);
    garantirLiberado(e, u, t, m);
    return ok({
      id: m.id, trilhaId: t.id, ordem: m.ordem, titulo: m.titulo, conteudo: m.conteudo, xpConcedido: m.xpConcedido,
      minimoParaAprovacao: minimoAprovacao(m.questoes.length),
      questoes: m.questoes.map((q) => ({
        id: q.id, ordem: q.ordem, enunciado: q.enunciado,
        alternativas: q.alternativas.map((a) => ({ id: a.id, texto: a.texto })),
      })),
    });
  }],
  ["POST", /^\/trilhas\/(\d+)\/modulos\/(\d+)\/questoes\/(\d+)\/verificar$/, ({ e, token, params, corpo }) => {
    const u = usuarioDoToken(e, token);
    const { t, m } = moduloDaTrilha(e, params[0], params[1]);
    garantirLiberado(e, u, t, m);
    const q = m.questoes.find((x) => x.id === params[2]);
    if (!q) throw new Erro(404, "Questão não encontrada");
    return ok(corrigir(q, Number(corpo?.alternativaId)));
  }],
  ["POST", /^\/trilhas\/(\d+)\/modulos\/(\d+)\/responder$/, ({ e, token, params, corpo }) => {
    const u = usuarioDoToken(e, token);
    const { t, m } = moduloDaTrilha(e, params[0], params[1]);
    if (m.questoes.length === 0) throw new Erro(409, "Este módulo não possui quiz");
    const p = progressoDe(e, u.id, t.id);
    if (!p) throw new Erro(404, "Trilha ainda não iniciada por este aluno");
    if (p.moduloAtualId !== m.id) throw new Erro(409, "Conclua os módulos em ordem: este não é o módulo atual da trilha");
    const respostas = new Map<number, number>(
      ((corpo?.respostas ?? []) as { questaoId: number; alternativaId: number }[]).map((r) => [Number(r.questaoId), Number(r.alternativaId)]),
    );
    const correcao = m.questoes.map((q) => corrigir(q, respostas.get(q.id)));
    const acertos = correcao.filter((c) => c.correta).length;
    const total = m.questoes.length;
    const minimo = minimoAprovacao(total);
    const aprovado = acertos >= minimo;
    const nivelAntes = calcularNivel(u.xp);
    let bonus = 0;
    if (aprovado) {
      bonus = acertos === total ? Math.round(m.xpConcedido * 0.2) : 0;
      concluir(e, u, t, m, acertos, total, bonus);
    }
    return ok({
      aprovado, acertos, totalQuestoes: total, minimoParaAprovacao: minimo,
      xpGanho: aprovado ? m.xpConcedido + bonus : 0, bonusGabarito: bonus,
      subiuDeNivel: calcularNivel(u.xp) > nivelAntes,
      correcao, progresso: progressoResposta(p), aluno: perfil(u),
    });
  }],
  ["POST", /^\/trilhas\/(\d+)\/modulos\/(\d+)\/concluir$/, ({ e, token, params }) => {
    const u = usuarioDoToken(e, token);
    const { t, m } = moduloDaTrilha(e, params[0], params[1]);
    if (m.questoes.length > 0) throw new Erro(409, "Este módulo tem quiz: responda às questões para concluí-lo");
    return ok(progressoResposta(concluir(e, u, t, m, null, null, 0)));
  }],
  ["GET", /^\/ranking$/, ({ e, token }) => {
    const u = usuarioDoToken(e, token);
    return ok({
      entradas: alunosOrdenados(e).map((a, i) => ({
        posicao: i + 1, apelido: a.apelido, xpTotal: a.xp, ehVoce: a.id === u.id,
        nivel: calcularNivel(a.xp), ofensiva: ofensivaVigente(a),
      })),
    });
  }],
  ["GET", /^\/admin\/trilhas\/(\d+)$/, ({ e, token, params }) => {
    exigirAdmin(e, token);
    const t = e.trilhas.find((x) => x.id === params[0]);
    if (!t) throw new Erro(404, "Trilha não encontrada");
    return ok({ ...t, modulos: ordenarModulos(t) });
  }],
  ["POST", /^\/admin\/trilhas$/, ({ e, token, corpo }) => {
    exigirAdmin(e, token);
    validarTrilha(corpo);
    const t: TrilhaD = {
      id: e.proximoId++, titulo: corpo.titulo, area: corpo.area, nivel: corpo.nivel,
      descricao: textoOuNulo(corpo.descricao), ativa: true, modulos: montarModulos(e, corpo),
    };
    e.trilhas.push(t);
    return ok(trilhaDetalhe(t), 201);
  }],
  ["PUT", /^\/admin\/trilhas\/(\d+)$/, ({ e, token, params, corpo }) => {
    exigirAdmin(e, token);
    validarTrilha(corpo);
    const t = e.trilhas.find((x) => x.id === params[0]);
    if (!t) throw new Erro(404, "Trilha não encontrada");
    const novos = montarModulos(e, corpo, t.modulos);
    for (const antigo of t.modulos) {
      if (novos.some((n) => n.id === antigo.id)) continue;
      const emUso = e.progresso.some((p) => p.moduloAtualId === antigo.id || p.concluidos.some((c) => c.moduloId === antigo.id));
      if (emUso) throw new Erro(409, `O módulo "${antigo.titulo}" já tem progresso de alunos e não pode ser excluído`);
    }
    Object.assign(t, { titulo: corpo.titulo, area: corpo.area, nivel: corpo.nivel, descricao: textoOuNulo(corpo.descricao), modulos: novos });
    return ok(trilhaDetalhe(t));
  }],
  ["DELETE", /^\/admin\/trilhas\/(\d+)$/, ({ e, token, params }) => {
    exigirAdmin(e, token);
    const t = e.trilhas.find((x) => x.id === params[0]);
    if (!t) throw new Erro(404, "Trilha não encontrada");
    t.ativa = false;
    return ok(undefined, 204);
  }],
  ["GET", /^\/saude$/, () => ok({ status: "ok" })],
];

function exigirAdmin(e: Estado, token: string | null): void {
  if (usuarioDoToken(e, token).papel !== "ADMINISTRADOR") throw new Erro(403, "Acesso negado para este recurso");
}

function validarTrilha(corpo: any): void {
  if (!corpo?.titulo?.trim()) throw new Erro(400, "titulo: informe o título da trilha");
  if (!corpo?.area?.trim()) throw new Erro(400, "area: informe a área da trilha");
  if (!["INICIANTE", "INTERMEDIARIO", "AVANCADO"].includes(corpo?.nivel)) throw new Erro(400, "nivel: nível inválido");
}

export async function mockFetch(caminho: string, metodo: string, corpo: unknown, token: string | null): Promise<RespostaBruta> {
  // Pequena espera para a interface se comportar como com uma rede real.
  await new Promise((r) => setTimeout(r, 120));
  const [path, qs] = caminho.split("?");
  const e = carregar();
  for (const [m, padrao, handler] of rotas) {
    if (m !== metodo) continue;
    const casou = path.match(padrao);
    if (!casou) continue;
    try {
      const copia = corpo === undefined ? undefined : JSON.parse(JSON.stringify(corpo));
      const resposta = handler({ e, corpo: copia, token, params: casou.slice(1).map(Number), query: new URLSearchParams(qs) });
      salvar();
      return JSON.parse(JSON.stringify(resposta)) as RespostaBruta;
    } catch (erro) {
      if (erro instanceof Erro) return { status: erro.status, corpo: { mensagem: erro.message } };
      throw erro;
    }
  }
  return { status: 404, corpo: { mensagem: `Rota não encontrada: ${metodo} ${path}` } };
}
