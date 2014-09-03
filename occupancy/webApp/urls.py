from django.conf.urls import patterns,url
from django.views.generic import TemplateView
from webApp import views


urlpatterns = patterns('',
    url(r'^chart/',views.index,name="index"),
    url(r'^past/(?P<time>.+)$',views.past_week_data, name = "past_week_data"),
    
)

