from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# Initialize extensions
db = SQLAlchemy()


def create_app():
    # Create a Flask application instance
    app = Flask(__name__)

    # Configure the application
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = './app/main'

    # Initialize extensions for this app
    db.init_app(app)

    # Import and register blueprints
    from app.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    with app.app_context():
        db.create_all()

    CORS(app)    
    return app
