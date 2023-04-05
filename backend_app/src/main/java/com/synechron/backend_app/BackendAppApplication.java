package com.synechron.backend_app;

import com.synechron.backend_app.configuration.CustomCorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendAppApplication.class, args);
	}

	@Bean
	WebMvcConfigurer webMvcConfigurer() {
		return new CustomCorsFilter();
	}

}
