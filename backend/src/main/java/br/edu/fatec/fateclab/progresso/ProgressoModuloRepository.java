package br.edu.fatec.fateclab.progresso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProgressoModuloRepository extends JpaRepository<ProgressoModulo, Long> {

    boolean existsByModulo_Id(Long moduloId);

    long countByProgressoAluno_Id(Long progressoAlunoId);

    long countByProgressoAluno_Aluno_Id(Long alunoId);

    /** Quantos quizzes o aluno acertou por completo (conquista "Gabaritou"). */
    @Query(
            "select count(pm) from ProgressoModulo pm where pm.progressoAluno.aluno.id = :alunoId"
                    + " and pm.totalQuestoes > 0 and pm.acertos = pm.totalQuestoes")
    long contarGabaritos(@Param("alunoId") Long alunoId);
}
