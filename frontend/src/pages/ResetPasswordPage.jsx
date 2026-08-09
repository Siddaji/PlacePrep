import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authService } from "../services/authService.js";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Password reset token is missing from URL.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await authService.resetPassword({
        token,
        password,
        confirmPassword,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Server connection failed. Please try again later.");
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
            Set New Password
          </h1>
          <p className="text-sm text-zinc-400">
            Please enter and confirm your new password
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-xl space-y-5">
          
          {success ? (
            <div className="space-y-4 text-center py-2">
              <div className="h-12 w-12 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">Password Reset Successful</h2>
              <p className="text-sm text-zinc-300">
                Your password has been updated. You can now log in with your new password.
              </p>
              <div className="pt-3">
                <Link
                  to="/login"
                  className="inline-block w-full py-2.5 px-4 bg-white text-black font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    minLength={6}
                    className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-lg shadow transition-colors disabled:opacity-50 mt-2"
                >
                  {submitting ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>

              <div className="pt-2 text-center border-t border-zinc-800/80">
                <Link
                  to="/login"
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default ResetPasswordPage;
