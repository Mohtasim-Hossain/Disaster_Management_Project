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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_type(request):
    return Response({'is_volunteer': request.user.is_volunteer})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/accounts/', include('accounts.urls')),
    path('home/crisis/', include('crisis.urls')),
    path('home/donation/', include('donation.urls')),
    # path('api/inventory/', include('inventory.urls')),
    path('home/volunteer/', include('volunteer.urls')),
    # path('api/admin/', include('admin_management.urls')),
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
