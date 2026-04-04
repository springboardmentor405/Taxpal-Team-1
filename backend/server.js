// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const db = require("./db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");

// const app = express();

// app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
// app.use(express.json());

// // ================= CONFIG =================
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// // ================= AUTH MIDDLEWARE =================
// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

// // ================= MAIL =================
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// async function sendOtpEmail(email, otp) {
//   await transporter.sendMail({
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: "TaxPal OTP",
//     text: `Your OTP is ${otp}`,
//   });
// }

// // ================= HOME =================
// app.get("/", (req, res) => {
//   res.send("TaxPal Backend Running");
// });

// // ================= REGISTER OTP =================
// app.post("/send-register-otp", async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   db.query("SELECT id FROM Users WHERE email=?", [email], async (err, result) => {
//     if (err) return res.status(500).json({ message: "Database error" });

//     if (result.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     try {
//       const hashed = await bcrypt.hash(password, 10);
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiry = new Date(Date.now() + 5 * 60 * 1000);

//       db.query(
//         "INSERT INTO register_otp (username,email,password,otp,expires_at) VALUES (?,?,?,?,?)",
//         [username, email, hashed, otp, expiry],
//         async (err2) => {
//           if (err2) {
//             console.log("Register OTP insert error:", err2);
//             return res.status(500).json({ message: "OTP error" });
//           }

//           try {
//             await sendOtpEmail(email, otp);
//             res.json({ success: true, message: "OTP sent" });
//           } catch (mailErr) {
//             console.log("OTP mail error:", mailErr);
//             res.status(500).json({ message: "OTP saved but email failed" });
//           }
//         }
//       );
//     } catch (hashErr) {
//       console.log("Password hash error:", hashErr);
//       return res.status(500).json({ message: "Password processing failed" });
//     }
//   });
// });

// // ================= VERIFY OTP =================
// app.post("/verify-register-otp", (req, res) => {
//   const { email, otp } = req.body;

//   db.query(
//     "SELECT * FROM register_otp WHERE email=? AND otp=? ORDER BY created_at DESC LIMIT 1",
//     [email, otp],
//     (err, result) => {
//       if (err) {
//         console.log("Verify OTP fetch error:", err);
//         return res.status(500).json({ message: "Database error" });
//       }

//       if (result.length === 0) {
//         return res.status(400).json({ message: "Invalid OTP" });
//       }

//       const user = result[0];

//       if (new Date(user.expires_at) < new Date()) {
//         return res.status(400).json({ message: "OTP expired" });
//       }

//       db.query(
//         "INSERT INTO Users (name,email,password) VALUES (?,?,?)",
//         [user.username, user.email, user.password],
//         (err2) => {
//           if (err2) {
//             console.log("User insert after OTP error:", err2);
//             if (err2.code === "ER_DUP_ENTRY") {
//               return res.status(400).json({ message: "Email already registered" });
//             }
//             return res.status(500).json({ message: "Account creation failed" });
//           }

//           db.query("DELETE FROM register_otp WHERE email=?", [email], (deleteErr) => {
//             if (deleteErr) {
//               console.log("Register OTP delete error:", deleteErr);
//             }
//             res.json({ success: true, message: "Registered successfully" });
//           });
//         }
//       );
//     }
//   );
// });

// // ================= LOGIN =================
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   db.query("SELECT * FROM Users WHERE email=?", [email], async (err, result) => {
//     if (err) {
//       console.log("Login DB error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (result.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     try {
//       const user = result[0];
//       const match = await bcrypt.compare(password, user.password);

//       if (!match) {
//         return res.status(400).json({ message: "Wrong password" });
//       }

//       const token = jwt.sign(
//         { id: user.id, email: user.email },
//         JWT_SECRET,
//         { expiresIn: "8h" }
//       );

//       res.json({
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (compareErr) {
//       console.log("Login compare error:", compareErr);
//       return res.status(500).json({ message: "Login failed" });
//     }
//   });
// });

// // ================= RESET PASSWORD =================
// app.post("/auth/check-email", (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ message: "Email required" });

//   db.query("SELECT id FROM Users WHERE email=?", [email], (err, results) => {
//     if (err) {
//       console.log("Check email DB error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     return res.json({ exists: results.length > 0 });
//   });
// });

// app.post("/auth/reset-password", async (req, res) => {
//   const { email, newPassword } = req.body;

//   if (!email || !newPassword) {
//     return res.status(400).json({ message: "Email and newPassword required" });
//   }

//   try {
//     const hashed = await bcrypt.hash(newPassword, 10);

//     db.query("UPDATE Users SET password=? WHERE email=?", [hashed, email], (err) => {
//       if (err) {
//         console.log("Reset password DB error:", err);
//         return res.status(500).json({ message: "Update failed" });
//       }

//       res.json({ success: true });
//     });
//   } catch (hashErr) {
//     console.log("Reset password hash error:", hashErr);
//     return res.status(500).json({ message: "Password update failed" });
//   }
// });

// // ================= DASHBOARD =================
// app.get("/api/dashboard", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   db.query("SELECT id,name,email FROM Users WHERE id=?", [userId], (err, user) => {
//     if (err) {
//       console.log("Dashboard user fetch error:", err);
//       return res.status(500).json({ message: "User fetch failed" });
//     }

//     db.query(
//       "SELECT id,user_id,type,category,amount,date,COALESCE(description,'') AS description FROM Transactions WHERE user_id=? ORDER BY date DESC",
//       [userId],
//       (err2, transactions) => {
//         if (err2) {
//           console.log("Dashboard transactions fetch error:", err2);
//           return res.status(500).json({ message: "Transactions fetch failed" });
//         }

//         res.json({ user: user[0], transactions });
//       }
//     );
//   });
// });

// // ================= TRANSACTIONS =================
// app.get("/api/transactions", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { type, category, startDate, endDate } = req.query;

//   let sql =
//     "SELECT id,user_id,type,category,amount,date,COALESCE(description,'') AS description FROM Transactions WHERE user_id=?";
//   const params = [userId];

//   if (type && type !== "all") {
//     sql += " AND type=?";
//     params.push(type);
//   }

//   if (category && category !== "all") {
//     sql += " AND category=?";
//     params.push(category);
//   }

//   if (startDate) {
//     sql += " AND date>=?";
//     params.push(startDate);
//   }

//   if (endDate) {
//     sql += " AND date<=?";
//     params.push(endDate);
//   }

//   sql += " ORDER BY date DESC";

//   db.query(sql, params, (err, results) => {
//     if (err) {
//       console.log("GET transactions error:", err);
//       return res.status(500).json({ message: "Failed to fetch transactions" });
//     }

//     res.json({ transactions: results });
//   });
// });

// app.post("/api/transactions", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { type, category, amount, date, description } = req.body;

//   if (!type || !category || !amount || !date) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   db.query(
//     "INSERT INTO Transactions (user_id,type,category,amount,date,description) VALUES (?,?,?,?,?,?)",
//     [userId, type, category, amount, date, description || ""],
//     (err, result) => {
//       if (err) {
//         console.log("POST transaction error:", err);
//         return res.status(500).json({ message: "Insert failed" });
//       }

//       res.json({
//         success: true,
//         message: "Transaction added",
//         id: result.insertId,
//       });
//     }
//   );
// });

// app.delete("/api/transactions/:id", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { id } = req.params;

//   db.query(
//     "DELETE FROM Transactions WHERE id=? AND user_id=?",
//     [id, userId],
//     (err, result) => {
//       if (err) {
//         console.log("Delete transaction error:", err);
//         return res.status(500).json({ message: "Delete failed" });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Transaction not found" });
//       }

//       res.json({ success: true, message: "Transaction deleted" });
//     }
//   );
// });

// // ================= CATEGORIES =================
// app.get("/api/categories", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   db.query(
//     "SELECT id, name, type FROM Categories WHERE user_id=? ORDER BY type, name",
//     [userId],
//     (err, results) => {
//       if (err) {
//         console.log("GET categories error:", err);
//         return res.status(500).json({ message: "Failed to fetch categories" });
//       }

//       res.json({ categories: results });
//     }
//   );
// });

// app.post("/api/categories", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { name, type } = req.body;

//   if (!name || !type) {
//     return res.status(400).json({ message: "Name and type required" });
//   }

//   db.query(
//     "SELECT id FROM Categories WHERE user_id=? AND name=? AND type=?",
//     [userId, name, type],
//     (err, existing) => {
//       if (err) {
//         console.log("Check category duplicate error:", err);
//         return res.status(500).json({ message: "Database error" });
//       }

//       if (existing.length > 0) {
//         return res.status(400).json({ message: "Category already exists" });
//       }

//       db.query(
//         "INSERT INTO Categories (user_id, name, type) VALUES (?,?,?)",
//         [userId, name, type],
//         (err2, result) => {
//           if (err2) {
//             console.log("Insert category error:", err2);
//             return res.status(500).json({ message: "Insert failed" });
//           }

//           res.json({ success: true, id: result.insertId, name, type });
//         }
//       );
//     }
//   );
// });

// app.put("/api/categories/:id", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { id } = req.params;
//   const { name } = req.body;

//   if (!name) return res.status(400).json({ message: "Name required" });

//   db.query(
//     "UPDATE Categories SET name=? WHERE id=? AND user_id=?",
//     [name, id, userId],
//     (err, result) => {
//       if (err) {
//         console.log("Update category error:", err);
//         return res.status(500).json({ message: "Update failed" });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Not found" });
//       }

//       res.json({ success: true });
//     }
//   );
// });

// app.delete("/api/categories/:id", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { id } = req.params;

//   db.query(
//     "DELETE FROM Categories WHERE id=? AND user_id=?",
//     [id, userId],
//     (err, result) => {
//       if (err) {
//         console.log("Delete category error:", err);
//         return res.status(500).json({ message: "Delete failed" });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Not found" });
//       }

//       res.json({ success: true });
//     }
//   );
// });

// // ================= BUDGETS =================
// app.get("/budgets/:userId", (req, res) => {
//   const { userId } = req.params;

//   const sql = `
//     SELECT
//       id,
//       user_id,
//       category,
//       budget_limit AS \`limit\`,
//       month,
//       COALESCE(description, '') AS description,
//       COALESCE(spent, 0) AS spent,
//       created_at
//     FROM Budgets
//     WHERE user_id = ?
//     ORDER BY created_at DESC, id DESC
//   `;

//   db.query(sql, [userId], (err, results) => {
//     if (err) {
//       console.log("GET budgets error:", err);
//       return res.status(500).json({
//         message: "Failed to fetch budgets",
//         error: err.message,
//       });
//     }

//     res.json(results);
//   });
// });

// app.post("/budgets", (req, res) => {
//   const { user_id, category, limit, month, description } = req.body;

//   if (!user_id || !category || !limit || !month) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const sql = `
//     INSERT INTO Budgets (user_id, category, budget_limit, month, description, spent)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     sql,
//     [Number(user_id), category, Number(limit), month, description || "", 0],
//     (err, result) => {
//       if (err) {
//         console.log("POST budget error:", err);
//         return res.status(500).json({
//           message: "Failed to create budget",
//           error: err.message,
//         });
//       }

//       res.status(201).json({
//         success: true,
//         message: "Budget created successfully",
//         id: result.insertId,
//       });
//     }
//   );
// });

// app.delete("/budgets/:id", (req, res) => {
//   const { id } = req.params;

//   db.query("DELETE FROM Budgets WHERE id=?", [id], (err, result) => {
//     if (err) {
//       console.log("DELETE budget error:", err);
//       return res.status(500).json({ message: "Delete failed" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Budget not found" });
//     }

//     res.json({ success: true, message: "Budget deleted successfully" });
//   });
// });

// // ================= TAX CALCULATIONS =================
// app.post("/api/tax", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const {
//     country,
//     financial_year,
//     gross_income,
//     tax_regime,
//     quarterly_tax,
//     annual_tax,
//     effective_rate,
//   } = req.body;

//   db.query(
//     "INSERT INTO TaxCalculations (user_id, country, financial_year, gross_income, tax_regime, quarterly_tax, annual_tax, effective_rate) VALUES (?,?,?,?,?,?,?,?)",
//     [
//       userId,
//       country || "India",
//       financial_year,
//       gross_income,
//       tax_regime,
//       quarterly_tax,
//       annual_tax,
//       effective_rate,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log("Tax save error:", err);
//         return res.status(500).json({ message: "Failed to save calculation" });
//       }

//       res.json({ success: true, id: result.insertId });
//     }
//   );
// });

// app.get("/api/tax", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   db.query(
//     "SELECT * FROM TaxCalculations WHERE user_id=? ORDER BY calculated_at DESC LIMIT 10",
//     [userId],
//     (err, results) => {
//       if (err) {
//         console.log("Tax history fetch error:", err);
//         return res.status(500).json({ message: "Failed to fetch history" });
//       }

//       res.json({ history: results });
//     }
//   );
// });

// // ================= START SERVER =================
// app.listen(PORT, () => {
//   console.log(`TaxPal server running on port ${PORT}`);
// });


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

// ================= CONFIG =================
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ================= AUTH MIDDLEWARE =================
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ================= MAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "TaxPal OTP",
    text: `Your OTP is ${otp}`,
  });
}

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("TaxPal Backend Running");
});

// ================= REGISTER OTP =================
app.post("/send-register-otp", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query("SELECT id FROM Users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.log("Register check email error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    try {
      const hashed = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 5 * 60 * 1000);

      db.query(
        "INSERT INTO register_otp (username, email, password, otp, expires_at) VALUES (?, ?, ?, ?, ?)",
        [username, email, hashed, otp, expiry],
        async (err2) => {
          if (err2) {
            console.log("Register OTP insert error:", err2);
            return res.status(500).json({ message: "OTP error" });
          }

          try {
            await sendOtpEmail(email, otp);
            return res.json({ success: true, message: "OTP sent" });
          } catch (mailErr) {
            console.log("OTP mail error:", mailErr);
            return res.status(500).json({ message: "OTP saved but email failed" });
          }
        }
      );
    } catch (hashErr) {
      console.log("Password hash error:", hashErr);
      return res.status(500).json({ message: "Password processing failed" });
    }
  });
});

// ================= VERIFY OTP =================
app.post("/verify-register-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  db.query(
    "SELECT * FROM register_otp WHERE email = ? AND otp = ? ORDER BY created_at DESC LIMIT 1",
    [email, otp],
    (err, result) => {
      if (err) {
        console.log("Verify OTP fetch error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      const user = result[0];

      if (new Date(user.expires_at) < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
      }

      db.query(
        "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
        [user.username, user.email, user.password],
        (err2) => {
          if (err2) {
            console.log("User insert after OTP error:", err2);

            if (err2.code === "ER_DUP_ENTRY") {
              return res.status(400).json({ message: "Email already registered" });
            }

            return res.status(500).json({ message: "Account creation failed" });
          }

          db.query("DELETE FROM register_otp WHERE email = ?", [email], (deleteErr) => {
            if (deleteErr) {
              console.log("Register OTP delete error:", deleteErr);
            }

            return res.json({ success: true, message: "Registered successfully" });
          });
        }
      );
    }
  );
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query("SELECT * FROM Users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.log("Login DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    try {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (compareErr) {
      console.log("Login compare error:", compareErr);
      return res.status(500).json({ message: "Login failed" });
    }
  });
});

// ================= RESET PASSWORD =================
app.post("/auth/check-email", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  db.query("SELECT id FROM Users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.log("Check email DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    return res.json({ exists: results.length > 0 });
  });
});

app.post("/auth/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and newPassword required" });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    db.query("UPDATE Users SET password = ? WHERE email = ?", [hashed, email], (err) => {
      if (err) {
        console.log("Reset password DB error:", err);
        return res.status(500).json({ message: "Update failed" });
      }

      return res.json({ success: true });
    });
  } catch (hashErr) {
    console.log("Reset password hash error:", hashErr);
    return res.status(500).json({ message: "Password update failed" });
  }
});

// ================= DASHBOARD =================
app.get("/api/dashboard", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT id, name, email FROM Users WHERE id = ?", [userId], (err, user) => {
    if (err) {
      console.log("Dashboard user fetch error:", err);
      return res.status(500).json({ message: "User fetch failed" });
    }

    db.query(
      "SELECT id, user_id, type, category, amount, date, COALESCE(description, '') AS description FROM Transactions WHERE user_id = ? ORDER BY date DESC",
      [userId],
      (err2, transactions) => {
        if (err2) {
          console.log("Dashboard transactions fetch error:", err2);
          return res.status(500).json({ message: "Transactions fetch failed" });
        }

        return res.json({
          user: user[0] || null,
          transactions,
        });
      }
    );
  });
});

// ================= TRANSACTIONS =================
app.get("/api/transactions", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { type, category, startDate, endDate } = req.query;

  let sql =
    "SELECT id, user_id, type, category, amount, date, COALESCE(description, '') AS description FROM Transactions WHERE user_id = ?";
  const params = [userId];

  if (type && type !== "all") {
    sql += " AND type = ?";
    params.push(type);
  }

  if (category && category !== "all") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (startDate) {
    sql += " AND date >= ?";
    params.push(startDate);
  }

  if (endDate) {
    sql += " AND date <= ?";
    params.push(endDate);
  }

  sql += " ORDER BY date DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.log("GET transactions error:", err);
      return res.status(500).json({ message: "Failed to fetch transactions" });
    }

    return res.json({ transactions: results });
  });
});

app.post("/api/transactions", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { type, category, amount, date, description } = req.body;

  if (!type || !category || !amount || !date) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO Transactions (user_id, type, category, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, type, category, amount, date, description || ""],
    (err, result) => {
      if (err) {
        console.log("POST transaction error:", err);
        return res.status(500).json({ message: "Insert failed" });
      }

      return res.json({
        success: true,
        message: "Transaction added",
        id: result.insertId,
      });
    }
  );
});

app.delete("/api/transactions/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM Transactions WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {
      if (err) {
        console.log("Delete transaction error:", err);
        return res.status(500).json({ message: "Delete failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      return res.json({ success: true, message: "Transaction deleted" });
    }
  );
});

// ================= CATEGORIES =================
app.get("/api/categories", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, name, type FROM Categories WHERE user_id = ? ORDER BY type, name",
    [userId],
    (err, results) => {
      if (err) {
        console.log("GET categories error:", err);
        return res.status(500).json({ message: "Failed to fetch categories" });
      }

      return res.json({ categories: results });
    }
  );
});

app.post("/api/categories", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Name and type required" });
  }

  db.query(
    "SELECT id FROM Categories WHERE user_id = ? AND name = ? AND type = ?",
    [userId, name, type],
    (err, existing) => {
      if (err) {
        console.log("Check category duplicate error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (existing.length > 0) {
        return res.status(400).json({ message: "Category already exists" });
      }

      db.query(
        "INSERT INTO Categories (user_id, name, type) VALUES (?, ?, ?)",
        [userId, name, type],
        (err2, result) => {
          if (err2) {
            console.log("Insert category error:", err2);
            return res.status(500).json({ message: "Insert failed" });
          }

          return res.json({
            success: true,
            id: result.insertId,
            name,
            type,
          });
        }
      );
    }
  );
});

app.put("/api/categories/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  db.query(
    "UPDATE Categories SET name = ? WHERE id = ? AND user_id = ?",
    [name, id, userId],
    (err, result) => {
      if (err) {
        console.log("Update category error:", err);
        return res.status(500).json({ message: "Update failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.json({ success: true });
    }
  );
});

app.delete("/api/categories/:id", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  db.query(
    "DELETE FROM Categories WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {
      if (err) {
        console.log("Delete category error:", err);
        return res.status(500).json({ message: "Delete failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.json({ success: true });
    }
  );
});

// ================= BUDGETS =================
app.get("/budgets/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  const sql = `
    SELECT id, user_id, category, spending_limit, month
    FROM Budgets
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log("GET budgets error:", err);
      return res.status(500).json({
        message: "Failed to fetch budgets",
        error: err.message,
      });
    }

    const formatted = results.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      category: item.category,
      limit: Number(item.spending_limit || 0),
      month: item.month,
      spent: 0,
    }));

    return res.json(formatted);
  });
});

app.post("/budgets", (req, res) => {
  const { user_id, category, limit, month } = req.body;

  if (!user_id || !category || limit === undefined || limit === null || !month) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO Budgets (user_id, category, spending_limit, month)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Number(user_id), category, Number(limit), month],
    (err, result) => {
      if (err) {
        console.log("POST budget error:", err);
        return res.status(500).json({
          message: "Failed to create budget",
          error: err.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Budget created successfully",
        id: result.insertId,
      });
    }
  );
});

app.delete("/budgets/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Budgets WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("DELETE budget error:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.json({ success: true, message: "Budget deleted successfully" });
  });
});

// ================= TAX CALCULATIONS =================
app.post("/api/tax", verifyToken, (req, res) => {
  const userId = req.user.id;
  const {
    country,
    financial_year,
    gross_income,
    tax_regime,
    quarterly_tax,
    annual_tax,
    effective_rate,
  } = req.body;

  db.query(
    "INSERT INTO TaxCalculations (user_id, country, financial_year, gross_income, tax_regime, quarterly_tax, annual_tax, effective_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      country || "India",
      financial_year,
      gross_income,
      tax_regime,
      quarterly_tax,
      annual_tax,
      effective_rate,
    ],
    (err, result) => {
      if (err) {
        console.log("Tax save error:", err);
        return res.status(500).json({ message: "Failed to save calculation" });
      }

      return res.json({ success: true, id: result.insertId });
    }
  );
});

app.get("/api/tax", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM TaxCalculations WHERE user_id = ? ORDER BY calculated_at DESC LIMIT 10",
    [userId],
    (err, results) => {
      if (err) {
        console.log("Tax history fetch error:", err);
        return res.status(500).json({ message: "Failed to fetch history" });
      }

      return res.json({ history: results });
    }
  );
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`TaxPal server running on port ${PORT}`);
});