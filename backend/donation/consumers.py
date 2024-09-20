# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.db import models  # Add this import
# from .models import Donation

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class DonationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("donations", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("donations", self.channel_name)

    @database_sync_to_async
    def get_total_donations(self):
        from .models import Donation  # Import models here to delay import
        from django.db import models
        return Donation.objects.aggregate(total=models.Sum('amount'))['total'] or 0

    async def donation_message(self, event):
        total_donations = await self.get_total_donations()
        await self.send(text_data=json.dumps({
            'total_donations': str(total_donations)
        }))
