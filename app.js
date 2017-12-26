const express = require('express');

const app=express();



app.use(function(req,res,next){
	console.log("3ale rou7i");
	console.log(Date.now());
	req.att_x="karim";
	next();
})

app.use(function(req,res,next){
	console.log("hani ne5dem");
	next();
})

// Index Route:
app.get("/",(req,res)=>{
 	res.send(req.att_x);
//	res.send("INDEX"); 
	console.log("get callback");
});

// Index about:
app.get("/about",(req,res)=>{
	res.send("ABOUT");
});

const port=5000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});
