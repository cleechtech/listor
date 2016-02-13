var express = require('express'),
	nodemailer = require('nodemailer'),
	router = express.Router();

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    xoauth2: {
      user: "connor.leech@mondo.com", // Your gmail address.
      clientId: "925082493768-b7lc1oo8ie74cui6indku1jgr7g7kpg6.apps.googleusercontent.com",
      clientSecret: "Y1lqjp_aGfn2yZIkN7xkKd1x",
      refreshToken: "1/LFVq94wxy6uWMP7oWeB08cnzqO6UjshoOzpg25QqEWxIgOrJDtdun6zK6XiATCKT"
    }
  }
});
/*

 |--------------------------------------------------------------------------
 | POST /sendEmails
 |--------------------------------------------------------------------------
 */
 router.post('/sendToList', function(req, res){
 	console.log(req.body);

 	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'connor.leech@mondo.com', // sender address
	    to: 'connorleech@gmail.com, baz@blurdybloop.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world 🐴', // plaintext body
	    html: '<b>Hello world 🐴</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});

 });

 module.exports = router;