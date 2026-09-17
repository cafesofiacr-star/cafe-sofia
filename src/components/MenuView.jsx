import { useState } from "react";
import { MENU, CATS } from "../data.js";
import { PlusIcon, CoffeeBranchMotif, MenuBackgroundPattern } from "../icons.jsx";

export default function MenuView({ onAddToCart }) {
  const [activeCat, setActiveCat] = useState("Todas");
  const items = activeCat === "Todas" ? MENU : MENU.filter((m) => m.cat === activeCat);

  return (
    <section data-view="menu">
      <MenuBackgroundPattern className="menu-bg-pattern motif-leaf" />

      <div className="hero">
        <CoffeeBranchMotif className="hero-motif motif-leaf" />
        <div className="hero-text">
          <h1>Tu pedido, listo antes del próximo bloque.</h1>
          <p>
            Café e insumos para estudiantes, docentes y personal administrativo de la sede. Elige, agrega al
            carrito y confirma — sin filas.
          </p>
        </div>
      </div>

      <div className="cat-tabs" role="tablist" aria-label="Categorías del menú">
        {CATS.map((c) => (
          <button
            key={c}
            className="cat-tab"
            role="tab"
            aria-pressed={c === activeCat ? "true" : "false"}
            onClick={() => setActiveCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {items.map((m) => (
          <div className="item-card" key={m.id}>
            <div className="cat-label">{m.cat}</div>
            <h3>{m.name}</h3>
            <p>{m.desc}</p>
            <div className="item-foot">
              <span className="price mono">₡{m.price.toLocaleString("es-CR")}</span>
              <button className="add-btn" onClick={() => onAddToCart(m)}>
                <PlusIcon /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
