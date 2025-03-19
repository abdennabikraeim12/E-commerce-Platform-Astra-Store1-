import { useEffect, useState } from "react";
import Footer from "../../../componnent/Footer/footer";
import Header from "../../../componnent/Header/headerprofil";
import CartShoping from "./ComponentPage/cartShoping";
import ListProduct from "./ComponentPage/listProduct";
import ShowReview from "./ComponentPage/showReview";

function HomeProduct() {
  const [productOptions, setProductOptions] = useState({});

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Product) {
      // Convertir les options sélectionnées en un objet productOptions
      const options = step3Data.formSelections.Product.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setProductOptions(options);
    }
  }, []);

  return (
    <div>
      <div className="body">
        {/* Afficher conditionnellement les composants selon les options */}
        {productOptions.Header && <Header />}
        <div role="main" className="main">
          <section className="section section-concept section-no-border section-dark section-angled section-angled-reverse border-top-0 pt-5 m-0">
            <div
              className="section-angled-layer-bottom bg-light"
              style={{ padding: "10px" }}
            />
            <div className="container pt-3 mt-2"></div>
          </section>

          {productOptions.ListProduct && <ListProduct />}
          {productOptions.CartShoping && <CartShoping />}
          {productOptions.showReviews && <ShowReview />}
        </div>
        {productOptions.footer && <Footer />}
      </div>
    </div>
  );
}

export default HomeProduct;

