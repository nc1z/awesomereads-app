package com.nc1z.server.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable CSRF
        http.csrf().disable();

        // Protected Routes with /api/<type>/secure
        http.authorizeRequests(configurer ->
                configurer
                        .antMatchers("/api/books/secure/**")
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();

        // CORS filters
        http.cors();

        // Content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // Force a non-empty response body (401) to make it response friendly
        Okta.configureResourceServer401ResponseBody(http);

        return http.build();
    }
}
