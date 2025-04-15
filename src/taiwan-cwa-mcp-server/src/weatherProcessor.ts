/**
 * 提供天氣數據處理和清理功能的模組。
 */
import { DataProcessingError } from './errors.js';

// 用於定義時間點數據格式的類型
type TimePoint = [string, string]; // [時間字符串, 值]

// 用於定義天氣元素的類型
interface WeatherElement {
  ElementName: string;
  Time: TimePoint[];
}

// 用於定義雨量站點數據的類型
interface RainfallStation {
  name: string;
  time: string;
  loc: string;
  geo: [number | null, number | null];
  rain: (number | null)[];
}

// 用於定義降雨量數據的返回類型
interface RainfallData {
  rain_labels: string[];
  stations: RainfallStation[];
}

/**
 * 清理和轉換3天天氣預報數據
 * 
 * @param data - 原始天氣數據
 * @returns 處理後的天氣數據
 * @throws {DataProcessingError} 如果數據處理期間發生錯誤
 */
export function cleanThreeDaysForecastData(data: any): WeatherElement[] {
  try {
    // 獲取WeatherElement部分
    const weatherElements = data.records.Locations[0].Location[0].WeatherElement;
    
    // 處理結果
    const result: WeatherElement[] = [];
    
    // 遍歷每個天氣元素
    for (const element of weatherElements) {
      const elementName = element.ElementName;
      
      // 跳過露點溫度
      if (elementName === "露點溫度") {
        continue;
      }
      
      // 處理時間和值
      const cleanedElement: WeatherElement = {
        ElementName: elementName,
        Time: []
      };
      
      for (const timeData of element.Time) {
        // 處理時間格式
        let timeStr: string;
        
        if ("DataTime" in timeData) {
          // 只保留日期和小時，去掉秒和時區
          timeStr = timeData.DataTime.split("+")[0];
          // 只保留到分鐘
          timeStr = timeStr.substring(0, 16);
        } else if ("StartTime" in timeData) {
          // 對於使用StartTime的字段，如降水概率
          timeStr = timeData.StartTime.split("+")[0];
          timeStr = timeStr.substring(0, 16);
        } else {
          continue; // 跳過沒有時間信息的數據
        }
        
        // 處理值
        if ("ElementValue" in timeData && timeData.ElementValue.length > 0) {
          // 根據不同的天氣元素類型獲取相應的值
          let value: string | null = null;
          const elementValue = timeData.ElementValue[0];
          
          if (elementName === "溫度" && "Temperature" in elementValue) {
            value = elementValue.Temperature;
          } else if (elementName === "相對濕度" && "RelativeHumidity" in elementValue) {
            value = elementValue.RelativeHumidity;
          } else if (elementName === "體感溫度" && "ApparentTemperature" in elementValue) {
            value = elementValue.ApparentTemperature;
          } else if (elementName === "舒適度指數" && "ComfortIndex" in elementValue) {
            value = elementValue.ComfortIndex;
          } else if (elementName === "風向" && "WindDirection" in elementValue) {
            value = elementValue.WindDirection;
          } else if (elementName === "風速" && "WindSpeed" in elementValue) {
            value = elementValue.WindSpeed;
          } else if (elementName === "3小時降雨機率" && "ProbabilityOfPrecipitation" in elementValue) {
            value = elementValue.ProbabilityOfPrecipitation;
          } else if (elementName === "天氣現象" && "Weather" in elementValue) {
            value = elementValue.Weather;
          } else if (elementName === "天氣預報綜合描述" && "WeatherDescription" in elementValue) {
            value = elementValue.WeatherDescription;
          }
          
          // 添加到結果
          if (value !== null) {
            cleanedElement.Time.push([timeStr, value]);
          }
        }
      }
      
      // 只在有時間數據時添加到結果
      if (cleanedElement.Time.length > 0) {
        result.push(cleanedElement);
      }
    }
    
    return result;
  } catch (error) {
    throw new DataProcessingError(`處理3天天氣預報數據時發生錯誤: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 清理和轉換1週天氣預報數據
 * 
 * @param data - 原始天氣數據
 * @returns 處理後的天氣數據
 * @throws {DataProcessingError} 如果數據處理期間發生錯誤
 */
export function cleanOneWeekForecastData(data: any): WeatherElement[] {
  try {
    // 獲取WeatherElement部分
    const weatherElements = data.records.Locations[0].Location[0].WeatherElement;
    
    // 處理結果
    const result: WeatherElement[] = [];
    
    // 遍歷每個天氣元素
    for (const element of weatherElements) {
      const elementName = element.ElementName;
      
      // 跳過平均露點溫度
      if (elementName === "平均露點溫度") {
        continue;
      }
      
      // 處理時間和值
      const cleanedElement: WeatherElement = {
        ElementName: elementName,
        Time: []
      };
      
      for (const timeData of element.Time) {
        // 處理時間格式
        let timeStr: string;
        
        if ("DataTime" in timeData) {
          // 只保留日期和小時，去掉秒和時區
          timeStr = timeData.DataTime.split("+")[0];
          // 只保留到分鐘
          timeStr = timeStr.substring(0, 16);
        } else if ("StartTime" in timeData) {
          // 對於使用StartTime的字段，如降水概率
          timeStr = timeData.StartTime.split("+")[0];
          timeStr = timeStr.substring(0, 16);
        } else {
          continue; // 跳過沒有時間信息的數據
        }
        
        // 處理值
        if ("ElementValue" in timeData && timeData.ElementValue.length > 0) {
          // 根據不同的天氣元素類型獲取相應的值
          let value: string | null = null;
          const elementValue = timeData.ElementValue[0];
          
          if (elementName === "平均溫度" && "Temperature" in elementValue) {
            value = elementValue.Temperature;
          } else if (elementName === "最高溫度" && "MaxTemperature" in elementValue) {
            value = elementValue.MaxTemperature;
          } else if (elementName === "最低溫度" && "MinTemperature" in elementValue) {
            value = elementValue.MinTemperature;
          } else if (elementName === "平均相對濕度" && "RelativeHumidity" in elementValue) {
            value = elementValue.RelativeHumidity;
          } else if (elementName === "最高體感溫度" && "MaxApparentTemperature" in elementValue) {
            value = elementValue.MaxApparentTemperature;
          } else if (elementName === "最低體感溫度" && "MinApparentTemperature" in elementValue) {
            value = elementValue.MinApparentTemperature;
          } else if (elementName === "最大舒適度指數" && "MaxComfortIndex" in elementValue) {
            value = elementValue.MaxComfortIndex;
          } else if (elementName === "最小舒適度指數" && "MinComfortIndex" in elementValue) {
            value = elementValue.MinComfortIndex;
          } else if (elementName === "風速" && "WindSpeed" in elementValue) {
            value = elementValue.WindSpeed;
          } else if (elementName === "風向" && "WindDirection" in elementValue) {
            value = elementValue.WindDirection;
          } else if (elementName === "12小時降雨機率" && "ProbabilityOfPrecipitation" in elementValue) {
            value = elementValue.ProbabilityOfPrecipitation;
          } else if (elementName === "紫外線指數" && "UVExposureLevel" in elementValue) {
            value = elementValue.UVExposureLevel;
          } else if (elementName === "天氣現象" && "Weather" in elementValue) {
            value = elementValue.Weather;
          } else if (elementName === "天氣預報綜合描述" && "WeatherDescription" in elementValue) {
            value = elementValue.WeatherDescription;
          }
          
          // 添加到結果
          if (value !== null) {
            cleanedElement.Time.push([timeStr, value]);
          }
        }
      }
      
      // 只在有時間數據時添加到結果
      if (cleanedElement.Time.length > 0) {
        result.push(cleanedElement);
      }
    }
    
    return result;
  } catch (error) {
    throw new DataProcessingError(`處理1週天氣預報數據時發生錯誤: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 清理和轉換歷史降雨量數據
 * 
 * @param data - 原始降雨量數據
 * @returns 處理後的降雨量數據
 * @throws {DataProcessingError} 如果數據處理期間發生錯誤
 */
export function cleanHistoricalRainfallData(data: any): RainfallData {
  try {
    // 定義降雨量標籤
    const rainLabels = [
      "Now", "Past10Min", "Past1hr", 
      "Past3hr", "Past6Hr", "Past12hr",
      "Past24hr", "Past2days", "Past3days"
    ];
    
    // 處理站點數據
    const stations: RainfallStation[] = [];
    
    for (const stationData of data.records.Station) {
      // 獲取站點名稱
      const name = stationData.StationName;
      
      // 獲取觀測時間
      const time = stationData.ObsTime.DateTime;
      
      // 獲取位置信息
      const county = stationData.GeoInfo.CountyName;
      const town = stationData.GeoInfo.TownName;
      const loc = `${county},${town}`;
      
      // 找到WGS84坐標系統的緯度和經度
      let lat: number | null = null;
      let lon: number | null = null;
      
      for (const coord of stationData.GeoInfo.Coordinates) {
        if (coord.CoordinateName === "WGS84") {
          lat = coord.StationLatitude;
          lon = coord.StationLongitude;
          break;
        }
      }
      
      // 獲取不同時間段的降雨量數據
      const rainfallElement = stationData.RainfallElement;
      const rain = [
        rainfallElement.Now.Precipitation,
        rainfallElement.Past10Min.Precipitation,
        rainfallElement.Past1hr.Precipitation,
        rainfallElement.Past3hr.Precipitation,
        rainfallElement.Past6Hr.Precipitation,
        rainfallElement.Past12hr.Precipitation,
        rainfallElement.Past24hr.Precipitation,
        rainfallElement.Past2days.Precipitation,
        rainfallElement.Past3days.Precipitation
      ];
      
      // 添加到結果
      const stationInfo: RainfallStation = {
        name,
        time,
        loc,
        geo: [lat, lon],
        rain
      };
      
      stations.push(stationInfo);
    }
    
    // 建構最終結果
    const result: RainfallData = {
      rain_labels: rainLabels,
      stations
    };
    
    return result;
  } catch (error) {
    throw new DataProcessingError(`處理降雨量數據時發生錯誤: ${error instanceof Error ? error.message : String(error)}`);
  }
}