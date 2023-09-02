from dotenv import load_dotenv, find_dotenv
# from playsound import playsound
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


@app.route('/get_response_from_teacher1', methods=['POST'])
def get_response_from_teacher1():
    data = request.get_json()
    human_input = data.get('human_input')

    # Your Python code for get_response_from_teacher1 here

    response = {
        'output': 'The response from teacher 1'
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)

load_dotenv(find_dotenv())
