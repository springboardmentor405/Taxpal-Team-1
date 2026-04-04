import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem("username") || "User";
  const userEmail = localStorage.getItem("email") || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/transactions", label: "Transactions", icon: "🔄" },
    { path: "/budgets", label: "Budgets", icon: "🐷" },
    { path: "/categories", label: "Categories", icon: "🏷️" },
    { path: "/tax-estimator", label: "Tax Estimator", icon: "🧾" },
    { path: "/reports", label: "Reports", icon: "📁" },
  ];

  return (
    <aside className="tp-sidebar">
      <div>
        <h1 className="tp-brand">TaxPal</h1>

        <nav className="tp-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`tp-nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="tp-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="tp-sidebar-bottom">
        <div className="tp-profile">
          <div className="tp-avatar">
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="tp-profile-info">
            <p className="tp-profile-name">{userName}</p>
            <p className="tp-profile-email">{userEmail || "Logged in"}</p>
          </div>
        </div>

        <div className="tp-sidebar-actions">
          <button className="tp-side-link" onClick={() => navigate("/categories")}>
            ⚙️ Settings
          </button>
          <button className="tp-side-link" onClick={handleLogout}>
            ↪ Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
