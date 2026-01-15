from fastapi import FastAPI
from database import engine, Base
from routes import products, cart  # Import routers

#  Initialize FastAPI app 
app = FastAPI(
    title="Shopping Cart API",
    description="A FastAPI application with MySQL backend to manage users, products, carts, and orders",
    version="1.0.0"
)

#  Create all tables in the database 
Base.metadata.create_all(bind=engine)

# Include routers 
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(cart.router, prefix="/cart", tags=["cart"])

#  Optional root route 
@app.get("/")
def read_root():
    return {"message": "Welcome to the Shopping Cart API!"}
