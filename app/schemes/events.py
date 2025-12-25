from pydantic import BaseModel
class SEventCreate(BaseModel):
   name: str
   description: str
   location: str
   event_date: str 
class SEvent(SEventCreate):
   id: int
   owner_id: int