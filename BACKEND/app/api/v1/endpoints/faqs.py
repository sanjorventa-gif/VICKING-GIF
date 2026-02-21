from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.api import deps
from app.models.faq import Faq
from app.schemas.faq import FaqCreate, FaqUpdate, FaqResponse
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[FaqResponse])
async def read_faqs(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve active FAQs (Public).
    """
    result = await db.execute(select(Faq).filter(Faq.is_active == True).order_by(Faq.order).offset(skip).limit(limit))
    return result.scalars().all()

@router.get("/admin", response_model=List[FaqResponse])
async def read_all_faqs(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Retrieve all FAQs (Admin).
    """
    result = await db.execute(select(Faq).order_by(Faq.order).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=FaqResponse)
async def create_faq(
    *,
    db: AsyncSession = Depends(deps.get_db),
    faq_in: FaqCreate,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Create new FAQ (Admin).
    """
    faq = Faq(**faq_in.dict())
    db.add(faq)
    await db.commit()
    await db.refresh(faq)
    return faq

@router.put("/{id}", response_model=FaqResponse)
async def update_faq(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    faq_in: FaqUpdate,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Update an FAQ (Admin).
    """
    result = await db.execute(select(Faq).filter(Faq.id == id))
    faq = result.scalars().first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    update_data = faq_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(faq, field, value)
    
    db.add(faq)
    await db.commit()
    await db.refresh(faq)
    return faq

@router.delete("/{id}", response_model=FaqResponse)
async def delete_faq(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    """
    Delete an FAQ (Admin).
    """
    result = await db.execute(select(Faq).filter(Faq.id == id))
    faq = result.scalars().first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    await db.delete(faq)
    await db.commit()
    return faq
