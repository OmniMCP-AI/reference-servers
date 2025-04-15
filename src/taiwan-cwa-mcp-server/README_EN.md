# Taiwan Central Weather Administration MCP Server

This project provides a Model Context Protocol (MCP) server that interfaces with the Taiwan Central Weather Administration (CWA) API, allowing you to easily access weather data for Taiwan.

[中文版](README.md) | [English](README_EN.md)

## ✨ Features

- Get 3-day weather forecast data for Taiwan counties and cities
- Get 1-week weather forecast data for Taiwan counties and cities
- Get historical rainfall data for the past three days
- Automatic data cleaning and format conversion
- Error handling mechanism with retry logic
- Simplified API output with only essential information

## 🚀 Installation

### Claude Desktop Setup

1. **Install Claude Desktop**
   - Download [Claude Desktop](https://claude.ai/download)
   - Ensure you have the latest version (Menu: Claude -> Check for Updates...)

2. **Configure MCP Server**

   ```json
   {
     "mcpServers": {
       "taiwan-weather": {
         "command": "npx",
         "args": [
           "taiwan-cwa-mcp-server"
         ],
         "env": {
           "CWA_API_KEY": "YOUR_API_KEY"
         }
       }
     }
   }
   ```

   - Replace `YOUR_API_KEY` with the API key obtained from the Central Weather Administration

### Running from a Local Development Version

```json
{
  "mcpServers": {
    "taiwan-weather": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/src/server.ts"
      ],
      "env": {
        "CWA_API_KEY": "YOUR_API_KEY",
        "MAX_RETRIES": "3",
        "TIMEOUT_MS": "10000"
      }
    }
  }
}
```

## 🛠️ Available Tools

### get_3_days_weather

Get 3-day weather forecast data for a specified county or city.

**Parameters:**

- `location_name` (string): County or city name, must be a valid Taiwan county or city name

Valid county/city names include: 宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣

### get_1_week_weather

Get 1-week weather forecast data for a specified county or city.

**Parameters:**

- `location_name` (string): County or city name, must be a valid Taiwan county or city name

Valid county/city names include: 宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣

### get_historical_rainfall

Get rainfall data for the past three days.

## 🧪 Development

### Environment Variables Configuration

This project uses the `.env` file for configuration. Please refer to `.env.example` and create your own `.env` file:

```text
# API Key Configuration
CWA_API_KEY=YOUR_API_KEY_HERE

# API Request Settings
MAX_RETRIES=3
RETRY_DELAY_BASE=2
TIMEOUT_MS=10000
```

### Test with `fastmcp dev`

The fastest way to test and debug your server is with `fastmcp dev`:

```bash
npm run dev  # or npx fastmcp dev src/server.ts
```

This will run your server with [`mcp-cli`](https://github.com/wong2/mcp-cli) for testing and debugging your MCP server in the terminal.

### Inspect with `MCP Inspector`

Another way is to use the official [`MCP Inspector`](https://modelcontextprotocol.io/docs/tools/inspector) to inspect your server with a Web UI:

```bash
npm run inspect  # or npx fastmcp inspect src/server.ts
```

## CWA API Resources

To use this project, you need to obtain an API key from the Central Weather Administration:

- CWA Open Data Platform: [https://opendata.cwa.gov.tw/index]
- API Documentation: [https://opendata.cwa.gov.tw/dist/opendata-swagger.html]
- API Key Application Guide: [https://www.hlbh.hlc.edu.tw/resource/openfid.php?id=38959]

## Data Format

### Weather Forecast Data Format

```json
[
  {
    "ElementName": "Temperature",
    "Time": [
      ["2025-04-11T00:00", "21"],
      ["2025-04-11T01:00", "21"],
      ...
    ]
  },
  {
    "ElementName": "Relative Humidity",
    "Time": [
      ["2025-04-11T00:00", "90"],
      ["2025-04-11T01:00", "89"],
      ...
    ]
  },
  ...
]
```

### Rainfall Data Format

```json
{
  "rain_labels": ["Now", "Past10Min", "Past1hr", "Past3hr", "Past6Hr", "Past12hr", "Past24hr", "Past2days", "Past3days"],
  "stations": [
    {
      "name": "Station Name",
      "time": "Observation Time",
      "loc": "County,Town",
      "geo": [latitude, longitude],
      "rain": [current, past10min, past1hr, past3hr, past6hr, past12hr, past24hr, past2days, past3days]
    },
    ...
  ]
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Visit the [issues page](https://github.com/stephen9412/taiwan-cwa-mcp-server/issues).

## 📄 License

[MIT License](LICENSE) - Copyright (c) 2025 Stephen J. Li
