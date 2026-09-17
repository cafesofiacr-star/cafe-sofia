import { CupIcon } from "../icons.jsx";

const NAV_ITEMS = [
  { id: "menu", label: "Menú" },
  { id: "desafios", label: "Desafíos" },
  { id: "cart", label: "Carrito" }
];

export default function TopBar({ view, onNavigate, cartCount }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="mark">
          <CupIcon />
        </div>
        <div>
          <div className="brand-name">Café SofIA</div>
          <div className="brand-sub">Sede ADEN · Costa Rica</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className="nav-btn"
            aria-current={view === item.id ? "true" : "false"}
            onClick={() => onNavigate(item.id)}
          >
            <span className="label">{item.label}</span>
            {item.id === "cart" && <span className="badge">{cartCount}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
}
