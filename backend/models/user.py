from database.database import db
from utils.bcrypt import bcrypt


class User(db.Model):
    email = db.Column(db.String, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def validate_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    @staticmethod
    def hash_password(password):
        return bcrypt.generate_password_hash(password).decode("utf-8")
