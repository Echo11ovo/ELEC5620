from flask import Flask, request, jsonify
# import flask_cors
from werkzeug.utils import secure_filename
import os
import openai

from apiConnection import apiCall
import processPrompt
import dbOperation

app = Flask(__name__)
# flask_cors.CORS(app, origins=["http://localhost:3000"])  # Allow cross-origin requests from localhost:3000

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize the OpenAI API with your API key
openai.api_key ='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'

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/chat', methods=['POST'])
def chat():
    # get user_message from frontend
    data = request.get_json()
    user_message = data.get('message', '')
    # get prompt_type from frontend
    # prompt_type = data.get('prompt_type', '')

    input_file = './uploads/output.csv'
    # Data Analysis
    # process message
    prompt_type, user_message = processPrompt.dataAnalysis(user_message, input_file)

    # call api and get response_message
    response_message = apiCall(prompt_type, user_message)

    # # Data Retrieval
    # prompt_type, user_message = processPrompt.dataRetrieval(user_message)
    # # Data Retrieval - query data from database
    # dbOperation.queryData(response_message)
    # # Data Retrieval - return dict data format to frontend
    # dataform = dbOperation.displayData(headers, dataRequired)
    # return json format data to frontend


    # return response_message to frontend
    return jsonify({"message": response_message})

@app.route('/api/upload', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True,host='localhost', port=3000)
