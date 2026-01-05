from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from .database import Base, engine, SessionLocal
from .schemas import UserRegister, UserLogin, TodoCreate, TodoResponse, PaginatedTodoResponse
from .auth import register_user, login_user
from .models import Todo as TodoModel

# Automatically creates tables in MySQL if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    return register_user(db, user)

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user)

@app.get("/todos", response_model=PaginatedTodoResponse)
def get_todos(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(5, ge=1),
    search: Optional[str] = None
):
    query = db.query(TodoModel)
    if search:
        query = query.filter(TodoModel.task.ilike(f"%{search}%"))

    total_records = query.count()
    total_pages = (total_records + limit - 1) // limit
    
    offset = (page - 1) * limit
    todos = query.offset(offset).limit(limit).all()

    return {
        "data": todos,
        "totalRecords": total_records,
        "totalPages": total_pages,
        "currentPage": page
    }

@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = TodoModel(task=todo.task)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = db.query(TodoModel).filter(TodoModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db_todo.task = todo.task
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(TodoModel).filter(TodoModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    return {"message": "Deleted successfully"}