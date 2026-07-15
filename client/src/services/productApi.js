const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchProducts = async (query, signal) => {
  const response = await fetch(`${API_BASE_URL}/products${query}`, { signal });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || 'Unable to load products. Please try again.');
  }

  return response.json();
};

export const fetchFilterMetadata = async (signal) => {
  const response = await fetch(`${API_BASE_URL}/products/filters`, { signal });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || 'Unable to load filters.');
  }

  return response.json();
};
