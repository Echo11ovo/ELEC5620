from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()  # Initialize JWTManager

def create_app():
    # Create a Flask application instance
    app = Flask(__name__)

    # Configure the application
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = 'uploads/'
    app.config['JWT_SECRET_KEY'] = 'b43318f0864d1a016531749c2f293cf3'  # Add JWT Secret Key. Make sure to change this to a secure value.

    # Initialize extensions for this app
    db.init_app(app)
    jwt.init_app(app)  # Initialize JWT for this app

    # Import and register blueprints
    from app.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    with app.app_context():
        db.create_all()

    CORS(app)
    return app
