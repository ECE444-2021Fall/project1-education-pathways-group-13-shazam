from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from flask_jwt_extended import current_user, jwt_required
from models.cart import Cart
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


@user.route("/cart", methods=["GET"])
@jwt_required()
def get_cart():
    cart_contents = Cart.query.filter_by(user=current_user.email).all()
    cart_items = [item.course for item in cart_contents]
    return jsonify({"courses": cart_items})


@user.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    course_data = request.get_json()
    if "code" not in course_data:
        abort(HTTPStatus.BAD_REQUEST, "Missing course code")

    course = Course.query.filter_by(code=course_data["code"]).one_or_none()
    if not course:
        abort(HTTPStatus.BAD_REQUEST, "Course not found")

    # Don't do anything if course is already in the user's cart
    cart_course = Cart.query.filter_by(
        user=current_user.email, course=course.code
    ).one_or_none()
    if cart_course:
        return Response(status=HTTPStatus.OK)

    # Add course to cart
    new_cart_item = Cart(user=current_user.email, course=course)
    db.session.add(new_cart_item)
    db.session.commit()

    return Response(status=HTTPStatus.CREATED)


@user.route("/cart", methods=["DELETE"])
@jwt_required()
def remove_from_cart():
    course_data = request.get_json()
    if "code" not in course_data:
        abort(HTTPStatus.BAD_REQUEST, "Missing course code")

    cart_course = Cart.query.filter_by(
        user=current_user.email, course=course_data["code"]
    ).one_or_none()
    if not cart_course:
        return Response(status=HTTPStatus.OK)

    # Add course to cart
    db.session.delete(cart_course)
    db.session.commit()

    return Response(status=HTTPStatus.OK)
