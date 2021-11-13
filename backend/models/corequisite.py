from database.database import db


class Corequisite(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    coreq = db.Column(db.String, db.ForeignKey("Course.code"))
