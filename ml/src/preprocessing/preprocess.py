# ml/src/preprocessing/preprocess.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

def build_preprocessor(csv_path):
    df = pd.read_csv(csv_path)

    # Drop useless columns
    df = df.drop(['ID', 'Customer_ID', 'Month', 'Name', 'SSN'], axis=1)

    # Handle missing or placeholder values
    df.replace('_', pd.NA, inplace=True)
    df = df.dropna()

    # Convert numeric columns to proper types
    numeric_cols = [
        'Age', 'Annual_Income', 'Monthly_Inhand_Salary',
        'Num_Bank_Accounts', 'Num_Credit_Card', 'Interest_Rate',
        'Num_of_Loan', 'Delay_from_due_date', 'Num_of_Delayed_Payment',
        'Changed_Credit_Limit', 'Num_Credit_Inquiries',
        'Outstanding_Debt', 'Credit_Utilization_Ratio',
        'Total_EMI_per_month', 'Amount_invested_monthly', 'Monthly_Balance'
    ]
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')

    # Drop rows with NaN after conversion
    df = df.dropna()

    # Handle categorical columns
    categorical_cols = [
        'Occupation', 'Type_of_Loan', 'Credit_Mix',
        'Payment_of_Min_Amount', 'Payment_Behaviour'
    ]
    label_encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

    # Convert Credit_History_Age like "22 Years and 1 Months" → months
    def convert_history(age_str):
        try:
            parts = age_str.split()
            years = int(parts[0])
            months = int(parts[3])
            return years * 12 + months
        except:
            return 0
    df['Credit_History_Age'] = df['Credit_History_Age'].apply(convert_history)

    # Target encoding
    y = df['Credit_Score']
    le_target = LabelEncoder()
    y = le_target.fit_transform(y)

    X = df.drop('Credit_Score', axis=1)

    # Scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )

    print("✅ Preprocessing done. Data ready for training.")
    return X_train, X_test, y_train, y_test, scaler, le_target
