from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from models.user import User
from utils.bcrypt import bcrypt

user = Blueprint("user", __name__)


@user.route("/", methods=["POST"])
def create_user():
    user_data = request.get_json()

    # Make sure all required fields are present
    required_fields = ["name", "email", "password"]
    missing_fields = []

    for field in required_fields:
        if field not in user_data:
            missing_fields.append(field)

    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")

    # Make sure email is unique
    existing_user = User.query.filter_by(email=user_data["email"]).first()
    if existing_user:
        abort(HTTPStatus.BAD_REQUEST, "User with that email already exists")

    # Hash password
    hashed_password = bcrypt.generate_password_hash(user_data["password"]).decode(
        "utf-8"
    )

    # Create user
    new_user = User(
        name=user_data["name"],
        email=user_data["email"],
        password=hashed_password,
    )
    db.session.add(new_user)
    db.session.commit()

    return Response(status=HTTPStatus.CREATED)
