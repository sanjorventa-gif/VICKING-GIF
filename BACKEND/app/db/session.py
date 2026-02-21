from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

connect_args = {}
if "sqlite" in settings.SQLALCHEMY_DATABASE_URI:
    connect_args["check_same_thread"] = False

engine = create_async_engine(
    settings.SQLALCHEMY_DATABASE_URI, 
    echo=False,
    future=True,
    connect_args=connect_args
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)
