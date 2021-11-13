from database.database import db


class MajorOutcome(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    major = db.Column(db.String, nullable=False)
