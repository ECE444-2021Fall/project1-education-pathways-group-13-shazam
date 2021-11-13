from database.database import db


class MinorOutcome(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    minor = db.Column(db.String, nullable=False)
