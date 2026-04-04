import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  const token = localStorage.getItem("token");

  const incomeCategories = ["Salary", "Freelance", "Business", "Investment", "Bonus", "Other"];
  const expenseCategories = ["Food", "Rent", "Transport", "Utilities", "Shopping", "Health", "Education", "Business Expense", "Entertainment", "Other"];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setTransactions([]);
        return;
      }

      const data = await res.json();
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type) => {
    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setFormLoading(true);
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount: formData.amount,
          category: formData.category,
          date: formData.date,
          description: formData.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      alert(`${type === "income" ? "Income" : "Expense"} added successfully`);
      setFormData({ amount: "", category: "", date: "", description: "" });
      setShowIncomeModal(false);
      setShowExpenseModal(false);
      fetchTransactions();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filterType !== "all" && t.type?.toLowerCase() !== filterType) return false;
      if (filterCategory !== "all" && t.category !== filterCategory) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          (t.category || "").toLowerCase().includes(term) ||
          (t.description || "").toLowerCase().includes(term) ||
          String(t.amount).includes(term)
        );
      }
      return true;
    });
  }, [transactions, filterType, filterCategory, searchTerm]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type?.toLowerCase() === "income")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type?.toLowerCase() === "expense")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [transactions]);

  const allCategories = useMemo(() => {
    const cats = new Set();
    transactions.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return Array.from(cats).sort();
  }, [transactions]);

  const fmt = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="txn-page-shell">
      <Sidebar />

      <main className="txn-page-main">
        <div className="txn-page-header">
          <div>
            <h2 className="txn-page-title">Transactions</h2>
            <p className="txn-page-subtitle">
              View and manage all your income and expense records
            </p>
          </div>
          <div className="txn-page-actions">
            <button
              className="txn-add-btn income"
              onClick={() => {
                setFormData({ ...formData, category: "Salary" });
                setShowIncomeModal(true);
              }}
            >
              ✚ Record Income
            </button>
            <button
              className="txn-add-btn expense"
              onClick={() => {
                setFormData({ ...formData, category: "Food" });
                setShowExpenseModal(true);
              }}
            >
              ━ Record Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="txn-summary-row">
          <div className="txn-summary-card">
            <p className="txn-sum-label">Total Income</p>
            <p className="txn-sum-value income-color">{fmt(totalIncome)}</p>
          </div>
          <div className="txn-summary-card">
            <p className="txn-sum-label">Total Expenses</p>
            <p className="txn-sum-value expense-color">{fmt(totalExpenses)}</p>
          </div>
          <div className="txn-summary-card">
            <p className="txn-sum-label">Net Balance</p>
            <p className={`txn-sum-value ${totalIncome - totalExpenses >= 0 ? "income-color" : "expense-color"}`}>
              {fmt(totalIncome - totalExpenses)}
            </p>
          </div>
          <div className="txn-summary-card">
            <p className="txn-sum-label">Total Records</p>
            <p className="txn-sum-value">{transactions.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="txn-filters">
          <input
            type="text"
            className="txn-search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="txn-filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="txn-filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Transactions Table */}
        <div className="txn-table-card">
          <div className="txn-table-scroll">
            <table className="txn-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="txn-empty">Loading...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="txn-empty">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id}>
                      <td>{new Date(t.date).toLocaleDateString("en-IN")}</td>
                      <td>
                        <span className={`txn-type-badge ${t.type?.toLowerCase()}`}>
                          {t.type}
                        </span>
                      </td>
                      <td>{t.category || "-"}</td>
                      <td>{t.description || "-"}</td>
                      <td className={t.type?.toLowerCase() === "income" ? "income-color" : "expense-color"}>
                        {t.type?.toLowerCase() === "income" ? "+" : "-"}{fmt(t.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="txn-modal-overlay" onClick={() => setShowIncomeModal(false)}>
          <div className="txn-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="txn-modal-header">
              <h2>Record Income</h2>
              <button className="txn-modal-close" onClick={() => setShowIncomeModal(false)}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("income"); }} className="txn-modal-form">
              <div className="txn-modal-group">
                <label>Amount *</label>
                <input type="number" name="amount" placeholder="Enter amount" value={formData.amount} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleFormChange}>
                  {incomeCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="txn-modal-group">
                <label>Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-group">
                <label>Description</label>
                <input type="text" name="description" placeholder="Optional" value={formData.description} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-actions">
                <button type="button" className="txn-modal-cancel" onClick={() => setShowIncomeModal(false)}>Cancel</button>
                <button type="submit" className="txn-modal-submit income" disabled={formLoading}>
                  {formLoading ? "Saving..." : "Save Income"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="txn-modal-overlay" onClick={() => setShowExpenseModal(false)}>
          <div className="txn-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="txn-modal-header">
              <h2>Record Expense</h2>
              <button className="txn-modal-close" onClick={() => setShowExpenseModal(false)}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit("expense"); }} className="txn-modal-form">
              <div className="txn-modal-group">
                <label>Amount *</label>
                <input type="number" name="amount" placeholder="Enter amount" value={formData.amount} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleFormChange}>
                  {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="txn-modal-group">
                <label>Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-group">
                <label>Description</label>
                <input type="text" name="description" placeholder="Optional" value={formData.description} onChange={handleFormChange} />
              </div>
              <div className="txn-modal-actions">
                <button type="button" className="txn-modal-cancel" onClick={() => setShowExpenseModal(false)}>Cancel</button>
                <button type="submit" className="txn-modal-submit expense" disabled={formLoading}>
                  {formLoading ? "Saving..." : "Save Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
