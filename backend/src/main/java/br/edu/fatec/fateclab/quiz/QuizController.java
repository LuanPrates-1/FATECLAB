package br.edu.fatec.fateclab.quiz;

import br.edu.fatec.fateclab.config.AuthenticatedUser;
import br.edu.fatec.fateclab.quiz.dto.LicaoResponse;
import br.edu.fatec.fateclab.quiz.dto.ResponderQuizRequest;
import br.edu.fatec.fateclab.quiz.dto.ResultadoQuizResponse;
import br.edu.fatec.fateclab.quiz.dto.VerificacaoResponse;
import br.edu.fatec.fateclab.quiz.dto.VerificarRespostaRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Lição, verificação de questão e envio do quiz de um módulo. */
@RestController
@RequestMapping("/api/trilhas/{trilhaId}/modulos/{moduloId}")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/licao")
    public LicaoResponse licao(
            @AuthenticationPrincipal AuthenticatedUser usuario,
            @PathVariable Long trilhaId,
            @PathVariable Long moduloId) {
        return quizService.buscarLicao(usuario, trilhaId, moduloId);
    }

    @PostMapping("/questoes/{questaoId}/verificar")
    public VerificacaoResponse verificar(
            @AuthenticationPrincipal AuthenticatedUser usuario,
            @PathVariable Long trilhaId,
            @PathVariable Long moduloId,
            @PathVariable Long questaoId,
            @Valid @RequestBody VerificarRespostaRequest request) {
        return quizService.verificar(usuario, trilhaId, moduloId, questaoId, request.alternativaId());
    }

    @PostMapping("/responder")
    public ResultadoQuizResponse responder(
            @AuthenticationPrincipal AuthenticatedUser usuario,
            @PathVariable Long trilhaId,
            @PathVariable Long moduloId,
            @Valid @RequestBody ResponderQuizRequest request) {
        return quizService.responder(usuario.id(), trilhaId, moduloId, request);
    }
}
