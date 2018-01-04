
if(process.env.NODE_ENV === 'prod'){
	console.log("PROD Environnement");
	module.exports = {
		mongoURI : 'mongodb://karim:936R21Dg@ds235877.mlab.com:35877/vidjot-db-prod'
	}
}else{
	console.log("LOCAL Environnement");
	module.exports= { 
		mongoURI : 'mongodb://localhost/vidjot-db'
	}
}