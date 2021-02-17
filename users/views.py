from django.shortcuts import render

# Create your views here.


def owner_profile(request):
    return render(request, 'users/owner_profile.html')
