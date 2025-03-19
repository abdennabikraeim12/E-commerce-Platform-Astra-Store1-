import { useSelector } from "react-redux";
import { NumericFormat as NumberFormat } from "react-number-format";
import "./cart.css";
import { selectCartItems, selectCartTotal } from "../../Redux/slices/cartSlice";

function Cart() {
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  console.log("Cart State:", cart); // Debug the cart state
  console.log("Total:", total); // Debug the total

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.uniqueId} className="cart__item">
              <img src={item.imageCover} alt={item.title} />
              <div className="cart__itemInfo">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Price after discount: ${item.priceAfterDiscount}</p>
                <p>Rating: {item.rating}</p>
                <p>ID: {item.uniqueId}</p>
              </div>
            </div>
          ))}
          <div className="cart__total">
            <NumberFormat
              value={total}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              renderText={(value) => <h3>Total: {value}</h3>}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;