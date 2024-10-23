package com.flickr.security;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import com.vaadin.hilla.route.RouteUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

  private final RouteUtil routeUtil;

  public SecurityConfig(RouteUtil routeUtil) {
    this.routeUtil = routeUtil;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Set default security policy that permits Hilla internal requests and
    // denies all other
    http.authorizeHttpRequests(registry -> registry.requestMatchers(
            routeUtil::isRouteAllowed).permitAll());
    super.configure(http);
    // use a custom login view and redirect to root on logout
    setLoginView(http, "/login", "/");
  }

  @Bean
  public UserDetailsManager userDetailsService() {
    // Configure users and roles in memory
    return new InMemoryUserDetailsManager(
      // the {noop} prefix tells Spring that the password is not encoded
      User.withUsername("user").password("{noop}user").roles("USER").build(),
      User.withUsername("admin").password("{noop}admin").roles("ADMIN", "USER").build()
    );
  }
}