var plugins = require('../../plugins');
var common  = require('../../libs/common');

class AuthController {
  constructor() {
    this.expected = [{
      url: '/new', method: 'GET'
    }];
  }
  
  all(req, res, next) {
    var User = plugins.find('User')[0];
    if (req.session.currentUser) {
      req.session.currentUser = new User(req.session.currentUser);
    }
    common.exclude_authentication(this.expected, req, res);
    next();
  }
  
  new(req, res, next) {
    res.render(`${__dirname}/views/index`); 
  }
  
  create(req, res, next) {
    var User = plugins.find('User')[0];
    User.login(req.body.userId, req.body.password)
      .then((user) => {
        req.session.currentUser = user;
        res.status(200).json(user);
      },
      (err) => {
        res.status(400).json(err);
      })
  }
  
  destroy(req, res, next) {
    delete req.session['currentUser'];
    
    res.status(200).json({});
  }
}

module.exports = new AuthController;