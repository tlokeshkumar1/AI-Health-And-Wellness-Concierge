from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from backend.utils.auth import get_password_hash, verify_password, create_access_token, get_current_user
from backend.database.mongo import create_user, get_user_by_email
from backend.models.schemas import UserCreate, User, Token
from backend.config import settings

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    db_user = await get_user_by_email(user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    
    new_user = await create_user(user_dict)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user["email"]}, expires_delta=access_token_expires
    )
    
    # Convert _id to id for response if needed, but we return Token here
    # If we wanted to return User, we'd need to map it.
    # The Token model includes 'user' field which is of type User.
    
    # Map Mongo document to User model
    new_user["id"] = str(new_user["_id"])
    user_model = User(**new_user)
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_model}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    user["id"] = str(user["_id"])
    user_model = User(**user)
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_model}

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
