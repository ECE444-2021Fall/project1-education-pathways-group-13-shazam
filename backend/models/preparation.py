from database.database import db


class Preparation(db.Model):
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
    recommended_preparation = db.Column(
        db.String, db.ForeignKey("course.code"), primary_key=True
    )
