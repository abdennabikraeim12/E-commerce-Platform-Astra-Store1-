import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  isFetching: false,
  error: false,
  pagination: {
    currentPage: 1,
    numberOfPages: 1,
    results: 0,
    next: null,
    prev: null,
  },
};

const setLoading = (state) => {
  state.isFetching = true;
  state.error = false;
};

const setError = (state) => {
  state.isFetching = false;
  state.error = true;
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // GET ALL PRODUCTS
    getProductStart: setLoading,
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.data || []; 
      state.filteredProducts = action.payload.data || []; 
      state.pagination = {
        currentPage: action.payload.paginationResult?.currentPage || 1,
        numberOfPages: action.payload.paginationResult?.numberOfPages || 1,
        results: action.payload.results || 0,
        next: action.payload.paginationResult?.next || null,
        prev: action.payload.paginationResult?.prev || null,
      };
    },
    getProductFailure: setError,

    // DELETE PRODUCT
    deleteProductStart: setLoading,
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.filter((item) => item._id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter((item) => item._id !== action.payload);
    },
    deleteProductFailure: setError,

    // UPDATE PRODUCT
    updateProductStart: setLoading,
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.map((item) =>
        item._id === action.payload.id ? action.payload.product : item
      );
      state.filteredProducts = state.filteredProducts.map((item) =>
        item._id === action.payload.id ? action.payload.product : item
      );
    },    
    updateProductFailure: setError,

    // ADD PRODUCT
    addProductStart: setLoading,
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    addProductFailure: setError,
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
