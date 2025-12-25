from typing import TYPE_CHECKING, Optional

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base

if TYPE_CHECKING:
    from app.models.confirm_events import ConfirmEventModel

class EventModel(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    organizer: Mapped[str] = mapped_column(String(255), nullable=False)
    confirm_id: Mapped[Optional[int]] = mapped_column(ForeignKey("confirm_events.id"))

    confirmation: Mapped[Optional["ConfirmEventModel"]] = relationship(back_populates="event")