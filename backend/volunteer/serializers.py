from rest_framework import serializers
from .models import Volunteer

class UserBaseSerializer(serializers.ModelSerializer):
    # Read-only fields for username and email sourced from the related User model
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        # Specify fields to include in the serializer
        fields = ['username', 'email']

class VolunteerBaseSerializer(UserBaseSerializer):
    class Meta(UserBaseSerializer.Meta):
        model = Volunteer  # Specify the model to serialize
        fields = ['id', 'username', 'email', 'age', 'skills', 'is_availabile', 'is_verified', 'assigned_task', 'assigned_location']

class VolunteerListSerializer(VolunteerBaseSerializer):
    class Meta(VolunteerBaseSerializer.Meta):
        # Override fields to limit data shown in the list view
        fields = ['id', 'username', 'email', 'age']  

class VolunteerDetailSerializer(VolunteerBaseSerializer):
    class Meta(VolunteerBaseSerializer.Meta):
        pass  # Use all fields defined in VolunteerBaseSerializer for detail view

class AdminVolunteerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer  # Specify the model to update
        fields = ['is_verified', 'assigned_task', 'assigned_location']  # Fields that can be updated by admin

class VolunteerPersonalUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer  # Specify the model to update
        fields = ['age', 'skills', 'is_availabile']  # Fields that can be updated by the volunteer themselves
