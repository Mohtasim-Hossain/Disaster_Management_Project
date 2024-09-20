# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class User(AbstractUser):
#     is_volunteer = models.BooleanField(default=True)
#     is_app_admin = models.BooleanField(default=False)
#     phone_number = models.CharField(max_length=15, blank=True, null=True)

#     def __str__(self):
#         return self.username
    


from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class UserType(models.TextChoices):
        VOLUNTEER = 'VOLUNTEER', 'Volunteer'
        ADMIN = 'ADMIN', 'Admin'
        # You can easily add more user types here in the future

    user_type = models.CharField(
        max_length=20,
        choices=UserType.choices,
        default=UserType.VOLUNTEER,
    )
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    @property
    def is_volunteer(self):
        return self.user_type == self.UserType.VOLUNTEER

    @property
    def is_app_admin(self):
        return self.user_type == self.UserType.ADMIN
    

    # python3 manage.py create_app_admin admin1 admin1@gmail.com adminpass

    # {
    # "username": "new_volunteer",
    # "password": "secure_password123"
    # }
