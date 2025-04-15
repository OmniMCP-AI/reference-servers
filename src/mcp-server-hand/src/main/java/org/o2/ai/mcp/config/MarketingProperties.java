package org.o2.ai.mcp.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 营销配置
 *
 * @author wei.cai@hand-china.com
 * @date 2025/4/11
 */
@ConfigurationProperties(prefix = "o2.ai")
@Data
public class MarketingProperties {
    /**
     * api地址
      */
    public String apiUrl = "https://api.coze.cn/v1/workflow/run";
    /**
     * 工作流id
     */
    public String workFlowId = "7491606297252642850";

}
