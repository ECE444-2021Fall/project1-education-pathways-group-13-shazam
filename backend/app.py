from datetime import timedelta
from re import search

from flask import Flask, Response, request
from flask_cors import CORS

from database.config import Config
from database.database import db, migrate
from routes.auth import auth
from routes.user import user
from routes.reviews import reviews
from routes.course import course
from routes.search import search
from models.course import Course
from utils.bcrypt import bcrypt
from utils.jwt import JWT_SECRET_KEY, jwt
from utils.search import search as se

app = Flask(__name__)
app.config.from_object('database.config.Config')

CORS(app, supports_credentials=True)

# Register routes
app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(reviews, url_prefix="/reviews")
app.register_blueprint(course, url_prefix="/course")
app.register_blueprint(search, url_prefix="/search")

# Initialize extensions
db.init_app(app)
se.init_app(app)

migrate.init_app(app, db, directory="database/migrations")
bcrypt.init_app(app)

# Initialize JWT
jwt.init_app(app)
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_CSRF_IN_COOKIES"] = False
