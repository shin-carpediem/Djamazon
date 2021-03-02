from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from users.models import User, UserPointHistory


def index(request):
    return render(request, 'games/index.html')


@login_required
def counter(request):
    return render(request, 'games/counter.html')


@login_required
def control_counter_point(request):
    if request.method == 'POST':
        counter_point = request.POST["counter_point"]
        user = request.user
        user.point += int(counter_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
        if int(counter_point) > 0:
            messages.success(request, f"You won {counter_point}!")
        if int(counter_point) <= 0:
            messages.warning(request, f"You lost {counter_point}..")
    return redirect('games:counter')


@login_required
def omikuji(request):
    return render(request, 'games/omikuji.html')


@login_required
def control_omikuji_point(request):
    if request.method == 'POST':
        omikuji_point = request.POST["omikuji_point"]
        user = request.user
        user.point += int(omikuji_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:omikuji')


@login_required
def bingo(request):
    return render(request, 'games/bingo.html')


@login_required
def control_bingo_point(request):
    if request.method == 'POST':
        bingo_point = request.POST["bingo_point"]
        user = request.user
        user.point += int(bingo_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:bingo')


@login_required
def typing(request):
    return render(request, 'games/typing.html')


@login_required
def control_typing_point(request):
    if request.method == 'POST':
        typing_point = request.POST["typing_point"]
        user = request.user
        user.point += int(typing_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:typing')


@login_required
def quiz(request):
    return render(request, 'games/quiz.html')


@login_required
def slot(request):
    return render(request, 'games/slot.html')


@login_required
def control_slot_point(request):
    if request.method == 'POST':
        slot_point = request.POST["slot_point"]
        user = request.user
        user.point += int(slot_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:slot')


@login_required
def touch(request):
    return render(request, 'games/touch.html')


@login_required
def control_touch_point(request):
    if request.method == 'POST':
        touch_point = request.POST["touch_point"]
        user = request.user
        user.point += int(touch_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:touch')


@login_required
def pingpong(request):
    return render(request, 'games/pingpong.html')


@login_required
def control_pingpong_point(request):
    if request.method == 'POST':
        pingpong_point = request.POST["pingpong_point"]
        user = request.user
        user.point += int(pingpong_point)
        user.save()
        userpointhistory = UserPointHistory(
            point_history=user.point, user=user)
        userpointhistory.save()
    return redirect('games:pingpong')


@login_required
def dungeon(request):
    return render(request, 'games/dungeon.html')
