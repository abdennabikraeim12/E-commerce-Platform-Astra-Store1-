const PriceTab = ({ formData, handleInputChange }) => {
  return (
    <div className="tab-pane fade show active" id="price" role="tabpanel" aria-labelledby="price-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Price ($)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
        price After Discount ($)
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="priceAfterDiscount"
            value={formData.priceAfterDiscount}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceTab;