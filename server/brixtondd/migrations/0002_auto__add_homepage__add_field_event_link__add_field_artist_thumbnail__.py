# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Homepage'
        db.create_table('brixtondd_homepage', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True, null=True)),
            ('sponsor_image', self.gf('django.db.models.fields.files.FileField')(max_length=100, blank=True, null=True)),
            ('sponsor_text', self.gf('django.db.models.fields.TextField')(blank=True, null=True)),
            ('daily_image', self.gf('django.db.models.fields.files.FileField')(max_length=100, blank=True, null=True)),
            ('added', self.gf('django.db.models.fields.DateTimeField')(blank=True, auto_now_add=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(blank=True, auto_now=True)),
        ))
        db.send_create_signal('brixtondd', ['Homepage'])

        # Adding field 'Event.link'
        db.add_column('brixtondd_event', 'link',
                      self.gf('django.db.models.fields.URLField')(max_length=200, blank=True, null=True),
                      keep_default=False)

        # Adding field 'Artist.thumbnail'
        db.add_column('brixtondd_artist', 'thumbnail',
                      self.gf('django.db.models.fields.files.FileField')(max_length=100, blank=True, null=True),
                      keep_default=False)

        # Adding field 'Artist.link'
        db.add_column('brixtondd_artist', 'link',
                      self.gf('django.db.models.fields.URLField')(max_length=200, blank=True, null=True),
                      keep_default=False)

        # Adding field 'Venue.link'
        db.add_column('brixtondd_venue', 'link',
                      self.gf('django.db.models.fields.URLField')(max_length=200, blank=True, null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting model 'Homepage'
        db.delete_table('brixtondd_homepage')

        # Deleting field 'Event.link'
        db.delete_column('brixtondd_event', 'link')

        # Deleting field 'Artist.thumbnail'
        db.delete_column('brixtondd_artist', 'thumbnail')

        # Deleting field 'Artist.link'
        db.delete_column('brixtondd_artist', 'link')

        # Deleting field 'Venue.link'
        db.delete_column('brixtondd_venue', 'link')


    models = {
        'brixtondd.artist': {
            'Meta': {'object_name': 'Artist'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'link': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'photo': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'search_terms': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'thumbnail': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'})
        },
        'brixtondd.artwork': {
            'Meta': {'object_name': 'Artwork'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'artist': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'artworks'", 'symmetrical': 'False', 'to': "orm['brixtondd.Artist']"}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'photo': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'search_terms': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'})
        },
        'brixtondd.event': {
            'Meta': {'object_name': 'Event'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'artists': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'events'", 'symmetrical': 'False', 'to': "orm['brixtondd.Artist']"}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'end': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'link': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'search_terms': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'start': ('django.db.models.fields.DateTimeField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'}),
            'venue': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'events'", 'to': "orm['brixtondd.Venue']"})
        },
        'brixtondd.homepage': {
            'Meta': {'object_name': 'Homepage'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'daily_image': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'sponsor_image': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'sponsor_text': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'})
        },
        'brixtondd.venue': {
            'Meta': {'object_name': 'Venue'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'address': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {'blank': 'True', 'null': 'True'}),
            'link': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'lng': ('django.db.models.fields.FloatField', [], {'blank': 'True', 'null': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'photo': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'blank': 'True', 'null': 'True'}),
            'search_terms': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'}),
            'zone': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'venues'", 'to': "orm['brixtondd.Zone']"})
        },
        'brixtondd.zone': {
            'Meta': {'object_name': 'Zone'},
            'added': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now_add': 'True'}),
            'colourCode': ('django.db.models.fields.CharField', [], {'max_length': '6'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'polyline': ('django.db.models.fields.TextField', [], {'blank': 'True', 'null': 'True'}),
            'search_terms': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True', 'null': 'True'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'})
        }
    }

    complete_apps = ['brixtondd']