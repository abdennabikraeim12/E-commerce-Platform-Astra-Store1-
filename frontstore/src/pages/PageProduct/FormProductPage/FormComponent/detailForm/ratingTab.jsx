
const RatingTab = ({ formData, handleInputChange }) => {
  return (
    <div className="tab-pane fade" id="rating" role="tabpanel" aria-labelledby="rating-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Ratings Quantity
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="ratingsQuantity"
            value={formData.ratingsQuantity}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Ratings Average
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="ratingsAverage"
            value={formData.ratingsAverage}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingTab;