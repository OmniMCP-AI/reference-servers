/**
 * 環境變數配置模組，負責載入和處理環境變數
 */
import dotenv from 'dotenv';
import { ConnectionError } from './errors.js';

// 載入環境變數
dotenv.config();

// 必要環境變數檢查
if (!process.env.CWA_API_KEY) {
  throw new ConnectionError('環境變數 CWA_API_KEY 未設定。請參考 .env.example 進行設定。');
}

// API 金鑰
export const API_KEY = process.env.CWA_API_KEY;

// API 請求配置
export const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '3', 10);
export const RETRY_DELAY_BASE = parseInt(process.env.RETRY_DELAY_BASE || '2', 10);
export const TIMEOUT_MS = parseInt(process.env.TIMEOUT_MS || '10000', 10);

// 計算重試延遲時間 (指數退避)
export const getRetryDelay = (retryCount: number): number => 
  Math.pow(RETRY_DELAY_BASE, retryCount) * 1000;