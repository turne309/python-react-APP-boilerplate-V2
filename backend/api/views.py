from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


# Here are the views

# POST to the note list
class NoteListCreate(generics.ListCreateAPIView):
  serializer_class = NoteSerializer
  # The below line only allows a user to create a note if they are first authenticated
  permission_classes = [IsAuthenticated]
  # permission_classes = [AllowAny] - USE THIS IF YOU DON'T WANT TO PROTECT THE ROUTE

  def get_queryset(self):
    # This will return all of the notes writen by the authenticated user
    user = self.request.user
    return Note.objects.filter(author = user)
  
  def perform_create(self, serializer):
    # If the serializer passed all of the checks, save the serializer
    if serializer.is_valid():
      serializer.save(author = self.request.user)
    else:
      print(serializer.errors)


# DELETE a note from the note list
class NoteDelete(generics.DestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
      user = self.request.user
      return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
  # Query to find all users so we don't create a user that already exists
  queryset = User.objects.all()
  # Serializer class that tells this view what kind of data we need to make a user (in this case username & password)
  serializer_class = UserSerializer
  # Anyone can use this view to create a user even if they are not authenticated
  permission_classes = [AllowAny]