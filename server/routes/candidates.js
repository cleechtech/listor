
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
			return res.send({ message: 'Candidate exists already!' });
		}

		// _id of job
		var job_submitting_to = [req.body.job];

		var candidate = new Candidate({
			owner: req.body.owner,
			displayName: req.body.displayName,
			email: req.body.email,
			phone: req.body.phone,
			status: req.body.status,
			comments: req.body.comments,
			jobs: job_submitting_to
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

/*
 |--------------------------------------------------------------------------
 | Update candidate's information
 |--------------------------------------------------------------------------
 */
router.put('/update', function(req, res){

	// update candidate and return the updated candidate
	Candidate.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(err, c){
		if(err){
			res.send({message: 'Error updating candidate!'});
		} else {
			res.send(c);
		}
	});
});

/*
 |--------------------------------------------------------------------------
 | Update a Candidate's Status
 |--------------------------------------------------------------------------
 */
router.put('/updateStatus', function(req, res){
 	var id = req.body.id;
 	var status = req.body.status;

 	Candidate.findByIdAndUpdate(id, { $set: { status: status }}, function(err, c){
 		// callback for after update operation
 		if(err){
 			res.send({ message: 'Candidate exists already!' });
 		}
 	});
});

/*
 |--------------------------------------------------------------------------
 | Get Candidates based on status
 |--------------------------------------------------------------------------
 */

router.get('/needsApproval', function(req, res){
	getCandidatesWithStatus(req, res, 'Needs Approval');
});

router.get('/needsFeedback', function(req, res){
	getCandidatesWithStatus(req, res, 'Needs Feedback');
});

router.get('/needsInterview', function(req, res){
	getCandidatesWithStatus(req, res, 'Needs Interview');
});

router.get('/finalStages', function(req, res){
	getCandidatesWithStatus(req, res, 'Final Stages');
});

// helper function
function getCandidatesWithStatus(req, res, status){
	var user_id = req.query.owner;

	Candidate.find({ owner: user_id, status: status }, function(err, candidates){
		res.send(candidates);
	});
}

/*
 |--------------------------------------------------------------------------
 | Delete Candidate
 |--------------------------------------------------------------------------
 */
router.delete('/:id', function(req, res){
	Candidate.remove({_id: req.params.id}, function(err){
		res.send({ message: 'Candidate removed!'});
	});
});

module.exports = router;
