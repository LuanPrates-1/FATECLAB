import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../services/apiClient";
import { cadastrar } from "../services/authService";
import { useSessao } from "../hooks/useSessao";

export function Cadastro() {
  const [nome, setNome] = useState("");
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
      const sessao = await cadastrar(nome, email, senha);
      login(sessao.token, sessao.aluno);
      navigate("/trilhas");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível concluir o cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="pagina">
      <h1>Criar conta no FatecLab</h1>
      <form className="formulario" onSubmit={aoSubmeter}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="email">E-mail institucional da Fatec</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu.nome@fatec.sp.gov.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          required
          minLength={8}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <p role="alert" className="erro">
            {erro}
          </p>
        )}

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </main>
  );
}
