import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 1. Download data
print("--- Reading data files... ---")
df = pd.read_csv('creditcard.csv')

# 2. Data Cleaning (Scaling)
# Change 'Amount' and 'Time' so that the model doesn't get dizzy with large numbers
scaler = StandardScaler()
df['Amount'] = scaler.fit_transform(df['Amount'].values.reshape(-1, 1))
df['Time'] = scaler.fit_transform(df['Time'].values.reshape(-1, 1))

# 3. Separate Input (X) and Output/Target (y)
X = df.drop('Class', axis=1)
y = df['Class']

# 4. Handle Imbalanced Data (Use SMOTE)
# Fraud cases are very rare, so we 'create' artificial data to help the model learn
print("--- Running SMOTE (Please wait a moment)... ---")
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# 5. Split the data into Training (80%) and Test (20%)
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# 6. Train an XGBoost Model
print("--- Training an XGBoost model... ---")
model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

# 7. Test and See Results
print("\n--- MODEL PERFORMANCE RESULTS ---")
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save the model so it can be used by the API later
model.save_model('fraud_model.json')
print("Model saved as 'fraud_model.json'")