from django.conf.urls import patterns,url
from django.views.generic import TemplateView
from webApp import views


urlpatterns = patterns('',
    url(r'^chart/',views.index,name="index"),
    url(r'^past_week_data/(?P<time>.+)$',views.past_week_data, name = "past_week_data"),
    url(r'^past_same_day/(?P<time>.+)$',views.past_same_day, name = "past_same_day"),
    
)

