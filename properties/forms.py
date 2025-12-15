from django import forms
from .models import Property

class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class PropertyAdminForm(forms.ModelForm):
    photos = forms.FileField(
        widget=MultipleFileInput(attrs={'multiple': True, 'accept': 'image/*'}),
        label="Subir fotos adicionales (Seleccionar múltiples)",
        required=False
    )

    class Meta:
        model = Property
        fields = '__all__'
