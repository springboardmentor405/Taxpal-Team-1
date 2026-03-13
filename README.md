# TaxPal Application

TaxPal is a modern, responsive React application designed to help users track their income, expenses, and overall financial health. This project focuses on a pixel-perfect implementation of a precise Figma design specification, emphasizing a clean, robust structure with minimal dependencies.

## 🚀 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6 (`react-router-dom`)
- **Icons:** Lucide React (`lucide-react`)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, exact design token matching)
- **Node Environment:** Node.js

## 🌟 Features & User Flow

The application consists of 8 interconnected views divided into two primary experiences: the **Authentication Flow** and the **Dashboard Flow**.

### 1. Authentication Flow
Users begin their journey on the authentication screens, which use a unified `AuthLayout` providing a consistent blue gradient background and centered white card.

- **Login (`/login`):** Returning users enter their email and password. Includes links to Register and Forgot Password.
- **Register (`/register`):** New users can create an account by providing a username, email, password, and password confirmation.
- **Verification (`/verify`):** A 4-digit OTP input screen where users verify their email post-registration or password reset.
- **Forgot Password (`/forgot-password`):** Users input their email to request a password reset OTP.

### 2. Dashboard Flow
Once authenticated, users access the core application via the `DashboardLayout`, featuring a persistent, sticky left sidebar for easy navigation.

- **Financial Dashboard (`/dashboard`):** The primary view offering:
  - High-level metric cards: Monthly Income, Monthly Expenses, Estimated Tax Due, and Saving Rate.
  - A mock vertical bar chart visualizing Income vs. Expenses over several months.
  - A responsive CSS-based pie chart breaking down expenses by category (Rent, Business, Utilities, etc.).
- **Settings (`/settings`):** A management view with side-navigation for Profile, Categories, Notifications, and Security. Currently showcases the "Category Management" interface where expense and income categories can be viewed, edited, or deleted.
- **Record Income (`/record-income`):** A modal-style form overlay enabling users to quickly log new income (description, amount, category, date, and notes).
- **Record Expense (`/record-expense`):** A similar modal form tailored for adding new expenses, utilizing a distinct error-red color scheme for the submit button.

## 🛠️ Local Development Setup

To run this application locally, ensure you have Node.js installed on your machine.

1. **Clone/Navigate to the directory:**
   ```bash
   cd taxpal-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:5173`. You will automatically be redirected to the Login page.

## 🎨 Design & Styling Notes

This project strictly adheres to provided Figma designs without relying on bulky UI libraries or utility-class frameworks like Tailwind CSS.

- **Global Variables:** Base colors, font settings, and layout tokens are managed centrally in `src/index.css` under the `:root` pseudo-class.
- **Component-Level CSS:** Major layout structures (`AuthLayout`, `DashboardLayout`, `Settings`, `Dashboard`) have dedicated CSS files imported directly into their respective JSX files to maintain modularity and scope.
- **Typography:** The application utilizes the `Inter` font family, meticulously matching the exact weights (400-800) and italic treatments found in the design mockups.
