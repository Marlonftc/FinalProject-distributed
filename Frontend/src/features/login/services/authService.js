// src/features/login/services/authService.js

export const loginUser = async (credentials) => {
  try {
    const response = await fetch("http://localhost:3005/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data; // Retornamos el objeto con el token
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  const response = await fetch("http://localhost:3005/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error en el registro");
  }

  return await response.json();
};
