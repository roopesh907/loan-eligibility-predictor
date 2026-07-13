import { ShieldCheck } from "lucide-react";
 
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto h-18 px-8 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Loan Approval Predictor
            </h1>

            <p className="text-xs text-slate-400 tracking-wide">
              AI Powered Credit Risk Assessment
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

          <span className="relative flex h-3 w-3">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>

            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>

          </span>

          <span className="text-sm font-medium tracking-wide text-emerald-400">
            Predictor Engine Online
          </span>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
