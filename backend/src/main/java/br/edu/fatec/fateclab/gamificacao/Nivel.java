package br.edu.fatec.fateclab.gamificacao;

/**
 * Curva de níveis do aluno a partir do XP acumulado. O nível {@code n} começa em {@code 50 * n *
 * (n - 1)} XP: nível 2 em 100 XP, nível 3 em 300, nível 4 em 600, nível 5 em 1000. Cada nível exige
 * 100 XP a mais que o anterior, o que mantém o começo rápido e o avanço gradual.
 */
public final class Nivel {

    private static final int FATOR = 50;

    private Nivel() {}

    public static int calcular(int xpTotal) {
        int xp = Math.max(0, xpTotal);
        int nivel = 1;
        while (xpInicial(nivel + 1) <= xp) {
            nivel++;
        }
        return nivel;
    }

    /** XP necessário para alcançar o nível informado. */
    public static int xpInicial(int nivel) {
        return FATOR * nivel * (nivel - 1);
    }

    public static Info info(int xpTotal) {
        int nivel = calcular(xpTotal);
        return new Info(nivel, xpInicial(nivel), xpInicial(nivel + 1));
    }

    /** Nível atual, XP em que ele começou e XP em que o próximo começa. */
    public record Info(int nivel, int xpInicioNivel, int xpProximoNivel) {}
}
