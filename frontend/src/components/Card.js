export default function Card({ children }) {
  return (
    <div className="taxpal-bg">
      <div className="taxpal-card">
        {children}
      </div>
    </div>
  );
}