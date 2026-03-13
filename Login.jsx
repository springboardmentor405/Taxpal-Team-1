.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header-text h1 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: var(--text-dark);
}

.dashboard-header-text p {
  color: var(--text-gray);
  font-size: 0.75rem;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-outline-green, .btn-outline-red {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.65rem;
  cursor: pointer;
}

.btn-outline-green {
  border: 1px solid var(--success);
  color: var(--success);
}

.btn-outline-red {
  border: 1px solid var(--error);
  color: var(--error);
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.card {
  background: var(--white);
  border-radius: 6px;
  padding: 0.8rem;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-gray);
  margin-bottom: 0.4rem;
}

.card-value {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--text-dark);
}

.card-change {
  font-size: 0.55rem;
  font-weight: 600;
}

.card-change.positive { color: var(--success); }
.card-change.negative { color: var(--error); }
.card-change.neutral { color: var(--warning); } /* Yellowish color for tax due */

.charts-container {
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 1rem;
  min-height: 250px;
}

.chart-card {
  background: var(--white);
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
}

.chart-card h3 {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-gray);
}

.bar-chart-mock {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 180px;
  border-left: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.5rem;
  flex: 1;
  position: relative;
}

.y-axis-labels {
  position: absolute;
  left: -25px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.55rem;
  color: var(--text-light-gray);
}

.bar-group {
  display: flex;
  gap: 0.35rem;
  height: 100%;
  align-items: flex-end;
  position: relative;
  width: 30px;
  justify-content: center;
}

.bar {
  width: 14px;
  border-radius: 2px 2px 0 0;
}

.bar.green { background-color: var(--success); }
.bar.red { background-color: var(--error); }

.month-label {
  position: absolute;
  bottom: -15px;
  font-size: 0.55rem;
  color: var(--text-light-gray);
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.65rem;
  color: var(--text-gray);
  font-weight: 500;
}

.dot {
  width: 8px; height: 8px; border-radius: 2px; /* square dots in design */
}
.dot.green { background-color: var(--success); }
.dot.red { background-color: var(--error); }
.dot.blue { background-color: #3b82f6; } /* generic tailwind blue */
.dot.yellow { background-color: #f59e0b; }
.dot.purple { background-color: #a855f7; }

.pie-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;
}

.pie-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(
    #3b82f6 0% 22%,
    var(--success) 22% 42%,
    #f59e0b 42% 61%,
    var(--error) 61% 77%,
    #a855f7 77% 100%
  );
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  padding: 0 1rem;
}

.pie-legend .legend-item {
  justify-content: flex-start;
  width: 100%;
}

.pct {
  font-weight: 700;
  color: var(--text-dark);
  margin-left: auto;
}
