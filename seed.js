var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");


var data = [
		{
			name: "Cloud's Rest",
			image: "https://live.staticflickr.com/7611/26755505400_80374c29c2_c.jpg", 
			description: "Vestibulum mattis est felis, nec posuere quam finibus sit amet. Curabitur semper dolor est. Praesent lorem dui, porta id odio in, vulputate molestie orci. Curabitur nec sem erat. Aenean vel ligula eu nisi lacinia lobortis et vitae mi. Nullam consectetur vitae erat ornare commodo. Maecenas pretium lectus magna, in consequat ipsum convallis et. Morbi et accumsan urna, vitae luctus elit. Integer suscipit quis dolor et egestas. Curabitur arcu metus, lobortis congue massa eget, viverra pharetra tellus. Nulla ultricies orci ipsum, quis cursus elit tristique in. Morbi laoreet libero dolor, in pellentesque tellus elementum at. Cras vestibulum nisi at lorem tincidunt aliquet. Suspendisse ac rutrum orci, vitae faucibus orci. Aliquam id porttitor arcu. Maecenas porta neque a nunc euismod fringilla."
		},
		{
			name: "Desert Mesa",
			image: "https://live.staticflickr.com/7611/26755505400_80374c29c2_c.jpg", 
			description: "Phasellus interdum pharetra felis at lacinia. Vivamus pulvinar dignissim velit, sed tempor mauris interdum iaculis. Sed imperdiet ut nisl vitae faucibus. Integer facilisis at sapien eget congue. Suspendisse posuere magna ac lacus vehicula tempor. Aliquam fringilla hendrerit dictum. Donec vulputate lorem viverra mauris rhoncus, in blandit magna elementum. Nunc vitae ante justo. Suspendisse potenti. Nulla consequat, tellus sed congue auctor, neque risus convallis orci, id molestie arcu ipsum luctus felis. Etiam ullamcorper dignissim gravida. Maecenas rhoncus risus nec finibus tristique. Praesent velit odio, malesuada placerat ex cursus, gravida pretium ipsum."
		},
		{
			name: "Dantes Peek",
			image: "https://live.staticflickr.com/7611/26755505400_80374c29c2_c.jpg", 
			description: "Mauris odio massa, blandit ac hendrerit vel, ultrices ac neque. Curabitur varius fringilla lectus eu consequat. Proin sagittis elit ut eros finibus viverra. Aliquam ut pretium libero, in ultricies mi. Quisque auctor quam eget hendrerit varius. Aenean varius est vel tortor condimentum aliquet. Praesent pellentesque augue congue lorem mattis pellentesque et id ligula. Sed nulla lectus, aliquam a justo vel, maximus varius elit. Curabitur in lacus rutrum, gravida tellus sit amet, varius orci. Mauris id eleifend tortor"
		}
	]

function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
	});
		Comment.remove({}, function(err){
			if(err){
				console.log(err);
			}
			console.log("removed comments")
		// add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function (err, campground){
					if(err){
					console.log(err)
					} else {
						console.log("added a campgrounds");
						//create a comment
						Comment.create(
						{
							text: "This place is great",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
							}
						});
					}
				});
			});	
		});		
	};

module.exports = seedDB;