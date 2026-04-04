// import React, { useEffect, useMemo, useState } from "react";
// import "./Dashboard.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
// } from "recharts";
// import RecordIncome from "./RecordIncome";
// import RecordExpense from "./RecordExpense";
// import Sidebar from "../components/Sidebar";

// export default function Dashboard() {
//   const [userName, setUserName] = useState(localStorage.getItem("username") || "User");
//   const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showIncomeModal, setShowIncomeModal] = useState(false);
//   const [showExpenseModal, setShowExpenseModal] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/dashboard", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         setTransactions([]);
//         return;
//       }

//       const data = await res.json();

//       setUserName(data.user?.name || localStorage.getItem("username") || "User");
//       setUserEmail(data.user?.email || localStorage.getItem("email") || "");
//       setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userId");
//     window.location.href = "/login";
//   };

//   const incomeTransactions = useMemo(() => {
//     return transactions.filter(
//       (item) => item.type?.toLowerCase() === "income"
//     );
//   }, [transactions]);

//   const expenseTransactions = useMemo(() => {
//     return transactions.filter(
//       (item) => item.type?.toLowerCase() === "expense"
//     );
//   }, [transactions]);

//   const totalIncome = useMemo(() => {
//     return incomeTransactions.reduce(
//       (sum, item) => sum + Number(item.amount || 0),
//       0
//     );
//   }, [incomeTransactions]);

//   const totalExpenses = useMemo(() => {
//     return expenseTransactions.reduce(
//       (sum, item) => sum + Number(item.amount || 0),
//       0
//     );
//   }, [expenseTransactions]);

//   const savingsRate = useMemo(() => {
//     if (totalIncome === 0) return 0;
//     return (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
//   }, [totalIncome, totalExpenses]);

//   const monthlyData = useMemo(() => {
//     const monthOrder = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];
//     const map = {};

//     transactions.forEach((item) => {
//       const dateObj = new Date(item.date);
//       const month = monthOrder[dateObj.getMonth()];

//       if (!map[month]) {
//         map[month] = {
//           month,
//           income: 0,
//           expenses: 0,
//         };
//       }

//       if (item.type?.toLowerCase() === "income") {
//         map[month].income += Number(item.amount || 0);
//       } else if (item.type?.toLowerCase() === "expense") {
//         map[month].expenses += Number(item.amount || 0);
//       }
//     });

//     return Object.values(map);
//   }, [transactions]);

//   const expenseBreakdown = useMemo(() => {
//     const categoryMap = {};

//     expenseTransactions.forEach((item) => {
//       const category = item.category || "Other";
//       categoryMap[category] =
//         (categoryMap[category] || 0) + Number(item.amount || 0);
//     });

//     const colors = [
//       "#5B8DEF",
//       "#47C285",
//       "#F2A93B",
//       "#F06464",
//       "#9B6BE8",
//       "#16a34a",
//       "#0ea5e9",
//     ];

//     return Object.keys(categoryMap).map((key, index) => ({
//       name: key,
//       value: categoryMap[key],
//       color: colors[index % colors.length],
//     }));
//   }, [expenseTransactions]);

//   const recentTransactions = useMemo(() => {
//     return [...transactions]
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, 5);
//   }, [transactions]);

//   const formatCurrency = (amount) => {
//     return `₹${Number(amount || 0).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   };

//   return (
//     <div className="dashboard-shell">
//       <Sidebar />

//       <main className="main-content">
//         <div className="top-row">
//           <div>
//             <h2 className="page-title">Financial Dashboard</h2>
//             <p className="welcome-text">
//               Welcome back, {userName}! Here&apos;s your financial summary.
//             </p>
//           </div>

//           <div className="action-buttons">
//             <button
//               className="top-btn income-btn"
//               onClick={() => setShowIncomeModal(true)}
//             >
//               ✚ Record Income
//             </button>
//             <button
//               className="top-btn expense-btn"
//               onClick={() => setShowExpenseModal(true)}
//             >
//               ━ Record Expense
//             </button>
//           </div>
//         </div>

//         <div className="summary-grid">
//           <div className="summary-card">
//             <p className="card-label">Monthly Income</p>
//             <h3 className="card-value">{formatCurrency(totalIncome)}</h3>
//             <p className="card-change positive">
//               {totalIncome === 0 ? "No income added yet" : "Income from records"}
//             </p>
//           </div>

//           <div className="summary-card">
//             <p className="card-label">Monthly Expenses</p>
//             <h3 className="card-value">{formatCurrency(totalExpenses)}</h3>
//             <p className="card-change negative">
//               {totalExpenses === 0 ? "No expenses added yet" : "Expenses from records"}
//             </p>
//           </div>

//           <div className="summary-card">
//             <p className="card-label">Estimated Tax Due</p>
//             <h3 className="card-value">₹0.00</h3>
//             <p className="card-change warning">No upcoming taxes</p>
//           </div>

//           <div className="summary-card">
//             <p className="card-label">Saving Rate</p>
//             <h3 className="card-value">{savingsRate}%</h3>
//             <p className="card-change positive">
//               {totalIncome === 0 ? "No financial data yet" : "Based on your records"}
//             </p>
//           </div>
//         </div>

//         <div className="charts-panel">
//           <div className="chart-left">
//             <h3 className="chart-title">Income vs Expenses</h3>

//             {loading ? (
//               <div className="empty-state">Loading chart...</div>
//             ) : monthlyData.length === 0 ? (
//               <div className="empty-state">No income or expense records yet</div>
//             ) : (
//               <>
//                 <div className="bar-chart-wrap">
//                   <ResponsiveContainer width="100%" height={320}>
//                     <BarChart data={monthlyData} barGap={8}>
//                       <XAxis dataKey="month" tickLine={false} />
//                       <YAxis hide />
//                       <Tooltip />
//                       <Bar dataKey="income" fill="#47C285" radius={[4, 4, 0, 0]} />
//                       <Bar dataKey="expenses" fill="#F06464" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="chart-legend-center">
//                   <div className="legend-item">
//                     <span className="legend-box income-box"></span>
//                     <span>Income</span>
//                   </div>
//                   <div className="legend-item">
//                     <span className="legend-box expense-box"></span>
//                     <span>Expenses</span>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="chart-right">
//             <h3 className="chart-title">Expense Breakdown</h3>

//             {loading ? (
//               <div className="empty-state small">Loading breakdown...</div>
//             ) : expenseBreakdown.length === 0 ? (
//               <div className="empty-state small">No expense data available</div>
//             ) : (
//               <>
//                 <div className="pie-wrap">
//                   <ResponsiveContainer width="100%" height={240}>
//                     <PieChart>
//                       <Pie
//                         data={expenseBreakdown}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={95}
//                       >
//                         {expenseBreakdown.map((entry, index) => (
//                           <Cell key={index} fill={entry.color} />
//                         ))}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="breakdown-list">
//                   {expenseBreakdown.map((item, index) => (
//                     <div className="breakdown-row" key={index}>
//                       <div className="breakdown-left">
//                         <span
//                           className="breakdown-dot"
//                           style={{ backgroundColor: item.color }}
//                         ></span>
//                         <span>{item.name}</span>
//                       </div>
//                       <strong>{formatCurrency(item.value)}</strong>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="recent-panel">
//           <h3 className="recent-title">Recent Transactions</h3>

//           {loading ? (
//             <div className="empty-state recent-empty">Loading transactions...</div>
//           ) : recentTransactions.length === 0 ? (
//             <div className="empty-state recent-empty">
//               New user account. No transactions added yet.
//             </div>
//           ) : (
//             <div className="table-wrap">
//               <table className="transactions-table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Description</th>
//                     <th>Category</th>
//                     <th>Type</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentTransactions.map((item) => (
//                     <tr key={item.id}>
//                       <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
//                       <td>{item.description || "-"}</td>
//                       <td>{item.category || "-"}</td>
//                       <td>{item.type}</td>
//                       <td>{formatCurrency(item.amount)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>

//       {showIncomeModal && (
//         <RecordIncome
//           onClose={() => setShowIncomeModal(false)}
//           onSuccess={() => {
//             setShowIncomeModal(false);
//             fetchDashboardData();
//           }}
//         />
//       )}

//       {showExpenseModal && (
//         <RecordExpense
//           onClose={() => setShowExpenseModal(false)}
//           onSuccess={() => {
//             setShowExpenseModal(false);
//             fetchDashboardData();
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import RecordIncome from "./RecordIncome";
import RecordExpense from "./RecordExpense";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [userName, setUserName] = useState(localStorage.getItem("username") || "User");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email") || "");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/dashboard", {
        method: "GET",
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

      setUserName(data.user?.name || localStorage.getItem("username") || "User");
      setUserEmail(data.user?.email || localStorage.getItem("email") || "");
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const incomeTransactions = useMemo(() => {
    return transactions.filter(
      (item) => item.type?.toLowerCase() === "income"
    );
  }, [transactions]);

  const expenseTransactions = useMemo(() => {
    return transactions.filter(
      (item) => item.type?.toLowerCase() === "expense"
    );
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return incomeTransactions.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  }, [incomeTransactions]);

  const totalExpenses = useMemo(() => {
    return expenseTransactions.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  }, [expenseTransactions]);

  const savingsRate = useMemo(() => {
    if (totalIncome === 0) return 0;
    return (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
  }, [totalIncome, totalExpenses]);

  const monthlyData = useMemo(() => {
    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const map = {};

    transactions.forEach((item) => {
      const dateObj = new Date(item.date);
      const month = monthOrder[dateObj.getMonth()];

      if (!map[month]) {
        map[month] = { month, income: 0, expenses: 0 };
      }

      if (item.type?.toLowerCase() === "income") {
        map[month].income += Number(item.amount || 0);
      } else if (item.type?.toLowerCase() === "expense") {
        map[month].expenses += Number(item.amount || 0);
      }
    });

    // ✅ Sort by calendar order so chart always renders Jan → Dec
    return Object.values(map).sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );
  }, [transactions]);

  const expenseBreakdown = useMemo(() => {
    const categoryMap = {};

    expenseTransactions.forEach((item) => {
      const category = item.category || "Other";
      categoryMap[category] =
        (categoryMap[category] || 0) + Number(item.amount || 0);
    });

    const colors = [
      "#5B8DEF",
      "#47C285",
      "#F2A93B",
      "#F06464",
      "#9B6BE8",
      "#16a34a",
      "#0ea5e9",
    ];

    return Object.keys(categoryMap).map((key, index) => ({
      name: key,
      value: categoryMap[key],
      color: colors[index % colors.length],
    }));
  }, [expenseTransactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="dashboard-shell">
      <Sidebar />

      <main className="main-content">
        <div className="top-row">
          <div>
            <h2 className="page-title">Financial Dashboard</h2>
            <p className="welcome-text">
              Welcome back, {userName}! Here&apos;s your financial summary.
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="top-btn income-btn"
              onClick={() => setShowIncomeModal(true)}
            >
              ✚ Record Income
            </button>
            <button
              className="top-btn expense-btn"
              onClick={() => setShowExpenseModal(true)}
            >
              ━ Record Expense
            </button>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <p className="card-label">Monthly Income</p>
            <h3 className="card-value">{formatCurrency(totalIncome)}</h3>
            <p className="card-change positive">
              {totalIncome === 0 ? "No income added yet" : "Income from records"}
            </p>
          </div>

          <div className="summary-card">
            <p className="card-label">Monthly Expenses</p>
            <h3 className="card-value">{formatCurrency(totalExpenses)}</h3>
            <p className="card-change negative">
              {totalExpenses === 0 ? "No expenses added yet" : "Expenses from records"}
            </p>
          </div>

          <div className="summary-card">
            <p className="card-label">Estimated Tax Due</p>
            <h3 className="card-value">₹0.00</h3>
            <p className="card-change warning">No upcoming taxes</p>
          </div>

          <div className="summary-card">
            <p className="card-label">Saving Rate</p>
            <h3 className="card-value">{savingsRate}%</h3>
            <p className="card-change positive">
              {totalIncome === 0 ? "No financial data yet" : "Based on your records"}
            </p>
          </div>
        </div>

        <div className="charts-panel">
          <div className="chart-left">
            <h3 className="chart-title">Income vs Expenses</h3>

            {loading ? (
              <div className="empty-state">Loading chart...</div>
            ) : monthlyData.length === 0 ? (
              <div className="empty-state">No income or expense records yet</div>
            ) : (
              <>
                <div className="bar-chart-wrap">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={monthlyData} barGap={8}>
                      <XAxis dataKey="month" tickLine={false} />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="income" fill="#47C285" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#F06464" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-legend-center">
                  <div className="legend-item">
                    <span className="legend-box income-box"></span>
                    <span>Income</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-box expense-box"></span>
                    <span>Expenses</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="chart-right">
            <h3 className="chart-title">Expense Breakdown</h3>

            {loading ? (
              <div className="empty-state small">Loading breakdown...</div>
            ) : expenseBreakdown.length === 0 ? (
              <div className="empty-state small">No expense data available</div>
            ) : (
              <>
                <div className="pie-wrap">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="breakdown-list">
                  {expenseBreakdown.map((item, index) => (
                    <div className="breakdown-row" key={index}>
                      <div className="breakdown-left">
                        <span
                          className="breakdown-dot"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span>{item.name}</span>
                      </div>
                      <strong>{formatCurrency(item.value)}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="recent-panel">
          <h3 className="recent-title">Recent Transactions</h3>

          {loading ? (
            <div className="empty-state recent-empty">Loading transactions...</div>
          ) : recentTransactions.length === 0 ? (
            <div className="empty-state recent-empty">
              New user account. No transactions added yet.
            </div>
          ) : (
            <div className="table-wrap">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((item) => (
                    <tr key={item.id}>
                      <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                      <td>{item.description || "-"}</td>
                      <td>{item.category || "-"}</td>
                      <td>{item.type}</td>
                      <td>{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showIncomeModal && (
        <RecordIncome
          onClose={() => setShowIncomeModal(false)}
          onSuccess={() => {
            setShowIncomeModal(false);
            fetchDashboardData();
          }}
        />
      )}

      {showExpenseModal && (
        <RecordExpense
          onClose={() => setShowExpenseModal(false)}
          onSuccess={() => {
            setShowExpenseModal(false);
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
}