from fastapi import APIRouter

from app.api.dependencies import DBDep
from app.schemes.events import SEventAdd, SEventGet
from app.services.events import EventService

router = APIRouter(prefix="/events", tags=["Управление событиями"])


@router.post("/", summary="Создание нового события")
async def create_new_events(
    event_data: SEventAdd,
    db: DBDep,
) -> dict[str, str]:
    await EventService(db).add_event(event_data)
    return {"status": "OK"}


@router.get("/", summary="Получение списка событий")
async def get_all_events(
    db: DBDep,
) -> list[SEventGet]:
    events = await EventService(db).get_all_events()
    return events


@router.get("/{id}", summary="Получение конкретного события")
async def get_event(
    db: DBDep,
    id: int,
) -> SEventGet | None:
    event = await EventService(db).get_event(id)
    return event


@router.put("/{id}", summary="Изменение конкретного события")
async def update_event(
    db: DBDep,
    event_data: SEventAdd,
    id: int,
) -> dict[str, str]:
    await EventService(db).update_event(id, event_data)
    return {"status": "OK"}


@router.delete("/{id}", summary="Удаление конкретного события")
async def delete_event(
    db: DBDep,
    id: int,
) -> dict[str, str]:
    await EventService(db).delete_event(id)
    return {"status": "OK"}