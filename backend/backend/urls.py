from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.views import RegisterView, LoginView, ProfileView, VolunteerDashboardView, AdminDashboardView
from rest_framework_simplejwt.views import TokenRefreshView

# API view to check the user's type (volunteer or admin)
@api_view(['GET'])  # Allow only GET requests
@permission_classes([IsAuthenticated])  # Require authentication
def check_user_type(request):
    return Response({'is_volunteer': request.user.is_volunteer})  # Return user type

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Path for user login
    path('register/', RegisterView.as_view(), name='register'),  # Path for user registration
    path('profile/', ProfileView.as_view(), name='profile'),  # Path for user profile
    path('volunteer-dashboard/', VolunteerDashboardView.as_view(), name='volunteer_dashboard'),  # Path for volunteer dashboard
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),  # Path for admin dashboard
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Path for token refresh using JWT
    
    # Include other app URLs
    path('admin/', include('admin_panel.urls')),  # Admin panel URLs
    path('crisis/', include('crisis.urls')),  # Crisis-related URLs
    path('donation/', include('donation.urls')),  # Donation-related URLs
    path('volunteer/', include('volunteer.urls')),  # Volunteer-related URLs
]

# Serve media files in development
if settings.DEBUG:  # Check if in development mode
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Serve media files
