import { useCallback, useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import MenuView from "./components/MenuView.jsx";
import DesafiosView from "./components/DesafiosView.jsx";
import CartView from "./components/CartView.jsx";
import AdminView from "./components/AdminView.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Toast from "./components/Toast.jsx";
import { INVENTORY_INITIAL, RECIPES, MENU } from "./data.js";
import { CoffeeBranchMotif, SlothMotif, ShieldIcon } from "./icons.jsx";

export default function App() {
  const [view, setView] = useState("menu");
  const [cart, setCart] = useState({});
  const [inventory, setInventory] = useState(() => INVENTORY_INITIAL.map((i) => ({ ...i })));
  const [log, setLog] = useState([]);
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

  function handleUpdateMin(id, value) {
    setInventory((inv) => inv.map((i) => (i.id === id ? { ...i, min: value } : i)));
  }

  function handleConfirmOrder(customerName) {
    const ids = Object.keys(cart).filter((k) => cart[k] > 0);
    if (ids.length === 0) return;

    let nextInventory = inventory.map((i) => ({ ...i }));
    const triggered = [];

    ids.forEach((id) => {
      const qty = cart[id];
      const recipe = RECIPES[id] || {};
      Object.keys(recipe).forEach((ingId) => {
        const inv = nextInventory.find((i) => i.id === ingId);
        if (!inv) return;
        const wasAbove = inv.stock >= inv.min;
        inv.stock = Math.max(0, inv.stock - recipe[ingId] * qty);
        if (wasAbove && inv.stock < inv.min) triggered.push(inv);
      });
    });

    const newLogEntries = triggered.map((inv) => ({
      ing: inv.name,
      proveedor: inv.proveedor,
      date: new Date().toLocaleString("es-CR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    }));

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderItems = ids.map((id) => {
      const item = MENU.find((m) => m.id === id);
      return { id, name: item.name, price: item.price, qty: cart[id] };
    });
    const total = orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);

    setInventory(nextInventory);
    if (newLogEntries.length) setLog((l) => [...l, ...newLogEntries]);
    setCart({});
    showToast(
      "Gracias, " +
        customerName +
        ". Pedido #" +
        orderNum +
        " confirmado, estará listo en unos 8 minutos." +
        (newLogEntries.length
          ? " Se generaron " + newLogEntries.length + " pedido(s) automático(s) a proveedores."
          : "")
    );

    // Avisa al backend real (Apps Script) a través de la función serverless de
    // Vercel. No bloquea la experiencia del cliente: si falla, se registra en
    // consola pero el pedido ya quedó confirmado en pantalla.
    fetch("/api/confirmar-pedido", {
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
          {view === "admin" && (
            <AdminView inventory={inventory} log={log} onUpdateMin={handleUpdateMin} onNavigate={goto} />
          )}
        </main>

        <footer>
          <span className="fnote">Café SofIA — prototipo navegable · datos de ejemplo</span>
          <button className="admin-link" onClick={() => goto("admin")}>
            <ShieldIcon />
            Acceso Administrador
          </button>
        </footer>
      </div>

      <ChatWidget />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
