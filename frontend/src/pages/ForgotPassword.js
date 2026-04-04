// import { useState } from "react";
// import "./ForgotPassword.css";

// const API_BASE = "http://localhost:5000"; // change if needed

// export default function ForgotPassword({ setView }) {
//   const [step, setStep] = useState(1); // 1=email, 2=password
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const resetMsg = () => {
//     setError("");
//     setSuccess("");
//   };

//   const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

//   // STEP-1: Check email exists
//   const handleCheckEmail = async () => {
//     resetMsg();

//     if (!email.trim()) return setError("Please enter your email");
//     if (!isValidEmail(email.trim())) return setError("Please enter a valid email");

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/auth/check-email`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.trim() }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || "Something went wrong");
//         return;
//       }

//       if (!data?.exists) {
//         setError("Email not found. Please enter a registered email.");
//         return;
//       }

//       setSuccess("Email verified. Create a new password.");
//       setStep(2);
//     } catch (err) {
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP-2: Reset password
//   const handleResetPassword = async () => {
//     resetMsg();

//     if (!newPassword || !confirmPassword)
//       return setError("Please fill all fields");

//     if (newPassword.length < 6)
//       return setError("Password must be at least 6 characters");

//     if (newPassword !== confirmPassword)
//       return setError("Passwords do not match");

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/auth/reset-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.trim(), newPassword }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || "Failed to reset password");
//         return;
//       }

//       setSuccess("Password updated successfully! Redirecting to login...");
//       setTimeout(() => setView("login"), 1200);
//     } catch (err) {
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fp-bg">
//       <div className="fp-card">
//         <h1 className="fp-title">Forgot Password</h1>
//         <p className="fp-subtitle">Smart finance starts with smart tracking</p>

//         {step === 1 && (
//           <>
//             <h3 className="fp-heading">Reset using your email</h3>

//             <div className="fp-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <button className="fp-btn" onClick={handleCheckEmail} disabled={loading}>
//               {loading ? "Checking..." : "Continue"}
//             </button>

//             <div className="fp-footer">
//               Remember password?{" "}
//               <span onClick={() => setView("login")}>Login</span>
//             </div>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <h3 className="fp-heading">Create a new password</h3>

//             <div className="fp-group">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>

//             <div className="fp-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Confirm new password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <div className="fp-actions">
//               <button
//                 className="fp-btn fp-btn-light"
//                 onClick={() => {
//                   resetMsg();
//                   setStep(1);
//                   setNewPassword("");
//                   setConfirmPassword("");
//                 }}
//                 disabled={loading}
//               >
//                 Back
//               </button>

//               <button className="fp-btn" onClick={handleResetPassword} disabled={loading}>
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>

//             <div className="fp-footer">
//               Back to{" "}
//               <span onClick={() => setView("login")}>Login</span>
//             </div>
//           </>
//         )}

//         {error && <div className="fp-alert fp-error">{error}</div>}
//         {success && <div className="fp-alert fp-success">{success}</div>}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ add
import "./ForgotPassword.css";

const API_BASE = "http://localhost:5000"; // change if needed

export default function ForgotPassword() {        // ✅ remove props
  const navigate = useNavigate();                 // ✅ add

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMsg = () => {
    setError("");
    setSuccess("");
  };

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleCheckEmail = async () => {
    resetMsg();

    if (!email.trim()) return setError("Please enter your email");
    if (!isValidEmail(email.trim())) return setError("Please enter a valid email");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Something went wrong");
        return;
      }

      if (!data?.exists) {
        setError("Email not found. Please enter a registered email.");
        return;
      }

      setSuccess("Email verified. Create a new password.");
      setStep(2);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    resetMsg();

    if (!newPassword || !confirmPassword) return setError("Please fill all fields");
    if (newPassword.length < 6) return setError("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to reset password");
        return;
      }

      setSuccess("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 1200);  // ✅ change
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-bg">
      <div className="fp-card">
        <h1 className="fp-title">Forgot Password</h1>
        <p className="fp-subtitle">Smart finance starts with smart tracking</p>

        {step === 1 && (
          <>
            <h3 className="fp-heading">Reset using your email</h3>

            <div className="fp-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="fp-btn" onClick={handleCheckEmail} disabled={loading}>
              {loading ? "Checking..." : "Continue"}
            </button>

            <div className="fp-footer">
              Remember password?{" "}
              <span onClick={() => navigate("/login")}>Login</span> {/* ✅ change */}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="fp-heading">Create a new password</h3>

            <div className="fp-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="fp-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="fp-actions">
              <button
                className="fp-btn fp-btn-light"
                onClick={() => {
                  resetMsg();
                  setStep(1);
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                disabled={loading}
              >
                Back
              </button>

              <button className="fp-btn" onClick={handleResetPassword} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>

            <div className="fp-footer">
              Back to{" "}
              <span onClick={() => navigate("/login")}>Login</span> {/* ✅ change */}
            </div>
          </>
        )}

        {error && <div className="fp-alert fp-error">{error}</div>}
        {success && <div className="fp-alert fp-success">{success}</div>}
      </div>
    </div>
  );
}