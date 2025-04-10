from pydantic import BaseModel
from typing import List, Optional

"""
ExtractedItem: Represents an item extracted from the receipt, including the item's name and the confidence level of the extraction
"""
class ExtractedItemWithBox(BaseModel):
    item_name: str
    confidence: float
    left: int
    top: int
    width: int
    height: int
    

"""
Defines the structure of the response returned after a receipt is uploaded. Include the filename, content type, list of extracted items and a message
"""
class ReceiptUploadResponse(BaseModel):
    filename: str
    content_type: str 
    extracted_items: Optional[List[ExtractedItemWithBox]]
    message: str