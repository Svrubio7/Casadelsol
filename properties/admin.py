
from django.contrib import admin
from .models import Property

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("descripcion", "habitaciones", "banos", "precio", "airbnb_link")
    search_fields = ("descripcion",)
