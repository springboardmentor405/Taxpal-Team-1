// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "../components/Card";
// import { sendRegisterOTP } from "../services/authService";
// import "./Register.css";

// export default function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!username || !email || !password || !confirmPassword) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await sendRegisterOTP(username, email, password);

//       alert(data?.message || "OTP Sent Successfully");

//       // ✅ go to verify page and pass email
//       navigate("/verify", { state: { email } });
//     } catch (error) {
//       console.error(error);
//       alert("Registration failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <h1 className="taxpal-title">Register</h1>
//       <p className="taxpal-subtitle">Create a new account</p>

//       <div className="form-group">
//         <label>Username</label>
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//       </div>

//       <button className="taxpal-btn" onClick={handleRegister} disabled={loading}>
//         {loading ? "Processing..." : "Next"}
//       </button>

//       <div className="taxpal-footer">
//         Already have an account?{" "}
//         <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
//           Login
//         </span>
//       </div>
//     </Card>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { sendRegisterOTP } from "../services/authService";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await sendRegisterOTP(username, email, password);

      // ✅ If backend returns failure, check if email already exists
      if (data?.success === false) {
        const msg = data.message?.toLowerCase() || "";

        if (
          msg.includes("already") ||
          msg.includes("exists") ||
          msg.includes("registered") ||
          msg.includes("duplicate")
        ) {
          alert("Email already registered. Please login.");
          navigate("/login");
        } else {
          alert(data.message || "Registration failed. Try again.");
        }
        return;
      }

      alert(data?.message || "OTP Sent Successfully");
      navigate("/verify", { state: { email } });

    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="taxpal-title">Register</h1>
      <p className="taxpal-subtitle">Create a new account</p>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className="taxpal-btn" onClick={handleRegister} disabled={loading}>
        {loading ? "Processing..." : "Next"}
      </button>

      <div className="taxpal-footer">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Login
        </span>
      </div>
    </Card>
  );
}