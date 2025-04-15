# 使用官方 Python 作为基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /usr/src/app

# 复制项目的依赖文件
COPY requirements.txt ./

# 安装项目依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目文件到容器
COPY . .

# 暴露服务器端口，以便 SSE 模式访问
EXPOSE 8000

# 设定默认入口点为 SSE 模式脚本
ENTRYPOINT ["python", "resou_sse.py"]