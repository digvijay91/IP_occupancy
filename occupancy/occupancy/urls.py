from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
#error
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'occupancy.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^template/',include('webApp.urls')),

)

