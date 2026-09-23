# Mi progreso — Café SofIA

## Clase 5 · De un prompt a una app publicada en Internet (tramo final)
- [x] Etapa 0 · Punto de partida: llegaste a Claude Code
- [x] Etapa 1 · GitHub — repo: https://github.com/cafesofiacr-star/cafe-sofia
- [x] Etapa 2 · Vercel — URL pública: https://cafe-sofia-three.vercel.app

## Clase 6 · Conectar con el mundo real
- [x] Etapa 3 · La arquitectura, como un restaurante
- [x] Etapa 4 · Conectar el frontend con el backend
- [ ] Etapa 5 · Variables de entorno
- [ ] Etapa 6 · El token entre servidores — HITO 2
- [ ] Etapa 7 · Los métodos de pago
- [ ] Etapa 8 · El panel de administración: la trastienda
- [ ] Etapa 9 · Usar el panel: carta, insumos, stock y transferencias
- [ ] Etapa 10 · SofIA en modo real

## Notas de contexto
_(Lo importante para retomar. Sin claves ni contraseñas.)_
- Usuario de GitHub: cafesofiacr-star. Repo: cafe-sofia (público).
- Usa Mac (arm64). Se instaló GitHub CLI (`gh`) en ~/.local/bin porque no tenía Homebrew ni gh.
- Variable de entorno en Vercel para la URL del backend: APPS_SCRIPT_URL.
- El backend de Apps Script (Code.gs) está en una cuenta que antes era de ADEN y se transicionó a la cuenta personal del alumno; un compañero de equipo (Café Sofía Costa Rica) tocó accesos y borró archivos de GitHub el 20/09 (ya restaurado). Si algo similar vuelve a pasar, revisar primero permisos "Quién tiene acceso" del deployment de Apps Script.
- Carta del e-commerce (cafe-negro, cappuccino, etc.) todavía NO coincide con la carta de la planilla (espresso, capuchino, latte). Los ítems del e-commerce sin receta cargada registran venta y caja pero no descuentan stock (se resuelve cargando cafés/insumos reales en el panel, Etapa 8-9).
- Detalle técnico ya resuelto en el código: las funciones serverless que llaman al backend de Apps Script deben seguir a mano la redirección 302 que Apps Script devuelve (con fetch redirect:"manual" + un GET manual al Location), porque esa URL de redirección solo acepta GET. Ver api/confirmar-pedido.js como referencia para futuros endpoints (Etapas 6, 7, 8, 10).
