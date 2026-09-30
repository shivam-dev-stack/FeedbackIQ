import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AnalysisRun(Base):
    __tablename__ = "analysis_runs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    document_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("documents.id", ondelete="CASCADE"),
    )

    requested_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
    )

    run_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="document",
    )

    model_provider: Mapped[str | None] = mapped_column(
        String(50),
    )

    model_name: Mapped[str | None] = mapped_column(
        String(100),
    )

    prompt_version: Mapped[str | None] = mapped_column(
        String(50),
    )

    total_records: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    processed_records: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    failed_records: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="queued",
    )

    error_message: Mapped[str | None] = mapped_column(
        Text,
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

    __table_args__ = (
        Index("idx_analysis_runs_project_id", "project_id"),
        Index("idx_analysis_runs_document_id", "document_id"),
        Index("idx_analysis_runs_status", "status"),
    )