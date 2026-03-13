.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: transparent;
}

.sidebar {
  width: 250px;
  background-color: transparent;
  border-right: 1px solid var(--border-dark);
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header {
  padding: 0 2rem 2.5rem 2rem;
}

.sidebar-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  font-style: italic;
  color: var(--text-dark);
  letter-spacing: -0.5px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 2rem;
  color: var(--text-dark);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
}

.nav-item.active {
  font-weight: 700;
  background-color: transparent; /* No background in design, just bold text */
}

/* Icons are small */
.nav-icon {
  width: 16px;
  height: 16px;
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-dark);
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 0;
}

.sidebar-footer .nav-item {
  padding: 0;
  font-size: 0.75rem;
  width: auto;
}

.main-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
}
