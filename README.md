# 🏦 Loan Eligibility Prediction System

An end-to-end machine learning web application that predicts whether a loan application is likely to be **Approved** or **Rejected** based on applicant financial information, employment status, credit score, and asset details.

The project integrates a **Random Forest Classifier** with a **FastAPI** backend and a modern **React + Tailwind CSS** frontend to deliver real-time loan eligibility predictions through a clean and responsive user interface.

---

## 🚀 Features

- 🤖 Machine Learning powered loan approval prediction
- 📈 Displays approval probability
- ⚡ FastAPI REST API backend
- 🎨 Modern React + Tailwind CSS frontend
- 📱 Responsive user interface
- 🔄 Real-time predictions using Axios
- 🛡️ Input validation and backend error handling
- 🌐 CORS-enabled API communication

---

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| Algorithm | Random Forest Classifier |
| Validation Accuracy | **97.0%** |
| Task | Binary Classification |

### Features Used

- Number of Dependents
- Education
- Self Employment Status
- Annual Income
- Loan Amount
- Loan Term
- CIBIL Score
- Residential Asset Value
- Commercial Asset Value
- Luxury Asset Value
- Bank Asset Value

---

## 🏗️ Project Architecture

```
User
   │
   ▼
React + Tailwind Frontend
   │
   ▼
Axios HTTP Request
   │
   ▼
FastAPI Backend
   │
   ▼
Data Validation
   │
   ▼
StandardScaler
   │
   ▼
Random Forest Model
   │
   ▼
Prediction + Approval Probability
   │
   ▼
Frontend UI
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- Lucide React
- Vite

### Backend

- FastAPI
- Uvicorn
- Pydantic
- Pandas
- NumPy
- Joblib

### Machine Learning

- Scikit-learn
- Random Forest Classifier
- StandardScaler

---

## 📂 Project Structure

```
LoanApproval/

├── Backend/
│   ├── main.py
│   ├── model.pkl
│   ├── scaler.pkl
│   ├── requirements.txt
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd LoanApproval
```

---

### Backend Setup

```bash
cd Backend

python -m venv venv
```

Activate the virtual environment

**Windows**

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd Frontend

npm install
```

Run the development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📡 API Endpoint

### POST `/predict`

### Sample Request

```json
{
  "no_of_dependents": 2,
  "education": "Graduate",
  "Self_Employed": "No",
  "income_annum": 500000,
  "loan_amount": 2000000,
  "loan_term": 15,
  "cibil_score": 780,
  "residential_assets_value": 3000000,
  "commercial_assets_value": 1000000,
  "luxury_assets_value": 500000,
  "bank_asset_value": 800000
}
```

### Sample Response

```json
{
  "status": "Prediction Successful",
  "prediction": "Approved",
  "approval_probability": 94.82
}
```

---

## 📸 Screenshots

> Add screenshots here once the frontend is complete.

- Home Page
- Prediction Form
- Prediction Result

---

## 🔮 Future Improvements

- User authentication
- Prediction history
- Model comparison
- Explainable AI (SHAP)
- Cloud deployment
- Docker support

---

## 👨‍💻 Author

**Roopesh**

Machine Learning & Full Stack AI Developer

GitHub: https://github.com/roopesh907
