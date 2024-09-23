from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer
from django.db import transaction
from volunteer.models import Volunteer

# Custom permission to check if the user is an app admin
class IsAppAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_app_admin

# View for user registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  # Define the queryset
    permission_classes = (permissions.AllowAny,)  # Allow any user to access this view
    serializer_class = UserSerializer  # Specify the serializer to use

    @transaction.atomic  # Ensure that all database operations succeed or fail together
    def perform_create(self, serializer):
        # Save the user as a volunteer directly
        user = serializer.save(user_type=User.UserType.VOLUNTEER)
        # Automatically create a corresponding Volunteer entry since only volunteers can register
        Volunteer.objects.create(user=user)

# View for user login using JWT
class LoginView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)  # Allow any user to access this view

    def post(self, request, *args, **kwargs):
        # Call the parent class's post method to handle login
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            # If login is successful, add user type and redirect URL to the response
            user = User.objects.get(username=request.data['username'])
            response.data['user_type'] = user.user_type
            response.data['redirect_url'] = '/admin-dashboard' if user.is_app_admin else '/'
        return response

# View for retrieving and updating user profiles
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer  # Specify the serializer to use
    permission_classes = (permissions.IsAuthenticated,)  # Require authentication

    def get_object(self):
        return self.request.user  # Return the current user as the object

# View for creating a new admin user
class CreateAppAdminView(generics.CreateAPIView):
    queryset = User.objects.all()  # Define the queryset
    permission_classes = (IsAppAdmin,)  # Require admin permission
    serializer_class = UserSerializer  # Specify the serializer to use

    def perform_create(self, serializer):
        # Save the user as an admin
        serializer.save(user_type=User.UserType.ADMIN)

# View for the volunteer dashboard
class VolunteerDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]  # Require authentication

    def get(self, request):
        if not request.user.is_volunteer:
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)
        # Add volunteer-specific dashboard logic here
        return Response({"message": "Welcome to the Volunteer Dashboard"})

# View for the admin dashboard
class AdminDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]  # Require authentication

    def get(self, request):
        if not request.user.is_app_admin:
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)
        # Add admin-specific dashboard logic here
        return Response({"message": "Welcome to the Admin Dashboard"})
