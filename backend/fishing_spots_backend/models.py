from django.db import models
from authentication.models import User

# Create your models here.

class Customers(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    current_location = models.CharField(max_length=255, default="")

class FishingSpots(models.Model):
    isFished = models.BooleanField(default=False)
    fish_types = models.CharField(max_length=255, default="")
    rating = models.DecimalField(decimal_places=1, max_digits=2)
    images = models.FileField(null=True)

class Address(models.Model):
    name = models.CharField(max_length=255, default="")
    street = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")
    zip_code = models.IntegerField(default=0)
    customer = models.ForeignKey(Customers, null=True, on_delete=models.CASCADE)
    fishing_spot = models.ForeignKey(FishingSpots, null=True, on_delete=models.CASCADE)
