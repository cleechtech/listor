var mongoose = require('mongoose');

// define schema
var jobSchema = new mongoose.Schema({
	position: { type: String, required: true },
	company: { type: String, required: true },
	status: { type: Boolean, required: true }, // active or inactive
	candidates: [{ type : mongoose.Schema.ObjectId, ref : 'Candidate' }]
});

// register schema
mongoose.model('Job', jobSchema);