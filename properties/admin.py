from django.contrib import admin
from django.contrib import messages
from .models import Property, PropertyImage
from .forms import PropertyAdminForm

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1
    fields = ('image', 'caption', 'order')

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    form = PropertyAdminForm
    list_display = ("title", "location", "habitaciones", "banos", "capacity", "precio", "featured")
    list_filter = ("featured", "habitaciones", "banos", "capacity")
    search_fields = ("title", "location", "descripcion")
    inlines = [PropertyImageInline]
    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'location', 'main_image', 'featured')
        }),
        ('Carga Masiva', {
            'fields': ('photos',)
        }),
        ('Detalles', {
            'fields': ('habitaciones', 'banos', 'capacity', 'precio')
        }),
        ('Ubicación y Mapa', {
            'fields': ('latitude', 'longitude'),
            'description': 'Coordenadas para el mapa (Mapbox)'
        }),
        ('Descripción', {
            'fields': ('descripcion', 'long_description', 'discount')
        }),
        ('Enlaces', {
            'fields': ('airbnb_link',)
        }),
    )

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        photos = request.FILES.getlist('photos')
        if photos:
            count = 0
            for photo in photos:
                # Basic validation: ensure it's an image
                if photo.content_type.startswith('image'):
                    try:
                        PropertyImage.objects.create(property=form.instance, image=photo)
                        count += 1
                    except Exception as e:
                        messages.error(request, f"Error al guardar {photo.name}: {str(e)}")
                else:
                    messages.warning(request, f"El archivo {photo.name} no es una imagen válida y se omitió.")
            
            if count > 0:
                messages.success(request, f"Se han subido {count} imágenes adicionales exitosamente.")

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ("property", "caption", "order")
    list_filter = ("property",)
    search_fields = ("property__title", "caption")
    ordering = ("property", "order")
