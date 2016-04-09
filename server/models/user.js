var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// define schema
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  facebook: String
});

// executed before a new user is saved
userSchema.pre('save', function(next) {
  var user = this;
  var domain = user.email.split('@')[1];

  // check email validity 
  if(domain !== 'mondo.com'){
    console.log('not a valid email');

    return next(new Error("Not a valid email"));
  }

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// add a helper method to schema
userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// register schema
mongoose.model('User', userSchema);