import os
import sys
import json
import logging
import shutil
from pathlib import Path
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP
from datetime import datetime

# 커스텀 예외 클래스 정의
class ObsidianError(Exception):
    """Obsidian 관련 기본 예외 클래스"""
    def __init__(self, message: str, code: int = -32000):
        self.message = message
        self.code = code
        super().__init__(self.message)

class VaultNotFoundError(ObsidianError):
    """Vault를 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, vault_name: str):
        super().__init__(f"Vault '{vault_name}' does not exist", -32001)

class VaultAlreadyExistsError(ObsidianError):
    """Vault가 이미 존재할 때 발생하는 예외"""
    def __init__(self, vault_name: str):
        super().__init__(f"Vault '{vault_name}' already exists", -32002)

class FileNotFoundError(ObsidianError):
    """파일을 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, file_path: str, vault_name: str):
        super().__init__(f"File '{file_path}' does not exist in vault '{vault_name}'", -32003)

class PathNotFoundError(ObsidianError):
    """경로를 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, path: str, vault_name: str):
        super().__init__(f"Path '{path}' does not exist in vault '{vault_name}'", -32004)

class SettingsNotFoundError(ObsidianError):
    """설정 파일을 찾을 수 없을 때 발생하는 예외"""
    def __init__(self, vault_name: str):
        super().__init__(f"Settings file does not exist for vault '{vault_name}'", -32005)

class InvalidSettingsError(ObsidianError):
    """설정이 잘못되었을 때 발생하는 예외"""
    def __init__(self, message: str):
        super().__init__(f"Invalid settings: {message}", -32006)

class FileOperationError(ObsidianError):
    """파일 작업 중 오류가 발생할 때 발생하는 예외"""
    def __init__(self, operation: str, file_path: str, error: str):
        super().__init__(f"Failed to {operation} file '{file_path}': {error}", -32007)

class InvalidRequestError(ObsidianError):
    """잘못된 요청이 들어왔을 때 발생하는 예외"""
    def __init__(self, message: str):
        super().__init__(f"Invalid request: {message}", -32008)

# 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stderr
)
logger = logging.getLogger(__name__)

# .env 파일 로드
load_dotenv()

# 환경 변수에서 Obsidian 설정 가져오기
OBSIDIAN_VAULT_PATH = os.getenv('OBSIDIAN_VAULT_PATH')

if not OBSIDIAN_VAULT_PATH:
    raise ObsidianError("OBSIDIAN_VAULT_PATH environment variable is not set", -32009)

logger.info("OBSIDIAN-MCP-SERVER 시작")
logger.info(f"Vault 경로: {OBSIDIAN_VAULT_PATH}")

# MCP 서버 생성 (stdio 모드)
mcp = FastMCP(
    name="ObsidianMCPServer",
    mode="stdio",
    version="1.0.0",
    description="Obsidian 작업을 위한 MCP 서버",
    log_level="DEBUG"  # 대문자로 변경
)

def get_vault_path(vault_name: str) -> str:
    """Vault 경로 반환"""
    # OBSIDIAN_VAULT_PATH를 직접 사용
    return OBSIDIAN_VAULT_PATH

@mcp.tool()
def create_vault(vault_name: str, path: str = None) -> dict:
    """Vault 초기화"""
    try:
        logger.info(f"Vault 초기화 시작 - 이름: {vault_name}")
        
        vault_path = OBSIDIAN_VAULT_PATH
        
        # Vault 디렉토리가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault path {vault_path} does not exist")
            
        # .obsidian 디렉토리가 없다면 생성
        obsidian_dir = os.path.join(vault_path, ".obsidian")
        if not os.path.exists(obsidian_dir):
            os.makedirs(obsidian_dir)
        
        # 기본 설정 파일 생성
        settings_path = os.path.join(obsidian_dir, "settings.json")
        if not os.path.exists(settings_path):
            settings = {
                "name": vault_name,
                "created_at": str(datetime.now()),
                "version": "1.0.0"
            }
            
            with open(settings_path, "w") as f:
                json.dump(settings, f, indent=2)
            
        return {
            "status": "success",
            "message": f"Vault initialized successfully",
            "path": vault_path
        }
    except Exception as e:
        logger.error(f"Vault 초기화 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def delete_vault(vault_name: str) -> dict:
    """Vault 삭제 (비활성화 - 안전을 위해)"""
    raise InvalidRequestError("Vault deletion is disabled for safety")

@mcp.tool()
def list_vaults() -> dict:
    """Vault 정보 조회"""
    try:
        logger.info("Vault 정보 조회 시작")
        
        vault_path = OBSIDIAN_VAULT_PATH
        
        # Vault 디렉토리가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception("Obsidian vault directory does not exist")
            
        # Vault 정보 조회
        settings_path = os.path.join(vault_path, ".obsidian", "settings.json")
        vault_info = None
        
        if os.path.exists(settings_path):
            with open(settings_path, "r") as f:
                settings = json.load(f)
                vault_info = {
                    "name": os.path.basename(vault_path),
                    "path": vault_path,
                    "created_at": settings.get("created_at"),
                    "version": settings.get("version")
                }
                
        return {"vaults": [vault_info] if vault_info else []}
    except Exception as e:
        logger.error(f"Vault 정보 조회 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def get_vault_info(vault_name: str) -> dict:
    """Vault 정보 조회"""
    try:
        logger.info(f"Vault 정보 조회 시작 - 이름: {vault_name}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # Vault 정보 조회
        settings_path = os.path.join(vault_path, ".obsidian", "settings.json")
        if not os.path.exists(settings_path):
            raise Exception(f"Vault {vault_name} settings file does not exist")
            
        with open(settings_path, "r") as f:
            settings = json.load(f)
            
        # 파일 통계 정보 추가
        total_files = 0
        total_size = 0
        for root, dirs, files in os.walk(vault_path):
            if ".obsidian" in root:
                continue
            total_files += len(files)
            for file in files:
                file_path = os.path.join(root, file)
                total_size += os.path.getsize(file_path)
                
        return {
            "vault_name": vault_name,
            "path": vault_path,
            "created_at": settings.get("created_at"),
            "version": settings.get("version"),
            "total_files": total_files,
            "total_size": total_size
        }
    except Exception as e:
        logger.error(f"Vault 정보 조회 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def get_vault_settings(vault_name: str) -> dict:
    """Vault 설정 조회"""
    try:
        logger.info(f"Vault 설정 조회 시작 - 이름: {vault_name}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # Vault 설정 조회
        settings_path = os.path.join(vault_path, ".obsidian", "settings.json")
        if not os.path.exists(settings_path):
            raise Exception(f"Vault {vault_name} settings file does not exist")
            
        with open(settings_path, "r") as f:
            settings = json.load(f)
            
        return {
            "vault_name": vault_name,
            "settings": settings
        }
    except Exception as e:
        logger.error(f"Vault 설정 조회 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def update_vault_settings(vault_name: str, settings: dict) -> dict:
    """Vault 설정 변경"""
    try:
        logger.info(f"Vault 설정 변경 시작 - 이름: {vault_name}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # Vault 설정 변경
        settings_path = os.path.join(vault_path, ".obsidian", "settings.json")
        if not os.path.exists(settings_path):
            raise Exception(f"Vault {vault_name} settings file does not exist")
            
        with open(settings_path, "r") as f:
            current_settings = json.load(f)
            
        # 설정 업데이트
        current_settings.update(settings)
        
        with open(settings_path, "w") as f:
            json.dump(current_settings, f, indent=2)
            
        return {
            "status": "success",
            "message": f"Vault {vault_name} settings updated successfully",
            "settings": current_settings
        }
    except Exception as e:
        logger.error(f"Vault 설정 변경 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def list_vault_files(vault_name: str, path: str = None) -> dict:
    """Vault 파일 목록 조회"""
    try:
        logger.info(f"Vault 파일 목록 조회 시작 - 이름: {vault_name}, 경로: {path}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # 조회할 경로 설정
        target_path = os.path.join(vault_path, path) if path else vault_path
        
        # 경로가 존재하는지 확인
        if not os.path.exists(target_path):
            raise Exception(f"Path {path} does not exist in vault {vault_name}")
            
        # 파일 목록 조회
        files = []
        for root, dirs, filenames in os.walk(target_path):
            # .obsidian 디렉토리 제외
            if ".obsidian" in root:
                continue
                
            for filename in filenames:
                file_path = os.path.join(root, filename)
                relative_path = os.path.relpath(file_path, vault_path)
                
                # 파일 정보 수집
                file_info = {
                    "name": filename,
                    "path": relative_path,
                    "size": os.path.getsize(file_path),
                    "modified": datetime.fromtimestamp(os.path.getmtime(file_path)).isoformat(),
                    "created": datetime.fromtimestamp(os.path.getctime(file_path)).isoformat()
                }
                
                # Markdown 파일인 경우 추가 정보 수집
                if filename.endswith('.md'):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        file_info.update({
                            "type": "markdown",
                            "word_count": len(content.split()),
                            "line_count": len(content.splitlines())
                        })
                else:
                    file_info["type"] = "other"
                    
                files.append(file_info)
                
        return {
            "vault_name": vault_name,
            "path": path,
            "files": files
        }
    except Exception as e:
        logger.error(f"Vault 파일 목록 조회 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def write_vault_file(vault_name: str, file_path: str, content: str) -> dict:
    """Vault 파일 작성(생성/수정)"""
    try:
        logger.info(f"Vault 파일 작성 시작 - 이름: {vault_name}, 파일: {file_path}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # 파일 경로 설정
        full_path = os.path.join(vault_path, file_path)
        
        # 디렉토리가 존재하는지 확인하고 없으면 생성
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        # 파일 작성
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        # 파일 정보 수집
        file_info = {
            "name": os.path.basename(file_path),
            "path": file_path,
            "size": os.path.getsize(full_path),
            "modified": datetime.fromtimestamp(os.path.getmtime(full_path)).isoformat(),
            "created": datetime.fromtimestamp(os.path.getctime(full_path)).isoformat()
        }
        
        if file_path.endswith('.md'):
            file_info.update({
                "type": "markdown",
                "word_count": len(content.split()),
                "line_count": len(content.splitlines())
            })
        else:
            file_info["type"] = "other"
            
        return {
            "status": "success",
            "message": f"File {file_path} written successfully",
            "file_info": file_info
        }
    except Exception as e:
        logger.error(f"Vault 파일 작성 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def delete_vault_file(vault_name: str, file_path: str) -> dict:
    """Vault 파일 삭제"""
    try:
        logger.info(f"Vault 파일 삭제 시작 - 이름: {vault_name}, 파일: {file_path}")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise Exception(f"Vault {vault_name} does not exist")
            
        # 파일 경로 설정
        full_path = os.path.join(vault_path, file_path)
        
        # 파일이 존재하는지 확인
        if not os.path.exists(full_path):
            raise Exception(f"File {file_path} does not exist in vault {vault_name}")
            
        # 파일 삭제
        os.remove(full_path)
        
        return {
            "status": "success",
            "message": f"File {file_path} deleted successfully"
        }
    except Exception as e:
        logger.error(f"Vault 파일 삭제 중 오류 발생: {str(e)}")
        raise

@mcp.tool()
def search_tags(vault_name: str, tag: str = None) -> dict:
    """태그 검색"""
    try:
        logger.info(f"태그 검색 시작 - Vault: {vault_name}, 태그: {tag}")
        
        if not vault_name:
            raise InvalidRequestError("Vault name is required")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise VaultNotFoundError(vault_name)
            
        # 모든 Markdown 파일에서 태그 검색
        tagged_files = []
        try:
            for root, dirs, files in os.walk(vault_path):
                # .obsidian 디렉토리 제외
                if ".obsidian" in root:
                    continue
                    
                for filename in files:
                    if not filename.endswith('.md'):
                        continue
                        
                    file_path = os.path.join(root, filename)
                    relative_path = os.path.relpath(file_path, vault_path)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        # 태그 추출 (예: #태그 또는 #태그/하위태그)
                        import re
                        tags = re.findall(r'#([^\s#]+)', content)
                        
                        # 특정 태그로 필터링
                        if tag:
                            if tag in tags:
                                tagged_files.append({
                                    "path": relative_path,
                                    "tags": tags
                                })
                        else:
                            if tags:
                                tagged_files.append({
                                    "path": relative_path,
                                    "tags": tags
                                })
                    except (IOError, UnicodeDecodeError) as e:
                        logger.warning(f"Failed to read file {file_path}: {str(e)}")
                        continue
                        
            return {
                "vault_name": vault_name,
                "tag": tag,
                "files": tagged_files
            }
        except OSError as e:
            raise FileOperationError("search", vault_path, str(e))
            
    except ObsidianError:
        raise
    except Exception as e:
        logger.error(f"태그 검색 중 오류 발생: {str(e)}")
        raise ObsidianError(f"Failed to search tags: {str(e)}")

@mcp.tool()
def get_all_tags(vault_name: str) -> dict:
    """모든 태그 목록 조회"""
    try:
        logger.info(f"모든 태그 목록 조회 시작 - Vault: {vault_name}")
        
        if not vault_name:
            raise InvalidRequestError("Vault name is required")
        
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise VaultNotFoundError(vault_name)
            
        # 모든 태그 수집
        all_tags = set()
        try:
            for root, dirs, files in os.walk(vault_path):
                # .obsidian 디렉토리 제외
                if ".obsidian" in root:
                    continue
                    
                for filename in files:
                    if not filename.endswith('.md'):
                        continue
                        
                    file_path = os.path.join(root, filename)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        # 태그 추출
                        import re
                        tags = re.findall(r'#([^\s#]+)', content)
                        all_tags.update(tags)
                    except (IOError, UnicodeDecodeError) as e:
                        logger.warning(f"Failed to read file {file_path}: {str(e)}")
                        continue
                        
            return {
                "vault_name": vault_name,
                "tags": sorted(list(all_tags))
            }
        except OSError as e:
            raise FileOperationError("list", vault_path, str(e))
            
    except ObsidianError:
        raise
    except Exception as e:
        logger.error(f"태그 목록 조회 중 오류 발생: {str(e)}")
        raise ObsidianError(f"Failed to get all tags: {str(e)}")

@mcp.tool()
def add_tag_to_file(vault_name: str, file_path: str, tag: str) -> dict:
    """파일에 태그 추가"""
    try:
        logger.info(f"파일에 태그 추가 시작 - Vault: {vault_name}, 파일: {file_path}, 태그: {tag}")
        
        if not vault_name:
            raise InvalidRequestError("Vault name is required")
            
        if not file_path:
            raise InvalidRequestError("File path is required")
            
        if not tag:
            raise InvalidRequestError("Tag is required")
            
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise VaultNotFoundError(vault_name)
            
        # 파일 경로 설정
        full_path = os.path.join(vault_path, file_path)
        
        # 파일이 존재하는지 확인
        if not os.path.exists(full_path):
            raise FileNotFoundError(file_path, vault_name)
            
        try:
            # 파일 읽기
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 이미 태그가 있는지 확인
            import re
            if f"#{tag}" in content:
                return {
                    "status": "success",
                    "message": f"Tag #{tag} already exists in file {file_path}"
                }
                
            # 태그 추가 (파일 끝에 추가)
            content = content.rstrip() + f"\n\n#{tag}\n"
            
            # 파일 쓰기
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            return {
                "status": "success",
                "message": f"Tag #{tag} added to file {file_path}"
            }
        except (IOError, UnicodeDecodeError) as e:
            raise FileOperationError("write", full_path, str(e))
            
    except ObsidianError:
        raise
    except Exception as e:
        logger.error(f"태그 추가 중 오류 발생: {str(e)}")
        raise ObsidianError(f"Failed to add tag: {str(e)}")

@mcp.tool()
def remove_tag_from_file(vault_name: str, file_path: str, tag: str) -> dict:
    """파일에서 태그 제거"""
    try:
        logger.info(f"파일에서 태그 제거 시작 - Vault: {vault_name}, 파일: {file_path}, 태그: {tag}")
        
        if not vault_name:
            raise InvalidRequestError("Vault name is required")
            
        if not file_path:
            raise InvalidRequestError("File path is required")
            
        if not tag:
            raise InvalidRequestError("Tag is required")
            
        vault_path = get_vault_path(vault_name)
        
        # Vault가 존재하는지 확인
        if not os.path.exists(vault_path):
            raise VaultNotFoundError(vault_name)
            
        # 파일 경로 설정
        full_path = os.path.join(vault_path, file_path)
        
        # 파일이 존재하는지 확인
        if not os.path.exists(full_path):
            raise FileNotFoundError(file_path, vault_name)
            
        try:
            # 파일 읽기
            with open(full_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 태그가 있는지 확인
            import re
            if f"#{tag}" not in content:
                return {
                    "status": "success",
                    "message": f"Tag #{tag} does not exist in file {file_path}"
                }
                
            # 태그 제거
            content = re.sub(rf'#{tag}\s*', '', content)
            
            # 파일 쓰기
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
            return {
                "status": "success",
                "message": f"Tag #{tag} removed from file {file_path}"
            }
        except (IOError, UnicodeDecodeError) as e:
            raise FileOperationError("write", full_path, str(e))
            
    except ObsidianError:
        raise
    except Exception as e:
        logger.error(f"태그 제거 중 오류 발생: {str(e)}")
        raise ObsidianError(f"Failed to remove tag: {str(e)}")

def process_command(command_data):
    """명령어 처리"""
    try:
        if not isinstance(command_data, dict):
            raise InvalidRequestError("Request must be a dictionary")
            
        jsonrpc = command_data.get('jsonrpc')
        if jsonrpc != '2.0':
            raise InvalidRequestError("Invalid JSON-RPC version")
            
        method = command_data.get('method')
        if not method:
            raise InvalidRequestError("Method is required")
            
        params = command_data.get('params', {})
        request_id = command_data.get('id')
        
        # vault_name 파라미터가 있는 경우, 무시하고 진행
        if 'vault_name' in params:
            logger.info("vault_name parameter is ignored as we're using the configured vault path")
        
        result = None
        
        if method == 'create_vault':
            result = create_vault(params.get('vault_name', 'default'), params.get('path'))
        elif method == 'delete_vault':
            result = delete_vault(params.get('vault_name', 'default'))
        elif method == 'list_vaults':
            result = list_vaults()
        elif method == 'get_vault_info':
            result = get_vault_info(params.get('vault_name', 'default'))
        elif method == 'get_vault_settings':
            result = get_vault_settings(params.get('vault_name', 'default'))
        elif method == 'update_vault_settings':
            result = update_vault_settings(params.get('vault_name', 'default'), params.get('settings'))
        elif method == 'list_vault_files':
            result = list_vault_files(params.get('vault_name', 'default'), params.get('path'))
        elif method == 'write_vault_file':
            result = write_vault_file(params.get('vault_name', 'default'), params.get('file_path'), params.get('content'))
        elif method == 'delete_vault_file':
            result = delete_vault_file(params.get('vault_name', 'default'), params.get('file_path'))
        elif method == 'search_tags':
            result = search_tags(params.get('vault_name', 'default'), params.get('tag'))
        elif method == 'get_all_tags':
            result = get_all_tags(params.get('vault_name', 'default'))
        elif method == 'add_tag_to_file':
            result = add_tag_to_file(params.get('vault_name', 'default'), params.get('file_path'), params.get('tag'))
        elif method == 'remove_tag_from_file':
            result = remove_tag_from_file(params.get('vault_name', 'default'), params.get('file_path'), params.get('tag'))
        else:
            raise InvalidRequestError(f"Unknown method: {method}")
            
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "result": result
        }
    except ObsidianError as e:
        return {
            "jsonrpc": "2.0",
            "id": request_id if 'request_id' in locals() else None,
            "error": {
                "code": e.code,
                "message": e.message
            }
        }
    except Exception as e:
        logger.error(f"명령어 처리 중 오류 발생: {str(e)}")
        return {
            "jsonrpc": "2.0",
            "id": request_id if 'request_id' in locals() else None,
            "error": {
                "code": -32000,
                "message": str(e)
            }
        }

def main():
    """메인 함수"""
    try:
        # Vault 경로 확인
        if not OBSIDIAN_VAULT_PATH:
            logger.error("OBSIDIAN_VAULT_PATH가 설정되지 않음")
            sys.exit(1)
            
        # Vault 경로가 존재하는지 확인
        if not os.path.exists(OBSIDIAN_VAULT_PATH):
            logger.error(f"Vault 경로가 존재하지 않음: {OBSIDIAN_VAULT_PATH}")
            sys.exit(1)
            
        logger.info("MCP 서버 실행")
        mcp.run()
    except Exception as e:
        logger.error(f"서버 실행 중 오류 발생: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 