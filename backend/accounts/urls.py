from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    ProfileView, 
    CreateAppAdminView, 
    VolunteerDashboardView, 
    AdminDashboardView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('create-admin/', CreateAppAdminView.as_view(), name='create_admin'),
    path('volunteer-dashboard/', VolunteerDashboardView.as_view(), name='volunteer_dashboard'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
]