from datetime import datetime
from pydantic import BaseModel, Field

class ItemBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    quantity: int = Field(..., ge=0)

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=255)
    quantity: int | None = Field(None, ge=0)

class Item(ItemBase):
    id: int
    created_at: datetime   # Use datetime instead of str

    class Config:
        orm_mode = True
