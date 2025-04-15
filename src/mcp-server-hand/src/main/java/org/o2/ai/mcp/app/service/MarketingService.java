package org.o2.ai.mcp.app.service;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.o2.ai.mcp.config.MarketingProperties;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/**
 * 营销服务
 *
 * @author wei.cai@hand-china.com
 * @date 2025/4/11
 */
@Service
@Slf4j
public class MarketingService {
    private final RestTemplate restTemplate;
    private final MarketingProperties marketingProperties;

    public MarketingService(RestTemplate restTemplate,
                            MarketingProperties marketingProperties) {
        this.restTemplate = restTemplate;
        this.marketingProperties = marketingProperties;
    }

    @Tool(description = "用户标签分群并推荐商品")
    public String segmentAndRecommend(@RequestParam String key, @ToolParam(description = "基于用户对话汇总的用户画像描述") String content) {
        //base64对key解密
        byte[] decodedBytes = Base64.getDecoder().decode(key + "=");
        String decodedString = new String(decodedBytes);

        // Create request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(decodedString);

        // Create request body
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, String> parameters = new HashMap<>();
        parameters.put("input",  content);

        requestBody.put("parameters",  parameters);
        requestBody.put("workflow_id",  marketingProperties.getWorkFlowId());

        // Create the HTTP entity
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // Make the POST request
            ResponseEntity<String> response = restTemplate.exchange(
                    marketingProperties.getApiUrl(),
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            // Process the response
            log.info("Response  Status: {}", response.getStatusCode());
            log.info("Response  Body: {}", response.getBody());
            final JSONObject jsonObject = JSON.parseObject(response.getBody());

            if (null == jsonObject || 0 != jsonObject.getLong("code")) {
                return "服务器繁忙，请稍后重试！";
            }

            return JSON.toJSONString(jsonObject.get("data"));
        } catch (Exception e) {
            log.error("Error  making request: ", e);
        }
        return "服务器繁忙，请稍后重试！";
    }


}
