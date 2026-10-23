import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiError } from "../services/apiClient";
import { listarTrilhas } from "../services/trilhaService";
import type { NivelTrilha, Trilha } from "../services/trilhaService";

const NIVEIS: NivelTrilha[] = ["INICIANTE", "INTERMEDIARIO", "AVANCADO"];

export function ListaTrilhas() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [area, setArea] = useState("");
  const [nivel, setNivel] = useState<NivelTrilha | "">("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    listarTrilhas({ area: area || undefined, nivel: nivel || undefined })
      .then((resultado) => {
        if (!cancelado) setTrilhas(resultado);
      })
      .catch((e) => {
        if (!cancelado) {
          setErro(e instanceof ApiError ? e.message : "Não foi possível carregar as trilhas.");
        }
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [area, nivel]);

  return (
    <main className="pagina">
      <h1>Trilhas de estudo</h1>

      <div className="formulario" style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: "none" }}>
        <label htmlFor="filtro-area">
          Área
          <input
            id="filtro-area"
            type="text"
            placeholder="ex.: Programação"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>

        <label htmlFor="filtro-nivel">
          Nível
          <select
            id="filtro-nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value as NivelTrilha | "")}
          >
            <option value="">Todos</option>
            {NIVEIS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}

      {carregando && <p>Carregando trilhas...</p>}

      {!carregando && !erro && trilhas.length === 0 && (
        <p>Nenhuma trilha encontrada para esse filtro.</p>
      )}

      <ul className="grade-trilhas" style={{ listStyle: "none", padding: 0 }}>
        {trilhas.map((trilha) => (
          <li key={trilha.id}>
            <Link to={`/trilhas/${trilha.id}`}>
              <article>
                <h2>{trilha.titulo}</h2>
                <p>
                  {trilha.area} · {trilha.nivel}
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
