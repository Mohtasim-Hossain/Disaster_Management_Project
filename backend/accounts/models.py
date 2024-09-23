from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Defining user types using TextChoices for better readability and validation
    class UserType(models.TextChoices):
        VOLUNTEER = 'VOLUNTEER', 'Volunteer'  # Option for volunteer users
        ADMIN = 'ADMIN', 'Admin'              # Option for admin users

    # Field to store the type of user (Volunteer or Admin)
    user_type = models.CharField(
        max_length=20,                       # Maximum length of the user type
        choices=UserType.choices,            # Set choices from the UserType class
        default=UserType.VOLUNTEER,         # Default value is 'VOLUNTEER'
    )
    
    # Optional field for storing a phone number
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # String representation of the user instance
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"  # Display username and user type

    # Property to check if the user is a volunteer
    @property
    def is_volunteer(self):
        return self.user_type == self.UserType.VOLUNTEER

    # Property to check if the user is an admin
    @property
    def is_app_admin(self):
        return self.user_type == self.UserType.ADMIN
