package br.edu.fatec.fateclab.progresso;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressoAlunoRepository extends JpaRepository<ProgressoAluno, Long> {
    Optional<ProgressoAluno> findByAlunoIdAndTrilhaId(Long alunoId, Long trilhaId);

    List<ProgressoAluno> findByAlunoId(Long alunoId);

    boolean existsByModuloAtual_Id(Long moduloId);
}
