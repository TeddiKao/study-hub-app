from django.urls import path
from ..views import FetchNotesEndpoint, CreateNoteEndpoint, DeleteNoteEndpoint

urlpatterns = [
    path("", FetchNotesEndpoint.as_view(), name="fetch_notes"),
    path("note/create/", CreateNoteEndpoint.as_view(), name="create_note"),
    path("note/<int:pk>/delete/", DeleteNoteEndpoint.as_view(), name="delete_note")
]