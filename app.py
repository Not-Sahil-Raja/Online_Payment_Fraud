import pickle
from flask import Flask, request, app, jsonify, url_for, render_template
import numpy as np
import pandas as pd

app = Flask(__name__)
RF_model = pickle.load(open('random_forest_model.pkl', 'rb'))


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/predict_api', methods=['POST'])
def predict_api():
    data = request.json['data']
    print(data)
    data_unseen = np.array(data)
    output = RF_model.predict([data_unseen])
    return jsonify(output[0])


if __name__ == '__main__':
    app.run(debug=True)
