// client/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: async (username, email, firstName, lastName, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Registration failed" }));
        const errorMessage = errorData.detail || errorData.message || "Registration failed. Please try again.";
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  },

  login: (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .catch((error) => {
        console.error("Login Error:", error);
        throw error;
      });
  },
};

// Products API calls
export const productsAPI = {
  getAll: () => fetchAPI("/products"),
  getById: (id) => fetchAPI(`/products/${id}`),
  create: (product) =>
    fetchAPI("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),
  update: (id, product) =>
    fetchAPI(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),
  delete: (id) =>
    fetchAPI(`/products/${id}`, {
      method: "DELETE",
    }),
};

// Cart API calls
export const cartAPI = {
  getCart: () => fetchAPI("/cart"),
  addItem: (productId, quantity = 1) =>
    fetchAPI("/cart/add", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    }),
  updateItem: (itemId, quantity) =>
    fetchAPI(`/cart/update/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity,
      }),
    }),
  removeItem: (itemId) =>
    fetchAPI(`/cart/remove/${itemId}`, {
      method: "DELETE",
    }),
};

export default fetchAPI;
