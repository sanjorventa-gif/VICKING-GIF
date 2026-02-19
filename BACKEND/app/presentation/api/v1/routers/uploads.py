from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
from typing import List
from app.core.config import settings

router = APIRouter()

UPLOAD_DIR = "app/static/uploads"

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Create unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Return URL
        # Use BACKEND_URL from settings
        url = f"{settings.BACKEND_URL}/static/uploads/{unique_filename}"
        return {"url": url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
