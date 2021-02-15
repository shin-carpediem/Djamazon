from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from users.models import User

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
def control_user_point(request):
    if request.method == 'POST':
        # ゲームの勝敗結果を経てhtmlのフォームからポストリクエストされた数値を受け取る
        omikuji_point = request.POST["omikuji_point"]
        # その数値をユーザーのポイントに足した値をユーザーのポイントとする
        user = request.user
        user.point += int(omikuji_point)
        user.save()
    return redirect('games:omikuji')


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


@login_required
def pingpong(request):
    return render(request, 'games/pingpong.html')


@login_required
def tic_tac_toe(request):
    return render(request, 'games/tic_tac_toe.html')
