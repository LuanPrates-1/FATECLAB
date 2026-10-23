package br.edu.fatec.fateclab.trilha;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuloRepository extends JpaRepository<Modulo, Long> {
    Optional<Modulo> findFirstByTrilhaIdOrderByOrdemAsc(Long trilhaId);

    Optional<Modulo> findByTrilhaIdAndOrdem(Long trilhaId, Integer ordem);
}
