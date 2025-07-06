const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const {reviewSchema} = require("./schema.js");

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isSuperAdmin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'superadmin') {
      req.flash("error", "You do not have permission to perform this action.");
      return res.redirect("/listings");
    }
    next();
};

module.exports.isOwnerOrAdmin = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
  
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
  
    // Grant access if current user is either owner or superadmin
    if (listing.owner.equals(req.user._id) || req.user.role === "superadmin") {
      return next();
    }
  
    req.flash("error", "You are not authorized to perform this action.");
    res.redirect(`/listings/${id}`);
  };

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}; 

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You aren't owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthorOrAdmin = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);  

    if (!review) {
      req.flash("error", "Review not found.");
      return res.redirect("/listings");
    }  
    // Grant access if current user is either owner or superadmin
    if (review.author.equals(req.user._id) || req.user.role === "superadmin") {
      return next();
    }
  
    req.flash("error", "You are not authorized to perform this action.");
    res.redirect(`/listings/${id}/${reviewId}`);
  };

module.exports.isAuthor = async(req,res,next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You aren't author of this review");
        return res.redirect(`/listings/${id}/${reviewId}`);
    }
    next();
};