import axios from "axios";

export const loadProductsApi = async () => 
await axios.get("http://localhost:3001/api/version1/products")