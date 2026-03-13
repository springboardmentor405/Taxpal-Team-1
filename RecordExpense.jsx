import React from 'react';
import './Dashboard.css';
import { ArrowUpRight, ArrowDownRight, AlertCircle, PiggyBank, Plus, Minus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Financial Dashboard</h1>
          <p>Welcome back, Alex Morgon! Here's your financial summary.</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline-green" onClick={() => window.location.href='/record-income'}>
            <Plus size={12} strokeWidth={3} /> Record Income
          </button>
          <button className="btn-outline-red" onClick={() => window.location.href='/record-expense'}>
            <Minus size={12} strokeWidth={3} /> Record Expense
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card">
          <div className="card-title">Monthly Income <ArrowUpRight size={14} color="var(--text-dark)" /></div>
          <div className="card-value">$0.00</div>
          <div className="card-change positive">↑ 12% from last month</div>
        </div>
        <div className="card">
          <div className="card-title">Monthly Expenses <ArrowDownRight size={14} color="var(--error)" /></div>
          <div className="card-value">$0.00</div>
          <div className="card-change negative">↓ 8% from last month</div>
        </div>
        <div className="card">
          <div className="card-title">Estimated Tax Due <AlertCircle size={14} color="var(--warning)" fill="#fef3c7" /></div>
          <div className="card-value">$0.00</div>
          <div className="card-change neutral" style={{color: '#fcd34d'}}>No upcoming Taxes</div>
        </div>
        <div className="card">
          <div className="card-title">Saving Rate <PiggyBank size={14} color="var(--text-dark)" /></div>
          <div className="card-value">0.0%</div>
          <div className="card-change positive">↑ 32% from your goal</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Income vs Expenses</h3>
          <div className="bar-chart-mock">
            <div className="y-axis-labels">
              <span>$10k</span>
              <span>$5k</span>
              <span>$5k</span>
              <span>$5k</span>
              <span>$0</span>
            </div>
            {/* Mock bars matching the design shapes roughly */}
            <div className="bar-group">
              <div className="bar green" style={{height: '50%'}}></div>
              <div className="bar red" style={{height: '25%'}}></div>
              <span className="month-label">Jan</span>
            </div>
            <div className="bar-group">
              <div className="bar green" style={{height: '40%'}}></div>
              <div className="bar red" style={{height: '60%'}}></div>
              <span className="month-label">Feb</span>
            </div>
            <div className="bar-group">
              <div className="bar green" style={{height: '75%'}}></div>
              <div className="bar red" style={{height: '45%'}}></div>
              <span className="month-label">Mar</span>
            </div>
            <div className="bar-group">
              <div className="bar green" style={{height: '65%'}}></div>
              <div className="bar red" style={{height: '35%'}}></div>
              <span className="month-label">Apr</span>
            </div>
            <div className="bar-group">
              <div className="bar green" style={{height: '85%'}}></div>
              <div className="bar red" style={{height: '0%'}}></div> {/* missing red bar in May in design? */}
              <span className="month-label">May</span>
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="dot green"></span> Income</span>
            <span className="legend-item"><span className="dot red"></span> Expenses</span>
          </div>
        </div>

        <div className="chart-card">
          <h3>Expense Breakdown</h3>
          <div className="pie-chart-container">
            <div className="pie-chart"></div>
            <div className="pie-legend">
              <div className="legend-item"><span className="dot blue"></span> Rent/Mortgage <span className="pct">22%</span></div>
              <div className="legend-item"><span className="dot green"></span> Business Expense <span className="pct">20%</span></div>
              <div className="legend-item"><span className="dot yellow"></span> Utilities <span className="pct">19%</span></div>
              <div className="legend-item"><span className="dot red"></span> Food <span className="pct">16%</span></div>
              <div className="legend-item"><span className="dot purple"></span> Other <span className="pct">13%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
