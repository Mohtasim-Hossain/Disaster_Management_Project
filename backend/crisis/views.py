from rest_framework.response import Response
from rest_framework.permissions import  AllowAny
from rest_framework import generics, permissions, filters, status
from rest_framework.exceptions import PermissionDenied
from .models import Crisis
from .serializers import CrisisSerializer, CrisisDetailSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class TestAnonymousView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        return Response({"message": "Anonymous access is working!"})


class CrisisCreateView(generics.CreateAPIView):
    serializer_class = CrisisSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to create a crisis

    def perform_create(self, serializer):
        # Determine the submitted_by value
        submitted_by = self.request.user.username if self.request.user.is_authenticated else self.request.data.get('submitted_by', "Anonymous")
        
        crisis = serializer.save(submitted_by=submitted_by)
        crisis.is_visible = False  # Initially set to not visible
        crisis.save()

class CrisisListView(generics.ListAPIView):
    queryset = Crisis.objects.filter(is_visible=True)  # Show only approved crises
    serializer_class = CrisisSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view the crises
    filter_backends = [filters.OrderingFilter]  
    ordering_fields = ['created_at', 'severity', 'status']  

class AdminCrisisListView(generics.ListAPIView):
    queryset = Crisis.objects.all()  # Show all crises
    serializer_class = CrisisSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view the crises
    filter_backends = [filters.OrderingFilter]  
    ordering_fields = ['created_at', 'severity', 'status']  


class CrisisDetailView(generics.RetrieveAPIView):
    queryset = Crisis.objects.filter(is_visible=True)  # Only allow visible (approved) crises to be detailed
    serializer_class = CrisisDetailSerializer  # Use the detailed serializer
    permission_classes = [permissions.AllowAny]


