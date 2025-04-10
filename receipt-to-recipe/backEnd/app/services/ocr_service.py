import pytesseract
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
from typing import List
from app.models.upload import ExtractedItemWithBox #
from app.logs.logger import logger
import traceback # For detailed error logging
from rapidfuzz import fuzz

# ========== PREPROCESSING WITH OPENCV ==========
def preprocess_image(image: np.ndarray) -> np.ndarray:
    """
    Enhances the image for better OCR accurary using OpenCV.
    Converts the image to grayscale and applies binary thresholding (converting to binary image) to improve contrast for OCR 
    
    
    # Any pixel value above 150 is set to 255 (white) and everything else is set to 0
    # This makes text stand out sharply from the background, improving OCR accuracy
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY) 
        ==> 'cv2.THRESH_BINARY' creates a high-contrast black and white image 
    
    """
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) # Converts the image to grayscale because Tesseract OCR engine works better with grayscale
    
    blurred = cv2.GaussianBlur(gray, (3, 3), 0) # Apply gaussian blur to smooth edges
    
    # Adaptive threshold on sharpened image  
    thresh = cv2.adaptiveThreshold(
        blurred, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    ) # Applies binary thresholding to grayscale image. 
    
    return thresh

# ========== PERFORM OCR WITH BOUNDING BOXES ==========
def perform_ocr_with_boxes(image) -> List[ExtractedItemWithBox]:
    ocr_result = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
    extracted = []
    
    for i in range(len(ocr_result['text'])):
        text = ocr_result['text'][i].strip()
        try:
            conf = int(ocr_result['conf'][i])
        except ValueError:
            conf = 0
        
        if text and conf > 0:
            item = ExtractedItemWithBox(
                item_name=text,
                confidence=conf / 100.0,
                left=ocr_result['left'][i],
                top=ocr_result['top'][i],
                width=ocr_result['width'][i],
                height=ocr_result['height'][i]
            )
            extracted.append(item)
    return extracted
    
# ========== DUPLICATE DETECTION HELPER ==========
def is_duplicate_item(new_item, existing_item, similarity_threshold=90, position_tolerance=5) -> bool:
    """
    Returns True is both items are likely duplicates based on text similarity and positional closeness.
    """
    text_sim = fuzz.ratio(new_item.item_name.lower(), existing_item.item_name.lower())
    if text_sim < similarity_threshold:
        return False
    
    left_close = abs(new_item.left - existing_item.left) <= position_tolerance
    top_close = abs(new_item.top - existing_item.top) <= position_tolerance
    
    return left_close and top_close
    
# ========== HYBRID LOGIC: PIL + OPENCV ==========
async def extract_text_from_image(image_data: bytes) -> List[ExtractedItemWithBox]:
    try:
        logger.info("\n" + "-" * 70)
        logger.info("Starting Hybrid OCR with Bounding Boxes...")
        
        # --- PIL Pass ---
        logger.info("Performing PIL OCR...")
        image_pil = Image.open(BytesIO(image_data))
        pil_results = perform_ocr_with_boxes(image_pil)
        logger.info(f"PIL OCR extracted {len(pil_results)} items.")
        
        # --- OpenCV Pass ---
        logger.info("Performing OpenCV OCR...")
        nparr = np.frombuffer(image_data, np.uint8)
        image_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image_cv is None:
            logger.error("OpenCV failed to decode image.")
            return pil_results # Fallback to PIL
        
        processed_cv = preprocess_image(image_cv)
        cv_results = perform_ocr_with_boxes(processed_cv)
        logger.info(f"OpenCV OCR extracted {len(cv_results)} items.")
        
        combined_results: List[ExtractedItemWithBox] = []
        
        for item in pil_results + cv_results:
            if item.confidence < 0.85:
                continue # Skip low-confidence items
            
            is_duplicate = False 
            for existing in combined_results:
                if is_duplicate_item(item, existing):
                    is_duplicate = True
                    break
                
            if not is_duplicate:
                combined_results.append(item)
        
        logger.info(f"Final merged OCR set contains {len(combined_results)} items (duplicated allowed).")
        return combined_results     
        
    except Exception as e:
        logger.error(f"OCR processing failed: {e}\n{traceback.format_exc()}")
        return []
        

# async def extract_text_from_image(image_data: bytes) -> List[ExtractedItemWithBox]:
#     """
#     Process the image data and extract text using OpenCV and Tesseract OCR
    
#     Args:
#         image_data (bytes): Binary image data 
    
#     Returns: 
#         List[ExtractedItem]: A list of extracted items with their confidence level
#     """
    
#     try:
        
#         # Decone image bytes into OpenCV format 
#         nparr = np.frombuffer(image_data, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
#         if image is None:
#             logger.error("Failed to decode image with OpenCV.")
#             return []
        
#         logger.info(f"Processing image with OpenCV. SHape: {image.shape}")
        
#         # Call the preprocess image function to convert to grayscale and sharpen image 
#         processed_image = preprocess_image(image)
        
#         # OCR using Tesseract on preprocessed image 
#         ocr_result = pytesseract.image_to_data(processed_image, output_type=pytesseract.Output.DICT)
        
#         extracted_items = []
#         for i in range(len(ocr_result['text'])):
#             text = ocr_result['text'][i].strip() # Extracting the text value 
#             try:
#                 conf = int(ocr_result['conf'][i]) # Converting float value to type int
#             except ValueError:
#                 conf = 0 # Default to 0 if conversion fails 
            
#             if text and conf > 0: # Filter out empty text and invalid confidence 
#                 extracted_items.append(ExtractedItem(item_name=text, confidence=conf / 100.0))
        
#         logger.info(f"OCR extracted {len(extracted_items)} items successfully.")
#         return extracted_items
    
#     except Exception as e:
#         # Log the error 
#         logger.error(f"OCR processing failed: {e}\n{traceback.format_exc()}")
#         return []
            