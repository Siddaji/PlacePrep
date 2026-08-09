import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authService } from "../services/authService.js";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [resendErr, setResendErr] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setLoading(false);
        setVerified(false);
        setMessage("Verification link is invalid or expired.");
        return;
      }

      try {
        const res = await authService.verifyEmail(token);
        if (res.success) {
          setVerified(true);
          setMessage("Email verified successfully. You can now log in.");
        } else {
          setVerified(false);
          setMessage(res.message || "Verification link is invalid or expired.");
        }
      } catch (error) {
        setVerified(false);
        setMessage("Verification link is invalid or expired.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail) return;

    setResending(true);
    setResendMsg("");
    setResendErr("");

    try {
      const res = await authService.resendVerification(resendEmail);
      if (res.success) {
        setResendMsg(res.message || "If an unverified account exists, a new link has been sent.");
      } else {
        setResendErr(res.message || "Failed to resend verification link.");
      }
    } catch (err) {
      setResendErr("Failed to send verification link. Please try again.");
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
            Email Verification
          </h1>
        </div>

        {/* Card */}
        <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          
          {loading ? (
            <div className="py-8 space-y-3">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-zinc-300">Verifying your email address...</p>
            </div>
          ) : verified ? (
            <div className="space-y-4 py-2">
              <div className="h-12 w-12 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">Verification Complete</h2>
              <p className="text-sm text-zinc-300">{message}</p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-lg transition-colors"
                >
                  Sign In Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-left">
              <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-sm text-center">
                {message}
              </div>

              <div className="border-t border-zinc-800 pt-5 space-y-4">
                <h3 className="text-sm font-semibold text-white text-center">
                  Request a New Verification Link
                </h3>

                {resendMsg && (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs">
                    {resendMsg}
                  </div>
                )}

                {resendErr && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
                    {resendErr}
                  </div>
                )}

                <form onSubmit={handleResend} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resending}
                    className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50"
                  >
                    {resending ? "Sending Link..." : "Resend Verification Email"}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <Link to="/login" className="text-xs text-zinc-400 hover:text-white">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default VerifyEmailPage;
