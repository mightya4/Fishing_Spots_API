from django.contrib import admin

from fishing_spots_backend.models import Address, Customers, FishingSpots
from .models import Car

# Register your models here.
admin.site.register(Car)
admin.site.register(Customers)
admin.site.register(FishingSpots)
admin.site.register(Address)
