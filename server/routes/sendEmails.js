var express = require('express'),
	router = express.Router();

/*
 |--------------------------------------------------------------------------
 | POST /sendEmails
 |--------------------------------------------------------------------------
 */
 router.post('/sendToList', function(req, res){
 	console.log(req.body);

 });

 module.exports = router;