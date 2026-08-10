import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-bold text-xl shadow-lg mb-1">
            <span className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back to PlacePrep
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
            Continue tracking your placement preparation and practice problems.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-900/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div className="space-y-2 flex-1">
                <p className="leading-snug">{error}</p>
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
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-900/80 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="leading-snug">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-black font-semibold text-sm rounded-xl shadow-sm transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 mt-2 active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-3 text-center border-t border-zinc-800/80">
            <p className="text-xs text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-white hover:underline underline-offset-2"
              >
                Create an account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;
