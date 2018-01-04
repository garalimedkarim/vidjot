const developpement = false;

if (!developpement)
	module.exports = new Promise(res => {
		process.env.NODE_ENV = 'prod';
		res();
	});
else 
	module.exports = new Promise(function(resolve,reject) {
		resolve();
	});

/* module.exports= function() {
	console.log("config.js function");
	rl.question('Run in production environnement (Y|N) ?', (answer) => {
		if(answer === "Y")
			process.env.NODE_ENV = 'prod';
		else
			process.env.NODE_ENV = 'dev';
		rl.close();
		
	});
	
} */