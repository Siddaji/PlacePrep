import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authService } from "../services/authService.js";
import { CheckCircle2, AlertCircle, Mail, Loader2, ArrowRight, RefreshCw, ArrowLeft } from "lucide-react";

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

  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setVerified(false);
      setMessage("Verification link is invalid or expired.");
      return;
    }

    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    async function verify() {
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-bold text-xl shadow-lg mb-1">
            <span className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Email Verification
          </h1>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {loading ? (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-white animate-spin mx-auto" />
              <p className="text-sm text-zinc-300 font-medium">Verifying your email address...</p>
              <p className="text-xs text-zinc-500">Please wait a moment while we process your request.</p>
            </div>
          ) : verified ? (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-white">Email Verified</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">{message}</p>
              </div>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-black font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Sign In Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-900/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="leading-snug">{message}</p>
              </div>

              <div className="border-t border-zinc-800 pt-5 space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-semibold text-white">
                    Request a New Verification Link
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Enter your email address to receive a fresh verification link.
                  </p>
                </div>

                {resendMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-900/80 text-emerald-200 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{resendMsg}</span>
                  </div>
                )}

                {resendErr && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-900/80 text-red-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                    <span>{resendErr}</span>
                  </div>
                )}

                <form onSubmit={handleResend} className="space-y-3">
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
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resending}
                    className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {resending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Resend Verification Email</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
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
          )}

        </div>

      </div>
    </div>
  );
}

export default VerifyEmailPage;
