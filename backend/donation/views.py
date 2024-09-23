from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.db.models import Sum
from django.db.models.functions import TruncDate
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Donation, Expense
from .serializers import DonationSerializer, ExpenseSerializer

class DonationPageView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def get(self, request):
        # Calculate total donations
        total_donations = Donation.objects.aggregate(total=Sum('amount'))['total'] or 0
        
        # Get daily total donations, grouped by date
        donations = Donation.objects.annotate(date=TruncDate('created_at')).values('date').annotate(
            total=Sum('amount')
        ).order_by('date')
        
        # Get daily total expenses, grouped by date
        expenses = Expense.objects.values('date').annotate(
            total=Sum('amount')
        ).order_by('date')
        
        # Prepare chart data for front-end visualization
        chart_data = {
            'donations': list(donations),
            'expenses': list(expenses)
        }
        
        # Retrieve all donations and serialize them
        all_donations = Donation.objects.all().order_by('-created_at')
        donation_serializer = DonationSerializer(all_donations, many=True)

        # Return total donations, chart data, and serialized donation list
        return Response({
            'total_donations': total_donations,
            'chart_data': chart_data,
            'all_donations': donation_serializer.data  # Include serialized donation data
        })

    def post(self, request):
        # Handle donation form submission
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new donation
            
            # Send real-time donation update to WebSocket group
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "donations",
                {
                    "type": "donation_message",  # Type of message to send
                }
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return created donation data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return errors if invalid

class ExpenseCreateView(generics.CreateAPIView):
    queryset = Expense.objects.all()  # Retrieve all expenses
    serializer_class = ExpenseSerializer  # Use ExpenseSerializer for serialization
