# Import resources
from .db_schema import get_schema
from .user_prefs import get_preferences

# List all resources for easier importing
__all__ = ['get_schema', 'get_preferences']