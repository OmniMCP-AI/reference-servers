package com.example.smc;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.smc.services.GreetingsService;
import com.example.smc.services.NumberService;

@SpringBootApplication
public class SimpleMcpServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleMcpServerApplication.class, args);
	}

	@Bean
	public ToolCallbackProvider greetingTools(GreetingsService s, NumberService n) {
		return MethodToolCallbackProvider.builder().toolObjects(s, n).build();
	}
}
