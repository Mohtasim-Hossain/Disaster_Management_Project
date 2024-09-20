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
