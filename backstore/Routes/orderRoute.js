const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../Controllers/orderController');

const { protect, restrictTo } = require('../Middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get(
  '/checkout-session/:cartId',
  restrictTo('user'),
  checkoutSession
);

router.route('/:cartId').post(restrictTo('user'), createCashOrder);
router.get(
  '/',
  restrictTo('user', 'admin', 'superadmin'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  restrictTo('admin', 'superadmin'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  restrictTo('admin', 'superadmin'),
  updateOrderToDelivered
);

module.exports = router;