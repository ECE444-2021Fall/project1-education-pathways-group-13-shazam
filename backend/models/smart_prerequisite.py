from database.database import db


class SmartPrerequisite(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    prereq = db.Column(db.String, db.ForeignKey("Course.code"))
