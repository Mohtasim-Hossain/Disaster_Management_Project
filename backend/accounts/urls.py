from django.urls import path
from .views import (
    RegisterView,         # View for user registration
    LoginView,            # View for user login
    ProfileView,          # View for retrieving/updating user profile
    CreateAppAdminView,   # View for creating a new admin user
    VolunteerDashboardView, # View for the volunteer dashboard
    AdminDashboardView     # View for the admin dashboard
)
from rest_framework_simplejwt.views import TokenRefreshView  # View for refreshing JWT tokens

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # URL for user registration
    path('login/', LoginView.as_view(), name='login'),          # URL for user login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # URL for refreshing JWT token
    path('profile/', ProfileView.as_view(), name='profile'),    # URL for user profile management
    path('create-admin/', CreateAppAdminView.as_view(), name='create_admin'),  # URL for creating admin users
    path('volunteer-dashboard/', VolunteerDashboardView.as_view(), name='volunteer_dashboard'),  # URL for volunteer dashboard
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),  # URL for admin dashboard
]
