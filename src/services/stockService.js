import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/stocks';

// Get all stocks
export const getAllStocks = async () => {
    return await axios.get(BASE_URL);
};

// Get stock by ID
export const getStockById = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
};

// Add a new stock
export const addStock = async (stock) => {
    return await axios.post(BASE_URL, stock);
};

// Update a stock
export const updateStock = async (id, updatedStock) => {
    return await axios.put(`${BASE_URL}/${id}`, updatedStock);
};

// Delete a stock
export const deleteStock = async (id) => {
    return await axios.delete(`${BASE_URL}/${id}`);
};
