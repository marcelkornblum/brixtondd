from django.contrib import admin
from brixtondd.models import *
from brixtondd.views import write_files

# class ArtistAdmin (admin.ModelAdmin):
#     search_fields = ['name']

admin.site.register(Homepage)
admin.site.register(Artist)
admin.site.register(Artwork)
admin.site.register(Zone)
admin.site.register(Venue)
admin.site.register(Event)

# admin.site.add_action(write_files, 'Publish all data')