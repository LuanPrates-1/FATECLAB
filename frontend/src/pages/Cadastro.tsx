import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ApiError } from "../services/apiClient";
import { cadastrar } from "../services/authService";
import { useSessao } from "../hooks/useSessao";
import "./Auth.css";

export function Cadastro() {
  const navigate = useNavigate();
  const { login } = useSessao();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    setEnviando(true);
    try {
      const sessao = await cadastrar(nome, email, senha);
      login(sessao.token, sessao.aluno);
      navigate("/trilhas");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível criar a conta. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="pagina-auth">
      <Link to="/login" className="auth-voltar">
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar para o login
      </Link>

      <div className="auth-cabecalho auth-cabecalho-compacto">
        <h1>Criar conta</h1>
        <p>Use seu e-mail da Fatec. Seu primeiro nome vira o apelido no ranking, e dá para trocar depois.</p>
      </div>

      <form className="auth-formulario" onSubmit={aoSubmeter} noValidate>
        <div className="campo">
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail institucional</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="nome.sobrenome@fatec.sp.gov.br"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="ajuda">Somente endereços @fatec.sp.gov.br são aceitos.</span>
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span className="ajuda">Pelo menos 8 caracteres.</span>
        </div>

        {erro && (
          <p role="alert" className="mensagem-erro">
            {erro}
          </p>
        )}

        <button type="submit" className="botao botao-principal botao-largo" disabled={enviando}>
          {enviando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
