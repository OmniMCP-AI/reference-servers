package com.example.smc.services;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Service;

@Service
public class NumberService {

    @Tool(description = "Add two integers")
    public int add(
        @ToolParam(description = "First integer") int a,
        @ToolParam(description = "Second integer") int b
    ) {
        return a + b;
    }

    @Tool(description = "Subtract one integer from another")
    public int subtract(
        @ToolParam(description = "First integer") int a,
        @ToolParam(description = "Second integer") int b
    ) {
        return a - b;
    }

    @Tool(description = "Multiply two integers")
    public int multiply(
        @ToolParam(description = "First integer") int a,
        @ToolParam(description = "Second integer") int b
    ) {
        return a * b;
    }

    @Tool(description = "Divide one integer by another")
    public double divide(
        @ToolParam(description = "Numerator") int a,
        @ToolParam(description = "Denominator") int b
    ) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero is not allowed.");
        }
        return (double) a / b;
    }

    @Tool(description = "Generate a random integer within a range")
    public int randomInt(
        @ToolParam(description = "Minimum value") int min,
        @ToolParam(description = "Maximum value") int max
    ) {
        if (min > max) {
            throw new IllegalArgumentException("Min cannot be greater than max.");
        }
        return ThreadLocalRandom.current().nextInt(min, max + 1);
    }
}
