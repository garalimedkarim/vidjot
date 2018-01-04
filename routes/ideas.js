const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const {ensureAuthenticated} = require("../helpers/auth");
console.log("routes/ideas.js"); 
// Load Idea Model:
require('../models/Idea');
const Idea = mongoose.model('ideas');

//--------------------------------------------------

// Ideas index page:
router.get("",ensureAuthenticated,(req,res)=>{
	Idea.find({'user':req.user.id})
	.sort({date:'desc'})
	.then(ideas=>{
		res.render("ideas/index",{
			ideas: ideas,
		});
	})	
});

// add Idea form:
router.get("/add",ensureAuthenticated,(req,res)=>{
	res.render("ideas/add");
});

// add Idea form handle :
router.post("/",ensureAuthenticated,function(req,res){
	let errors = [];
	if (!req.body.title)
		errors.push({text:'Please add a title'});
	if (!req.body.details)
		errors.push({text:'Please add a details'});
	if (errors.length > 0)
		res.render("ideas/add",{
			errors: errors,
			title: req.body.title,
			details: req.body.details,
		});
	else{	
		const newIdea= {
			title: req.body.title,
			details: req.body.details,
			user: req.user.id,
		};
		new Idea(newIdea)
		.save()
		.then(idea=>{
			req.flash("success_msg","Video added successfully");
			res.redirect("/ideas");
		});
	}
});

// edit Idea Form:
router.get("/edit/:id",ensureAuthenticated,(req,res)=>{	
	Idea.findOne({
		_id: req.params.id
	})
	.then(idea=> {
		if (idea.user != req.user.id){
			req.flash("error_msg","Not Allowed to touch this video");
			res.redirect("/ideas");
		}else{
			res.render("ideas/edit",{
				idea: idea,
			});
		}		
	});
});

// edit idea Form handle:
router.put("/:id",ensureAuthenticated,(req,res)=>{
	Idea.findOne({
		"_id":req.params.id,
	})
	.then(idea=>{
		// editing idea object
		idea.title = req.body.title;
		idea.details = req.body.details;
		// persisting object:
		idea.save()
		.then(idea=>{
			req.flash('success_msg',"Video Updated");
			res.redirect("/ideas");
		});
		
	});
});

// delete idea:
router.delete("/:id",ensureAuthenticated,(req,res)=>{
	Idea.remove({_id: req.params.id})
	.then(()=>{
		req.flash("success_msg","Video Idea Removed");
		res.redirect("/ideas");
	})
});

//--------------------------------------------------

module.exports = router;