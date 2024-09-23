from rest_framework import serializers
from .models import Donation, Expense

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ['donor_name', 'amount', 'created_at']  # Specify fields to be included in serialization

    def validate_donor_name(self, value):
        # Validate the donor_name field to ensure it's not empty
        if value is None or value.strip() == "":
            return "Anonymous"  # Default to "Anonymous" if no name is provided
        return value  # Return the validated donor name

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['description', 'amount', 'date']  # Specify fields for expense serialization
