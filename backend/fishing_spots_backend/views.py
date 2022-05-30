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
    pass


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_user_detail(request, pk):
    pass

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_all_user_fishing_spots(request):
    pass

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_fishing_spot_by_id(request, pk):
    pass

