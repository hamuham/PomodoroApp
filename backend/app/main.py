from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from .models import PomodoroSettings
from .database import get_db
from typing import Optional

app = FastAPI()

# CORS の設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ポモドーロ設定を受け取るための Pydantic モデル
class PomodoroCreate(BaseModel):
    title: str
    duration: int
    break_time: int
    repeat: int
    memo: Optional[str] = None

@app.post("/api/pomodoro")
async def create_pomodoro(pomodoro: PomodoroCreate, db: Session = Depends(get_db)):
    db_pomodoro = PomodoroSettings(
        title=pomodoro.title,
        duration=pomodoro.duration,
        break_time=pomodoro.break_time,
        repeat=pomodoro.repeat,
        memo=pomodoro.memo
    )
    db.add(db_pomodoro)
    db.commit()
    db.refresh(db_pomodoro)
    return db_pomodoro

@app.get("/api/pomodoro")
async def get_pomodoro_list(db: Session = Depends(get_db)):
    # ポモドーロ設定を全て取得
    pomodoro_settings = db.query(PomodoroSettings).all()
    return pomodoro_settings

@app.delete("/api/pomodoro/{pomodoro_id}")
async def delete_pomodoro(pomodoro_id: int, db: Session = Depends(get_db)):
    # ポモドーロ設定をデータベースから取得
    db_pomodoro = db.query(PomodoroSettings).filter(PomodoroSettings.id == pomodoro_id).first()

    if db_pomodoro is None:
        raise HTTPException(status_code=404, detail="ポモドーロ設定が見つかりません")

    db.delete(db_pomodoro)
    db.commit()
    return {"message": "ポモドーロ設定が削除されました"}