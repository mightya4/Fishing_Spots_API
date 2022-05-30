from rest_framework import serializers
from fishing_spots_backend.models import *


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ['id', 'first_name', 'last_name', 'current_location' 'street', 'city', 'state', 'zip_code', 'user_id', 'address_id']
        depth = 1

class FishingSpotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishingSpots
        fields = ['id', 'isFished', 'fish_types', 'rating', 'images', 'customer_id', 'address_id']
        depth = 1

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'name', 'street', 'city', 'state', 'zip_code']
        depth = 1
