from django.shortcuts import render
import logging

# Create your views here.
logger = logging.getLogger(__name__)
logger.info("log info test!")
logger.error("log error test!")


def owner_profile(request):
    return render(request, 'users/owner_profile.html')
