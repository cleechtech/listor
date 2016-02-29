Listor
=====

> Candidate tracking system

### Getting started
```
$ git clone <this_repo_url>
$ cd listor
$ npm install && bower install
$ nodemon server
```

#### Bundle up all client side js into one output file (production)
```
$ gulp watch
```

### Deploy to Heroku
```
heroku create <app_name>
heroku config:set NODE_ENV=production
heroku addons:create mongolab:sandbox 
heroku config | grep MONGOLAB_URI
git push heroku master
heroku ps:scale web=1
```
