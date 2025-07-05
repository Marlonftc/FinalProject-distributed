from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, engine, Base, Product
import uvicorn

app = FastAPI(
    title="Delete Product API",
    description="API to delete products for Administrator domain",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crea las tablas si no existen
Base.metadata.create_all(bind=engine)

class ProductDeleteRequest(BaseModel):
    id: int

@app.delete("/api/products")
def delete_product(product: ProductDeleteRequest):
    db = SessionLocal()
    try:
        db_product = db.query(Product).filter(Product.id == product.id).first()
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")

        db.delete(db_product)
        db.commit()
        return {"message": f"Product with ID {product.id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8094, reload=True)
