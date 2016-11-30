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

    conn = psycopg2.connect("dbname=gisproject user=floofy")

    cur = conn.cursor()
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
    webapp = DateHelper()
    webapp.generator = DateHelperWebService()
    cherrypy.quickstart(webapp, '/', conf)
