# Generated by Django 5.1.1 on 2024-09-19 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('volunteer', '0002_alter_volunteer_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='volunteer',
            name='age',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
