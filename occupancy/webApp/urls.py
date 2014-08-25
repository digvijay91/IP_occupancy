from django.conf.urls import url

from webApp import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
]