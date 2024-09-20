from rest_framework import serializers
from .models import Volunteer

class UserBaseSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        fields = ['username', 'email']

class VolunteerBaseSerializer(UserBaseSerializer):
    class Meta(UserBaseSerializer.Meta):
        model = Volunteer
        fields = ['id', 'username', 'email', 'age', 'skills', 'is_availabile', 'is_verified', 'assigned_task', 'assigned_location']

class VolunteerListSerializer(VolunteerBaseSerializer):
    class Meta(VolunteerBaseSerializer.Meta):
        fields = ['id', 'username', 'email', 'age']  # Override fields to limit data shown in the list view

class VolunteerDetailSerializer(VolunteerBaseSerializer):
    class Meta(VolunteerBaseSerializer.Meta):
        pass  # Use all fields defined in VolunteerBaseSerializer

class AdminVolunteerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['is_verified', 'assigned_task', 'assigned_location']

class VolunteerPersonalUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['age', 'skills', 'is_availabile']
