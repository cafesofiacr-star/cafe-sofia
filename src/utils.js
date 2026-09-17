export function fmt(colones) {
  return "₡" + Math.round(colones).toLocaleString("es-CR");
}

export function statusFor(item) {
  if (item.stock < item.min * 0.6) return "critico";
  if (item.stock < item.min) return "bajo";
  return "normal";
}

export const STATUS_LABEL = { normal: "Normal", bajo: "Bajo mínimo", critico: "Crítico" };
