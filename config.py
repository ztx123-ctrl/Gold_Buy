import os
from pathlib import Path

from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent

try:
    from dotenv import load_dotenv
except ModuleNotFoundError:  # pragma: no cover - fallback for minimal env
    load_dotenv = None

if load_dotenv:
    load_dotenv(BASE_DIR / ".env")


class Settings(BaseModel):
    dashscope_api_key: str = Field(alias="DASHSCOPE_API_KEY")
    dashscope_base_url: str = Field(alias="DASHSCOPE_BASE_URL")
    model_name: str = Field(default="qwen3.6-plus", alias="MODEL_NAME")
    request_timeout: float = Field(default=30.0, alias="REQUEST_TIMEOUT")
    news_limit: int = Field(default=3, alias="NEWS_LIMIT")
    prompt_version: str = Field(default="v4", alias="PROMPT_VERSION")
    max_retries: int = Field(default=1, alias="MODEL_MAX_RETRIES")

    @classmethod
    def from_env(cls) -> "Settings":
        payload = {
            "DASHSCOPE_API_KEY": os.getenv("DASHSCOPE_API_KEY", ""),
            "DASHSCOPE_BASE_URL": os.getenv("DASHSCOPE_BASE_URL", ""),
            "MODEL_NAME": os.getenv("MODEL_NAME", "qwen3.6-plus"),
            "REQUEST_TIMEOUT": os.getenv("REQUEST_TIMEOUT", "30"),
            "NEWS_LIMIT": os.getenv("NEWS_LIMIT", "3"),
            "PROMPT_VERSION": os.getenv("PROMPT_VERSION", "v4"),
            "MODEL_MAX_RETRIES": os.getenv("MODEL_MAX_RETRIES", "1"),
        }
        settings = cls.model_validate(payload)
        if not settings.dashscope_api_key:
            raise ValueError("请设置 DASHSCOPE_API_KEY")
        if not settings.dashscope_base_url:
            raise ValueError("请设置 DASHSCOPE_BASE_URL")
        return settings


settings = Settings.from_env()
