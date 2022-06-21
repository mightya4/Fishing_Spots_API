from django.db import models
from authentication.models import User

# Create your models here.
class FishingSpots(models.Model):
    name = models.CharField(max_length=255, default="")
    rating = models.DecimalField(decimal_places=1, max_digits=2)
    is_fishing_location = models.BooleanField(default=False)
    has_fished = models.BooleanField(default=False)
    types_of_fish = models.CharField(max_length=255, default="")
    formatted_address = models.CharField(max_length=255, default="")
    latitude = models.IntegerField(default=0)
    longitude = models.IntegerField(default=0)
    place_id = models.CharField(max_length=255, default="")
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
   