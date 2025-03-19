// ReviewComponent.js
import { useState } from "react";

const ReviewComponent = () => {
  const [review, setReview] = useState({
    username: '',
    email: '',
    rating: 0,
    description: '',
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', review);
    setReview({
      username: '',
      email: '',
      rating: 0,
      description: '',
    });
  };

  return (
    <div className="review-component">
      <h4 className="mb-4">1 review for Colorful Stylish Shirt</h4>
      <div className="media mb-4">
        <img src="img/abdou.png" alt="User" className="img-fluid mr-3 mt-1" style={{ width: 45 }} />
        <div className="media-body">
          <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
          <div className="text-primary mb-2">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
            <i className="far fa-star" />
          </div>
          <p>Diam amet duo labore stet elitr...</p>
        </div>
      </div>

      <h4 className="mb-4">Leave a review</h4>
      <small>Your email address will not be published. Required fields are marked *</small>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <p className="mb-0 mr-2">Your Rating * :</p>
          <div className="text-primary">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`far fa-star ${review.rating >= star ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Your Review *</label>
          <textarea
            id="description"
            name="description"
            cols={30}
            rows={5}
            className="form-control"
            value={review.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Your Name *</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            value={review.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={review.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-0">
          <input
            type="submit"
            value="Leave Your Review"
            className="btn btn-primary px-3"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewComponent;