from django.contrib import admin
from brixtondd.models import *

# class ArtistAdmin (admin.ModelAdmin):
#     search_fields = ['name']

admin.site.register(Artist)
admin.site.register(Artwork)
admin.site.register(Zone)
admin.site.register(Venue)
admin.site.register(Event)