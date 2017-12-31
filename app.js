const express = require('express');

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash'); 
const session = require('express-session');
//const path = require("path");

const passport = require('passport');


const app=express();


//---------------Mongoose Connect-----------------------

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

//----------------Middlewares set in Use-----------------

// Static folder Set:
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

// Session middleware :
app.use(session({
  secret: 'mySecret',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

// passport middleware :
app.use(passport.initialize());
app.use(passport.session());

// handlebars middleware :
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware :
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//methodOverride middleware:
app.use(methodOverride('_method'));

//Connect flash middleware:
app.use(flash());

//----------------My Own Middlewares-----------------

// Setting Global variables:
app.use(function(req,res,next){
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null;
	next();
});

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

//-----------------Routes-----------------------------

// Index Route:
app.get("/",(req,res) => {
 	res.render('index');
	//console.log("get callback");
});

// about Route:
app.get("/about",(req,res)=>{
	res.render("about",{title:"about1"});
});

// load routes :
const ideas = require("./routes/ideas");
const users = require("./routes/users");
// Use routes :
app.use("/ideas",ideas);
app.use("/users",users);

//--------------------------------------------------

//call local-strategy:
require("./config/passport")(passport);

//--------------------------------------------------

const port=5000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});
