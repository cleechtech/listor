
var express = require('express'),
	mongoose = require('mongoose'),
	Candidate = mongoose.model('Candidate'),
	router = express.Router();

/*
 |--------------------------------------------------------------------------
 | All candidates
 |--------------------------------------------------------------------------
 */
router.get('/', function(req, res){
	Candidate.find({}, function(err, candidates){
		res.send(candidates);
	});
});

/*
 |--------------------------------------------------------------------------
 | Create Candidate
 |--------------------------------------------------------------------------
 */
router.post('/add', function(req, res){

	Candidate.findOne({ email: req.body.email }, function(err, existingCandidate){
		if (existingCandidate) {
			console.error('Candidate exists already!');
			res.status(409);
			return res.send({ message: 'Candidate exists already!' });
		}

		var candidate = new Candidate({
		  displayName: req.body.displayName,
		  email: req.body.email,
		  phone: req.body.phone
		});

		candidate.save(function(err, result){
			if (err) {
		  		console.error('Error saving the candidate!');
		    	res.status(500).send({ message: err.message });
		  	}
		  res.send(result);
		});
	});
});

module.exports = router;
