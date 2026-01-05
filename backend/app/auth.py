from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException
from .models import User as UserModel
from .schemas import UserRegister, UserLogin

SECRET_KEY = "SECRET123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def register_user(db: Session, user: UserRegister):
    existing_user = db.query(UserModel).filter(UserModel.email == user.email).first() 
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered") 

    new_user = UserModel(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        password=hash_password(user.password),
        role=user.role 
    )
    db.add(new_user) 
    db.commit() 
    db.refresh(new_user) 
    return {"message": "User registered successfully"} 

def login_user(db: Session, user: UserLogin):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first() 

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials") 
    
    # Strictly enforce role-based access
    if db_user.role != user.role: 
        raise HTTPException(
            status_code=403, 
            detail=f"Access Denied: This account is registered as a {db_user.role}"
        ) 

    token = create_token({"sub": db_user.email}) 
    return {"access_token": token} 