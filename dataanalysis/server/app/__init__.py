from flask import Flask
from flask_restful import Api

from app.auth import Register, Login

def create_app():
    app = Flask(__name__)
    api = Api(app)

    api.add_resource(Register, '/api/register')
    api.add_resource(Login, '/api/login')

    return app
