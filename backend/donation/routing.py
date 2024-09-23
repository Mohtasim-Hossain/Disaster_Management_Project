from django.urls import re_path
from . import consumers

# Define the URL patterns for WebSocket connections
websocket_urlpatterns = [
    # This pattern matches WebSocket connections for donations
    re_path(r'ws/donations/$', consumers.DonationConsumer.as_asgi()),  # Route for donation WebSocket
]
