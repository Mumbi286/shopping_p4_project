from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Creating the database location
SQLALCHEMY_DATABASE_URL = 'sqlite:///./todosapp.db'

# The Engine: The entry point to the database.
# 'connect_args={"check_same_thread": False}' is specific to SQLite. 
# It allows FastAPI to access the database across multiple threads safely.
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

# The Session Factory: A class used to create a new "Session" for each request.

# - autocommit=False: Transactions must be manually committed.
# - autoflush=False: Changes won't be sent to the DB until you explicitly call flush or commit.
# - bind=engine: Links this session maker to the specific database engine above.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# The Base Class: All database models (tables) will inherit from this class.
# This maps your Python classes to actual database tables.
Base = declarative_base()