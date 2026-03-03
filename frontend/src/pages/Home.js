import "./Home.css";

export default function Home({ setView }) {
  return (
    <div className="home-bg">
      <div className="home-card">
        <h1 className="home-title">Welcome to TaxPal</h1>
        <p className="home-subtitle">
          Smart finance starts with smart tracking
        </p>

        <button
          className="home-btn"
          onClick={() => setView("login")}
        >
          Login to your account
        </button>
      </div>
    </div>
  );
}