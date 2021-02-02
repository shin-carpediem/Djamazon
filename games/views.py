from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.


def index(request):
    return render(request, 'games/index.html')


@login_required
def counter(request):
    return render(request, 'games/counter.html')
