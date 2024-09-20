from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Volunteer
from .serializers import VolunteerListSerializer, VolunteerDetailSerializer, AdminVolunteerUpdateSerializer, VolunteerPersonalUpdateSerializer

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerListSerializer  # Use the list serializer
    permission_classes = [permissions.AllowAny]

class VolunteerDetailView(generics.RetrieveAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerDetailSerializer  # Use the detailed serializer
    permission_classes = [permissions.AllowAny]


# class AdminVolunteerUpdateView(generics.UpdateAPIView):
#     queryset = Volunteer.objects.all()
#     serializer_class = AdminVolunteerUpdateSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def update(self, request, *args, **kwargs):
#         if not request.user.is_authenticated or not request.user.is_app_admin:
#             raise PermissionDenied("You do not have permission to perform this action.")
#         volunteer = self.get_object()
#         serializer = self.get_serializer(volunteer, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class VolunteerPersonalUpdateView(generics.UpdateAPIView):
    serializer_class = VolunteerPersonalUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.volunteer

    def update(self, request, *args, **kwargs):
        volunteer = self.get_object()
        serializer = self.get_serializer(volunteer, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
