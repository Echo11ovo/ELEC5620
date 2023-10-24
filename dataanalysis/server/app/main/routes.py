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
from app.services.query import queryData, displayData

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

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": True, "message": "Registered successfully!"})
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        print("Error while registering:", str(e))  # Print the error
        return jsonify({"success": False, "message": "Error during registration!"}), 500


@main.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"success": False, "message": "User not found!"}), 404

    if not user.check_password(password):
        return jsonify({"success": False, "message": "Invalid username or password!"}), 401

    try:
        response = {
            "success": True,
            "message": "Logged in successfully!",
            "userType": user.user_type  # Assuming user_type attribute exists in the User model
        }
        print(f"Sending response: {response}")
        return jsonify(response)
    except Exception as e:
        print("Error during login:", str(e))
        return jsonify({"success": False, "message": "Internal server error!"}), 500

@main.route('/api/chat', methods=['POST'])
def chat():
    # get user_message from frontend
    data = request.get_json()
    user_message = data.get('message', '')
    analysis_type = data.get('prompt','')
    print(data)
    input_file = './app/main\datafile.csv'
    # Data Analysis
    # process message
    prompt_type, user_message = dataAnalysis(user_message, analysis_type,input_file)

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
        #filename = secure_filename(file.filename)
        filename = 'datafile.csv'
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        print(file_path)
        print(filename)
        return jsonify({"message": "File successfully uploaded!"})

    return jsonify({"message": "Invalid file type"}), 400 

@main.route('/api/data-retrieval', methods=['POST'])
def data_retrieval():
    data = request.get_json()
    user_message = data.get('message', '')
    print(user_message)
    prompt_type, prompt = dataRetrieval(user_message)
    print(prompt_type, prompt)
    sql_query = apiCall(prompt_type, prompt)
    print(sql_query)
    headers, data_required = queryData(sql_query)
    formatted_data = displayData(headers, data_required)
    print(formatted_data)
    return jsonify(formatted_data)
