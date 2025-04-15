# OBSIDIAN-MCP-SERVER

LLM Agent와 연동 가능한 Model Context Protocol (MCP) Stdio 서버입니다. 이 서버는 LLM Agent가 Obsidian 관련 기능을 활용할 수 있도록 Python 기반의 Obsidian 관련 기능들을 제공합니다.

## 기능

### Vault 관리
- Vault 생성
- Vault 삭제
- Vault 목록 조회
- Vault 정보 조회
- Vault 설정 조회
- Vault 설정 변경

### 파일 관리
- Vault 파일 목록 조회
- Vault 파일 작성(생성/수정)
- Vault 파일 삭제

## 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/your-username/obsidian-mcp-server.git
cd obsidian-mcp-server
```

2. 가상 환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
.\venv\Scripts\activate  # Windows
```

3. 의존성 설치
```bash
pip install -r requirements.txt
```

4. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가합니다:
```
OBSIDIAN_VAULT_PATH=/path/to/your/obsidian/vault
```

## 사용 방법

### 서버 실행
```bash
python main.py
```

### API 사용 예시

#### Vault 생성
```json
{
    "jsonrpc": "2.0",
    "method": "create_vault",
    "params": {
        "vault_name": "my_vault",
        "path": "/optional/custom/path"
    },
    "id": 1
}
```

#### Vault 목록 조회
```json
{
    "jsonrpc": "2.0",
    "method": "list_vaults",
    "params": {},
    "id": 2
}
```

#### 파일 작성
```json
{
    "jsonrpc": "2.0",
    "method": "write_vault_file",
    "params": {
        "vault_name": "my_vault",
        "file_path": "notes/example.md",
        "content": "# Example Note\n\nThis is a test note."
    },
    "id": 3
}
```

## 에러 코드

- -32000: 일반 오류
- -32001: Vault를 찾을 수 없음
- -32002: Vault가 이미 존재함
- -32003: 파일을 찾을 수 없음
- -32004: 경로를 찾을 수 없음
- -32005: 설정 파일을 찾을 수 없음
- -32006: 잘못된 설정
- -32007: 파일 작업 오류
- -32008: 잘못된 요청
- -32009: 환경 변수 설정 오류
- -32010: Obsidian 디렉토리 오류

## 응답 형식

### 성공 응답
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "status": "success",
        "message": "Operation completed successfully",
        "data": {}
    }
}
```

### 오류 응답
```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "error": {
        "code": -32001,
        "message": "Vault 'my_vault' does not exist"
    }
}
```

## 라이선스

MIT License

## Cursor 설치 방법

Cursor에서 이 MCP 서버를 사용하려면 다음과 같이 설정하세요:

```json
"obsidian-mcp-server": {
    "transport": "stdio",
    "command": "/path/to/your/venv/bin/python",
    "args": ["/path/to/your/obsidian-mcp-server/main.py"],
    "env": {
        "OBSIDIAN_VAULT_PATH": "/path/to/your/obsidian/vault"
    }
}
```

각 경로를 자신의 환경에 맞게 수정하세요:
- `/path/to/your/venv/bin/python`: Python 가상환경의 Python 실행 파일 경로
- `/path/to/your/obsidian-mcp-server/main.py`: 이 프로젝트의 main.py 파일 경로
- `/path/to/your/obsidian/vault`: Obsidian Vault 경로 