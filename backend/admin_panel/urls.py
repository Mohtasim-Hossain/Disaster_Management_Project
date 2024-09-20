from django.urls import path
from .views import CrisisAdminUpdateView, VolunteerAdminUpdateView
from crisis.views import CrisisListView
from volunteer.views import VolunteerListView

urlpatterns = [
    path('crisis/', CrisisListView.as_view(), name='crisis-list'),  # Shows all visible crises
    path('crisis/update/<int:pk>/', CrisisAdminUpdateView.as_view(), name='crisis-update-update'),
    path('volunteer/', VolunteerListView.as_view(), name='volunteer-list'),  # Shows all visible crises
    path('volunteer/update/<int:pk>/', VolunteerAdminUpdateView.as_view(), name='volunteer-update-update'),
    
]
