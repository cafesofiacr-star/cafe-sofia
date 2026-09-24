import { useCallback, useEffect, useState } from "react";
import { fmt } from "../utils.js";
import { ShieldIcon, PlusIcon } from "../icons.jsx";

// Llama a la función serverless /api/admin. La contraseña viaja en cada
// pedido para que el servidor la revalide siempre (nunca queda guardada en
// el navegador más que en memoria, y se pierde al recargar la página).
async function callAdmin(password, action, args) {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, action, args })
  });
  return res.json();
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [data, setData] = useState({ cafes: [], insumos: [], transferencias_pendientes: [] });
  const [tab, setTab] = useState("transferencias");
  const [notice, setNotice] = useState("");

  const refresh = useCallback(
    async (pass) => {
      const r = await callAdmin(pass, "admin_list", {});
      if (r.ok) setData(r);
    },
    []
  );

  useEffect(() => {
    if (!authed) return;
    refresh(password);
    const id = setInterval(() => refresh(password), 8000);
    return () => clearInterval(id);
  }, [authed, password, refresh]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const r = await callAdmin(password, "login", {});
      if (r.ok) {
        setAuthed(true);
      } else if (r.error && r.error.indexOf("no está configurado") >= 0) {
        setLoginError("El panel no está configurado. Revisa las variables de entorno en Vercel.");
      } else {
        setLoginError("Clave incorrecta.");
      }
    } catch (err) {
      setLoginError("No se pudo contactar al servidor. Intenta de nuevo.");
    } finally {
      setLoggingIn(false);
    }
  }

  function flash(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  }

  async function act(action, args) {
    const r = await callAdmin(password, action, args);
    if (r.ok) {
      flash("Listo");
      refresh(password);
    } else {
      flash("Error: " + (r.error || "algo salió mal"));
    }
    return r;
  }

  if (!authed) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <div className="admin-login-title">
            <ShieldIcon />
            <span>Panel de administración</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="name-field">
              <label htmlFor="admin-pass">Contraseña del equipo</label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {loginError && <div className="admin-error">{loginError}</div>}
            <button className="confirm-btn" type="submit" disabled={loggingIn || !password}>
              {loggingIn ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-banner">
        <div className="label">
          <ShieldIcon />
          Panel de administración — Café SofIA
        </div>
        <a className="back-link" href="/">Volver al sitio</a>
      </div>

      {notice && <div className="admin-notice">{notice}</div>}

      <div className="admin-tabs">
        <button className={tab === "transferencias" ? "active" : ""} onClick={() => setTab("transferencias")}>
          Transferencias {data.transferencias_pendientes.length > 0 && `(${data.transferencias_pendientes.length})`}
        </button>
        <button className={tab === "cafes" ? "active" : ""} onClick={() => setTab("cafes")}>
          Cafés
        </button>
        <button className={tab === "insumos" ? "active" : ""} onClick={() => setTab("insumos")}>
          Insumos y stock
        </button>
      </div>

      {tab === "transferencias" && <TransferenciasTab data={data} act={act} />}
      {tab === "cafes" && <CafesTab data={data} act={act} />}
      {tab === "insumos" && <InsumosTab data={data} act={act} />}
    </div>
  );
}

function TransferenciasTab({ data, act }) {
  const pend = data.transferencias_pendientes;
  return (
    <section>
      <h2 className="admin-section-title">Transferencias por confirmar</h2>
      {pend.length === 0 ? (
        <div className="log-empty">No hay transferencias pendientes.</div>
      ) : (
        <div className="log-list">
          {pend.map((t) => (
            <div className="log-item transfer-item" key={t.orderId}>
              <div>
                <div className="lt">
                  Pedido #{t.orderId} — <strong className="mono">{fmt(t.monto)}</strong>
                </div>
                <div className="ld">
                  {t.items.map((it) => `${it.qty || it.cantidad}× ${it.name || it.nombre}`).join(", ")}
                </div>
              </div>
              <div className="transfer-actions">
                <button className="mini-btn confirm" onClick={() => act("admin_confirm_transferencia", { orderId: t.orderId })}>
                  Confirmar
                </button>
                <button className="mini-btn discard" onClick={() => act("admin_descartar_transferencia", { orderId: t.orderId })}>
                  Descartar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CafesTab({ data, act }) {
  const [form, setForm] = useState(null);

  function edit(cafe) {
    setForm({ ...cafe });
  }
  function nuevo() {
    setForm({ id_item: "", nombre: "", precio: "", activo: true, insumo_id: "", cantidad_receta: 1, img_url: "", desc: "" });
  }
  async function guardar(e) {
    e.preventDefault();
    await act("admin_upsert_item", form);
    setForm(null);
  }

  return (
    <section>
      <div className="admin-section-head">
        <h2 className="admin-section-title">Cafés</h2>
        <button className="mini-btn" onClick={nuevo}>
          <PlusIcon /> Nuevo café
        </button>
      </div>

      {form && (
        <form className="admin-form" onSubmit={guardar}>
          <div className="form-grid">
            <label>
              ID (único, sin espacios)
              <input value={form.id_item} disabled={!!data.cafes.find((c) => c.id_item === form.id_item)}
                onChange={(e) => setForm({ ...form, id_item: e.target.value })} required />
            </label>
            <label>
              Nombre
              <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </label>
            <label>
              Precio
              <input type="number" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
            </label>
            <label>
              Insumo asociado (id)
              <input value={form.insumo_id} onChange={(e) => setForm({ ...form, insumo_id: e.target.value })}
                placeholder="ej: cap_espresso" />
            </label>
            <label>
              Cantidad de insumo por café
              <input type="number" value={form.cantidad_receta} onChange={(e) => setForm({ ...form, cantidad_receta: e.target.value })} />
            </label>
            <label>
              Foto (URL)
              <input value={form.img_url} onChange={(e) => setForm({ ...form, img_url: e.target.value })} />
            </label>
            <label className="full">
              Descripción
              <input value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
            </label>
            <label className="checkbox">
              <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} />
              Activo (visible en la carta)
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="confirm-btn" type="submit">Guardar</button>
            <button className="mini-btn" type="button" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Café</th><th>Precio</th><th>Insumo</th><th>Estado</th><th></th>
            </tr>
          </thead>
          <tbody>
            {data.cafes.map((c) => (
              <tr key={c.id_item}>
                <td>{c.nombre}</td>
                <td className="mono">{fmt(c.precio)}</td>
                <td>{c.insumo_id || "—"}</td>
                <td><span className={"pill " + (c.activo ? "normal" : "bajo")}>{c.activo ? "Activo" : "Oculto"}</span></td>
                <td>
                  <button className="mini-btn" onClick={() => edit(c)}>Editar</button>
                  <button className="mini-btn" onClick={() => act("admin_upsert_item", { ...c, activo: !c.activo })}>
                    {c.activo ? "Ocultar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InsumosTab({ data, act }) {
  const [form, setForm] = useState(null);
  const [stockInputs, setStockInputs] = useState({});

  function edit(insumo) {
    setForm({ ...insumo });
  }
  function nuevo() {
    setForm({ id_insumo: "", nombre: "", unidad: "u", umbral_min: "", costo_unitario: "", stock: 0 });
  }
  async function guardar(e) {
    e.preventDefault();
    await act("admin_upsert_insumo", form);
    setForm(null);
  }
  async function agregarStock(id) {
    const delta = Number(stockInputs[id]);
    if (!delta) return;
    await act("admin_set_stock", { id_insumo: id, delta });
    setStockInputs({ ...stockInputs, [id]: "" });
  }

  return (
    <section>
      <div className="admin-section-head">
        <h2 className="admin-section-title">Insumos y stock</h2>
        <button className="mini-btn" onClick={nuevo}>
          <PlusIcon /> Nuevo insumo
        </button>
      </div>

      {form && (
        <form className="admin-form" onSubmit={guardar}>
          <div className="form-grid">
            <label>
              ID (único, sin espacios)
              <input value={form.id_insumo} disabled={!!data.insumos.find((i) => i.id_insumo === form.id_insumo)}
                onChange={(e) => setForm({ ...form, id_insumo: e.target.value })} required />
            </label>
            <label>
              Nombre
              <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </label>
            <label>
              Unidad
              <input value={form.unidad} onChange={(e) => setForm({ ...form, unidad: e.target.value })} />
            </label>
            <label>
              Umbral mínimo
              <input type="number" value={form.umbral_min} onChange={(e) => setForm({ ...form, umbral_min: e.target.value })} />
            </label>
            <label>
              Costo unitario
              <input type="number" value={form.costo_unitario} onChange={(e) => setForm({ ...form, costo_unitario: e.target.value })} />
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="confirm-btn" type="submit">Guardar</button>
            <button className="mini-btn" type="button" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Insumo</th><th>Stock</th><th>Umbral</th><th>Estado</th><th>Agregar stock</th><th></th>
            </tr>
          </thead>
          <tbody>
            {data.insumos.map((i) => (
              <tr key={i.id_insumo}>
                <td>{i.nombre}</td>
                <td className="mono">{i.stock} {i.unidad}</td>
                <td className="mono">{i.umbral_min}</td>
                <td><span className={"pill " + (i.estado === "OK" ? "normal" : "bajo")}>{i.estado}</span></td>
                <td>
                  <div className="stock-add">
                    <input
                      type="number"
                      placeholder="cantidad"
                      value={stockInputs[i.id_insumo] || ""}
                      onChange={(e) => setStockInputs({ ...stockInputs, [i.id_insumo]: e.target.value })}
                    />
                    <button className="mini-btn" onClick={() => agregarStock(i.id_insumo)}>+ Agregar</button>
                  </div>
                </td>
                <td>
                  <button className="mini-btn" onClick={() => edit(i)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
