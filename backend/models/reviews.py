from database.database import db


class Reviews(db.Model):
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
    email = db.Column(db.String, db.ForeignKey("user.email"), primary_key=True)
    date = db.Column(db.String)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
