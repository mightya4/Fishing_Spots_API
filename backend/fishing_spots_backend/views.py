from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
from .urls import *
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_parks_campgrounds(request):
    parks_and_campgrounds = FishingSpots.objects.all()
    serializer = FishingSpotsSerializer(parks_and_campgrounds, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_all_user_fishing_spots(request):
    if request.method == 'GET':
        fishing_spots = FishingSpots.objects.all()
        serializer = FishingSpotsSerializer(fishing_spots, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
            serializer = FishingSpotsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_fishing_spot_by_id(request, pk):
    fishing_spot = get_object_or_404(FishingSpots, pk=pk)
    if request.method == 'GET':
        serializer = FishingSpotsSerializer(fishing_spot)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FishingSpotsSerializer(fishing_spot, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        fishing_spot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


