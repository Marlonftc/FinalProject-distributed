from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import SessionLocal, engine, Base, Product
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Swagger metadata
app = FastAPI(
    title="Create Product API",
    description="API to create products for Administrator domain",
    version="1.0.0"
)

# CORS (opcional según frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas
Base.metadata.create_all(bind=engine)

# Modelo de entrada
class ProductRequest(BaseModel):
    name: str
    description: str
    price: float
    stock: int

@app.post("/api/products")
def create_product(product: ProductRequest):
    db = SessionLocal()
    try:
        db_product = Product(
            name=product.name,
            description=product.description,
            price=product.price,
            stock=product.stock
        )
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return {
            "message": "Product created successfully",
            "product": {
                "id": db_product.id,
                "name": db_product.name,
                "description": db_product.description,
                "price": db_product.price,
                "stock": db_product.stock
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8093, reload=True)
