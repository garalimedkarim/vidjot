module.exports = {
	ensureAuthenticated: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error_msg","Not authorized access ");
		res.redirect("/users/login");
	}
}