import pickle
from flask import Flask, request, app, jsonify, url_for, render_template
import numpy as np
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
RF_model = pickle.load(open('random_forest_model.pkl', 'rb'))

CORS(app)


@app.route('/api/check', methods=['GET'])
def check():
    return jsonify({'message': 'API is working'})


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/predict_api', methods=['POST'])
def predict_api():
    try:
        data = request.json['data']
        # print(data)
        type, amount, oldbalance_org, newbalance_orig = data['type'], data[
            'amount'], data['oldbalanceOrg'], data['newbalanceOrig']
        # print(type, amount, oldbalance_org, newbalance_orig)
        try:
            type = type  # Assuming 'type' is a numerical feature
            amount = float(amount)
            oldbalance_org = float(oldbalance_org)
            newbalance_orig = float(newbalance_orig)
        except ValueError:
            return jsonify({'error': 'Invalid data types. Please ensure numerical values for all features.'}), 400
        data_unseen = np.array(
            [type, amount, oldbalance_org, newbalance_orig]).reshape(1, -1)
        output = RF_model.predict(data_unseen)[0]

        return jsonify({'prediction': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

# Sample data
# features=[type,amount,oldbalanceOrg,newbalanceOrig]
# "CASH_OUT":1,"PAYMENT":2,"CASH_IN":3,"TRANSFER":4,"DEBIT":5
