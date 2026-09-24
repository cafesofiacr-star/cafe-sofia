import { useCallback, useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import MenuView from "./components/MenuView.jsx";
import DesafiosView from "./components/DesafiosView.jsx";
import CartView from "./components/CartView.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Toast from "./components/Toast.jsx";
import { MENU } from "./data.js";
import { CoffeeBranchMotif, SlothMotif } from "./icons.jsx";

export default function App() {
  const [view, setView] = useState("menu");
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState({ message: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3200);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function goto(next) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleAddToCart(item) {
    setCart((c) => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }));
    showToast(item.name + " agregado al carrito");
  }

  function handleIncrement(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function handleDecrement(id) {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));
  }

  function handleConfirmOrder(customerName) {
    const ids = Object.keys(cart).filter((k) => cart[k] > 0);
    if (ids.length === 0) return;

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderItems = ids.map((id) => {
      const item = MENU.find((m) => m.id === id);
      return { id, name: item.name, price: item.price, qty: cart[id] };
    });
    const total = orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);

    setCart({});
    showToast(
      "Gracias, " +
        customerName +
        ". Pedido #" +
        orderNum +
        " registrado. Tu café estará listo apenas confirmemos tu transferencia."
    );

    // El pago es por transferencia (SINPE Móvil): el pedido queda PENDIENTE en
    // el backend, sin descontar stock ni sumar a la caja, hasta que un
    // administrador confirme el pago desde el panel.
    fetch("/api/pedido-transferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: orderItems, customerName, total, orderNum })
    }).catch((err) => console.error("No se pudo avisar al backend:", err));
  }

  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);

  return (
    <>
      <CoffeeBranchMotif className="page-motif tr motif-leaf" />
      <SlothMotif className="page-motif bl motif-sloth" />

      <div className="shell">
        <TopBar view={view} onNavigate={goto} cartCount={cartCount} />

        <main>
          {view === "menu" && <MenuView onAddToCart={handleAddToCart} />}
          {view === "desafios" && <DesafiosView />}
          {view === "cart" && (
            <CartView
              cart={cart}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onConfirm={handleConfirmOrder}
              showToast={showToast}
            />
          )}
        </main>

        <footer>
          <span className="fnote">Café SofIA — prototipo navegable · datos de ejemplo</span>
        </footer>
      </div>

      <ChatWidget />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
