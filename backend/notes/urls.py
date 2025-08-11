from django.urls import path
from .views import CreateNotebookEndpoint, FetchNotebooksEndpoint

urlpatterns = [
    path("notebooks/", FetchNotebooksEndpoint.as_view(), name="fetch_notebooks"),
    path("notebook/create/", CreateNotebookEndpoint.as_view(), name="create_notebook")
]