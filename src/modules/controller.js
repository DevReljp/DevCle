var plugins = require('../plugins');
var common  = require('../libs/common');

class IndexController {
  constructor() {
    // Authentication expected.
    this.expected = [
      // Define like below.
      // {url: '/new', method: 'GET'}
    ];
    // Authentication required.
    this.required = [
      // Define like below.
      // {url: '/:id/', method: 'PUT'},
    ]
  }
  
  all(req, res, next) {
    req.app.set('views', __dirname + '/views/');
    // Authentication expected
    // common.exclude_authentication(this.expected, req, res);
    
    // Authentication required
    // common.require_authentication(this.required, req, res, `/auth/new?path=${req.url}`);
    next();
  }
  
  // GET /
  index(req, res, next) {
    res.render('index', {
      currentUser: req.session.currentUser
    }); 
  }
  
}

module.exports = new IndexController;
