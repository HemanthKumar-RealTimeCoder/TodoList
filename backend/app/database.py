from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ===============================
# DATABASE CONFIGURATION
# ===============================

MYSQL_USER = "todo_user"
MYSQL_PASSWORD = "todo123"
MYSQL_HOST = "localhost"
MYSQL_DB = "todo_app"

DATABASE_URL = (
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"
)

# ================
# SQLALCHEMY SETUP
# ================

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
