from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from flask_jwt_extended import current_user, jwt_required
from models.user import User

user = Blueprint("user", __name__)


@user.route("/", methods=["POST"])
def create_user():
    user_data = request.get_json()

    # Make sure all required fields are present
    required_fields = ["first_name", "last_name", "email", "password"]
    missing_fields = [field for field in required_fields if field not in user_data]
    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")

    # Make sure email is unique
    existing_user = User.query.filter_by(email=user_data["email"]).one_or_none()
    if existing_user:
        abort(HTTPStatus.BAD_REQUEST, "User with that email already exists")

    # Hash password
    hashed_password = User.hash_password(user_data["password"])

    # Create user
    new_user = User(
        first_name=user_data["first_name"],
        last_name=user_data["last_name"],
        email=user_data["email"],
        password=hashed_password,
    )
    db.session.add(new_user)
    db.session.commit()

    return Response(status=HTTPStatus.CREATED)


@user.route("/", methods=["GET"])
@jwt_required()
def get_authenticated_user():
    return jsonify(
        {
            "email": current_user.email,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
        }
    )
