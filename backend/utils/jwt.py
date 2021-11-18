import os

from dotenv.main import load_dotenv
from flask_jwt_extended import JWTManager

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager()
