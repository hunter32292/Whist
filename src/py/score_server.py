#!/usr/bin/env python2

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import re
import json
import os.path
import argparse

# run ./score_server.py --help

# example POST:
# curl --request POST 'http://localhost:8000/submit' --data '[{"name":"luigi","score":5},{"name":"flock of geese","score":12}]'

# example GET:
# whatever:port/getgames/3
# or
# whatever:port/getgames/all

class ScoreServerHTTPRequestHandler(BaseHTTPRequestHandler):
    def send_404(self):
        self.send_response(404)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write('{} not recognized'.format(self.path))
    def do_GET(self):
        match = re.search('^/getgames/(?P<games>all|[0-9]+)$', self.path)
        if match is not None:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            results = []
            if match.group('games') == 'all':
                results = reversed(self.server.store)
            else:
                number = int(match.group('games')) * -1
                results = reversed(self.server.store[number:])
            self.wfile.write(json.dumps(tuple(results)))
        else:
            self.send_404()
        return
    def do_POST(self):
        if self.path == '/submit':
            length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(length))
            if len(data) is not 2:
                # panic
                self.send_reponse(400)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write('lol nope')
            else:
                self.server.store.append(tuple(data))
                self.send_response(201)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write('ok')
        else:
            self.send_404()

class ScoreServer(HTTPServer):
    def __init__(self, server_address):
        self.store = []
        HTTPServer.__init__(self, server_address, ScoreServerHTTPRequestHandler)
    def load(self, filename):
        with open(filename, 'r') as file:
            self.store = json.load(file)
            print 'loaded {} records from {}'.format(len(self.store), file.name)
    def save(self, filename):
        with open(filename, 'w') as file:
            json.dump(self.store, file)
            print 'saved {} records as {}'.format(len(self.store), file.name)

if __name__ == '__main__':

    def valid_port(string):
        port = int(string)
        if port not in range(0, 65535):
            msg = '{} is not a valid port'.format(string)
            raise argparse.ArgumentTypeError(msg)
        return port
    
    parser = argparse.ArgumentParser(description='options for score server', prog='score_server.py')
    parser.add_argument('-p', '--port', type=valid_port, default=8000)
    parser.add_argument('-f', '--file', default=None)
    args = parser.parse_args()
    httpd = ScoreServer(('', args.port))
    if args.file and os.path.isfile(args.file) and os.path.getsize(args.file) > 0:
            httpd.load(args.file)
    try:
        print "serving at port", args.port
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        if args.file is not None:
            httpd.save(args.file)
        print "shutting down"
        httpd.socket.close()

