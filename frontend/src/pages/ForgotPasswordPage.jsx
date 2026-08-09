import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService.js";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black font-extrabold text-xl shadow-md mb-2">
            P
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Forgot Password
          </h1>
          <p className="text-sm text-zinc-400">
            Enter your email address and we'll send you a password reset link
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-xl space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs sm:text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-lg shadow transition-colors disabled:opacity-50 mt-2"
            >
              {submitting ? "Sending Reset Link..." : "Send Password Reset Link"}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-zinc-800/80">
            <Link
              to="/login"
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPasswordPage;
