import { useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../services/apiClient";
import { atualizarApelido as atualizarApelidoRequest } from "../services/authService";
import { useSessao } from "../hooks/useSessao";

export function Perfil() {
  const { usuario, login } = useSessao();
  const [apelido, setApelido] = useState(usuario?.apelido ?? "");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [salvando, setSalvando] = useState(false);

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setSucesso(false);
    setSalvando(true);
    try {
      const usuarioAtualizado = await atualizarApelidoRequest(apelido);
      const tokenAtual = localStorage.getItem("fateclab.token") ?? "";
      login(tokenAtual, usuarioAtualizado);
      setSucesso(true);
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível atualizar o apelido.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="pagina">
      <h1>Meu perfil</h1>
      <form className="formulario" onSubmit={aoSubmeter}>
        <label htmlFor="apelido">Apelido exibido no ranking</label>
        <input
          id="apelido"
          name="apelido"
          type="text"
          required
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
        />

        {erro && (
          <p role="alert" className="erro">
            {erro}
          </p>
        )}
        {sucesso && <p role="status">Apelido atualizado com sucesso.</p>}

        <button type="submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </main>
  );
}
