# Create Item Service

Microservicio encargado de crear ítems en el inventario.

## Endpoints

### POST `/items`
Crea un nuevo ítem.
- Body JSON:
```json
{
  "name": "Carpa grande",
  "description": "Carpa blanca de 6x6 metros",
  "quantity": 5,
  "price": 120.50
}
