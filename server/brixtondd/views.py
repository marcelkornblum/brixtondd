from django.core import serializers
from django.http import HttpResponse
from brixtondd.settings import ABS_PATH, AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

import tinys3

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
    conn = tinys3.Connection(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, default_bucket=AWS_STORAGE_BUCKET_NAME, endpoint='s3-eu-west-1.amazonaws.com', tls=True)

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

    f = open(ABS_PATH('publish') + '/events.json','rb')
    conn.upload('publish/events.json',f)
    f = open(ABS_PATH('publish') + '/artists.json','rb')
    conn.upload('publish/artists.json',f)
    f = open(ABS_PATH('publish') + '/artworks.json','rb')
    conn.upload('publish/artworks.json',f)
    f = open(ABS_PATH('publish') + '/zones.json','rb')
    conn.upload('publish/zones.json',f)
    f = open(ABS_PATH('publish') + '/venues.json','rb')
    conn.upload('publish/venues.json',f)
    # conn.update_metadata('test.json',public=True)

    # for awsfile in conn.list():
    #     print(repr(awsfile))

    response = data

    return HttpResponse(serializers.serialize("json", response), content_type="application/json")