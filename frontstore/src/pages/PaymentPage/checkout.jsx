import { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./chekout.css";
import Upsell from "../../componnent/ProductSuggestions/upsell";
import CrossSell from '../../componnent/ProductSuggestions/crossSell';
import Header from '../../componnent/Header/headerprofil';
import { FormContext } from '../../componnent/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems } from '../../Redux/slices/basketSlice'; 
import Subtotal from './subtotal';
import Cart from '../Cart/cart';

function Checkout() {
  const { currentUser } = useContext(FormContext);
  const { email, profileImg } = currentUser.data;

  const location = useLocation();
  // Récupère le produit passé depuis Upsell ou CardPrincipal
  const product = location.state?.product; 
  const [showUpsell, setShowUpsell] = useState(false);
  const [showCrosSell, setShowCrosSell] = useState(false);

  const basket = useSelector(selectBasketItems);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const upsellTimer = setTimeout(() => {
      setShowUpsell(true);
    }, 3000);

    const crossSellTimer = setTimeout(() => {
      setShowCrosSell(true);
    }, 6000);

    return () => {
      clearTimeout(upsellTimer);
      clearTimeout(crossSellTimer);
    };
  }, []);

  const handleCloseUpsell = () => {
    setShowUpsell(false);
  };

  const handleCloseCrossSell = () => {
    setShowCrosSell(false);
  };
  const removeFromBasket = (uniqueId) => {
    return {
      type: "basket/removeFromBasket",
      payload: uniqueId,
    };
  };
  return (
    <div className="checkout-container">
      <Header />
      <div className="checkout-product-details">
        <img className="checkout-ad" src={profileImg || "img/avatar.jpg"} alt='img' />
        <h3>Hello, <div style={{ color: "#f6bc2a" }}>{email}</div></h3>
        <h2 style={{ color: "#424344" }}>Your shopping Basket:</h2>

        {basket.length > 0 ? (
          
          <>
            {basket.map((item) => (
              <div key={item._id} className="checkout-item">
                <img src={item.imageCover} alt={item.title} className="checkout-product-image" />
                <h3>{item.title}</h3>
                <p>stockStatus  : {item.price}</p>
                <p>price : {item.price}</p>
                <p>priceAfterDiscount : {item.priceAfterDiscount}</p>
                <p>rating : {"⭐".repeat(item.ratingsAverage)}</p>
                <button onClick={() => dispatch(removeFromBasket(item.uniqueId))}>Remove from basket</button>
                </div>
            ))}
          </>
        ) : (
          <p>Aucun produit sélectionné.</p>
        )}
        
      </div>
      <div >
      </div>
      <Subtotal className='subtotal'/>
      <Cart/>

      {/* Afficher Upsell et CrossSell si le produit est disponible */}
      <div className="upSell">
        {showUpsell && product && <Upsell productId={product._id} onClose={handleCloseUpsell} />}
      </div>
      <div className="CrosSell">
        {showCrosSell && product && <CrossSell productId={product._id} onClose={handleCloseCrossSell} />}
      </div>
    </div>
  );
}

export default Checkout;
