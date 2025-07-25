

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Property
from .serializers import PropertySerializer

@api_view(['GET'])
def featured_properties(request):
    featured = Property.objects.filter(featured=True)
    serializer = PropertySerializer(featured, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def property_detail(request, pk):
    try:
        property_obj = Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PropertySerializer(property_obj)
    return Response(serializer.data)
