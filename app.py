from flask import *

app = Flask(__name__, static_url_path='/static')

homeRoute="/eggview"

@app.route(homeRoute+'/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)

if(__name__ == "__main__"):
    app.run(host='0.0.0.0')
