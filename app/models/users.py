from typing import TYPE_CHECKING, Optional

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base

if TYPE_CHECKING:
    from app.models.roles import RoleModel
    from app.models.confirm_events import ConfirmEventModel


class UserModel(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(300), nullable=False)
    image_url: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)
    role: Mapped["RoleModel"] = relationship(back_populates="users")
    # confirmations: Mapped[list["ConfirmEventModel"]] = relationship(back_populates="user", cascade="all, delete-orphan")
