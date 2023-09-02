from dotenv import load_dotenv, find_dotenv
import requests
# from playsound import playsound
import os
from flask import Flask, render_template, request, jsonify
from routes import get_response_from_teacher1

app = Flask(__name__)


# building our web GUI using Flask

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/send_message', methods=['POST'])  # this is the route that will handle our form submission
def send_message():
    human_input = request.form['human_input']
    message = get_response_from_teacher1(human_input)
    return message

@app.route('/get_chat_response', methods=['POST'])
def get_chat_response():
    try:
        data = request.json
        user_input = data['user_input']

        # Call your GPT-3 function to get a response
        response = get_response_from_teacher1(user_input)

        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)

load_dotenv(find_dotenv())
