// src/features/login/services/userPreferencesAPI.js

const API_BASE_URL = "http://localhost:3009/api/settings"; // Ajusta el puerto si es diferente

export async function getUserSettings(userId) {
  const res = await fetch(`${API_BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Error getting user settings");
  return await res.json();
}

export async function updateUserSettings(userId, settings) {
  const res = await fetch(`${API_BASE_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error("Error updating user settings");
  return await res.json();
}
