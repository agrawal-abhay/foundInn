const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn} = require('../middleware.js');
const {isOwner} = require('../middleware.js');
const {isOwnerOrAdmin} = require('../middleware.js');
const {validateListing} = require('../middleware.js');
const {isSuperAdmin} = require('../middleware.js');
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloud.Config.js");
const upload = multer({storage});

// Index and Search route
router.get("/", wrapAsync(async (req, res) => {
    if (req.query.searchQuery) {
        return listingController.searchListings(req, res);
    }
    return listingController.index(req, res);
}));

// Create listing route
router.post("/", isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingController.createListing));

// New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwnerOrAdmin,upload.single("image"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwnerOrAdmin,wrapAsync(listingController.deleteListing));


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwnerOrAdmin,wrapAsync(listingController.editListing));

module.exports = router;