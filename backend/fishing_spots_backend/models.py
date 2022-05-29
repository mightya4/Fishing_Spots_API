from django.db import models
from authentication.models import User

# Create your models here.
class Directions(models.Model):
    from_location = models.CharField(max_length=255)
    to_location = models.CharField(max_length=255)

class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.IntegerField()

class FishingSpots(models.Model):
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.IntegerField()
    isFished = models.BooleanField(default=False)
    fish_types = models.CharField(max_length=255)
    rating = models.DecimalField(decimal_places=1, max_digits=2)
    images = models.FileField()

class VisitedFishingSpots(models.Model):
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.IntegerField()

class Customers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    current_location = models.CharField(blank=True, max_length=255)
    name = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.IntegerField()
