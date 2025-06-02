package com.sourav.contactform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()  // Enable CORS support
                .and()
                .csrf().disable() // Usually disable CSRF for APIs like this
                .authorizeHttpRequests()
                .anyRequest().permitAll(); // Permit all requests without auth

        return http.build();
    }
}
