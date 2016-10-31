var plugins = require('../../plugins');
var common  = require('../../libs/common');

class AuthController {
  constructor() {
    this.expected = [{
      url: '/new', method: 'GET'
    }];
  }
  
  all(req, res, next) {
    req.app.set('views', __dirname + '/views/');
    common.exclude_authentication(this.expected, req, res);
    next();
  }
  
  new(req, res, next) {
    res.render('new'); 
  }
  
  index(req, res, next) {
    res.status(200).json(
      req.session.currentUser ? {userId: req.session.currentUser.userId} : ""
    );
  }
  
  create(req, res, next) {
    var User = plugins.find('User')[0];
    User.login(req.body.userId, req.body.password)
      .then((user) => {
        var u = user.toJSON();
        delete u['password'];
        req.session.currentUser = u;
        res.status(200).json({
          userId: u.userId
        });
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