from django.conf.urls import patterns,url
from django.views.generic import TemplateView
from webApp import views


urlpatterns = patterns('',
    url(r'^chart/',TemplateView.as_view(template_name = "index.html")),
    
)

