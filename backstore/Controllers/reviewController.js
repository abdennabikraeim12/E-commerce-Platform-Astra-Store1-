const { uploadSingleImage, handleSingleImageUpload } = require("../Middleware/uploadImageMiddleware");
const Review = require("../Models/ReviewUser/reviewUser");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const userModel = require("../Models/user");
const factory = require("../Controllers/handlerFactories");

// Middleware to upload and handle a single review image
exports.uploadReviewImage = uploadSingleImage('image'); 
exports.processReviewImage = handleSingleImageUpload('image');

// @desc    Create a Review
// @route   POST /api/v1/review/create-review
// @access  Public
exports.createReview = asyncHandler(async (req, res, next) => {
  const { message,image } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
  }
  const newReview = await Review.create({
    message,
    user: userId,
    image: image || null,
    });

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    review: newReview,
  });
});

// @desc Get specific review by ID
// @route GET /api/v1/review/:id
// @access Public
exports.getReviewById = factory.getOne(Review);

// @desc Get specific review by ID
// @route GET /api/v1/review/:id
// @access Public
exports.getAllReview = factory.getAll(Review);
// @desc Delete a Review
// @route DELETE /api/v1/review/:id
// @access Public
exports.deleteReview = factory.deleteOne(Review);

// @desc    Mettre à jour une Review
// @route   PUT /api/v1/review/update-review/:id
// @access  Public
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { message, image } = req.body;
  const userId = req.user?.id;
  const reviewId = req.params.id;

  if (!userId) {
    return next(new ApiError("Accès interdit, utilisateur non identifié.", 401));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ApiError("Review non trouvée", 404));
  }

  if (review.user.toString() !== userId) {
    return next(new ApiError("Vous ne pouvez pas modifier cette review", 403));
  }

  review.message = message || review.message;
  review.image = image || review.image;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review mise à jour avec succès",
    review,
  });
});

