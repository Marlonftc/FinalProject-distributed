// Select (or create) the database
db = db.getSiblingDB('itemdb');

// Insert test data into the "itemImages" collection
db.itemImages.insertMany([
  {
    itemId: "item-001",
    name: "silla.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUA"  
// Base64 image (truncated)
  },
  {
    itemId: "item-002",
    name: "mesa.jpg",
    type: "image/jpeg",
    data: "iVBORw0KGgoAAAANSUhEUgAAAAUAB"  
  }
]);

print(" MongoDB has been initialized with sample data in 'itemImages.");
