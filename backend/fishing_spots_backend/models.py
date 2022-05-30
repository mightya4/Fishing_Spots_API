from django.db import models
from authentication.models import User

# Create your models here.
class Address(models.Model):
    name = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")
    zip_code = models.IntegerField(default=0)

class FishingSpots(models.Model):
    name = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")
    zip_code = models.IntegerField(default=0)
    isFished = models.BooleanField(default=False)
    fish_types = models.CharField(max_length=255, default="")
    rating = models.DecimalField(decimal_places=1, max_digits=2)
    images = models.FileField()

class VisitedFishingSpots(models.Model):
    name = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")
    zip_code = models.IntegerField(default=0)

class Customers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    current_location = models.CharField(blank=True, max_length=255)
    street = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")
    zip_code = models.IntegerField(default=0)
