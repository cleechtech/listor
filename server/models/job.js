var mongoose = require('mongoose');

// define schema
var jobSchema = new mongoose.Schema({
	owner: { type : mongoose.Schema.ObjectId, ref : 'User', required: true },
	title: { type: String, required: true },
	company: { type: String, required: true },
	description: { type: String, required: true }
});

// register schema
mongoose.model('Job', jobSchema);