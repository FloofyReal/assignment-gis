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


class Api(object):

    exposed = True
    conn = psycopg2.connect("dbname=gisproject user=floofy")

    def POST(self, item, lng, lat, distance):
        cur = conn.cursor()

        if distance == "":
            distance = 500
        else: distance = str(distance)


        if item == "newsagent":
            cur.execute("""
                with MHDtickets as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'newsagent'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'newsagent')
                select ST_AsGeoJSON(ST_Transform(m.way, 4326))::json as way from MHDtickets m
                """)
        elif item == "supermarket":
            cur.execute("""
                with supermarket as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'supermarket'
                or shop = 'convenience'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'supermarket'
                or shop = 'convenience')
                select ST_AsGeoJSON(ST_Transform(s.way, 4326))::json as way from supermarket s
                """)
        elif item == "flowers":
            cur.execute("""
                with flowers as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'florist'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'florist')
                select ST_AsGeoJSON(ST_Transform(f.way, 4326))::json as way from flowers f
                """)
        elif item == "gas_station":
            cur.execute("""
                with gas as (
                select name, amenity, shop, way from planet_osm_polygon
                where shop = 'fuel'
                union
                select name, amenity, shop, way from planet_osm_point
                where shop = 'fuel')
                select ST_AsGeoJSON(ST_Transform(g.way, 4326))::json as way from gas g
                """)
        elif item == "park_paths":
            cur.execute("""
                with walkpaths as (
                        select name, way, highway from public.planet_osm_line
                        where highway = 'path'
                        or highway = 'footway'
                        ),
                forests as (
                        select name, way, leisure from public.planet_osm_polygon
                        WHERE leisure = 'park'
                        )
                select ST_AsGeoJSON(ST_Transform(f.way, 4326))::json from walkpaths p, forests f
                where st_intersects(p.way, f.way)
                """)


        data = cur.fetchall()
        reply = json.dumps(data)
        return reply 

    def GET(self):
        with open('/tmp/t.json') as data_f:
            data  = json.load(data_f)
            reply = json.dumps(data)
        return reply 


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/generator': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }

    cherrypy.tree.mount(
        Api(), '/api/',
        {'/':
            {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
        }
    )

    webapp = DateHelper()

    cherrypy.quickstart(webapp, '/', conf)
