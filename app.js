var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	flash 			= require("connect-flash"),
	passport 		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User			= require("./models/user"),
	seedDB 			= require("./seed"),
	moment 			= require("moment");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();
mongoose.connect("mongodb+srv://vcarruyo:vk280506vk@database-cu7bv.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
	
}).then(() =>{
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"this is the secret message",
	resave: false,
	saveUnitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);


app.get("/", function(req, res){
	
	res.render("landing");
});



app.listen(3000, () =>{
	console.log("The Yelp Camp server has started");
})
