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
    long_description = models.TextField("Descripción", blank=True)
    discount = models.TextField("Descuento Especial!", blank=True)
    imagenes = models.ImageField("Imágenes", upload_to="properties/extra/", blank=True)
    featured = models.BooleanField("Destacado", default=False)

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        return f"{self.descripcion[:50]}..." if len(self.descripcion) > 50 else self.descripcion
