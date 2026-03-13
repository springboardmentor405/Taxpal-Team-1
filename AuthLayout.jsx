@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,700;1,800&display=swap');

:root {
  --primary-light: #D4EBFE;
  --primary: #BCE0FD;
  --primary-dark: #81C1F6;
  --text-dark: #000000;
  --text-gray: #555555;
  --text-light-gray: #a0a0a0;
  --white: #FFFFFF;
  --border-light: #d1d5db;
  --border-dark: #9ca3af;
  --error: #ef4444;
  --success: #10b981;
  --warning: #f59e0b;
  --bg-gradient: linear-gradient(180deg, #D4EBFE 0%, #FFFFFF 50%, #FFFFFF 100%);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-dark);
  min-height: 100vh;
  /* Apply gradient to body to act as global background */
  background: var(--bg-gradient);
  background-attachment: fixed;
}

/* Authentication Layout */
.auth-layout-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  /* For Register/Verify/Forgot we need a border and transparent bg */
  background: transparent;
  border-radius: 12px;
  /* Optional border handled directly in components if needed, or by default here */
}

/* Add a class for cards that need the border (Image 2,3,4) */
.auth-card.with-border {
  border: 1px solid var(--border-dark);
}

.auth-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 800;
  font-style: italic; /* Taxpal logo style */
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.auth-title-normal {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.auth-subtitle {
  text-align: center;
  font-size: 0.65rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.65rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.form-input {
  width: 100%;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border-dark);
  border-radius: 6px;
  font-size: 0.8rem;
  outline: none;
  background-color: var(--white);
}

.form-input:focus {
  border-color: var(--primary-dark);
}

/* Buttons */
.btn-pill {
  background-color: var(--primary);
  color: var(--text-dark);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.4rem 2.5rem;
  border: 1px solid var(--text-dark); /* Thin dark border from design */
  border-radius: 9999px;
  cursor: pointer;
  margin: 1.5rem auto 1rem;
  display: block;
}

.btn-pill:hover {
  background-color: var(--primary-dark);
}

/* Modals inside auth layout */
.modal-overlay {
  background: var(--bg-gradient);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-content {
  background: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
}
