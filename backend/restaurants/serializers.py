from rest_framework import serializers

class RestaurantSerializer(serializers.Serializer):
    name = serializers.CharField()
    featured_image = serializers.URLField()
    aggregate_rating = serializers.FloatField()
    address = serializers.CharField()
    cuisines = serializers.CharField()
