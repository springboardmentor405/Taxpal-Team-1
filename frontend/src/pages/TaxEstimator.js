// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import "./TaxEstimator.css";

// // Multi-country tax slab data
// const TAX_DATA = {
//   India: {
//     currency: "₹",
//     regimes: {
//       "New Regime (FY 2024-25)": [
//         { min: 0, max: 300000, rate: 0 },
//         { min: 300000, max: 700000, rate: 5 },
//         { min: 700000, max: 1000000, rate: 10 },
//         { min: 1000000, max: 1200000, rate: 15 },
//         { min: 1200000, max: 1500000, rate: 20 },
//         { min: 1500000, max: Infinity, rate: 30 },
//       ],
//       "Old Regime": [
//         { min: 0, max: 250000, rate: 0 },
//         { min: 250000, max: 500000, rate: 5 },
//         { min: 500000, max: 1000000, rate: 20 },
//         { min: 1000000, max: Infinity, rate: 30 },
//       ],
//     },
//     states: [
//       "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat",
//       "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
//       "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
//       "Uttar Pradesh", "West Bengal",
//     ],
//     filingStatuses: ["Individual", "HUF", "Senior Citizen (60-80)", "Super Senior (80+)"],
//     dueDates: [
//       { q: "Q1", period: "Apr–Jun", due: "Jun 15" },
//       { q: "Q2", period: "Jul–Sep", due: "Sep 15" },
//       { q: "Q3", period: "Oct–Dec", due: "Dec 15" },
//       { q: "Q4", period: "Jan–Mar", due: "Mar 15" },
//     ],
//   },
//   "United States": {
//     currency: "$",
//     regimes: {
//       Single: [
//         { min: 0, max: 11600, rate: 10 },
//         { min: 11600, max: 47150, rate: 12 },
//         { min: 47150, max: 100525, rate: 22 },
//         { min: 100525, max: 191950, rate: 24 },
//         { min: 191950, max: 243725, rate: 32 },
//         { min: 243725, max: 609350, rate: 35 },
//         { min: 609350, max: Infinity, rate: 37 },
//       ],
//       "Married Filing Jointly": [
//         { min: 0, max: 23200, rate: 10 },
//         { min: 23200, max: 94300, rate: 12 },
//         { min: 94300, max: 201050, rate: 22 },
//         { min: 201050, max: 383900, rate: 24 },
//         { min: 383900, max: 487450, rate: 32 },
//         { min: 487450, max: 731200, rate: 35 },
//         { min: 731200, max: Infinity, rate: 37 },
//       ],
//     },
//     states: [
//       "California", "Florida", "Illinois", "New York", "Texas",
//       "Washington", "Pennsylvania", "Ohio", "Georgia", "North Carolina",
//     ],
//     filingStatuses: ["Single", "Married Filing Jointly", "Married Filing Separately", "Head of Household"],
//     dueDates: [
//       { q: "Q1", period: "Jan–Mar", due: "Apr 15" },
//       { q: "Q2", period: "Apr–May", due: "Jun 15" },
//       { q: "Q3", period: "Jun–Aug", due: "Sep 15" },
//       { q: "Q4", period: "Sep–Dec", due: "Jan 15" },
//     ],
//   },
//   "United Kingdom": {
//     currency: "£",
//     regimes: {
//       Standard: [
//         { min: 0, max: 12570, rate: 0 },
//         { min: 12570, max: 50270, rate: 20 },
//         { min: 50270, max: 125140, rate: 40 },
//         { min: 125140, max: Infinity, rate: 45 },
//       ],
//     },
//     states: ["England", "Wales", "Scotland", "Northern Ireland"],
//     filingStatuses: ["Individual", "Self-Employed"],
//     dueDates: [
//       { q: "Q1", period: "Apr–Jun", due: "Jul 31" },
//       { q: "Q2", period: "Jul–Sep", due: "Oct 31" },
//       { q: "Q3", period: "Oct–Dec", due: "Jan 31" },
//       { q: "Q4", period: "Jan–Mar", due: "Apr 30" },
//     ],
//   },
//   Canada: {
//     currency: "C$",
//     regimes: {
//       Federal: [
//         { min: 0, max: 55867, rate: 15 },
//         { min: 55867, max: 111733, rate: 20.5 },
//         { min: 111733, max: 154906, rate: 26 },
//         { min: 154906, max: 220000, rate: 29 },
//         { min: 220000, max: Infinity, rate: 33 },
//       ],
//     },
//     states: ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba", "Saskatchewan"],
//     filingStatuses: ["Individual", "Self-Employed"],
//     dueDates: [
//       { q: "Q1", period: "Jan–Mar", due: "Mar 15" },
//       { q: "Q2", period: "Apr–Jun", due: "Jun 15" },
//       { q: "Q3", period: "Jul–Sep", due: "Sep 15" },
//       { q: "Q4", period: "Oct–Dec", due: "Dec 15" },
//     ],
//   },
//   Australia: {
//     currency: "A$",
//     regimes: {
//       Resident: [
//         { min: 0, max: 18200, rate: 0 },
//         { min: 18200, max: 45000, rate: 19 },
//         { min: 45000, max: 120000, rate: 32.5 },
//         { min: 120000, max: 180000, rate: 37 },
//         { min: 180000, max: Infinity, rate: 45 },
//       ],
//     },
//     states: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
//     filingStatuses: ["Resident", "Non-Resident"],
//     dueDates: [
//       { q: "Q1", period: "Jul–Sep", due: "Oct 28" },
//       { q: "Q2", period: "Oct–Dec", due: "Feb 28" },
//       { q: "Q3", period: "Jan–Mar", due: "Apr 28" },
//       { q: "Q4", period: "Apr–Jun", due: "Jul 28" },
//     ],
//   },
// };

// function calculateTax(income, slabs) {
//   let tax = 0;
//   for (const slab of slabs) {
//     if (income <= slab.min) break;
//     const upper = slab.max === Infinity ? income : Math.min(income, slab.max);
//     tax += (upper - slab.min) * (slab.rate / 100);
//   }
//   return Math.round(tax * 100) / 100;
// }

// export default function TaxEstimator() {
//   const [activeTab, setActiveTab] = useState("calculator");
//   const [country, setCountry] = useState("India");
//   const [state, setState] = useState("");
//   const [filingStatus, setFilingStatus] = useState("");
//   const [regime, setRegime] = useState("");
//   const [quarter, setQuarter] = useState("Q1");

//   const [grossIncome, setGrossIncome] = useState("");
//   const [businessExpenses, setBusinessExpenses] = useState("");
//   const [retirement, setRetirement] = useState("");
//   const [healthInsurance, setHealthInsurance] = useState("");
//   const [otherDeductions, setOtherDeductions] = useState("");

//   const [result, setResult] = useState(null);

//   const countryData = TAX_DATA[country];
//   const regimes = countryData ? Object.keys(countryData.regimes) : [];
//   const states = countryData ? countryData.states : [];
//   const statuses = countryData ? countryData.filingStatuses : [];
//   const currency = countryData ? countryData.currency : "₹";

//   const handleCountryChange = (val) => {
//     setCountry(val);
//     setState("");
//     setFilingStatus("");
//     setRegime("");
//     setResult(null);
//   };

//   const handleCalculate = () => {
//     if (!grossIncome || Number(grossIncome) <= 0) {
//       alert("Please enter gross income for the quarter");
//       return;
//     }

//     const selectedRegime = regime || regimes[0];
//     const slabs = countryData.regimes[selectedRegime];
//     if (!slabs) {
//       alert("Please select a valid tax regime");
//       return;
//     }

//     const gross = Number(grossIncome) || 0;
//     const expenses = Number(businessExpenses) || 0;
//     const ret = Number(retirement) || 0;
//     const health = Number(healthInsurance) || 0;
//     const other = Number(otherDeductions) || 0;

//     const totalDeductions = expenses + ret + health + other;
//     const annualGross = gross * 4;
//     const annualDeductions = totalDeductions * 4;
//     const annualTaxable = Math.max(0, annualGross - annualDeductions);
//     const annualTax = calculateTax(annualTaxable, slabs);
//     const quarterlyTax = Math.round((annualTax / 4) * 100) / 100;
//     const effectiveRate =
//       annualGross > 0
//         ? Math.round((annualTax / annualGross) * 10000) / 100
//         : 0;

//     setResult({
//       quarterlyGross: gross,
//       totalDeductions,
//       annualGross,
//       annualTaxable,
//       annualTax,
//       quarterlyTax,
//       effectiveRate,
//       regime: selectedRegime,
//       slabs,
//     });
//   };

//   const handleSaveResult = async () => {
//     if (!result) return;
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login to save results");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/tax", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           country,
//           financial_year: `${year}-${(year + 1).toString().slice(-2)}`,
//           gross_income: result.quarterlyGross,
//           tax_regime: result.regime,
//           quarterly_tax: result.quarterlyTax,
//           annual_tax: result.annualTax,
//           effective_rate: result.effectiveRate,
//         }),
//       });

//       if (res.ok) {
//         alert("Tax calculation saved successfully!");
//       } else {
//         const data = await res.json();
//         alert(data.message || "Failed to save calculation");
//       }
//     } catch (error) {
//       console.error("Save tax error:", error);
//       alert("Error connecting to server");
//     }
//   };

//   const handleReset = () => {
//     setGrossIncome("");
//     setBusinessExpenses("");
//     setRetirement("");
//     setHealthInsurance("");
//     setOtherDeductions("");
//     setResult(null);
//   };

//   const year = new Date().getFullYear();
//   const tips = [
//     { icon: "💰", title: "Maximize Deductions", desc: "Track all business expenses throughout the year to reduce taxable income." },
//     { icon: "📊", title: "Quarterly Payments", desc: "Pay estimated taxes quarterly to avoid penalties and interest charges." },
//     { icon: "🏥", title: "Health Savings", desc: "Health insurance premiums can be deducted from your taxable income." },
//     { icon: "🎓", title: "Education Credits", desc: "Investments in education and professional development may qualify for deductions." },
//   ];

//   return (
//     <div className="tax-shell">
//       <Sidebar />

//       <main className="tax-main">
//         <div className="tax-header">
//           <h2 className="tax-title">Tax Estimator</h2>
//           <p className="tax-subtitle">
//             Calculate your estimated quarterly taxes and stay on top of deadlines
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="tax-tabs">
//           <button
//             className={`tax-tab ${activeTab === "calculator" ? "active" : ""}`}
//             onClick={() => setActiveTab("calculator")}
//           >
//             🧮 Tax Calculator
//           </button>
//           <button
//             className={`tax-tab ${activeTab === "calendar" ? "active" : ""}`}
//             onClick={() => setActiveTab("calendar")}
//           >
//             📅 Tax Calendar
//           </button>
//         </div>

//         {activeTab === "calculator" && (
//           <div className="tax-calc-layout">
//             {/* Left: Form */}
//             <div className="tax-form-card">
//               <h3 className="tax-form-title">Tax Calculation Inputs</h3>

//               <div className="tax-form-grid">
//                 <div className="tax-form-group">
//                   <label>Country / Region</label>
//                   <select value={country} onChange={(e) => handleCountryChange(e.target.value)}>
//                     {Object.keys(TAX_DATA).map((c) => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="tax-form-group">
//                   <label>State / Province</label>
//                   <select value={state} onChange={(e) => setState(e.target.value)}>
//                     <option value="">Select state</option>
//                     {states.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Filing Status</label>
//                   <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}>
//                     <option value="">Select status</option>
//                     {statuses.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Tax Regime</label>
//                   <select value={regime || regimes[0] || ""} onChange={(e) => setRegime(e.target.value)}>
//                     {regimes.map((r) => (
//                       <option key={r} value={r}>{r}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Quarter</label>
//                   <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
//                     <option value="Q1">Q1</option>
//                     <option value="Q2">Q2</option>
//                     <option value="Q3">Q3</option>
//                     <option value="Q4">Q4</option>
//                   </select>
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Gross Income (Quarter) *</label>
//                   <input
//                     type="number"
//                     placeholder={`${currency} 0.00`}
//                     value={grossIncome}
//                     onChange={(e) => setGrossIncome(e.target.value)}
//                   />
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Business Expenses</label>
//                   <input
//                     type="number"
//                     placeholder={`${currency} 0.00`}
//                     value={businessExpenses}
//                     onChange={(e) => setBusinessExpenses(e.target.value)}
//                   />
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Retirement Contribution</label>
//                   <input
//                     type="number"
//                     placeholder={`${currency} 0.00`}
//                     value={retirement}
//                     onChange={(e) => setRetirement(e.target.value)}
//                   />
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Health Insurance Premium</label>
//                   <input
//                     type="number"
//                     placeholder={`${currency} 0.00`}
//                     value={healthInsurance}
//                     onChange={(e) => setHealthInsurance(e.target.value)}
//                   />
//                 </div>

//                 <div className="tax-form-group">
//                   <label>Other Deductions</label>
//                   <input
//                     type="number"
//                     placeholder={`${currency} 0.00`}
//                     value={otherDeductions}
//                     onChange={(e) => setOtherDeductions(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="tax-form-actions">
//                 <button className="tax-reset-btn" onClick={handleReset}>Reset</button>
//                 <button className="tax-calc-btn" onClick={handleCalculate}>
//                   Calculate Estimated Tax
//                 </button>
//               </div>
//             </div>

//             {/* Right: Results */}
//             <div className="tax-result-card">
//               <h3 className="tax-result-title">Tax Summary</h3>

//               {!result ? (
//                 <div className="tax-empty-result">
//                   <p>Enter your financial details and click "Calculate" to see your estimated tax breakdown.</p>
//                 </div>
//               ) : (
//                 <div className="tax-result-content">
//                     <div className="tax-result-highlight">
//                       <p className="tax-result-label">Quarterly Estimated Tax</p>
//                       <p className="tax-result-amount">
//                         {currency}{result.quarterlyTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                       </p>
//                       <p className="tax-result-sub">
//                         Effective Rate: {result.effectiveRate}%
//                       </p>
//                       <button className="tax-save-result-btn" onClick={handleSaveResult}>
//                         💾 Save to History
//                       </button>
//                     </div>

//                   <div className="tax-result-rows">
//                     <div className="tax-result-row">
//                       <span>Quarterly Gross Income</span>
//                       <strong>{currency}{Number(result.quarterlyGross).toLocaleString()}</strong>
//                     </div>
//                     <div className="tax-result-row">
//                       <span>Quarterly Deductions</span>
//                       <strong>- {currency}{Number(result.totalDeductions).toLocaleString()}</strong>
//                     </div>
//                     <div className="tax-result-row divider">
//                       <span>Annual Gross Income</span>
//                       <strong>{currency}{Number(result.annualGross).toLocaleString()}</strong>
//                     </div>
//                     <div className="tax-result-row">
//                       <span>Annual Taxable Income</span>
//                       <strong>{currency}{Number(result.annualTaxable).toLocaleString()}</strong>
//                     </div>
//                     <div className="tax-result-row">
//                       <span>Annual Tax</span>
//                       <strong>{currency}{Number(result.annualTax).toLocaleString()}</strong>
//                     </div>
//                     <div className="tax-result-row">
//                       <span>Regime</span>
//                       <strong>{result.regime}</strong>
//                     </div>
//                   </div>

//                   {/* Tax Slabs */}
//                   <div className="tax-slab-section">
//                     <h4>Applicable Tax Slabs</h4>
//                     <table className="tax-slab-table">
//                       <thead>
//                         <tr>
//                           <th>Income Range</th>
//                           <th>Rate</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {result.slabs.map((s, i) => (
//                           <tr key={i}>
//                             <td>
//                               {currency}{s.min.toLocaleString()} –{" "}
//                               {s.max === Infinity ? "Above" : `${currency}${s.max.toLocaleString()}`}
//                             </td>
//                             <td>{s.rate}%</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "calendar" && (
//           <div className="tax-calendar-section">
//             {/* Due Dates */}
//             <div className="tax-due-grid">
//               {(countryData?.dueDates || []).map((d, i) => {
//                 const now = new Date();
//                 const dueStr = `${d.due}, ${d.q === "Q4" ? year + 1 : year}`;
//                 const dueDate = new Date(dueStr);
//                 const isPast = now > dueDate;
//                 const daysLeft = isPast ? 0 : Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
//                 const status = isPast ? "Overdue" : daysLeft <= 30 ? "Due Soon" : "Upcoming";

//                 return (
//                   <div key={i} className={`tax-due-card ${status.toLowerCase().replace(" ", "-")}`}>
//                     <div className="tax-due-header">
//                       <span className="tax-due-quarter">{d.q}</span>
//                       <span className={`tax-due-status ${status.toLowerCase().replace(" ", "-")}`}>
//                         {status}
//                       </span>
//                     </div>
//                     <p className="tax-due-period">{d.period}, {d.q === "Q4" ? year + 1 : year}</p>
//                     <p className="tax-due-date">Due: {d.due}, {d.q === "Q4" ? year + 1 : year}</p>
//                     {!isPast && (
//                       <p className="tax-due-days">{daysLeft} days remaining</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Tax Saving Tips */}
//             <div className="tax-tips-section">
//               <h3 className="tax-tips-title">Tax Saving Opportunities</h3>
//               <div className="tax-tips-grid">
//                 {tips.map((tip, i) => (
//                   <div key={i} className="tax-tip-card">
//                     <span className="tax-tip-icon">{tip.icon}</span>
//                     <h4>{tip.title}</h4>
//                     <p>{tip.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./TaxEstimator.css";

const TAX_DATA = {
  India: {
    currency: "₹",
    regimes: {
      "New Regime (FY 2024-25)": [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 700000, rate: 5 },
        { min: 700000, max: 1000000, rate: 10 },
        { min: 1000000, max: 1200000, rate: 15 },
        { min: 1200000, max: 1500000, rate: 20 },
        { min: 1500000, max: Infinity, rate: 30 },
      ],
      "Old Regime": [
        { min: 0, max: 250000, rate: 0 },
        { min: 250000, max: 500000, rate: 5 },
        { min: 500000, max: 1000000, rate: 20 },
        { min: 1000000, max: Infinity, rate: 30 },
      ],
    },
    states: [
      "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat",
      "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
      "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
      "Uttar Pradesh", "West Bengal",
    ],
    filingStatuses: ["Individual", "HUF", "Senior Citizen (60-80)", "Super Senior (80+)"],
    dueDates: [
      { q: "Q1", period: "Apr–Jun", due: "Jun 15" },
      { q: "Q2", period: "Jul–Sep", due: "Sep 15" },
      { q: "Q3", period: "Oct–Dec", due: "Dec 15" },
      { q: "Q4", period: "Jan–Mar", due: "Mar 15" },
    ],
  },
  "United States": {
    currency: "$",
    regimes: {
      Single: [
        { min: 0, max: 11600, rate: 10 },
        { min: 11600, max: 47150, rate: 12 },
        { min: 47150, max: 100525, rate: 22 },
        { min: 100525, max: 191950, rate: 24 },
        { min: 191950, max: 243725, rate: 32 },
        { min: 243725, max: 609350, rate: 35 },
        { min: 609350, max: Infinity, rate: 37 },
      ],
      "Married Filing Jointly": [
        { min: 0, max: 23200, rate: 10 },
        { min: 23200, max: 94300, rate: 12 },
        { min: 94300, max: 201050, rate: 22 },
        { min: 201050, max: 383900, rate: 24 },
        { min: 383900, max: 487450, rate: 32 },
        { min: 487450, max: 731200, rate: 35 },
        { min: 731200, max: Infinity, rate: 37 },
      ],
    },
    states: [
      "California", "Florida", "Illinois", "New York", "Texas",
      "Washington", "Pennsylvania", "Ohio", "Georgia", "North Carolina",
    ],
    filingStatuses: ["Single", "Married Filing Jointly", "Married Filing Separately", "Head of Household"],
    dueDates: [
      { q: "Q1", period: "Jan–Mar", due: "Apr 15" },
      { q: "Q2", period: "Apr–May", due: "Jun 15" },
      { q: "Q3", period: "Jun–Aug", due: "Sep 15" },
      { q: "Q4", period: "Sep–Dec", due: "Jan 15" },
    ],
  },
  "United Kingdom": {
    currency: "£",
    regimes: {
      Standard: [
        { min: 0, max: 12570, rate: 0 },
        { min: 12570, max: 50270, rate: 20 },
        { min: 50270, max: 125140, rate: 40 },
        { min: 125140, max: Infinity, rate: 45 },
      ],
    },
    states: ["England", "Wales", "Scotland", "Northern Ireland"],
    filingStatuses: ["Individual", "Self-Employed"],
    dueDates: [
      { q: "Q1", period: "Apr–Jun", due: "Jul 31" },
      { q: "Q2", period: "Jul–Sep", due: "Oct 31" },
      { q: "Q3", period: "Oct–Dec", due: "Jan 31" },
      { q: "Q4", period: "Jan–Mar", due: "Apr 30" },
    ],
  },
  Canada: {
    currency: "C$",
    regimes: {
      Federal: [
        { min: 0, max: 55867, rate: 15 },
        { min: 55867, max: 111733, rate: 20.5 },
        { min: 111733, max: 154906, rate: 26 },
        { min: 154906, max: 220000, rate: 29 },
        { min: 220000, max: Infinity, rate: 33 },
      ],
    },
    states: ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba", "Saskatchewan"],
    filingStatuses: ["Individual", "Self-Employed"],
    dueDates: [
      { q: "Q1", period: "Jan–Mar", due: "Mar 15" },
      { q: "Q2", period: "Apr–Jun", due: "Jun 15" },
      { q: "Q3", period: "Jul–Sep", due: "Sep 15" },
      { q: "Q4", period: "Oct–Dec", due: "Dec 15" },
    ],
  },
  Australia: {
    currency: "A$",
    regimes: {
      Resident: [
        { min: 0, max: 18200, rate: 0 },
        { min: 18200, max: 45000, rate: 19 },
        { min: 45000, max: 120000, rate: 32.5 },
        { min: 120000, max: 180000, rate: 37 },
        { min: 180000, max: Infinity, rate: 45 },
      ],
    },
    states: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
    filingStatuses: ["Resident", "Non-Resident"],
    dueDates: [
      { q: "Q1", period: "Jul–Sep", due: "Oct 28" },
      { q: "Q2", period: "Oct–Dec", due: "Feb 28" },
      { q: "Q3", period: "Jan–Mar", due: "Apr 28" },
      { q: "Q4", period: "Apr–Jun", due: "Jul 28" },
    ],
  },
};

function calculateTax(income, slabs) {
  let tax = 0;
  for (const slab of slabs) {
    if (income <= slab.min) break;
    const upper = slab.max === Infinity ? income : Math.min(income, slab.max);
    tax += (upper - slab.min) * (slab.rate / 100);
  }
  return Math.round(tax * 100) / 100;
}

export default function TaxEstimator() {
  const year = new Date().getFullYear(); // ✅ defined at top

  const [activeTab, setActiveTab] = useState("calculator");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [filingStatus, setFilingStatus] = useState("");
  const [regime, setRegime] = useState("");
  const [quarter, setQuarter] = useState("Q1");

  const [grossIncome, setGrossIncome] = useState("");
  const [businessExpenses, setBusinessExpenses] = useState("");
  const [retirement, setRetirement] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const countryData = TAX_DATA[country];
  const regimes = countryData ? Object.keys(countryData.regimes) : [];
  const states = countryData ? countryData.states : [];
  const statuses = countryData ? countryData.filingStatuses : [];
  const currency = countryData ? countryData.currency : "₹";

  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ fresh token inside function — fixes Bearer null bug
  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setHistoryLoading(true);
      const res = await fetch("http://localhost:5000/api/tax", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("History fetch status:", res.status);
      const data = await res.json();
      console.log("History fetch data:", data);

      if (res.ok) {
        setHistory(data.history || []);
      } else {
        console.error("Failed to fetch tax history:", data.message);
      }
    } catch (err) {
      console.error("Fetch tax history error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCountryChange = (val) => {
    setCountry(val);
    setState("");
    setFilingStatus("");
    setRegime("");
    setResult(null);
  };

  const handleCalculate = () => {
    if (!grossIncome || Number(grossIncome) <= 0) {
      alert("Please enter gross income for the quarter");
      return;
    }

    const selectedRegime = regime || regimes[0];
    const slabs = countryData.regimes[selectedRegime];
    if (!slabs) {
      alert("Please select a valid tax regime");
      return;
    }

    const gross = Number(grossIncome) || 0;
    const expenses = Number(businessExpenses) || 0;
    const ret = Number(retirement) || 0;
    const health = Number(healthInsurance) || 0;
    const other = Number(otherDeductions) || 0;

    const totalDeductions = expenses + ret + health + other;
    const annualGross = gross * 4;
    const annualDeductions = totalDeductions * 4;
    const annualTaxable = Math.max(0, annualGross - annualDeductions);
    const annualTax = calculateTax(annualTaxable, slabs);
    const quarterlyTax = Math.round((annualTax / 4) * 100) / 100;
    const effectiveRate =
      annualGross > 0
        ? Math.round((annualTax / annualGross) * 10000) / 100
        : 0;

    setResult({
      quarterlyGross: gross,
      totalDeductions,
      annualGross,
      annualTaxable,
      annualTax,
      quarterlyTax,
      effectiveRate,
      regime: selectedRegime,
      slabs,
    });
  };

  // ✅ fresh token inside function — fixes Bearer null bug
  const handleSaveResult = async () => {
    if (!result) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save results");
      return;
    }

    const payload = {
      country,
      financial_year: `${year}-${(year + 1).toString().slice(-2)}`,
      gross_income: result.quarterlyGross,
      tax_regime: result.regime,
      quarterly_tax: result.quarterlyTax,
      annual_tax: result.annualTax,
      effective_rate: result.effectiveRate,
    };

    console.log("=== TAX SAVE DEBUG ===");
    console.log("Token:", token);
    console.log("Payload:", payload);

    try {
      setSaving(true);

      const res = await fetch("http://localhost:5000/api/tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        alert("Tax calculation saved successfully!");
        fetchHistory();
      } else {
        alert(data.message || "Failed to save calculation");
      }
    } catch (error) {
      console.error("Save tax error:", error);
      alert("Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setGrossIncome("");
    setBusinessExpenses("");
    setRetirement("");
    setHealthInsurance("");
    setOtherDeductions("");
    setResult(null);
  };

  const tips = [
    { icon: "💰", title: "Maximize Deductions", desc: "Track all business expenses throughout the year to reduce taxable income." },
    { icon: "📊", title: "Quarterly Payments", desc: "Pay estimated taxes quarterly to avoid penalties and interest charges." },
    { icon: "🏥", title: "Health Savings", desc: "Health insurance premiums can be deducted from your taxable income." },
    { icon: "🎓", title: "Education Credits", desc: "Investments in education and professional development may qualify for deductions." },
  ];

  return (
    <div className="tax-shell">
      <Sidebar />

      <main className="tax-main">
        <div className="tax-header">
          <h2 className="tax-title">Tax Estimator</h2>
          <p className="tax-subtitle">
            Calculate your estimated quarterly taxes and stay on top of deadlines
          </p>
        </div>

        {/* Tabs */}
        <div className="tax-tabs">
          <button
            className={`tax-tab ${activeTab === "calculator" ? "active" : ""}`}
            onClick={() => setActiveTab("calculator")}
          >
            🧮 Tax Calculator
          </button>
          <button
            className={`tax-tab ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            📅 Tax Calendar
          </button>
          <button
            className={`tax-tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => { setActiveTab("history"); fetchHistory(); }}
          >
            🕓 History
          </button>
        </div>

        {/* ===== CALCULATOR TAB ===== */}
        {activeTab === "calculator" && (
          <div className="tax-calc-layout">
            <div className="tax-form-card">
              <h3 className="tax-form-title">Tax Calculation Inputs</h3>

              <div className="tax-form-grid">
                <div className="tax-form-group">
                  <label>Country / Region</label>
                  <select value={country} onChange={(e) => handleCountryChange(e.target.value)}>
                    {Object.keys(TAX_DATA).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="tax-form-group">
                  <label>State / Province</label>
                  <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select state</option>
                    {states.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>

                <div className="tax-form-group">
                  <label>Filing Status</label>
                  <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}>
                    <option value="">Select status</option>
                    {statuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>

                <div className="tax-form-group">
                  <label>Tax Regime</label>
                  <select value={regime || regimes[0] || ""} onChange={(e) => setRegime(e.target.value)}>
                    {regimes.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </select>
                </div>

                <div className="tax-form-group">
                  <label>Quarter</label>
                  <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                  </select>
                </div>

                <div className="tax-form-group">
                  <label>Gross Income (Quarter) *</label>
                  <input
                    type="number"
                    placeholder={`${currency} 0.00`}
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
                  />
                </div>

                <div className="tax-form-group">
                  <label>Business Expenses</label>
                  <input
                    type="number"
                    placeholder={`${currency} 0.00`}
                    value={businessExpenses}
                    onChange={(e) => setBusinessExpenses(e.target.value)}
                  />
                </div>

                <div className="tax-form-group">
                  <label>Retirement Contribution</label>
                  <input
                    type="number"
                    placeholder={`${currency} 0.00`}
                    value={retirement}
                    onChange={(e) => setRetirement(e.target.value)}
                  />
                </div>

                <div className="tax-form-group">
                  <label>Health Insurance Premium</label>
                  <input
                    type="number"
                    placeholder={`${currency} 0.00`}
                    value={healthInsurance}
                    onChange={(e) => setHealthInsurance(e.target.value)}
                  />
                </div>

                <div className="tax-form-group">
                  <label>Other Deductions</label>
                  <input
                    type="number"
                    placeholder={`${currency} 0.00`}
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(e.target.value)}
                  />
                </div>
              </div>

              <div className="tax-form-actions">
                <button className="tax-reset-btn" onClick={handleReset}>Reset</button>
                <button className="tax-calc-btn" onClick={handleCalculate}>
                  Calculate Estimated Tax
                </button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="tax-result-card">
              <h3 className="tax-result-title">Tax Summary</h3>

              {!result ? (
                <div className="tax-empty-result">
                  <p>Enter your financial details and click "Calculate" to see your estimated tax breakdown.</p>
                </div>
              ) : (
                <div className="tax-result-content">
                  <div className="tax-result-highlight">
                    <p className="tax-result-label">Quarterly Estimated Tax</p>
                    <p className="tax-result-amount">
                      {currency}{result.quarterlyTax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="tax-result-sub">Effective Rate: {result.effectiveRate}%</p>
                    <button
                      className="tax-save-result-btn"
                      onClick={handleSaveResult}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "💾 Save to History"}
                    </button>
                  </div>

                  <div className="tax-result-rows">
                    <div className="tax-result-row">
                      <span>Quarterly Gross Income</span>
                      <strong>{currency}{Number(result.quarterlyGross).toLocaleString()}</strong>
                    </div>
                    <div className="tax-result-row">
                      <span>Quarterly Deductions</span>
                      <strong>- {currency}{Number(result.totalDeductions).toLocaleString()}</strong>
                    </div>
                    <div className="tax-result-row divider">
                      <span>Annual Gross Income</span>
                      <strong>{currency}{Number(result.annualGross).toLocaleString()}</strong>
                    </div>
                    <div className="tax-result-row">
                      <span>Annual Taxable Income</span>
                      <strong>{currency}{Number(result.annualTaxable).toLocaleString()}</strong>
                    </div>
                    <div className="tax-result-row">
                      <span>Annual Tax</span>
                      <strong>{currency}{Number(result.annualTax).toLocaleString()}</strong>
                    </div>
                    <div className="tax-result-row">
                      <span>Regime</span>
                      <strong>{result.regime}</strong>
                    </div>
                  </div>

                  <div className="tax-slab-section">
                    <h4>Applicable Tax Slabs</h4>
                    <table className="tax-slab-table">
                      <thead>
                        <tr><th>Income Range</th><th>Rate</th></tr>
                      </thead>
                      <tbody>
                        {result.slabs.map((s, i) => (
                          <tr key={i}>
                            <td>
                              {currency}{s.min.toLocaleString()} –{" "}
                              {s.max === Infinity ? "Above" : `${currency}${s.max.toLocaleString()}`}
                            </td>
                            <td>{s.rate}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HISTORY TAB ===== */}
        {activeTab === "history" && (
          <div className="tax-history-section">
            <h3>Saved Tax Calculations</h3>
            {historyLoading ? (
              <p>Loading history...</p>
            ) : history.length === 0 ? (
              <p>No saved calculations yet. Calculate and save your tax to see history here.</p>
            ) : (
              <table className="tax-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Country</th>
                    <th>Financial Year</th>
                    <th>Regime</th>
                    <th>Gross Income</th>
                    <th>Quarterly Tax</th>
                    <th>Annual Tax</th>
                    <th>Effective Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td>{new Date(h.calculated_at).toLocaleDateString()}</td>
                      <td>{h.country}</td>
                      <td>{h.financial_year}</td>
                      <td>{h.tax_regime}</td>
                      <td>{Number(h.gross_income).toLocaleString()}</td>
                      <td>{Number(h.quarterly_tax).toLocaleString()}</td>
                      <td>{Number(h.annual_tax).toLocaleString()}</td>
                      <td>{h.effective_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== CALENDAR TAB ===== */}
        {activeTab === "calendar" && (
          <div className="tax-calendar-section">
            <div className="tax-due-grid">
              {(countryData?.dueDates || []).map((d, i) => {
                const now = new Date();
                const dueStr = `${d.due}, ${d.q === "Q4" ? year + 1 : year}`;
                const dueDate = new Date(dueStr);
                const isPast = now > dueDate;
                const daysLeft = isPast ? 0 : Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
                const status = isPast ? "Overdue" : daysLeft <= 30 ? "Due Soon" : "Upcoming";

                return (
                  <div key={i} className={`tax-due-card ${status.toLowerCase().replace(" ", "-")}`}>
                    <div className="tax-due-header">
                      <span className="tax-due-quarter">{d.q}</span>
                      <span className={`tax-due-status ${status.toLowerCase().replace(" ", "-")}`}>
                        {status}
                      </span>
                    </div>
                    <p className="tax-due-period">{d.period}, {d.q === "Q4" ? year + 1 : year}</p>
                    <p className="tax-due-date">Due: {d.due}, {d.q === "Q4" ? year + 1 : year}</p>
                    {!isPast && <p className="tax-due-days">{daysLeft} days remaining</p>}
                  </div>
                );
              })}
            </div>

            <div className="tax-tips-section">
              <h3 className="tax-tips-title">Tax Saving Opportunities</h3>
              <div className="tax-tips-grid">
                {tips.map((tip, i) => (
                  <div key={i} className="tax-tip-card">
                    <span className="tax-tip-icon">{tip.icon}</span>
                    <h4>{tip.title}</h4>
                    <p>{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}