from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.download import Download
from app.schemas.download import DownloadCreate, DownloadUpdate

class CRUDDownload(CRUDBase[Download, DownloadCreate, DownloadUpdate]):
    async def get_multi_by_role(
        self, db: AsyncSession, *, role: str, skip: int = 0, limit: int = 100
    ) -> List[Download]:
        # If admin, return all
        if role == "admin":
            return await self.get_multi(db, skip=skip, limit=limit)
        
        all_downloads = await self.get_multi(db, skip=0, limit=1000)
        filtered = []
        for d in all_downloads:
            if not d.allowed_roles or role in d.allowed_roles:
                filtered.append(d)
        
        return filtered[skip : skip + limit]

download = CRUDDownload(Download)
