import { BookOpen, Code2, Database, Globe, Network, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONES: Record<string, LucideIcon> = {
  programação: Code2,
  "banco de dados": Database,
  "engenharia de software": Workflow,
  infraestrutura: Network,
  redes: Network,
  web: Globe,
};

export function IconeArea({ area, tamanho = 22 }: { area: string; tamanho?: number }) {
  const Icone = ICONES[area.trim().toLowerCase()] ?? BookOpen;
  return (
    <span className="icone-area" aria-hidden="true">
      <Icone size={tamanho} strokeWidth={1.8} />
    </span>
  );
}
