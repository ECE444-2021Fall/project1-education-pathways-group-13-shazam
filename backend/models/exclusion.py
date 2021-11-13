from database.database import db


class Exclusion(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
    exclusion = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
