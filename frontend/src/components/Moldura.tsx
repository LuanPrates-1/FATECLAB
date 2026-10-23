import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { MODO_DEMO } from "../services/apiClient";
import { MarcaFatecLab } from "./Logo";
import "./Moldura.css";

function useHora() {
  const formatar = () =>
    new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [hora, setHora] = useState(formatar);
  useEffect(() => {
    const id = setInterval(() => setHora(formatar()), 20_000);
    return () => clearInterval(id);
  }, []);
  return hora;
}

async function reiniciar() {
  const { reiniciarDemo } = await import("../demo/mockApi");
  reiniciarDemo();
  try {
    localStorage.removeItem("fateclab.token");
    localStorage.removeItem("fateclab.usuario");
  } catch {
    // sem armazenamento
  }
  window.location.reload();
}

/**
 * Em telas grandes, mostra o app dentro de um aparelho com barra de status e uma apresentação
 * ao lado. Em celulares, o app ocupa a tela inteira e a moldura desaparece.
 */
export function Moldura({ children }: { children: ReactNode }) {
  const hora = useHora();

  return (
    <div className="palco">
      <aside className="palco-apresentacao">
        <div className="palco-marca">
          <MarcaFatecLab tamanho={44} />
          <h1>FatecLab</h1>
        </div>
        <p className="palco-chamada">Trilhas de estudo para quem quer ir além da sala de aula.</p>
        <p className="palco-texto">
          Escolha uma disciplina, estude por módulos curtos e prove o que aprendeu em quizzes. Cada
          acerto vale XP, cada dia de estudo mantém sua ofensiva e o ranking mostra quem está
          puxando a turma.
        </p>
        <p className="palco-dica">No celular, o FatecLab abre em tela cheia e pode ser instalado como app.</p>
        {MODO_DEMO && (
          <div className="palco-demo">
            <p>
              Modo demonstração: tudo funciona sem servidor, e o progresso fica salvo só neste
              navegador.
            </p>
            <button type="button" className="botao botao-pequeno" onClick={reiniciar}>
              Reiniciar demonstração
            </button>
          </div>
        )}
        <p className="palco-creditos">
          Trabalho de Graduação, Fatec Campinas
          <br />
          Luan Prates e Raphael Langer, com orientação do Prof. Adriano Cilhos Doimo
        </p>
      </aside>

      <div className="aparelho">
        <div className="aparelho-tela">
          <div className="barra-status" aria-hidden="true">
            <span>{hora}</span>
            <span className="barra-status-ilha" />
            <span className="barra-status-icones">
              <Signal size={14} />
              <Wifi size={14} />
              <BatteryFull size={16} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
