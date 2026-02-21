from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud.base import CRUDBase
from app.models.history import History
from app.schemas.history import HistoryCreate, HistoryUpdate

class CRUDHistory(CRUDBase[History, HistoryCreate, HistoryUpdate]):
    async def get_multi(self, db: AsyncSession, *, skip: int = 0, limit: int = 100) -> List[History]:
        result = await db.execute(select(self.model).order_by(self.model.year.desc(), self.model.order).offset(skip).limit(limit))
        return result.scalars().all()

history = CRUDHistory(History)
