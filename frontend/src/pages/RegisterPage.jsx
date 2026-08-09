import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService.js";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
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
      const res = await authService.register({
        name,
        email,
        password,
        confirmPassword,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Registration failed.");
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
            Create a PlacePrep Account
          </h1>
          <p className="text-sm text-zinc-400">
            Start tracking your DSA, System Design, and CS preparation
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-xl space-y-5">
          
          {success ? (
            <div className="space-y-4 text-center py-2">
              <div className="h-12 w-12 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">Check Your Email</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                We've sent a verification link to <span className="font-semibold text-white">{email}</span>.
              </p>
              <p className="text-xs text-zinc-400">
                Please click the link in the email to verify your account before logging in.
              </p>
              <div className="pt-3">
                <Link
                  to="/login"
                  className="inline-block py-2.5 px-5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Go to Login
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
                  />
                </div>

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

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Password
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
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
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
                  {submitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="pt-2 text-center border-t border-zinc-800/80">
                <p className="text-xs text-zinc-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-white hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default RegisterPage;
