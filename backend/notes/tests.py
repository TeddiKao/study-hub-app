from django.test import TestCase
from .models import Notebook
from django.contrib.auth import get_user_model
from django.db import IntegrityError

# Create your tests here.
class NotebooksTestCase(TestCase):
    def setUp(self):
        user = get_user_model()
        
        self.user1 = user.objects.create(email="user1@gmail.com", username="user1", password="test")
        self.user2 = user.objects.create(email="user2@gmail.com", username="user2", password="test")

    def test_duplicate_notebook_per_owner(self):
        def create_notebooks():
            notebook1 = Notebook.objects.create(name="Notebook 1", description="Random description", owner=self.user1)
            notebook2 = Notebook.objects.create(name="Notebook 1", description="Another description", owner=self.user1)

        self.assertRaises(IntegrityError, create_notebooks)

    def test_duplicate_notebooks_for_different_owners(self):
        Notebook.objects.create(name="Notebook 1", description="Random description", owner=self.user1)
        Notebook.objects.create(name="Notebook 1", description="Another description", owner=self.user2)
            
        self.assertTrue(
            Notebook.objects.filter(name="Notebook 1", owner=self.user1).exists()
        )

        self.assertTrue(
            Notebook.objects.filter(name="Notebook 1", owner=self.user2).exists()
        )