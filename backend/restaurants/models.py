from django.db import models

class Restaurant(models.Model):
    res_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    featured_image = models.URLField()
    user_rating = models.JSONField()
    location = models.JSONField()
    cuisines = models.CharField(max_length=255)

# serializers.py
from rest_framework import serializers
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'featured_image', 'user_rating', 'location', 'cuisines']