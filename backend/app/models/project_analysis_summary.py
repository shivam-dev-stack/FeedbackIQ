import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, JSON, Numeric, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ProjectAnalysisSummary(Base):
    __tablename__ = "project_analysis_summaries"

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

    analysis_run_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("analysis_runs.id", ondelete="CASCADE"),
        nullable=False,
    )

    total_feedback: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    positive_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    negative_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    neutral_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    mixed_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    average_rating: Mapped[float | None] = mapped_column(
        Numeric(4, 2),
    )

    sentiment_distribution: Mapped[dict] = mapped_column(
        JSON,
        nullable=False,
        default=dict,
    )

    top_topics: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    common_positives: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    common_negatives: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    improvement_suggestions: Mapped[list] = mapped_column(
        JSON,
        nullable=False,
        default=list,
    )

    executive_summary: Mapped[str | None] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )