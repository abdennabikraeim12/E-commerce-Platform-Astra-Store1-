import { useState } from "react";
import { motion } from "framer-motion";
import ShopDetails from "../HomeProductPage/ComponentPage/shopDetails";
import "./cardPrincipal.css";
import { useDispatch } from "react-redux";

function CardPrincipal({ products }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };
  const addToBasket = (product) => {
    return {
      type: "basket/addToBasket",
      payload: {
        ...product,
        uniqueId: `${product._id}-${Date.now()}`, 
      },
    };
  };
  const handleAddToCart = (product) => {
    dispatch(addToBasket(product)); 
  };

  return (
    <div className="products-list-container">
      <div className="row row-gutter-sm">
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="col-sm-6 col-xl-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card card-modern card-modern-alt-padding">
                <div className="card-body bg-light">
                  <div className="image-frame mb-2">
                    <div className="image-frame-wrapper" >
                      <a href="#" >
                        <img style={{borderRadius:"10px"}} src={product.imageCover} className="img-fluid" alt="img" />
                      </a>
                    </div>
                  </div>
                  
                  <h4 className="text-4 line-height-2 mt-0 mb-2">
                    <a href="#" className="ecommerce-sidebar-link text-color-dark text-color-hover-primary text-decoration-none">
                      {product.title}
                    </a>
                  </h4>
                  <div className="stars-wrapper">
                    {"⭐".repeat(product.ratingsAverage)}
                  </div>
                  <div className="product-price">
                    <div className="regular-price on-sale">${product.priceAfterDiscount}</div>
                    <div className="sale-price">${product.price}</div>
                  </div>
                  <small>
                    <a href="#" className="ecommerce-sidebar-link text-color-grey text-color-hover-primary text-decoration-none">
                      {product.description}
                    </a>
                  </small>
                  <div className="card-footer d-flex border mt-4 p-3">
                    <button onClick={() => handleViewDetails(product)} className="btn  btn-sm  view-detail-btn" style={{ marginLeft: "2px" ,height:"70px",width:"80px" }}>
                      <i className="fas fa-eye text-white me-1" /> View Detail
                    </button>
                    <button onClick={() => handleAddToCart(product)} className="btn col-sm-5 btn-sm p-2 add-to-cart-btn" style={{marginLeft: "20px" ,height:"70px",width:"70px" }}>
                      <i className="fas fa-shopping-cart me-1" /> Add To basket
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>

      {showDetails && (
        <div className={`details-container ${showDetails ? "show" : ""}`} style={{marginTop:"30rem"}}>
          <ShopDetails product={selectedProduct} />
          <button onClick={handleCloseDetails} className="details-close-btn">
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}

export default CardPrincipal;

