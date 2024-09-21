from django.urls import path
from .views import DonationPageView,  ExpenseCreateView

urlpatterns = [
    path('', DonationPageView.as_view(), name='donation-page'),
    # path('new/', DonationCreateView.as_view(), name='donation-create'),
    # path('expense/create/', ExpenseCreateView.as_view(), name='expense-create'),
]