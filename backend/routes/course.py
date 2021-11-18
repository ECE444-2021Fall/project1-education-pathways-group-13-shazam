from http import HTTPStatus

from database.database import db
from flask import Blueprint, Response, abort, request
from flask.json import jsonify
from models.course import Course
from models.prerequisite import Prerequisite
from models.corequisite import Corequisite
from models.exclusion import Exclusion
from models.preparation import Preparation
from models.offering import Offering
from models.major_outcome import MajorOutcome
from models.minor_outcome import MinorOutcome

course = Blueprint("course", __name__)


@course.route("/<code>", methods=["GET"])
def get_course(code):
    course = Course.query.filter_by(code=code).first()
    if course == None:
        abort(HTTPStatus.BAD_REQUEST, "Course does not exist")
        
    prerequisites = [i[0] for i in Prerequisite.query.filter_by(course=code).with_entities(Prerequisite.prereq).all()]
    prerequisitesFor = [i[0] for i in Prerequisite.query.filter_by(prereq=code).with_entities(Prerequisite.course).all()]
    corequisites = [i[0] for i in Corequisite.query.filter_by(course=code).with_entities(Corequisite.coreq).all()]
    exclusions = [i[0] for i in Exclusion.query.filter_by(course=code).with_entities(Exclusion.exclusion).all()]
    preparations = [i[0] for i in Preparation.query.filter_by(course=code).with_entities(Preparation.recommended_preparation).all()]
    offerings = [i[0] for i in Offering.query.filter_by(course=code).with_entities(Offering.term).all()]
    majors = [i[0] for i in MajorOutcome.query.filter_by(course=code).with_entities(MajorOutcome.major).all()]
    minors = [i[0] for i in MinorOutcome.query.filter_by(course=code).with_entities(MinorOutcome.minor).all()]
        
    response = {
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
        "prerequisites": prerequisites,
        "prerequisites_for": prerequisitesFor,
        "corequisites": corequisites,
        "exclusions": exclusions,
        "preparations": preparations,
        "offerings": offerings,
        "majors": majors,
        "minors": minors
    }
    
    return jsonify(response)
