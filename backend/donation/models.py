from django.db import models

class Donation(models.Model):
    # The name of the donor; can be blank or null for anonymous donations
    donor_name = models.CharField(max_length=200, blank=True, null=True)
    # The amount donated, with a maximum of 10 digits, including 2 decimal places
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Automatically set the date when the donation is created
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # Return a string representation of the donation
        return f"{'Anonymous' if self.donor_name is None else self.donor_name} - ${self.amount}"

class Expense(models.Model):
    # A description of the expense
    description = models.CharField(max_length=200)
    # The amount of the expense, with a maximum of 10 digits, including 2 decimal places
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # The date the expense was incurred
    date = models.DateField()

    def __str__(self):
        # Return a string representation of the expense
        return f"{self.description} - ${self.amount}"
