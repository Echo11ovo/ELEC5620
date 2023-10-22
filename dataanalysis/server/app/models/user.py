from app.models import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)   # A unique identifier for each user.
    username = db.Column(db.String(80), unique=True, nullable=False)  # The user's chosen username. It must be unique.
    password_hash = db.Column(db.String(120), nullable=False)         # The hashed version of the user's password.
    user_type = db.Column(db.String(80), nullable=False)              # The type of user, e.g., Customer, Merchant, Data Analyst.

    # Method to set the hashed version of the provided password.
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to verify if the provided password matches the hashed version stored in the database.
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
