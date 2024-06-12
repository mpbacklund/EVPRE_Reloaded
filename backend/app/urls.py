from django.urls import path
from . import views
from django.urls import re_path

urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
    re_path('logout', views.logout),
    re_path('getRoute', views.getRoute),
]