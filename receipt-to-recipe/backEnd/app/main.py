from fastapi import FastAPI
from app.api.api_routes import router as api_router

app = FastAPI(
    title="PantryPal",
    version="1.0.0"
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to the PantryPal API!"
    }
