import json
from datetime import datetime

from flask import Flask, request
from flask_cors import CORS
import pymysql.cursors
import sys

app = Flask(__name__)
CORS(app)
conn = None


def connect_db():
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='Me@mysql123',
                                 db='akamai',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection


def get_conn():
    global conn
    if conn is None:
        conn = connect_db()
    return conn


@app.route('/hotel', methods=['GET'])
def get_hotels():
    connection = get_conn()
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM listings"
                cursor.execute(sql)
                values = cursor.fetchall()
                connection.commit()
        except:
            print("Mysql Error")
        return json.dumps(values)
    else:
        return "error"


@app.route('/comment/<hotel_name>', methods=['GET'])
def get_comments(hotel_name):
    print(hotel_name)
    connection = get_conn()
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                sql = "SELECT comment_id, comment, rating, hotel_name FROM comments WHERE hotel_name='"+hotel_name+"'"
                cursor.execute(sql)
                values = cursor.fetchall()
                connection.commit()
        except:
            print("Mysql Error")
        return json.dumps(values)
    else:
        return "error"


if __name__ == '__main__':
    app.run()
