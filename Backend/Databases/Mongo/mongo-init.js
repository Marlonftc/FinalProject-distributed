// Selecciona (o crea) la base de datos
db = db.getSiblingDB('itemdb');

// Inserta datos de prueba en la colección "itemImages"
db.itemImages.insertMany([
  {
    itemId: "item-001",
    name: "silla.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUA"  // Imagen en base64 (truncada)
  },
  {
    itemId: "item-002",
    name: "mesa.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUAB"  // Otra imagen de ejemplo
  }
]);

print(" MongoDB se ha inicializado con datos de ejemplo en 'itemImages'.");
