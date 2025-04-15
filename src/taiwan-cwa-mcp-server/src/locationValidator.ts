/**
 * 提供地點驗證功能的模組。
 */
import { VALID_LOCATIONS } from './constants.js';
import { InvalidLocationError } from './errors.js';

/**
 * 驗證地點名稱是否有效
 * 
 * @param location - 要驗證的地點名稱
 * @returns 如果地點名稱有效則返回true，否則拋出錯誤
 * @throws {InvalidLocationError} 如果地點名稱無效
 */
export function validateLocation(location: string): boolean {
  if (!VALID_LOCATIONS.includes(location)) {
    throw new InvalidLocationError(location, VALID_LOCATIONS);
  }
  return true;
}