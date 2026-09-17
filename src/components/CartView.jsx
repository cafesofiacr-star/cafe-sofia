import { useState } from "react";
import { MENU } from "../data.js";
import { fmt } from "../utils.js";
import { MinusIcon, PlusIcon, EmptyCartIcon } from "../icons.jsx";

export default function CartView({ cart, onIncrement, onDecrement, onConfirm, showToast }) {
  const [name, setName] = useState("");

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const lines = entries.map(([id, qty]) => {
    const item = MENU.find((m) => m.id === id);
    return { item, qty, lineTotal: item.price * qty };
  });
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  function handleConfirm() {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast("Antes de confirmar, escribe el nombre para el pedido.");
      return;
    }
    onConfirm(trimmed);
    setName("");
  }

  return (
    <section data-view="cart">
      <div className="hero" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "1.6rem" }}>Tu carrito</h1>
      </div>
      <div className="cart-wrap">
        {lines.length === 0 ? (
          <div className="cart-empty">
            <EmptyCartIcon />
            <div>Todavía no agregaste nada. Vuelve al menú para armar tu pedido.</div>
          </div>
        ) : (
          <>
            <div>
              {lines.map(({ item, qty, lineTotal }) => (
                <div className="cart-row" key={item.id}>
                  <div className="info">
                    <h3>{item.name}</h3>
                    <span>{fmt(item.price)} c/u</span>
                  </div>
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => onDecrement(item.id)} aria-label={`Quitar una unidad de ${item.name}`}>
                      <MinusIcon />
                    </button>
                    <span className="qty-num">{qty}</span>
                    <button className="qty-btn" onClick={() => onIncrement(item.id)} aria-label={`Agregar una unidad de ${item.name}`}>
                      <PlusIcon />
                    </button>
                  </div>
                  <div className="line-total mono">{fmt(lineTotal)}</div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="name-field">
                <label htmlFor="customer-name">Nombre para el pedido</label>
                <input
                  id="customer-name"
                  type="text"
                  placeholder="¿A nombre de quién lo dejamos?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="summary-line">
                <span>Subtotal</span>
                <span className="mono">{fmt(subtotal)}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span className="mono">{fmt(subtotal)}</span>
              </div>
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirmar pedido
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
