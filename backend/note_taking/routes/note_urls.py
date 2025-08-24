from django.urls import path
from ..views import FetchNotesEndpoint

urlpatterns = [
    path("", FetchNotesEndpoint.as_view(), name="fetch_notes")
]