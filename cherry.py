import os, os.path
import random
import string
import psycopg2
import json
import cherrypy


class DateHelper(object):
    @cherrypy.expose
    def index(self):
        return open('index.html')


@cherrypy.expose
class Newsagents(object):

    def GET(self):
        conn = psycopg2.connect("dbname=gisproject user=floofy")
        cur = conn.cursor()
        cur.execute("""
            with MHDtickets as (
            select name, amenity, shop, way from planet_osm_polygon
            where shop = 'newsagent'
            union
            select name, amenity, shop, way from planet_osm_point
            where shop = 'newsagent')
            select ST_AsGeoJSON(st_transform(m.way, 4326))::json from MHDtickets m
            """)
        listt = []
        while True:
            row = cur.fetchone()
            if row == None:
                break
            else:
                listt.append(row[0])
                print("%s" % row[0]) 
        reply = json.dumps(listt)
        return reply 


@cherrypy.expose
class Supermarkets(object):

    def GET(self):
        conn = psycopg2.connect("dbname=gisproject user=floofy")
        cur = conn.cursor()
        cur.execute("""
            with supermarkets as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'supermarket'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'supermarket')
            select ST_AsGeoJSON(st_transform(s.way, 4326))::json from supermarkets s
            """)
        listt = []
        while True:
            row = cur.fetchone()
            if row == None:
                break
            else:
                listt.append(row[0])
                print("%s" % row[0]) 
        reply = json.dumps(listt)
        return reply 


@cherrypy.expose
class Flowers(object):

    def GET(self):
        conn = psycopg2.connect("dbname=gisproject user=floofy")
        cur = conn.cursor()
        cur.execute("""
            with flowers as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'florist'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'florist')
            select ST_AsGeoJSON(st_transform(f.way, 4326))::json from flowers f
            """)
        listt = []
        while True:
            row = cur.fetchone()
            if row == None:
                break
            else:
                listt.append(row[0])
                print("%s" % row[0]) 
        reply = json.dumps(listt)
        return reply 


@cherrypy.expose
class Gas(object):

    def GET(self):
        conn = psycopg2.connect("dbname=gisproject user=floofy")
        cur = conn.cursor()
        cur.execute("""
            with gas as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'fuel'
                union
                select name, amenity, shop, way from planet_osm_point
                where amenity = 'fuel')
            select ST_AsGeoJSON(st_transform(g.way, 4326))::json from gas g
            """)
        listt = []
        while True:
            row = cur.fetchone()
            if row == None:
                break
            else:
                listt.append(row[0])
                print("%s" % row[0]) 
        reply = json.dumps(listt)
        return reply 



@cherrypy.expose
class Parks(object):

    def GET(self):
        conn = psycopg2.connect("dbname=gisproject user=floofy")
        cur = conn.cursor()
        cur.execute("""
        with walkpaths as (
            select name, way, highway from public.planet_osm_line
	    where highway = 'path'
	    or highway = 'footway'
	),
        forests as (
	    select name, way, leisure from public.planet_osm_polygon
	    where leisure = 'park'
	)
        select ST_AsGeoJSON(ST_Transform(f.way, 4326))::json from walkpaths p, forests f
        where st_intersects(p.way, f.way)
            """)
        listt = []
        while True:
            row = cur.fetchone()
            if row == None:
                break
            else:
                listt.append(row[0])
                print("%s" % row[0]) 
        reply = json.dumps(listt)
        return reply 


cherrypy.tree.mount(
    Newsagents(), '/api/newsagents',
    {'/':
        {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
    }
)

cherrypy.tree.mount(
    Supermarkets(), '/api/supermarkets',
    {'/':
        {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
    }
)

cherrypy.tree.mount(
    Flowers(), '/api/flowers',
    {'/':
        {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
    }
)

cherrypy.tree.mount(
    Gas(), '/api/gas',
    {'/':
        {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
    }
)

cherrypy.tree.mount(
    Parks(), '/api/parks',
    {'/':
        {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
    }
)


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }

    webapp = DateHelper()

    cherrypy.quickstart(webapp, '/', conf)
