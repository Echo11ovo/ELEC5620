from flask import jsonify, request
from werkzeug.utils import secure_filename
import os
import openai
from app.models.user import User
from app import db
from app.services.api_connection import apiCall
from app.services.processPrompt import dataAnalysis, dataRetrieval
from app.main.utils import allowed_file
from app.main import main
from flask import current_app as app

from app.main.constants import ALLOWED_EXTENSIONS

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'}


@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('userType')

    # Check if user already exists
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"success": False, "message": "Username already taken!"}), 400

    # Create new user
    new_user = User(username=username, user_type=user_type)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "Registered successfully!"})


@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "message": "Invalid username or password!"}), 401

    # Here you can add JWT or session-based authentication for logged-in users.
    return jsonify({"success": True, "message": "Logged in successfully!"})


@main.route('/api/chat', methods=['POST'])
def chat():
    # get user_message from frontend
    data = request.get_json()
    user_message = data.get('message', '')

    input_file = '.../uploads/output.csv'
    # Data Analysis
    # process message
    prompt_type, user_message = dataAnalysis(user_message, input_file)

    # call api and get response_message
    response_message = apiCall(prompt_type, user_message)

    # return response_message to frontend
    return jsonify({"message": response_message})


@main.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return jsonify({"message": "File successfully uploaded!"})

    return jsonify({"message": "Invalid file type"}), 400
