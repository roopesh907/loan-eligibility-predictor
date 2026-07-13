from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

app = FastAPI(title="Loan Approval Prediction API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change this to your Vercel URL when deploying
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanInput(BaseModel):
    no_of_dependents: int
    education: str
    Self_Employed: str
    income_annum: float
    loan_amount: float
    loan_term: int
    cibil_score: int
    residential_assets_value: float
    commercial_assets_value: float
    luxury_assets_value: float
    bank_asset_value: float


@app.get("/")
def home():
    return {"message": "Loan Approval Prediction API is running!"}


@app.post("/predict")
def predict(inp: LoanInput):
    try:
        # -------------------------------
        # Encode categorical variables
        # -------------------------------
        education = inp.education.lower().strip()
        self_employed = inp.Self_Employed.lower().strip()

        if education not in ["graduate", "not graduate"]:
            raise HTTPException(
                status_code=400,
                detail="education must be 'graduate' or 'not graduate'"
            )

        if self_employed not in ["yes", "no"]:
            raise HTTPException(
                status_code=400,
                detail="Self_Employed must be 'yes' or 'no'"
            )

        education = 1 if education == "graduate" else 0
        self_employed = 1 if self_employed == "yes" else 0

        # -------------------------------
        # Create DataFrame
        # -------------------------------
        df = pd.DataFrame([{
            "no_of_dependents": inp.no_of_dependents,
            "education": education,
            "Self_Employed": self_employed,
            "income_annum": inp.income_annum,
            "loan_amount": inp.loan_amount,
            "loan_term": inp.loan_term,
            "cibil_score": inp.cibil_score,
            "residential_assets_value": inp.residential_assets_value,
            "commercial_assets_value": inp.commercial_assets_value,
            "luxury_assets_value": inp.luxury_assets_value,
            "bank_asset_value": inp.bank_asset_value
        }])

        # -------------------------------
        # Scale Features
        # -------------------------------
        scaled_df = scaler.transform(df)

        # -------------------------------
        # Prediction
        # -------------------------------
        prediction = model.predict(scaled_df)[0].strip()

        # -------------------------------
        # Probability
        # -------------------------------
        probability = model.predict_proba(scaled_df)

        if prediction == "Approved":
            confidence = round(probability[0][1] * 100, 2)
        else:
            confidence = round(probability[0][0] * 100, 2)

        return {
            "status": "Prediction Successful",
            "prediction": prediction,
            "confidence": confidence
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )