from PIL import Image
import pytesseract

# Print the text extracted from the image
print(pytesseract.image_to_string(Image.open('C:/Projects/img/testImage.png')))