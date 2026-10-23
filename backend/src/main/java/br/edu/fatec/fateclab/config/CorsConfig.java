package br.edu.fatec.fateclab.config;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Libera as origens do front-end, publicado separadamente do back-end. Aceita uma lista separada
 * por vírgulas e curingas (ex.: {@code https://*.vercel.app}) na variável FATECLAB_CORS_ORIGENS.
 */
@Configuration
public class CorsConfig {

    @Value("${fateclab.cors.origens:http://localhost:5173,http://localhost:4173}")
    private String origens;

    public CorsConfigurationSource corsConfigurationSource() {
        List<String> padroes =
                Arrays.stream(origens.split(","))
                        .map(String::trim)
                        .filter(origem -> !origem.isEmpty())
                        .toList();

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(padroes);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
