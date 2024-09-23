from rest_framework import serializers
from .models import Crisis

class CrisisSerializer(serializers.ModelSerializer):
    submitted_by = serializers.CharField(required=False, allow_blank=True)  # Field for the user who submitted the crisis

    class Meta:
        model = Crisis  # Model associated with this serializer
        fields = '__all__'  # Include all fields from the Crisis model
        read_only_fields = ('status', 'is_visible')  # These fields cannot be modified during updates

class CrisisUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crisis  # Model associated with this serializer
        fields = ['status', 'severity', 'is_visible']  # Only fields that can be updated

class CrisisBaseSerializer(serializers.ModelSerializer):
    submitted_by = serializers.CharField(required=False, allow_blank=True)  # Optional field for the submitter

    class Meta:
        model = Crisis  # Model associated with this serializer
        fields = ['id', 'title', 'description', 'location', 'severity', 'status', 'required_help', 'image', 'created_at', 'updated_at', 'submitted_by']  # Fields to include

class CrisisListSerializer(CrisisBaseSerializer):
    class Meta(CrisisBaseSerializer.Meta):
        # Override the fields to show limited data for the list view
        fields = ['id', 'title', 'location', 'severity', 'created_at', 'status']  # Simplified fields for listing crises

class CrisisDetailSerializer(CrisisBaseSerializer):
    class Meta(CrisisBaseSerializer.Meta):
        # Use all fields defined in CrisisBaseSerializer for the detail view
        pass  # No need to redefine fields, all are inherited
