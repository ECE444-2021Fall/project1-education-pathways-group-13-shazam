from flask import Flask

from database.config import db_url
from database.database import db, migrate
from routes.user import user
from utils.bcrypt import bcrypt

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url

# Register routes
app.register_blueprint(user, url_prefix="/user")

db.init_app(app)
migrate.init_app(app, db, directory="database/migrations")

bcrypt.init_app(app)
