from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Download])
async def read_downloads(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve downloads.
    """
    downloads = await crud.download.get_multi(db, skip=skip, limit=limit)
    return downloads

@router.post("/", response_model=schemas.Download)
async def create_download(
    *,
    db: AsyncSession = Depends(deps.get_db),
    download_in: schemas.DownloadCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new download.
    """
    download = await crud.download.create(db=db, obj_in=download_in)
    return download

@router.put("/{id}", response_model=schemas.Download)
async def update_download(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    download_in: schemas.DownloadUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a download.
    """
    download = await crud.download.get(db=db, id=id)
    if not download:
        raise HTTPException(status_code=404, detail="Download not found")
    download = await crud.download.update(db=db, db_obj=download, obj_in=download_in)
    return download

@router.delete("/{id}", response_model=schemas.Download)
async def delete_download(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a download.
    """
    download = await crud.download.get(db=db, id=id)
    if not download:
        raise HTTPException(status_code=404, detail="Download not found")
    download = await crud.download.remove(db=db, id=id)
    return download
