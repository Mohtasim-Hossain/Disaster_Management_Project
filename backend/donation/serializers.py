from rest_framework import serializers
from .models import Donation, Expense

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ['donor_name', 'amount']

    def validate_donor_name(self, value):
        if value is None or value.strip() == "":
            return "Anonymous"
        return value

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['description', 'amount', 'date']