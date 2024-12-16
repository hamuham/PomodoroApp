from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db  # データベースセッションを取得するための依存関数

router = APIRouter()

# ポモドーロ設定の作成
@router.post("/", response_model=schemas.PomodoroSettings)
async def create_pomodoro(pomodoro: schemas.PomodoroCreate, db: Session = Depends(get_db)):
    return crud.create_pomodoro(db=db, pomodoro=pomodoro)

# ポモドーロ設定の取得
@router.get("/{pomodoro_id}", response_model=schemas.PomodoroSettings)
async def read_pomodoro(pomodoro_id: int, db: Session = Depends(get_db)):
    db_pomodoro = crud.get_pomodoro(db=db, pomodoro_id=pomodoro_id)
    if db_pomodoro is None:
        raise HTTPException(status_code=404, detail="Pomodoro not found")
    return db_pomodoro

# ポモドーロ設定の更新
@router.put("/{pomodoro_id}", response_model=schemas.PomodoroSettings)
async def update_pomodoro(pomodoro_id: int, pomodoro: schemas.PomodoroCreate, db: Session = Depends(get_db)):
    db_pomodoro = crud.get_pomodoro(db=db, pomodoro_id=pomodoro_id)
    if db_pomodoro is None:
        raise HTTPException(status_code=404, detail="Pomodoro not found")
    return crud.update_pomodoro(db=db, pomodoro_id=pomodoro_id, pomodoro=pomodoro)

# ポモドーロ設定の削除
@router.delete("/{pomodoro_id}", response_model=schemas.PomodoroSettings)
async def delete_pomodoro(pomodoro_id: int, db: Session = Depends(get_db)):
    db_pomodoro = crud.get_pomodoro(db=db, pomodoro_id=pomodoro_id)
    if db_pomodoro is None:
        raise HTTPException(status_code=404, detail="Pomodoro not found")
    return crud.delete_pomodoro(db=db, pomodoro_id=pomodoro_id)
