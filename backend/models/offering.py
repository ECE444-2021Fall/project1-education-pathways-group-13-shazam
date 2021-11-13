from database.database import db


class Offering(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    term = db.Column(db.String)
