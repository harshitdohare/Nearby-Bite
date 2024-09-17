import json
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import os
import glob

# Function to load JSON data from file
def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

# Function to process restaurants data
def process_restaurants(data):
    restaurants = []
    for item in data:
        if 'restaurants' in item:
            for restaurant in item['restaurants']:
                if 'restaurant' in restaurant:
                    res_data = restaurant['restaurant']
                    res_id = res_data['R']['res_id']
                    restaurants.append({
                        'res_id': res_id,
                        'data': res_data
                    })
    return restaurants

# Function to insert data into MongoDB
def insert_into_mongodb(restaurants, db_name, collection_name):
    client = MongoClient('mongodb://localhost:27017/')
    db = client[db_name]
    collection = db[collection_name]

    # Create a unique index on res_id
    collection.create_index('res_id', unique=True)

    inserted_count = 0
    for restaurant in restaurants:
        try:
            collection.insert_one(restaurant)
            inserted_count += 1
        except DuplicateKeyError:
            print(f"Duplicate entry found for res_id: {restaurant['res_id']}. Skipping.")

    print(f"Inserted {inserted_count} unique restaurants into MongoDB.")


def main():
    folder_path = 'C:\\Users\\Harshit Nishit\\Desktop\\zomato\\data\\file\\'  # Path to your folder
    db_name = 'restaurants_db_main' 
    collection_name = 'restaurants'

    # Fetch all JSON files from the folder
    json_files = glob.glob(os.path.join(folder_path, "*.json"))

    # Loop through each JSON file and process it
    for json_file_path in json_files:
        print(f"Processing file: {json_file_path}")
        
        # Load and process data
        raw_data = load_json_file(json_file_path)
        restaurants = process_restaurants(raw_data)

        # Insert data into MongoDB
        insert_into_mongodb(restaurants, db_name, collection_name)

if __name__ == '__main__':
    main()