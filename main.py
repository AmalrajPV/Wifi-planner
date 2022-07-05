from flask import Flask, render_template, request, redirect
from flask_cors import CORS 
import json
from tkinter import *

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def landing():
    return render_template('landing.html')


@app.route('/home', methods=['GET', 'POST'])
def home():
    img = ''
    if request.method == 'POST':
        img = request.form.get('planImage')
        return render_template('index.html', data= img)
    else:
        return render_template('index.html')


@app.route('/playground', methods=['GET', 'POST'])
def testing():
    if request.method == 'POST':
        svg = request.form.get('svg')
        svg = json.loads(svg)
        size = (request.form.get('width'), request.form.get('height'))
        data =  {
            'svg':svg,
            'size':size
        }
        return render_template('testing.html', data=data)
    # else:
    #     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
