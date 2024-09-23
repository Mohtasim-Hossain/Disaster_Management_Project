from django.urls import path
from .views import CrisisAdminUpdateView, VolunteerAdminUpdateView, ReportView
from crisis.views import AdminCrisisListView
from volunteer.views import VolunteerListView

urlpatterns = [
    path('crisis/', AdminCrisisListView.as_view(), name='crisis-list'),  # List all visible crises for admins
    path('crisis/update/<int:pk>/', CrisisAdminUpdateView.as_view(), name='crisis-update'),  # Update a specific crisis by pk
    path('volunteer/', VolunteerListView.as_view(), name='volunteer-list'),  # List all volunteers
    path('volunteer/update/<int:pk>/', VolunteerAdminUpdateView.as_view(), name='volunteer-update'),  # Update a specific volunteer by pk
    path('reports/', ReportView.as_view(), name='admin-report'),  # Access the report view for admins
]
