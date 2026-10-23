package br.edu.fatec.fateclab.trilha;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrilhaRepository extends JpaRepository<TrilhaDeEstudo, Long> {

    List<TrilhaDeEstudo> findByAtivaTrueAndAreaAndNivel(String area, NivelTrilha nivel);

    List<TrilhaDeEstudo> findByAtivaTrueAndArea(String area);

    List<TrilhaDeEstudo> findByAtivaTrueAndNivel(NivelTrilha nivel);

    List<TrilhaDeEstudo> findByAtivaTrue();

    Optional<TrilhaDeEstudo> findByIdAndAtivaTrue(Long id);
}
