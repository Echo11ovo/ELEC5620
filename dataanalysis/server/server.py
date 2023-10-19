from flask import Flask, request, jsonify
# import flask_cors
from werkzeug.utils import secure_filename
import os
import openai

app = Flask(__name__)
# flask_cors.CORS(app, origins=["http://localhost:3000"])  # Allow cross-origin requests from localhost:3000

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize the OpenAI API with your API key
# openai.api_key =

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    prompt_messages=[{'role':'system', 'content':"Answer the question"},
                     {'role':'user', 'content': user_message}]
    
    # Interact with OpenAI API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=prompt_messages,
            max_tokens=200,
            temperature=0.9
        )
        response_message = response.choices[0].message['content'].strip()
        # return response from the ChatGPT API
        return jsonify({"message": response_message})
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

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
