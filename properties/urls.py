
from django.urls import path
from . import views

urlpatterns = [
    path('featured/', views.featured_properties, name='featured-properties'),
    path('', views.property_list, name='property-list'),
    path('<int:pk>/', views.property_detail, name='property-detail'),
]
