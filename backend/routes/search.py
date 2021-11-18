from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from models.course import Course

from utils.bcrypt import bcrypt

search = Blueprint("search", __name__)

@search.route("/", methods=["GET"])
def search_courses():
    query = request.args.get('query')
    page = request.args.get('page')
    if query == None or query == '':
        if page == '' or page == None:
            results = Course.query.filter().limit(10).all()
        else:
            results = Course.query.filter().limit(10*int(page)).all()
    else:
        if page == '' or page == None:
            results = Course.query.filter(Course.name.like(query) | Course.description.like(f'%{query}%') |
            Course.code.like(query)).limit(10).all()
        else:
            results = Course.query.filter(Course.name.like(query) | Course.description.like(f'%{query}%') |
            Course.code.like(query)).limit(10*int(page)).all()

    if len(results) == 0:
        abort(HTTPStatus.BAD_REQUEST, "No course found")


    final = []
    for course in results:
        response = {
            "code": course.code,
            "name": course.name,
            "level": course.level,
            "division": course.division,
            "department": course.department,
            "description": course.description,
            "campus": course.campus,
            "utsc_breadth": course.utsc_breadth,
            "as_breadth": course.as_breadth,
            "as_distribution": course.as_distribution,
            "apsc_electives": course.apsc_electives,
            "utm_distribution": course.utm_distribution,
            "fase_available": course.fase_available,
            "maybe_restricted": course.maybe_restricted,
        }
        final.append(response)

    return jsonify(final)

