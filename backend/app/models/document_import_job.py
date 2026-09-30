import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class DocumentImportJob(Base):
    __tablename__ = "document_import_jobs"

    __table_args__ = (
        Index("idx_import_jobs_document_id", "document_id"),
        Index("idx_import_jobs_status", "status"),
    )

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

    requested_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="queued",
    )

    total_rows: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    imported_rows: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    skipped_rows: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    failed_rows: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    error_details: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )

    attempts: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )