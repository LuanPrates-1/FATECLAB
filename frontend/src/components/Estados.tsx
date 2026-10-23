import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

export function Carregando({ linhas = 3, rotulo = "Carregando" }: { linhas?: number; rotulo?: string }) {
  return (
    <div className="carregando" role="status" aria-live="polite">
      <span className="sr-only">{rotulo}...</span>
      {Array.from({ length: linhas }, (_, i) => (
        <div key={i} className="esqueleto" />
      ))}
    </div>
  );
}

export function ErroCarregamento({ mensagem, aoTentarDeNovo }: { mensagem: string; aoTentarDeNovo?: () => void }) {
  return (
    <div className="estado-vazio" role="alert">
      <AlertTriangle size={32} aria-hidden="true" />
      <p>{mensagem}</p>
      {aoTentarDeNovo && (
        <button type="button" className="botao botao-pequeno" onClick={aoTentarDeNovo}>
          Tentar de novo
        </button>
      )}
    </div>
  );
}

export function Vazio({ icone, children }: { icone: ReactNode; children: ReactNode }) {
  return (
    <div className="estado-vazio">
      {icone}
      {children}
    </div>
  );
}
