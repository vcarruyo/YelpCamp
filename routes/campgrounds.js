var  express = require("express");
var  router	=	express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE - show all campgrounds

router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
	
});

//NEW ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	console.log(name)
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
			id: req.user._id,
			username: req.user.username
	}
	var campgroundCreated = {name:name, price: price, image:image, description:desc, author: author};
	
	Campground.create(campgroundCreated, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		};
	});
	//get data from form and add campgrounds arrays
	//redirect back to campgrounds page
});

//SHOW ROUTE
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
		res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});	
		});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
});
});


module.exports = router;