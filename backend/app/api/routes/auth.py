from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.auth import RegisterRequest
from app.core.supabase import supabase_admin
from app.core.database import get_db

from app.models.user import User
from app.models.organization import Organization
from app.models.organisation_member import OrganizationMember

import re


def generate_slug(name: str) -> str:
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        response = supabase_admin.auth.admin.create_user({
            "email": data.email,
            "password": data.password,
            "email_confirm": True,
        })

        auth_user = response.user

        user = User(
                auth_user_id=auth_user.id,
                full_name=data.owner_name,
            )
        
        db.add(user)
        await db.flush()

        organization = Organization(
            name=data.organization_name,
            slug=generate_slug(data.organization_name),
        )

        db.add(organization)
        await db.flush()

        membership = OrganizationMember(
            organization_id=organization.id,
            user_id=user.id,
            role="owner",
        )

        db.add(membership)

        await db.commit()

        return {
            "message": "User created successfully",
            "user_id": str(response.user.id),
        }

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )