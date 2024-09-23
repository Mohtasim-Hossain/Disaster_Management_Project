from django.urls import path
from .views import CrisisCreateView, CrisisListView, CrisisDetailView

urlpatterns = [
    path('', CrisisListView.as_view(), name='crisis-list'),  # Shows all visible crises
    path('report/', CrisisCreateView.as_view(), name='crisis-create'),  # Endpoint to create a new crisis
    path('<int:pk>/', CrisisDetailView.as_view(), name='crisis-detail'),  # Endpoint to view details of a specific crisis by ID
]
