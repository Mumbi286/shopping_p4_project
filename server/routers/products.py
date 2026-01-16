from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm import Session
from models import Product
from database import SessionLocal
from typing import List, Optional

# Configuration on the routers
router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    description: Optional[str]

class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    description: Optional[str]

    class Config:
        orm_mode = True


# Get all products
@router.get("/", response_model=List[ProductOut], status_code=status.HTTP_200_OK)
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

# Get a single product by ID
@router.get("/{product_id}", response_model=List[ProductOut], status_code=status.HTTP_200_OK)
def get_product(product_id: int = Path(gt=0), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Create a new product
@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(request: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**request.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# Update a product
@router.put("/{product_id}", response_model=ProductOut, status_code=status.HTTP_200_OK)
def update_product(
    product_id: int = Path(gt=0),
    request: ProductUpdate = None,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update only provided fields
    for key, value in request.dict(exclude_unset=True).items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

# Delete a product
@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
def delete_product(product_id: int = Path(gt=0), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted", "product_id": product_id}
