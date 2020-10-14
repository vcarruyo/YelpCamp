var  express = require("express");
var  router	=	express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var moment = require("moment");

//================
//AUTH ROUTES
//================

// ROOT ROUTE
router.get("/", function(req, res) {
	const date = new Date("2020-05-11T03:00:00.000Z");
	date.setHours(date.getHours() - 3);
	console.log(date);
	const fixDate = moment(date).format('YYYY-MMM-DD HH:mm:ss');
	console.log(fixDate);
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
	if(err){
		req.flash("error", err.message);		
		return res.render("register");
	}
	passport.authenticate("local")(req, res, function(){
		req.flash("success", "Welcome to YelpCamp " + user.username)
		res.redirect("/campgrounds");
	});
	});
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
		 }), function(req, res){
	
});

//logout route
router.get("/logout", function(req, res){
    req.logout(); // part of the packages
    req.flash("success", "Logged you out!"); //flash message
    res.redirect("/campgrounds");
});


module.exports = router;