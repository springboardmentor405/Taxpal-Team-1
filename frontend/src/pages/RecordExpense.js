import React, { useState } from "react";
import "./TransactionForm.css";

export default function RecordExpense({ onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "expense",
          amount,
          category,
          date,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save expense");
        return;
      }

      alert("Expense added successfully");
      onSuccess();
    } catch (error) {
      console.error("Expense save error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="txn-modal-overlay">
      <div className="txn-modal-card">
        <div className="txn-header">
          <h2>Record Expense</h2>
          <button className="txn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="txn-form">
          <div className="txn-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="txn-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Business Expense">Business Expense</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="txn-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="txn-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="txn-actions">
            <button type="button" className="txn-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="txn-save-btn expense-save" disabled={loading}>
              {loading ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}