from database.database import db


class Cart(db.Model):
    user = db.Column(db.String, db.ForeignKey("user.email"), primary_key=True)
    course = db.Column(db.String, db.ForeignKey("course.code"), primary_key=True)
