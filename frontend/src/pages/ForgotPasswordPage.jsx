import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService.js";
import { Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft, Send } from "lucide-react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await authService.forgotPassword(email);
      setMessage(
        res.message ||
          "If an account with that email exists, a password reset link has been sent."
      );
    } catch (err) {
      setError("Failed to process request. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-bold text-xl shadow-lg mb-1">
            <span className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Forgot Password
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-900/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="leading-snug">{error}</p>
            </div>
          )}

          {message && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-900/80 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="leading-snug">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-black font-semibold text-sm rounded-xl shadow-sm transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <span>Send Password Reset Link</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-3 text-center border-t border-zinc-800/80">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPasswordPage;
