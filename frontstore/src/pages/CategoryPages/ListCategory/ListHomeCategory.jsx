import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../componnent/pagination/pagination";
import CategoryTable from "./ComponentListCategories/categoryTable";
import FilterSection from "./ComponentListCategories/filterSection";
import "./listCategories.css";
import { fetchCategories } from "../../../Redux/Action/categoriesActions";

function ListHomeCategory() {
  const dispatch = useDispatch();
  const { categories, isFetching, error } = useSelector((state) => state.categories);

  const [page, setPage] = useState(1);
  const [pagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
    results: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, page]);

  return (
    <section role="main" className="content-body content-body-modern mt-0">
      <header className="page-header page-header-left-inline-breadcrumb">
        <h2 className="font-weight-bold text-6">Categories</h2>
        <div className="right-wrapper">
          <ol className="breadcrumbs">
            <li><span>Home</span></li>
            <li><span>eCommerce</span></li>
            <li><span>Categories</span></li>
          </ol>
        </div>
      </header>
      <div className="row">
        <div className="col">
          <div className="card card-modern">
            <div className="card-body">
              <div className="datatables-header-footer-wrapper mt-2">
                <div className="datatable-header">
                  <FilterSection />
                </div>
                {isFetching ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error fetching categories.</p>
                ) : (
                  <CategoryTable categories={categories} />
                )}
                <hr className="solid mt-5 opacity-4" />
                <div className="datatable-footer">
                  <div className="row align-items-center justify-content-between mt-3">
                   
                    <div className="col-lg-auto text-center order-3 order-lg-2">
                      <div className="results-info-wrapper" />
                    </div>
                    <Pagination pagination={pagination} setPage={setPage} results={pagination.results} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListHomeCategory;