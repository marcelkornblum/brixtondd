from django.contrib import admin
from brixtondd.models import *

# class StarAdmin (admin.ModelAdmin):
#     list_display = ('starid', 'propername', 'bayerflamsteed', 'distance', 'mag', 'absmag', 'spectrum', 'colorindex')
#     search_fields = ['propername', 'bayerflamsteed', 'gliese', 'spectrum', 'colorindex', 'starid']

admin.site.register(Artist)
admin.site.register(Artwork)
admin.site.register(Zone)
admin.site.register(Venue)
admin.site.register(Event)