from app import db
from werkzeug.security import generate_password_hash, check_password_hash


# Define the User model.
# This represents the structure of our "users" table in the database.
class User(db.Model):
    # Define columns for the user table.
    # A unique identifier for each user.
    id = db.Column(db.Integer, primary_key=True)
    # The user's chosen username. It must be unique.
    username = db.Column(db.String(80), unique=True, nullable=False)
    # The hashed version of the user's password.
    password_hash = db.Column(db.String(120), nullable=False)
    # The type of user, e.g., Customer, Merchant, Data Analyst.
    user_type = db.Column(db.String(80), nullable=False)

    # Method to set the hashed version of the provided password.
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to verify if the provided password matches the hashed version stored in the database.
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# This line will create all the necessary database tables.
# Note: It's better to manage database migrations with tools like Flask-Migrate in a production scenario.
db.create_all()
