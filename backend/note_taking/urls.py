from django.urls import path, include

urlpatterns = [
    path("notebooks/", include("note_taking.routes.notebook_urls")),
    path("notes/", include("note_taking.routes.note_urls"))
]