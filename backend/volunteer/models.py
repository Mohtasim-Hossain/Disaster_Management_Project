
from django.db import models
from django.conf import settings

class Volunteer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(null=True, blank=True)
    skills = models.TextField(blank=True)
    is_availabile = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    assigned_task = models.CharField(max_length=200, blank=True, null=True)
    assigned_location = models.CharField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username} ({'Verified' if self.is_verified else 'Unverified'})"





# # permissions.py
# from rest_framework import permissions

# class IsAdminOrReadOnly(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return request.user and request.user.is_staff

