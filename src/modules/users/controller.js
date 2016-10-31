var plugins = require('../../plugins');
var common  = require('../../libs/common');

  class UserController {
    constructor() {
      // Authentication expected.
      this.expected = [
        // Define like below.
        {url: '/new', method: 'GET'}
      ];
      // Authentication required.
      this.required = [
        // Define like below.
        {url: '/me', method: 'PUT'},
      ]
    }
    
    all(req, res, next) {
      req.app.set('views', __dirname + '/views/');
      // Authentication expected
      common.exclude_authentication(this.expected, req, res);
      
      // Authentication required
      common.require_authentication(this.required, req, res, `/auth/new?path=${req.url}`);
      next();
    }
    
    // GET /new
    new(req, res, next) {
      res.render('new'); 
    }
    
    // POST /
    create(req, res, next) {
      var User = plugins.find('User')[0];
      var user = User.build({
        userId: req.body.userId,
        password: req.body.password
      })
      user.save()
        .then((result) => {
          console.log(result);
          res.status(201).json({});
        },(err) => {
          res.status(400).json(err);
        });
    }
    
    // GET /:id/edit
    edit(req, res, next) {
      res.render('edit'); 
    }
    
    // PUT /:id
    update(req, res, next) {
    }
    
    // DELETE /:id
    destroy(req, res, next) {
      res.status(200).json({});
    }
  }

  module.exports = new UserController;
