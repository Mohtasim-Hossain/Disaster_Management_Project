from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from crisis.models import Crisis
from volunteer.models import Volunteer
from donation.models import Donation, Expense
from crisis.serializers import CrisisSerializer, CrisisUpdateSerializer
from volunteer.serializers import AdminVolunteerUpdateSerializer
from donation.serializers import DonationSerializer, ExpenseSerializer
from django.http import HttpResponse
import pandas as pd
from datetime import date

# View for updating crisis details by an admin
class CrisisAdminUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Crisis.objects.all()  # Specify the queryset

    def get_serializer_class(self):
        # Select the appropriate serializer based on the request method
        if self.request.method in ['PUT', 'PATCH']:
            return CrisisUpdateSerializer  # Use for updates
        return CrisisSerializer  # Use for retrieving data

    def update(self, request, *args, **kwargs):
        # Ensure the user is authenticated and is an admin
        if not request.user.is_authenticated or not request.user.is_app_admin:
            raise PermissionDenied("You do not have permission to perform this action.")

        # Retrieve the crisis object to update
        crisis = self.get_object()

        # Validate and update the crisis using the serializer
        serializer = self.get_serializer(crisis, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)  # Save the updated crisis object

        # Return the updated crisis data in the response
        return Response(serializer.data, status=status.HTTP_200_OK)

# View for updating volunteer details by an admin
class VolunteerAdminUpdateView(generics.UpdateAPIView):
    queryset = Volunteer.objects.all()  # Specify the queryset
    serializer_class = AdminVolunteerUpdateSerializer  # Use the appropriate serializer

    def update(self, request, *args, **kwargs):
        # Ensure the user is authenticated and is an admin
        if not request.user.is_authenticated or not request.user.is_app_admin:
            raise PermissionDenied("You do not have permission to perform this action.")
        
        # Retrieve the volunteer object to update
        volunteer = self.get_object()
        serializer = self.get_serializer(volunteer, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)  # Save the updated volunteer object
        
        # Return the updated volunteer data in the response
        return Response(serializer.data, status=status.HTTP_200_OK)

# View for generating reports
class ReportView(APIView):
    def get(self, request):
        report_type = request.query_params.get('type', None)  # Get the type of report requested
        format_type = request.query_params.get('format', 'csv')  # Default to CSV format

        # Generate the appropriate report based on the report type
        if report_type == 'donations':
            return self.generate_donation_report(format_type)  # Generate donation report
        elif report_type == 'expenses':
            return self.generate_expense_report(format_type)  # Generate expense report
        else:
            return HttpResponse("Invalid report type. Please specify 'donations' or 'expenses'.", status=400)

    def generate_donation_report(self, format_type):
        today = date.today()  # Get today's date
        donations = Donation.objects.filter(created_at__date=today)  # Filter donations made today
        
        # Serialize the donation data
        serializer = DonationSerializer(donations, many=True)
        df = pd.DataFrame(serializer.data)  # Create a DataFrame from the serialized data

        # Generate the report in the specified format
        if format_type == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="donation_report_{today}.csv"'
            df.to_csv(path_or_buf=response, index=False)  # Convert DataFrame to CSV
        elif format_type == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="donation_report_{today}.xlsx"'
            df.to_excel(excel_writer=response, index=False)  # Convert DataFrame to Excel
        else:
            return HttpResponse("Invalid format. Please specify 'csv' or 'excel'.", status=400)

        return response  # Return the response with the report

    def generate_expense_report(self, format_type):
        today = date.today()  # Get today's date
        expenses = Expense.objects.filter(date=today)  # Filter expenses made today
        
        # Serialize the expense data
        serializer = ExpenseSerializer(expenses, many=True)
        df = pd.DataFrame(serializer.data)  # Create a DataFrame from the serialized data

        # Generate the report in the specified format
        if format_type == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="expense_report_{today}.csv"'
            df.to_csv(path_or_buf=response, index=False)  # Convert DataFrame to CSV
        elif format_type == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="expense_report_{today}.xlsx"'
            df.to_excel(excel_writer=response, index=False)  # Convert DataFrame to Excel
        else:
            return HttpResponse("Invalid format. Please specify 'csv' or 'excel'.", status=400)

        return response  # Return the response with the report
