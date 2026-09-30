import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func, Index, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class RecommendationEvidence(Base):
    __tablename__ = "recommendation_evidence"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=func.gen_random_uuid(),
    )

    recommendation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("recommendations.id", ondelete="CASCADE"),
        nullable=False,
    )

    feedback_record_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("feedback_records.id", ondelete="CASCADE"),
        nullable=False,
    )

    feedback_analysis_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("feedback_analyses.id", ondelete="SET NULL"),
    )

    evidence_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    relevance_score: Mapped[float | None] = mapped_column(
        Numeric(5, 4),
    )

    rationale: Mapped[str | None] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    __table_args__ = (
        UniqueConstraint(
            "recommendation_id",
            "feedback_record_id",
            name="recommendation_evidence_recommendation_id_feedback_record_i_key",
        ),
        Index(
            "idx_recommendation_evidence_recommendation_id",
            "recommendation_id",
        ),
        Index(
            "idx_recommendation_evidence_feedback_record_id",
            "feedback_record_id",
        ),
        Index(
            "idx_recommendation_evidence_analysis_id",
            "feedback_analysis_id",
        ),
    )