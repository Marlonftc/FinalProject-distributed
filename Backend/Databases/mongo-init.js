// Selecciona la base de datos (se crea si no existe)
db = db.getSiblingDB('itemdb');

// Crea e inserta documentos de ejemplo en la colección itemImages
db.itemImages.insertMany([
  {
    itemId: "item-001",
    name: "silla.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUA"  // <-- Ejemplo base64 truncado
  },
  {
    itemId: "item-002",
    name: "mesa.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUAB"  // <-- Otro base64 de prueba
  }
]);
