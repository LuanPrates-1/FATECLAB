package br.edu.fatec.fateclab.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Lê o header {@code Authorization: Bearer <token>}, valida via {@link JwtTokenProvider} e
 * popula o {@link SecurityContextHolder} com o usuário autenticado (id, e-mail, papel).
 * Requisições sem token válido seguem sem autenticação; endpoints protegidos são então
 * rejeitados pelo {@link SecurityConfig} (401), não por este filtro.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring("Bearer ".length());
            try {
                Claims claims = jwtTokenProvider.validarEExtrairClaims(token);
                var authenticatedUser =
                        new AuthenticatedUser(
                                jwtTokenProvider.extrairUsuarioId(claims),
                                jwtTokenProvider.extrairEmail(claims),
                                jwtTokenProvider.extrairPapel(claims));

                var authorities =
                        List.of(new SimpleGrantedAuthority("ROLE_" + authenticatedUser.papel()));
                var authentication =
                        new UsernamePasswordAuthenticationToken(
                                authenticatedUser, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException | IllegalArgumentException ignoredTokenInvalido) {
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}
