/**
 * 聊天应用的主要JavaScript逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const messageForm = document.getElementById('messageForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const clearChatButton = document.getElementById('clearChat');
    const historyButton = document.getElementById('historyButton');
    
    // 获取会话ID
    let conversationId = document.body.getAttribute('data-conversation-id') || crypto.randomUUID();
    
    // 格式化时间
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // 添加消息到聊天界面
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'markdown-content';
        contentDiv.innerHTML = isUser ? content : marked.parse(content);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = formatTime(new Date());
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 显示正在输入指示器
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 隐藏正在输入指示器
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // 发送消息到服务器
    async function sendMessage(message) {
        try {
            showTypingIndicator();
            
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: conversationId
                })
            });
            
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            
            const data = await response.json();
            hideTypingIndicator();
            
            // 更新会话ID
            if (data.conversation_id) {
                conversationId = data.conversation_id;
            }
            
            // 添加助手回复
            addMessage(data.response, false);
            
        } catch (error) {
            hideTypingIndicator();
            console.error('发送消息时出错:', error);
            addMessage('发送消息时出错: ' + error.message, false);
        }
    }
    
    // 处理表单提交
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // 添加用户消息到界面
        addMessage(message, true);
        
        // 清空输入框
        userInput.value = '';
        
        // 发送消息到服务器
        sendMessage(message);
    });
    
    // 处理清空对话
    clearChatButton.addEventListener('click', function() {
        if (confirm('确定要清空当前对话吗？')) {
            chatMessages.innerHTML = '';
            // 添加初始欢迎消息
            addMessage('你好！我是基于OpenAI的聊天助手。有什么我可以帮助你的吗？', false);
            // 生成新的会话ID
            conversationId = crypto.randomUUID();
        }
    });
    
    // 支持Ctrl+Enter发送消息
    userInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            messageForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // 加载历史对话
    if (historyButton) {
        historyButton.addEventListener('click', function() {
            window.location.href = '/history';
        });
    }
    
    // 流式响应处理
    async function sendStreamMessage(message) {
        try {
            showTypingIndicator();
            
            const response = await fetch('/stream-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: conversationId
                })
            });
            
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            
            // 创建一个新的消息元素用于流式更新
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message assistant-message';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'markdown-content';
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = formatTime(new Date());
            
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(timeDiv);
            
            // 隐藏输入指示器并添加新消息
            hideTypingIndicator();
            chatMessages.appendChild(messageDiv);
            
            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let content = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                content += chunk;
                contentDiv.innerHTML = marked.parse(content);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // 更新会话ID（如果需要）
            // 这里可能需要从响应头或其他地方获取会话ID
            
        } catch (error) {
            hideTypingIndicator();
            console.error('发送消息时出错:', error);
            addMessage('发送消息时出错: ' + error.message, false);
        }
    }
});