from database.database import db


class Preparation(db.Model):
    course = db.Column(db.String, db.ForeignKey("Course.code"))
    recommended_preparation = db.Column(db.String, db.ForeignKey("Course.code"))
