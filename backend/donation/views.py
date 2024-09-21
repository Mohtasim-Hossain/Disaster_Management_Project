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
    permission_classes = [AllowAny]
    def get(self, request):
        total_donations = Donation.objects.aggregate(total=Sum('amount'))['total'] or 0
        
        donations = Donation.objects.annotate(date=TruncDate('created_at')).values('date').annotate(
            total=Sum('amount')
        ).order_by('date')
        
        expenses = Expense.objects.values('date').annotate(
            total=Sum('amount')
        ).order_by('date')
        
        chart_data = {
            'donations': list(donations),
            'expenses': list(expenses)
        }
        
        return Response({
            'total_donations': total_donations,
            'chart_data': chart_data
        })

    def post(self, request):
        # Handle donation form submission
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # Send real-time donation update
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "donations",
                {
                    "type": "donation_message",
                }
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseCreateView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer




