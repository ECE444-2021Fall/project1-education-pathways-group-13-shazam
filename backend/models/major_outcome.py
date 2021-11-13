from database.database import db


class MajorOutcome(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
    major = db.Column(db.String, nullable=False, primary_key=True)
