var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/mean-starter',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'mongodb://heroku_fg9q9cp7:1kct5nqdkeuvv0p3srvian356s@ds059115.mongolab.com:59115/heroku_fg9q9cp7',
		port: process.env.PORT || 80
	}
};