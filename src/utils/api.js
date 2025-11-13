import toast from "react-hot-toast";
import { API_BASE_URL } from "../config/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    toast.error(error.message || "Failed to create user");
    throw error;
  }
};

export const getAllCrops = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops`);
    const data = await handleResponse(response);
    return data || [];
  } catch (error) {
    console.error("Failed to fetch crops:", error);
    return [];
  }
};

export const getLatestCrops = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops/latest`);
    const data = await handleResponse(response);
    return data || [];
  } catch (error) {
    console.error("Failed to fetch latest crops:", error);
    return [];
  }
};

export const getCropById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops/${id}`);
    return await handleResponse(response);
  } catch (error) {
    toast.error(error.message || "Failed to fetch crop details");
    throw error;
  }
};

export const createCrop = async (cropData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cropData),
    });
    const result = await handleResponse(response);
    toast.success("Crop created successfully!");
    return result;
  } catch (error) {
    toast.error(error.message || "Failed to create crop");
    throw error;
  }
};

export const getMyCrops = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-crops/${email}`);
    return await handleResponse(response);
  } catch (error) {
    toast.error(error.message || "Failed to fetch your crops");
    throw error;
  }
};

export const updateCrop = async (id, cropData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cropData),
    });
    const result = await handleResponse(response);
    toast.success("Crop updated successfully!");
    return result;
  } catch (error) {
    toast.error(error.message || "Failed to update crop");
    throw error;
  }
};

export const deleteCrop = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crops/${id}`, {
      method: "DELETE",
    });
    const result = await handleResponse(response);
    toast.success("Crop deleted successfully!");
    return result;
  } catch (error) {
    toast.error(error.message || "Failed to delete crop");
    throw error;
  }
};

export const expressInterest = async (interestData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interestData),
    });
    const result = await handleResponse(response);
    toast.success("Interest expressed successfully!");
    return result;
  } catch (error) {
    toast.error(error.message || "Failed to express interest");
    throw error;
  }
};

export const getMyInterests = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/my-interests/${email}`);
    return await handleResponse(response);
  } catch (error) {
    toast.error(error.message || "Failed to fetch your interests");
    throw error;
  }
};

export const updateInterestStatus = async (
  interestId,
  cropId,
  status,
  quantity = 0
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interests/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interestId, cropId, status, quantity }),
    });
    const result = await handleResponse(response);

    if (status === "accepted") {
      toast.success(
        `Interest accepted! Crop quantity reduced by ${quantity} units.`,
        {
          duration: 4000,
        }
      );
    } else if (status === "rejected") {
      toast.error("Interest rejected.", {
        duration: 3000,
      });
    } else {
      toast.success("Interest status updated successfully!");
    }

    return result;
  } catch (error) {
    toast.error(error.message || "Failed to update interest status");
    throw error;
  }
};

export const saveUserToDatabase = createUser;
