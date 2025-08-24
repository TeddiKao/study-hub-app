from django.urls import path
from ..views import FetchNotesEndpoint, CreateNoteEndpoint

urlpatterns = [
    path("", FetchNotesEndpoint.as_view(), name="fetch_notes"),
    path("note/create/", CreateNoteEndpoint.as_view(), name="create_note")
]