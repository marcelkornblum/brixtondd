from django.core import serializers
from django.http import HttpResponse
from brixtondd.settings import ABS_PATH

from brixtondd.models import *

def home(request):
    events = Event.objects.select_related().order_by('start')
    artists = Artist.objects.all()
    zones = Zone.objects.all()
    venues = Venue.objects.all()
    artwork = Artwork.objects.all()

    data = list(events) + list(artists) + list(artwork) + list(zones) + list(venues)

    payload = serializers.serialize("json", data)
    return HttpResponse(payload, content_type="application/json")

def write_files(request):
    json_serializer = serializers.get_serializer('json')()

    data = Event.objects.select_related().order_by('start')
    with open(ABS_PATH('publish') + '/events.json', 'w') as out:
        json_serializer.serialize(data, stream=out)

    data = Artist.objects.all()
    with open(ABS_PATH('publish') + '/artists.json', 'w') as out:
        json_serializer.serialize(data, stream=out)

    data = Artwork.objects.all()
    with open(ABS_PATH('publish') + '/artworks.json', 'w') as out:
        json_serializer.serialize(data, stream=out)

    data = Zone.objects.all()
    with open(ABS_PATH('publish') + '/zones.json', 'w') as out:
        json_serializer.serialize(data, stream=out)

    data = Venue.objects.all()
    with open(ABS_PATH('publish') + '/venues.json', 'w') as out:
        json_serializer.serialize(data, stream=out)

    return HttpResponse({'result': 'files written successfully'}, content_type="application/json")