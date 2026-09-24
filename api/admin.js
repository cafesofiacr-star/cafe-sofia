// Función serverless de Vercel para el panel /admin. Valida la contraseña del
// panel en el servidor (nunca en el navegador) y, si es correcta, reenvía la
// acción a Apps Script con el token servidor-a-servidor del panel. Ni la
// contraseña "oficial" ni ese token viajan nunca al navegador: solo la
// contraseña que el usuario TIPEA viaja hasta acá para ser comparada.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido" });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const adminToken = process.env.ADMIN_APPS_SCRIPT_TOKEN;

  if (!adminPassword || !appsScriptUrl || !adminToken) {
    res.status(500).json({ ok: false, error: "El panel no está configurado" });
    return;
  }

  const { password, action, args } = req.body || {};
  if (password !== adminPassword) {
    res.status(401).json({ ok: false, error: "Clave incorrecta" });
    return;
  }

  if (action === "login") {
    res.status(200).json({ ok: true });
    return;
  }

  try {
    // Mismo detalle que en confirmar-pedido.js: Apps Script responde con un
    // 302 hacia una URL temporal que solo acepta GET, así que la seguimos a
    // mano en vez de dejar que fetch la siga sola.
    let response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, token: adminToken, args: args || {} }),
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
