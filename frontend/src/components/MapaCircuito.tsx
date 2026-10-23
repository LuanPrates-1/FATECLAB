import { useLayoutEffect, useRef, useState } from "react";
import { Check, Lock, Play } from "lucide-react";
import type { Modulo } from "../services/tipos";
import { plural } from "../lib/gamificacao";
import "./MapaCircuito.css";

export type EstadoModulo = "concluido" | "atual" | "bloqueado";

interface Props {
  modulos: Modulo[];
  estadoDe: (modulo: Modulo) => EstadoModulo;
  aoAbrir: (modulo: Modulo) => void;
}

const ALTURA_LINHA = 132;
const RAIO_NO = 30;
const MARGEM_TOPO = 44;

/**
 * Mapa da trilha desenhado como uma placa de circuito: cada módulo é um nó, e as trilhas de
 * cobre entre eles (com dobras de 45°) acendem conforme o aluno conclui os módulos.
 */
export function MapaCircuito({ modulos, estadoDe, aoAbrir }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(340);

  useLayoutEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const medir = () => setLargura(elemento.clientWidth || 340);
    medir();
    if (typeof ResizeObserver === "undefined") return;
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  const posicoes = modulos.map((_, i) => ({
    x: Math.round(largura * (i % 2 === 0 ? 0.3 : 0.7)),
    y: MARGEM_TOPO + i * ALTURA_LINHA,
  }));
  const altura = MARGEM_TOPO + Math.max(0, modulos.length - 1) * ALTURA_LINHA + RAIO_NO + 64;

  const segmentos = posicoes.slice(1).map((destino, i) => {
    const origem = posicoes[i];
    const dx = destino.x - origem.x;
    const reta = Math.max(8, (ALTURA_LINHA - Math.abs(dx)) / 2);
    const dobra1 = { x: origem.x, y: origem.y + reta };
    const dobra2 = { x: destino.x, y: destino.y - reta };
    const caminho = `M${origem.x} ${origem.y + RAIO_NO} L${dobra1.x} ${dobra1.y} L${dobra2.x} ${dobra2.y} L${destino.x} ${destino.y - RAIO_NO}`;
    // A trilha acende quando o módulo de origem foi concluído.
    const aceso = estadoDe(modulos[i]) === "concluido";
    return { caminho, dobra1, dobra2, aceso };
  });

  return (
    <div className="mapa-circuito" ref={ref} style={{ height: altura }}>
      <svg className="mapa-circuito-trilhas" width={largura} height={altura} aria-hidden="true">
        <defs>
          <filter id="brilho-ciano" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="desfoque" />
            <feMerge>
              <feMergeNode in="desfoque" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {segmentos.map((s, i) => (
          <g key={i} className={s.aceso ? "trilha-acesa" : "trilha-apagada"}>
            <path d={s.caminho} filter={s.aceso ? "url(#brilho-ciano)" : undefined} />
            <circle cx={s.dobra1.x} cy={s.dobra1.y} r={3.5} />
            <circle cx={s.dobra2.x} cy={s.dobra2.y} r={3.5} />
          </g>
        ))}
      </svg>

      <ol className="mapa-circuito-nos">
        {modulos.map((modulo, i) => {
          const estado = estadoDe(modulo);
          const lado = i % 2 === 0 ? "direita" : "esquerda";
          const Icone = estado === "concluido" ? Check : estado === "atual" ? Play : Lock;
          const descricaoEstado =
            estado === "concluido" ? "concluído" : estado === "atual" ? "disponível" : "bloqueado";
          return (
            <li
              key={modulo.id}
              className={`no-modulo no-${estado} rotulo-${lado}`}
              style={{ left: posicoes[i].x, top: posicoes[i].y }}
            >
              <button
                type="button"
                className="no-modulo-botao"
                disabled={estado === "bloqueado"}
                onClick={() => aoAbrir(modulo)}
                aria-label={`Módulo ${modulo.ordem}: ${modulo.titulo}, ${descricaoEstado}`}
              >
                <Icone size={estado === "atual" ? 24 : 22} strokeWidth={2.4} aria-hidden="true" />
              </button>
              <div className="no-modulo-rotulo" aria-hidden="true">
                <span className="no-modulo-ordem">Módulo {modulo.ordem}</span>
                <span className="no-modulo-titulo">{modulo.titulo}</span>
                <span className="no-modulo-meta">
                  <span className="valor-xp">{modulo.xpConcedido} XP</span>
                  {modulo.totalQuestoes ? `, ${plural(modulo.totalQuestoes, "questão", "questões")}` : ""}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
