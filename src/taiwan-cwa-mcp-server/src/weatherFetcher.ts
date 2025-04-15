/**
 * 提供天氣數據獲取功能的模組。
 */
import axios from 'axios';
import { 
  THREE_DAYS_FORECAST_ENDPOINT, 
  ONE_WEEK_FORECAST_ENDPOINT, 
  HISTORICAL_RAINFALL_ENDPOINT 
} from './constants.js';
import { ApiRequestError, ConnectionError } from './errors.js';
import { API_KEY, MAX_RETRIES, TIMEOUT_MS, getRetryDelay } from './config.js';

/**
 * 執行HTTP請求並處理重試邏輯
 * 
 * @param url - API端點URL
 * @param params - 請求參數
 * @param retries - 剩餘重試次數
 * @returns API響應數據
 * @throws {ApiRequestError} 如果API請求失敗
 * @throws {ConnectionError} 如果連接錯誤發生
 */
async function executeRequest(url: string, params: Record<string, string>, retries = MAX_RETRIES): Promise<any> {
  try {
    const response = await axios.get(url, {
      params,
      timeout: TIMEOUT_MS
    });
    
    return response.data;
  } catch (error: unknown) {
    // 處理連接超時錯誤
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new ConnectionError('連接超時，請檢查網絡連接');
    }
    
    // 處理HTTP錯誤
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message as string | undefined;
      
      // 針對429(請求過多)錯誤進行重試
      if (statusCode === 429 && retries > 0) {
        const delay = getRetryDelay(MAX_RETRIES - retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        return executeRequest(url, params, retries - 1);
      }
      
      throw new ApiRequestError(statusCode, errorMessage);
    }
    
    // 處理網絡連接錯誤並重試
    if (retries > 0) {
      const delay = getRetryDelay(MAX_RETRIES - retries);
      await new Promise(resolve => setTimeout(resolve, delay));
      return executeRequest(url, params, retries - 1);
    }
    
    // 最終錯誤無法恢復時
    throw new ConnectionError(`獲取天氣數據錯誤: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 獲取3天天氣預報數據
 * 
 * @param location - 縣市名稱
 * @returns 原始天氣數據
 */
export async function fetchThreeDaysForecast(location: string): Promise<any> {
  const params = {
    Authorization: API_KEY,
    LocationName: location
  };
  
  return executeRequest(THREE_DAYS_FORECAST_ENDPOINT, params);
}

/**
 * 獲取1週天氣預報數據
 * 
 * @param location - 縣市名稱
 * @returns 原始天氣數據
 */
export async function fetchOneWeekForecast(location: string): Promise<any> {
  const params = {
    Authorization: API_KEY,
    LocationName: location
  };
  
  return executeRequest(ONE_WEEK_FORECAST_ENDPOINT, params);
}

/**
 * 獲取過去三天的雨量數據
 * 
 * @returns 原始雨量數據
 */
export async function fetchHistoricalRainfall(): Promise<any> {
  const params = {
    Authorization: API_KEY
  };
  
  return executeRequest(HISTORICAL_RAINFALL_ENDPOINT, params);
}