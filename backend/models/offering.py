from database.database import db


class Offering(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"), primary_key=True)
    term = db.Column(db.String, nullable=False, primary_key=True)
