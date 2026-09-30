import uuid
from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class FeedbackRecord(Base):
    __tablename__ = "feedback_records"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    document_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
    )

    row_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    external_id: Mapped[str | None] = mapped_column(
        String(255),
    )

    feedback_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    customer_id: Mapped[str | None] = mapped_column(
        String(255),
    )

    customer_name: Mapped[str | None] = mapped_column(
        String(255),
    )

    rating: Mapped[float | None] = mapped_column(
        Numeric(3, 2),
    )

    feedback_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    metadata_: Mapped[dict] = mapped_column(
        "metadata",
        JSONB,
        nullable=False,
        default=dict,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    
    __table_args__ = (
        UniqueConstraint(
            "document_id",
            "row_number",
            name="feedback_records_document_id_row_number_key",
        ),
        Index(
            "idx_feedback_records_document_id",
            "document_id",
        ),
        Index(
            "idx_feedback_records_external_id",
            "external_id",
        ),
    )