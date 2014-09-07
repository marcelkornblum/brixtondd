from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'brixtondd.views.home', name='home'),
    url(r'^list$', 'brixtondd.views.list', name='list'),
    url(r'^publish/', 'brixtondd.views.write_files', name='publish'),

    url(r'^admin/', include(admin.site.urls)),
)
