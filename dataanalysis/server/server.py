# 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
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import openai

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow cross-origin requests from localhost:3000

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


openai.api_key = 'tst'

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Interact with OpenAI API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are an data analyst that analyze data and give insights based on question and provided data."},   
                      {"role": "user", "content": user_message}],
            max_tokens=150,
            temperature=0.2
        )
        response_message = response.choices[0].message['content'].strip()
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
    app.run(debug=True)
