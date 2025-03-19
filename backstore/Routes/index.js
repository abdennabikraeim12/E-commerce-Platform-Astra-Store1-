
const userRoute = require('./userRoute');
const authRoute = require('./auth');
const stepe1Routes = require('./stepeRoutes')
const stepe2Routes = require('./stepeRoutes')
const stepe3Routes = require('./stepeRoutes')
const customization = require('./customizationRoute')
const reviewUser = require('./reviewRoute')
const product = require('./productRoute')
const categories = require('./categoryRoute')
const subCategoryRoute = require('./subCategoryRoute');
const brandRoute = require('./brandRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');
const couponRoute = require('./couponRoute');



const mountRoutes = (app) => {
 
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/step1',stepe1Routes)
  app.use('/api/v1/step2',stepe2Routes)
  app.use('/api/v1/step3',stepe3Routes)
  app.use('/api/v1/customization', customization);
  app.use('/api/v1/review',reviewUser)
  app.use('/api/v1/products',product)
  app.use('/api/v1/categories',categories)
  app.use('/api/v1/subcategories', subCategoryRoute);
  app.use('/api/v1/brands', brandRoute);
  app.use('/api/v1/cart', cartRoute);
  app.use('/api/v1/orders', orderRoute);
  app.use('/api/v1/coupons', couponRoute);


};

module.exports = mountRoutes;