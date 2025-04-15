package org.o2.ai.mcp.config;

import org.o2.ai.mcp.app.service.MarketingService;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * 工具配置
 *
 * @author wei.cai@hand-china.com
 * @date 2025/4/11
 */
@Configuration
@EnableConfigurationProperties(MarketingProperties.class)
public class ToolConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ToolCallbackProvider marketingTools(MarketingService marketingService) {
        return MethodToolCallbackProvider.builder().toolObjects(marketingService).build();
    }

}
