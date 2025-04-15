# 使用官方 Node.js 作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器中
COPY . .

# 暴露应用所需的端口（假设服务运行在3000端口）
EXPOSE 3000

# 设置环境变量，确保可以从 docker run 命令中传入
ENV CWA_API_KEY=YOUR_API_KEY_HERE
ENV MAX_RETRIES=3
ENV TIMEOUT_MS=10000

# 设置容器启动时的默认命令
CMD ["npx", "tsx", "src/server.ts"]