#pragma once
#include <iostream>
#include <format>
#include <vector>
#include <string_view>
#include <stdexcept>
#include <optional>
#include <variant>
#include <nlohmann/json.hpp>

namespace rpc {

    /// <summary>
    /// エラーコード
    /// </summary>
    enum struct JSONRPCErrorCodes : int {
        /// <summary>
        /// JSONテキストの解析失敗
        /// </summary>
        ParseError = -32700,

        /// <summary>
        /// 無効なリクエスト
        /// </summary>
        InvalidRequest = -32600,

        /// <summary>
        /// メソッドが存在しない
        /// </summary>
        MethodNotFound = -32601,

        /// <summary>
        /// メソッドに与えられたパラメータが無効
        /// </summary>
        InvalidParams = -32602,

        /// <summary>
        /// JSON-RPC内部でのエラー
        /// </summary>
        InternalError = -32603,
    };

    /// <summary>
    /// RPCにおける例外クラス
    /// </summary>
    class JSONRPCException : public std::runtime_error {
        /// <summary>
        /// エラーコード
        /// </summary>
        JSONRPCErrorCodes m_code;

        /// <summary>
        /// リクエストのID
        /// </summary>
        std::optional<std::variant<int, std::string>> m_id;

    public:
        /// <summary>
        /// コンストラクタ
        /// </summary>
        /// <param name="what_arg">エラーメッセージ</param>
        /// <param name="code">エラーコード</param>
        /// <param name="id">リクエストのID</param>
        explicit JSONRPCException(const std::string& what_arg, JSONRPCErrorCodes code, const std::optional<std::variant<int, std::string>>& id = std::nullopt)
            : std::runtime_error(what_arg), m_code(code), m_id(id) {}

        /// <summary>
        /// コンストラクタ
        /// </summary>
        /// <param name="what_arg">エラーメッセージ</param>
        /// <param name="code">エラーコード</param>
        /// <param name="id">リクエストのID</param>
        explicit JSONRPCException(const char* what_arg, JSONRPCErrorCodes code, const std::optional<std::variant<int, std::string>>& id = std::nullopt)
            : std::runtime_error(what_arg), m_code(code), m_id(id) {}

        /// <summary>
        /// エラーコードの取得
        /// </summary>
        /// <returns>エラーコード</returns>
        JSONRPCErrorCodes getCode() const {
            return this->m_code;
        }

        /// <summary>
        /// リクエストのIDの取得
        /// </summary>
        /// <returns>リクエストのID</returns>
        const std::optional<std::variant<int, std::string>>& getId() const {
            return this->m_id;
        }
    };

    /// <summary>
    /// JSON-RPC 2.0に基づく通知の解析を行うクラス
    /// </summary>
    class JSONRPC {
    public:
        /// <summary>
        /// メッセージの取得
        /// </summary>
        /// <typeparam name="Request">(std::string_view method, const std::variant&gt;int, std::string&lt;&amp; id, const nlohmann::json&amp; params) -&lt; nlohmann::jsonと互換性がある型</typeparam>
        /// <typeparam name="Notification">(std::string_view method, const nlohmann::json&amp; params) -&lt; voidと互換性がある型</typeparam>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="is">入力されたメッセージのバイト列に関する入力ストリーム</param>
        /// <param name="os">メッセージのレスポンスを返すための出力ストリーム</param>
        /// <param name="length">リクエストボディの長さ</param>
        /// <param name="request">リクエストを受け取ってJSONを返す関数</param>
        /// <param name="notification">通知を受け取る関数</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Request, class Notification, class Send>
        static void receive(std::istream& is, std::size_t length, Request request, Notification notification, Send send) {
            std::vector<char> heapBuffer;
            heapBuffer.resize(length + 1);
            heapBuffer[length] = 0;

            try {
                if (is.read(heapBuffer.data(), heapBuffer.size() - 1)) {
                    JSONRPC::parseBody(is, std::string_view(heapBuffer.data(), heapBuffer.size() - 1), request, notification, send);
                }
                else if (is.bad()) {
                    throw std::runtime_error("ストリームで異常が生じた");
                }
                else if (is.eof()) {
                    throw std::runtime_error("リクエストボディの長さが足りない");
                }
                //else if (is.fail()) {
                //    // 起きない
                //}
            }
            catch (const JSONRPCException& ex) {
                // エラーレスポンスを返す
                JSONRPC::sendError(ex.getId(), ex.getCode(), ex.what(), send);
                throw;
            }
        }

        /// <summary>
        /// メッセージの取得
        /// </summary>
        /// <typeparam name="Request">(std::string_view method, const std::variant&gt;int, std::string&lt;&amp; id, const nlohmann::json&amp; params) -&lt; nlohmann::jsonと互換性がある型</typeparam>
        /// <typeparam name="Notification">(std::string_view method, const nlohmann::json&amp; params) -&lt; voidと互換性がある型</typeparam>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="is">入力されたメッセージのバイト列に関する入力ストリーム</param>
        /// <param name="os">メッセージのレスポンスを返すための出力ストリーム</param>
        /// <param name="length">リクエストボディの長さ</param>
        /// <param name="request">リクエストを受け取ってJSONを返す関数</param>
        /// <param name="notification">通知を受け取る関数</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Request, class Notification, class Send>
        static void receive(std::istream& is, Request request, Notification notification, Send send) {
            char stackbuffer[256] = {};
            std::vector<char> heapBuffer;

            // メッセージの取得
            while (true) {
                // LFコードまで読み込む
                is.getline(stackbuffer, std::size(stackbuffer));
                if (is.bad()) {
                    throw std::runtime_error("ストリームで異常が生じた");
                }
                if (is.eof()) {
                    if (std::strlen(stackbuffer) == 0 && heapBuffer.size() == 0) {
                        return;
                    }
                }
                if (is.fail()) {
                    // stackbufferのサイズを超える場合はヒープに読み込みデータを蓄積する
                    is.clear(is.rdstate() & ~std::ios_base::failbit);
                    heapBuffer.insert(heapBuffer.end(), stackbuffer, stackbuffer + std::size(stackbuffer) - 1);
                }
                else {
                    if (heapBuffer.size() > 0) {
                        // ヒープにデータを蓄積していた時はヒープに追記する
                        heapBuffer.insert(heapBuffer.end(), stackbuffer, stackbuffer + std::strlen(stackbuffer));
                    }
                    break;
                }
            }

            try {
                const auto ptr = heapBuffer.size() > 0 ? heapBuffer.data() : stackbuffer;
                const auto size = heapBuffer.size() > 0 ? heapBuffer.size() : std::strlen(stackbuffer);
                JSONRPC::parseBody(is, std::string_view(ptr, size), request, notification, send);
            }
            catch (const JSONRPCException& ex) {
                // エラーレスポンスを返す
                JSONRPC::sendError(ex.getId(), ex.getCode(), ex.what(), send);
                throw;
            }
        }
    private:
        /// <summary>
        /// メッセージのボディの解析
        /// </summary>
        /// <typeparam name="Request">(std::string_view method, const std::variant&gt;int, std::string&lt;&amp; id, const nlohmann::json&amp; params) -&lt; nlohmann::jsonと互換性がある型</typeparam>
        /// <typeparam name="Notification">(std::string_view method, const nlohmann::json&amp; params) -&lt; voidと互換性がある型</typeparam>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="is">入力されたメッセージのバイト列に関する入力ストリーム</param>
        /// <param name="strJson">null止めされたjson文字列</param>
        /// <param name="os">メッセージのレスポンスを返すための出力ストリーム</param>
        /// <param name="request">リクエストを受け取ってJSONを返す関数</param>
        /// <param name="notification">通知を受け取る関数</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Request, class Notification, class Send>
        static void parseBody(std::istream& is, std::string_view strJson, Request request, Notification notification, Send send) {
            try {
                auto json = nlohmann::json::parse(strJson);
                // 1度に配列で複数のリクエストが来た場合の処理は省略
                if (auto iditr = json.find("id");  iditr != json.end() && (iditr->is_string() || iditr->is_number_integer())) {
                    auto id = iditr->is_string() ? std::variant<int, std::string>(iditr->get<std::string>()) : iditr->get<int>();
                    if (auto medhoditr = json.find("method");  medhoditr != json.end() && medhoditr->is_string()) {
                        // リクエストの処理
                        JSONRPC::sendResponse(id, request(medhoditr->get<std::string>(), id, json["params"]), send);
                    }
                    else {
                        // レスポンスのため現在は何もしない
                    }
                }
                else if (auto medhoditr = json.find("method");  medhoditr != json.end() && medhoditr->is_string()) {
                    // 通知の処理(異常が発生してもレスポンスは返さない)
                    notification(medhoditr->get<std::string>(), json["params"]);
                }
                else {
                    throw JSONRPCException("Invalid Request", JSONRPCErrorCodes::InvalidRequest);
                }
            }
            catch (const nlohmann::json::exception&) {
                throw JSONRPCException("Parse error", JSONRPCErrorCodes::ParseError);
            }
        }

        /// <summary>
        /// レスポンスの送信
        /// </summary>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="id">リクエストのID</param>
        /// <param name="result">レスポンスの内容</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Send>
        static void sendResponse(const std::variant<int, std::string>& id, const nlohmann::json& result, Send send) {
            nlohmann::json json = {
                {"jsonrpc", "2.0"},
                {"result", result},
            };
            std::visit([&](const auto& x) { json["id"] = x; }, id);
            send(json);
        }
    public:
        /// <summary>
        /// 通知の送信
        /// </summary>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="method">通知のメソッド</param>
        /// <param name="params">通知の内容</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Send>
        static void sendNotification(std::string_view method, const nlohmann::json& params, Send send) {
            nlohmann::json json = {
                {"jsonrpc", "2.0"},
                {"method", method},
                {"params", params},
            };
            send(json);
        }
    private:
        /// <summary>
        /// エラーレスポンスの送信
        /// </summary>
        /// <typeparam name="Send">(const nlohmann::json&amp; msg) -&lt; voidと互換性がある型</typeparam>
        /// <param name="id">リクエストのID</param>
        /// <param name="code">エラーコード</param>
        /// <param name="msg">エラーメッセージ</param>
        /// <param name="send">通知やレスポンスを送信する関数</param>
        template <class Send>
        static void sendError(const std::optional<std::variant<int, std::string>>& id, JSONRPCErrorCodes code, std::string_view msg, Send send) {
            nlohmann::json json = {
                {"jsonrpc", "2.0"},
                {"error", {
                    {"code", code},
                    {"message", msg}
                }},
            };
            if (id.has_value()) {
                std::visit([&](const auto& x) { json["id"] = x; }, id.value());
            }
            send(json);
        }
    };
}
