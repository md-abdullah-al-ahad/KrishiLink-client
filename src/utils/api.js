const API_URL = import.meta.env.VITE_API_URL;

export const saveUserToDatabase = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to save user to database");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const updateUserInDatabase = async (email, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user in database");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserFromDatabase = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/${email}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user from database");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
