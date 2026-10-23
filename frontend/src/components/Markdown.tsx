import { Fragment } from "react";
import type { ReactNode } from "react";

/**
 * Renderiza o Markdown simplificado das lições: títulos (##), parágrafos, listas (-),
 * **negrito**, `código` e blocos ```. Gera elementos React (nunca HTML bruto), então
 * o conteúdo cadastrado pelo administrador não consegue injetar scripts.
 */
export function Markdown({ texto }: { texto: string }) {
  const blocos: ReactNode[] = [];
  const linhas = texto.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  let chave = 0;

  while (i < linhas.length) {
    const linha = linhas[i];

    if (linha.trim().startsWith("```")) {
      const codigo: string[] = [];
      i++;
      while (i < linhas.length && !linhas[i].trim().startsWith("```")) {
        codigo.push(linhas[i]);
        i++;
      }
      i++;
      blocos.push(
        <pre key={chave++} className="md-codigo">
          <code>{codigo.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (linha.startsWith("## ") || linha.startsWith("### ")) {
      blocos.push(<h3 key={chave++}>{inline(linha.replace(/^#+\s/, ""))}</h3>);
      i++;
      continue;
    }

    if (/^\s*-\s/.test(linha)) {
      const itens: string[] = [];
      while (i < linhas.length && /^\s*-\s/.test(linhas[i])) {
        itens.push(linhas[i].replace(/^\s*-\s/, ""));
        i++;
      }
      blocos.push(
        <ul key={chave++}>
          {itens.map((item, n) => (
            <li key={n}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (!linha.trim()) {
      i++;
      continue;
    }

    const paragrafo: string[] = [];
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      !linhas[i].trim().startsWith("```") &&
      !linhas[i].startsWith("## ") &&
      !/^\s*-\s/.test(linhas[i])
    ) {
      paragrafo.push(linhas[i]);
      i++;
    }
    blocos.push(<p key={chave++}>{inline(paragrafo.join(" "))}</p>);
  }

  return <div className="md">{blocos}</div>;
}

function inline(texto: string): ReactNode {
  const partes = texto.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return partes.map((parte, n) => {
    if (parte.startsWith("`") && parte.endsWith("`") && parte.length > 1) {
      return <code key={n}>{parte.slice(1, -1)}</code>;
    }
    if (parte.startsWith("**") && parte.endsWith("**") && parte.length > 3) {
      return <strong key={n}>{parte.slice(2, -2)}</strong>;
    }
    return <Fragment key={n}>{parte}</Fragment>;
  });
}
