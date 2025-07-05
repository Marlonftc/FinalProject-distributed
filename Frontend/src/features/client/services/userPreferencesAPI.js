const API_URL = 'http://localhost:3009/api/settings'; // cambia por nginx si lo usas

export async function getUserSettings(userId) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch settings');
  return await res.json();
}

export async function updateUserSettings(userId, settings) {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return await res.json();
}
