import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../services/apiClient";
import { criarTrilha, editarTrilha, removerTrilha } from "../services/adminService";
import type { CriarOuEditarTrilha, ModuloEntrada } from "../services/adminService";
import { listarTrilhas } from "../services/trilhaService";
import type { NivelTrilha, Trilha } from "../services/trilhaService";

const NIVEIS: NivelTrilha[] = ["INICIANTE", "INTERMEDIARIO", "AVANCADO"];

const TRILHA_VAZIA: CriarOuEditarTrilha = {
  titulo: "",
  area: "",
  nivel: "INICIANTE",
  modulos: [{ ordem: 1, titulo: "", xpConcedido: 10 }],
};

export function Admin() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<CriarOuEditarTrilha>(TRILHA_VAZIA);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const carregarTrilhas = useCallback(async () => {
    try {
      setTrilhas(await listarTrilhas());
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível carregar as trilhas.");
    }
  }, []);

  useEffect(() => {
    carregarTrilhas();
  }, [carregarTrilhas]);

  function atualizarModulo(indice: number, campo: keyof ModuloEntrada, valor: string) {
    setForm((atual) => {
      const modulos = [...atual.modulos];
      modulos[indice] = {
        ...modulos[indice],
        [campo]: campo === "titulo" ? valor : Number(valor),
      };
      return { ...atual, modulos };
    });
  }

  function adicionarModulo() {
    setForm((atual) => ({
      ...atual,
      modulos: [...atual.modulos, { ordem: atual.modulos.length + 1, titulo: "", xpConcedido: 10 }],
    }));
  }

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setSucesso(null);
    setSalvando(true);
    try {
      if (editandoId) {
        await editarTrilha(editandoId, form);
        setSucesso("Trilha atualizada com sucesso.");
      } else {
        await criarTrilha(form);
        setSucesso("Trilha criada com sucesso.");
      }
      setForm(TRILHA_VAZIA);
      setEditandoId(null);
      await carregarTrilhas();
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível salvar a trilha.");
    } finally {
      setSalvando(false);
    }
  }

  async function aoRemover(trilhaId: string) {
    setErro(null);
    try {
      await removerTrilha(trilhaId);
      await carregarTrilhas();
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível remover a trilha.");
    }
  }

  return (
    <main className="pagina">
      <h1>Administração de trilhas</h1>

      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}
      {sucesso && <p role="status">{sucesso}</p>}

      <section>
        <h2>{editandoId ? "Editar trilha" : "Nova trilha"}</h2>
        <form className="formulario" onSubmit={aoSubmeter}>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            required
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />

          <label htmlFor="area">Área</label>
          <input
            id="area"
            required
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />

          <label htmlFor="nivel">Nível</label>
          <select
            id="nivel"
            value={form.nivel}
            onChange={(e) => setForm({ ...form, nivel: e.target.value as NivelTrilha })}
          >
            {NIVEIS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <fieldset>
            <legend>Módulos</legend>
            {form.modulos.map((modulo, indice) => (
              <div key={indice}>
                <input
                  aria-label={`Título do módulo ${indice + 1}`}
                  required
                  value={modulo.titulo}
                  onChange={(e) => atualizarModulo(indice, "titulo", e.target.value)}
                />
                <input
                  aria-label={`XP do módulo ${indice + 1}`}
                  type="number"
                  min={0}
                  required
                  value={modulo.xpConcedido}
                  onChange={(e) => atualizarModulo(indice, "xpConcedido", e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={adicionarModulo}>
              Adicionar módulo
            </button>
          </fieldset>

          <button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Criar trilha"}
          </button>
        </form>
      </section>

      <section>
        <h2>Trilhas existentes</h2>
        <ul className="grade-trilhas" style={{ listStyle: "none", padding: 0 }}>
          {trilhas.map((trilha) => (
            <li key={trilha.id}>
              <article>
                <h3>{trilha.titulo}</h3>
                <p>
                  {trilha.area} · {trilha.nivel}
                </p>
                <button type="button" onClick={() => aoRemover(trilha.id)}>
                  Remover
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
