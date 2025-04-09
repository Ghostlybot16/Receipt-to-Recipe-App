import logging
import os 
import sys

# Ensure the logs directory exists 
LOG_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(LOG_DIR, "pantrypal.log")


# --- Colored Console Formatter ---
class ColorFormatter(logging.Formatter):
    GREY = "\x1b[38;20m"
    GREEN = "\x1b[32;1m"
    YELLOW = "\x1b[33;1m"
    RED = "\x1b[31;1m"
    RESET = "\x1b[0m"

    FORMATS = {
        logging.DEBUG: GREY + "%(asctime)s - DEBUG - %(message)s" + RESET,
        logging.INFO: GREEN + "%(asctime)s - INFO - %(message)s" + RESET,
        logging.WARNING: YELLOW + "%(asctime)s - WARNING - %(message)s" + RESET,
        logging.ERROR: RED + "%(asctime)s - ERROR - %(message)s" + RESET,
        logging.CRITICAL: RED + "%(asctime)s - CRITICAL - %(message)s" + RESET,
    }
    
    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)
    
# --- Base Logger Setup ---
logger = logging.getLogger("PantryPalLogger")
logger.setLevel(logging.INFO)

# Surpress fastapi uvicorn and watchfiles logs 
for name in logging.root.manager.loggerDict:
    if "watchfiles" in name or "uvicorn" in name:
        logging.getLogger(name).setLevel(logging.WARNING)


# --- File Handler (pantrypal.log) ---
file_handler = logging.FileHandler(LOG_FILE)
file_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")
file_handler.setFormatter(file_formatter)

# --- Console Handler (colored terminal output) ---
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(ColorFormatter())

# --- Add handler only if not already added ---
if not logger.hasHandlers():
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

