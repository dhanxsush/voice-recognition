from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
from threading import Timer

def open_browser():
    webbrowser.open('http://localhost:8000')

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
    Timer(1, open_browser).start()
    print("Server started at http://localhost:8000")
    server.serve_forever()