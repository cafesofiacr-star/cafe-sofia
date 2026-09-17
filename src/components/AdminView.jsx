import { statusFor, STATUS_LABEL } from "../utils.js";
import { ShieldIcon, ArrowLeftIcon, ReorderIcon } from "../icons.jsx";

export default function AdminView({ inventory, log, onUpdateMin, onNavigate }) {
  return (
    <section data-view="admin">
      <div className="admin-banner">
        <div className="label">
          <ShieldIcon />
          Vista de Administrador — no visible para los clientes del sitio
        </div>
        <button className="back-link" onClick={() => onNavigate("menu")}>
          <ArrowLeftIcon />
          Volver al sitio
        </button>
      </div>

      <h2 className="admin-section-title">Inventario e insumos</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Stock actual</th>
              <th>Mínimo</th>
              <th>Estado</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const st = statusFor(item);
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="mono">
                    {item.stock.toFixed(2)} {item.unit}
                  </td>
                  <td>
                    <input
                      className="min-input"
                      type="number"
                      step="0.1"
                      defaultValue={item.min.toFixed(2)}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v) && v >= 0) onUpdateMin(item.id, v);
                      }}
                    />
                  </td>
                  <td>
                    <span className={"pill " + st}>{STATUS_LABEL[st]}</span>
                  </td>
                  <td>{item.proveedor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="admin-section-title">Pedidos automáticos a proveedores</h2>
      <p style={{ fontSize: ".85rem", color: "var(--ink-soft)", marginTop: -6, marginBottom: 14 }}>
        Se genera un pedido automático apenas un ingrediente cruza su mínimo. Confirma un pedido desde el menú
        público para ver cómo se dispara.
      </p>
      <div className="log-list">
        {log.length === 0 ? (
          <div className="log-empty">Aún no se generaron pedidos automáticos.</div>
        ) : (
          [...log].reverse().map((entry, i) => (
            <div className="log-item" key={i}>
              <ReorderIcon />
              <div>
                <div className="lt">
                  Pedido automático — <strong>{entry.ing}</strong>
                </div>
                <div className="ld">
                  {entry.date} · Proveedor: {entry.proveedor}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
