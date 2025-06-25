## CreateItemService

Microservice responsible for creating items in the inventory.

## Endpoints

### POST `/items`
Creates a new item.
- JSON Body:
```json
{
"name": "Large Tent",
"description": "6x6 meter white tent",
"quantity": 5.
"price": 120.50
}
