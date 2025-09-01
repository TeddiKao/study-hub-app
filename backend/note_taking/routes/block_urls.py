from django.urls import path
from ..views import FetchBlocksEndpoint, CreateBlockEndpoint, EditBlockEndpoint, DeleteBlockEndpoint, RetrieveBlockEndpoint

urlpatterns = [
    path("", FetchBlocksEndpoint.as_view(), name="fetch_blocks"),
    path("block/create/", CreateBlockEndpoint.as_view(), name="create_block"),
    path("block/<int:pk>/", RetrieveBlockEndpoint.as_view(), name="retrieve_block"),
    path("block/<int:pk>/edit/", EditBlockEndpoint.as_view(), name="edit_block"),
    path("block/<int:pk>/delete/", DeleteBlockEndpoint.as_view(), name="delete_block"),
]