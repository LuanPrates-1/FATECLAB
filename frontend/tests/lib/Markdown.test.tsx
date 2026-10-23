import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Markdown } from "../../src/components/Markdown";

describe("Markdown das lições", () => {
  it("renderiza títulos, listas, negrito, código e blocos", () => {
    const { container } = render(
      <Markdown texto={"## Título\n\nTexto com **negrito** e `codigo`.\n\n- item 1\n- item 2\n\n```\nSELECT 1;\n```"} />,
    );
    expect(screen.getByRole("heading", { name: "Título" })).toBeInTheDocument();
    expect(screen.getByText("negrito").tagName).toBe("STRONG");
    expect(screen.getByText("codigo").tagName).toBe("CODE");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(container.querySelector("pre")).toHaveTextContent("SELECT 1;");
  });

  it("não interpreta HTML vindo do conteúdo", () => {
    const { container } = render(<Markdown texto={'<img src=x onerror="alert(1)"> texto'} />);
    expect(container.querySelector("img")).toBeNull();
    expect(container).toHaveTextContent('<img src=x onerror="alert(1)"> texto');
  });
});
