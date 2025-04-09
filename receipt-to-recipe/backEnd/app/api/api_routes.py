from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.ocr_service import extract_text_from_image
from app.models.upload import ReceiptUploadResponse
from app.logs.logger import logger

router = APIRouter()

@router.post("/ocr/parse-receipt", response_model=ReceiptUploadResponse)
async def upload_receipt(file: UploadFile = File(...)):
    logger.info("\n" + "-" * 80)
    logger.info(f"Received /ocr/parse-receipt request with file: {file.filename}")
    """
    This endpoint:
        - Accepts image file 
        - Validates file type to JPEG or PNG 
        - Reads their content 
        - Processes image using the OCR service 
        - Return extracted items along with metadata
    
    Args: 
        file(UploadFile): The uploaded image file 
        
    Returns:
        ReceiptUploadResponse: The response containing extracted items and metadata
    """
    
    #Validate file type 
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only JPEG and PNG are supported."
        )
    
    # Read file content 
    image_data = await file.read()
    
    # Process the image to extract text 
    extracted_items = await extract_text_from_image(image_data)
    
    logger.info(f"OCR Completed for: {file.filename}, {len(extracted_items)} items found")
    
    # Prepare the response 
    response = ReceiptUploadResponse(
        filename=file.filename,
        content_type=file.content_type,
        extracted_items=extracted_items,
        message="Receipt processed successfully."
    )
    
    return response

@router.get("/ping")
async def ping():
    logger.info("\n" + "-" * 80)
    logger.info("Ping endpoint accessed.")
    return {
        "message": "Pong! PantryPal backend is live!"
    }