import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DB_NAME: str

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def get_db_url(self):
        return f"sqlite+aiosqlite:///{self.DB_NAME}"

    @property
    def auth_data(self):
        return {"secret_key": self.SECRET_KEY, "algorithm": self.ALGORITHM}


settings = Settings()
