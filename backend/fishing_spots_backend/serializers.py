from rest_framework import serializers
from fishing_spots_backend.models import *

class FishingSpotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishingSpots
        fields = ['id', 'name', 'rating', 'is_fishing_location', 'has_fished', 'types_of_fish', 'formatted_address', 'lat', 'lng', 'place_id', 'user_id']
        depth = 1
