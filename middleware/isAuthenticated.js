function isAuthenticated(req, res, next){
	if (req.isAuthenticated())                  //passport js -->req.isAuthenticated
		next();
	else
		res.redirect('/');
}

module.exports = isAuthenticated;