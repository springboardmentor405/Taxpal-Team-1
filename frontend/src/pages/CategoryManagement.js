// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import "./CategoryManagement.css";

// export default function CategoryManagement() {
//   const [expenseCategories, setExpenseCategories] = useState([
//     "Food", "Rent", "Transport", "Utilities", "Shopping",
//     "Health", "Education", "Entertainment", "Business Expense", "Other",
//   ]);

//   const [incomeCategories, setIncomeCategories] = useState([
//     "Salary", "Freelance", "Business", "Investment", "Bonus", "Other",
//   ]);

//   const [newExpense, setNewExpense] = useState("");
//   const [newIncome, setNewIncome] = useState("");
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [editingIncome, setEditingIncome] = useState(null);
//   const [editValue, setEditValue] = useState("");

//   const addExpenseCategory = () => {
//     const trimmed = newExpense.trim();
//     if (!trimmed) return;
//     if (expenseCategories.includes(trimmed)) {
//       alert("Category already exists");
//       return;
//     }
//     setExpenseCategories([...expenseCategories, trimmed]);
//     setNewExpense("");
//   };

//   const addIncomeCategory = () => {
//     const trimmed = newIncome.trim();
//     if (!trimmed) return;
//     if (incomeCategories.includes(trimmed)) {
//       alert("Category already exists");
//       return;
//     }
//     setIncomeCategories([...incomeCategories, trimmed]);
//     setNewIncome("");
//   };

//   const deleteExpense = (cat) => {
//     if (window.confirm(`Delete "${cat}" category?`)) {
//       setExpenseCategories(expenseCategories.filter((c) => c !== cat));
//     }
//   };

//   const deleteIncome = (cat) => {
//     if (window.confirm(`Delete "${cat}" category?`)) {
//       setIncomeCategories(incomeCategories.filter((c) => c !== cat));
//     }
//   };

//   const startEditExpense = (cat) => {
//     setEditingExpense(cat);
//     setEditValue(cat);
//   };

//   const startEditIncome = (cat) => {
//     setEditingIncome(cat);
//     setEditValue(cat);
//   };

//   const saveEditExpense = () => {
//     const trimmed = editValue.trim();
//     if (!trimmed) return;
//     setExpenseCategories(
//       expenseCategories.map((c) => (c === editingExpense ? trimmed : c))
//     );
//     setEditingExpense(null);
//     setEditValue("");
//   };

//   const saveEditIncome = () => {
//     const trimmed = editValue.trim();
//     if (!trimmed) return;
//     setIncomeCategories(
//       incomeCategories.map((c) => (c === editingIncome ? trimmed : c))
//     );
//     setEditingIncome(null);
//     setEditValue("");
//   };

//   const handleKeyDown = (e, saveFunc) => {
//     if (e.key === "Enter") saveFunc();
//     if (e.key === "Escape") {
//       setEditingExpense(null);
//       setEditingIncome(null);
//       setEditValue("");
//     }
//   };

//   return (
//     <div className="cat-shell">
//       <Sidebar />

//       <main className="cat-main">
//         <div className="cat-header">
//           <h2 className="cat-title">Category Management</h2>
//           <p className="cat-subtitle">
//             Manage your income and expense categories
//           </p>
//         </div>

//         <div className="cat-grid">
//           {/* Expense Categories */}
//           <div className="cat-section-card">
//             <div className="cat-section-header expense-header">
//               <h3>Expense Categories</h3>
//               <span className="cat-count">{expenseCategories.length}</span>
//             </div>

//             <div className="cat-add-row">
//               <input
//                 type="text"
//                 placeholder="New expense category..."
//                 value={newExpense}
//                 onChange={(e) => setNewExpense(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addExpenseCategory()}
//               />
//               <button className="cat-add-btn expense-btn" onClick={addExpenseCategory}>
//                 + Add
//               </button>
//             </div>

//             <div className="cat-list">
//               {expenseCategories.map((cat) => (
//                 <div key={cat} className="cat-item">
//                   {editingExpense === cat ? (
//                     <div className="cat-edit-row">
//                       <input
//                         type="text"
//                         value={editValue}
//                         onChange={(e) => setEditValue(e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(e, saveEditExpense)}
//                         autoFocus
//                       />
//                       <button className="cat-save-btn" onClick={saveEditExpense}>✓</button>
//                       <button className="cat-cancel-btn" onClick={() => setEditingExpense(null)}>✕</button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="cat-item-left">
//                         <span className="cat-dot expense-dot"></span>
//                         <span className="cat-name">{cat}</span>
//                       </div>
//                       <div className="cat-item-actions">
//                         <button className="cat-edit" onClick={() => startEditExpense(cat)}>✎</button>
//                         <button className="cat-delete" onClick={() => deleteExpense(cat)}>🗑</button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Income Categories */}
//           <div className="cat-section-card">
//             <div className="cat-section-header income-header">
//               <h3>Income Categories</h3>
//               <span className="cat-count">{incomeCategories.length}</span>
//             </div>

//             <div className="cat-add-row">
//               <input
//                 type="text"
//                 placeholder="New income category..."
//                 value={newIncome}
//                 onChange={(e) => setNewIncome(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addIncomeCategory()}
//               />
//               <button className="cat-add-btn income-btn" onClick={addIncomeCategory}>
//                 + Add
//               </button>
//             </div>

//             <div className="cat-list">
//               {incomeCategories.map((cat) => (
//                 <div key={cat} className="cat-item">
//                   {editingIncome === cat ? (
//                     <div className="cat-edit-row">
//                       <input
//                         type="text"
//                         value={editValue}
//                         onChange={(e) => setEditValue(e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(e, saveEditIncome)}
//                         autoFocus
//                       />
//                       <button className="cat-save-btn" onClick={saveEditIncome}>✓</button>
//                       <button className="cat-cancel-btn" onClick={() => setEditingIncome(null)}>✕</button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="cat-item-left">
//                         <span className="cat-dot income-dot"></span>
//                         <span className="cat-name">{cat}</span>
//                       </div>
//                       <div className="cat-item-actions">
//                         <button className="cat-edit" onClick={() => startEditIncome(cat)}>✎</button>
//                         <button className="cat-delete" onClick={() => deleteIncome(cat)}>🗑</button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./CategoryManagement.css";

const API = "http://localhost:5000";

const DEFAULT_EXPENSE = [
  "Food", "Rent", "Transport", "Utilities", "Shopping",
  "Health", "Education", "Entertainment", "Business Expense", "Other",
];

const DEFAULT_INCOME = [
  "Salary", "Freelance", "Business", "Investment", "Bonus", "Other",
];

export default function CategoryManagement() {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [newIncome, setNewIncome] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchAndSeedCategories();
  }, []);

  // ===== FETCH and SEED defaults if empty =====
  const fetchAndSeedCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/categories`, { headers });
      const data = await res.json();

      if (!res.ok) {
        alert("Failed to load categories");
        return;
      }

      const expenses = data.categories.filter((c) => c.type === "expense");
      const incomes = data.categories.filter((c) => c.type === "income");

      // If user has no categories yet, seed the defaults
      if (expenses.length === 0 && incomes.length === 0) {
        await seedDefaults();
        return; // seedDefaults will re-fetch after inserting
      }

      setExpenseCategories(expenses);
      setIncomeCategories(incomes);
    } catch (err) {
      console.error("Fetch categories error:", err);
      alert("Server error while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  // ===== INSERT all defaults into MySQL =====
  const seedDefaults = async () => {
    try {
      const allDefaults = [
        ...DEFAULT_EXPENSE.map((name) => ({ name, type: "expense" })),
        ...DEFAULT_INCOME.map((name) => ({ name, type: "income" })),
      ];

      // Insert all defaults one by one
      await Promise.all(
        allDefaults.map((cat) =>
          fetch(`${API}/api/categories`, {
            method: "POST",
            headers,
            body: JSON.stringify(cat),
          })
        )
      );

      // Re-fetch after seeding
      const res = await fetch(`${API}/api/categories`, { headers });
      const data = await res.json();

      if (res.ok) {
        setExpenseCategories(data.categories.filter((c) => c.type === "expense"));
        setIncomeCategories(data.categories.filter((c) => c.type === "income"));
      }
    } catch (err) {
      console.error("Seed defaults error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== ADD new category =====
  const addCategory = async (name, type, setNew) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${API}/api/categories`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: trimmed, type }),
      });
      const data = await res.json();

      if (res.ok) {
        const newCat = { id: data.id, name: trimmed, type };
        if (type === "expense") {
          setExpenseCategories((prev) => [...prev, newCat]);
        } else {
          setIncomeCategories((prev) => [...prev, newCat]);
        }
        setNew("");
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Add category error:", err);
      alert("Server error");
    }
  };

  // ===== DELETE category =====
  const deleteCategory = async (id, type) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${API}/api/categories/${id}`, {
        method: "DELETE",
        headers,
      });

      if (res.ok) {
        if (type === "expense") {
          setExpenseCategories((prev) => prev.filter((c) => c.id !== id));
        } else {
          setIncomeCategories((prev) => prev.filter((c) => c.id !== id));
        }
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete category error:", err);
      alert("Server error");
    }
  };

  // ===== EDIT category =====
  const saveEdit = async (id, type) => {
    const trimmed = editValue.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${API}/api/categories/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ name: trimmed }),
      });

      if (res.ok) {
        if (type === "expense") {
          setExpenseCategories((prev) =>
            prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
          );
        } else {
          setIncomeCategories((prev) =>
            prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
          );
        }
        setEditingId(null);
        setEditValue("");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error("Edit category error:", err);
      alert("Server error");
    }
  };

  const handleKeyDown = (e, id, type) => {
    if (e.key === "Enter") saveEdit(id, type);
    if (e.key === "Escape") {
      setEditingId(null);
      setEditValue("");
    }
  };

  const renderList = (categories, type) =>
    categories.map((cat) => (
      <div key={cat.id} className="cat-item">
        {editingId === cat.id ? (
          <div className="cat-edit-row">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, cat.id, type)}
              autoFocus
            />
            <button className="cat-save-btn" onClick={() => saveEdit(cat.id, type)}>✓</button>
            <button className="cat-cancel-btn" onClick={() => setEditingId(null)}>✕</button>
          </div>
        ) : (
          <>
            <div className="cat-item-left">
              <span className={`cat-dot ${type}-dot`}></span>
              <span className="cat-name">{cat.name}</span>
            </div>
            <div className="cat-item-actions">
              <button className="cat-edit" onClick={() => { setEditingId(cat.id); setEditValue(cat.name); }}>✎</button>
              <button className="cat-delete" onClick={() => deleteCategory(cat.id, type)}>🗑</button>
            </div>
          </>
        )}
      </div>
    ));

  if (loading) {
    return (
      <div className="cat-shell">
        <Sidebar />
        <main className="cat-main">
          <p>Loading categories...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="cat-shell">
      <Sidebar />
      <main className="cat-main">
        <div className="cat-header">
          <h2 className="cat-title">Category Management</h2>
          <p className="cat-subtitle">Manage your income and expense categories</p>
        </div>

        <div className="cat-grid">
          {/* Expense Categories */}
          <div className="cat-section-card">
            <div className="cat-section-header expense-header">
              <h3>Expense Categories</h3>
              <span className="cat-count">{expenseCategories.length}</span>
            </div>
            <div className="cat-add-row">
              <input
                type="text"
                placeholder="New expense category..."
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory(newExpense, "expense", setNewExpense)}
              />
              <button className="cat-add-btn expense-btn"
                onClick={() => addCategory(newExpense, "expense", setNewExpense)}>
                + Add
              </button>
            </div>
            <div className="cat-list">{renderList(expenseCategories, "expense")}</div>
          </div>

          {/* Income Categories */}
          <div className="cat-section-card">
            <div className="cat-section-header income-header">
              <h3>Income Categories</h3>
              <span className="cat-count">{incomeCategories.length}</span>
            </div>
            <div className="cat-add-row">
              <input
                type="text"
                placeholder="New income category..."
                value={newIncome}
                onChange={(e) => setNewIncome(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory(newIncome, "income", setNewIncome)}
              />
              <button className="cat-add-btn income-btn"
                onClick={() => addCategory(newIncome, "income", setNewIncome)}>
                + Add
              </button>
            </div>
            <div className="cat-list">{renderList(incomeCategories, "income")}</div>
          </div>
        </div>
      </main>
    </div>
  );
}