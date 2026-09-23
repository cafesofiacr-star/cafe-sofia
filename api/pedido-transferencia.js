// Función serverless de Vercel: registra un pedido pagado por transferencia
// (SINPE Móvil) como PENDIENTE en el backend. No descuenta stock ni suma a la
// caja: eso pasa recién cuando un administrador confirma el pago desde /admin.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido" });
    return;
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const appsScriptToken = process.env.APPS_SCRIPT_TOKEN;
  if (!appsScriptUrl || !appsScriptToken) {
    res.status(500).json({ ok: false, error: "Falta configurar APPS_SCRIPT_URL o APPS_SCRIPT_TOKEN en el servidor" });
    return;
  }

  const { items, customerName, total, orderNum } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ ok: false, error: "El pedido no tiene items" });
    return;
  }

  try {
    // Apps Script responde al POST con un 302 hacia una URL temporal que solo
    // acepta GET. Seguimos la redirección a mano en vez de dejar que fetch la
    // siga sola, porque algunos entornos la repiten como POST y esa URL la
    // rechaza.
    let response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "nuevo_pedido_transferencia",
        token: appsScriptToken,
        cliente: customerName || "",
        orderNum: orderNum || "",
        total: total || 0,
        items: items.map((it) => ({
          id_item: it.id,
          nombre: it.name,
          precio: it.price,
          cantidad: it.qty
        }))
      }),
      redirect: "manual"
    });

    if (response.status === 302 || response.status === 301) {
      const location = response.headers.get("location");
      if (!location) {
        res.status(502).json({ ok: false, error: "El backend redirigió sin indicar destino" });
        return;
      }
      response = await fetch(location, { method: "GET" });
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { ok: false, error: "Respuesta inesperada del backend", raw: text };
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ ok: false, error: "No se pudo contactar al backend: " + error.message });
  }
}
