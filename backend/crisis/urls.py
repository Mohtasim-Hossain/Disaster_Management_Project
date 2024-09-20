from django.urls import path
from .views import CrisisCreateView, CrisisListView, CrisisDetailView

urlpatterns = [
    path('', CrisisListView.as_view(), name='crisis-list'),  # Shows all visible crises
    path('create/', CrisisCreateView.as_view(), name='crisis-create'),  # Endpoint to create crisis
    path('<int:pk>/', CrisisDetailView.as_view(), name='crisis-detail'),
    # path('approve/<int:pk>/', CrisisApproveView.as_view(), name='crisis-approve'),  # Admin approval for crises
    # path('test-anonymous/', TestAnonymousView.as_view(), name='test-anonymous'),  # New test endpoint
]
