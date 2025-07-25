from django.urls import path

from .views import featured_properties, property_detail
from rest_framework.decorators import api_view

from .models import Property
from .serializers import PropertySerializer
from rest_framework.response import Response

@api_view(['GET'])
def property_list(request):
    queryset = Property.objects.all()
    serializer = PropertySerializer(queryset, many=True)
    return Response(serializer.data)

urlpatterns = [
    path('', property_list, name='property-list'),
    path('featured/', featured_properties, name='featured-properties'),
    path('<int:pk>/', property_detail, name='property-detail'),
]
