from fastapi import fastAPI,depends
from sqlalchemy.import(
    create_engine,Column,Integer,String,
    Boolean,ForeignKey,DateTime,Decimal, Text
)
from sqlalchemy.orm import declarative_base,sessionmaker,relationship,Session
from datetime import datetime


# DATABASE CONFIG
# -----------------------------
DATABASE_URL = "mysql+pymysql://root:1234@localhost:3306/shopping_cart"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine,autoflush=False)
Base = declarative_base()
