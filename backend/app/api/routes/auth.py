from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import get_access_token
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
            "status": "201",
            "success": True,
            "message": "User created successfully",
            "user_id": str(response.user.id),
        }

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

@router.post("/login")
async def login(data: LoginRequest):
    try:
        response = supabase_admin.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password,
        })

        if response.session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        return {
            "status": "200",
            "success": True,
            "message": "Login successful",
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
            "token_type": "bearer",
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

@router.post("/logout")
async def logout(token: str = Depends(get_access_token)):
    try:
        supabase_admin.auth.admin.sign_out(token)

        return {
            "message": "Logout successful"
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Logout failed",
        )