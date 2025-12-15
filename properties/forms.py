from django import forms
from .models import Property


class MultipleFileInput(forms.ClearableFileInput):
    """Widget that allows selecting multiple files."""
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    """FileField that properly handles multiple files."""
    
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput(attrs={'multiple': True}))
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        # If no data, return empty list (since required=False)
        if not data:
            return []
        
        # Handle single file or list of files
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = [single_file_clean(data, initial)]
        return result


class PropertyAdminForm(forms.ModelForm):
    photos = MultipleFileField(
        widget=MultipleFileInput(attrs={'multiple': True, 'accept': 'image/*'}),
        label="Subir fotos adicionales (Seleccionar múltiples)",
        required=False
    )

    class Meta:
        model = Property
        fields = '__all__'
