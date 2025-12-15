from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Property
from .serializers import PropertySerializer

@api_view(['GET'])
def featured_properties(request):
    featured = Property.objects.filter(featured=True)
    serializer = PropertySerializer(featured, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def property_list(request):
    """
    List all properties with optional filtering.
    """
    queryset = Property.objects.all()

    # Filtering
    capacity = request.query_params.get('capacity')
    if capacity:
        queryset = queryset.filter(capacity__gte=capacity)
    
    habitaciones = request.query_params.get('habitaciones')
    if habitaciones:
        queryset = queryset.filter(habitaciones__gte=habitaciones)
        
    banos = request.query_params.get('banos')
    if banos:
        queryset = queryset.filter(banos__gte=banos)
        
    location = request.query_params.get('location')
    if location:
        queryset = queryset.filter(location__icontains=location)

    serializer = PropertySerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def property_detail(request, pk):
    try:
        property_obj = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PropertySerializer(property_obj, context={'request': request})
    return Response(serializer.data)
