# sample-cpp-mcp-servers
- C++によるMCP Serversの実装例のサンプルです
- 以下の記事で書いたC++による実装そのままです
  [MCP Serversに入門してみる - いろはの物置き場](https://168iroha.net/blog/article/202504132245/)
- 標準入出力によるもののみ動作確認しています
- プロトコルを使うことが目的のため、プロシージャの呼び出ししか実装していません
- そのうちブログ上にソースコードを公開する枠を作成するため、それが完成次第このリポジトリは消します(nカ月後)

## main.cppの内容
```c++
﻿#include <iostream>
#include <fstream>
#include <chrono>
#include <unordered_map>
#include "mcp-server.hpp"

#if defined(_MSC_VER)
#include <fcntl.h>
#include <io.h>
#endif

/// <summary>
/// 時刻を示す整形済み文字列の取得
/// </summary>
/// <returns>時刻を示す整形済み文字列</returns>
auto getTimeString() {
    const std::chrono::time_zone* tz = std::chrono::current_zone();
    return std::format("[{:%Y-%m-%d %H:%M:%S}]", tz->to_local(std::chrono::system_clock::now()));
}

int main() {
#if defined(_MSC_VER)
    // WindowsではテキストモードだとCRLF↔LF変換が勝手に起きるため標準入出力をバイナリモードにしておく
    _setmode(_fileno(stdin), _O_BINARY);
    _setmode(_fileno(stdout), _O_BINARY);
#endif

    mcp::MCPServer server;

    // MCP Servers初期化
    server.request.onInitialize = [&](const mcp::InitializeRequest& params) {
        std::cerr << getTimeString() << "initialize" << std::endl;

        return mcp::InitializeResult{
            .protocolVersion = params.protocolVersion,
            .capabilities = {
                .tools = mcp::ServerCapabilities::ToolsInner{}
            },
            .serverInfo = {
                .name = "ABCゲーム",
                .version = "1.0.0"
            }
        };
    };

    // MCP Servers初期化完了
    server.notification.onInitialized = [&]() {
        std::cerr << getTimeString() << "notifications/initialized" << std::endl;
    };

    // Tools登録
    server.request.tools.onList = [&]() {
        std::cerr << getTimeString() << "tools/list" << std::endl;

        return mcp::ListToolsResult{
            .tools = {
                {
                    .name = "evaluate-scores",
                    .description = "ABCゲームのスコアの評価を行う",
                    // Zodにおける以下に相当するJSONスキーマの定義
                    // z.object({ score: z.number().min(0).describe("スコア（点）") })
                    .inputSchema = nlohmann::json::object({
                        {"type", "object"},
                        {"properties", {
                            {"score", {
                                {"type", "number"},
                                {"minimum", 0},
                                {"description", "スコア（点）"}
                            }}
                        }},
                        {"required", {"score"}},
                        {"additionalProperties", false}
                    })
                }
            }
        };
    };

    // Tools呼び出し
    server.request.tools.onCall = [&](const mcp::CallToolRequest& params) {
        std::cerr << getTimeString() << "tools/call" << std::endl;

        if (params.name == "evaluate-scores") {
            return mcp::CallToolResult{
                .content = {
                    {
                        .type = "text",
                        .text = std::format(R"(
## ABCゲームのスコアの評価基準
- 100点未満: 初心者
- 100点～200点未満: 中級者
- 200点以上：上級者

## 獲得したスコア
{0}点
)", params.arguments.at("score").get<std::size_t>())
                    }
                }
            };
        }
        throw rpc::JSONRPCException(std::format("{0} is invalid tools name", params.name), rpc::JSONRPCErrorCodes::InvalidParams);
    };

    std::cerr << getTimeString() << "activate MCP Server" << std::endl;

    // 言語サーバのメインプロセス
    while (server) {
        try {
            server.receive(std::cin, std::cout);
        }
        catch (const std::runtime_error& ex) {
            // 雑にruntime_errorでエラーを補足
            std::cerr << getTimeString() << ex.what() << std::endl;
        }
    }

    std::cerr << getTimeString() << "deactivate MCP Server" << std::endl;

    return server.getExitCode();
}
```
