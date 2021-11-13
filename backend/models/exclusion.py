from database.database import db


class Exclusion(db.Model):
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
    exclusion = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
