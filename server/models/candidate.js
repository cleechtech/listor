var mongoose = require('mongoose');

// define schema
var candidateSchema = new mongoose.Schema({
	displayName: String,
	email: { type: String, unique: true, lowercase: true },
	phone: { type: String, minlength: 10 },
	status: String
});

// register schema
mongoose.model('Candidate', candidateSchema);