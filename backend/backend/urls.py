# from django.contrib import admin
# from django.urls import path, include
# # from api.views import CreateUserView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/accounts/', include('accounts.urls')),
#     path("api/token/", TokenObtainPairView.as_view(), name = "get_token"),
#     path("api/token/refresh/", TokenRefreshView.as_view(), name = "refresh"),
#     path("api-auth/", include("rest_framework.urls")),
#     path('api/auth/', include('api.urls')),
#     # path("api/", include("api.urls")),
# ]


from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.views import RegisterView, LoginView, ProfileView, VolunteerDashboardView, AdminDashboardView
from rest_framework_simplejwt.views import TokenRefreshView

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_type(request):
    return Response({'is_volunteer': request.user.is_volunteer})


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('volunteer-dashboard/', VolunteerDashboardView.as_view(), name='volunteer_dashboard'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('admin/', include('admin_panel.urls')),
    path('crisis/', include('crisis.urls')),
    path('donation/', include('donation.urls')),
    path('volunteer/', include('volunteer.urls')),  # Only if 
    
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
