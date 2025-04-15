/**
 * 錯誤類型定義模塊
 */

// 用戶錯誤基礎類別
import { UserError } from "fastmcp";

// 無效地點錯誤
export class InvalidLocationError extends UserError {
  constructor(location: string, validLocations: string[]) {
    super(`無效的地點名稱: ${location}。有效的地點包括: ${validLocations.join(", ")}`);
  }
}

// API 請求錯誤
export class ApiRequestError extends UserError {
  constructor(statusCode: number, message?: string) {
    super(`API請求失敗，狀態碼: ${statusCode}${message ? `，訊息: ${message}` : ''}`);
  }
}

// 連接錯誤
export class ConnectionError extends UserError {
  constructor(message: string) {
    super(`連接錯誤: ${message}`);
  }
}

// 數據處理錯誤
export class DataProcessingError extends UserError {
  constructor(message: string) {
    super(`數據處理錯誤: ${message}`);
  }
}