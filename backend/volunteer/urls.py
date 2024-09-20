from django.urls import path
from .views import AdminVolunteerUpdateView, VolunteerPersonalUpdateView, VolunteerListView, VolunteerDetailView

urlpatterns = [
    path('', VolunteerListView.as_view(), name='volunteer-list'),
    path('<int:pk>/', VolunteerDetailView.as_view(), name='volunteer-detail'),
    path('update/<int:pk>/', AdminVolunteerUpdateView.as_view(), name='admin-volunteer-update'),
    path('update/', VolunteerPersonalUpdateView.as_view(), name='volunteer-personal-update'),
]