from django.urls import path
from .views import DonationPageView,  ExpenseCreateView

urlpatterns = [
    path('', DonationPageView.as_view(), name='donation-page'),
]