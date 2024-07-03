# EVPRE_Reloaded

### Dependencies
* Make sure you have Node.js and Docker installed on your machine before attempting to run this project

### Building the Project
* Navigate to the `backend` folder. Add a file called .env to this folder. This file should look like this:
```
GOOGLE_MAPS_KEY=(your google maps key)
WEATHER_KEY=(your openweather api key)
TRAFFIC_KEY=(your TomTom traffic api key)

SECRET_KEY=(whatever you want your secret key for the django backend to be)
```

* In the terminal, navigate to the root directory of the project (where the file `docker-compose.yml` is located). Then run the command `docker-compose build`

### Running the Project
* If you haven't already, navigate to the root directory of the project in the terminal. Then run the command `docker-compose up`
* If you have any problems getting the backend to run, you may need to manually run `python manage.py migrate` from the `backend` directory

### Notes
* This build uses vite on the frontend and "manage.py runserver" for the backend. It is configured in such a way that live updates will be rendered and uploaded immediately to the docker container. The only time you should have to use `docker-compose build` is when a new dependency is added to the project
