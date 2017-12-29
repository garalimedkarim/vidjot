const express = require('express');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app=express();



//Map global promise = get rid of warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-db',{
	useMongoClient: true
})
.then(function(){
	console.log("MongoDB connected ...");
})
.catch(err => console.log(err));

// handlebars middleware :
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware :
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/* app.use(function(req,res,next){
	console.log("3ale rou7i");
	console.log(Date.now());
	req.att_x="karim";
	next();
}) */

app.use(function(req,res,next){
	console.log("hani ne5dem");
	next();
});

// Index Route:
app.get("/",(req,res) => {
 	res.render('index');
	//console.log("get callback");
});

// about Route:
app.get("/about",(req,res)=>{
	res.render("about",{title:"about1"});
});

// add Idea Route:
app.get("/ideas/add",(req,res)=>{
	res.render("ideas/add");
});

// Ideas index page:
app.get("/ideas",(req,res)=>{
	// Load Idea Model:
	require('./models/Idea');
	const Idea = mongoose.model('ideas');			
	
	Idea.find({})
	.sort({date:'desc'})
	.then(ideas=>{
		res.render("ideas/index",{
			ideas: ideas,
		});
	})
	
});

// form handle :
app.post("/ideas",function(req,res){
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
		// Load Idea Model:
		require('./models/Idea');
		const Idea = mongoose.model('ideas');		
		const newIdea= {
			title: req.body.title,
			details: req.body.details,
		};
		new Idea(newIdea)
		.save()
		.then(idea=>{
			res.redirect("/ideas");
		});
	}
});


const port=5000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});
