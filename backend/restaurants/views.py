from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pymongo import MongoClient
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pymongo import MongoClient
from rest_framework.pagination import PageNumberPagination
from bson import ObjectId
from rest_framework.pagination import PageNumberPagination

from django.http import JsonResponse
from pymongo import MongoClient
from django.views.decorators.http import require_GET
import math
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Restaurant
from .serializers import RestaurantSerializer
from django.db.models import Q
from pymongo import MongoClient
from bson import json_util
import json
from math import radians, cos, sin, asin, sqrt

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')  # Local MongoDB connection
db = client['restaurants_db_main']
collection = db['restaurants'] 

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import google.generativeai as genai
import os

from django.conf import settings


api_key = settings.API_KEY
genai.configure(api_key=api_key)


@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        file = request.FILES['file']
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        
        # Save the uploaded file to a local directory
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        try:
            # Upload the file to the Generative AI API
            myfile = genai.upload_file(file_path)

            # Use the AI model to generate content
            model = genai.GenerativeModel("gemini-1.5-flash")
            result = model.generate_content(
    [myfile, "\n\n", "identify the given dish as dessert , if it is dessert just return the dessert and if it is not dessert then return the cuisine which that dish belongs too [Italian, Continental,European,North Indian,South Indian, Japanese] just return the cuisine name for example if the answer is Chinese cuisine return Chinese . If possible classify the indian food as north indian or south indian else give North Indian if not among the following then define which kind of cuisine it is"]
)
            return JsonResponse({'result': result.text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

class RestaurantListView(APIView):
    def get(self, request):
        query = {}
        
        # Search by name or description
        search = request.query_params.get('search', '')
        if search:
            query['$or'] = [
                {'data.name': {'$regex': search, '$options': 'i'}},
                {'data.cuisines': {'$regex': search, '$options': 'i'}}
            ]
        
        # Filter by country
        country = request.query_params.get('country', '')
        if country:
            query['data.location.country_id'] = int(country)
        
        # Filter by average spend
        min_spend = request.query_params.get('min_spend')
        max_spend = request.query_params.get('max_spend')
        if min_spend or max_spend:
            query['data.average_cost_for_two'] = {}
            if min_spend:
                query['data.average_cost_for_two']['$gte'] = int(min_spend)
            if max_spend:
                query['data.average_cost_for_two']['$lte'] = int(max_spend)
        
        # Filter by cuisines
        cuisines = request.query_params.get('cuisines', '')
        if cuisines:
            query['data.cuisines'] = {'$regex': cuisines, '$options': 'i'}
        
        restaurants = list(collection.find(query))
        
        serialized_restaurants = []
        for restaurant in restaurants:
            data = restaurant['data']
            serialized_restaurants.append({
                'name': data['name'],
                'image': data['featured_image'],
                'rating': data['user_rating']['aggregate_rating'],
                'location': data['location']['address'],
                'cuisines': data['cuisines'],
                'average_cost_for_two': data['average_cost_for_two'],
                'country': data['location']['country_id']
            })
        
        return Response(serialized_restaurants)

class NearbyRestaurantsView(APIView):
    def get(self, request):
        lat = float(request.query_params.get('lat'))
        lon = float(request.query_params.get('lon'))
        
        def haversine(lon1, lat1, lon2, lat2):
            lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
            dlon = lon2 - lon1 
            dlat = lat2 - lat1 
            a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
            c = 2 * asin(sqrt(a)) 
            r = 6371 # Radius of earth in kilometers
            return c * r
        
        nearby_restaurants = []
        for restaurant in collection.find():
            rest_lat = float(restaurant['data']['location']['latitude'])
            rest_lon = float(restaurant['data']['location']['longitude'])
            distance = haversine(lon, lat, rest_lon, rest_lat)
            
            if distance <= 3:  # 3 km radius
                data = restaurant['data']
                nearby_restaurants.append({
                    'name': data['name'],
                    'image': data['featured_image'],
                    'rating': data['user_rating']['aggregate_rating'],
                    'location': data['location']['address'],
                    'cuisines': data['cuisines'],
                    'distance': round(distance, 2)
                })
        
        return Response(nearby_restaurants)
    



def restaurant_list(request):
    query = {}
    
    search = request.GET.get('search', '')
    if search:
        query['$or'] = [
            {'data.name': {'$regex': search, '$options': 'i'}},
            {'data.cuisines': {'$regex': search, '$options': 'i'}}
        ]
    
    country = request.GET.get('country', '')
    if country:
        country_doc = country_collection.find_one({'name': {'$regex': f'^{country}$', '$options': 'i'}})
        if country_doc:
            query['data.location.country_id'] = country_doc['id']
    
    min_spend = request.GET.get('minSpend')
    max_spend = request.GET.get('maxSpend')
    if min_spend or max_spend:
        query['data.average_cost_for_two'] = {}
        if min_spend:
            query['data.average_cost_for_two']['$gte'] = int(min_spend)
        if max_spend:
            query['data.average_cost_for_two']['$lte'] = int(max_spend)
    
    cuisines = request.GET.get('cuisines', '')
    if cuisines:
        query['data.cuisines'] = {'$regex': cuisines, '$options': 'i'}
    
    restaurants = list(collection.find(query))
    
    # Add country names to the restaurant data
    country_map = {doc['id']: doc['name'] for doc in country_collection.find()}
    for restaurant in restaurants:
        country_id = restaurant['data']['location']['country_id']
        restaurant['data']['country_name'] = country_map.get(country_id, 'Unknown')
    
    # Convert ObjectId to string for JSON serialization
    for restaurant in restaurants:
        restaurant['_id'] = str(restaurant['_id'])
    
    return JsonResponse(restaurants, safe=False)