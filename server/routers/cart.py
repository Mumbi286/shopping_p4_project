from typing_extensions import Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status

from database import SessionLocal
from models import Cart, CartItem, Product
from .auth import get_current_user

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)

# DB dependency
def get_db():
    
    # Creating a database session for each request
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


# Pydantic Schemas (Request Bodies)
class CartItemRequest(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(gt=0)



@router.get("/", status_code=status.HTTP_200_OK)
def get_my_cart(user: user_dependency, db: db_dependency):

    # Returns the current logged-in user's cart
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    cart = db.query(Cart).filter(Cart.user_id == user.get("id")).first()

    if not cart:
        return {"message": "Cart is empty"}

    return cart


@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_to_cart(
    user: user_dependency,
    db: db_dependency,
    cart_item: CartItemRequest
):
    
    # Adds a product to the user's cart.   
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    # Ensures if the product exists
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # creating cart
    cart = db.query(Cart).filter(Cart.user_id == user.get("id")).first()
    if not cart:
        cart = Cart(user_id=user.get("id"))
        db.add(cart)
        db.commit()
        db.refresh(cart)

    # Check if product already in cart
    existing_item = db.query(CartItem)\
        .filter(CartItem.cart_id == cart.id)\
        .filter(CartItem.product_id == cart_item.product_id)\
        .first()

    if existing_item:
        existing_item.quantity += cart_item.quantity
    else:
        new_item = CartItem(
            cart_id=cart.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity
        )
        db.add(new_item)

    db.commit()
    return {"message": "Item added to cart"}


@router.put("/item/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_cart_item(
    user: user_dependency,
    db: db_dependency,
    item_id: int = Path(gt=0),
    quantity: int = Field(gt=0)
):
    
    # Updates quantity of a cart item.

    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    item = db.query(CartItem).join(Cart)\
        .filter(CartItem.id == item_id)\
        .filter(Cart.user_id == user.get("id"))\
        .first()

    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    item.quantity = quantity
    db.commit()


@router.delete("/item/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_cart_item(
    user: user_dependency,
    db: db_dependency,
    item_id: int = Path(gt=0)
):
    # Removes an item from the cart.
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    item = db.query(CartItem).join(Cart)\
        .filter(CartItem.id == item_id)\
        .filter(Cart.user_id == user.get("id"))\
        .first()

    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(item)
    db.commit()
