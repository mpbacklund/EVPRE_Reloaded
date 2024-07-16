# EVPRE_Reloaded
* use the command `git clone -b new-ui --single-branch git@github.com:DIRECTLab/EVPRE-frontend.git` to get the project

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
* Make sure that the Docker daemon is running
* In the terminal, navigate to the root directory of the project (where the file `docker-compose.yml` is located. Then run the command `docker-compose build`

### Running the Project
* If you haven't already, navigate to the root directory of the project in the terminal. Then run the command `docker-compose up`
* If you have any problems getting the project to run correctly, you may need to type `git config --global core.autocrlf input` in your terminal to ensure that scripts run correctly, then delete and reclone the project. 
