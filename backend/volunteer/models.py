from django.db import models
from django.conf import settings

class Volunteer(models.Model):
    # Link the Volunteer model to the User model with a one-to-one relationship
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(null=True, blank=True)  # Age of the volunteer, optional field
    skills = models.TextField(blank=True)  # Skills of the volunteer, can be left blank
    is_availabile = models.BooleanField(default=True)  # Availability status of the volunteer
    is_verified = models.BooleanField(default=False)  # Verification status of the volunteer
    assigned_task = models.CharField(max_length=200, blank=True, null=True)  # Task assigned to the volunteer
    assigned_location = models.CharField(max_length=200, blank=True, null=True)  # Location assigned to the volunteer
    
    def __str__(self):
        # String representation of the Volunteer object, showing username and verification status
        return f"{self.user.username} ({'Verified' if self.is_verified else 'Unverified'})"
