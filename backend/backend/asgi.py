"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import donation.routing  # Import your donation app's routing

# Set the default settings module for the 'django' program
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Define the ASGI application
application = ProtocolTypeRouter({
    # Handle HTTP requests using Django's ASGI application
    "http": get_asgi_application(),
    
    # Handle WebSocket connections using Channels' routing and authentication
    "websocket": AuthMiddlewareStack(
        URLRouter(
            donation.routing.websocket_urlpatterns  # Define WebSocket URL patterns
        )
    ),
})
