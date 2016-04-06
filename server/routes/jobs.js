
var express = require('express'),
	mongoose = require('mongoose'),
	Job = mongoose.model('Job'),
	router = express.Router();

/*
 |--------------------------------------------------------------------------
 | Get all jobs for logged in user
 |--------------------------------------------------------------------------
 */
router.get('/', function(req, res){
	var user_id = req.query.owner;

	Job.find({ owner: user_id }, function(err, jobs){
		res.send(jobs);
	});
});

/*
 |--------------------------------------------------------------------------
 | Add a job for logged in user
 |--------------------------------------------------------------------------
 */
router.post('/', function(req, res){
	var newJob = new Job(req.query);

	newJob.save(function(err, result){
		if (err) {
	  		console.error('Error saving the Job!');
	    	res.send({ message: err.message });
	  	}
		res.send(result);
	});
});

/*
 |--------------------------------------------------------------------------
 | Get a job by id
 |--------------------------------------------------------------------------
 */
 router.get('/:id', function(req, res){
 	var job_id = req.params.id;

 	// send the job
 	Job.findById(job_id, function(err, job){
 		if(err) return err;

 		res.send(job);
 	});
 });

module.exports = router;