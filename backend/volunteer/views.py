from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Volunteer
from .serializers import VolunteerListSerializer, VolunteerDetailSerializer, AdminVolunteerUpdateSerializer, VolunteerPersonalUpdateSerializer

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()  # Retrieve all volunteer records
    serializer_class = VolunteerListSerializer  # Use the list serializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view

class VolunteerDetailView(generics.RetrieveAPIView):
    queryset = Volunteer.objects.all()  # Retrieve all volunteer records
    serializer_class = VolunteerDetailSerializer  # Use the detailed serializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view

class VolunteerPersonalUpdateView(generics.UpdateAPIView):
    serializer_class = VolunteerPersonalUpdateSerializer  # Use the personal update serializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can update their information

    def get_object(self):
        return self.request.user.volunteer  # Get the volunteer instance associated with the authenticated user

    def update(self, request, *args, **kwargs):
        volunteer = self.get_object()  # Retrieve the volunteer instance
        serializer = self.get_serializer(volunteer, data=request.data, partial=True)  # Create serializer with new data
        serializer.is_valid(raise_exception=True)  # Validate the data
        self.perform_update(serializer)  # Save the updated volunteer information
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return the updated data in the response
