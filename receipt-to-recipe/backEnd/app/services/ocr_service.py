import pytesseract
from PIL import Image
from io import BytesIO
from typing import List
from app.models.upload import ExtractedItem
from app.logs.logger import logger
import traceback # For detailed error logging

async def extract_text_from_image(image_data: bytes) -> List[ExtractedItem]:
    """
    Process the image data and extract text using Tesseract OCR
    
    Args:
        image_data (bytes): Binary image data 
    
    Returns: 
        List[ExtractedItem]: A list of extracted items with their confidence level
    """
    
    try:
        # Open the image from binary data 
        image = Image.open(BytesIO(image_data))
        
        # Log image metadata 
        logger.info(f"Processing image. Format: {image.format}, Size: {image.size}, Mode: {image.mode}")
        
        # Perform OCR (Optical Character Recognition) on the image using Tesseract
        ocr_result = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
        
        extracted_items = []
        for i in range(len(ocr_result['text'])):
            text = ocr_result['text'][i].strip() # Extracting the text value 
            try:
                conf = int(ocr_result['conf'][i]) # Converting float value to type int
            except ValueError:
                conf = 0 # Default to 0 if conversion fails 
            
            if text and conf > 0: # Filter out empty text and invalid confidence 
                extracted_items.append(ExtractedItem(item_name=text, confidence=conf / 100.0))
        
        logger.info(f"OCR extracted {len(extracted_items)} items successfully.")
        return extracted_items
    
    except Exception as e:
        # Log the error 
        logger.error(f"OCR processing failed: {e}\n{traceback.format_exc()}")
        return []
            