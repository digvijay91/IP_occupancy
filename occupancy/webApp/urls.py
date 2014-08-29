from django.conf.urls import url

from webApp import views

urlpatterns = [
    # url(r'^home$', views.home, name='home'),
    url(r'^index$', views.index, name ="index")
]