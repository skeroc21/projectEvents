from app.models.events import EventModel
from app.schemes.events import SEventGet, SEventAdd
from app.repositories.base import BaseRepository


class EventRepository(BaseRepository):
    model = EventModel
    schema = SEventGet