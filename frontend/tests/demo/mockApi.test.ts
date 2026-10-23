import { beforeEach, describe, expect, it } from "vitest";
import { mockFetch, reiniciarDemo } from "../../src/demo/mockApi";

type Corpo = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function chamar(caminho: string, metodo = "GET", corpo?: unknown, token: string | null = null) {
  const r = await mockFetch(caminho, metodo, corpo, token);
  return { status: r.status, corpo: r.corpo as Corpo };
}

async function entrarComoAluno() {
  const r = await chamar("/auth/login", "POST", { email: "aluno@fatec.sp.gov.br", senha: "aluno1234" });
  return r.corpo.token as string;
}

/** Lê a resposta certa de cada questão pela verificação, como o app faz. */
async function respostasCertas(token: string, trilhaId: number, moduloId: number) {
  const licao = (await chamar(`/trilhas/${trilhaId}/modulos/${moduloId}/licao`, "GET", undefined, token)).corpo;
  const respostas = [];
  for (const q of licao.questoes) {
    const v = await chamar(
      `/trilhas/${trilhaId}/modulos/${moduloId}/questoes/${q.id}/verificar`,
      "POST",
      { alternativaId: q.alternativas[0].id },
      token,
    );
    respostas.push({ questaoId: q.id, alternativaId: v.corpo.alternativaCorretaId });
  }
  return respostas;
}

describe("API simulada do modo demonstração", () => {
  beforeEach(() => reiniciarDemo());

  it("aceita só e-mails do domínio da Fatec no cadastro", async () => {
    const fora = await chamar("/auth/cadastro", "POST", { nome: "Zé", email: "ze@gmail.com", senha: "12345678" });
    expect(fora.status).toBe(422);
    const ok = await chamar("/auth/cadastro", "POST", { nome: "Zé Silva", email: "ze@fatec.sp.gov.br", senha: "12345678" });
    expect(ok.status).toBe(201);
    expect(ok.corpo.aluno.apelido).toBe("Zé");
  });

  it("aplica as regras do quiz: ordem, aprovação com 2 de 3 e bônus por gabarito", async () => {
    const token = await entrarComoAluno();
    const trilha = (await chamar("/trilhas/1", "GET", undefined, token)).corpo;
    const [m1, m2] = trilha.modulos;

    const bloqueado = await chamar(`/trilhas/1/modulos/${m1.id}/licao`, "GET", undefined, token);
    expect(bloqueado.status).toBe(409);

    await chamar("/trilhas/1/iniciar", "POST", undefined, token);
    const pularEtapa = await chamar(`/trilhas/1/modulos/${m2.id}/licao`, "GET", undefined, token);
    expect(pularEtapa.status).toBe(409);

    const certas = await respostasCertas(token, 1, m1.id);
    const umaErrada = certas.map((r, i) => (i === 0 ? { ...r, alternativaId: -1 } : r));
    const aprovado = await chamar(`/trilhas/1/modulos/${m1.id}/responder`, "POST", { respostas: umaErrada }, token);
    expect(aprovado.corpo).toMatchObject({ aprovado: true, acertos: 2, minimoParaAprovacao: 2, xpGanho: 20, bonusGabarito: 0 });
    expect(aprovado.corpo.progresso.moduloAtualId).toBe(m2.id);
    expect(aprovado.corpo.aluno.ofensiva).toBe(1);

    const certas2 = await respostasCertas(token, 1, m2.id);
    const gabarito = await chamar(`/trilhas/1/modulos/${m2.id}/responder`, "POST", { respostas: certas2 }, token);
    expect(gabarito.corpo).toMatchObject({ aprovado: true, acertos: 3, xpGanho: 24, bonusGabarito: 4 });
    expect(gabarito.corpo.aluno.xpTotal).toBe(44);
  });

  it("reprova abaixo do mínimo sem creditar XP nem avançar", async () => {
    const token = await entrarComoAluno();
    await chamar("/trilhas/1/iniciar", "POST", undefined, token);
    const m1 = (await chamar("/trilhas/1", "GET", undefined, token)).corpo.modulos[0];
    const r = await chamar(`/trilhas/1/modulos/${m1.id}/responder`, "POST", { respostas: [] }, token);
    expect(r.corpo).toMatchObject({ aprovado: false, acertos: 0, xpGanho: 0 });
    expect(r.corpo.progresso.moduloAtualId).toBe(m1.id);
  });

  it("restringe o painel ao administrador", async () => {
    const token = await entrarComoAluno();
    const negado = await chamar("/admin/trilhas/1", "GET", undefined, token);
    expect(negado.status).toBe(403);
  });
});
