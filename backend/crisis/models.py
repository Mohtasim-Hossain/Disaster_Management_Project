from django.db import models
from django.conf import settings

class Crisis(models.Model):
    SEVERITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('resolved', 'Resolved'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    required_help = models.TextField()
    image = models.ImageField(upload_to='crisis_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_visible = models.BooleanField(default=False)  # New field to control visibility
    submitted_by = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.submitted_by or 'Anonymous'} - {self.title}"