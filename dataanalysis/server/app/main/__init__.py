from flask import Blueprint
from flask_cors import CORS

main = Blueprint('main', __name__)
CORS(main)  # 允许这个 blueprint 接受所有来源的请求

from . import routes
