
var express = require('express'),
	mongoose = require('mongoose'),
	Candidate = mongoose.model('Candidate'),
	router = express.Router();

/*
 |--------------------------------------------------------------------------
 | Get all candidates for logged in user
 |--------------------------------------------------------------------------
 */
router.get('/', function(req, res){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id }, function(err, candidates){
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
			owner: req.body.owner,
			displayName: req.body.displayName,
			email: req.body.email,
			phone: req.body.phone,
			status: req.body.status,
			comments: req.body.comments
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

router.get('/needsApproval', function(req, res){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id, status: 'Needs Approval' }, function(err, candidates){
		res.send(candidates);
	});
});

router.get('/needsFeedback', function(req, res){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id, status: 'Needs Feedback' }, function(err, candidates){
		res.send(candidates);
	});
});

router.get('/needsInterview', function(req, res){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id, status: 'Needs Interview' }, function(err, candidates){
		res.send(candidates);
	});
});

router.get('/finalStages', function(req, res){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id, status: 'Final Stages' }, function(err, candidates){
		res.send(candidates);
	});
});

module.exports = router;
