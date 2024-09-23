from django.db import models
from django.conf import settings

class Crisis(models.Model):
    # Choices for the severity of the crisis
    SEVERITY_CHOICES = (
        ('low', 'Low'),           # Low severity level
        ('medium', 'Medium'),     # Medium severity level
        ('high', 'High'),         # High severity level
        ('critical', 'Critical'),  # Critical severity level
    )
    # Choices for the status of the crisis
    STATUS_CHOICES = (
        ('ongoing', 'Ongoing'),   # Crisis currently ongoing
        ('upcoming', 'Upcoming'),  # Crisis that is expected to occur
        ('resolved', 'Resolved'),  # Crisis that has been resolved
    )
    
    title = models.CharField(max_length=200)  # Title of the crisis
    description = models.TextField()            # Detailed description of the crisis
    location = models.CharField(max_length=200)  # Location where the crisis is occurring
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)  # Severity of the crisis
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ongoing')  # Current status of the crisis
    required_help = models.TextField()          # Description of help required for the crisis
    image = models.ImageField(upload_to='crisis_images/', blank=True, null=True)  # Optional image related to the crisis
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the crisis was created
    updated_at = models.DateTimeField(auto_now=True)      # Timestamp for when the crisis was last updated
    is_visible = models.BooleanField(default=False)  # Field to control whether the crisis is visible to users
    submitted_by = models.CharField(max_length=50, blank=True, null=True)  # User who submitted the crisis report

    def __str__(self):
        return f"{self.submitted_by or 'Anonymous'} - {self.title}"  # String representation of the crisis
