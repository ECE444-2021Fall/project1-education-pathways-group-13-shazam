from datetime import timedelta

from flask import Flask
from flask_cors import CORS

from database.config import db_url
from database.database import db, migrate
from routes.auth import auth
from routes.user import user
from utils.bcrypt import bcrypt
from utils.jwt import JWT_SECRET_KEY, jwt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url

CORS(app)

# Register routes
app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(auth, url_prefix="/auth")

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db, directory="database/migrations")
bcrypt.init_app(app)

# Initialize JWT
jwt.init_app(app)
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
