import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Reports.css";

export default function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reportType, setReportType] = useState("Monthly Summary");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("PDF");

  const [reportGenerated, setReportGenerated] = useState(false);
  const [recentReports, setRecentReports] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (startDate && new Date(t.date) < new Date(startDate)) return false;
      if (endDate && new Date(t.date) > new Date(endDate)) return false;
      return true;
    });
  }, [transactions, startDate, endDate]);

  const reportData = useMemo(() => {
    const txns = filteredTransactions;
    const totalIncome = txns
      .filter((t) => t.type?.toLowerCase() === "income")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const totalExpenses = txns
      .filter((t) => t.type?.toLowerCase() === "expense")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : "0.0";

    const incomeByCategory = {};
    const expenseByCategory = {};
    txns.forEach((t) => {
      const cat = t.category || "Other";
      if (t.type?.toLowerCase() === "income") {
        incomeByCategory[cat] = (incomeByCategory[cat] || 0) + Number(t.amount);
      } else {
        expenseByCategory[cat] = (expenseByCategory[cat] || 0) + Number(t.amount);
      }
    });

    const monthlyMap = {};
    txns.forEach((t) => {
      const m = t.date ? new Date(t.date).toISOString().slice(0, 7) : "Unknown";
      if (!monthlyMap[m]) monthlyMap[m] = { month: m, income: 0, expenses: 0 };
      if (t.type?.toLowerCase() === "income") monthlyMap[m].income += Number(t.amount);
      else monthlyMap[m].expenses += Number(t.amount);
    });

    return {
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate,
      txnCount: txns.length,
      incomeByCategory,
      expenseByCategory,
      monthlyBreakdown: Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month)),
    };
  }, [filteredTransactions]);

  const fmt = (v) =>
    `₹${Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleGenerate = () => {
    if (!startDate || !endDate) {
      alert("Please select a date range");
      return;
    }
    setLoading(true);
    setReportGenerated(false);

    setTimeout(() => {
      setReportGenerated(true);
      setLoading(false);
      setRecentReports((prev) => [
        {
          id: Date.now(),
          type: reportType,
          period: `${startDate} to ${endDate}`,
          date: new Date().toLocaleDateString("en-IN"),
        },
        ...prev.slice(0, 9),
      ]);
    }, 800);
  };

  const handleReset = () => {
    setReportType("Monthly Summary");
    setStartDate("");
    setEndDate("");
    setFormat("PDF");
    setReportGenerated(false);
  };

  const downloadCSV = () => {
    const txns = filteredTransactions;
    let csv = "Date,Type,Category,Amount,Description\n";
    txns.forEach((t) => {
      csv += `${t.date},${t.type},${t.category || "N/A"},${t.amount},${(t.description || "").replace(/,/g, " ")}\n`;
    });

    csv += `\nSummary\n`;
    csv += `Total Income,${reportData.totalIncome}\n`;
    csv += `Total Expenses,${reportData.totalExpenses}\n`;
    csv += `Net Savings,${reportData.netSavings}\n`;
    csv += `Savings Rate,${reportData.savingsRate}%\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TaxPal_Report_${startDate}_to_${endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    // Build a printable HTML page
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TaxPal Financial Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          h1 { font-size: 28px; margin-bottom: 4px; }
          h2 { font-size: 18px; color: #666; margin-bottom: 24px; }
          h3 { font-size: 16px; margin: 20px 0 10px; border-bottom: 2px solid #1f86f2; padding-bottom: 6px; }
          .summary-grid { display: flex; gap: 20px; margin-bottom: 20px; }
          .summary-box { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
          .summary-box .label { font-size: 12px; color: #888; margin-bottom: 6px; }
          .summary-box .value { font-size: 20px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; }
          th { background: #f5f5f5; font-weight: bold; }
          .footer { margin-top: 40px; font-size: 11px; color: #aaa; text-align: center; }
        </style>
      </head>
      <body>
        <h1>TaxPal Financial Report</h1>
        <h2>${reportType} — ${startDate} to ${endDate}</h2>

        <div class="summary-grid">
          <div class="summary-box">
            <div class="label">Total Income</div>
            <div class="value" style="color:#1c8c57">${fmt(reportData.totalIncome)}</div>
          </div>
          <div class="summary-box">
            <div class="label">Total Expenses</div>
            <div class="value" style="color:#d84c4c">${fmt(reportData.totalExpenses)}</div>
          </div>
          <div class="summary-box">
            <div class="label">Net Savings</div>
            <div class="value">${fmt(reportData.netSavings)}</div>
          </div>
          <div class="summary-box">
            <div class="label">Savings Rate</div>
            <div class="value">${reportData.savingsRate}%</div>
          </div>
        </div>

        <h3>Income by Category</h3>
        <table>
          <tr><th>Category</th><th>Amount</th></tr>
          ${Object.entries(reportData.incomeByCategory)
            .map(([k, v]) => `<tr><td>${k}</td><td>${fmt(v)}</td></tr>`)
            .join("")}
        </table>

        <h3>Expenses by Category</h3>
        <table>
          <tr><th>Category</th><th>Amount</th></tr>
          ${Object.entries(reportData.expenseByCategory)
            .map(([k, v]) => `<tr><td>${k}</td><td>${fmt(v)}</td></tr>`)
            .join("")}
        </table>

        <h3>Monthly Breakdown</h3>
        <table>
          <tr><th>Month</th><th>Income</th><th>Expenses</th><th>Net</th></tr>
          ${reportData.monthlyBreakdown
            .map(
              (m) =>
                `<tr><td>${m.month}</td><td>${fmt(m.income)}</td><td>${fmt(m.expenses)}</td><td>${fmt(m.income - m.expenses)}</td></tr>`
            )
            .join("")}
        </table>

        <h3>All Transactions (${filteredTransactions.length})</h3>
        <table>
          <tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th></tr>
          ${filteredTransactions
            .map(
              (t) =>
                `<tr><td>${new Date(t.date).toLocaleDateString("en-IN")}</td><td>${t.type}</td><td>${t.category || "-"}</td><td>${fmt(t.amount)}</td></tr>`
            )
            .join("")}
        </table>

        <div class="footer">
          Generated by TaxPal on ${new Date().toLocaleString("en-IN")}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleDownload = () => {
    if (format === "CSV") downloadCSV();
    else downloadPDF();
  };

  return (
    <div className="rpt-shell">
      <Sidebar />

      <main className="rpt-main">
        <div className="rpt-header">
          <h2 className="rpt-title">Financial Reports</h2>
          <p className="rpt-subtitle">
            Generate, preview, and download your financial reports
          </p>
        </div>

        <div className="rpt-layout">
          {/* Left: Config */}
          <div className="rpt-config-card">
            <h3 className="rpt-config-title">Report Configuration</h3>

            <div className="rpt-form">
              <div className="rpt-form-group">
                <label>Report Type</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                  <option>Monthly Summary</option>
                  <option>Quarterly Summary</option>
                  <option>Annual Summary</option>
                  <option>Tax Report</option>
                </select>
              </div>

              <div className="rpt-form-row">
                <div className="rpt-form-group">
                  <label>Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="rpt-form-group">
                  <label>End Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="rpt-form-group">
                <label>Export Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option>PDF</option>
                  <option>CSV</option>
                </select>
              </div>

              <div className="rpt-form-actions">
                <button className="rpt-reset-btn" onClick={handleReset}>Reset</button>
                <button className="rpt-generate-btn" onClick={handleGenerate} disabled={loading}>
                  {loading ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            {recentReports.length > 0 && (
              <div className="rpt-recent">
                <h4>Recent Reports</h4>
                {recentReports.map((r) => (
                  <div key={r.id} className="rpt-recent-item">
                    <div>
                      <p className="rpt-recent-type">{r.type}</p>
                      <p className="rpt-recent-period">{r.period}</p>
                    </div>
                    <span className="rpt-recent-date">{r.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div className="rpt-preview-card">
            <div className="rpt-preview-header">
              <h3 className="rpt-preview-title">Report Preview</h3>
              {reportGenerated && (
                <div className="rpt-preview-actions">
                  <button className="rpt-print-btn" onClick={() => downloadPDF()}>
                    🖨 Print
                  </button>
                  <button className="rpt-download-btn" onClick={handleDownload}>
                    ⬇ Download {format}
                  </button>
                </div>
              )}
            </div>

            {!reportGenerated ? (
              <div className="rpt-empty-preview">
                <p>Select report parameters and click "Generate Report" to preview your financial summary here.</p>
              </div>
            ) : (
              <div className="rpt-preview-content">
                {/* Summary Cards */}
                <div className="rpt-summary-grid">
                  <div className="rpt-sum-card">
                    <p className="rpt-sum-label">Total Income</p>
                    <p className="rpt-sum-value income-text">{fmt(reportData.totalIncome)}</p>
                  </div>
                  <div className="rpt-sum-card">
                    <p className="rpt-sum-label">Total Expenses</p>
                    <p className="rpt-sum-value expense-text">{fmt(reportData.totalExpenses)}</p>
                  </div>
                  <div className="rpt-sum-card">
                    <p className="rpt-sum-label">Net Savings</p>
                    <p className="rpt-sum-value">{fmt(reportData.netSavings)}</p>
                  </div>
                  <div className="rpt-sum-card">
                    <p className="rpt-sum-label">Savings Rate</p>
                    <p className="rpt-sum-value">{reportData.savingsRate}%</p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="rpt-section">
                  <h4>Income by Category</h4>
                  {Object.keys(reportData.incomeByCategory).length === 0 ? (
                    <p className="rpt-no-data">No income data</p>
                  ) : (
                    <div className="rpt-cat-list">
                      {Object.entries(reportData.incomeByCategory).map(([cat, amount]) => (
                        <div key={cat} className="rpt-cat-row">
                          <span>{cat}</span>
                          <strong className="income-text">{fmt(amount)}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rpt-section">
                  <h4>Expenses by Category</h4>
                  {Object.keys(reportData.expenseByCategory).length === 0 ? (
                    <p className="rpt-no-data">No expense data</p>
                  ) : (
                    <div className="rpt-cat-list">
                      {Object.entries(reportData.expenseByCategory).map(([cat, amount]) => (
                        <div key={cat} className="rpt-cat-row">
                          <span>{cat}</span>
                          <strong className="expense-text">{fmt(amount)}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Monthly Breakdown */}
                <div className="rpt-section">
                  <h4>Monthly Breakdown</h4>
                  {reportData.monthlyBreakdown.length === 0 ? (
                    <p className="rpt-no-data">No data for this period</p>
                  ) : (
                    <table className="rpt-table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Income</th>
                          <th>Expenses</th>
                          <th>Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.monthlyBreakdown.map((m) => (
                          <tr key={m.month}>
                            <td>{m.month}</td>
                            <td className="income-text">{fmt(m.income)}</td>
                            <td className="expense-text">{fmt(m.expenses)}</td>
                            <td>{fmt(m.income - m.expenses)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Transaction Count */}
                <div className="rpt-footer-info">
                  Total Transactions: <strong>{reportData.txnCount}</strong> | Period: {startDate} to {endDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
