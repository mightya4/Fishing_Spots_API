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
def get_all_users_detail(request):
    if request.method == 'GET':
        customers = Customers.objects.all()
        serializer = CustomersSerializer(customers, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
            serializer = CustomersSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_user_detail(request, pk):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
        
    if request.method == 'GET':
        customer = Customers.objects.filter(pk=pk)
        serializer = CustomersSerializer(customer, many=True)
        return Response(serializer.data)

    elif request.method == 'PUT':
        customer = Customers.objects.filter(pk=pk).first()
        serializer = CustomersSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_all_user_fishing_spots(request):
    pass

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_fishing_spot_by_id(request, pk):
    pass

