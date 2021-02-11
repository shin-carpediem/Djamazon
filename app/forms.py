from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('email', )


class AddToCartForm(forms.Form):
    num = forms.IntegerField(
        label='Number',
        min_value=1,
        required=True)


class PurchaseForm(forms.Form):
    zip_code = forms.CharField(
        label='Postal code',
        max_length=7,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': '7 digits(no hyphen)'}))
    address = forms.CharField(
        label='Address',
        max_length=100,
        required=False)
