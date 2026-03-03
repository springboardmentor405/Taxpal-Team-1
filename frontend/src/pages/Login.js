import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const data = await loginUser(email, password);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");

      // ✅ If you have dashboard later, use this:
      // navigate("/dashboard");
    } else {
      alert(data?.message || "Login failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">Welcome to TaxPal</h1>
        <p className="login-subtitle">Smart finance starts with smart tracking</p>

        <h3 className="login-heading">Login to your account</h3>

        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ Redirect to forgot password page */}
          <div
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Forgot password?
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="login-footer">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}