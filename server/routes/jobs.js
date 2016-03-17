
var express = require('express'),
	mongoose = require('mongoose'),
	Job = mongoose.model('Job'),
	router = express.Router();

router.get('/', function(req, res){
	Job.find({}, function(err, jobs){
		res.send(jobs);
	});
});

module.exports = router;