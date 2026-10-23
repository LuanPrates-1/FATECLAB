// Tipos compartilhados com a API do back-end (docs/api.md).
// Os IDs chegam como número do Java; no front-end tratamos sempre como string (ver lib/ids.ts).

export type Id = string | number;
export type Papel = "ALUNO" | "ADMINISTRADOR";
export type NivelTrilha = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";
export type StatusProgresso = "NAO_INICIADA" | "EM_ANDAMENTO" | "CONCLUIDA";

export interface UsuarioLogado {
  id: Id;
  nome: string;
  papel: Papel;
  apelido?: string | null;
  xpTotal?: number;
  nivel?: number;
  xpInicioNivel?: number;
  xpProximoNivel?: number;
  ofensiva?: number;
  maiorOfensiva?: number;
}

export interface Trilha {
  id: Id;
  titulo: string;
  area: string;
  nivel: NivelTrilha;
  descricao?: string | null;
  totalModulos?: number;
  xpTotal?: number;
}

export interface Modulo {
  id: Id;
  ordem: number;
  titulo: string;
  xpConcedido: number;
  totalQuestoes?: number;
}

export interface TrilhaDetalhe extends Trilha {
  modulos: Modulo[];
}

export interface Progresso {
  trilhaId: Id;
  status: StatusProgresso;
  moduloAtualId: Id | null;
  xpObtidoNaTrilha: number;
}

export interface AlternativaAluno {
  id: Id;
  texto: string;
}

export interface QuestaoAluno {
  id: Id;
  ordem: number;
  enunciado: string;
  alternativas: AlternativaAluno[];
}

export interface Licao {
  id: Id;
  trilhaId: Id;
  ordem: number;
  titulo: string;
  conteudo: string | null;
  xpConcedido: number;
  minimoParaAprovacao: number;
  questoes: QuestaoAluno[];
}

export interface Verificacao {
  questaoId: Id;
  correta: boolean;
  alternativaCorretaId: Id | null;
  explicacao: string | null;
}

export interface ResultadoQuiz {
  aprovado: boolean;
  acertos: number;
  totalQuestoes: number;
  minimoParaAprovacao: number;
  xpGanho: number;
  bonusGabarito: number;
  subiuDeNivel: boolean;
  correcao: Verificacao[];
  progresso: Progresso;
  aluno: UsuarioLogado;
}

export interface RankingEntry {
  posicao: number;
  apelido: string;
  xpTotal: number;
  ehVoce: boolean;
  nivel?: number;
  ofensiva?: number;
}

export interface RankingResposta {
  entradas: RankingEntry[];
}

export interface TrilhaIniciada {
  trilhaId: Id;
  titulo: string;
  area: string;
  nivel: NivelTrilha;
  status: StatusProgresso;
  modulosConcluidos: number;
  totalModulos: number;
  xpObtido: number;
}

export interface Conquista {
  codigo: string;
  titulo: string;
  descricao: string;
  desbloqueada: boolean;
}

export interface ResumoAluno {
  aluno: UsuarioLogado;
  posicaoRanking: number;
  totalAlunos: number;
  modulosConcluidos: number;
  trilhasConcluidas: number;
  quizzesGabaritados: number;
  trilhas: TrilhaIniciada[];
  conquistas: Conquista[];
}

// ---- Administração ----

export interface AlternativaEntrada {
  texto: string;
  correta: boolean;
}

export interface QuestaoEntrada {
  enunciado: string;
  explicacao?: string;
  alternativas: AlternativaEntrada[];
}

export interface ModuloEntrada {
  ordem: number;
  titulo: string;
  xpConcedido: number;
  conteudo?: string;
  questoes?: QuestaoEntrada[];
}

export interface CriarOuEditarTrilha {
  titulo: string;
  area: string;
  nivel: NivelTrilha;
  descricao?: string;
  modulos: ModuloEntrada[];
}

export interface AdminTrilha {
  id: Id;
  titulo: string;
  area: string;
  nivel: NivelTrilha;
  descricao: string | null;
  ativa: boolean;
  modulos: {
    id: Id;
    ordem: number;
    titulo: string;
    xpConcedido: number;
    conteudo: string | null;
    questoes: {
      id: Id;
      enunciado: string;
      explicacao: string | null;
      alternativas: { id: Id; texto: string; correta: boolean }[];
    }[];
  }[];
}
