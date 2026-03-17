from fastapi import FastAPI
from pydantic import BaseModel
import xgboost as xgb
import pandas as pd
import numpy as np

app = FastAPI()

model = xgb.Booster()
model.load_model("fraud_model.json")

COLUMN_NAMES = [
    'Time', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 
    'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'V18', 'V19', 'V20', 
    'V21', 'V22', 'V23', 'V24', 'V25', 'V26', 'V27', 'V28', 'Amount'
]

class Transaction(BaseModel):
    features: list

@app.post("/predict")
def predict(data: Transaction):
    try:
        if len(data.features) != 30:
            return {"error": f"Model expects 30 features, but got {len(data.features)}"}

        df = pd.DataFrame([data.features], columns=COLUMN_NAMES)
        
        dmatrix_data = xgb.DMatrix(df)
        
        prediction = model.predict(dmatrix_data)
        score = float(prediction[0])
        
        status = "Block" if score > 0.5 else "Approve"
        
        return {
            "status": status,
            "fraud_probability": round(score, 4)
        }
    except Exception as e:
        return {"error": str(e)}
