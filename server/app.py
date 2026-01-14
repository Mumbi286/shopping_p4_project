from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session
from datetime import datetime
from pydantic import BaseModel

# --- Database Setup ---
DATABASE_URL = "mysql+pymysql://fastapi_user:StrongPass123@localhost:3306/shopping_cart"
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Models ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    carts = relationship("Cart", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    price = Column(DECIMAL(10,2))
    stock_quantity = Column(Integer, default=0)
    cart_items = relationship("CartItem", back_populates="product")

class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="carts")
    items = relationship("CartItem", back_populates="cart")

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("carts.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(DECIMAL(10,2))
    created_at = Column(DateTime, default=datetime.utcnow)

# --- Schemas ---
class ProductCreate(BaseModel):
    title: str
    price: float
    stock_quantity: int

class ProductResponse(ProductCreate):
    id: int
    class Config:
        orm_mode = True

class CartItemCreate(BaseModel):
    user_id: int
    product_id: int
    quantity: int = 1

class CartItemResponse(BaseModel):
    product_id: int
    title: str
    price: float
    quantity: int
    class Config:
        orm_mode = True

# --- App ---
app = FastAPI()
Base.metadata.create_all(bind=engine)

# --- Routes ---
# Create product
@app.post("/products/", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(title=product.title, price=product.price, stock_quantity=product.stock_quantity)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# List products
@app.get("/products/", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

# Add to cart
@app.post("/cart/add/", response_model=CartItemResponse)
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter_by(user_id=item.user_id, is_active=True).first()
    if not cart:
        cart = Cart(user_id=item.user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    product = db.query(Product).get(item.product_id)
    if not product or product.stock_quantity < item.quantity:
        raise HTTPException(status_code=400, detail="Product not available")
    cart_item = db.query(CartItem).filter_by(cart_id=cart.id, product_id=item.product_id).first()
    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=item.product_id, quantity=item.quantity)
        db.add(cart_item)
    db.commit()
    return CartItemResponse(product_id=product.id, title=product.title, price=float(product.price), quantity=cart_item.quantity)

# View cart
@app.get("/cart/{user_id}/", response_model=list[CartItemResponse])
def view_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter_by(user_id=user_id, is_active=True).first()
    if not cart:
        return []
    items = []
    for ci in cart.items:
        items.append(CartItemResponse(
            product_id=ci.product.id,
            title=ci.product.title,
            price=float(ci.product.pric),
            quantity=ci.quantity
        ))
    return items

# Checkout
@app.post("/cart/checkout/{user_id}/")
def checkout(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter_by(user_id=user_id, is_active=True).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = sum(ci.quantity * float(ci.product.price) for ci in cart.items)
    order = Order(user_id=user_id, total_amount=total)
    db.add(order)
    cart.is_active = False
    db.commit()
    return {"order_id": order.id, "total_amount": total}
