
// import { useState } from "react";
// import { loginUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await loginUser(email, password);

//       if (data?.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("username", data.user?.name || "User");
//         localStorage.setItem("email", data.user?.email || email);
//         localStorage.setItem("userId", data.user?.id || "");

//         alert("Login successful");
//         navigate("/dashboard");
//       } else {
//         alert(data?.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//     <div className="login-bg">
//       <div className="login-card">
//         <h1 className="login-title">Welcome to TaxPal</h1>
//         <p className="login-subtitle">
//           Smart finance starts with smart tracking
//         </p>

//         <h3 className="login-heading">Login to your account</h3>

//         <div className="login-group">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//         </div>

//         <div className="login-group">
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <div
//             className="forgot-link"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot password?
//           </div>
//         </div>

//         <button
//           className="login-btn"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div className="login-footer">
//           Don’t have an account?{" "}
//           <span onClick={() => navigate("/register")}>Register</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);
      console.log("Login API Response:", data); // 🔍 Debug

      // ✅ Check token
      if (!data?.token) {
        alert(data?.message || "Login failed");
        return;
      }

      // ✅ Check user object
      if (!data?.user || !data.user.id) {
        alert("User data missing from server response");
        return;
      }

      // ✅ Store everything properly
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.user.id));
      localStorage.setItem(
        "username",
        data.user.username || data.user.name || "User"
      );
      localStorage.setItem("email", data.user.email || email);

      alert("Login successful");

      // ✅ Redirect
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1 className="login-title">Welcome to TaxPal</h1>
        <p className="login-subtitle">
          Smart finance starts with smart tracking
        </p>

        <h3 className="login-heading">Login to your account</h3>

        {/* Email */}
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Password */}
        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>
        </div>

        {/* Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <div className="login-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </div>
    </div>
  );
}