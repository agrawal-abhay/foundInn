const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isAuthorOrAdmin} = require('../middleware.js');
const reviewController = require("../controllers/review.js");

// Reviews POST Route
router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

// Review Delete Route
router.delete("/:reviewId",isLoggedIn,isAuthorOrAdmin,wrapAsync(reviewController.deleteReview));

module.exports = router;