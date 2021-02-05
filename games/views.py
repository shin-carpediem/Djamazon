from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.


def index(request):
    return render(request, 'games/index.html')


@login_required
def counter(request):
    return render(request, 'games/counter.html')


@login_required
def omikuji(request):
    return render(request, 'games/omikuji.html')


@login_required
def bingo(request):
    return render(request, 'games/bingo.html')


@login_required
def typing(request):
    return render(request, 'games/typing.html')


@login_required
def quiz(request):
    return render(request, 'games/quiz.html')


@login_required
def slot(request):
    return render(request, 'games/slot.html')


@login_required
def touch(request):
    return render(request, 'games/touch.html')
