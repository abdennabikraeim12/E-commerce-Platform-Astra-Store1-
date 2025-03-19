import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], // Liste des produits dans le panier
    quantity: 0,  // Nombre total de produits dans le panier
    total: 0,     // Prix total du panier
  },
  reducers: {
    // Ajouter un produit au panier
    addProduct: (state, action) => {
      const newProduct = action.payload;

      // Vérifier si le produit existe déjà dans le panier
      const existingProduct = state.products.find((item) => item.uniqueId === newProduct.uniqueId);

      if (existingProduct) {
        // Si le produit existe déjà, augmenter la quantité
        existingProduct.quantity += newProduct.quantity || 1; // Utiliser une quantité par défaut de 1 si non spécifiée
      } else {
        // Sinon, ajouter le produit au panier
        state.products.push({ ...newProduct, quantity: newProduct.quantity || 1 });
      }

      // Mettre à jour la quantité totale et le prix total
      state.quantity += newProduct.quantity || 1;
      state.total += newProduct.price * (newProduct.quantity || 1);
    },

    // Supprimer un produit du panier
    removeProduct: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.products.find((item) => item.uniqueId === productId);

      if (removedProduct) {
        // Mettre à jour la quantité totale et le prix total
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;

        // Supprimer le produit du panier
        state.products = state.products.filter((item) => item.uniqueId !== productId);
      }
    },

    // Mettre à jour la quantité d'un produit dans le panier
    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.products.find((item) => item.uniqueId === productId);

      if (productToUpdate) {
        // Mettre à jour la quantité totale et le prix total
        state.quantity += newQuantity - productToUpdate.quantity;
        state.total += productToUpdate.price * (newQuantity - productToUpdate.quantity);

        // Mettre à jour la quantité du produit
        productToUpdate.quantity = newQuantity;
      }
    },

    // Vider le panier
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

// Export des sélecteurs
export const selectCartItems = (state) => state.cart?.products || [];
export const selectCartTotal = (state) =>
  (state.cart?.products || []).reduce((total, item) => total + item.price * item.quantity, 0);

// Export des actions
export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;