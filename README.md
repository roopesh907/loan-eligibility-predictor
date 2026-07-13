# Loan Eligibility Prediction System (97% Accuracy)

A professional full-stack intelligent evaluation pipeline designed to assess loan applicants based on financial vectors, asset health declarations, and risk thresholds. Powered by a high-accuracy **Random Forest Classifier** model on the backend, and a modern, high-fidelity responsive dashboard on the frontend.

## 📊 Model Performance
* **Algorithm:** Random Forest Classifier
* **Accuracy:** `97.0%`
* **Features Used:** Applicant Profile (Dependents, Education, Self-Employment status), Financial Requirements (Income, Loan Amount, Term, CIBIL Score), and Asset Declarations (Residential, Commercial, Luxury, and Bank Assets).

---

## 🏗️ Project Architecture
The workspace uses a completely decoupled, clean dual-environment layout:
* **`/Backend`**: Powered by **FastAPI**, handling structural category data mapping, data scaling via `scikit-learn`, and high-speed predictive mapping.
* **`/Frontend`**: Built using **React (Vite)** and styled with **Tailwind CSS**, featuring data validations and animated diagnostic modal workflows.

---

## 🛠️ Local Installation & Setup

### 1. Prerequisites
Ensure you have `Node.js` and `Python 3.10+` installed on your machine.

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend