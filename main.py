from fastapi import FastAPI
from pydantic import BaseModel
from xgboost import XGBClassifier
import numpy as np

# 1. Start the FastAPI application
app = FastAPI()

# 2. Re-upload the model we saved earlier.
model = XGBClassifier()
model.load_model('fraud_model.json')

# 3. Define what the data your friend (Teammate B) will send looks like.
class Transaction(BaseModel):
    features: list  # Your friend will send you a list of numbers (V1, V2, Amount, etc.)

@app.get("/")
def home():
    return {"message": "Fraud Detection API is Running"}

# 4. Function to receive transaction data and give results
@app.post("/predict")
def predict_fraud(data: Transaction):
    # Convert data into a format that the model understands
    input_data = np.array([data.features])
    
    # Make predictions
    prediction = model.predict(input_data)
    
    # 0 = Approve, 1 = Block/Flag (Ikut Case Study 2)
    result = "Block" if prediction[0] == 1 else "Approve"
    
    return {"status": result}