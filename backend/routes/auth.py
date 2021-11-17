from http import HTTPStatus

from flask import Blueprint, abort, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    current_user,
    get_csrf_token,
    jwt_required,
    set_access_cookies,
    set_refresh_cookies,
)
from models.user import User
from utils.jwt import jwt

auth = Blueprint("auth", __name__)


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.email


@jwt.user_lookup_loader
def user_lookup_callback(_, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(email=identity).one_or_none()


@auth.route("/login", methods=["POST"])
def login():
    login_data = request.get_json()

    required_fields = ["email", "password"]
    missing_fields = [field for field in required_fields if field not in login_data]
    if missing_fields:
        abort(HTTPStatus.UNAUTHORIZED, f"Missing fields: {missing_fields}")

    # Check that user exists in database
    db_user = User.query.filter_by(email=login_data["email"]).one_or_none()
    if not db_user:
        abort(HTTPStatus.UNAUTHORIZED, "Invalid credentials")

    # Check that password is correct
    if not db_user.validate_password(login_data["password"]):
        abort(HTTPStatus.UNAUTHORIZED, "Invalid credentials")

    # Generate tokens
    access_token = create_access_token(identity=db_user)
    refresh_token = create_refresh_token(identity=db_user)

    access_csrf_token = get_csrf_token(access_token)
    refresh_csrf_token = get_csrf_token(refresh_token)

    # Set cookies
    response = jsonify(
        {
            "email": db_user.email,
            "first_name": db_user.first_name,
            "last_name": db_user.last_name,
            "access_csrf_token": access_csrf_token,
            "refresh_csrf_token": refresh_csrf_token,
        }
    )
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response, HTTPStatus.OK


@auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    access_token = create_access_token(identity=current_user)
    access_csrf_token = get_csrf_token(access_token)
    response = jsonify({"msg": "ok", "access_csrf_token": access_csrf_token})
    set_access_cookies(response, access_token)
    return response, HTTPStatus.OK


@auth.route("/logout", methods=["POST"])
@jwt_required
def logout():
    response = jsonify({"msg": "ok"})
    set_access_cookies(response, "")
    set_refresh_cookies(response, "")
    return response, HTTPStatus.OK
