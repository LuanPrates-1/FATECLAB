package br.edu.fatec.fateclab.saude;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Verificação pública de disponibilidade. Também serve para "acordar" o servidor em planos
 * gratuitos de hospedagem que suspendem a aplicação quando ociosa.
 */
@RestController
public class SaudeController {

    @GetMapping("/api/saude")
    public Map<String, String> saude() {
        return Map.of("status", "ok");
    }
}
