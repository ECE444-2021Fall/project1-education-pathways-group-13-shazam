from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from models.user import User
from models.reviews import Reviews
from datetime import datetime

reviews = Blueprint("reviews", __name__)

reviewList = [
    {
        "rating": 6,
        "date": "2021-09-08",
        "author": "Daniel Liang",
        "comment": "A message from me!",
        "user": "someone0@example.com"
    },
    {
        "rating": 9,
        "date": "2021-09-28",
        "author": "Some One",
        "comment":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "user": "someone00@example.com"
    },
    {
        "rating": 7,
        "date": "2021-11-07",
        "author": "Who This",
        "comment": "This is the third review.",
        "user": "someone1@example.com"
    }
]

@reviews.route("/", methods=["POST"])
def create_review():
    data = request.get_json()
    required_fields = ["course", "rating", "user", "comment"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")
    
    #reviewer = db.session.query(User).filter_by(email=data["user"]).first()
    reviewer = "temp"
    if reviewer == None:
        abort(HTTPStatus.BAD_REQUEST, "Non existant user")
    #author = reviewer.first_name + ' ' + reviewer.last_name
    author = "TEMP"
    reviewList.append({
        "rating": int(data["rating"]),
        "date": datetime.today().strftime("%Y-%m-%d %H:%M"),
        "author": author,
        "comment": data["comment"],
        "user": "someone@example.com"
    })
    return Response(status=HTTPStatus.CREATED)

@reviews.route("/", methods=["DELETE"])
def delete_review():
    data = request.get_json()
    required_fields = ["course", "user"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")

    return Response(status=HTTPStatus.OK)


@reviews.route("/<code>", methods=["GET"])
def get_review(code):
    #db.session.query(Reviews)
    if code == "ECE444H1":
        return jsonify(reviewList)
    else:
        return jsonify([])
