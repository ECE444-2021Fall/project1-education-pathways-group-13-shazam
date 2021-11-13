from database.database import db


class SmartPrerequisite(db.Model):
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
    prereq = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
