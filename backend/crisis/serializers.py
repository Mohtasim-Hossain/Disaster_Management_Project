from rest_framework import serializers
from .models import Crisis

class CrisisSerializer(serializers.ModelSerializer):
    submitted_by = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Crisis
        fields = '__all__'
        read_only_fields = ('status', 'is_visible')

class CrisisUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crisis 
        fields = ['status', 'severity', 'is_visible'] 


class CrisisBaseSerializer(serializers.ModelSerializer):
    submitted_by = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Crisis
        fields = ['id', 'title', 'description', 'location', 'severity', 'status', 'required_help', 'image', 'created_at', 'updated_at', 'submitted_by']

class CrisisListSerializer(CrisisBaseSerializer):
    class Meta(CrisisBaseSerializer.Meta):
        # Override the fields to show limited data for the list view
        fields = ['id', 'title', 'location', 'severity', 'created_at', 'status']

class CrisisDetailSerializer(CrisisBaseSerializer):
    class Meta(CrisisBaseSerializer.Meta):
        # Use all fields defined in CrisisBaseSerializer for the detail view
        pass
