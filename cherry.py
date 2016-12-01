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
class DateHelperWebService(object):


    @cherrypy.tools.accept(media='text/plain')
    def GET(self):
        return cherrypy.session['mystring']

    def POST(self, length=8):
        some_string = ''.join(random.sample(string.hexdigits, int(length)))
        cherrypy.session['mystring'] = some_string
        return some_string

    def PUT(self, another_string):
        cherrypy.session['mystring'] = another_string

    def DELETE(self):
        cherrypy.session.pop('mystring', None)

class Newsagents:

    exposed = True

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
            select count(ST_AsGeoJSON(st_transform(m.way, 4326))::json) from MHDtickets m
            """)
        num = cur.fetchone()
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
        for i in range(num[0]):
           data = cur.fetchone()
           listt.append(data[0])
        reply = json.dumps(listt)
        print(reply)
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
            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }

    cherrypy.tree.mount(
        Newsagents(), '/api/newsagents',
        {'/':
            {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
        }
    )

    webapp = DateHelper()
    webapp.generator = DateHelperWebService()

    cherrypy.quickstart(webapp, '/', conf)
