export const MENU = [
  { id: "cafe-negro", cat: "Bebidas calientes", name: "Café negro", desc: "Grano 100% costarricense, tueste medio.", price: 950 },
  { id: "cafe-leche", cat: "Bebidas calientes", name: "Café con leche", desc: "El clásico de la sede, suave y cremoso.", price: 1150 },
  { id: "cappuccino", cat: "Bebidas calientes", name: "Cappuccino", desc: "Espuma tupida, doble shot de espresso.", price: 1250 },
  { id: "latte-vainilla", cat: "Bebidas calientes", name: "Latte de vainilla", desc: "Espresso, leche vaporizada y vainilla natural.", price: 1350 },
  { id: "chai-latte", cat: "Bebidas calientes", name: "Chai latte", desc: "Especias, leche vaporizada, sin café.", price: 1200 },
  { id: "cafe-helado", cat: "Bebidas frías", name: "Café helado", desc: "Espresso doble sobre hielo, toque de leche.", price: 1300 },
  { id: "frappe-mocha", cat: "Bebidas frías", name: "Frappé de mocha", desc: "Café, chocolate y leche, bien frío.", price: 1450 },
  { id: "croissant-jyq", cat: "Comidas", name: "Croissant jamón y queso", desc: "Horneado en el momento.", price: 1600 },
  { id: "sandwich-pollo", cat: "Comidas", name: "Sándwich de pollo", desc: "Pollo, vegetales frescos, pan artesanal.", price: 2100 },
  { id: "bagel-qc", cat: "Comidas", name: "Bagel con queso crema", desc: "Bagel tostado, queso crema, cebollín.", price: 1700 },
  { id: "brownie", cat: "Postres", name: "Brownie", desc: "Chocolate intenso, nuez opcional.", price: 1100 },
  { id: "banana-bread", cat: "Postres", name: "Banana bread", desc: "Receta casera, sin lácteos.", price: 950 }
];

export const RECIPES = {
  "cafe-negro": { cafe: 0.018 },
  "cafe-leche": { cafe: 0.018, leche: 0.12 },
  cappuccino: { cafe: 0.018, leche: 0.15 },
  "latte-vainilla": { cafe: 0.018, leche: 0.18 },
  "chai-latte": { leche: 0.15 },
  "cafe-helado": { cafe: 0.018, leche: 0.1 },
  "frappe-mocha": { cafe: 0.02, leche: 0.15 },
  "croissant-jyq": { pan: 1, queso: 0.05 },
  "sandwich-pollo": { pan: 1 },
  "bagel-qc": { pan: 1, queso: 0.04 },
  brownie: {},
  "banana-bread": {}
};

export const INVENTORY_INITIAL = [
  { id: "cafe", name: "Café en grano", unit: "kg", stock: 4.2, min: 3.0, proveedor: "Cafetalera Central CR" },
  { id: "leche", name: "Leche entera", unit: "L", stock: 6.12, min: 6.0, proveedor: "Lácteos San Rafael" },
  { id: "pan", name: "Pan / masa artesanal", unit: "u", stock: 10.6, min: 10.0, proveedor: "Panadería La Espiga" },
  { id: "queso", name: "Queso", unit: "kg", stock: 1.58, min: 1.5, proveedor: "Quesos del Valle" }
];

export const CATS = ["Todas", "Bebidas calientes", "Bebidas frías", "Comidas", "Postres"];

export const CHALLENGES = [
  {
    num: "1",
    eyebrow: "El proyecto",
    title: "La carta de SofIA",
    password: "ENIGMA",
    desc: "La primera lección es aprender a mirar: la agenticidad no es qué podría hacer la IA, sino qué está realmente enchufado y funcionando solo."
  },
  {
    num: "2",
    eyebrow: "La analítica",
    title: "El tablero de SofIA",
    password: "IMITACIÓN",
    desc: "Medir todo es un error. La regla es exigente: por cada número que empuja un indicador, uno que lo cuida."
  },
  {
    num: "3",
    eyebrow: "El agente",
    title: "La receta y el deseo",
    password: "SKETCHES",
    desc: "A un agente no se lo conduce con una receta paso a paso, sino con un objetivo — y él elige cómo adaptarse al contexto."
  },
  {
    num: "4",
    eyebrow: "El alcance",
    title: "Estás adentro de un MVP",
    password: "TUROCHAMP",
    desc: "Se construye recortando: se corta todo lo que no es la pregunta, nunca la pregunta misma. Recortar es un arte de foco."
  },
  {
    num: "5",
    eyebrow: "El límite",
    title: "La Manzana",
    password: null,
    desc: "El cierre del recorrido: elegir a conciencia ser arquitecto de una IA que aumente al ser humano, no que lo reemplace."
  }
];

export const CHALLENGES_URL = "https://aden.org/elearning/cafe-sofia/desafios.html";

export const CHIPS = [
  { q: "¿Qué tienen sin lácteos?", a: "Con gusto — el café negro y el banana bread no llevan lácteos. ¿Querés que te los agregue al pedido?" },
  { q: "¿Cuál es el horario?", a: "Abrimos de lunes a viernes de 7:00 a.m. a 6:00 p.m., ideal para tu café antes de clase." },
  { q: "Quiero hacer un pedido", a: "Perfecto, podés armar tu pedido desde el menú arriba. Si querés una recomendación, el café con leche es el favorito de la sede." },
  { q: "¿Tienen wifi gratis para estudiantes?", a: "Esa información no la tengo confirmada por ahora, así que prefiero decírtelo con honestidad antes que inventarte algo. Te recomiendo consultarlo directamente en el mostrador." },
  { q: "Gracias, eso es todo", a: "Con mucho gusto. Que tengas un excelente día. ¡Pura Vida!" }
];

export const GREETING = "Hola, soy SofIA. ¿En qué te puedo ayudar hoy?";

export const VOICE_DEMOS = [
  { t: "¿Tienen algo sin gluten?", a: "Por ahora no tenemos opciones certificadas sin gluten, pero el café negro y las bebidas frías no llevan trigo. ¡Pura Vida!" },
  { t: "¿Me recomendás algo dulce?", a: "Claro — el brownie es el más pedido de la sede. ¿Te lo agrego al pedido?" }
];
