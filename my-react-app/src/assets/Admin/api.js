import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

export const addProduct = async (formData) => {
  const res = await axios.post(`${BASE_URL}/add-product`, formData);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axios.post(
    "http://localhost:5000/api/orders/create-order",
    orderData
  );
  return res.data;
};