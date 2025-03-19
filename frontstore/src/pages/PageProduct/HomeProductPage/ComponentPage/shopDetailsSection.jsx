
const ProductDetailsSection = ({ product, quantity, onIncrease, onDecrease }) => {
  return (
    <div className="col-lg-7 pb-5">
      <h3 className="font-weight-semi-bold">{product.title}</h3>
      <div className="mb-5">
        <div className="stars-wrapper">
          {"⭐".repeat(product.ratingsAverage)}
        </div>
        <small className="pt-1">({(product.ratingsQuantity)} Reviews)</small>
      </div>

      {/* Prix et promotion */}
      <h3 style={{ fontSize: "30px" }}>
        {product.salePrice ? (
          <>
            <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>
              ${product.price}
            </span>
            ${product.salePrice}
          </>
        ) : (
          `$${product.price}`
        )}
      </h3>

      {/* Description du produit */}
      <p className="mb-4">{product.description}</p>

      {/* Statut du stock */}
      <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}>Stock Status:</strong>{" "}
          <span
            style={{
              color:
                product.stockStatus === "in-stock"
                  ? "green"
                  : product.stockStatus === "out-of-stock"
                  ? "red"
                  : "orange",
            }}
          >
            {product.stockStatus}
          </span>
        </p>
      </div>

      {/* Poids et dimensions */}
      <div className="mb-4 ">
        <p>
          <strong style={{color:"#566573"}}>Weight:</strong> {product.weight} kg
        </p>
        <p>
          <strong style={{color:"#566573"}}>Dimensions:</strong> {product.dimensions.length}cm (L) x{" "}
          {product.dimensions.width}cm (W) x {product.dimensions.height}cm (H)
        </p>
      </div>

      {/* Classe d'expédition */}
      <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}>Shipping Class:</strong> {product.shippingClass}
        </p>
      </div>
        {/* Classe d'expédition */}
        <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}> quantity available in stock:</strong> {product.quantity}
        </p>
      </div>

      {/* Attributs personnalisés */}
      {product.attributes?.length > 0 && (
        <div className="mb-4">
          <h4 style={{color:"#566573"}}> <strong>Attributes :</strong> </h4>
          {product.attributes.map((attr, index) => (
            <div key={index}>
              <strong >{attr.name}:</strong> {attr.values.join(", ")}
            </div>
          ))}
        </div>
      )}

      {/* Note d'achat */}
      {product.purchaseNote && (
        <div className="mb-4">
          <h4> <span style={{color:"#566573"}}> <strong>Purchase Note :</strong></span> {product.purchaseNote} </h4>
          
        </div>
      )}

      {/* Tailles disponibles */}
      <div className="size-container m-2">
        <p className="size-label text-dark font-weight-medium mb-0 mr-3"> <span style={{color:"#566573",fontWeight:"20px"}} ><strong>Sizes:</strong></span></p>
        <form className="size-form">
          {product?.sizes?.length > 0 ? (
            product.sizes.map((size, index) => (
              <div key={index} className="size-option">
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`size-${index}`}
                  name="size"
                />
                <label className="custom-control-label" htmlFor={`size-${index}`}>
                  {size}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No sizes available</p>
          )}
        </form>
      </div>

      {/* Couleurs disponibles */}
      <div className="size-container m-2">
        <p className="size-label text-dark font-weight-medium mb-0 mr-3" > <span style={{color:"#566573"}}><strong>Colors:</strong></span></p>
        <form className="size-form">
          {product?.colors?.length > 0 ? (
            product.colors.map((color, index) => (
              <div key={index} className="size-option">
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`color-${index}`}
                  name="color"
                />
                <label className="custom-control-label" htmlFor={`color-${index}`}>
                  {color}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No colors available</p>
          )}
        </form>
      </div>

      {/* Sélecteur de quantité */}
      <div className="d-flex align-items-center justify-content-between mb-4 pt-2">
        <div className="d-flex align-items-center p-2 rounded" style={{ width: 200 }}>
          <button className="btn btn-primary btn-minus" onClick={onDecrease}>
            <i className="fa fa-minus" />
          </button>
          <input
            type="text"
            className="form-control bg-secondary text-center mx-2 p-2"
            style={{ width: 50 }}
            value={quantity}
            readOnly
          />
          <button className="btn btn-primary btn-plus" style={{ marginLeft: "1px" }} onClick={onIncrease}>
            <i className="fa fa-plus" />
          </button>
        </div>
        <div>
          <button className="btn btn-primary" style={{ height: "60px", width: "100px" }}>
            <i className="fa fa-shopping-cart mr-1" /> Add To Cart
          </button>
        </div>
      </div>

      {/* Boutons de partage */}
      <div className="size-container m-2">
        <p className="text-dark font-weight-medium mb-0 mr-4">Share on:</p>
        <div className="d-inline-flex">
          <a className="text-dark px-2" href="https://www.facebook.com/">
            <i className="fab fa-facebook-f" />
          </a>
          <a className="text-dark px-2" href="https://x.com/">
            <i className="fab fa-twitter" />
          </a>
          <a className="text-dark px-2" href="https://fr.linkedin.com/">
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="text-dark px-2" href="https://fr.pinterest.com/">
            <i className="fab fa-pinterest" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;