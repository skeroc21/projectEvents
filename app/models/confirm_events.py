from typing import TYPE_CHECKING

from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base

if TYPE_CHECKING:
    from app.models.users import UserModel
    from app.models.events import EventsModel

class ConfirmEventModel(Base):
    __tablename__ = "confirm_events"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    users_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    confirm: Mapped[int] = mapped_column(Integer, nullable=False)
    
    user: Mapped["UserModel"] = relationship(back_populates="confirmations")
    event: Mapped["EventsModel"] = relationship(back_populates="confirmation")