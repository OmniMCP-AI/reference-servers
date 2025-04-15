# 基础镜像选择，使用官方 Node.js 作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json，用于安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目文件复制到工作目录
COPY . .

# 暴露应用程序运行的端口（假设你有一个固定端口）
EXPOSE 3000

# 构建 TypeScript 项目
RUN npm run build

# 设置 Docker 容器启动时的入口点
# 使用生产模式启动服务器，参数可以在运行容器时提供
CMD ["npm", "start", "--", "./docs"]