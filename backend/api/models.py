from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
  # A title field of the character type with a max length of 100
  title = models.CharField(max_length=100)
  # content that is of a textfield type
  content = models.TextField()
  # CreatedAt field with current system time
  created_at = models.DateTimeField(auto_now_add=True)
  # Author field with a foreign key that is linked to the User Model. The 'on_delete' part means when the user is deleted, all of their notes should also be deleted
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

  def __str__(self):
    return self.title

