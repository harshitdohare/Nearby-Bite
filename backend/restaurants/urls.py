from django.urls import path
from .views import RestaurantListView, NearbyRestaurantsView
from .views import upload_image

urlpatterns = [
    path('restaurants/', RestaurantListView.as_view(), name='restaurant-list'),
    path('nearby-restaurants/', NearbyRestaurantsView.as_view(), name='nearby-restaurants'),
    path('upload/', upload_image, name='image-upload'),
]
