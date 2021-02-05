from flask import Flask, render_template, request
import json
import _thread

app = Flask(__name__)



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about/index.html")

@app.route("/games")
def games():
    return render_template("games/index.html")

@app.route("/news")
def news():
    return render_template("news/index.html")

@app.route("/news/news.html")
def newsPage():
    id = request.args.get('id')
    return render_template("news/news.html")

@app.route("/timeline")
def timeline():
    return render_template("timeline/index.html")


if __name__ == "__main__":
    # _thread.start_new_thread(pygame_start, ())
    app.run(host='0.0.0.0',port=5000,ssl_context=('cert.pem', 'key.pem'))
    
    
