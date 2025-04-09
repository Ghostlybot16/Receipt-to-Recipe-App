from fastapi import FastAPI
from app.api.api_routes import router as api_router
from app.logs.logger import logger

app = FastAPI(
    title="PantryPal",
    version="1.0.0"
)

app.include_router(api_router)

@app.get("/")
def root():
    logger.info("\n" + "-" * 80)
    logger.info("Root endpoint accessed.")
    return {
        "message": "Welcome to the PantryPal API!"
    }
