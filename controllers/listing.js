const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    // let allListings = await Listing.find({});
    // res.render("listings/index.ejs",{allListings});
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    const totalListings = await Listing.countDocuments({});
    const totalPages = Math.ceil(totalListings / limit);

    const listings = await Listing.find({})
    .skip((page - 1) * limit)
    .limit(limit);

    res.render("listings/index.ejs", {
    listings,
    currentPage: page,
    totalPages
    });
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing doesn't exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.searchListings = async(req,res)=>{
    try {
        const searchQuery = req.query.searchQuery || '';
        if (!searchQuery.trim()) {
            return res.redirect("/listings");
        }
        const page = parseInt(req.query.page) || 1;
        const limit = 6;

        const totalListings = await Listing.countDocuments({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        const listings = await Listing.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } }
            ]
        })
        .skip((page - 1) * limit)
        .limit(limit);

        res.render("listings/index.ejs", { 
            listings,
            searchQuery,
            currentPage: page,
            totalPages: Math.ceil(totalListings / limit)
        });
    } catch (error) {
        console.error("Search error:", error);
        req.flash("error", "Error performing search");
        res.redirect("/listings");
    }
};

module.exports.createListing = async(req,res)=>{
    try {
        if(!req.file) {
            req.flash("error", "Please upload an image");
            return res.redirect("/listings/new");
        }
        
        // Get the listing data from req.body.listing (from the form)
        const { title, description, price, country, location } = req.body.listing;
        
        // Validate required fields
        if(!title || !description || !price || !country || !location) {
            req.flash("error", "All fields are required");
            return res.redirect("/listings/new");
        }
        
        // Create new listing with all fields
        const newListing = new Listing({
            title,
            description,
            price,
            country,
            location,
            owner: req.user._id,
            image: {
                url: req.file.path,
                filename: req.file.filename
            }
        });
        
        await newListing.save(); 
        req.flash("success", "New listing created!");
        res.redirect("/listings");
    } catch(err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Failed to create listing. Please try again.");
        res.redirect("/listings/new");
    }
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing doesn't exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect("/listings")
};

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
};