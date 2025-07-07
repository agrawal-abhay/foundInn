const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router
  .route("/forgot-password")
  .get(userController.renderForgotPasswordForm)
  .post(wrapAsync(userController.forgotPassword));

router
  .route("/reset-password/:token")
  .get(userController.renderResetPasswordForm)
  .post(wrapAsync(userController.resetPassword));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}) ,
    userController.login);
    
router.get("/logout",userController.logout);

// router.get('/create-superadmin', async (req, res) => {
//   const admin = new User({ username: 'superadmin', email: 'admin@example.com', role: 'superadmin' });
//   await User.register(admin, 'admin123');
//   res.send("✅ Superadmin created!");
// });

module.exports = router; 