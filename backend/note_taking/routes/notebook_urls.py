from django.urls import path
from ..views import *

urlpatterns = [
    path("", FetchNotebooksEndpoint.as_view(), name="fetch_notebooks"),
    path("notebook/create/", CreateNotebookEndpoint.as_view(), name="create_notebook"),
    path("notebook/<int:pk>/", RetrieveNotebookEndpoint.as_view(), name="retrieve_notebook"),
    path("notebook/<int:pk>/edit/", EditNotebookEndpoint.as_view(), name="edit_notebook"),
    path("notebook/<int:pk>/delete/", DeleteNotebookEndpoint.as_view(), name="delete_notebook"),
]