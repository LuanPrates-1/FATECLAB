import { describe, expect, it } from "vitest";
import { calcularNivel, iniciais, infoNivel, xpInicialDoNivel } from "../../src/lib/gamificacao";
import { mesmoId } from "../../src/lib/ids";

describe("gamificação", () => {
  it("segue a mesma curva de níveis do back-end", () => {
    expect([1, 2, 3, 4, 5].map(xpInicialDoNivel)).toEqual([0, 100, 300, 600, 1000]);
    expect(calcularNivel(0)).toBe(1);
    expect(calcularNivel(99)).toBe(1);
    expect(calcularNivel(100)).toBe(2);
    expect(calcularNivel(1340)).toBe(5);
    expect(infoNivel(140)).toMatchObject({ nivel: 2, inicio: 100, proximo: 300 });
  });

  it("gera iniciais para o avatar", () => {
    expect(iniciais("byte_rafa")).toBe("BR");
    expect(iniciais("Calouro")).toBe("CA");
  });

  it("compara IDs numéricos e em texto", () => {
    expect(mesmoId(1, "1")).toBe(true);
    expect(mesmoId(1, 2)).toBe(false);
    expect(mesmoId(null, null)).toBe(false);
  });
});
