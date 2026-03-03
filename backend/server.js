// const express = require("express");
// const cors = require("cors");
// const db = require("./db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(cors({ origin: "http://localhost:3000" })); // adjust if needed
// app.use(express.json());

// // ================= HOME =================
// app.get("/", (req, res) => {
//   res.send("TaxPal Backend Running");
// });

// // ================= SEND REGISTER OTP =================
// app.post("/send-register-otp", async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if already registered
//   db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, result) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (result.length > 0) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     try {
//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Generate OTP (4 digit)
//       const otp = Math.floor(1000 + Math.random() * 9000).toString();

//       // Store in register_otp table
//       const sql = `
//         INSERT INTO register_otp (username, email, password, otp)
//         VALUES (?, ?, ?, ?)
//       `;

//       db.query(sql, [username, email, hashedPassword, otp], (err2) => {
//         if (err2) {
//           console.log(err2);
//           return res.status(500).json({ message: "Failed to generate OTP" });
//         }

//         console.log("Registration OTP:", otp); // For testing
//         res.json({ success: true, message: "OTP sent successfully" });
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
// });

// // ================= VERIFY REGISTER OTP =================
// app.post("/verify-register-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ message: "Email and OTP are required" });
//   }

//   const sql = `
//     SELECT * FROM register_otp
//     WHERE email = ? AND otp = ?
//     ORDER BY created_at DESC
//     LIMIT 1
//   `;

//   db.query(sql, [email, otp], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     const tempUser = results[0];

//     // Insert into Users table
//     const insertUser = `
//       INSERT INTO Users (name, email, password)
//       VALUES (?, ?, ?)
//     `;

//     db.query(
//       insertUser,
//       [tempUser.username, tempUser.email, tempUser.password],
//       (err2) => {
//         if (err2) {
//           // If duplicate email (just in case)
//           if (err2.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({ success: false, message: "Email already registered" });
//           }
//           return res.status(500).json({ success: false, message: "Account creation failed" });
//         }

//         // Delete OTP record after success
//         db.query("DELETE FROM register_otp WHERE email = ?", [email]);

//         res.json({ success: true, message: "Account created successfully" });
//       }
//     );
//   });
// });

// // ================= LOGIN =================
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = results[0];

//     try {
//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid password" });
//       }

//       const token = jwt.sign(
//         { id: user.id, email: user.email },
//         "secretkey",
//         { expiresIn: "1h" }
//       );

//       res.json({
//         message: "Login successful",
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   });
// });

// // ================= FORGOT PASSWORD: CHECK EMAIL =================
// app.post("/auth/check-email", (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ message: "Email required" });

//   db.query("SELECT id FROM Users WHERE email = ?", [email], (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length === 0) return res.json({ exists: false });
//     return res.json({ exists: true });
//   });
// });

// // ================= FORGOT PASSWORD: RESET PASSWORD =================
// app.post("/auth/reset-password", async (req, res) => {
//   const { email, newPassword } = req.body;

//   if (!email || !newPassword) {
//     return res.status(400).json({ message: "Email and newPassword required" });
//   }

//   if (newPassword.length < 6) {
//     return res.status(400).json({ message: "Password must be at least 6 characters" });
//   }

//   db.query("SELECT id FROM Users WHERE email = ?", [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (results.length === 0) {
//       return res.status(404).json({ message: "Email not found" });
//     }

//     try {
//       const hashed = await bcrypt.hash(newPassword, 10);

//       db.query(
//         "UPDATE Users SET password = ? WHERE email = ?",
//         [hashed, email],
//         (err2) => {
//           if (err2) return res.status(500).json({ message: "Failed to update password" });

//           return res.json({ success: true, message: "Password updated successfully" });
//         }
//       );
//     } catch (e) {
//       return res.status(500).json({ message: "Server error" });
//     }
//   });
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ================= CONFIG =================
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ================= MAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOtpEmail(toEmail, otp) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: "TaxPal OTP Verification",
    text: `Your TaxPal OTP is ${otp}. It is valid for 5 minutes.`,
  });
}

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("TaxPal Backend Running");
});

// ================= SEND REGISTER OTP =================

app.post("/send-register-otp", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT id FROM Users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.log("DB SELECT ERROR:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // ✅ expires in 5 minutes
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const sql = `
        INSERT INTO register_otp (username, email, password, otp, expires_at)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [username, email, hashedPassword, otp, expiresAt], async (err2) => {
        if (err2) {
          // ✅ THIS IS THE MAIN CHANGE (shows exact DB insert reason)
          console.log("DB INSERT ERROR:", err2);

          return res.status(500).json({
            message: "Failed to generate OTP",
            error: err2.message,      // e.g., Unknown column 'expires_at'
            code: err2.code           // e.g., ER_BAD_FIELD_ERROR
          });
        }

        // ✅ Now try sending email
        try {
          await sendOtpEmail(email, otp);
          return res.json({
            success: true,
            message: "OTP sent successfully to your email",
          });
        } catch (mailErr) {
          console.log("EMAIL SEND ERROR:", mailErr);

          return res.status(500).json({
            message: "OTP saved but email sending failed",
            error: mailErr.message,
          });
        }
      });
    } catch (error) {
      console.log("SERVER ERROR:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
});

// ================= VERIFY REGISTER OTP =================
app.post("/verify-register-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const sql = `
    SELECT * FROM register_otp
    WHERE email = ? AND otp = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(sql, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const tempUser = results[0];

    // ✅ expiry check
    if (tempUser.expires_at && new Date(tempUser.expires_at) < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired. Please resend OTP." });
    }

    const insertUser = `
      INSERT INTO Users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(insertUser, [tempUser.username, tempUser.email, tempUser.password], (err2) => {
      if (err2) {
        if (err2.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ success: false, message: "Email already registered" });
        }
        return res.status(500).json({ success: false, message: "Account creation failed" });
      }

      // cleanup otp rows
      db.query("DELETE FROM register_otp WHERE email = ?", [email]);

      return res.json({ success: true, message: "Account created successfully" });
    });
  });
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
});

// ================= FORGOT PASSWORD: CHECK EMAIL =================
app.post("/auth/check-email", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  db.query("SELECT id FROM Users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    return res.json({ exists: results.length > 0 });
  });
});

// ================= FORGOT PASSWORD: RESET PASSWORD =================
app.post("/auth/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and newPassword required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  db.query("SELECT id FROM Users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    try {
      const hashed = await bcrypt.hash(newPassword, 10);

      db.query("UPDATE Users SET password = ? WHERE email = ?", [hashed, email], (err2) => {
        if (err2) return res.status(500).json({ message: "Failed to update password" });

        return res.json({ success: true, message: "Password updated successfully" });
      });
    } catch (e) {
      return res.status(500).json({ message: "Server error" });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});