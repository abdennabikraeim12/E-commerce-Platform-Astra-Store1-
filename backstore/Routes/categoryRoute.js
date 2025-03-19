const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/ValidatorRules/categoryValidator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  processCategoryImage,
  getByNameCategories,
} = require('../Controllers/categoryController');


const subcategoriesRoute = require('./subCategoryRoute');
const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

// Nested route
router.use('/:categoryId/subcategories', subcategoriesRoute);
router.get('/name/:name', getByNameCategories);
router
  .route('/')
  .get(getCategories)
  // ajouter ces route pour post et put et delete  :   restrictTo('admin', 'superadmin'),
  .post(
    protect,
    uploadCategoryImage,
    processCategoryImage,
    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
   protect,
    uploadCategoryImage,
    processCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    protect,
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;