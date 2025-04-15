# 使用官方的 Python 基础镜像
FROM python:3.9

# 设置工作目录
WORKDIR /app

# 复制项目的依赖定义文件
COPY setup.py /app/
COPY requirements.txt /app/

# 安装项目依赖
RUN pip install -e .

# 复制项目文件到容器中
COPY . /app

# 环境变量配置
ENV NEO4J_URI=http://your-neo4j-server:7474
ENV NEO4J_USERNAME=neo4j
ENV NEO4J_PASSWORD=your-password
# 可根据需要设置代理
# ENV HTTP_PROXY=http://your-proxy:port
# ENV HTTPS_PROXY=http://your-proxy:port

# 暴露应用程序端口（假设服务默认在5000端口监听）
EXPOSE 5000

# 设置默认的启动命令
CMD ["python", "src/server.py"]