from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200)
    photo = models.FileField(upload_to='artistImages', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    search_terms = models.CharField(max_length=200, null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        pass



class Artwork(models.Model):
    name = models.CharField(max_length=200)
    photo = models.FileField(upload_to='artworkImages', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    artist = models.ManyToManyField(Artist, related_name='artworks')
    search_terms = models.CharField(max_length=200, null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        pass



class Zone(models.Model):
    name = models.CharField(max_length=200)
    colourCode = models.CharField(max_length=6)
    description = models.TextField(null=True, blank=True)
    polyline = models.TextField(null=True, blank=True)
    search_terms = models.CharField(max_length=200, null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        pass



class Venue(models.Model):
    name = models.CharField(max_length=200)
    photo = models.FileField(upload_to='venueImages', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    zone = models.ForeignKey(Zone, related_name='venues')
    address = models.TextField(null=True, blank=True)
    search_terms = models.CharField(max_length=200, null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        pass



class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    venue = models.ForeignKey(Venue, related_name='events')
    artists = models.ManyToManyField(Artist, related_name='events')
    start = models.DateTimeField()
    end = models.DateTimeField()
    search_terms = models.CharField(max_length=200, null=True, blank=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        pass