// =======================
// get instance we need
// =======================
import express from 'express'

var app               = express();
var bodyParser        = require('body-parser');
var session           = require('express-session');
var path              = require('path');
var routes            = require('./routes/routes');  
var fs                = require('fs');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session)
var config            = require('./config');

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080;

// request parameter parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// static file folder
app.use(express.static('public'));

// html template
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(session({
  secret: config.session_key,
  resave: false,
  saveUninitialized: true,
  store: new NedbStore({
    filename: path.join(__dirname, '/tmp/session.nedb')
  })
}));

// session
app.use(session({secret: "adsfajfpoaf0jomvaosdoci"}));

// =======================
// routes
// =======================


fs.readdir(`${__dirname}/modules`, (error, files) => {
  for (var i in files) {
    let dir = files[i];
    if (dir.indexOf('.') == 0) {
      continue;
    }
    var lib = require(`${__dirname}/src/modules/${dir}`);
    app.use(`/${dir}`, lib.router);
    var paths = [
      {
        original: `${__dirname}/src/modules/${dir}/public`,
        symlink: `${__dirname}/public/modules/${dir}`
      },
      /*
      {
        original: `${__dirname}/src/modules/${dir}/views`,
        symlink: `${__dirname}/views/${dir}`
      }
      */
    ];
    for (var i in paths) {
      var path = paths[i];
      if (!fs.existsSync(path.original)) {
        continue;
      }
      if (!fs.existsSync(path.symlink)) {
        fs.symlinkSync(path.original, path.symlink);
      }
    }
  }
});


app.use('/', routes);

// =======================
// start the server
// =======================
app.listen(port);
console.log('application started');

