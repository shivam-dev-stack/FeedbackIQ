from unittest import result

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.core.database import get_db
from sqlalchemy import select
from app.models.organisation_member import OrganizationMember
from app.models.project import Project
from uuid import UUID
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate

from app.models.user import User

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)

@router.post("/", response_model=ProjectResponse)
async def create_project(
    data: ProjectCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
    select(User).where(
        User.auth_user_id == current_user.id
    )
)

    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Application user not found",
        )

    result = await db.execute(
    select(OrganizationMember).where(
        OrganizationMember.user_id == user.id
    )
)

    membership = result.scalar_one_or_none()
    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="User is not a member of any organization",
        )

    project = Project(
    organization_id=membership.organization_id,
    name=data.name,
    description=data.description,
    created_by=user.id,
    updated_by=user.id,
    )

    db.add(project)

    await db.commit()
    await db.refresh(project)

    return ProjectResponse(
    id=str(project.id),
    name=project.name,
    description=project.description,
                                    )

@router.get("/", response_model=list[ProjectResponse])
async def get_projects(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.auth_user_id == current_user.id
        )
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Application user not found",
        )

    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id
        )
    )

    membership = result.scalar_one_or_none()

    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="User is not a member of any organization",
        )

    result = await db.execute(
        select(Project).where(
            Project.organization_id == membership.organization_id
        )
    )

    projects = result.scalars().all()

    return [
        ProjectResponse(
            id=str(project.id),
            name=project.name,
            description=project.description,
        )
        for project in projects
    ]


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.auth_user_id == current_user.id
        )
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Application user not found",
        )

    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id
        )
    )

    membership = result.scalar_one_or_none()

    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="User is not a member of any organization",
        )

    result = await db.execute(
        select(Project).where(
            Project.id == project_id,
            Project.organization_id == membership.organization_id,
        )
    )

    project = result.scalar_one_or_none()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return ProjectResponse(
        id=str(project.id),
        name=project.name,
        description=project.description,
    )


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: UUID,
    data: ProjectUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.auth_user_id == current_user.id
        )
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Application user not found",
        )

    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id
        )
    )

    membership = result.scalar_one_or_none()

    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="User is not a member of any organization",
        )

    result = await db.execute(
        select(Project).where(
            Project.id == project_id,
            Project.organization_id == membership.organization_id,
        )
    )

    project = result.scalar_one_or_none()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    if data.name is not None:
        project.name = data.name

    if data.description is not None:
        project.description = data.description

    await db.commit()
    await db.refresh(project)

    return ProjectResponse(
        id=str(project.id),
        name=project.name,
        description=project.description,
    )


@router.delete("/{project_id}")
async def delete_project(
    project_id: UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(
            User.auth_user_id == current_user.id
        )
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Application user not found",
        )

    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id
        )
    )

    membership = result.scalar_one_or_none()

    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="User is not a member of any organization",
        )

    result = await db.execute(
        select(Project).where(
            Project.id == project_id,
            Project.organization_id == membership.organization_id,
        )
    )

    project = result.scalar_one_or_none()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    await db.delete(project)
    await db.commit()

    return {
        "message": "Project deleted successfully"
    }