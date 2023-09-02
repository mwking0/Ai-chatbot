import requests
# from playsound import playsound
import os
from flask import Flask, render_template, request, jsonify
from routes import get_response_from_teacher




app = Flask(__name__)


# building our web GUI using Flask

@app.route("/")
def home():
    return render_template("teacher_selection.html")

@app.route("/chat_bot")
def chat_bot():
    global profile_id
    profile_id = request.args.get('profileId')
    # Use the profileId as needed in your view logic
    return render_template("index.html")

@app.route('/send_message', methods=['POST'])
def send_message():
    global profile_id
    human_input = request.form['human_input']  
    message = get_response_from_teacher(human_input, profile_id)
    return jsonify({'message': message})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)


