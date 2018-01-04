const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

//-------------------------------------------------------

// Load User Model:
require('../models/User');
const User = mongoose.model('Users');

//-------------------------------------------------------
// function executed to load the passport config in RAM :
module.exports=function(passport){
	console.log("config/passport.js : function executed to load the passport config in RAM");
	passport.use(
	new LocalStrategy({usernameField:'email'},function(email, password, done){
		//executed in login action only:
		console.log("config/passport.js : new LocalStrategy");
		User.findOne({'email':email},function(err, user) {	
			if (err)
				return done(err);
			if (!user)
				return done(null, false,{message:"You are not registred"});
			if (!bcrypt.compareSync(password,user.password) ){
				return done(null, false,{message:"Missing email or password !"});
			}
			return done(null, user);  
		});

	}));

	passport.serializeUser(function(user, done) {
		console.log("SERIALIZE");
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("DESERIALIZE");
		User.findById(id, function(err, user) {
		done(err, user);
	  });
	});	
}