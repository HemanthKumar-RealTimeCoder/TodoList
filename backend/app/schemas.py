from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str

class TodoBase(BaseModel):
    task: str

class TodoCreate(TodoBase):
    pass

class TodoResponse(TodoBase):
    id: int
    class Config:
        from_attributes = True

class PaginatedTodoResponse(BaseModel):
    data: List[TodoResponse]
    totalRecords: int
    totalPages: int
    currentPage: int