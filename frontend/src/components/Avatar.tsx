import { iniciais } from "../lib/gamificacao";

/** Avatar com as iniciais do apelido; a cor do contorno marca o aluno logado. */
export function Avatar({ nome, tamanho = 40, destaque = false }: { nome: string | null | undefined; tamanho?: number; destaque?: boolean }) {
  return (
    <span
      className={`avatar${destaque ? " avatar-destaque" : ""}`}
      style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.38 }}
      aria-hidden="true"
    >
      {iniciais(nome)}
    </span>
  );
}
