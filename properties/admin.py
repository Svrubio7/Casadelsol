
from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1
    fields = ('image', 'caption', 'order')

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "habitaciones", "banos", "precio", "featured")
    list_filter = ("featured", "habitaciones", "banos")
    search_fields = ("title", "location", "descripcion")
    inlines = [PropertyImageInline]
    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'location', 'main_image', 'featured')
        }),
        ('Detalles', {
            'fields': ('habitaciones', 'banos', 'precio')
        }),
        ('Descripción', {
            'fields': ('descripcion', 'long_description', 'discount')
        }),
        ('Enlaces', {
            'fields': ('airbnb_link',)
        }),
    )

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ("property", "caption", "order")
    list_filter = ("property",)
    search_fields = ("property__title", "caption")
    ordering = ("property", "order")
