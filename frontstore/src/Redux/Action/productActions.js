import apiRequest from "../../componnent/axios/axiosInstance";
import { 
  getProductStart, getProductSuccess, getProductFailure, 
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure
} from "../slices/productSlice.js";

// **Filtrer les produits**
export const filterProducts = (filters, page = 1) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await apiRequest.get("/products", {
      params: {
        'price[gte]': filters.minPrice,
        'price[lte]': filters.maxPrice,
        category: filters.categories.length > 0 ? filters.categories.join(',') : undefined, 
        page, 
      },
    });
    console.log('Full API Filter Request URL:', response.config.url);
    console.log('API Filter Response:', response.data);
    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.error("Error filtering products:", error);
  }
};

// **Récupérer tous les produits**
export const fetchProducts = (page = 1) => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await apiRequest.get("/products", {
      params: { page }, 
    });
    console.log('Full API Fetch Request URL:', res.config.url);
    console.log('API Fetch Response:', res.data);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
    console.log(error);
  }
};

// **Ajouter un produit**
export const addProduct = (productData) => async (dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await apiRequest.post("/products", productData);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
    console.log(error);
  }
};

// **Mettre à jour un produit**
export const updateProduct = (id, updatedData) => async (dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await apiRequest.put(`/products/${id}`, updatedData);
    dispatch(updateProductSuccess({ id, product: res.data }));
  } catch (error) {
    dispatch(updateProductFailure());
    console.log(error);
  }
};

// **Supprimer un produit**
export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    await apiRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
    console.log(error);
  }
};
