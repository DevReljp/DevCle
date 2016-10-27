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
User.role = 'User';
module.exports = User;
