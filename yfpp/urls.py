from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic.simple import direct_to_template

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', direct_to_template, {'template': 'yfpp/address_form.html'}, name='home'),
    #url(r'^$', 'yfpp.views.home', name='home'),
    url(r'^fucking-check', 'yfpp.views.fucking_check', name='fucking_check'),
    url(r'^results/', 'yfpp.views.results', name='results'),
    # url(r'^yfpp/', include('yfpp.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += staticfiles_urlpatterns()
