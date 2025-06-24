# Create Item Service
#  UpdateItem Microservice

Este microservicio permite actualizar un ítem existente del inventario, como carpas, mesas o sillas, en el sistema de reservas para eventos.

##  Funcionalidades

-  Actualizar nombre, descripción, cantidad, precio y tipo de un ítem dado su ID.

##  Stack Tecnológico

- Lenguaje: **Java 17**
- Framework: **Spring Boot**
- Base de datos: **MySQL**
- ORM: **Spring Data JPA**
- Contenedor: **Docker**

##  Endpoints

| Método | URL                       | Descripción                  |
|--------|---------------------------|------------------------------|
| PUT    | `/api/items/{id}`         | Actualiza un ítem existente  |

Ejemplo de JSON para actualización:

```json
{
  "name": "Carpa grande",
  "description": "Carpa resistente al agua",
  "quantity": 5,
  "price": 100.00,
  "type": "Carpa"
}
