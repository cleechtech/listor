var mongoose = require('mongoose');

// define schema
var candidateSchema = new mongoose.Schema({
	owner: { type : mongoose.Schema.ObjectId, ref : 'User', required: true },
	displayName: { type: String, required: true },
	email: { type: String, unique: true, lowercase: true, required: true },
	phone: { type: String, minlength: 10 },
	status: { type: String, required: true },
	comments: { type: String }
});

// register schema
mongoose.model('Candidate', candidateSchema);