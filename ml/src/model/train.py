# ml/src/model/train.py
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

def train_model(X_train, y_train, X_test, y_test):
    model = RandomForestClassifier(n_estimators=150, random_state=42)
    model.fit(X_train, y_train)
    preds = model.predict(X_test)

    acc = accuracy_score(y_test, preds)
    print(f"✅ Model Accuracy: {acc:.2f}")
    print("\nClassification Report:\n", classification_report(y_test, preds))

    # Ensure models folder exists
    os.makedirs("models", exist_ok=True)

    joblib.dump(model, "models/credit_model.pkl")
    print("💾 Model saved to models/credit_model.pkl")

    return model
