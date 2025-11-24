# ml/src/model/predict.py
import joblib
import numpy as np

def predict_credit_score(input_data):
    model = joblib.load("models/credit_model.pkl")
    input_array = np.array(input_data).reshape(1, -1)
    pred = model.predict(input_array)
    return int(pred[0])
