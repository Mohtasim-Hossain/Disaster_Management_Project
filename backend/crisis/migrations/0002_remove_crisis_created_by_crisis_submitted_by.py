# Generated by Django 5.1.1 on 2024-09-20 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crisis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crisis',
            name='created_by',
        ),
        migrations.AddField(
            model_name='crisis',
            name='submitted_by',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
