from sqlalchemy import create_engine, Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func

Base = declarative_base()

class PomodoroSettings(Base):
    __tablename__ = 'PomodoroSettings'

    id = Column(Integer, primary_key=True, autoincrement=True)  # 自動増分ID
    title = Column(String(255), nullable=False)                  # タイトル
    duration = Column(Integer, nullable=False)                   # 作業時間（分）
    break_time = Column(Integer, nullable=True)                  # 休憩時間（分）
    repeat = Column(Integer, nullable=False)                     # 繰り返し回数
    memo = Column(Text, nullable=True)                            # メモ（任意）
    created_at = Column(TIMESTAMP, server_default=func.now())    # 作成日時
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())  # 更新日時

engine = create_engine('mysql://root@localhost/PomodoroApp')

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()