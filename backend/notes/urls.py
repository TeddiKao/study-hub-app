from django.urls import path
from .views import CreateNotebookEndpoint

urlpatterns = [
    path("notebook/create/", CreateNotebookEndpoint.as_view(), name="create_notebook")
]