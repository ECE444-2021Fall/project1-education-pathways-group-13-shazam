from database.database import db


class MinorOutcome(db.Model):
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
    minor = db.Column(db.String, nullable=False, primary_key=True)
