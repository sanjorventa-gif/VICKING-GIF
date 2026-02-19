from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator
from dotenv import load_dotenv
import os

# Try loading .env from local directory or parent
env_path = os.path.join(os.path.dirname(__file__), "../../.env")
if not os.path.exists(env_path):
    env_path = os.path.join(os.path.dirname(__file__), "../../../.env")
load_dotenv(env_path)

class Settings(BaseSettings):
    PROJECT_NAME: str = "WebInvita"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "CHANGE_THIS_IN_PRODUCTION"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 
    RECAPTCHA_SECRET_KEY: str = "CHANGE_ME"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | List[str]) -> List[str] | str:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    BACKEND_CORS_ORIGIN_REGEX: str | None = r"https://sanjor-website.*\.vercel\.app"

    # Database
    DATABASE_URL: str | None = None
    SQLALCHEMY_DATABASE_URI: str | None = None

    @validator("DATABASE_URL", pre=True, always=True)
    def assemble_db_url(cls, v: str | None, values: dict) -> str:
        if v and isinstance(v, str):
            return v
        if values.get("SQLALCHEMY_DATABASE_URI"):
            return values.get("SQLALCHEMY_DATABASE_URI")
        return "sqlite+aiosqlite:///./webinvita.db"

    # Uploads
    BACKEND_URL: str = "http://localhost:8000"

    # Email
    SMTP_HOST: str = "mail.vicking.com.ar" # Cyberpanel Host
    SMTP_PORT: int = 465 # SSL
    SMTP_USER: str = "info@vicking.com.ar"
    SMTP_PASSWORD: str = "password"
    EMAILS_FROM_EMAIL: str = "info@vicking.com.ar"
    EMAILS_FROM_NAME: str = "VICKING"
    EMAIL_TO_ADMIN: str = "info@vicking.com.ar"

    class Config:
        case_sensitive = True
        # Load .env from where the script is run, or fallback
        env_file = ".env"

settings = Settings()
