import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../componnent/pagination/pagination";
import CardCategorie from "../../cardProduct/cardCategorie";
import CardFilter from "../../cardProduct/cardFilter";
import CardSize from "../../cardProduct/cardSize";
import CardBrand from "../../cardProduct/cardBrand";
import CardPrincipal from "../../cardProduct/cardPrincipal";
import "./list.css";
import { fetchProducts, filterProducts } from "../../../../Redux/Action/productActions";

function ListProduct() {
  const dispatch = useDispatch();
  const { products, filteredProducts, isFetching, error, pagination } = useSelector((state) => state.product);

  const [page, setPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState(null); 

  const state = useSelector((state) => state);
  console.log('Redux State:', state);

  useEffect(() => {
    if (currentFilters) {
      dispatch(filterProducts(currentFilters, page));
    } else {
      dispatch(fetchProducts(page));
    }
  }, [dispatch, page, currentFilters]);

  const handleFilter = (filters, newPage) => {
    setCurrentFilters(filters); 
    setPage(newPage); 
  };
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading products. Please try again.</div>;
  }

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <section role="main" className="container-fluid content-body content-body-modern mt-0">
      <div className="row justify-content-center justify-content-sm-between pt-2">
        <div className="col-sm-auto text-center mb-4 mb-sm-0 mt-2 mt-sm-0">
          <a className="ecommerce-sidebar-link btn btn-primary btn-md font-weight-semibold btn-py-2 px-4">
            Products
          </a>
        </div>
      </div>

      <div className="row row-gutter-sm mb-5">
        <div className="col-lg-2-5 col-xl-1-5 mb-4 mb-lg-0">
          <div className="filters-sidebar-wrapper bg-light rounded">
            <CardCategorie />
            <hr className="solid opacity-7" />
            <CardFilter onFilter={handleFilter} />
            <hr className="solid opacity-7" />
            <CardSize />
            <hr className="solid opacity-7" />
            <CardBrand />
          </div>
        </div>
        <div className="col-lg-9 col-xl-9" style={{ marginRight: "30px", width: "75%" }}>
          <div style={{ margin: "10px" }}>
            {/* Display filtered products or all products */}
            {displayProducts.length === 0 ? (
              <div>No products match your filters. Try adjusting your criteria.</div>
            ) : (
              <CardPrincipal products={displayProducts} />
            )}
          </div>

          <div style={{ marginTop: "100px" }}>
            <Pagination pagination={pagination} setPage={setPage} results={pagination.results} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListProduct;


