from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from starlette import status

from models import Cart, CartItem, Product 
from database import SessionLocal
 


# ROUTER CONFIG
router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


# DATABASE DEPENDENCY
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




# SCHEMAS for request
from pydantic import BaseModel

class AddCartItemRequest(BaseModel):
    product_id: int
    quantity: int = 1


class UpdateCartItemRequest(BaseModel):
    quantity: int


# routes

@router.get("/", status_code=status.HTTP_200_OK)
def get_cart():
    
    # Get all items in the logged-in user's cart

    cart = db.query(Cart).filter(Cart.user_id == user.get("id")).first()
    if not cart:
        return {"items": []}

    items = [
        {
            "id": item.id,
            "product_id": item.product_id,
            "product_name": item.product.name,
            "quantity": item.quantity,
            "price": item.product.price
        }
        for item in cart.items
    ]
    return {"cart_id": cart.id, "items": items}


@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_to_cart(request: AddCartItemRequest):
    
    # Add a product to the user's cart
    # Get or create cart
    cart = db.query(Cart).filter(Cart.user_id == user.get("id")).first()
    if not cart:
        cart = Cart(user_id=user.get("id"))
        db.add(cart)
        db.commit()
        db.refresh(cart)

    # Check if product exists
    product = db.query(Product).filter(Product.id == request.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Check if item already in cart
    cart_item = (
        db.query(CartItem)
        .filter(CartItem.cart_id == cart.id, CartItem.product_id == request.product_id)
        .first()
    )
    if cart_item:
        # Increase quantity
        cart_item.quantity += request.quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=request.quantity)
        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)

    return {"message": "Product added to cart", "cart_item_id": cart_item.id}


@router.put("/update/{item_id}", status_code=status.HTTP_200_OK)
def update_cart_item(
    item_id: int = Path(gt=0),
    request: UpdateCartItemRequest = None
):
    
    # Update quantity of a cart item
    cart_item = (
        db.query(CartItem)
        .join(Cart)
        .filter(CartItem.id == item_id, Cart.user_id == user.get("id"))
        .first()
    )
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    cart_item.quantity = request.quantity
    db.commit()
    db.refresh(cart_item)

    return {"message": "Cart item updated", "cart_item_id": cart_item.id}



@router.delete("/remove/{item_id}", status_code=status.HTTP_200_OK)
def remove_cart_item(item_id: int = Path(gt=0)):
    
    # Remove a cart item
    cart_item = (
        db.query(CartItem)
        .join(Cart)
        .filter(CartItem.id == item_id, Cart.user_id == user.get("id"))
        .first()
    )
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()

    return {"message": "Cart item removed", "cart_item_id": item_id}
