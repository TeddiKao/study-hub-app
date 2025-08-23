from django.urls import path, include

urlpatterns = [
    path("notebooks/", include("note_taking.urls.notebook_urls"))
]