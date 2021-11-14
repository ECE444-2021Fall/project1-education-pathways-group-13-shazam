from database.database import db


class Course(db.Model):
    code = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    level = db.Column(db.Integer)
    division = db.Column(db.String)
    department = db.Column(db.String)
    description = db.Column(db.String)
    campus = db.Column(db.String)
    utsc_breadth = db.Column(db.String)
    as_breadth = db.Column(db.String)
    as_distribution = db.Column(db.String)
    apsc_electives = db.Column(db.String)
    utm_distribution = db.Column(db.String)
    fase_available = db.Column(db.Boolean)
    maybe_restricted = db.Column(db.Boolean)
