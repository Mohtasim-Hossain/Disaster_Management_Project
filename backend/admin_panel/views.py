from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from crisis.models import Crisis
from volunteer.models import Volunteer
from crisis.serializers import CrisisSerializer, CrisisUpdateSerializer
from volunteer.serializers import AdminVolunteerUpdateSerializer

class CrisisAdminUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Crisis.objects.all()

    def get_serializer_class(self):
        # Use CrisisUpdateSerializer for PUT/PATCH methods
        if self.request.method in ['PUT', 'PATCH']:
            return CrisisUpdateSerializer
        # Use CrisisSerializer for GET method
        return CrisisSerializer

    def update(self, request, *args, **kwargs):
        # Check if user is authenticated and an admin
        if not request.user.is_authenticated or not request.user.is_app_admin:
            raise PermissionDenied("You do not have permission to perform this action.")

        # Get the crisis object to update
        crisis = self.get_object()

        # Optionally, make the crisis visible (approved)
        is_approving = request.data.get('is_visible', None)
        if is_approving is not None:
            crisis.is_visible = is_approving

        # Save the changes
        crisis.save()

        # Print the user type for debugging purposes
        # print(request.user.user_type)  # 

        # Return the updated crisis object using the appropriate serializer
        return Response(self.get_serializer(crisis).data, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        # The standard GET method to retrieve the crisis details
        return self.retrieve(request, *args, **kwargs)
    

class VolunteerAdminUpdateView(generics.UpdateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = AdminVolunteerUpdateSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_app_admin:
            raise PermissionDenied("You do not have permission to perform this action.")
        
        volunteer = self.get_object()
        serializer = self.get_serializer(volunteer, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
