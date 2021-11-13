from database.database import db


class Corequisite(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
    coreq = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
