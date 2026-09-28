import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, func, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    auth_user_id: Mapped[uuid.UUID] = mapped_column(
    UUID(as_uuid=True),
    nullable=False,
    unique=True,
    )


    full_name: Mapped[str | None] = mapped_column(
        String(150),
    )

    avatar_url: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )