from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import os
from dotenv import load_dotenv

from .EVPRE.route_estimator import RouteEstimator

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.email = request.data['email']
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response({"username": request.user.username})

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Delete the token
        request.auth.delete()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": "Unable to log out."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getRoute(request):
    startLat = float(request.GET['startLat'])
    startLon = float(request.GET['startLon'])
    endLat = float(request.GET['endLat'])
    endLon = float(request.GET['endLon'])
    vehicle = request.GET['vehicle']

    startCoord = (startLat, startLon)
    endCoord = (endLat, endLon)

    print(startCoord)
    print(endCoord)

    route_estimator_length = RouteEstimator(startCoord, endCoord, vehicle)
    route_map = route_estimator_length.create_map()

    route_estimator_fastsim_model = RouteEstimator(startCoord, endCoord, vehicle, graph=route_estimator_length.get_graph())
    route_estimator_fastsim_model.activate_energy_model()

    route_estimator_fastsim_model.set_starting_coord(startLat, startLon)
    route_estimator_fastsim_model.set_ending_coord(endLat, endLon)

    path_gdf = route_estimator_fastsim_model.handle_change_location(route_estimator_fastsim_model.from_marker.location, route_estimator_fastsim_model.to_marker.location)

    # Convert GeoDataFrame to WKT
    line_wkt = path_gdf.geometry.iloc[0].wkt

    # Parse WKT to get coordinates
    parsed = line_wkt.strip('LINESTRING (').strip(')').split(',')
    route = []
    for i in range(len(parsed)):
        item = parsed[i].strip().split(" ")
        pair = f"{item[1]},{item[0]}"
        route.append(pair)
    path = "%7C".join(route)

    url = "https://maps.googleapis.com/maps/api/staticmap?"
    size = "500x400"
    start = route[0]
    end = route[-1]
    load_dotenv()
    maps_api = os.getenv("GOOGLE_MAPS_KEY")
    url += f"path={path}&markers={start}%7C{end}&size={size}&key={maps_api}"

    return Response(url, status=status.HTTP_200_OK)
