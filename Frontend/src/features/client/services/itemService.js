// src/features/client/services/itemService.js
export const fetchItems = async () => {
  const response = await fetch("http://localhost:8083/api/items");
  if (!response.ok) throw new Error("Error al obtener ítems");
  return response.json();
};
