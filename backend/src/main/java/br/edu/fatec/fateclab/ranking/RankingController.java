package br.edu.fatec.fateclab.ranking;

import br.edu.fatec.fateclab.config.AuthenticatedUser;
import br.edu.fatec.fateclab.ranking.dto.RankingResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/** GET /ranking, per docs/api.md. */
@RestController
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/api/ranking")
    public RankingResponse ranking(@AuthenticationPrincipal AuthenticatedUser usuario) {
        return rankingService.obterRanking(usuario.id());
    }
}
