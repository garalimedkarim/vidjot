const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const passport = require("passport");

const router = express.Router();
console.log("routes/users.js"); 
//--------------------------------------------------

// Load User Model:
require('../models/User');
const User = mongoose.model('Users');

//--------------------------------------------------
//login form
router.get("/login",(req,res)=>{
	res.render("users/login");
});
//handle login form:
router.post('/login',
	//execute passport middleware passport.use( new Strategy ...) : config/passport.js
	passport.authenticate('local', {
	successRedirect: '/ideas',
	failureRedirect: '/users/login',
	failureFlash:true,
	})
);
//logout 
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success_msg","You are Logged out")
	res.redirect("/users/login");	
});

//register form
router.get("/register",(req,res)=>{
	res.render("users/register");
});
// handle register form
router.post("/register",(req,res)=>{
	let errors=[];
	if(req.body.password != req.body.password2)
		errors.push({"text":"password do not match"});
	
	if(req.body.password.length < 4)
		errors.push({"text":"password must be at least 8 characters"});
	
	if(errors.length > 0)
		res.render("users/register",{
			errors:errors,
			name:req.body.name,
			email:req.body.email,
		});
	else{
		User.findOne({email:req.body.email})
		.then(user=>{
			if(user){
				req.flash("error_msg","email already registred");
				res.render("/users/login");
			}else{
				const newUser = new User({
					name:req.body.name,
					email:req.body.email,
					password:req.body.password,
					date:req.body.date,
				});
				
				bcrypt.hash(newUser.password, 10, function(err, hash) {
					if (err) throw err;
					newUser.password=hash;
					newUser
					.save()
					.then(user=>{
						req.flash("success_msg","You are registered, You can connect Now");
						res.redirect("/users/login");			
					}).catch(err=>{
						console.log(err);
						return;
					});		  
				});				
			}
		})
	}
	
});

//--------------------------------------------------

module.exports = router;