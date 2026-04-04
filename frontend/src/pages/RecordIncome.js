import React, { useState } from "react";
import "./TransactionForm.css";

export default function RecordIncome({ onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
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
          type: "income",
          amount,
          category,
          date,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save income");
        return;
      }

      alert("Income added successfully");
      onSuccess();
    } catch (error) {
      console.error("Income save error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="txn-modal-overlay">
      <div className="txn-modal-card">
        <div className="txn-header">
          <h2>Record Income</h2>
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
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Bonus">Bonus</option>
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
            <button type="submit" className="txn-save-btn income-save" disabled={loading}>
              {loading ? "Saving..." : "Save Income"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}