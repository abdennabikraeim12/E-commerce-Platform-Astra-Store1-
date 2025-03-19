const express = require('express');
const { protect, restrictTo } = require('../Middleware/authMiddleware');
const { uploadReviewImage,processReviewImage, createReview, getReviewById, deleteReview, updateReview, getAllReview } = require('../Controllers/reviewController');

const router = express.Router();

router.get('/:id', protect, getReviewById);
router.get('/', protect, getAllReview);

router.post(
  '/create-review',
  protect, 
  uploadReviewImage, 
  processReviewImage,
  createReview 
);
router.put(
  '/update-review/:id',
  protect, 
  uploadReviewImage,processReviewImage, 
  updateReview 
);
  router.delete('/:id',protect,deleteReview);


module.exports = router;