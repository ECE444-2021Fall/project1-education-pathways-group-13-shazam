from pickle import load
from flask import Flask,request

from database.config import Config
from database.database import db, migrate
from routes.user import user
from routes.search import search
from utils.bcrypt import bcrypt
from utils.search import search as se
from models.course import Course

app = Flask(__name__)
app.config.from_object('database.config.Config')

# Register routes
app.register_blueprint(user, url_prefix="/user")
# app.register_blueprint(search, url_prefix="/search")

# @app.route("/")
# def index():
#     return '<h1>Hello World!</h1>{}'.format(app.config["MSEARCH_INDEX_NAME"])

# Initialize extensions
db.init_app(app)
se.init_app(app)

@app.route("/")
def search_courses():
    query = request.args.get('query')
    results = se.msearch(Course, query="soft", fields=['code', 'name', 'description'], limit=10)
    return '<h1>Hello search! query={}</h1>'.format(results)

migrate.init_app(app, db, directory="database/migrations")
bcrypt.init_app(app)
