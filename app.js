const express = require('express');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');

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

// Load Idea Model:
require('./models/Idea');
const Idea = mongoose.model('ideas');

// handlebars middleware :
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* app.use(function(req,res,next){
	console.log("3ale rou7i");
	console.log(Date.now());
	req.att_x="karim";
	next();
}) */

app.use(function(req,res,next){
	console.log("hani ne5dem");
	next();
})

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

const port=5000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});
