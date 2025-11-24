import os
from src.preprocessing.preprocess import build_preprocessor
from src.model.train import train_model
from src.model.predict import predict_credit_score

if __name__ == "__main__":
    print("🚀 Starting Credit Score Prediction Pipeline")

    # Dynamically get absolute path
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, "data", "train.csv")

    X_train, X_test, y_train, y_test, scaler, label_encoder = build_preprocessor(csv_path)

    model = train_model(X_train, y_train, X_test, y_test)

    print("🔍 Example prediction:")
    sample_input = X_test[0]
    prediction = predict_credit_score(sample_input)
    print(f"Predicted Credit Score: {label_encoder.inverse_transform([prediction])[0]}")
