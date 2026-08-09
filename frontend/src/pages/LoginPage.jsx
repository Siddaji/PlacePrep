import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isUnverified, setIsUnverified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsUnverified(false);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await authService.login({ email, password });
      if (res.success) {
        login(res.token, res.user);
        navigate("/");
      } else {
        setError(res.message || "Invalid credentials.");
        if (res.isVerified === false || res.message?.includes("verify")) {
          setIsUnverified(true);
        }
      }
    } catch (err) {
      setError("Server connection failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await authService.resendVerification(email);
      setSuccessMsg(res.message || "Verification email sent successfully.");
    } catch (err) {
      setError("Failed to resend verification email.");
    } finally {
      setResending(false);
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
            Welcome back to PlacePrep
          </h1>
          <p className="text-sm text-zinc-400">
            Sign in to access your placement preparation tracker
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-xl space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm space-y-2">
              <p>{error}</p>
              {isUnverified && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2 disabled:opacity-50"
                >
                  {resending ? "Sending verification email..." : "Resend verification email"}
                </button>
              )}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs sm:text-sm">
              {successMsg}
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-lg shadow transition-colors disabled:opacity-50 mt-2"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-zinc-800/80">
            <p className="text-xs text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-white hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;
