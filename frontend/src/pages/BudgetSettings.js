// import React, { useEffect, useMemo, useState } from "react";
// import "./BudgetSettings.css";
// import Sidebar from "../components/Sidebar";

// export default function BudgetSettings() {
//   const userId = localStorage.getItem("userId");

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [budgets, setBudgets] = useState([]);

//   const [formData, setFormData] = useState({
//     category: "",
//     limit: "",
//     month: "",
//   });

//   const categories = [
//     "Food",
//     "Transport",
//     "Rent",
//     "Utilities",
//     "Shopping",
//     "Entertainment",
//     "Health",
//     "Education",
//     "Savings",
//     "Other",
//   ];

//   useEffect(() => {
//     if (userId) {
//       fetchBudgets();
//     } else {
//       setLoading(false);
//     }
//   }, [userId]);

//   const fetchBudgets = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`http://localhost:5000/budgets/${userId}`);
//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Fetch budgets failed:", data);
//         setBudgets([]);
//         return;
//       }

//       if (Array.isArray(data)) {
//         const formatted = data.map((item) => ({
//           ...item,
//           limit: Number(item.limit || 0),
//           spent: Number(item.spent || 0),
//         }));
//         setBudgets(formatted);
//       } else {
//         setBudgets([]);
//       }
//     } catch (error) {
//       console.error("Error fetching budgets:", error);
//       setBudgets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreateBudget = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("User not logged in properly");
//       return;
//     }

//     if (!formData.category || !formData.limit || !formData.month) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/budgets", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: Number(userId),
//           category: formData.category,
//           limit: Number(formData.limit),
//           month: formData.month,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Create budget failed:", data);
//         alert(data.message || "Failed to create budget");
//         return;
//       }

//       setFormData({
//         category: "",
//         limit: "",
//         month: "",
//       });

//       setShowCreateForm(false);
//       fetchBudgets();
//     } catch (error) {
//       console.error("Error creating budget:", error);
//       alert("Server error while creating budget");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/budgets/${id}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Delete budget failed:", data);
//         alert(data.message || "Failed to delete budget");
//         return;
//       }

//       fetchBudgets();
//     } catch (error) {
//       console.error("Error deleting budget:", error);
//       alert("Server error while deleting budget");
//     }
//   };

//   const totals = useMemo(() => {
//     const totalBudget = budgets.reduce(
//       (sum, item) => sum + Number(item.limit || 0),
//       0
//     );

//     const totalSpent = budgets.reduce(
//       (sum, item) => sum + Number(item.spent || 0),
//       0
//     );

//     const remaining = totalBudget - totalSpent;

//     let health = "Good";
//     if (totalBudget > 0) {
//       const ratio = totalSpent / totalBudget;
//       if (ratio >= 1) {
//         health = "Over Budget";
//       } else if (ratio >= 0.8) {
//         health = "Warning";
//       }
//     }

//     return {
//       totalBudget,
//       totalSpent,
//       remaining,
//       health,
//     };
//   }, [budgets]);

//   const getStatus = (spent, limit) => {
//     if (spent > limit) return "Over Budget";
//     if (spent >= limit * 0.8) return "Near Limit";
//     return "Good";
//   };

//   const getStatusClass = (status) => {
//     if (status === "Over Budget") return "danger";
//     if (status === "Near Limit") return "warning";
//     return "good";
//   };

//   const resetForm = () => {
//     setFormData({
//       category: "",
//       limit: "",
//       month: "",
//     });
//   };

//   return (
//     <div className="budget-shell">
//       <Sidebar />

//       <main className="budget-main">
//         {!showCreateForm ? (
//           <section className="budget-content-card">
//             <div className="budget-top-section">
//               <div className="budget-stat-grid">
//                 <div className="budget-stat-item">
//                   <h4>Total Budget</h4>
//                   <p>₹ {totals.totalBudget.toLocaleString()}</p>
//                 </div>

//                 <div className="budget-stat-item">
//                   <h4>Remaining</h4>
//                   <p>₹ {totals.remaining.toLocaleString()}</p>
//                 </div>

//                 <div className="budget-stat-item">
//                   <h4>Current spent</h4>
//                   <p>₹ {totals.totalSpent.toLocaleString()}</p>
//                 </div>

//                 <div className="budget-stat-item">
//                   <h4>Budget Health</h4>
//                   <p>{totals.health}</p>
//                 </div>
//               </div>

//               <div className="budget-top-action">
//                 <button
//                   type="button"
//                   className="primary-budget-btn"
//                   onClick={() => setShowCreateForm(true)}
//                 >
//                   Create New Budget
//                 </button>
//               </div>
//             </div>

//             <div className="budget-overview-section">
//               <div className="budget-overview-title">Budget Overview</div>

//               <div className="budget-table-scroll">
//                 <table className="budget-overview-table">
//                   <thead>
//                     <tr>
//                       <th>Category</th>
//                       <th>Budget</th>
//                       <th>Spent</th>
//                       <th>Balance</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {loading ? (
//                       <tr>
//                         <td colSpan="6" className="budget-empty-cell">
//                           Loading...
//                         </td>
//                       </tr>
//                     ) : budgets.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="budget-empty-cell">
//                           NO Result
//                         </td>
//                       </tr>
//                     ) : (
//                       budgets.map((item) => {
//                         const spent = Number(item.spent || 0);
//                         const limit = Number(item.limit || 0);
//                         const balance = limit - spent;
//                         const status = getStatus(spent, limit);

//                         return (
//                           <tr key={item.id}>
//                             <td>{item.category}</td>
//                             <td>₹ {limit.toLocaleString()}</td>
//                             <td>₹ {spent.toLocaleString()}</td>
//                             <td>₹ {balance.toLocaleString()}</td>
//                             <td>
//                               <span
//                                 className={`budget-status ${getStatusClass(status)}`}
//                               >
//                                 {status}
//                               </span>
//                             </td>
//                             <td>
//                               <button
//                                 type="button"
//                                 className="budget-delete-btn"
//                                 onClick={() => handleDelete(item.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </section>
//         ) : (
//           <section className="budget-form-shell">
//             <div className="budget-form-card">
//               <h2>Create New Budget</h2>

//               <form onSubmit={handleCreateBudget} className="budget-form">
//                 <div className="budget-form-row">
//                   <div className="budget-form-group">
//                     <label>Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((cat) => (
//                         <option key={cat} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="budget-form-group">
//                     <label>Budget Amount</label>
//                     <input
//                       type="number"
//                       name="limit"
//                       placeholder="₹ 0.00"
//                       value={formData.limit}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="budget-form-group budget-form-group-half">
//                   <label>Month</label>
//                   <input
//                     type="month"
//                     name="month"
//                     value={formData.month}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="budget-form-bottom">
//                   <button
//                     type="button"
//                     className="secondary-budget-btn"
//                     onClick={() => {
//                       resetForm();
//                       setShowCreateForm(false);
//                     }}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="primary-budget-btn create-budget-submit"
//                   >
//                     Create Budget
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import "./BudgetSettings.css";
import Sidebar from "../components/Sidebar";

function BudgetSettings() {
  const userId = localStorage.getItem("userId");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    month: "",
  });

  const categories = [
    "Food",
    "Transport",
    "Rent",
    "Utilities",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Savings",
    "Other",
  ];

  useEffect(() => {
    if (!userId) {
      setErrorMessage("User not logged in properly.");
      return;
    }

    fetchBudgets();
  }, [userId]);

  const normalizeBudget = (item) => {
    const limitValue =
      item.limit ??
      item.budget_limit ??
      item.amount ??
      item.budget_amount ??
      0;

    const spentValue =
      item.spent ??
      item.spent_amount ??
      item.total_spent ??
      0;

    return {
      id: item.id,
      category: item.category || "Other",
      month: item.month || "",
      limit: Number(limitValue) || 0,
      spent: Number(spentValue) || 0,
    };
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`http://localhost:5000/budgets/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        console.error("Fetch budgets failed:", data);
        setBudgets([]);
        setErrorMessage(data.message || "Failed to fetch budgets");
        return;
      }

      if (Array.isArray(data)) {
        const formattedBudgets = data.map(normalizeBudget);
        setBudgets(formattedBudgets);
      } else if (Array.isArray(data?.budgets)) {
        const formattedBudgets = data.budgets.map(normalizeBudget);
        setBudgets(formattedBudgets);
      } else {
        setBudgets([]);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
      setErrorMessage("Server error while fetching budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      category: "",
      limit: "",
      month: "",
    });
  };

  const handleCreateBudget = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in properly");
      return;
    }

    if (!formData.category || !formData.limit || !formData.month) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        user_id: Number(userId),
        category: formData.category,
        limit: Number(formData.limit),
        month: formData.month,
      };

      const response = await fetch("http://localhost:5000/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Create budget failed:", data);
        alert(data.message || "Failed to create budget");
        return;
      }

      resetForm();
      setShowCreateForm(false);
      fetchBudgets();
    } catch (error) {
      console.error("Error creating budget:", error);
      alert("Server error while creating budget");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/budgets/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete budget failed:", data);
        alert(data.message || "Failed to delete budget");
        return;
      }

      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Server error while deleting budget");
    }
  };

  const totals = useMemo(() => {
    const totalBudget = budgets.reduce((sum, item) => sum + item.limit, 0);
    const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
    const remaining = totalBudget - totalSpent;

    let health = "Good";
    if (totalBudget > 0) {
      const ratio = totalSpent / totalBudget;

      if (ratio >= 1) {
        health = "Over Budget";
      } else if (ratio >= 0.8) {
        health = "Warning";
      }
    }

    return {
      totalBudget,
      totalSpent,
      remaining,
      health,
    };
  }, [budgets]);

  const getStatus = (spent, limit) => {
    if (spent > limit) return "Over Budget";
    if (spent >= limit * 0.8) return "Near Limit";
    return "Good";
  };

  const getStatusClass = (status) => {
    if (status === "Over Budget") return "danger";
    if (status === "Near Limit") return "warning";
    return "good";
  };

  return (
    <div className="budget-shell">
      <Sidebar />

      <main className="budget-main">
        {!showCreateForm ? (
          <section className="budget-content-card">
            <div className="budget-top-section">
              <div className="budget-stat-grid">
                <div className="budget-stat-item">
                  <h4>Total Budget</h4>
                  <p>₹ {totals.totalBudget.toLocaleString()}</p>
                </div>

                <div className="budget-stat-item">
                  <h4>Remaining</h4>
                  <p>₹ {totals.remaining.toLocaleString()}</p>
                </div>

                <div className="budget-stat-item">
                  <h4>Current Spent</h4>
                  <p>₹ {totals.totalSpent.toLocaleString()}</p>
                </div>

                <div className="budget-stat-item">
                  <h4>Budget Health</h4>
                  <p>{totals.health}</p>
                </div>
              </div>

              <div className="budget-top-action">
                <button
                  type="button"
                  className="primary-budget-btn"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create New Budget
                </button>
              </div>
            </div>

            <div className="budget-overview-section">
              <div className="budget-overview-title">Budget Overview</div>

              {errorMessage && (
                <p className="budget-error-message">{errorMessage}</p>
              )}

              <div className="budget-table-scroll">
                <table className="budget-overview-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Month</th>
                      <th>Budget</th>
                      <th>Spent</th>
                      <th>Balance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="budget-empty-cell">
                          Loading...
                        </td>
                      </tr>
                    ) : budgets.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="budget-empty-cell">
                          No budgets found
                        </td>
                      </tr>
                    ) : (
                      budgets.map((item) => {
                        const spent = Number(item.spent || 0);
                        const limit = Number(item.limit || 0);
                        const balance = limit - spent;
                        const status = getStatus(spent, limit);

                        return (
                          <tr key={item.id}>
                            <td>{item.category}</td>
                            <td>{item.month || "-"}</td>
                            <td>₹ {limit.toLocaleString()}</td>
                            <td>₹ {spent.toLocaleString()}</td>
                            <td>₹ {balance.toLocaleString()}</td>
                            <td>
                              <span
                                className={`budget-status ${getStatusClass(status)}`}
                              >
                                {status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="budget-delete-btn"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <section className="budget-form-shell">
            <div className="budget-form-card">
              <h2>Create New Budget</h2>

              <form onSubmit={handleCreateBudget} className="budget-form">
                <div className="budget-form-row">
                  <div className="budget-form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="budget-form-group">
                    <label>Budget Amount</label>
                    <input
                      type="number"
                      name="limit"
                      placeholder="₹ 0.00"
                      value={formData.limit}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                <div className="budget-form-group budget-form-group-half">
                  <label>Month</label>
                  <input
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  />
                </div>

                <div className="budget-form-bottom">
                  <button
                    type="button"
                    className="secondary-budget-btn"
                    onClick={() => {
                      resetForm();
                      setShowCreateForm(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-budget-btn create-budget-submit"
                  >
                    Create Budget
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default BudgetSettings;