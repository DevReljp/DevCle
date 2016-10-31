// =======================
// get instance we need
// =======================
import express from 'express'

var app               = express();
var bodyParser        = require('body-parser');
var session           = require('express-session');
var path              = require('path');
var fs                = require('fs-extra');
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

// =======================
// routes
// =======================

var addRouter = (app, path) => {
  fs.readdir(path, (error, files) => {
    for (var i in files) {
      let dir = files[i];
      if (dir.indexOf('.') == 0)
        continue;
      if (fs.statSync(`${path}/${dir}`).isFile())
        continue;
      if (['public', 'views'].indexOf(dir) > 0)
        continue;
      
      if (fs.existsSync(`${path}/${dir}/index.js`)) {
        var lib = require(`${path}/${dir}`);
        let url_path = path.replace(`${__dirname}/modules`, "") + `/${dir}`;
        console.log("Add rountes", url_path)
        app.use(`${url_path}`, lib.router);
        if (fs.existsSync(`${path}/${dir}/public`)) {
          console.log("Public directory", `${path}/${dir}/public`, ". Access from browser", url_path);
          app.use(`${url_path}/`, express.static(`${path}/${dir}/public`));
        }
      }
      addRouter(app, `${path}/${dir}`);
    }
  });
}
// Root access.


app.use('/', require(`${__dirname}/modules`).router);
app.use('/', express.static(`${__dirname}/modules/public`));

addRouter(app, `${__dirname}/modules`);

// =======================
// start the server
// =======================
app.listen(port);
console.log('application started');

