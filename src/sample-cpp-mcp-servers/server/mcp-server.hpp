#pragma once
#include "json-rpc.hpp"

namespace mcp {

    // nlohmann/json 3.12.0で以下は動作する
    // std::optionalでstd::nulloptをキーなしで扱うためのNLOHMANN_DEFINE_TYPE_INTRUSIVEの独自実装
    // 空の構造体対応のために__VA_OPT__を利用
#define MCP_NLOHMANN_JSON_TO(v1) OptionalToJSON<std::remove_cvref_t<decltype(nlohmann_json_t.v1)>>::convert(#v1, nlohmann_json_j, nlohmann_json_t.v1);
#define MCP_NLOHMANN_JSON_FROM(v1) JSONToOptional<std::remove_cvref_t<decltype(nlohmann_json_t.v1)>>::convert(#v1, nlohmann_json_j, nlohmann_json_t.v1);
#define MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(Type, ...)  \
    friend void to_json(nlohmann::json& nlohmann_json_j, const Type& nlohmann_json_t) { NLOHMANN_JSON_EXPAND(NLOHMANN_JSON_PASTE(MCP_NLOHMANN_JSON_TO __VA_OPT__(,) __VA_ARGS__)) } \
    friend void from_json(const nlohmann::json& nlohmann_json_j, Type& nlohmann_json_t) { NLOHMANN_JSON_EXPAND(NLOHMANN_JSON_PASTE(MCP_NLOHMANN_JSON_FROM __VA_OPT__(,) __VA_ARGS__)) }
    // 空の構造体の展開のための定義
#define NLOHMANN_JSON_PASTE1(...)

    /// <summary>
    /// std::optionalをJSONに変換する操作の定義
    /// </summary>
    /// <typeparam name="T">JSONへの変換対象の型</typeparam>
    template <class T>
    struct OptionalToJSON {
        static constexpr void convert(const char* key, nlohmann::json& to, const T& from) { to[key] = from; }
    };
    template <class T>
    struct OptionalToJSON<std::optional<T>> {
        static constexpr void convert(const char* key, nlohmann::json& to, const std::optional<T>& from) {
            if (from.has_value()) {
                auto& ref = to[key];
                ref = from.value();
                // fromの要素にstd::nulloptが存在するとrefがnullになることがあるため、代わりに空のオブジェクトを代入
                if (ref.is_null()) {
                    ref = nlohmann::json::object({});
                }
            }
        }
    };

    /// <summary>
    /// JSONをstd::optionalに変換する操作の定義
    /// </summary>
    /// <typeparam name="T">std::optionalへの変換対象の型</typeparam>
    template <class T>
    struct JSONToOptional {
        static constexpr void convert(const char* key, const nlohmann::json& from, T& to) { from.at(key).get_to(to); }
    };
    template <class T>
    struct JSONToOptional<std::optional<T>> {
        static constexpr void convert(const char* key, const nlohmann::json& from, std::optional<T>& to) { if (from.contains(key)) { to = from[key].get<T>(); } }
    };


    /// <summary>
    /// MCP実装の名前とバージョン
    /// </summary>
    struct Implementation {
        std::string name;
        std::string version;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(Implementation, name, version);
    };

    /// <summary>
    /// サーバーがサポートする可能性のある機能
    /// </summary>
    struct ServerCapabilities {
        struct ToolsInner {
            std::optional<bool> listChanged;
            MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(ToolsInner, listChanged);
        };
        std::optional<ToolsInner> tools;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(ServerCapabilities, tools);
    };

    /// <summary>
    /// クライアントがサポートする可能性のある機能
    /// </summary>
    struct ClientCapabilities {
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(ClientCapabilities);
    };

    /// <summary>
    /// "initialize"リクエストボディ
    /// </summary>
    struct InitializeRequest {
        std::string protocolVersion;
        ClientCapabilities capabilities;
        Implementation clientInfo;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(InitializeRequest, protocolVersion, capabilities, clientInfo);
    };

    /// <summary>
    /// "initialize"レスポンスボディ
    /// </summary>
    struct InitializeResult {
        std::string protocolVersion;
        ServerCapabilities capabilities;
        Implementation serverInfo;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(InitializeResult, protocolVersion, capabilities, serverInfo);
    };

    /// <summary>
    /// クライアントが呼び出すことができるツールの定義
    /// </summary>
    struct Tool {
        std::string name;
        std::optional<std::string> description;
        nlohmann::json::object_t inputSchema;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(Tool, name, description, inputSchema);
    };

    /// <summary>
    /// "tools/list"レスポンスボディ
    /// </summary>
    struct ListToolsResult {
        std::vector<Tool> tools;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(ListToolsResult, tools);
    };

    /// <summary>
    /// "tools/call"リクエストボディ
    /// </summary>
    struct CallToolRequest {
        std::string name;
        nlohmann::json::object_t arguments;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(CallToolRequest, name, arguments);
    };

    /// <summary>
    /// LLMに対して提供する・されたテキスト
    /// </summary>
    struct TextContent {
        std::string type = "type";
        std::string text;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(TextContent, type, text);
    };

    /// <summary>
    /// "tools/call"レスポンスボディ
    /// </summary>
    struct CallToolResult {
        std::vector<TextContent> content;
        MCP_NLOHMANN_DEFINE_TYPE_INTRUSIVE(CallToolResult, content);
    };


    /// <summary>
    /// エラーコード
    /// </summary>
    enum struct ErrorCodes : int {
        /// <summary>
        /// サーバが初期化されていない
        /// </summary>
        ServerNotInitialized = -32002
    };

    /// <summary>
    /// Djb2ハッシュ関数(std::hashがconstexprにならないため代替)
    /// </summary>
    /// <typeparam name="CharT">文字型</typeparam>
    /// <typeparam name="Traits">文字の特性</typeparam>
    /// <param name="str">ハッシュ値の計算対象の文字列</param>
    /// <returns>ハッシュ値</returns>
    template <class CharT, class Traits>
    inline constexpr std::size_t hash(std::basic_string_view<CharT, Traits> str) {
        std::size_t hash = 5381;
        for (CharT c : str) {
            hash = ((hash << 5) + hash) + c;
        }
        return hash;
    }

    /// <summary>
    /// "tools/"で始まるリクエストを管理するテーブル
    /// </summary>
    struct ToolsRequestTable {
        /// <summary>
        /// "tools/list"を実行する関数
        /// </summary>
        std::function<ListToolsResult()> onList;

        /// <summary>
        /// "tools/call"を実行する関数
        /// </summary>
        std::function<CallToolResult(const CallToolRequest&)> onCall;

        /// <summary>
        /// 指定されたメソッドのリクエストを受ける関数を呼び出してレスポンスを返す
        /// </summary>
        /// <param name="method">リクエストのメソッド</param>
        /// <param name="submethod">冗長を除去したリクエストのメソッド</param>
        /// <param name="id">リクエストのID</param>
        /// <param name="params">リクエストに対するパラメータ</param>
        /// <returns>レスポンス</returns>
        nlohmann::json call(std::string_view method, std::string_view submethod, const std::variant<int, std::string>& id, const nlohmann::json& params) const {
            using namespace std::string_view_literals;

            switch (auto parentmedhod = submethod.substr(0, submethod.find('/'));  hash(parentmedhod)) {
            case hash("list"sv):
                // サーバーが持っているToolsのリストのリクエスト
                if (parentmedhod == "list" && this->onList) {
                    return this->onList();
                }
                break;
            case hash("call"sv):
                // Toolsの呼び出し
                if (parentmedhod == "call" && this->onList) {
                    return this->onCall(params);
                }
                break;
            }

            throw rpc::JSONRPCException(std::format("{0} not found", method), rpc::JSONRPCErrorCodes::MethodNotFound, id);
        }
    };

    /// <summary>
    /// サーバが受けるリクエストを管理するテーブル
    /// </summary>
    struct RequestTable {
        /// <summary>
        /// "initialize"を実行する関数
        /// </summary>
        std::function<InitializeResult(const InitializeRequest&)> onInitialize;

        /// <summary>
        /// Toolsに関するリクエストのテーブル
        /// </summary>
        ToolsRequestTable tools;

        /// <summary>
        /// 指定されたメソッドのリクエストを受ける関数を呼び出してレスポンスを返す
        /// </summary>
        /// <param name="method">リクエストのメソッド</param>
        /// <param name="id">リクエストのID</param>
        /// <param name="params">リクエストに対するパラメータ</param>
        /// <returns>レスポンス</returns>
        nlohmann::json call(std::string_view method, const std::variant<int, std::string>& id, const nlohmann::json& params) const {
            using namespace std::string_view_literals;

            switch (auto parentmedhod = method.substr(0, method.find('/'));  hash(parentmedhod)) {
            case hash("initialize"sv):
                // 初期化
                if (method == "initialize") {
                    if (this->onInitialize) {
                        return this->onInitialize(params.get<InitializeRequest>());
                    }
                    return nlohmann::json();
                }
                break;
            case hash("tools"sv):
                // Toolsに関するリクエスト
                if (parentmedhod == "tools") {
                    return this->tools.call(method, method.substr(parentmedhod.length() + 1), id, params);
                }
                break;
            }

            throw rpc::JSONRPCException(std::format("{0} not found", method), rpc::JSONRPCErrorCodes::MethodNotFound, id);
        }
    };

    /// <summary>
    /// サーバが受ける通知を管理するテーブル
    /// </summary>
    struct NotificationTable {
        /// <summary>
        /// "notifications/initialized"を実行する関数
        /// </summary>
        std::function<void()> onInitialized;

        /// <summary>
        /// 指定されたメソッドのリクエストを受ける関数を呼び出してレスポンスを返す
        /// </summary>
        /// <param name="method">メソッド</param>
        /// <param name="params">リクエストに対するパラメータ</param>
        /// <returns>レスポンス</returns>
        void call(std::string_view method, const nlohmann::json& params) const {
            using namespace std::string_view_literals;

            // ライフサイクルに関するメソッドは関数が未定義であることを許容
            switch (auto parentmedhod = method.substr(0, method.find('/'));  hash(parentmedhod)) {
            case hash("initialized"sv):
                // 初期化完了通知
                if (method == "initialized") {
                    if (this->onInitialized) {
                        this->onInitialized();
                    }
                    return;
                }
                break;
            }

            throw std::runtime_error(std::format("{0} not found", method));
        }
    };

    /// <summary>
    /// MCPサーバ
    /// </summary>
    class MCPServer {
        /// <summary>
        /// "initialize"が実行済みであるか否か
        /// </summary>
        bool m_initialized = false;

        /// <summary>
        /// 終了コード
        /// </summary>
        int m_exitCode = -1;
    public:
        /// <summary>
        /// サーバが受けるリクエストを管理するテーブル
        /// </summary>
        RequestTable request;

        /// <summary>
        /// サーバが受ける通知を管理するテーブル
        /// </summary>
        NotificationTable notification;

        /// <summary>
        /// MCPサーバが稼働中ならtrue、終了している場合はfalse
        /// </summary>
        explicit operator bool() {
            return this->m_exitCode < 0;
        }

        /// <summary>
        /// 終了コードを取得する(負の場合は無効)
        /// </summary>
        /// <returns>終了コード</returns>
        int getExitCode() const {
            return this->m_exitCode;
        }

        /// <summary>
        /// メッセージの取得
        /// </summary>
        /// <param name="is">入力されたメッセージのバイト列に関する入力ストリーム</param>
        /// <param name="os">メッセージのレスポンスを返すための出力ストリーム</param>
        void receive(std::istream& is, std::ostream& os) {
            if (!is) {
                // ストリームが閉じられた場合は終了する
                this->m_exitCode = 0;
                return;
            }

            rpc::JSONRPC::receive(is,
                [&](std::string_view method, const std::variant<int, std::string>& id, const nlohmann::json& params) {
                    // ライフサイクルに関するチェック処理
                    if (method == "initialize") {
                        this->m_initialized = true;
                    }
                    else if (!this->m_initialized) {
                        // 初期化が行われていない
                        throw rpc::JSONRPCException("Server not initialized", static_cast<rpc::JSONRPCErrorCodes>(ErrorCodes::ServerNotInitialized), id);
                    }
                    else if (method == "ping") {
                        // pingの応答
                        return nlohmann::json();
                    }
                    // リクエストの処理
                    return this->request.call(method, id, params);
                },
                [&](std::string_view method, const nlohmann::json& params) {
                    if (auto parentmedhod = method.substr(0, method.find('/'));  parentmedhod == "notifications") {
                        // 通知の処理(異常が発生してもレスポンスは返さない)
                        this->notification.call(method, parentmedhod);
                    }
                    else {
                        throw std::runtime_error(std::format("{0} not found", method));
                    }
                },
                [&](const nlohmann::json& msg) { MCPServer::send(os, msg); }
            );
        }

        /// <summary>
        /// メッセージの送信
        /// </summary>
        /// <param name="os">メッセージを送信するための出力ストリーム</param>
        /// <param name="msg">送信するメッセージ</param>
        static void send(std::ostream& os, const nlohmann::json& msg) {
            os << msg << "\n" << std::flush;
        }

        /// <summary>
        /// 通知の送信
        /// </summary>
        /// <param name="os">メッセージを送信するための出力ストリーム</param>
        /// <param name="method">通知のメソッド</param>
        /// <param name="params">通知の内容</param>
        static void sendNotification(std::ostream& os, std::string_view method, const nlohmann::json& params = nlohmann::json()) {
            rpc::JSONRPC::sendNotification(method, params, [&](const nlohmann::json& msg) { MCPServer::send(os, msg); });
        }
    };
}
