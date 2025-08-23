from django.urls import path, include

urlpatterns = [
    path("notebooks/", include("note_taking.routes.notebook_urls"))
]