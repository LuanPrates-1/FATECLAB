package br.edu.fatec.fateclab.config;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Emite e valida JWTs stateless (docs/arquitetura.md). O token carrega o id e o papel do usuário como
 * claims para que o filtro de autenticação não precise consultar o banco a cada requisição.
 */
@Component
public class JwtTokenProvider {

    private static final String CLAIM_PAPEL = "papel";
    private static final String CLAIM_USUARIO_ID = "usuarioId";

    private final SecretKey chave;
    private final Duration expiracao;

    public JwtTokenProvider(
            @Value("${fateclab.auth.jwt-secret}") String segredo,
            @Value("${fateclab.auth.jwt-expiracao-minutos}") long expiracaoMinutos) {
        this.chave = Keys.hmacShaKeyFor(segredo.getBytes(StandardCharsets.UTF_8));
        this.expiracao = Duration.ofMinutes(expiracaoMinutos);
    }

    public String gerarToken(Usuario usuario) {
        Instant agora = Instant.now();
        return Jwts.builder()
                .subject(usuario.getEmail())
                .claim(CLAIM_USUARIO_ID, usuario.getId())
                .claim(CLAIM_PAPEL, usuario.getPapel().name())
                .issuedAt(Date.from(agora))
                .expiration(Date.from(agora.plus(expiracao)))
                .signWith(chave)
                .compact();
    }

    /** Retorna as claims do token se válido, ou lança JwtException se inválido/expirado. */
    public Claims validarEExtrairClaims(String token) throws JwtException {
        return Jwts.parser().verifyWith(chave).build().parseSignedClaims(token).getPayload();
    }

    public String extrairEmail(Claims claims) {
        return claims.getSubject();
    }

    public Long extrairUsuarioId(Claims claims) {
        return claims.get(CLAIM_USUARIO_ID, Long.class);
    }

    public PapelUsuario extrairPapel(Claims claims) {
        return PapelUsuario.valueOf(claims.get(CLAIM_PAPEL, String.class));
    }
}
