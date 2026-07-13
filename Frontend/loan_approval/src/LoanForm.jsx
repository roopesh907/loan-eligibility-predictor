import { useState } from "react";

const LoanForm = () => {
  // Form state structured exactly to match the backend DataFrame keys
  const [formData, setFormData] = useState({
    no_of_dependents: "",
    education: "Graduate", // Default value
    Self_Employed: "No", // Default value
    income_annum: "",
    loan_amount: "",
    loan_term: "",
    cibil_score: "",
    residential_assets_value: "",
    commercial_assets_value: "",
    luxury_assets_value: "",
    bank_asset_value: "",
  });

  // State to handle API requests
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictionResult(null);

    // Format fields as numbers if needed by the backend model, except categorical ones
    const payload = {
      no_of_dependents: Number(formData.no_of_dependents),
      education: formData.education,
      Self_Employed: formData.Self_Employed,
      income_annum: Number(formData.income_annum),
      loan_amount: Number(formData.loan_amount),
      loan_term: Number(formData.loan_term),
      cibil_score: Number(formData.cibil_score),
      residential_assets_value: Number(formData.residential_assets_value),
      commercial_assets_value: Number(formData.commercial_assets_value),
      luxury_assets_value: Number(formData.luxury_assets_value),
      bank_asset_value: Number(formData.bank_asset_value),
    };

    try {
      // Adjust port 5000 to match your Flask/FastAPI backend port configuration
      const response = await fetch("https://loan-eligibility-predictor-j1bx.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {
      console.error("Backend Error:", err);
      setError(err.message || "Failed to connect to local server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen scrollbar-thin bg-linear-to-br from-gray-900 via-slate-900 to-zinc-900 text-gray-100 flex items-center justify-center p-6 selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-2xl transform transition-all duration-300 hover:border-slate-700">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8 border-b border-slate-800 pb-6">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wide bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Loan Approval Prediction Form
            </h2>
            <p className="text-sm text-slate-400">
              Provide accurate details to analyze your loan eligibility profile.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal & Professional Profile */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Applicant Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  No. of Dependents
                </label>
                <input
                  type="number"
                  name="no_of_dependents"
                  value={formData.no_of_dependents}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  min={0}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Education
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="Graduate" className="bg-slate-900">
                    Graduate
                  </option>
                  <option value="Not Graduate" className="bg-slate-900">
                    Not Graduate
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Self Employed
                </label>
                <select
                  name="Self_Employed"
                  value={formData.Self_Employed}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="Yes" className="bg-slate-900">
                    Yes
                  </option>
                  <option value="No" className="bg-slate-900">
                    No
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Loan Requirements & Credit Score */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Financial Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Annual Income
                </label>
                <input
                  type="number"
                  name="income_annum"
                  value={formData.income_annum}
                  onChange={handleChange}
                  placeholder="e.g. 800000"
                  min={0}
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loan_amount"
                  value={formData.loan_amount}
                  onChange={handleChange}
                  placeholder="e.g. 2000000"
                  required
                  min={0}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Loan Term (Years)
                </label>
                <input
                  type="number"
                  name="loan_term"
                  value={formData.loan_term}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  required
                  min={0}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  CIBIL Score
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="cibil_score"
                    value={formData.cibil_score}
                    onChange={handleChange}
                    placeholder="300 - 900"
                    min="300"
                    max="900"
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-slate-500 font-mono">
                    Score Scale
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Asset Valuations */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Asset Declaration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Residential Asset Value
                </label>
                <input
                  type="number"
                  name="residential_assets_value"
                  value={formData.residential_assets_value}
                  onChange={handleChange}
                  placeholder="Current valuation"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Commercial Asset Value
                </label>
                <input
                  type="number"
                  name="commercial_assets_value"
                  value={formData.commercial_assets_value}
                  onChange={handleChange}
                  placeholder="Current valuation"
                  min={0}
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Luxury Asset Value
                </label>
                <input
                  type="number"
                  name="luxury_assets_value"
                  value={formData.luxury_assets_value}
                  onChange={handleChange}
                  placeholder="Vehicles, jewelry, art, etc."
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Bank Asset Value
                </label>
                <input
                  type="number"
                  name="bank_asset_value"
                  value={formData.bank_asset_value}
                  onChange={handleChange}
                  placeholder="Liquid cash, savings, FD balance"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Inline Error Notifications Banner (For API connection failures) */}
          {error && (
            <div className="p-4 rounded-xl border text-sm transition-all duration-300 bg-rose-500/10 border-rose-500/30 text-rose-400">
              <p>
                ⚠️ <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm px-6 py-3 rounded-lg shadow-lg shadow-emerald-950/50 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Evaluating API Profile..." : "Evaluate Application"}
              {!loading && (
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Card Popup Modal */}
      {predictionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 relative transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setPredictionResult(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Status Icon Wrapper */}
            <div className="flex flex-col items-center text-center mt-4">
              <div className={`p-4 rounded-full mb-4 ${
                predictionResult.prediction === "Approved" 
                  ? "bg-emerald-500/10 text-emerald-400" 
                  : "bg-rose-500/10 text-rose-400"
              }`}>
                {predictionResult.prediction === "Approved" ? (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              {/* Status Header */}
              <h4 className="text-xl font-bold tracking-wide text-white mb-1">
                Loan Verification Complete
              </h4>
              <p className="text-xs text-slate-400 px-4 mb-6">
                Our analytical evaluation system has reviewed your asset vectors and profile requirements.
              </p>

              {/* Status Box */}
              <div className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex justify-center items-center mb-6">
                <div>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-500 text-left">Result Status</span>
                  <span className={`text-base font-bold tracking-wide ${
                    predictionResult.prediction === "Approved" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {predictionResult.prediction}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => setPredictionResult(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm py-3 rounded-xl border border-slate-700/50 transition-all duration-200 active:scale-[0.98]"
              >
                Acknowledge Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanForm;