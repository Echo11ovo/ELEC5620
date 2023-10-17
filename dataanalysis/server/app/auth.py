from flask import request, jsonify
from flask_restful import Resource
import bcrypt
import jwt
from pymongo import MongoClient

# 数据库连接
client = MongoClient('localhost', 27017)
db = client['your_database_name']
users = db['users']

SECRET_KEY = 'your_secret_key'  # 你应该使用一个安全的方式来存储这个 key

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password'].encode('utf-8')

        # 检查用户名是否已存在
        if users.find_one({"username": username}):
            return {"error": "Username already exists"}, 400

        hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        users.insert({"username": username, "password": hashed})

        return {"message": "User registered successfully"}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password'].encode('utf-8')

        user = users.find_one({"username": username})

        if user and bcrypt.checkpw(password, user['password']):
            token = jwt.encode({"username": username}, SECRET_KEY, algorithm='HS256')
            return {"token": token}, 200

        return {"error": "Invalid credentials"}, 400
