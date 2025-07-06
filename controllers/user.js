const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderForgotPasswordForm = (req, res) => {
    res.render("users/forgot-password");
};

module.exports.forgotPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/login");
      }
      
      // Generate a random token
      const token = crypto.randomBytes(32).toString("hex");
      user.resetToken = token;
      user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
      
      // Send reset password email
      const resetUrl = `http://localhost:8080/reset-password/${token}`;
      await sendEmail(user.email, "Reset Password", `Click the link to reset your password: ${resetUrl}`);
      
      req.flash("success", "Password reset email sent");
      res.redirect("/login");
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      req.flash("error", "Failed to send reset password email");
      res.redirect("/forgot-password");
    }
  };

module.exports.renderResetPasswordForm = (req, res) => {
    const { token } = req.params;
    res.render("users/reset-password", { token });
  };

module.exports.resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
      if (!user) {
        req.flash("error", "Invalid or expired token");
        return res.redirect("/login");
      }
      
      const { password } = req.body;
      user.password = password;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();
      
      req.flash("success", "Password reset successfully");
      res.redirect("/login");
    } catch (error) {
      console.error("Error in resetPassword:", error);
      req.flash("error", "Failed to reset password");
      res.redirect("/reset-password");
    }
  };

module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
            if(err) next(err);
            req.flash("success","Welcome to foundINN");
            res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = async(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome to foundINN");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err) {
            next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/login");
    })
};

