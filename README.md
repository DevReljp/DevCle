# DevCle

DevCle is marketing automation tool developed by Node.js. DevCle is especially forcus on Developer Relations.

## Features

- [ ] Contact form
- [ ] User authentication
- [ ] Forum
- [ ] Event page
- [ ] Webhook
- [ ] RESTful API
- [ ] OAuth2
- [ ] Social service management
- [ ] Email magazine
- [ ] Administration

## Architectures

### Module/Plugin based

Most of features are provided by plugins or modules. Module is contoller or router. Plugin is model or something extended DevCle.

You can make a feature under `src/modules/`.

1. Make directory
2. Make index.js under its directory
3. And coding. basic code is below.

```
var express = require('express');
var router = express.Router();

router.get('/new', (req, res, next) => {
  res.render(`${__dirname}/views/index`); 
});

module.exports = {
  router: router
};
```

You can use your view files. Make a directory named *view* under your module directory. We have selected view engine Jade.

```
src/modules/your_module_name/
├── index.js
└── views
    └── index.jade
```

If you want to use your JavaScript or Stylesheet files on Web browser for your module. When you make a directory named *public* under your module directory. It mount under public/modules/ with your_module_name.

```
src/modules/auth/
├── controller.js
├── index.js
├── public
│   └── app.js
└── views
    └── index.jade
```

You can access the app.js file from web browser like *http://localhost:8080/modules/auth/app.js*.

#### Plugin

Plugin has role. Currently only *User*. Module call the plugin like this.

```
var User = plugins.find('User')[0];
// Login
User.login(req.body.userId, req.body.password)
  .then((user) => {
    req.session.currentUser = user;
    res.status(200).json(user);
  },
  (err) => {
    res.status(400).json(err);
  })
```

You can choose any type of User model like Database, social, oauth2, LDAP or anything. Because JavaScript has no feature interface yet.

And User plguin is like below.

```
class User {
  constructor(params) {
    var keys = ['id', 'userId', 'password'];
    for (var key in keys) {
      if (params[key]) {
        this[key] = params[key];
        delete params[key];
      }
    }
    if (Object.keys(params).length > 0) {
      this.params = params;
    }
  }
  
  static login(userId, password) {
    return new Promise(function(res, rej) {
      var user = new User({id: '001', userId: userId, password: password});
      return res(user);
    });
  }
  
}
User.role = 'User';  // Role
module.exports = User;
```

### ES6 based

DevCle have created by ES6(ES2015). You can use Class, template string, let/const or any ES6 features.

### Development note

```
cd node_modules/transformers
$ npm install marked --save
```

### LICENSE

MIT License