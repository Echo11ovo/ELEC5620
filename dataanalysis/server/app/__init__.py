from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import secrets

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()  # Initialize JWTManager

def create_app():
    # Create a Flask application instance
    app = Flask(__name__)
    secret_key = secrets.token_hex(16)
    # Configure the application
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = 'uploads/'
    app.config['JWT_SECRET_KEY'] = secret_key  

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
