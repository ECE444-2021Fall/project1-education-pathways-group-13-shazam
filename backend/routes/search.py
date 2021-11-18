from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from models.course import Course

from utils.bcrypt import bcrypt

search = Blueprint("search", __name__)

@search.route("/", methods=["GET"])
def search_courses():
    query = request.args.get('query')
    results = Course.query.msearch('software',fields=['name'],limit=20)
    return '<h1>Hello search! query={}</h1>'.format(results)

