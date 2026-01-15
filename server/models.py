from database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

class User(Base):
    __tablename__= "users"

    # Creating the columns
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    pass
class Product():
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False, index=True)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, default=0)

    # The relations contains
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    pass

class Cart():
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # The relation are as below
     user = relationship("User", back_populates="carts")
    items = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan"
    )
    pass
class Cartitem():
    pass

class Order():
    pass
class Orderitem():
    pass