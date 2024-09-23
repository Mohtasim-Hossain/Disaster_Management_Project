from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specify the User model to be serialized
        fields = ['id', 'username', 'email', 'password']  # Fields to include in the serialized output
        extra_kwargs = {
            'password': {'write_only': True}  # Password field is write-only
        }

    def create(self, validated_data):
        # Create a new user using the validated data
        user = User.objects.create_user(**validated_data)  # Uses the create_user method to hash the password
        return user  # Return the created user instance

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specify the User model for updates
        fields = ['username', 'email', 'phone_number']  # Fields that can be updated
