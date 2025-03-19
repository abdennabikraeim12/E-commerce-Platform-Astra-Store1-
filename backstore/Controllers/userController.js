
const factory = require('./handlerFactories');
const bcrypt = require('bcrypt');

const { 
  uploadSingleImage, 
  handleSingleImageUpload,
  handleMixOfImageUploads,
  uploadMixOfImages, 
} = require('../Middleware/uploadImageMiddleware');
const userModel = require('../Models/user');
const ApiError = require('../utils/apiError');
const expressAsyncHandler = require('express-async-handler');

// Middleware to upload and handle a single user image
exports.uploadUserImage = uploadSingleImage('profileImg'); 
exports.processUserImage = handleSingleImageUpload('profileImg');


// Example fields configuration
const fieldsConfig = [
  { name: 'profileImg', maxCount: 1, entityType: 'users' },
  { name: 'images', maxCount: 5, entityType: 'users' },
];
// Middleware usage in routes
exports.uploadUsersImages =( [
  uploadMixOfImages(fieldsConfig),
  handleMixOfImageUploads(fieldsConfig),
]);
// @desc Get list of users
// @route GET /api/v1/users
// @access private
exports.getUser = factory.getAll(userModel);

// @desc Get specific user by ID
// @route GET /api/v1/users/:id
// @access private
exports.getUserById = factory.getOne(userModel);

// @desc Create user
// @route POST /api/v1/users
// @access private
exports.createUser = factory.createOne(userModel);

// @desc Update user
// @route PUT /api/v1/users/:id
// @access private (Admin)
exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg, 
      role: req.body.role,
    },
    { new: true }
  );

  if (!document) {
    return next(new ApiError(`No user found with this ID: ${req.params.id}`, 404));
  }

  res.status(200).json({ data: document });
});

// @desc Change user password
// @route PUT /api/v1/users/changeUserPassword/:id
// @access private (Admin)
exports.changeUserPassword = expressAsyncHandler(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: hashedPassword,
      passwordChangeAt: Date.now(),
    },
    { new: true }
  );
  if (!document) {
    return next(new ApiError(`No user found with this ID: ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access private (Admin)
exports.deleteUser = factory.deleteOne(userModel);



// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = expressAsyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = expressAsyncHandler(async (req, res, next) => {
  const { password } = req.body;

  // 1. Vérifiez si le mot de passe est fourni
  if (!password) {
    return next(new ApiError("Password is required", 400));
  }
  // 2. Vérifiez la force du mot de passe (facultatif)
  if (password.length < 6) {
    return next(new ApiError("Password must be at least 6 characters long", 400));
  }
  // 3. Hachez le mot de passe
  const saltRounds = 12; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 4. Mettez à jour l'utilisateur
  const userId = req.user.id; 
  const document = await userModel.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
      passwordChangeAt: Date.now(),
    },
    { new: true, runValidators: true }
  );
  // 5. Vérifiez si l'utilisateur existe
  if (!document) {
    return next(new ApiError(`No user found with this ID: ${userId}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "Password updated successfully",
      user: document,
    },
  });
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect
exports.updateLoggedUserData = expressAsyncHandler(async (req, res, next) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileImg:req.body.profileImg,
      addresseProfil: req.body.addresseProfil,
      Projects:req.body.Projects,
      descriptionOfproject: req.body.descriptionOfproject,
      language:req.body.Language,
      about:req.body.about
    },
    { new: true }
  );
  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = expressAsyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({data:user, status: 'Success' });
});
