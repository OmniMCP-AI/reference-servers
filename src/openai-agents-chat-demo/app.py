import os
from flask import Flask, render_template, request, jsonify, session, Response, stream_with_context
import json
import uuid
from datetime import datetime

from agent import chat_agent
from config import FLASK_DEBUG, FLASK_PORT
from utils.history import initialize_db, save_message, load_history

# 初始化Flask应用
app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = os.urandom(24)  # 用于会话加密
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 86400

# 确保数据库初始化
initialize_db()

@app.route("/")
def index():
    """渲染主页"""
    # 如果session中没有conversation_id，创建一个新的
    if "conversation_id" not in session:
        session["conversation_id"] = str(uuid.uuid4())
        session["username"] = "Guest"  # 默认用户名
    
    return render_template(
        "index.html",
        conversation_id=session["conversation_id"],
        username=session["username"],
        timestamp=datetime.now().timestamp()
    )

@app.route("/chat", methods=["POST"])
def chat():
    """处理聊天请求"""
    data = request.get_json()
    user_message = data.get("message", "")
    conversation_id = data.get("conversation_id") or session.get("conversation_id")
    username = session.get("username", "Guest")
    
    if not user_message.strip():
        return jsonify({"response": "请输入内容"}), 400
    
    # 确保有conversation_id
    if not conversation_id:
        conversation_id = str(uuid.uuid4())
        session["conversation_id"] = conversation_id
    
    # 保存用户消息到历史记录
    timestamp = int(datetime.now().timestamp() * 1000)
    save_message(
        username=username,
        email=username,  # 这里简化处理，实际应用可能需要分开
        conversation_id=conversation_id,
        role="user",
        content=user_message,
        timestamp=timestamp
    )
    
    try:
        # 加载对话历史
        history = load_history(conversation_id)
        
        # 处理消息并获取响应
        response = chat_agent.process_message_sync(user_message, history)
        
        # 保存助手响应到历史记录
        assistant_timestamp = int(datetime.now().timestamp() * 1000)
        save_message(
            username=username,
            email=username,
            conversation_id=conversation_id,
            role="assistant",
            content=response,
            timestamp=assistant_timestamp
        )
        
        return jsonify({"response": response, "conversation_id": conversation_id})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"response": f"Error: {str(e)}"}), 500

@app.route("/stream-chat", methods=["POST"])
def stream_chat():
    """流式处理聊天请求（示例实现，实际需要与agents库的流式输出集成）"""
    data = request.get_json()
    user_message = data.get("message", "")
    conversation_id = data.get("conversation_id") or session.get("conversation_id")
    username = session.get("username", "Guest")
    
    if not user_message.strip():
        return jsonify({"response": "请输入内容"}), 400
    
    # 确保有conversation_id
    if not conversation_id:
        conversation_id = str(uuid.uuid4())
        session["conversation_id"] = conversation_id
    
    # 保存用户消息
    timestamp = int(datetime.now().timestamp() * 1000)
    save_message(
        username=username,
        email=username,
        conversation_id=conversation_id,
        role="user",
        content=user_message,
        timestamp=timestamp
    )
    
    # 这里是一个简化的流式响应示例
    # 实际实现需要与agents库的流式输出集成
    def generate():
        try:
            # 加载对话历史
            history = load_history(conversation_id)
            
            # 处理消息并获取响应
            # 注意：这里简化处理，实际应用需要实现真正的流式输出
            response = chat_agent.process_message_sync(user_message, history)
            
            # 模拟流式输出
            for i in range(0, len(response), 10):
                chunk = response[i:i+10]
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                import time
                time.sleep(0.05)  # 模拟延迟
            
            # 保存完整响应
            assistant_timestamp = int(datetime.now().timestamp() * 1000)
            save_message(
                username=username,
                email=username,
                conversation_id=conversation_id,
                role="assistant",
                content=response,
                timestamp=assistant_timestamp
            )
            
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return Response(stream_with_context(generate()), mimetype="text/event-stream")

@app.route("/history/<conversation_id>", methods=["GET"])
def get_history(conversation_id):
    """获取特定对话的历史记录"""
    try:
        history = load_history(conversation_id)
        return jsonify({"history": history})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/new-conversation", methods=["POST"])
def new_conversation():
    """创建新的对话"""
    conversation_id = str(uuid.uuid4())
    session["conversation_id"] = conversation_id
    return jsonify({"conversation_id": conversation_id})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=FLASK_PORT, debug=FLASK_DEBUG)