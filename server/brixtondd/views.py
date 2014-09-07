from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template.context import RequestContext
from django.template.loader import render_to_string
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
    homepage = Homepage.objects.reverse()

    data = list(events) + list(artists) + list(artwork) + list(zones) + list(venues) + list(homepage)

    payload = serializers.serialize("json", data)
    return HttpResponse(payload, content_type="application/json")

def list(request):
    events = Event.objects.select_related().order_by('start')
    for event in events:
        # event.artists = list(event.artists)
        print(repr(event.artists))

    context = {'events': events}

    content = render_to_string('list.html', context)
    with open(ABS_PATH('publish') + '/list.html', 'w') as static_file:
        static_file.write(content)

    return render(request, 'list.html', context)

    # return HttpResponse(payload)

def write_files(request):
    if request.user.is_authenticated():
        json_serializer = serializers.get_serializer('json')()
        conn = tinys3.Connection(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, default_bucket=AWS_STORAGE_BUCKET_NAME, endpoint='s3-eu-west-1.amazonaws.com', tls=True)

        events = data = Event.objects.select_related().order_by('start')
        with open(ABS_PATH('publish') + '/events.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        content = render_to_string('list.html', {'events': events})
        with open(ABS_PATH('publish') + '/list.html', 'w') as static_file:
            static_file.write(content)

        artists = data = Artist.objects.all()
        with open(ABS_PATH('publish') + '/artists.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        data = Artwork.objects.all()
        with open(ABS_PATH('publish') + '/artworks.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        data = Zone.objects.all()
        with open(ABS_PATH('publish') + '/zones.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        venues = data = Venue.objects.all()
        with open(ABS_PATH('publish') + '/venues.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        data = Homepage.objects.reverse()
        with open(ABS_PATH('publish') + '/homepage.json', 'w') as out:
            json_serializer.serialize(data, stream=out)

        content = render_to_string('sitemap.xml', {'events': events, 'artists': artists, 'venues': venues})
        with open(ABS_PATH('publish') + '/sitemap.xml', 'w') as static_file:
            static_file.write(content)

        f = open(ABS_PATH('publish') + '/events.json','rb')
        conn.upload('publish/events.json',f)
        f = open(ABS_PATH('publish') + '/list.html','rb')
        conn.upload('publish/list.html',f)
        f = open(ABS_PATH('publish') + '/artists.json','rb')
        conn.upload('publish/artists.json',f)
        f = open(ABS_PATH('publish') + '/artworks.json','rb')
        conn.upload('publish/artworks.json',f)
        f = open(ABS_PATH('publish') + '/zones.json','rb')
        conn.upload('publish/zones.json',f)
        f = open(ABS_PATH('publish') + '/venues.json','rb')
        conn.upload('publish/venues.json',f)
        f = open(ABS_PATH('publish') + '/homepage.json','rb')
        conn.upload('publish/homepage.json',f)
        f = open(ABS_PATH('publish') + '/sitemap.xml','rb')
        conn.upload('publish/sitemap.xml',f)

        message = 'All data published successfully to the live site.'

    else :
        message = 'You are not signed in and no action has been taken. Please sign in to the admin interface and try again.'

    context = RequestContext(request,
                           {'request': request,
                            'user': request.user,
                            'message': message})
    return render_to_response('admin/publish.html',
                                 context_instance=context)