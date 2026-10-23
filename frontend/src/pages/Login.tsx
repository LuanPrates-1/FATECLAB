import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../services/apiClient";
import { login as loginRequest } from "../services/authService";
import { useSessao } from "../hooks/useSessao";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const { login } = useSessao();
  const navigate = useNavigate();

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const sessao = await loginRequest(email, senha);
      login(sessao.token, sessao.aluno);
      navigate("/trilhas");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="pagina">
      <h1>Entrar no FatecLab</h1>
      <form className="formulario" onSubmit={aoSubmeter}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <p role="alert" className="erro">
            {erro}
          </p>
        )}

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p>
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </main>
  );
}
