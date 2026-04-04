
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { verifyRegisterOTP } from "../services/authService";
import "./VerifyOTP.css";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // ✅ 6 digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!email) {
      alert("Email not found. Please register again.");
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyRegisterOTP(email, finalOtp);

      alert(data?.message || "Verified Successfully");

      if (data?.success) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      alert("OTP Resent!");
      setTimer(60);
      // call resend api here (if you implement)
    }
  };

  return (
    <Card>
      <h1 className="verify-title">Verification</h1>
      <p className="verify-subtitle">Enter the 6-digit code sent to your email</p>

      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            className="otp-input"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      <button className="taxpal-btn" onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      <div className="resend-section">
        {timer > 0 ? (
          <p className="timer-text">
            Resend OTP in <strong>{timer}s</strong>
          </p>
        ) : (
          <span className="resend-link" onClick={handleResend}>
            Resend OTP
          </span>
        )}
      </div>

      <div className="taxpal-footer" style={{ marginTop: "14px" }}>
        Back to{" "}
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login
        </span>
      </div>
    </Card>
  );
}