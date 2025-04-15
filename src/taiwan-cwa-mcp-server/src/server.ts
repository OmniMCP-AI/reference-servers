#!/usr/bin/env node

/**
 * 台灣中央氣象局 (CWA) MCP 伺服器
 * 使用 FastMCP 提供天氣資料 API
 */
import { FastMCP } from "fastmcp";
import { z } from "zod";
import { validateLocation } from "./locationValidator.js";
import { 
  fetchThreeDaysForecast, 
  fetchOneWeekForecast, 
  fetchHistoricalRainfall 
} from "./weatherFetcher.js";
import { 
  cleanThreeDaysForecastData, 
  cleanOneWeekForecastData, 
  cleanHistoricalRainfallData 
} from "./weatherProcessor.js";

// 初始化 MCP 伺服器
const server = new FastMCP({
  name: "Taiwan Weather API",
  version: "0.1.0",
});

const location_name_describe = `縣市名稱，必須是有效的台灣縣市名稱。
有效的縣/市名稱有：
宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 
臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 
基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 
雲林縣, 嘉義縣, 嘉義市, 屏東縣
`

// 三天天氣預報工具
server.addTool({
  name: "get_3_days_weather",
  description: "獲取指定縣市的3天天氣預報數據",
  parameters: z.object({
    location_name: z.string().describe(location_name_describe)
  }),
  execute: async (args) => {
    // 驗證地點名稱
    validateLocation(args.location_name);
    
    // 獲取天氣數據
    const rawData = await fetchThreeDaysForecast(args.location_name);
    
    // 清理和轉換數據
    const cleanedData = cleanThreeDaysForecastData(rawData);
    
    // 將結果轉換為JSON字符串以符合FastMCP的預期返回類型
    return JSON.stringify(cleanedData);
  },
});

// 一週天氣預報工具
server.addTool({
  name: "get_1_week_weather",
  description: "獲取指定縣市的1週天氣預報數據",
  parameters: z.object({
    location_name: z.string().describe(location_name_describe)
  }),
  execute: async (args) => {
    // 驗證地點名稱
    validateLocation(args.location_name);
    
    // 獲取天氣數據
    const rawData = await fetchOneWeekForecast(args.location_name);
    
    // 清理和轉換數據
    const cleanedData = cleanOneWeekForecastData(rawData);
    
    // 將結果轉換為JSON字符串以符合FastMCP的預期返回類型
    return JSON.stringify(cleanedData);
  },
});

// 歷史降雨量工具
server.addTool({
  name: "get_historical_rainfall",
  description: "獲取過去三天的雨量數據",
  parameters: z.object({}), // 無參數
  execute: async () => {
    // 獲取雨量數據
    const rawData = await fetchHistoricalRainfall();
    
    // 清理和轉換數據
    const cleanedData = cleanHistoricalRainfallData(rawData);
    
    // 將結果轉換為JSON字符串以符合FastMCP的預期返回類型
    return JSON.stringify(cleanedData);
  },
});

// 啟動伺服器
server.start({
  transportType: "stdio",
});
