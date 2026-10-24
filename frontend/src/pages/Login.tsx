import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError, MODO_DEMO, acordarServidor } from "../services/apiClient";
import { login as loginRequest } from "../services/authService";
import { useSessao } from "../hooks/useSessao";
import { MarcaFatecLab } from "../components/Logo";
import "./Auth.css";

const CONTAS_DEMO = [
  { rotulo: "Aluno", email: "aluno@fatec.sp.gov.br", senha: "aluno1234" },
  { rotulo: "Administrador", email: "admin@fatec.sp.gov.br", senha: "admin1234" },
];

export function Login() {
  const navigate = useNavigate();
  const { login } = useSessao();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    acordarServidor();
  }, []);

  async function entrar(emailInformado: string, senhaInformada: string) {
    setErro(null);
    setEnviando(true);
    try {
      const sessao = await loginRequest(emailInformado, senhaInformada);
      login(sessao.token, sessao.aluno);
      navigate(sessao.aluno.papel === "ADMINISTRADOR" ? "/admin" : "/trilhas");
    } catch (e) {
      setErro(e instanceof ApiError ? e.message : "Não foi possível entrar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    entrar(email, senha);
  }

  return (
    <div className="pagina-auth">
      <div className="auth-cabecalho">
        <MarcaFatecLab tamanho={56} />
        <h1>FatecLab</h1>
        <p>Estude por trilhas, ganhe XP e dispute o ranking com a sua turma.</p>
      </div>

      <form className="auth-formulario" onSubmit={aoSubmeter} noValidate>
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
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            autoComplete="current-password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && (
          <p role="alert" className="mensagem-erro">
            {erro}
          </p>
        )}

        <button type="submit" className="botao botao-principal botao-largo" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="auth-alternativa">
        Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
      </p>

      {/* Os atalhos expõem senhas públicas; no site hospedado o admin tem outra senha. */}
      {MODO_DEMO && (
        <details className="auth-demo">
          <summary>Testar com uma conta de demonstração</summary>
          <div className="auth-demo-botoes">
            {CONTAS_DEMO.map((conta) => (
              <button
                key={conta.email}
                type="button"
                className="botao botao-pequeno"
                disabled={enviando}
                onClick={() => entrar(conta.email, conta.senha)}
              >
                Entrar como {conta.rotulo.toLowerCase()}
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
