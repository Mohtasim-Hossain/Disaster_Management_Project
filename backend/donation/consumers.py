import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class DonationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Add this consumer to the "donations" group
        await self.channel_layer.group_add("donations", self.channel_name)
        await self.accept()  # Accept the WebSocket connection

    async def disconnect(self, close_code):
        # Remove this consumer from the "donations" group
        await self.channel_layer.group_discard("donations", self.channel_name)

    @database_sync_to_async
    def get_total_donations(self):
        from .models import Donation  # Import the Donation model
        from django.db import models  # Import models for aggregation
        # Calculate the total amount of donations
        return Donation.objects.aggregate(total=models.Sum('amount'))['total'] or 0

    async def donation_message(self, event):
        # Retrieve the total donations and send it via WebSocket
        total_donations = await self.get_total_donations()
        await self.send(text_data=json.dumps({
            'total_donations': str(total_donations)  # Send total as a string
        }))
