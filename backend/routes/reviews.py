from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from flask_jwt_extended import current_user, jwt_required
from models.user import User
from models.reviews import Reviews
from models.course import Course
from datetime import datetime

reviews = Blueprint("reviews", __name__)

@reviews.route("/", methods=["POST"])
@jwt_required()
def create_review():
    data = request.get_json()
    required_fields = ["course", "rating", "comment"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")
        
    if Reviews.query.filter_by(course=data["course"], user=current_user.email).one_or_none():
        abort(HTTPStatus.BAD_REQUEST, "User already reviewed this course")
    
    if Course.query.filter_by(code=data["course"]).first() == None:
        abort(HTTPStatus.BAD_REQUEST, "Non-existant course")
    
    newReview = Reviews(
        course=data["course"],
        user=current_user.email,
        date=datetime.today().strftime("%Y-%m-%d %H:%M"),
        rating=int(data["rating"]),
        comment=data["comment"]
    )
    db.session.add(newReview)
    db.session.commit()
    
    return Response(status=HTTPStatus.CREATED)

@reviews.route("/", methods=["DELETE"])
@jwt_required()
def delete_review():
    data = request.get_json()
    required_fields = ["course"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        abort(HTTPStatus.BAD_REQUEST, f"Missing fields: {missing_fields}")
    
    review = Reviews.query.filter_by(course=data["course"], user=current_user.email).first()
    if review == None:
        abort(HTTPStatus.BAD_REQUEST, "Non-existant review")
    
    db.session.delete(review)
    db.session.commit()

    return Response(status=HTTPStatus.OK)

@reviews.route("/<code>", methods=["GET"])
def get_review(code):
    reviewList = []
    for review in Reviews.query.filter_by(course=code).order_by(Reviews.date.desc()).all():
        author = User.query.filter_by(email=review.user).first()
        reviewList.append({
            "user": review.user,
            "rating": review.rating,
            "date": review.date,
            "author": author.first_name + ' ' + author.last_name,
            "comment": review.comment
        })

    return jsonify(reviewList)
