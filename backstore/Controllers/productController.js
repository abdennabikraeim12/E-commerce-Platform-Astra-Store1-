const factory = require('./handlerFactories');
const Product = require('../Models/productModel');
const { uploadMixOfImages, handleMixOfImageUploads } = require('../Middleware/uploadImageMiddleware');
const NodeCache = require("node-cache");
const ApiFeatures = require('../utils/apiFeatures');
const cache = new NodeCache({ stdTTL: 600 });
// Example fields configuration
const fieldsConfig = [
  { name: 'imageCover', maxCount: 1, entityType: 'products' },
  { name: 'images', maxCount: 5, entityType: 'products' },
];
// Middleware usage in routes
exports.uploadProductsImages =( [
  uploadMixOfImages(fieldsConfig),
  handleMixOfImageUploads(fieldsConfig),
]);
// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const countDocument = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search('products')
      .paginate(countDocument);

    const products = await apiFeatures.mongooseQuery;

    res.status(200).json({
      results: products.length,
      paginationResult: apiFeatures.paginationResult,
      data: products,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product, 'reviews');

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product)

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    // Récupérer les catégories liées automatiquement
    const relatedCategories = await Product.suggestRelatedCategories(category);
    const productData = {
      ...req.body,
      relatedCategories,
    };

    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);

// Fonction pour suggérer les produits en cross-sell et up-sell
exports.suggestUpsellsAndCrossSells = async (productId, categoryId) => {
  try {
    // Vérifier si les suggestions sont déjà en cache
    const cacheKey = `suggestions_${productId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    // Récupérer le produit principal
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Produit non trouvé");
    }
    if (!categoryId) return { upsells: [], crossSells: [] };
    const upsells = await Product.find({
      category: categoryId,
      price: { $gt: product.price },
    }).limit(5);

    const crossSells = await Product.find({
      category: { $in: product.relatedCategories || [] }, 
      price: { $lt: product.price },
    }).limit(5);

    // Sauvegarde dans le cache
    const suggestions = { upsells, crossSells };
    cache.set(cacheKey, suggestions);

    return suggestions;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des suggestions : ${error.message}`);
  }
};