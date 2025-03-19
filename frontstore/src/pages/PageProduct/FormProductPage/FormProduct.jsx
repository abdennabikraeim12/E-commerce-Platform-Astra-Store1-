import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../componnent/Header/headerprofil";
import SideBar from "../../../componnent/SideBare/sideBare";
import DetailProduct from "./FormComponent/detailProduct";
import { useNavigate, useParams } from "react-router-dom";
import GeneralInfo from "./FormComponent/generalInfo";
import ImageForm from "./FormComponent/imageForm";
import { addProduct, deleteProduct, updateProduct } from "../../../Redux/Action/productActions";

function FormProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEditMode = !!id;

  const productToEdit = Array.isArray(products) ? products.find((product) => product._id === id) : null;

  const [formData, setFormData] = useState(
    productToEdit || {
      title: "",
      description: "",
      price: 0,
      priceAfterDiscount: 0,
      sku: "",
      stockStatus: "in-stock",
      dimensions: { length: 0, width: 0, height: 0 },
      shippingClass: "no-shipping-class",
      sizes: [],
      colors: [],
      images: [],
      imageCover: "",
      purchaseNote: "",
      menuOrder: 0,
      quantity: 0,
      ratingsQuantity: 0,
      ratingsAverage: 0,
      category: "",
    }
  );

  const [inputSizes, setInputSizes] = useState("");
  const [inputColors, setInputColors] = useState("");

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "sizes") {
      setInputSizes(value); 
    } else if (name === "colors") {
      setInputColors(value); 
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    if (name === "sizes") {
      const newSizes = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""); 
      setFormData((prev) => ({
        ...prev,
        sizes: [...new Set([...prev.sizes, ...newSizes])], 
      }));
      setInputSizes("");
    } else if (name === "colors") {
      const newColors = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""); 
      setFormData((prev) => ({
        ...prev,
        colors: [...new Set([...prev.colors, ...newColors])], 
      }));
      setInputColors(""); 
    }
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [child]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      if (key === "dimensions") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else if (key === "imageCover" || key === "images") {
        if (key === "imageCover") {
          formDataToSend.append(key, formData[key]); 
        } else {
          formData[key].forEach((file) => {
            formDataToSend.append(key, file); 
          });
        }
      } else {
        formDataToSend.append(key, formData[key]); 
      }
    }
  
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    if (isEditMode) {
      dispatch(updateProduct(id, formDataToSend))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Update failed:", error));
    } else {
      dispatch(addProduct(formDataToSend))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Add failed:", error));
    }
  };

  const handleDelete = () => {
    if (isEditMode) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Delete failed:", error));
    }
  };

  return (
    <section className="body">
      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>

        <section role="main" className="content-body content-body-modern mt-0">
          <header className="page-header page-header-left-inline-breadcrumb">
            <h2 className="font-weight-bold text-6">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>eCommerce</span>
                </li>
                <li>
                  <span>Products</span>
                </li>
              </ol>
            </div>
          </header>
          <form
            className="ecommerce-form action-buttons-fixed"
            onSubmit={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <GeneralInfo formData={formData} handleInputChange={handleInputChange} />
            <ImageForm formData={formData} handleInputChange={handleInputChange} />
            <DetailProduct
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
              inputSizes={inputSizes}
              inputColors={inputColors}
              handleInputBlur={handleInputBlur}
            />

            <div className="row action-buttons">
              <div className="col-12 col-md-auto">
                <button
                  type="submit"
                  className="submit-button btn btn-primary btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                >
                  <i className="bx bx-save text-4 me-2" />{" "}
                  {isEditMode ? "Update Product" : "Save Product"}
                </button>
              </div>
              <div className="col-12 col-md-auto px-md-0 mt-3 mt-md-0">
                <a
                  href="/ListProducts"
                  className="cancel-button btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
                >
                  Cancel
                </a>
              </div>
              {isEditMode && (
                <div className="col-12 col-md-auto ms-md-auto mt-3 mt-md-0 ms-auto">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="delete-button btn btn-danger btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                  >
                    <i className="bx bx-trash text-4 me-2" /> Delete Product
                  </button>
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}

export default FormProducts;