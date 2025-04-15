package com.example.smc.services;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Service;

@Service
public class GreetingsService {

    
    @Tool(description = "Get personalized greeting message for a specific user name")
    public String getPersonalizedGreeting(
        @ToolParam(description = "user name") String name
        ) {
        return String.format(
            "{\"id\": \"%s\", \"message\": \"%s\", \"date\": \"%s\"}",
            java.util.UUID.randomUUID().toString(),
            "Hello, " + name + "!",
            java.time.LocalDate.now().toString()
        );
    }

}
