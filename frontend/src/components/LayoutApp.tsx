import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Flame, Map, Settings2, Trophy, UserRound, Zap } from "lucide-react";
import { useSessao } from "../hooks/useSessao";
import { Logo } from "./Logo";
import "./LayoutApp.css";

interface Props {
  children: ReactNode;
  /** Telas de foco (lição, quiz) escondem a navegação inferior. */
  semNavegacao?: boolean;
}

export function LayoutApp({ children, semNavegacao = false }: Props) {
  const { usuario, isAdmin } = useSessao();
  const ofensiva = usuario?.ofensiva ?? 0;

  return (
    <div className="layout-app">
      {!semNavegacao && (
        <header className="barra-topo">
          <Logo tamanho={24} />
          {!isAdmin && (
            <div className="barra-topo-indicadores">
              <span
                className={`indicador indicador-ofensiva${ofensiva > 0 ? " ativo" : ""}`}
                title="Ofensiva: dias seguidos estudando"
              >
                <Flame size={16} aria-hidden="true" />
                <span className="sr-only">Ofensiva de</span>
                {ofensiva}
                <span className="sr-only">{ofensiva === 1 ? "dia" : "dias"}</span>
              </span>
              <span className="indicador indicador-xp" title="XP total">
                <Zap size={16} aria-hidden="true" />
                {usuario?.xpTotal ?? 0}
                <span className="sr-only">XP</span>
              </span>
            </div>
          )}
        </header>
      )}

      <main className={`conteudo-app${semNavegacao ? " conteudo-app-foco" : ""}`}>{children}</main>

      {!semNavegacao && (
        <nav className="navegacao" aria-label="Navegação principal">
          <NavLink to="/trilhas" className="navegacao-item">
            <Map size={22} aria-hidden="true" />
            Trilhas
          </NavLink>
          <NavLink to="/ranking" className="navegacao-item">
            <Trophy size={22} aria-hidden="true" />
            Ranking
          </NavLink>
          <NavLink to="/perfil" className="navegacao-item">
            <UserRound size={22} aria-hidden="true" />
            Perfil
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="navegacao-item">
              <Settings2 size={22} aria-hidden="true" />
              Admin
            </NavLink>
          )}
        </nav>
      )}
    </div>
  );
}
