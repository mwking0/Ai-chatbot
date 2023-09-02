from dotenv import load_dotenv, find_dotenv
import requests
# from playsound import playsound
import os
from flask import Flask, render_template, request
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


if __name__ == "__main__":
    app.run(debug=True)

load_dotenv(find_dotenv())
