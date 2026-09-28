import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, JSON, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class FeedbackAnalysis(Base):
    __tablename__ = "feedback_analyses"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    feedback_record_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("feedback_records.id", ondelete="CASCADE"),
        nullable=False,
    )

    analysis_run_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("analysis_runs.id", ondelete="CASCADE"),
        nullable=False,
    )

    sentiment: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    sentiment_score: Mapped[float | None] = mapped_column(
        Numeric(5, 4),
    )

    topics: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    positives: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    negatives: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    improvements: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    suggestions: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    summary: Mapped[str | None] = mapped_column(
        Text,
    )

    raw_output: Mapped[dict | None] = mapped_column(
        JSON,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )