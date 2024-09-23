from django.urls import path
from .views import VolunteerPersonalUpdateView, VolunteerListView, VolunteerDetailView

urlpatterns = [
    path('', VolunteerListView.as_view(), name='volunteer-list'),  # Endpoint to list all volunteers
    path('<int:pk>/', VolunteerDetailView.as_view(), name='volunteer-detail'),  # Retrieve details of a specific volunteer by ID
    path('accounts/', VolunteerPersonalUpdateView.as_view(), name='volunteer-personal-update'),  # Endpoint for volunteers to update their personal information
]
