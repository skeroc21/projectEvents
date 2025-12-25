from app.repositories.events import EventRepository
from app.schemes.events import SEventAdd, SEventGet
from app.services.base import BaseService


class EventService(BaseService):
    async def add_event(self, event_data: SEventAdd):
        event = await self.db.events.add(event_data)
        await self.db.commit()
        return event
    
    async def get_all_events(self):
        events = await self.db.events.get_all()
        return events
    
    async def get_event(self, event_id: int):
       
        event = await self.db.events.get_one_or_none(id=event_id)
        return event
    
    async def update_event(self, event_id: int, event_data: SEventAdd):

       await self.db.events.edit(event_data, exclude_unset=True, id=event_id)
       await self.db.commit()
    
    async def delete_event(self, event_id: int):
      
        await self.db.events.delete(id=event_id)
        await self.db.commit()