from django.db import models
from authentication.models import User
from crum import get_current_user

# Create your models here.
class FishingSpots(models.Model):
    name = models.CharField(max_length=255, default="")
    rating = models.CharField(max_length=255, default="")
    is_fishing_location = models.BooleanField(default=False)
    has_fished = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    types_of_fish = models.CharField(max_length=255, default="")
    formatted_address = models.CharField(max_length=255, default="")
    lat = models.CharField(max_length=255, default="")
    lng = models.CharField(max_length=255, default="")
    place_id = models.CharField(max_length=255, default="")
    user = models.ForeignKey(User, default=get_current_user, on_delete=models.CASCADE)
   