package br.edu.fatec.fateclab.gamificacao;

/** Conquistas calculadas a partir do histórico do aluno (não são armazenadas no banco). */
public enum Conquista {
    PRIMEIRO_PASSO("Primeiro passo", "Conclua seu primeiro módulo"),
    MARATONISTA("Maratonista", "Conclua 10 módulos"),
    TRILHA_COMPLETA("Trilha completa", "Conclua uma trilha inteira"),
    GABARITOU("Gabaritou", "Acerte todas as questões de um quiz"),
    EM_CHAMAS("Em chamas", "Estude 3 dias seguidos"),
    IMPARAVEL("Imparável", "Estude 7 dias seguidos"),
    PODIO("Pódio", "Fique entre os 3 primeiros do ranking"),
    VETERANO("Veterano", "Alcance o nível 5");

    private final String titulo;
    private final String descricao;

    Conquista(String titulo, String descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }
}
