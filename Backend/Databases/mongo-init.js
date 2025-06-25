// Select the database (create it if it doesn't exist)
db = db.getSiblingDB('itemdb');

// Create and insert sample documents into the itemImages collection
db.itemImages.insertMany([
  {
    itemId: "item-001",
    name: "silla.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUA"  // <-- Truncated base64 example
  },
  {
    itemId: "item-002",
    name: "mesa.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUAB"  
  }
]);
