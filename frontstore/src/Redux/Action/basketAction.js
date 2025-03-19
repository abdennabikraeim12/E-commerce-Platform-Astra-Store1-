import { moveToCart } from "../slices/basketSlice";
import { addProduct } from "../slices/cartSlice";


export const moveProductToCart = (product) => (dispatch) => {
  dispatch(moveToCart({ uniqueId: product.uniqueId })); // Retirer le produit du panier
  dispatch(addProduct({ ...product, quantity: 1 })); // Ajouter le produit au panier d'achat
};