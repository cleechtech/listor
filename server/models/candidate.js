var mongoose = require('mongoose');

// define schema
var candidateSchema = new mongoose.Schema({
	owner: { type : mongoose.Schema.ObjectId, ref : 'User' },
	displayName: String,
	email: { type: String, unique: true, lowercase: true },
	phone: { type: String, minlength: 10 },
	status: { type: String },
	comments: { type: String }
});

// register schema
mongoose.model('Candidate', candidateSchema);