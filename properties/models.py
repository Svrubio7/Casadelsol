from django.db import models

# Create your models here.
class Property(models.Model):
    title = models.CharField("Título", max_length=200)
    location = models.CharField("Ubicación", max_length=200)
    main_image = models.ImageField("Imagen Principal", upload_to="properties/main/")
    airbnb_link = models.URLField("AirBnB link", blank=True)
    habitaciones = models.PositiveIntegerField("Habitaciones")
    banos = models.PositiveIntegerField("Baños")
    precio = models.DecimalField("Precio", max_digits=10, decimal_places=2)
    descripcion = models.TextField("Descripción")
    long_description = models.TextField("Descripción Larga", blank=True)
    discount = models.TextField("Descuento Especial!", blank=True)
    featured = models.BooleanField("Destacado", default=False)

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField("Imagen", upload_to="properties/extra/")
    caption = models.CharField("Título de la imagen", max_length=200, blank=True)
    order = models.PositiveIntegerField("Orden", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Imagen de Propiedad"
        verbose_name_plural = "Imágenes de Propiedades"

    def __str__(self):
        return f"{self.property.title} - {self.caption or 'Imagen adicional'}"
