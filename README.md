
# NearbyBite

**Discover Local Flavors, Powered by Innovation**

NearbyBite is a full-stack restaurant finder app that helps users discover nearby restaurants based on their current location, leveraging image recognition technology to recommend similar cuisines. Built using React, Django, MongoDB, and Google GenAI, the app provides a seamless experience for users to explore restaurants based on ratings, cuisines, and proximity.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Screenshots](#Screenshots)

## Features
- **Location-Based Search**: Finds nearby restaurants using latitude and longitude data.
- **Image Search**: Uses Google GenAI for image recognition to suggest restaurants with similar cuisines.
- **Rating-Based Suggestions**: Recommends restaurants based on user ratings and popularity.
- **Python Data Processing**: Analyzes and structures JSON data for efficient storage in MongoDB.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly, responsive user interface.

## Tech Stack
- **Backend:** Django Rest Framework (DRF) (`backend`)
- **Database:** MongoDB
- **Frontend:** React (`frontend`)
- **Styling:** Bootstrap
- **Image Processing:** Google GenAI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/e42-typeface-ai/iiit-kota-assign-harshitdohare
   ```

2. Navigate to the project directory:
   ```bash
   cd zomato-restaurant-management
   ```

3. Install the backend and frontend dependencies:
   - **Backend (Django):**
     ```bash
     pip install -r backend/requirements.txt
     ```
   - **Frontend (React):**
     ```bash
     cd frontend
     npm install
     ```

4. Set up MongoDB and configure environment variables for database access.

5. Run migrations for the Django backend:
   ```bash
   python manage.py migrate
   ```

6. Start the development servers:
   - **Backend (Django):**
     ```bash
     python manage.py runserver
     ```
   - **Frontend (React):**
     ```bash
     npm start
     ```

## Screenshots

# 1.Database 
![Image Alt](https://github.com/harshitdohare/Nearby-Bite/blob/main/Screenshots/database.png?raw=true)

# 2.Home
![Image Alt](https://github.com/harshitdohare/Nearby-Bite/blob/main/Screenshots/img1.png?raw=true)

# 3.Image Serch using GenAI
![Image Alt](https://github.com/harshitdohare/Nearby-Bite/blob/main/Screenshots/img2.png?raw=true)
