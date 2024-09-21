# from rest_framework import generics, permissions
# from rest_framework.response import Response
# from rest_framework_simplejwt.views import TokenObtainPairView
# from .models import User
# from .serializers import UserSerializer, UserUpdateSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = UserSerializer

# class LoginView(TokenObtainPairView):
#     permission_classes = (permissions.AllowAny,)

# class ProfileView(generics.RetrieveUpdateAPIView):
#     serializer_class = UserUpdateSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self):
#         return self.request.user
    
#-------------------------------------------------------------------



# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework_simplejwt.views import TokenObtainPairView
# from .models import User
# from .serializers import UserSerializer, UserUpdateSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = UserSerializer

#     def perform_create(self, serializer):
#         serializer.save(is_volunteer=True)

# class LoginView(TokenObtainPairView):
#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         if response.status_code == status.HTTP_200_OK:
#             user = User.objects.get(username=request.data['username'])
#             response.data['is_volunteer'] = user.is_volunteer
#         return response
    
# # class LoginView(TokenObtainPairView):
# #     def post(self, request, *args, **kwargs):
# #         response = super().post(request, *args, **kwargs)
# #         if response.status_code == 200:
# #             user = User.objects.get(username=request.data['username'])
# #             response.data['is_volunteer'] = user.is_volunteer
# #         return response

# class ProfileView(generics.RetrieveUpdateAPIView):
#     serializer_class = UserUpdateSerializer
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self):
#         return self.request.user
    


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer
from django.db import transaction
from volunteer.models import Volunteer


class IsAppAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_app_admin

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    @transaction.atomic
    def perform_create(self, serializer):
        user = serializer.save(user_type=User.UserType.VOLUNTEER)  # Save the user as a volunteer directly
        # Automatically create a corresponding Volunteer entry since only volunteers can register
        Volunteer.objects.create(user=user)


class LoginView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(username=request.data['username'])
            response.data['user_type'] = user.user_type
            response.data['redirect_url'] = '/admin-dashboard' if user.is_app_admin else '/volunteer-dashboard'
        return response

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class CreateAppAdminView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAppAdmin,)
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(user_type=User.UserType.ADMIN)

class VolunteerDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.is_volunteer:
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)
        # Add volunteer-specific dashboard logic here
        return Response({"message": "Welcome to the Volunteer Dashboard"})

class AdminDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.is_app_admin:
            return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)
        # Add admin-specific dashboard logic here
        return Response({"message": "Welcome to the Admin Dashboard"})