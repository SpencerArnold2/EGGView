from flask import *

app = Flask(__name__)

homeRoute="/eggview"
@app.route(homeRoute+'/', methods=['GET'])
def index():
	return app.send_static_file("html/index.html")


if(__name__ == "__main__"):
    app.run()
